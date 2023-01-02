Rails.application.routes.draw do
  resources :users, only: [:show, :create, :index]
  resources :animals, only: [:index, :create]
  resources :appointments, only: [:index, :create, :update, :destroy]
  resources :doctors, only: [:index, :create, :show]
  get '/me', to: "sessions#show"
  post '/login', to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  # get '/topthree', to: "doctors#topthree"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end



