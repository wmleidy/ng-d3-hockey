Rails.application.routes.draw do

  root to: 'application#angular'

  resources :players, only: [:index]
  resources :teams, only: [:index]
  get '/teams/names' => 'teams#team_names'

  # Pathway?
  # resources :seasons, only: [:create, :index, :show] do
  #   resources :teams, only: [:index, :show]
  # end

end
