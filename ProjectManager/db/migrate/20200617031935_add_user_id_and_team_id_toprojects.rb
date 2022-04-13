class AddUserIdAndTeamIdToprojects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects , :user_id, :integer
    add_column :projects, :team_id, :integer
  end
end
