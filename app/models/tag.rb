class Tag < ActiveRecord::Base
   belongs_to :genre
   belongs_to :story
end