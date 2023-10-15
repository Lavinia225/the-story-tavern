require 'rails_helper'

RSpec.describe Tag, type: :model do
    let(:tag) {subject}

    it 'has a story_id field' do
        expect(Tag.new).to respond_to(:story_id)
    end

    it 'has a genre_id field' do
        expect(Tag.new).to respond_to(:genre_id)
    end

    it 'belongs to a story' do
        story = Story.new
        story.tags << tag

        expect(tag.story).to be story
    end

    it 'belongs to a genre' do
        genre = Genre.new
        genre.tags << tag

        expect(tag.genre).to be genre
    end

    describe 'Basic Validations' do
        it { is_expected.to validate_presence_of :story_id }
        it { is_expected.to validate_presence_of :genre_id }
    end
end