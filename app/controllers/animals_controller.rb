class AnimalsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  def create
    animal = Animal.create!(animal_params)
    session[:animal_id] = animal.id
    render json: animal, status: :ok
  end

  # GET /animals/1
  # def show
  #   animal = Animal.find(session[:animal_id])
  #   render json: animal, status: :created
  # end

  # # GET /animals
  # def index
  #   @animals = Animal.all

  #   render json: @animals
  # end

  # # PATCH/PUT /animals/1
  # def update
  #   if @animal.update(animal_params)
  #     render json: @animal
  #   else
  #     render json: @animal.errors, status: :unprocessable_entity
  #   end
  # end

  private
    # Only allow a list of trusted parameters through.
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
        :username,
        :password,
        :password_confirmation,
      )
    end

    def render_unprocessable_entity_response invalid
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
      render json: { errors: ["User not found"]}, status: :not_found
    end

end
