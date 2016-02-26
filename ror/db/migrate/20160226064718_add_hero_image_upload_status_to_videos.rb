class AddHeroImageUploadStatusToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :hero_image_upload_status, :string
  end
end
