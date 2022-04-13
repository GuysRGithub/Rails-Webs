class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.references :account
      t.string :name
      t.string :address
      t.integer :price
      t.integer :room
      t.integer :bathroom
      t.string :phto

      t.timestamps
    end
  end
end
