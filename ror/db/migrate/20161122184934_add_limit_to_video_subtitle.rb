class AddLimitToVideoSubtitle < ActiveRecord::Migration
  def change
  	change_column :videos, :subtitle, :string, limit: 255
  end
end
