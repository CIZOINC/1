class AddIndexToVideoStream < ActiveRecord::Migration
  def change
    add_index :streams, [:video_id, :stream_type], unique: true
  end
end
