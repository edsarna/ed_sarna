class CreatePublications < ActiveRecord::Migration[5.2]
  def change
    create_table :publications do |t|
      t.string :title
      t.string :media_type
      t.text :short_blurb
      t.text :long_blurb
      t.datetime :pub_date
      t.text :full_text
      t.string :url

      t.timestamps
    end
  end
end
