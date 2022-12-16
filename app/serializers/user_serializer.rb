class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :user_info_type, :user_info_id, :role, :username
  belongs_to :user_info, polymorphic: true
  
end