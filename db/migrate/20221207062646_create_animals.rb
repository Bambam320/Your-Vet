class CreateAnimals < ActiveRecord::Migration[7.0]
  def change
    create_table :animals do |t|
      t.string :name
      t.string :sex
      t.string :breed
      t.string :color
      t.string :age
      t.string :existing_conditions
      t.string :notes

      t.timestamps
    end
  end
end
