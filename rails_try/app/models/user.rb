class User < ApplicationRecord
  has_secure_password
  validates :name, :email, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: true }, format: { with: VALID_EMAIL_REGEX }
  
end
