require 'rails_helper'

RSpec.describe Emote, type: :model do
    let(:emote) {subject}

    it 'has a story_id field' do
        expect(Emote.new).to respond_to(:story_id)
    end

    it 'has a user_id field' do
        expect(Emote.new).to respond_to(:user_id)
    end

    it 'has a happy field' do
        expect(Emote.new).to respond_to(:happy)
    end

    it 'has a sad field' do
        expect(Emote.new).to respond_to(:sad)
    end

    it 'has a mad field' do
        expect(Emote.new).to respond_to(:mad)
    end

    it 'has a heart field' do
        expect(Emote.new).to respond_to(:heart)
    end

    it 'belongs to a story' do
        story = Story.new
        story.emotes << emote

        expect(emote.story).to be story
    end

    it 'belongs to a user' do
        user = User.new
        user.emotes << emote

        expect(emote.user).to be user
    end
end