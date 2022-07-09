class CreateLineFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :line_foods do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.references :food, null: false, foreign_key: true
      ## orderが確定するまではline_foodsレコードはorderのことを知らないので、初期値はnullを許可するため
      t.references :order, foreign_key: true
      t.integer :count, null: false, default: 0
      t.boolean :active, null: false, default: false

      t.timestamps
    end
  end
end
