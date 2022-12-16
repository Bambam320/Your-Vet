class Doctor < ApplicationRecord
  validates :name, :address, presence: true, uniqueness: true
  has_one :user, as: :user_info
  has_many :appointments
  has_many :animals, through: :appointments

end
