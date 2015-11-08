class PlayersController < ApplicationController
	
	def index
		respond_with Player.all
	end

	# def show
	# 	respond_with Player.find(params[:id])
	# end
	
end
