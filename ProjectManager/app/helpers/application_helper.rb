module ApplicationHelper
    def verbose_date(date)
        date.string('%B %d %Y')
    end
end
