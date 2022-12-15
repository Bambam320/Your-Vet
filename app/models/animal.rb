class Animal < ApplicationRecord

  has_one :user
  has_many :appointments
  has_many :doctors, through: :appointments
end
