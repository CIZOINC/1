class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :videos, through: :taggings
end
