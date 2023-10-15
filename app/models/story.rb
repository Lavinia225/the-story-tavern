class Story < ActiveRecord::Base
   belongs_to :user
   has_many :emotes, dependent: :destroy
   has_many :tags, dependent: :destroy
   has_many :genres, through: :tags
end