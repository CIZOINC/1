class AddJobIdToStream < ActiveRecord::Migration
  def change
    add_column :streams, :job_id, :string
  end
end
