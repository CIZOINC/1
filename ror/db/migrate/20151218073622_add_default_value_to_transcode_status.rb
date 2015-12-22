class AddDefaultValueToTranscodeStatus < ActiveRecord::Migration
  def change
    change_column :streams, :transcode_status, :string,  default: "submitted"
  end
end
