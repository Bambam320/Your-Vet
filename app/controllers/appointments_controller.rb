class AppointmentsController < ApplicationController
  # rescues the actions from errors
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # assigns private methods to authorize users for certain actions
  before_action :authorize_general, only: [:create] 
  before_action :authorize_user, only: [:update, :destroy]
  before_action :find_appointment, only: [:update, :destroy]
  # wraps parameters so that the correct portion of the parameters are used
  wrap_parameters format: []

#returns all appointments
  def index
    render json: Appointment.all, status: :ok
  end

  # creates an appointment and returns it if valid
  def create
    appointment = Appointment.create!(appointment_params)
    if appointment
      render json: appointment, status: :created
    end
  end

  # updates an appointment and returns it if valid
  def update
    if find_appointment.update!(appointment_params)
      render json: find_appointment, status: :ok
    end
  end

  #destroys the appointment provided and returns an empty object
  def destroy
    find_appointment.destroy
    render json: {}, status: :accepted
  end

  private

  #returns the appointment from the id in parameters
    def find_appointment
      return Appointment.find(params[:id])
    end

#permits the appointment params as necessary
    def appointment_params
      params.permit(:time, :location, :doctor_id, :animal_id, :concern, :diagnosis, :prognosis)
    end

    # returns errors as the validations raise them
    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    # returns errors when not found is raised 
    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

    #authorizes a user for actions pertaining only to that user
    def authorize_user
      return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session[:user_id] == find_appointment.doctor.user.id || session[:user_id] == find_appointment.animal.user.id
    end

    #authorizes a user to be logged in before allowing the action
    def authorize_general
      return render json:{errors: ["not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

end
