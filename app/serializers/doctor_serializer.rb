class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :phone_number, :name, :address, :degree, :logo, :university, :specialty
end
