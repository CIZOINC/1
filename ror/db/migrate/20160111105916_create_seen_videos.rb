class CreateSeenVideos < ActiveRecord::Migration
  def change
    create_table :seen_videos do |t|
      t.integer :user_id
      t.integer :video_id

      t.timestamps null: false

    end
    add_index :seen_videos, [:user_id, :video_id], unique: true
  end
end
