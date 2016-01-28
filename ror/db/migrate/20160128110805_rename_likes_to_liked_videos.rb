class RenameLikesToLikedVideos < ActiveRecord::Migration
  def change
    rename_table :likes, :liked_videos
  end
end
