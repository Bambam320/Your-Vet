class AddTimeToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :time, :datetime
  end
end
