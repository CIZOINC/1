class AddRawFilenameToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :raw_filename, :string
  end
end
