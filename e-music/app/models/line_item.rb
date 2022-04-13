class LineItem < ApplicationRecord
  belongs_to :cart
  belongs_to :instrument

  def total_price
    instrument.price.to_i * quantity.to_i
  end
  
end
