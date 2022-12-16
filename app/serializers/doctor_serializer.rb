class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :phone_number, :name, :address, :degree, :logo, :university, :specialty
  has_one :user, as: :user_info
end
