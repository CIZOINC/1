class AddPrefixToStreams < ActiveRecord::Migration
  def change
    add_column :streams, :prefix, :string
  end
end
