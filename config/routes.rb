Rails.application.routes.draw do
  resources :animals
  resources :appointments
  get "/me", to: 'doctors#show'
  post '/signup', to: "doctors#create"
  post '/login', to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end