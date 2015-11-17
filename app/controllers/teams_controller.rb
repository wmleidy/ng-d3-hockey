class TeamsController < ApplicationController

	def index
		respond_with Team.all
	end

	def search
		respond_with Team.where(name: params[:team_name])
	end

	def team_names
		respond_with Team.team_names
	end

end
