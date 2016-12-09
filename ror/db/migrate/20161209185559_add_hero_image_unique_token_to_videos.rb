class AddHeroImageUniqueTokenToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :hero_image_unique_token, :string
  end
end
