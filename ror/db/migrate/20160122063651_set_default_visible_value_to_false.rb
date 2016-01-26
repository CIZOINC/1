class SetDefaultVisibleValueToFalse < ActiveRecord::Migration
  def change
    change_column :videos, :visible, :boolean, default: false
  end
end
