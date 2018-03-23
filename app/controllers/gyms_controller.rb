class GymsController < ApplicationController

  before_action :set_gym, only: [:edit, :show, :destroy, :update]
  before_action :authenticate_required, only: [:new, :show, :create, :destroy, :update, :edit]

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
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
