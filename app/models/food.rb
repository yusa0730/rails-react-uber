class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  ## LineFoodモデルとは1:1の関係にあるのでhas_oneを定義
  has_one :line_food
end