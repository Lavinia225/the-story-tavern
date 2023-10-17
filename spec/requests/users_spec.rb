require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /signup" do
    let!(:user_params) {{username: "meow", display_name: "bork", password: "Validpasssw0rd!", email: "theexistingemail@gmail.com"}}
    
    it 'creates a user' do
      expect { post '/signup', params: user_params}.to change(User, :count).by(1)
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
  end
end
