class Post < ApplicationRecord
  has_many :images
  has_many :comments

  def images_exist
    images.length > 0
  end

  def approved_comments
    comments.where(approved: true)
  end

  def featured_image
    images.find_by(featured: true)
  end

  def additional_images
    images.where(featured: false)
  end

  def friendly_created_at
    created_at.strftime("%b %d, %Y")
  end
end
