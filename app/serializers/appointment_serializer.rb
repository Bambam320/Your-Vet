class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :location, :time, :doctor_id, :animal_id, :concern, :diagnosis, :prognosis
  belongs_to :doctor
  belongs_to :animal
end

