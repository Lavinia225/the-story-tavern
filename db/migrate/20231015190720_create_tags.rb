class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.integer :story_id
      t.integer :genre_id

      t.timestamps
    end
  end
end
