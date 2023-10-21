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
end
