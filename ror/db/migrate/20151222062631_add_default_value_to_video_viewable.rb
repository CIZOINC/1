class AddDefaultValueToVideoViewable < ActiveRecord::Migration
  def change
    change_column :videos, :viewable, :boolean, default: false
  end
end
