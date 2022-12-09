class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  def create
    user = User.find_by!(username: user_params[:username])
    if user&.authenticate(user_params[:password])
      session[:user_id]= user.id
      render json: user, status: 201
    end
  end
    
  def destroy
    session.delete :user_id  
    head :no_content
  end

  private 

  def user_params
    params.permit(:username, :password)
  end

  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { error: ["User not found"]}, status: :not_found
  end

end