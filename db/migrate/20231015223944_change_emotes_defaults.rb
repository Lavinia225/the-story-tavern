class ChangeEmotesDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:emotes, :happy, false)
    change_column_default(:emotes, :sad, false)
    change_column_default(:emotes, :mad, false)
    change_column_default(:emotes, :heart, false)
  end
end
