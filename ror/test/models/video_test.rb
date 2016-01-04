require File.expand_path("../../test_helper", __FILE__)

class VideoTest < ActiveSupport::TestCase

  test 'should not save video without title' do
    video = Video.new( description: "description", category_id: 1, mpaa_rating: "G")
    assert_not video.valid?, "Title can't be blank"
  end

  test 'should not save video without description' do
    video = Video.new(title: "Title", category_id: 1, mpaa_rating: "G")
    assert_not video.valid?, "Description can't be blank"
  end

  test 'should not save video without category_id' do
    video = Video.new(title: "Title", category_id: 1, mpaa_rating: "G")
    assert_not video.valid?, "Description can't be blank"
  end

  test 'should not save video without mpaa_rating' do
    video = Video.new(title: "Title", description: "Description", category_id: 1)
    assert_not video.valid?, "mpaa_rating can't be blank"
  end

  test 'mpaa rating should have specific value' do
    %w(G PG PG-13 R NC-17).each_with_index do |rating, index|
      video = Video.new(mpaa_rating: rating, title: "title_#{index}", description: "desc_#{index}", category_id: 1)
      assert video.valid?, "#{rating} is not valid value for mpaa_rating"
    end
  end

  test 'filename should be valid' do
    filename = "File name "
    filename.downcase!
    filename.squish!
    filename.gsub!(" ", "_")
    video = Video.new(raw_filename: filename ,mpaa_rating: 'G', title: "title", description: "description", category_id: 1)
    assert video.valid?, "Invalid filename"
  end

end
