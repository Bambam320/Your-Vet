class DeleteUsernamePasswordDigestFromDoctors < ActiveRecord::Migration[7.0]
  def change
    remove_column :doctors, :username
    remove_column :doctors, :password_digest
  end
end
