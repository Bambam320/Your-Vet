class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
    #Users#all
    def index
      user = User.find(session[:user_id])
      type_of = user.role
      users = User.all.where(role: type_of).where.not('id = ?', user.id)
      render json: users, status: :ok
    end

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
      render json: user, include: ['user_info', 'user_info.appointments', 'user_info.animals'], status: 201
      end
    end
  


    def show
      render User.find(session[:user_id]), status: :ok
    end

  private

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
