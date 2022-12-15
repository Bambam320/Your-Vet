class AddIndexConstraintToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_index :appointments, [:animal_id, :doctor_id], unique: true
  end
end
