class ChangeDefaultTranscodeStatusToPending < ActiveRecord::Migration
  def change
  	change_column :streams, :transcode_status, :string,  default: "pending"
  end
end
