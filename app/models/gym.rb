class Gym < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews

  validates :name, :presence => true
  validates :location, :presence => true
  validates :classes, :presence => true
end
