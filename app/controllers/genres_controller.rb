class GenresController < ApplicationController
    def index
        render json: Genre.all
    end
    
    private

    def genre_params
        params.permit(:genre)
    end

    def find_genre
        @genre = Genre.find(params[:id])
    end
end
