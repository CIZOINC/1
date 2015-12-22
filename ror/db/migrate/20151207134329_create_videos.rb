class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :title
      t.string :description
      t.string :mpaa_rating
      t.integer :category_id
      t.boolean :viewable
      t.string :hero_image_link
      t.boolean :liked
      t.integer :view_count

      t.timestamps null: false
    end
  end
end
