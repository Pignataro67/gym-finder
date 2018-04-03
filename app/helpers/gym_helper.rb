module GymHelper

  def has_reviews(gym)
    !gym.reviews.empty? ? true : false
  end

  def gym_owner(gym)
    owner = gym.users.where(admin: true).first
    owner == current_user ? true : false
  end

  def add_date_to_review(gym)
    first_review = gym.reviews.first
    first_review.date = Date.today
    first_review.save
  end 
end

