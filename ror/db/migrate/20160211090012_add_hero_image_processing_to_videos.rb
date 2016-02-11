class AddHeroImageProcessingToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :hero_image_processing, :boolean, null: false, default: false
  end
end
