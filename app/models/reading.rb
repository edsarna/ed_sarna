class Reading < ApplicationRecord
  def friendly_created_at
    created_at.strftime("%b %d, %Y")
  end
end
