class AddReadingDateToReadings < ActiveRecord::Migration[5.2]
  def change
    add_column :readings, :reading_date, :string
  end
end
