class Gym < ApplicationRecord  
  has_many :reviews
  has_many :users, through: :reviews

  validates :name, :presence => true
  validates :location, :presence => true
  validates :classes, :presence => true

  def reviews_attributes=(reviews_attributes)
    reviews_attributes.each do |i, review_attributes|
      self.reviews.build(review_attributes)
    end
  end

  def self.best_gym_classes 
    self.all.select do |gym|
      gym.name if gym.reviews.any?{ |review|
        review.class_rating == 3}
    end
  end

  def self.best_gym_pts
    self.all.select do |gym|
      gym if gym.reviews.any?{ |review| 
        review.personal_training_rating == 3}
    end
  end

  def next
    gym = Gym.where("id > ?", id).first
    if gym
      gym
    else
      Gym.first
    end
  end
end
