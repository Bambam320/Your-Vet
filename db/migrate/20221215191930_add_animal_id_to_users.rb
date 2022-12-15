class AddAnimalIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :animal_id, :integer
  end
end
