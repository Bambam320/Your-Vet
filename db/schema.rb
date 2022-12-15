# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_15_110451) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "animals", force: :cascade do |t|
    t.string "name"
    t.string "sex"
    t.string "breed"
    t.string "color"
    t.string "existing_conditions"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "age"
    t.string "disposition"
    t.string "classification"
    t.integer "user_id"
  end

  create_table "appointments", force: :cascade do |t|
    t.text "date"
    t.string "location"
    t.integer "doctor_id"
    t.integer "animal_id"
    t.string "concern"
    t.string "diagnosis"
    t.string "prognosis"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["animal_id", "doctor_id"], name: "index_appointments_on_animal_id_and_doctor_id", unique: true
  end

  create_table "doctors", force: :cascade do |t|
    t.string "phone_number"
    t.string "name"
    t.string "address"
    t.string "degree"
    t.string "logo"
    t.string "university"
    t.string "specialty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role"
  end

end
