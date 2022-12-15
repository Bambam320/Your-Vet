class AddUserInfoIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :user_info, polymorphic: true    
  end
end
