class Artist < ApplicationRecord
    # has_many :records, class_name: "record", foreign_key: "reference_id"
    # belongs_to :user, class_name: "user", foreign_key: "user_id"
    belongs_to :user
    # has_many :records, class_name: "record", foreign_key: "reference_id", dependent: :destroy
    has_many :record, dependent: :destroy

    validates :name, presence: true
end
