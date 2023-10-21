class IndividualStorySerializer < ActiveModel::Serializer
include StoryMethods
  attributes :id, :title, :user, :body, :formatted_updated_at
  has_many :genres, serializer: StoryGenreSerializer
  has_many :emotes
end
