class EmoteSerializer < ActiveModel::Serializer
  attributes :user_id, :happy, :sad, :mad, :heart
end
