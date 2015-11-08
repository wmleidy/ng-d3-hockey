Rails.application.routes.draw do

  root to: 'application#angular'

  resources :players, only: [:index]
  # resources :seasons, only: [:create, :index, :show] do
  #   resources :teams, only: [:index, :show]
  # end

end
