class UsersController < ApplicationController

  before_action :set_user

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.admin = true if params[:user][:admin] == "true"
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def show 
    render json: @user, status: 200
  end

private

  def user_params
    params.require(:user).permit(:user_name, :email, :password)
  end

  def set_user
    @user = User.find_by(id: params[:id])
  end
end
