class Players < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string  :season, limit: 10
  		t.string  :situation, limit: 20
      t.string  :name, limit: 40
  		t.string  :team, limit: 16
  		t.string  :pos, limit: 6
  		t.integer :gp
  		t.integer :toi
  		t.integer :cf
  		t.integer :ca
  		t.decimal :cf60, precision: 4, scale: 1
  		t.decimal :ca60, precision: 4, scale: 1
  		t.decimal :cf_per, precision: 4, scale: 1
  		t.decimal :tmcf60, precision: 4, scale: 1
  		t.decimal :tmca60, precision: 4, scale: 1
  		t.decimal :tmcf_per, precision: 4, scale: 1
  		t.decimal :oppcf60, precision: 4, scale: 1
  		t.decimal :oppca60, precision: 4, scale: 1
  		t.decimal :oppcf_per, precision: 4, scale: 1
  		t.decimal :cf60reltm, precision: 4, scale: 2
  		t.decimal :ca60reltm, precision: 4, scale: 2
  		t.decimal :cf_per_reltm, precision: 4, scale: 1
  		t.decimal :csh_per, precision: 4, scale: 1
  		t.decimal :csv_per, precision: 4, scale: 1
  		t.decimal :cpdo, precision: 4, scale: 1
  		t.integer :totfo
  		t.integer :nzfo
  		t.integer :dzfo
  		t.integer :ozfo
  		t.integer :igoals
  		t.integer	:iassists
  		t.integer :ipoints
  		t.decimal :ishot_per, precision: 4, scale: 1
  		t.decimal :igoals60, precision: 4, scale: 2
  		t.decimal :iassists60, precision: 4, scale: 2
  		t.decimal :ipoints60, precision: 4, scale: 2
  		t.decimal :ipp, precision: 4, scale: 1
  		t.decimal :igp, precision: 4, scale: 1
  		t.decimal :iap, precision: 4, scale: 1
  		t.integer :gf
  		t.integer :ga
  		t.decimal :gf60, precision: 4, scale: 2
  		t.decimal :ga60, precision: 4, scale: 2
  		t.decimal :gf_per, precision: 4, scale: 1
  		t.decimal :tmgf60, precision: 4, scale: 2
  		t.decimal :tmga60, precision: 4, scale: 2
  		t.decimal :tmgf_per, precision: 4, scale: 1
  		t.decimal :oppgf60, precision: 4, scale: 2
  		t.decimal :oppga60, precision: 4, scale: 2
  		t.decimal :oppgf_per, precision: 4, scale: 1
  		t.decimal :gf60reltm, precision: 4, scale: 2
  		t.decimal :ga60reltm, precision: 4, scale: 2
  		t.decimal :gf_per_reltm, precision: 4, scale: 1
  	end
  end
end
