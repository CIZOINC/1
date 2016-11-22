class AddLimitToVideoDescriptionTitle < ActiveRecord::Migration
  def change
  	change_column :videos, :description_title, :string, limit: 255
  end
end
