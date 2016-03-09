class AddCanonicalTitleToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :canonical_title, :string
  end
end
