class CreateScenses < ActiveRecord::Migration[6.0]
  def change
    create_table :scenses do |t|
      t.string :name
      t.string :image_url
      t.string :content
      t.timestamps
    end
  end
end
