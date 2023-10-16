class User < ActiveRecord::Base
    has_secure_password

    has_many :stories
    has_many :emotes, dependent: :destroy

    validates :username, presence: true
    validates :display_name, presence: true
    validates :email, presence: true
end