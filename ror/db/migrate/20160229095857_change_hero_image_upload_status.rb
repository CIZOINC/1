class ChangeHeroImageUploadStatus < ActiveRecord::Migration
  def change
  change_column :videos, :hero_image_upload_status, :string, default: 'idle'
  end
end
