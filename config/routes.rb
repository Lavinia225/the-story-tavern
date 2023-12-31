Rails.application.routes.draw do
  get '/me', to: "users#show"
  post '/signup', to:"users#create"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  resources :stories
  resources :genres
  resources :tags, only: [:create, :destroy]
  resources :users, only: [:destroy]
  resources :emotes, only: [:create, :update]
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
