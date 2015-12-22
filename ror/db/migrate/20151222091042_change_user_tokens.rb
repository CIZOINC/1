class ChangeUserTokens < ActiveRecord::Migration
  def change
    rename_column :users, :token, :access_token
    add_column :users, :refresh_token, :string
  end
end
