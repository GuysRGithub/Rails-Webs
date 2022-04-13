Rails.application.routes.draw do
  resources :assets
  resources :properties
  devise_for :accounts
  get 'public/main'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
