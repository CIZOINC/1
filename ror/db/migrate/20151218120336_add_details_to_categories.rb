class AddDetailsToCategories < ActiveRecord::Migration
  def change
    remove_column :categories, :title
    add_column :categories, :title, :string, null: false
    add_index :categories, :title, unique: true


  end
end
