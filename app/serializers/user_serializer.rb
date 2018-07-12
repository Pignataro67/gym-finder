class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :email, :admin

  has_many :reviews
  has_many :gyms, through: :reviews
end