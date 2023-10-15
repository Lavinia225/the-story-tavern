require 'rails_helper'

RSpec.describe User, type: :model do
    it 'has a password field' do
        expect(User.new).to respond_to(:password)
    end
end