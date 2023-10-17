class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :access_level
end
