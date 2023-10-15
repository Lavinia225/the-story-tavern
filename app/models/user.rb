class User < ActiveRecord::Base
    has_secure_password

    has_many :stories
    has_many :emotes, dependent: :destroy
end