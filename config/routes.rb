Rails.application.routes.draw do
  get '/me', to: "users#show"
  post '/signup', to:"users#create"
  post '/change_display_name', to: "users#change_display_name"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/stories/search', to: "stories#search"

  resources :stories
  resources :genres
  resources :tags, only: [:create, :destroy]
  resources :users, only: [:destroy]
  resources :emotes, only: [:create, :update]
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
