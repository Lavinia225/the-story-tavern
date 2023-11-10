class StorySerializer < ActiveModel::Serializer
include StoryMethods
  attributes :id, :title, :creator, :summary, :formatted_updated_at
  has_many :genres, serializer: StoryGenreSerializer
end
