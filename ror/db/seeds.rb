# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# puts "Start creation"
# 10000.times do |i|
#   Video.create!(title: "Title_#{i}", description: "description_#{i}", category_id: 1, mpaa_rating: (i<5000) ? "G" : "PG" )
#   puts i
# end
# puts "DONE!"
#
# 10.times do |u|
#   User.create(email: "email#{u}@test.com", birthday: "2015-12-28T06:11:29.973Z", password: "password", password_confirmation: "password")
# end
cat = Category.create(title: "uniq title")
10000.times do |v|
  Video.create(title: "title_#{v}", description: "description", category_id: cat.id )
  puts "Video #{v} created"
end
