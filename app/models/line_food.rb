class LineFood < ApplicationRecord
  ## LineFoodモデルとFoodモデルは1:1の関係
  belongs_to :food
  ## optional: trueはbelongs_toの外部キーのnilを許可するもの
  ## つまり、関連付け先が存在しなくてもいいという意味
  belongs_to :order, optional: true
  belongs_to :restaurant

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  ## 他の店舗の仮注文があるかどうかを確認する
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id)}

  def total_amount
    food.price * count
  end
end
