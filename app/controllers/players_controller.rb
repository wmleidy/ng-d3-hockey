class PlayersController < ApplicationController

	def index
		respond_with Player.all
	end

	def search
		respond_with Player.where(team: params[:team_name])
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
