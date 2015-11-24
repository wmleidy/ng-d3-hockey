class Teams < ActiveRecord::Migration
  def change
  	create_table :teams do |t|
  		t.string  :season, limit: 10
  		t.string  :situation, limit: 20
      t.string  :name, limit: 16
      t.integer :gp
  		t.integer :toi
  		t.integer :gf
  		t.integer :ga
  		t.decimal :gf60, precision: 4, scale: 2
  		t.decimal :ga60, precision: 4, scale: 2
  		t.decimal :gf_per, precision: 4, scale: 1
  		t.integer :cf
  		t.integer :ca
  		t.decimal :cf60, precision: 4, scale: 2
  		t.decimal :ca60, precision: 4, scale: 2
  		t.decimal :cf_per, precision: 4, scale: 1
  		t.decimal :sh_per, precision: 4, scale: 2
  		t.decimal :sv_per, precision: 4, scale: 2
  		t.decimal :pdo, precision: 5, scale: 2
  		t.decimal :csh_per, precision: 4, scale: 1
  		t.decimal :csv_per, precision: 4, scale: 1
  		t.decimal :cpdo, precision: 5, scale: 2
  		t.integer :nzfo_per, precision: 4, scale: 2
  		t.integer :dzfo_per, precision: 4, scale: 2
  		t.integer :ozfo_per, precision: 4, scale: 2
      t.string  :primary_color
      t.string  :secondary_color
  	end
  end
end
