class CreateStreams < ActiveRecord::Migration
  def change
    create_table :streams do |t|
      t.string :link
      t.string :type
      t.string :transcode_status

      t.timestamps null: false
    end
  end
end
