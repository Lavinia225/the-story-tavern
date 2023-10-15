class Emote < ActiveRecord::Base
   belongs_to :user 
   belongs_to :story

   validates :user_id, presence: true
   validates :story_id, presence: true
end