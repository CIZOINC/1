class RemoveLikedFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :liked, :boolean
  end
end
