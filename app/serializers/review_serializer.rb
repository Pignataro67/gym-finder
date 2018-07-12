class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :class_rating, :personal_training_rating, :cleanliness_rating, :description, :date, :complete_name, :user_id, :gym_id

  belongs_to :gym
  belongs_to :user
end