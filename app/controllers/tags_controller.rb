class TagsController < ApplicationController

    def create
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    def destroy
        tag = Tag.find(params[:id])
        tag.destroy
        head :no_content
    end

    private

    def tag_params
        params.permit(:story_id, :genre_id)
    end

    def authorize
        @current_user = User.find_by(id: session[:user_id])
        tag = Tag.find(params[:id])

        render json: {errors: ["Not Authorized to modify these tags!"]}, status: :unauthorized unless @current_user && @current_user.id == tag.story.user_id
    end
end
