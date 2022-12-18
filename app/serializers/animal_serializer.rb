class AnimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :sex, :breed, :color, :age, :existing_conditions, :notes, :disposition, :classification
  has_one :user, as: :user_info
end
