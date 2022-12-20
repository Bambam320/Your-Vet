class AppointmentsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize_general, only: [:create] 
  before_action :authorize_user, only: [:update, :destroy]
  before_action :find_appointment, only: [:update, :destroy]
  wrap_parameters format: []


  def index
    render json: Appointment.all, status: :ok
  end

  def create
    appointment = Appointment.create!(appointment_params)
    if appointment
      render json: appointment, status: :created
    end
  end

  def update
    if find_appointment.update!(appointment_params)
      render json: find_appointment, status: :ok
    end
  end

  def destroy
    find_appointment.destroy
    render json: {}, status: :accepted
  end

  private

    def find_appointment
      return Appointment.find(params[:id])
    end

    def appointment_params
      params.permit(:time, :location, :doctor_id, :animal_id, :concern, :diagnosis, :prognosis)
    end

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

    def authorize_user
      return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session[:user_id] == find_appointment.doctor.user.id || session[:user_id] == find_appointment.animal.user.id
    end

    def authorize_general
      return render json:{errors: ["not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

end
