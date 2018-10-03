class GymsController < ApplicationController

  before_action :set_gym, only: [:edit, :show, :destroy, :update, :next]  
  before_action :authentication_required, only: [:new, :show, :create, :destroy, :update, :edit]

  include GymsHelper
  
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      @gyms = user.gyms
      @is_admin = is_admin?.to_s
      render json: @gyms
    else
      @gyms = Gym.all
      @is_admin = is_admin?.to_s
      respond_to do |f|
        f.html
        f.json {render json: @gyms}
      end
    end 
  end

  def new
    @gym = Gym.new
    @review = @gym.reviews.build
    respond_to do |f|
      f.json {render json: @review}
      f.html
    end
  end

  def create
    if is_admin?
      @gym = Gym.find_by(name: params[:gym][:name], location: params[:gym][:location])
      if !!@gym
        flash[:message] = "That Gym already exists!"
      else
        @gym = Gym.create(gym_params)
        add_date_to_review(@gym)
        @gym.save
      end
    else
      flash[:message] = "We're sorry, you need an admin account to add a Gym."
    end
      redirect_to root_path
  end

  def show
    @review = Review.new
    respond_to do |f|
      f.json {render json: @gym}
      f.html
    end
  end

  def edit
  end

  def update
    if is_admin? && gym_owner(@gym)
      if @gym.update(gym_params)
        redirect_to gym_path(@gym)
      else
        render :new  
      end
    end
  end

  def destroy
    if is_admin? && gym_owner(@gym)
      @gym.destroy
      redirect_to root_path
    end
  end

  def next
    @next_gym = @gym.next
    render json: @next_gym
  end

  def recent_reviews
   @recent_reviews = Review.recent_reviews
 end

  protected

  def gym_params
    params.require(:gym).permit(:name, :location, :classes, :reviews_attributes => [:class_rating, :personal_training_rating, :cleanliness_rating, :description, :date, :user_id, :gym_id, :complete_name])
  end

  def set_gym
    @gym = Gym.all.find_by(id: params[:id])
  end
end
