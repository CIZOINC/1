class AddSkipCountToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :skip_count, :integer
  end
end
