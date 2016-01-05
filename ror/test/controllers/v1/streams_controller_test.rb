require File.expand_path("../../../test_helper", __FILE__)

class V1::StreamsControllerTest < ActionController::TestCase

  setup do
    @request.headers['Accept'] = Mime::JSON
    @request.headers['Content-Type'] = Mime::JSON.to_s
  end

  test 'should route to raw stream upload request' do
    assert_routing 'videos/1/raw_stream_upload_request', {format: :json, controller: "v1/streams", action: "raw_stream_upload_request", video_id: "1"}
  end

  test 'should route to create stream' do
    assert_routing( { method: 'post', path: 'videos/1/streams' }, {format: :json, controller: "v1/streams", action: "create", video_id: "1" })
  end

  test 'should route to transcode notification' do
    assert_routing({method: 'post', path: 'videos/streams/transcode_notification'}, {format: :json, controller: 'v1/streams', action: "transcode_notification"})
  end

  test 'should route to stream type' do
    %w(hls mp4).each do |type|
      assert_routing "videos/1/streams/#{type}", {format: :json, param: :stream_type, controller: 'v1/streams', action: 'show', video_id: '1', stream_type: type}
   end
  end

end
