class CreateReadings < ActiveRecord::Migration[5.2]
  def change
    create_table :readings do |t|
      t.string :title
      t.string :author
      t.string :media_type
      t.string :url
      t.text :text

      t.timestamps
    end
  end
end
