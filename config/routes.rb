Rails.application.routes.draw do
  resources :users, only: [:show, :create]
  resources :animals, only: [:index, :create]
  resources :appointments, only: [:index, :create, :update, :destroy]
  resources :doctors, only: [:index, :create]
  get '/me', to: "sessions#show"
  post '/login', to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end