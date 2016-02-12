class AddHeroImageTmpToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :hero_image_tmp, :string
  end
end
