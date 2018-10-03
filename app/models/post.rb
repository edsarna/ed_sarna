class Post < ApplicationRecord
  has_many :images

  def images_exist
    images.length > 0
  end
end
