class Genre < ActiveRecord::Base
    has_many :tags, dependent: :destroy
    has_many :stories, through: :tags

    validates :genre, presence: true
end