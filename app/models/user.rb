class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  
  has_secure_password
  belongs_to :user_info, polymorphic: true
end
