class StorySerializer < ActiveModel::Serializer
  attributes :id, :title, :user, :summary, :formatted_updated_at

  def summary
    "#{object.body[0..100]}"
  end

  def user
    "#{object.user.display_name}"
  end

  def formatted_updated_at
    object.updated_at.strftime("%I:%M%p %B %d, %Y")
  end
end
