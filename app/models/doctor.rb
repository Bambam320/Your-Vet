class Doctor < ApplicationRecord
  has_many :appointments
  has_many :animals, through: :appointments
  has_secure_password
end
