require 'rails_helper'

RSpec.describe "Stories", type: :request do
  let!(:user) {User.create(username: "testuser", display_name: "testuser2", password: "Veryvalidpassword!0202", email: "test@testing.test")}

  describe "GET /stories" do
    it 'returns the first 10 stories without a query parameter' do
      expect(0).to eq(1)
    end

    it 'returns the next 10 stories when passing ?page=2' do
      expect(0).to eq(1)
    end
  end

  describe 'GET /stories/:id' do
    it 'returns a specific story' do
      story = Story.create(user_id: user.id, title: Faker::Lorem.unique.sentence, body: Faker::Lorem.paragraph_by_chars(number: rand(50..800)))
      get "/stories/#{story.id}"
      byebug
      expect(response.body).to include_json({
        title: story.title,
        body: story.body,
        user_id: story.user_id
      })
    end

    context 'story does not exist' do

      it 'returns HTTP 404 not found when story does not exist' do
        get '/stories/9999'

        expect(response).to have_http_status(:not_found)
      end

      it 'returns an error array when story does not exit' do
        get '/stories/9999'

        expect(response.body).to include_json({errors: a_kind_of(Array)})
      end
    end
  end

  describe 'POST /stories/new' do #Complains that user's information has been taken by... itself.
    let!(:story_params) {{user_id: user.id, title: Faker::Lorem.unique.sentence, body: Faker::Lorem.paragraph_by_chars(number: rand(50..800))}}

    it 'creates a new story' do
      expect { post '/signup', params: story_params}.to change(Story, :count).by(1)
    end

    it 'returns the created story' do
      post '/signup', params: story_params

      expect(response.body).to include_json({
        title: a_kind_of(String),
        body: a_kind_of(String),
        user_id: user.id,
        id: a_kind_of(Integer)
      })
    end

    it 'returns HTTP status 201, created' do
      post '/signup', params: story_params
      
      expect(response).to have_http_status(:created)
    end
  end
end
