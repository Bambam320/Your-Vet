class AddPassworddigestToDoctors < ActiveRecord::Migration[7.0]
  def change
    add_column :doctors, :password_digest, :string
  end
end
