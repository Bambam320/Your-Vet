class ChangeTimeColumnTypeInAppointmentsToString < ActiveRecord::Migration[7.0]
  def change
    change_column :appointments, :time, :string
  end
end
