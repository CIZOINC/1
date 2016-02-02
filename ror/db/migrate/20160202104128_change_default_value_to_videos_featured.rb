class ChangeDefaultValueToVideosFeatured < ActiveRecord::Migration
  def change
    change_column :videos, :featured, :boolean, default: nil
  end
end
