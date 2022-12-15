class DeleteUsernamePasswordDigestFromAnimals < ActiveRecord::Migration[7.0]
  def change
    remove_column :animals, :username
    remove_column :animals, :password_digest
  end
end
