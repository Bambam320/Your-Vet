class DoctorsController < ApplicationController
  #resuces from not found and invalid records
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # def topthree
  #   go through each doctor and find the length of their appointments
  #   return the sorted appointments from most to least
  #   return the first 3 Appointments
  #   add a key to each doctor containing the length of appointments for each
  #   new_array = []
  #   doctors = Doctor.all.each do |doc|
  #     new_array << {:name => doc.name, :count => doc.appointments.length}
  #   end
  #   sorted = new_array.sort { |a, b| a[:count] <=> b[:count] }
  #   finally_sorted = sorted.pop(3)
  #   render json: finally_sorted, status: :ok
  # end

  # def topthree
  #   doctors = Doctor.all.sort{ |a, b| b.appointments.count <=> a.appointments.count}
  #   .pop(3)
  #   .map{ |doc| {:count => doc.appointments.count, :name=> doc.name, :phone_number => doc.phone_number, :address => doc.address}}
  #   render json: doctors, include: [], status: :ok
  # end

  #creates a doctor and sets their id to the session then returns it
  def create
    doctor = Doctor.create!(doctor_params)
    session[:user_id] = doctor.id
    render json: doctor, status: :ok
  end

  #find the doctor through parameters and sends the json to the frontend
  def show
    doctor = Doctor.find(params[:id])
    render json: doctor, status: :ok
  end

  private

    # Only allow a list of trusted parameters through.
    def doctor_params
      params.permit(
        :id,
        :phone_number,
        :name,
        :address,
        :degree,
        :logo,
        :university,
        :specialty,
      )
    end

    #returns errors when exceptions are raised
    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
