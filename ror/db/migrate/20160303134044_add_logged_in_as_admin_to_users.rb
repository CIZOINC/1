class AddLoggedInAsAdminToUsers < ActiveRecord::Migration
  def change
    add_column :users, :logged_in_as_admin, :boolean
  end
end
