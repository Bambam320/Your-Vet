class RemoveUserIdFromAnimals < ActiveRecord::Migration[7.0]
  def change
    remove_column :animals, :user_id
  end
end
