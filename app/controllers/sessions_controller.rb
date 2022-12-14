class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
  # /login
  def create
    doctor = Doctor.find_by!(username: doctor_params[:username])
    if doctor&.authenticate(doctor_params[:password])
      session[:doctor_id]= doctor.id
      render json: doctor, status: 201
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end    
  end
  

  # /logout
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
    render json: { errors: ["User not found"] }, status: :not_found
  end

end


  # This is baffling but try to get the RecordInvalid to fire when authenticate fails in the create action
  # def create
  #   doctor = Doctor.find_by!(username: doctor_params[:username])
  #   salt = doctor.password_digest[0..28]
  #   hash_check = BCrypt::Engine::hash_secret(doctor_params[:password], salt)
  #   auth = hash_check == doctor.password_digest
  #   if doctor && auth
  #     session[:doctor_id]= doctor.id
  #     render json: doctor, status: 201
  #   end    
  # end