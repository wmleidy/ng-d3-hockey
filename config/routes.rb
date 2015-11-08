Rails.application.routes.draw do

  root to: 'application#angular'

  # resources :seasons, only: [:create, :index, :show] do
  #   resources :teams, only: [:index, :show]
  # end

end
