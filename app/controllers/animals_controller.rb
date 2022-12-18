class AnimalsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  def create
    animal = Animal.create!(animal_params)
    session[:animal_id] = animal.id
    render json: animal, status: :ok
  end

  def index
    render json: Animal.all, status: :ok
  end

  private
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

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
