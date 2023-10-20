class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: {errors: ["Not Authorized!"]}, status: unauthorized unless @current_user
  end

  def render_unprocessable_entity e
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end
end
