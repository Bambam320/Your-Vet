class Doctor < ApplicationRecord
  # validates some attributes
  validates :name, :address, presence: true, uniqueness: true
  # has a user names as user_info which is shared with the doctor model
  has_one :user, as: :user_info
  #has many appointments and animals
  has_many :appointments
  has_many :animals, through: :appointments

end
