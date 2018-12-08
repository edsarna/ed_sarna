class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :commenter
      t.text :comment
      t.boolean :approved
      t.integer :post_id

      t.timestamps
    end
  end
end
