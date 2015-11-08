class Players < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string :season
  		t.string :situation
  		t.string :name
  		t.string :pos
  		t.integer :gp
  		t.string :toi
  		t.integer :cf
  		t.integer :ca
  		t.decimal :cf60, precision: 3
  		t.decimal :ca60, precision: 3
  		t.decimal :cf_per, precision: 3
  		t.decimal :tmcf60, precision: 3
  		t.decimal :tmca60, precision: 3
  		t.decimal :tmcf_per, precision: 3
  		t.decimal :oppcf60, precision: 3
  		t.decimal :oppca60, precision: 3
  		t.decimal :oppcf_per, precision: 3
  		t.decimal :cf60reltm, precision: 3
  		t.decimal :ca60reltm, precision: 3
  		t.decimal :cf_per_reltm, precision: 3
  		t.decimal :cf60reltm, precision: 3
  		t.decimal :csh_per, precision: 3
  		t.decimal :csv_per, precision: 3
  		t.decimal :cpdo, precision: 4, scale: 1
  		t.integer :totfo
  		t.integer :nzfo
  		t.integer :dzfo
  		t.integer :ozfo
  		t.integer :igoals
  		t.integer	:iassists
  		t.integer :ipoints
  		t.decimal :ishot_per, precision: 3, scale: 1
  		t.decimal :igoals60, precision: 3
  		t.decimal :iassists60, precision: 3
  		t.decimal :ipoints60, precision: 3
  		t.decimal :ipp, precision: 3
  		t.decimal :igp, precision: 3
  		t.decimal :iap, precision: 3
  		t.integer :gf
  		t.integer :ga
  		t.decimal :gf60, precision: 3
  		t.decimal :ga60, precision: 3
  		t.decimal :gf_per, precision: 3
  		t.decimal :tmgf60, precision: 3
  		t.decimal :tmga60, precision: 3
  		t.decimal :tmgf_per, precision: 3
  		t.decimal :oppgf60, precision: 3
  		t.decimal :oppga60, precision: 3
  		t.decimal :oppgf_per, precision: 3
  		t.decimal :gf60reltm, precision: 3
  		t.decimal :ga60reltm, precision: 3
  		t.decimal :gf_per_reltm, precision: 3, scale: 1
  	end
  end
end
