class User < ApplicationRecord
  has_many :reviews
  has_many :gyms, through: :reviews

  has_secure_password
  validates :user_name, :email, presence: true
  validates :email, uniqueness: true

  #validates :password_digest, length: { minimum: 7 }, allow_nil: true
end
