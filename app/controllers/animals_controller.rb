class AnimalsController < ApplicationController
  # rescues errors that come from the actions
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  # sends the created animal back if valid
  def create
    animal = Animal.create!(animal_params)
    session[:animal_id] = animal.id
    render json: animal, status: :ok
  end

  # sends only those animals that do not currently have an appointment with the logged in doctor
  def index
    user = User.find(session[:user_id])
    if user.user_info_type == 'Doctor'
      animals_with_set_appointments = Appointment.where('doctor_id = ?', user.user_info_id).map { |apps| apps.animal_id }
      animals_with_set_appointments.length > 0 ? nil : animals_with_set_appointments = [0]
      render json: Animal.where.not("id IN (?)", animals_with_set_appointments).order(:name), status: :ok
      # otherwise all animals are sent
    else
      render json: Animal.all, status: :ok
    end
  end

  private
  #permitting only the required paramters
    def animal_params
      params.permit(
        :name, 
        :sex, 
        :breed, 
        :color, 
        :age, 
        :existing_conditions, 
        :notes,
        :age,
        :disposition,
        :classification,
      )
    end

    #rescues errors and provides errors to the front
    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
