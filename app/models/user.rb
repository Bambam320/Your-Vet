class User < ApplicationRecord
  #validates the username to be unique between animals and doctors
  validates :username, presence: true, uniqueness: true
  #has a secure password from bcrypt
  has_secure_password
  #belongs to the user_info index in user which can store animals or doctors using the polymorphic option
  belongs_to :user_info, polymorphic: true
end
