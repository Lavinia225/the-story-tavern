class GenresController < ApplicationController
    skip_before_action :authorize, only: :index
    
    def index
        render json: Genre.all.order(:genre)
    end

    def show
        find_genre
        render json: @genre
    end

    def create
        genre = Genre.create!(genre_params)
        render json: genre, status: :created
    end

    def update
        find_genre
        @genre.update!(genre_params)
        render json: @genre
    end

    def destroy
        find_genre
        @genre.destroy
        head :no_content
    end
    
    private

    def genre_params
        params.permit(:genre)
    end

    def find_genre
        @genre = Genre.find(params[:id])
    end

    def authorize
        @current_user = User.find_by(id: session[:user_id])

        render json: {errors: ["Not Authorized!"]}, status: :unauthorized unless @current_user && @current_user.access_level > 0
    end
end
