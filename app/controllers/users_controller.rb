class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        UserMailer.with(user: user).welcome_email.deliver_now
        render json: user, status: :created
    end

    def show
        render json: @current_user
    end

    def destroy
        if (params[:id].to_i == @current_user.id) && @current_user.authenticate(params[:password])
            UserMailer.with(user: @current_user).goodbye_email.deliver_now
            @current_user.destroy!
            head :no_content
        else
            render json: {errors: ["Incorrect Password or UserID."]}, status: :unauthorized
        end
    end

    def change_display_name
        if @current_user&.authenticate(params[:password])
            @current_user.update!(display_name: params[:display_name], password: params[:password])
            UserMailer.with(user: @current_user).changed_display_name_email.deliver_now
            render json: @current_user
        else
            render json: {errors: "You are not authorized to update this user."}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :display_name, :password, :password_confirmation, :email)
    end
end
