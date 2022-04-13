class Appearence < ApplicationRecord
  belongs_to :player, dependent: :destroy
  belongs_to :game
end
