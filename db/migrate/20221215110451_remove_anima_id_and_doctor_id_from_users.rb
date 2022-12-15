class RemoveAnimaIdAndDoctorIdFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :animal_id
    remove_column :users, :doctor_id
  end
end
