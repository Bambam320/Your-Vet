class UsersController < ApplicationController
  #rescues the exceptions raised when the record is notfound or invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
    #returns the users that are of the same type as the logged in user that has the logged in user removed
    #Users#all
    def index
      user = User.find(session[:user_id])
      type_of = user.role
      users = User.all.where(role: type_of).where.not('id = ?', user.id)
      render json: users, status: :ok
    end

    # signs up a doctor or an animal based on the role selected from the front end then creates a user associated to the model
    #  Users#Signup
    def create
      if params[:role] == 'doc'
      permitted_doctor_params = params.extract!(:phone_number, :name, :address, :degree, :logo, :university, :specialty).permit!
      doctor = Doctor.create!(permitted_doctor_params)
      permitted_user_params = params.extract!(
        :username, :password, :password_confirmation, :role
      ).permit!
      user = doctor.create_user!(permitted_user_params)
      session[:user_id] = user.id
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.animals'], status: 201
    elsif params[:role] == 'pet'
      permitted_animal_params = params.extract!(:name, :sex, :breed, :color, :existing_conditions, :age, :disposition, :classification).permit!
      animal = Animal.create!(permitted_animal_params)
      permitted_user_params = params.extract!(
        :username, :password, :password_confirmation, :role
      ).permit!
      user = animal.create_user!(permitted_user_params)
      session[:user_id] = user.id
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.doctors'], status: 201
      end
    end
  
    # returns the user from the session id
    def show
      render User.find(session[:user_id]), status: :ok
    end

  private

    #returns errors for any exceptions raised
    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
