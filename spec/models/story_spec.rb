require 'rails_helper'

RSpec.describe Story, type: :model do
    it 'has a title field' do
        expect(Story.new).to respond_to(:title)
    end

    it 'has a body field' do
        expect(Story.new).to respond_to(:body)
    end

    it 'has a user_id field' do 
        expect(Story.new).to respond_to(:user_id)
    end
end