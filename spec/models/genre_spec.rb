require 'rails_helper'

RSpec.describe Genre, type: :model do
    it 'has a genre field' do
        expect(Genre.new).to respond_to(:genre)
    end
end