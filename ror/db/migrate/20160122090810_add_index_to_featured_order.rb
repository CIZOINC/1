class AddIndexToFeaturedOrder < ActiveRecord::Migration
  def change
    add_index :videos, :featured_order, unique: true
  end
end
