class ChangeAccessLevelDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:users, :access_level, 0)
  end
end
