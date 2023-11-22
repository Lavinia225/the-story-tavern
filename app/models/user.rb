class User < ActiveRecord::Base
    has_secure_password

    email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/

    has_many :stories
    has_many :emotes, dependent: :destroy

    validates :username, {presence: true, uniqueness: true}
    validates :display_name, {presence: true, uniqueness: true}
    validates :email, {presence: true, uniqueness: true}
    validates :password, {length: {in: 8..40}}

    validates_format_of :email, {multiline: true, with: email_regex}
    validates_format_of :password, {with: /[a-z]/, message: "a"}
    validates_format_of :password, {with: /[A-Z]/, message: "Password must include an uppercase character"}
    validates_format_of :password, {with: /\W/, message: "Password must include a symbol"}
    validates_format_of :password, {with: /\d/, message: "Password must include a number"}
end