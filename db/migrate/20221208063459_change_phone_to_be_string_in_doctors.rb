class ChangePhoneToBeStringInDoctors < ActiveRecord::Migration[7.0]
  def change
    change_column :doctors, :phone_number, :string
  end
end
