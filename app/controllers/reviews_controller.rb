class ReviewsController < ApplicationController

  before_action :set_review, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :create, :destroy, :update, :edit]
  
  include ReviewHelper

  def recent_reviews
    @recent_reviews = Review.recent_reviews
  end

  def create
    if !is_admin?
      @gym = Gym.find_by(id: params[:review][:gym_id])
      @review = @gym.reviews.build(review_params)
      @review.date = Date.today
      @gym.save
      render json: @review
    end
  end

  def edit
  end

  def show
    @review = Review.find(params[:id])
    @gym = @review.gym
  end

  def update
    if !valid_user?(@review)
      flash[:message] = "Sorry, You can only edit your review!"
      render :edit
    else
      if @review.update(review_params)
        redirect_to root_path
      else
        render :edit
      end
    end
  end

  def destroy
    if valid_user?(@review)
      @review.destroy
      redirect_to root_path
    end
  end

  private

  def review_params
    params.require(:review).permit(:class_rating, :personal_training_rating, :cleanliness_rating, :description, :date, :gym_id, :user_id, :id, :complete_name)
  end

  def set_review
    @review = Review.find_by(id: params[:id])
  end
end
