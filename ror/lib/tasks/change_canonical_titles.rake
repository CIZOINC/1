namespace :change_canonical_titles do
  desc "Change canonical titles"
  task to_canonical: :environment do
    Category.where(canonical_title: nil).each do |cat|
      cat.update_column(:canonical_title, cat.title.to_canonical)
    end
  end
end
