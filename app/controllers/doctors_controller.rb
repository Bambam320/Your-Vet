class DoctorsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    doctor = Doctor.create!(doctor_params)
    session[:user_id] = doctor.id
    render json: doctor, status: :ok
  end
  
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

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
