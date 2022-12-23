class DoctorsController < ApplicationController
  #resuces from not found and invalid records
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

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
