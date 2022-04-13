class AddColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :last_name, :string
    # Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
