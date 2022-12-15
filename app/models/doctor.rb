class Doctor < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_many :users
  has_many :animals, through: :users
  has_many :appointments
  has_many :animals, through: :appointments
end
