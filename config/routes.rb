Rails.application.routes.draw do
  resources :users
  resources :animals
  resources :appointments
  resources :doctors
  get '/me', to: "sessions#show"
  post '/login', to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end