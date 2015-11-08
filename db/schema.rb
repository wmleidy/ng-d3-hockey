# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151108052123) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "players", force: :cascade do |t|
    t.string  "season",       limit: 10
    t.string  "situation",    limit: 20
    t.string  "name",         limit: 40
    t.string  "team",         limit: 16
    t.string  "pos",          limit: 6
    t.integer "gp"
    t.integer "toi"
    t.integer "cf"
    t.integer "ca"
    t.decimal "cf60",                    precision: 3
    t.decimal "ca60",                    precision: 3
    t.decimal "cf_per",                  precision: 3
    t.decimal "tmcf60",                  precision: 3
    t.decimal "tmca60",                  precision: 3
    t.decimal "tmcf_per",                precision: 3
    t.decimal "oppcf60",                 precision: 3
    t.decimal "oppca60",                 precision: 3
    t.decimal "oppcf_per",               precision: 3
    t.decimal "cf60reltm",               precision: 3
    t.decimal "ca60reltm",               precision: 3
    t.decimal "cf_per_reltm",            precision: 3
    t.decimal "csh_per",                 precision: 3
    t.decimal "csv_per",                 precision: 3
    t.decimal "cpdo",                    precision: 4, scale: 1
    t.integer "totfo"
    t.integer "nzfo"
    t.integer "dzfo"
    t.integer "ozfo"
    t.integer "igoals"
    t.integer "iassists"
    t.integer "ipoints"
    t.decimal "ishot_per",               precision: 3
    t.decimal "igoals60",                precision: 3
    t.decimal "iassists60",              precision: 3
    t.decimal "ipoints60",               precision: 3
    t.decimal "ipp",                     precision: 3
    t.decimal "igp",                     precision: 3
    t.decimal "iap",                     precision: 3
    t.integer "gf"
    t.integer "ga"
    t.decimal "gf60",                    precision: 3
    t.decimal "ga60",                    precision: 3
    t.decimal "gf_per",                  precision: 3
    t.decimal "tmgf60",                  precision: 3
    t.decimal "tmga60",                  precision: 3
    t.decimal "tmgf_per",                precision: 3
    t.decimal "oppgf60",                 precision: 3
    t.decimal "oppga60",                 precision: 3
    t.decimal "oppgf_per",               precision: 3
    t.decimal "gf60reltm",               precision: 3
    t.decimal "ga60reltm",               precision: 3
    t.decimal "gf_per_reltm",            precision: 3
  end

end
