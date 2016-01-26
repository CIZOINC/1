class ChangeFeaturedOrderIndex < ActiveRecord::Migration
  def change
    remove_index :videos, :featured_order
    add_index :videos, :featured_order, unique: false
  end
end
