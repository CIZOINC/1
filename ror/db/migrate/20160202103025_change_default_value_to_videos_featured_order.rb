class ChangeDefaultValueToVideosFeaturedOrder < ActiveRecord::Migration
  def change
    change_column :videos, :featured_order, :integer, default: nil
  end
end
