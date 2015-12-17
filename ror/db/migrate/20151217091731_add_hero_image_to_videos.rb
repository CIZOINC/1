class AddHeroImageToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :hero_image, :string
  end
end
