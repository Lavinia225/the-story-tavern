class TagSerializer < ActiveModel::Serializer
  attributes :id, :story_id, :genre_id
end
