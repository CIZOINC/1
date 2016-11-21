class AddDescriptionTitleToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :description_title, :string, default: nil
  end
end
