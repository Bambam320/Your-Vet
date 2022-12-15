class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
    #  Users#Signup
    def create
      if user_params[:role] == 'doctor'
    end
      user = User.create!(user_params)
      session[:user_id]= user.id
      render json: user, status: :created
  rescue ActiveRecord::RecordInvalid => invalid
    render json:{error:invalid.record.errors.full_messages}, status: 422
  end


  def index
    # @users = User.all

    # render json: @users
  end


  def show
    # render json: @user
  end


  def update
    # if @user.update(user_params)
    #   render json: @user
    # else
    #   render json: @user.errors, status: :unprocessable_entity
    # end
  end

  # DELETE /users/1
  def destroy
    # @user.destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :password_confirmation, :role)
    end

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
