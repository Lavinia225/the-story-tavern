class StorySerializer < ActiveModel::Serializer
include StoryMethods
  attributes :id, :title, :user, :summary, :formatted_updated_at
  has_many :genres, serializer: StoryGenreSerializer
end
