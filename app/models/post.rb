class Post < ActiveRecord::Base
	has_many :comments
	belongs_to :user

	before_save :default_vote_count

	def as_json(options = {})
		super(options.merge(include: [:user, comments: {include: :user}]))
	end

	 def default_vote_count
    self.upvotes ||= 0
	end
end
