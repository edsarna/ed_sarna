class AddFeaturedToImages < ActiveRecord::Migration[5.2]
  def change
    add_column :images, :featured, :boolean
  end
end
