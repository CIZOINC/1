require File.expand_path("../../../test_helper", __FILE__)

class V1::VideosControllerTest < ActionController::TestCase

  setup do
    @request.headers['Accept'] = Mime::JSON
    @request.headers['Content-Type'] = Mime::JSON.to_s
  end

  test "should get index" do
    get :show
    assert_response :success
  end

end
