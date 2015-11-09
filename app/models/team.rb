class Team < ActiveRecord::Base

	def self.team_names
		pluck(:name).uniq.sort
	end

end