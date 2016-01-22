class RemoveViewableFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :viewable, :boolean, default: false
  end
end
