class UserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        mail(to: @user.email, subject: "Welcome to The Story Tavern!")
    end

    def goodbye_email
        @user = params[:user]
        mail(to: @user.email, subject: "Your account on The Story Tavern has been deleted.")
    end
end
