class GenresController < ApplicationController
    def index
        render json: Genre.all
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
    
    private

    def genre_params
        params.permit(:genre)
    end

    def find_genre
        @genre = Genre.find(params[:id])
    end
end
