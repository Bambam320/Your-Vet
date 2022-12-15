class RemoveUserIdFromDoctors < ActiveRecord::Migration[7.0]
  def change
    remove_column :doctors, :user_id
  end
end
