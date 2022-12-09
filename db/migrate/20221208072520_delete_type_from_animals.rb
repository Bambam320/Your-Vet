class DeleteTypeFromAnimals < ActiveRecord::Migration[7.0]
  def change
    remove_column :animals, :type
  end
end
