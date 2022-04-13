class RenameColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :players, :name, :first_name
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
