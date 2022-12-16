class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :user_info_type, :user_info_id, :role, :username
  # :associated_doctor
  # :password_digest

  # def associated_doctor
  #   self.object.user_info
  # end
  
  belongs_to :user_info, polymorphic: true

  if super.user_info_type == "Doctor"
    byebug  
  end
end
