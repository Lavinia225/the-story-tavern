class TagsController < ApplicationController
    rescue_from NoMethodError, with: :render_not_found

    def create
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    def destroy
        tag = Tag.find_by(["story_id = ? AND genre_id = ?", params[:story_id], params[:genre_id]])
        tag.destroy
        head :no_content
    end

    private

    def tag_params
        params.permit(:story_id, :genre_id)
    end

    def render_not_found 
        render json: {errors: ["Tag not found"]}, status: :not_found
    end
end
