class SearchSuggestion

  def self.seed
    Player.find_each do |player|
      name = player.name.split.map(&:capitalize).join(' ')
      1.upto(name.length) do |n|
        prefix = name[0, n]
        $redis.zadd "search-suggestions:#{prefix.downcase}", 1, name
      end
    end
  end

  def self.terms_for(prefix)
    $redis.zrevrange "search-suggestions:#{prefix.downcase}", 0, 9
  end

end