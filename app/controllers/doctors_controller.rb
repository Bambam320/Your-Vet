class DoctorsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def show
    user = User.find(session[:user_id])
    render json: user, status: :created
  end

  def create
    user = User.create!(user_params)
    session[:user_id]= user.id
    render json: user, status: :ok
  end

  private

    # Only allow a list of trusted parameters through.
    def doctor_params
      params.permit(:username, :password, :password_confirmation)
    end

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { error: ["User not found"]}, status: :not_found
    end

end
