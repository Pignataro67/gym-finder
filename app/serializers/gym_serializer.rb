class GymSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :classes

  has_many :reviews
  has_many :users, through: :reviews
end
