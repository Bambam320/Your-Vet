class Animal < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_many :users
  has_many :doctorss, through: :users
  has_many :appointments
  has_many :doctors, through: :appointments
end
