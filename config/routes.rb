Rails.application.routes.draw do
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  #resources :users, only: [:new, :create]

  resources :gyms

  #get 'reviews/recent_reviews', to: 'reviews#recent_reviews'

  resources :reviews

  get 'signup' => 'users#new', as: :signup
  post 'users' => 'users#create', as: :users

  get '/auth/github/callback' => 'sessions#create'

  get 'login' => 'sessions#new', as: :login
  post 'sessions' => 'sessions#create', as: :sessions
  get 'logout' => 'sessions#destroy'

  get '/gyms/:id/next' => 'gyms#next'
  get '/gyms/:id/previous' => 'gyms#previous'
  get '/gyms/:id/all' => 'gyms#all'

  resources :gyms, only: [:show] do
    resources :reviews, only: [:index, :show]
  end

  resources :users, only: [:show] do
    resources :gyms, only: [:index, :create, :show, :new]
  end
end