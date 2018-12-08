class Post < ApplicationRecord
  has_many :images
  has_many :comments

  def images_exist
    images.length > 0
  end

  def approved_comments
    comments.where(approved: true)
  end
end
