class Game < ApplicationRecord
  has_many :appearences
  has_many :players, through: :appearences, dependent: :destroy
end
