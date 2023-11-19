class EmoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :happy, :sad, :mad, :heart
end
