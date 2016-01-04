class AddVideoIdToStreams < ActiveRecord::Migration
  def change
    add_column :streams, :video_id, :integer
  end
end
