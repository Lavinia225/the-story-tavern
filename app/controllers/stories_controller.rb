class StoriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        page = params[:page].to_i
        start_index = 0

        if page > 1
            start_index = page * 10 - 9
        end
            render json: Story.all.slice(start_index, 10)
    end

    def show
        find_story
        render json: @story, serializer: IndividualStorySerializer
    end

    def create
        story = @current_user.stories.create!(story_params)
        render json: story, status: :created
    end

    def update
        find_story

        if @story.user_id == @current_user.id
            @story.update!(story_params)
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
