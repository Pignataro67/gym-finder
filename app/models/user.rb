class User < ApplicationRecord
  has_many :reviews
  has_many :gyms, through: :reviews

  validates :user_name, :email, presence: true
  validates :email, uniqueness: true

  has_secure_password
end
