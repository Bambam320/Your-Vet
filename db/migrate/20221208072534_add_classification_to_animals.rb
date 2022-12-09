class AddClassificationToAnimals < ActiveRecord::Migration[7.0]
  def change
    add_column :animals, :classification, :string
  end
end
