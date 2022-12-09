class DeleteAgeFromAnimals < ActiveRecord::Migration[7.0]
  def change
    remove_column :animals, :age
  end
end
