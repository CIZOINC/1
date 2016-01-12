class ChangeVideoColumns < ActiveRecord::Migration
  def change
    remove_column :videos, :mpaa_rating
    add_column :videos, :mature_content, :boolean, default: false
  end
end
