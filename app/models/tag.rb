class Tag < ActiveRecord::Base
   belongs_to :genre
   belongs_to :story

   validates :story_id, presence: true
   validates :genre_id, presence: true
end