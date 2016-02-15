class Category < ActiveRecord::Base
  has_many :videos
  validates_with CategoryCustomValidator
end
