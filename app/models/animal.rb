class Animal < ApplicationRecord

  # has a user names as user_info which is shared with the doctor model
  has_one :user, as: :user_info
  # has many appointments and doctors
  has_many :appointments
  has_many :doctors, through: :appointments
end
