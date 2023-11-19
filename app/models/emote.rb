class Emote < ActiveRecord::Base
   belongs_to :user 
   belongs_to :story

   validates :user_id, presence: true
   validates :story_id, presence: true
   validates_uniqueness_of :user_id, scope: [:story_id]
end