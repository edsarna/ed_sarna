class AddPublicationDateToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :publication_date, :string
  end
end
