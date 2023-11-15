class StoriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        page = params[:page].to_i
        start_index = 0

        if page > 1
            start_index = page * 10 - 9
        end

        stories = Story.all.slice(start_index, 10)
        if stories
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

    private

    def story_params
        params.permit(:title, :body)
    end

    def find_story
        @story = Story.find(params[:id])
    end
end
