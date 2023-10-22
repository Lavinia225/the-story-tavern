class TagsController < ApplicationController
    def create
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    private

    def tag_params
        params.permit(:story_id, :genre_id)
    end
end
