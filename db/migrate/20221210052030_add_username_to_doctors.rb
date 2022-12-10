class AddUsernameToDoctors < ActiveRecord::Migration[7.0]
  def change
    add_column :doctors, :username, :string
  end
end
