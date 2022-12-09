class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date, :location, :doctor_id, :animal_id, :concern, :diagnosis, :prognosis
end
