class AnimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :sex, :breed, :color, :age, :existing_conditions, :notes, :disposition, :classification
  has_one :user, as: :user_info
  has_many :appointments
  has_many :doctors, through: :appointments
end
