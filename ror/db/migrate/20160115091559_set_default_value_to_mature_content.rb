class SetDefaultValueToMatureContent < ActiveRecord::Migration
  def change
    change_column :videos, :mature_content, :boolean, default: false
  end
end
