require 'csv'

def convert_time_on_ice(str)
	minutes = str.split(":")[0].to_i
	seconds = str.split(":")[1].to_i
	minutes * 60 + seconds
end

CSV.foreach(Rails.root.join('db', '2014-15-5v5.csv'),headers:true,header_converters: :symbol) do |player|
  player_data = {
	  :season => player[:season],
		:situation => player[:situation],
		:name => player[:name],
		:team => player[:team],
		:pos => player[:pos],
		:gp => player[:gp].to_i,
		:toi => convert_time_on_ice(player[:toi]),
		:cf => player[:cf].to_i,
		:ca => player[:ca].to_i,
		:cf60 => player[:cf60].to_f,
		:ca60 => player[:ca60].to_f,
		:cf_per => player[:cf_per].to_f,
		:tmcf60 => player[:tmcf60].to_f,
		:tmca60 => player[:tmca60].to_f,
		:tmcf_per => player[:tmcf_per].to_f,
		:oppcf60 => player[:oppcf60].to_f,
		:oppca60 => player[:oppca60].to_f,
		:oppcf_per => player[:oppcf_per].to_f,
		:cf60reltm => player[:cf60reltm].to_f,
		:ca60reltm => player[:ca60reltm].to_f,
		:cf_per_reltm => player[:cf_per_reltm].to_f,
		:csh_per => player[:csh_per].to_f,
		:csv_per => player[:csv_per].to_f,
		:cpdo => player[:cpdo].to_f,
		:totfo => player[:totof].to_i,
		:nzfo => player[:nzfo].to_i,
		:dzfo => player[:dzfo].to_i,
		:ozfo => player[:ozfo].to_i,
		:igoals => player[:igoals].to_i,
		:iassists => player[:iassists].to_i,
		:ipoints => player[:ipoints].to_i,
		:ishot_per => player[:ishot_per].to_f,
		:igoals60 => player[:igoals60].to_f,
		:iassists60 => player[:iassists60].to_f,
		:ipoints60 => player[:ipoints60].to_f,
		:ipp => player[:ipp].to_f,
		:igp => player[:igp].to_f,
		:iap => player[:iap].to_f,
		:gf => player[:gf].to_i,
		:ga => player[:ga].to_i,
		:gf60 => player[:gf60].to_f,
		:ga60 => player[:ga60].to_f, 
		:gf_per => player[:gf_per].to_f, 
		:tmgf60 => player[:tmgf60].to_f, 
		:tmga60 => player[:tmga60].to_f, 
		:tmgf_per => player[:tmgf_per].to_f, 
		:oppgf60 => player[:oppgf60].to_f, 
		:oppga60 => player[:oppga60].to_f, 
		:oppgf_per => player[:oppgf_per].to_f, 
		:gf60reltm => player[:gf60reltm].to_f, 
		:ga60reltm => player[:ga60reltm].to_f, 
		:gf_per_reltm => player[:gf_per_reltm].to_f
  }

  Player.create!(player_data)
end
