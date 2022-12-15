class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :animal_id
      t.integer :doctor_id
      t.timestamps
    end
  end
end
