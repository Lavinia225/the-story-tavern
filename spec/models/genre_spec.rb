require 'rails_helper'

RSpec.describe Genre, type: :model do
    let(:genre) {subject}

    it 'has a genre field' do
        expect(Genre.new).to respond_to(:genre)
    end

    it 'has many stories' do
        story = Story.new
        genre.stories << story

        expect(genre.stories).to include(story)
    end

    it 'has many tags' do
        tag = Tag.new
        genre.tags << tag

        expect(genre.tags).to include(tag)
    end
end