class StoriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :search]

    def index
        page = params[:page].to_i
        start_index = 0

        if page > 1
            start_index = page * 10 - 9
        end

        stories = Story.all.slice(start_index, 10)
        if stories&.any?
            render json: stories
        else
            render json: {errors: ["There are no stories on this page or any afterwards."]}, status: :not_found
        end
    end

    def show
        find_story
        render json: @story, serializer: IndividualStorySerializer
    end

    def create
        story = @current_user.stories.create!(story_params)

        params[:genres].size.times do |i|
            story.tags.create!(genre_id: params[:genres][i])
        end

        render json: story, status: :created
    end

    def update
        find_story

        if @story.user_id == @current_user.id
            @story.update!(story_params)

            @story.tags.size.times do |i|
                unless params[:genres].include?(@story.tags[i].genre_id)
                    @story.tags[i].destroy
                end
            end

            params[:genres].size.times do |i|
                unless @story.tags.find_by(genre_id: params[:genres][i])
                    @story.tags.create!(genre_id: params[:genres][i])
                end
            end

            render json: @story, serializer: IndividualStorySerializer
        else
            render json: {errors: ["You are not authorized to modify this story!"]}, status: :unauthorized
        end
    end

    def destroy
        find_story

        if @story.user_id == @current_user.id
            @story.destroy
            head :no_content
        else
            render json: {errors: ["Not Authorized to delete this story!"]}, status: :unauthorized
        end
    end

    def search
        case params[:search_type]
        when "title"
            stories = Story.where(['lower(title) LIKE ?', "%#{params[:search].downcase}%"])
        when "author"
            stories = User.find_by('lower(display_name) = ?', params[:search].downcase).stories
        when "genres"
            query = genre_array_to_query(params[:search])
            stories = Story.joins(:genres).where(query)
        end

        if !stories
            render json: {errors: ["Invalid Search Parameter."]}, status: :bad_request
        elsif stories.size == 0
            render json: {errors: ["No stories found."]}, status: :not_found
        else
            render json: stories
        end
    end

    private

    def genre_array_to_query(array)
        query = ["genres.genre = ?", array[0]]

        array.drop(1).each do |item|
            query[0] += " OR genres.genre = ?"
            query << item 
        end
        query
    end

    def story_params
        params.permit(:title, :body)
    end

    def find_story
        @story = Story.find(params[:id])
    end
end