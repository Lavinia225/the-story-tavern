class EmotesController < ApplicationController
    def create
        emote = @current_user.emotes.create!(emote_params)
        render json: emote, status: :created
    end

    private

    def emote_params
        params.permit(:happy, :sad, :mad, :heart, :story_id)
    end
end
