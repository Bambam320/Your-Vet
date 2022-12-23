class Appointment < ApplicationRecord
  #each appointment belongs to a doctor and an animal
  belongs_to :doctor
  belongs_to :animal
end
