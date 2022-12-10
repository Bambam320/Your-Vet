class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  # sessions#create
  def create
    doctor = Doctor.find_by!(username: doctor_params[:username])
    if doctor&.authenticate(doctor_params[:password])
      session[:doctor_id]= doctor.id
      render json: doctor, status: 201
    end
  end

  def destroy
    session.delete :doctor_id  
    head :no_content
  end

  private 

  def doctor_params
    params.permit(:username, :password)
  end

  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { error: ["User not found"]}, status: :not_found
  end

end