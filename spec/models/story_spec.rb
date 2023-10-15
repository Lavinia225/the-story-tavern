require 'rails_helper'

RSpec.describe Story, type: :model do
    let(:story) {subject}

    it 'has a title field' do
        expect(Story.new).to respond_to(:title)
    end

    it 'has a body field' do
        expect(Story.new).to respond_to(:body)
    end

    it 'has a user_id field' do 
        expect(Story.new).to respond_to(:user_id)
    end

    it 'belongs to a user' do
        user = User.new
        user.stories << story

        expect(story.user).to be user
    end

    it 'has many tags' do 
        tag = Tag.new
        story.tags << tag

        expect(story.tags).to include(tag)
    end

    it 'has many genres' do 
        genre = Genre.new
        story.genres << genre

        expect(story.genres).to include(genre)
    end

    it 'has many emotes' do 
        emote = Emote.new
        story.emotes << emote

        expect(story.emotes).to include(emote)
    end
end