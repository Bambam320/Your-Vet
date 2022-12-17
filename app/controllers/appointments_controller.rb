class AppointmentsController < ApplicationController
  before_action :set_appointment, only: %i[ show update destroy ]
  before_action :authorize_general, only: [:create] 
  before_action :authorize_user, only: [:update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []

  def index
    render json: Appointment.all, status: :ok
  end

  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      render json: @appointment, status: :created, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @appointment.destroy
    render json: @appointment
  end

  private

    def set_appointment
      @appointment = Appointment.find(params[:id])
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
      return render json: { error: ["Not authorized"] }, status: :unauthorized unless session[:user_id] == @appointment.doctor.user.id || session[:user_id] == @appointment.animal.user.id
    end

    def authorize_general
      return render json:{error: ["not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

end
