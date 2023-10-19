require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let!(:user) {User.create(username: "meow", display_name: "bork", password: "Validpasssw0rd!", email: "theexistingemail@gmail.com")}
  let!(:user_two) {User.create(username: "reowr", display_name: "a display name", password: "Inval1d!!!", email: "thesentientkind@ymail.com")}

  describe "POST /login" do
    it 'returns the user as JSON' do
      post '/login', params: {username: "meow", password: "Validpasssw0rd!"}
      
      expect(response.body).to include_json({
        id: user.id,
        display_name: "bork",
        access_level: 0
      })
    end

    it 'sets session to session user id' do
      post '/login', params: {username: "meow", password: "Validpasssw0rd!"}

      expect(session[:user_id]).to be(user.id)
    end

    it 'sets the session to the current user' do
      post '/login', params: {username: "meow", password: "Validpasssw0rd!"}
      post '/login', params: {username: "reowr", password: "Inval1d!!!"}

      expect(session[:user_id]).to eq(user_two.id)
    end

    it 'returns errors with invalid login data' do
      post '/login', params: {username: "", password: "boop"}

      expect(response.body).to include_json({errors: ["Invalid username or password"]})
    end

    it 'returns HTTP 401, Unauthorized with invalid login data' do
      post '/login', params: {username: "", password: "boop"}

      expect(response).to have_http_status(:unauthorized)
    end
  end
end