class ReviewsController < ApplicationController

  before_action :set_review, only: [:edit, :show, :destroy, :update]
  before_action :authentication_required, only: [:new, :create, :destroy, :update, :edit]
  
  include ReviewHelper

  def create
    if !is_admin?

      @review = Review.new(review_params)
      @review.date = Date.today
      @review.user_id = current_user.id
      @review.save

      redirect_to root_path
    end
  end

  def edit
  end

  def update
    if valid_user?(@review)
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
end
