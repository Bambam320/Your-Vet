class DoctorsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # /me
  def show
    doctor = Doctor.find(session[:doctor_id])
    render json: doctor, status: :created
  end

  # /signup
  def create
    doctor = Doctor.create!(doctor_params)
    session[:doctor_id]= doctor.id
    render json: doctor, status: :ok
  end

  private

    # Only allow a list of trusted parameters through.
    def doctor_params
      params.permit(
        :username, 
        :password, 
        :password_confirmation,
        :phone_number,
        :name,
        :address,
        :degree,
        :logo,
        :university,
        :specialty,
      )
    end

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
