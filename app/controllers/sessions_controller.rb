class SessionsController < ApplicationController
  #rescues exceptions when data is not found or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
  # finds a user and authenticates them then returns the user with associated data based on the type of user thats logged in
  # /login
  def create
    user = User.find_by!(username: user_params[:username])
    if user.user_info_type == 'Doctor' && user.authenticate(user_params[:password])
      session[:user_id]= user.id
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.animals'], status: 201
    elsif user.user_info_type == 'Animal' && user.authenticate(user_params[:password])
      session[:user_id]= user.id
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.doctors'], status: 201
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end    
  end
  
  #if the user is logged in, the users data and all associated information will be returned
  # /me
  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      if user.user_info_type == 'Doctor'
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.animals'], status: :ok
      else
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.doctors'], status: :ok
      end
    else
      render json: {}, status: :not_found
    end
  end

  #the user in the sessions will be automatically logged out
  # /logout
  def destroy
    session[:user_id] = nil
    head :no_content
  end

  private 

  #sets the user_params
  def user_params
    params.permit(:username, :password, :role)
  end

  #returns the errors in case the exceptions are raised
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