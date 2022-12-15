class UsersController < ApplicationController
  # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
    #  Users#Signup
    def create
      if params[:role] == 'doc'
      permitted_doctor_params = params.extract!(
        :phone_number,
        :name,
        :address,
        :degree,
        :logo,
        :university,
        :specialty,
        :mook,
      ).permit!
      puts "permitted", permitted_doctor_params
      puts "permitted", permitted_doctor_params.permitted?
      doctor = Doctor.create!(permitted_doctor_params)
      puts doctor
      permitted_user_params = params.extract!(
        :username, :password, :password_confirmation, :role
      ).permit!
      puts "permitted", permitted_user_params
      puts "permitted", permitted_user_params.permitted?
  
      user = doctor.user.create!(permitted_user_params)
      puts user
      # puts user_params
      # if user_params[:role] == 'doc'
      #   puts "params", user_params
      #   doctor = Doctor.create!(user_params.extract!())
      #   puts "doctor", doctor
      #   session[:user_id] = user.id
      #   render json: user, status: :created
      # elsif @user_params[:role] == 'pet'
      #   animal = Animal.create!(@animal_params)
      #   user = doctor.users.create!(@user_params)
      #   session[:user_id] = user.id
      #   render json: user, status: :created
      end
    end

  private
    # Only allow a list of trusted parameters through.
    # def user_params
    #   params.permit(:phone_number, :address, :degree, :logo, :university, :specialty, :name, :sex, :breed, :color,  :age, :existing_conditions, :notes, :disposition, :classification, :username, :password, :password_confirmation, :role)
    # end

    # def render_unprocessable_entity_response invalid
    #   render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    # end

    # def render_not_found_response
    #   render json: { errors: ["User not found"]}, status: :not_found
    # end

end
