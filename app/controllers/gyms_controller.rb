class GymsController < ApplicationController

  before_action :set_gym, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :show, :create, :destroy, :update, :edit]

  include GymHelper

  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @gyms = @user.gyms
    else
      @gyms = Gym.all
    end 
  end

  def new
    @gym = Gym.new
    @review = @gym.reviews.build
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
      flash[:message] = "Sorry you need an admin account to add a Gym"
    end
      redirect_to root_path
  end

  def show
    @review = @gym.reviews.build
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

  private

  def gym_params
    params.require(:gym).permit(:name, :location, :classes)
  end

  def set_gym
    @gym = Gym.all.find_by(id: params[:id])
  end
end
