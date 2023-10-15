class Story < ActiveRecord::Base
   belongs_to :user
   has_many :emotes, dependent: :destroy
   has_many :tags, dependent: :destroy
   has_many :genres, through: :tags

   validates :title, presence: true
   validates :body, presence: true
   validates :user_id, presence: true
   validates :body, length: {minimum: 50}
end