class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  
  has_secure_password
  belongs_to :doctor
  # belongs_to :animal
end
