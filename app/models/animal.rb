class Animal < ApplicationRecord

  has_one :user, as: :user_info
  has_many :appointments
  has_many :doctors, through: :appointments
end
