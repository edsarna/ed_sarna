class AddImageToPublications < ActiveRecord::Migration[5.2]
  def change
    add_column :publications, :image_url, :string
  end
end
