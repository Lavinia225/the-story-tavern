class CreateEmotes < ActiveRecord::Migration[6.1]
  def change
    create_table :emotes do |t|
      t.integer :story_id
      t.integer :user_id
      t.boolean :happy
      t.boolean :sad
      t.boolean :mad
      t.boolean :heart

      t.timestamps
    end
  end
end
