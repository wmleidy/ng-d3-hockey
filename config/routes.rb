Rails.application.routes.draw do

  root to: 'application#angular'

  resources :players, only: [:index]
  resources :teams, only: [:index]
  get '/teams/names' => 'teams#team_names'

  get '/players/search' => 'players#search'
  get '/teams/search'   => 'teams#search'

  # Pathway?
  # resources :seasons, only: [:create, :index, :show] do
  #   resources :teams, only: [:index, :show]
  # end

end
