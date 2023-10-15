require 'rails_helper'

RSpec.describe Emote, type: :model do
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
end