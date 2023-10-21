class StoriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        page = params[:page].to_i
        start_index = page * 10 - 9

        if page > 1
            render json: Story.all.slice(start_index, 10)
        else
            render json: Story.all.slice(0, 10)
        end
    end

    def show
        story = Story.find(params[:id])
        render json: story
    end

    def create
        story = @current_user.stories.create(story_params)
        render json: story, status: :created
    end

    private

    def story_params
        params.permit(:title, :body)
    end
end
