class AddFeaturedOrderToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :featured_order, :integer
  end
end
