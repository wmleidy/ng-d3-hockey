class TeamsController < ApplicationController

	def index
		respond_with Team.all
	end

	def team_names
		respond_with Team.team_names
	end

end
