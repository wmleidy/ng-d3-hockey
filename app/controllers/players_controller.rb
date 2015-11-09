class PlayersController < ApplicationController
	
	def index
		respond_with Player.all
	end

	# def teams
	# 	respond_with Player.all_teams
	# end

	# def show
	# 	respond_with Player.find(params[:id])
	# end
	
end
