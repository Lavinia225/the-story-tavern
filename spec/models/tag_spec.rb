require 'rails_helper'

RSpec.describe Tag, type: :model do
    it 'has a story_id field' do
        expect(Tag.new).to respond_to(:story_id)
    end

    it 'has a genre_id field' do
        expect(Tag.new).to respond_to(:genre_id)
    end
end