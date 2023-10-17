require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /signup" do
    let!(:user_params) {{username: "meow", display_name: "bork", password: "Validpasssw0rd!", email: "theexistingemail@gmail.com"}}
    
    it 'creates a user' do
      expect { post '/signup', params: user_params}.to change(User, :count).by(1)
    end

    it "saves the user id within the session" do
      post '/signup', params: user_params

      expect(session[:user_id]).to be(User.last.id)
    end

    it 'returns the user as JSON' do
      post '/signup', params: user_params

      expect(response.body).to include_json({
        id: User.last.id,
        display_name: "bork",
        access_level: 0
      })
    end

    it 'returns HTTP 201, Created' do
      post '/signup', params: user_params

      expect(response).to have_http_status(:created)
    end

    it 'does not return unnessesary user data' do
      post '/signup', params: user_params

      expect(response.body).not_to include_json({
        password: a_kind_of(String),
        reset_password_token: a_kind_of(String),
        reset_password_sent_at: a_kind_of(DateTime),
        email: a_kind_of(String),
        username: a_kind_of(String)
      })
    end

    context "returns errors properly" do
      let!(:user_params) {{username: "meow", display_name: "bork", password: "Validpassswrd!", email: "theexistingemailgmail.com"}}

      it "returns an array of error messages" do
        post '/signup', params: user_params

        expect(response.body).to include_json({errors: a_kind_of(Array)})
      end

      it 'returns HTTP 422, Unprocessable Entity' do
        post '/signup', params: user_params
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  #describe "GET /me" do
 #   let!(:user) {User.create(username: "meow", display_name: "bork", password: "Validpasssw0rd!", email: "theexistingemailgmail.com")}
  #  let!(:user_two) {User.create(username: "reowr", display_name: "a display name", password: "Inval1d!!!", email: "thesentientkind@ymail.com")}
#
  #  it 'returns the first user when logged in' do
  #    post '/login', params: {username: "meow", password: "Validpasssw0rd!"}
  #  end
  #end
end
