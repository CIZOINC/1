class AddSubtitleToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :subtitle, :string, default: nil
  end
end
