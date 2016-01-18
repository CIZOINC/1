namespace :change_default do
  desc "Change video  nil values to 0"
  task view_count_and_skip_count: :environment do
    Video.all.each do |video|
      video.update_column(:view_count, 0) if video.view_count.nil?
      video.update_column(:skip_count, 0) if video.skip_count.nil?
    end
    puts "Completed"
  end
end
