class Tag < ActiveRecord::Base
   belongs_to :genre
   belongs_to :story

   validates :story_id, presence: true
   validates :genre_id, presence: true
   validate :unique

   def unique
      tag_doesnt_exist = !Tag.find_by(["story_id = ? AND genre_id = ?", "#{self.story_id}", "#{self.genre_id}"])
      unless tag_doesnt_exist
         errors.add(:unique, "Must not already exist") 
      end
   end
end