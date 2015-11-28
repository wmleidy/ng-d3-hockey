class PlayersController < ApplicationController

	def index
		respond_with Player.all
	end

	def search
		if params[:team_name]
			respond_with Player.where(team: params[:team_name])
		elsif params[:player_name]
			respond_with Player.where(name: params[:player_name].upcase)
		end
		# @players = Player.where(team: params[:team_name])
		# respond_with(@players) do |format|
		# 	format.json {}
		# end
	end
	# def teams
	# 	respond_with Player.all_teams
	# end

	# def show
	# 	respond_with Player.find(params[:id])
	# end

end
