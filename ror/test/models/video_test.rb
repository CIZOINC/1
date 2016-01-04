require File.expand_path("../../test_helper", __FILE__)


class VideoTest < ActiveSupport::TestCase

  test 'should not save video without title' do
    video = Video.new
    assert !video.save
  end

  test 'should not save video without description' do
    video = Video.new
    assert !video.save
  end

  test 'should not save video without category_id' do
    video = Video.new
    assert !video.save
  end

  test 'should not save video without mpaa_rating' do
    video = Video.new
    assert !video.save
  end

  test 'mpaa rating should have specific value' do
    %w(G PG PG-13 R NC-17 test).each_with_index do |rating, index|
      video = Video.new(mpaa_rating: rating, title: "title_#{index}", description: "desc_#{index}", category_id: 1)
      assert video.valid?, "#{rating} is not valid value for mpaa_rating"
    end
  end

end
