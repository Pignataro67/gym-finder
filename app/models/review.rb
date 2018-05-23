class Review < ApplicationRecord
  belongs_to :user
  belongs_to :gym

  default_scope -> { order(created_at: :desc) }

  scope :recent_reviews, -> { order(created_at: :desc).limit(10) }
end
