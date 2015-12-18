class Category < ActiveRecord::Base
  has_many :videos
  validates :title, presence: true
  validates :title, uniqueness: true
end
