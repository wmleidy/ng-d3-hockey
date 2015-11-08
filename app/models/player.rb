class Player < ActiveRecord::Base

	def self.all_teams
		pluck(:team).uniq.sort
	end
end
