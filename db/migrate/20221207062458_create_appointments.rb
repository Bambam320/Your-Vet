class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.text :date
      t.string :location
      t.integer :doctor_id
      t.integer :animal_id
      t.string :concern
      t.string :diagnosis
      t.string :prognosis

      t.timestamps
    end
  end
end
