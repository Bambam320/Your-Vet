class Doctor < ApplicationRecord
  validates :name, :address, presence: true, uniqueness: true
  has_one :user
  has_many :appointments
  has_many :animals, through: :appointments

  def self.create_a_new_doctor params
    doctor = Doctor.create!(params)
    puts "new doctor", doctor
  end

end
