class UserMailer < ApplicationMailer

    def welcome_email
        get_user
        mail(to: @user.email, subject: "Welcome to The Story Tavern!")
    end

    def goodbye_email
        get_user
        mail(to: @user.email, subject: "Your account on The Story Tavern has been deleted.")
    end

    def changed_display_name_email
        get_user
        mail(to: @user.email, subject: "Your display name on The Story Tavern has been changed.")
    end

    private

    def get_user
        @user = params[:user]
    end
end
