require 'rails_helper'

RSpec.describe User, type: :model do
    let(:user) {subject}

    it 'has a password field' do
        expect(User.new).to respond_to(:password)
    end

    it 'has a username field' do
        expect(User.new).to respond_to(:username)
    end

    it 'has a display_name field' do
        expect(User.new).to respond_to(:display_name)
    end

    it 'has an email field' do
        expect(User.new).to respond_to(:email)
    end

    it 'has an access_level' do
        expect(User.new).to respond_to(:access_level)
    end

    it 'defaults access_level to 0' do
        expect(user.access_level).to be 0
    end

    it 'has a reset_password_token field' do
        expect(User.new).to respond_to(:reset_password_token)
    end

    it 'has a reset_password_sent_at field' do
        expect(User.new).to respond_to(:reset_password_sent_at)
    end

    it 'has many stories' do
        story = Story.new

        user.stories << story

        expect(user.stories).to include(story)
    end

    it 'has many emotes' do
        emote = Emote.new

        user.emotes << emote

        expect(user.emotes).to include(emote)
    end
end