class RemoveHHeroImageLinkFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :hero_image_link, :string
  end
end
