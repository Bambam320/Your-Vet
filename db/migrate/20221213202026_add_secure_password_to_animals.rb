class AddSecurePasswordToAnimals < ActiveRecord::Migration[7.0]
  def change
    add_column :animals, :username, :string
    add_column :animals, :password_digest, :string
  end
end
