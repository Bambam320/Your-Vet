class AnimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :sex, :breed, :color, :age, :existing_conditions, :notes
end
