class CreateAppearences < ActiveRecord::Migration[6.0]
  def change
    create_table :appearences do |t|
      t.references :player, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
