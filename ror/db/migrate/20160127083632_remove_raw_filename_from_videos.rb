class RemoveRawFilenameFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :raw_filename, :string
  end
end
