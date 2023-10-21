require 'rails_helper'

RSpec.describe "Stories", type: :request do
  describe "GET /stories" do
    it 'returns the first 10 stories without a query parameter' do
      expect(0).to eq(1)
    end

    it 'returns the next 10 stories when passing ?page=2' do
      expect(0).to eq(1)
    end
  end
end
