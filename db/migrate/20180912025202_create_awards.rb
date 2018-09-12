class CreateAwards < ActiveRecord::Migration[5.2]
  def change
    create_table :awards do |t|
      t.string :title
      t.text :text
      t.string :url
      t.integer :publication_id
      t.datetime :date_received

      t.timestamps
    end
  end
end
