class Job < ApplicationRecord
    mount_uploader :avatar, AvatarUploader
    belongs_to :user

    JOB_TYPES = ["Full-time", "Part-time", "Contact", "Freelance"]
end
