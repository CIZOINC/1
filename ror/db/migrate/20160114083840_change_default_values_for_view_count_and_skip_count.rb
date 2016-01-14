class ChangeDefaultValuesForViewCountAndSkipCount < ActiveRecord::Migration
  def change
    change_column :videos, :view_count, :integer, default: 0
    change_column :videos, :skip_count, :integer, default: 0
  end
end
