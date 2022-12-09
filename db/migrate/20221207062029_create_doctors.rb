class CreateDoctors < ActiveRecord::Migration[7.0]
  def change
    create_table :doctors do |t|
      t.integer :phone_number
      t.string :name
      t.string :address
      t.string :degree
      t.string :logo
      t.string :university
      t.string :specialty

      t.timestamps
    end
  end
end
