class IndividualStorySerializer < ActiveModel::Serializer
include StoryMethods
  attributes :id, :title, :creator, :user_id, :body, :formatted_updated_at
  has_many :genres, serializer: StoryGenreSerializer
  has_many :emotes
  
  def user_id
    object.user_id
  end
end
