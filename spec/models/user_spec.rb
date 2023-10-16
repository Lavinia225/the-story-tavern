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

    describe 'Basic Validations' do
        it { is_expected.to validate_presence_of :username }
        it { is_expected.to validate_presence_of :display_name}
        it { is_expected.to validate_presence_of :password }
        it { is_expected.to validate_presence_of :email }


        it { is_expected.to validate_uniqueness_of :username }
        it { is_expected.to validate_uniqueness_of :display_name }
        it { is_expected.to validate_uniqueness_of :email }

    end

    it 'allows proper email formatting' do
        is_expected.to allow_value("meow@gmail.com").for(:email)
    end

    describe 'Does not allow improper emails' do
        it {is_expected.not_to allow_value("@wow.meow").for(:email)}
        it {is_expected.not_to allow_value("wow.meow").for(:email)}
        it {is_expected.not_to allow_value("wowmeow").for(:email)}
        it {is_expected.not_to allow_value("wow.me@ow").for(:email)}
    end

    describe 'Password Security' do
        it {is_expected.to validate_length_of(:password).is_at_least(8)}
        it {is_expected.to validate_length_of(:password).is_at_most(40)}

        it 'does not auto deny all passwords' do
            is_expected.to allow_value("ThisisaTestofCertainty!111").for(:password)
        end

        it 'must include a lowercase' do
            is_expected.not_to allow_value('AAAAAAAAAA$@!').for(:password)
        end

        it 'must include an uppercase' do
            is_expected.not_to allow_value('baaaakaaaaa!').for(:password)
        end

        it 'must include a number' do
            is_expected.not_to allow_value("Accept me please, trust me!").for(:password)
        end

        it 'must include a symbol' do
            is_expected.not_to allow_value('Braaaiiinnnsss').for(:password)
        end
    end
end