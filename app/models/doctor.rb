class Doctor < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_many :appointments
  has_many :animals, through: :appointments
  has_secure_password
end
