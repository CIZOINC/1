require File.expand_path("../../../test_helper", __FILE__)

class V1::UsersStreamsControllerTest < ActionController::TestCase

  setup do
    @request.headers['Accept'] = Mime::JSON
    @request.headers['Content-Type'] = Mime::JSON.to_s
  end

  test 'should route to users' do
    assert_routing 'users', {format: :json, controller: "v1/users", action: "index"}
  end

  test 'should route to self account' do
    assert_routing 'users/me', {format: :json, controller: "v1/users", action: 'me'}
  end

  test 'should route to update self account' do
    assert_routing({path: '/users/me', method: 'put' }, {format: :json, controller: "v1/users", action: "update_self_account"})
  end

  test 'should route to destroy self account' do
    assert_routing({path: '/users/me', method: 'delete' }, {format: :json, controller: "v1/users", action: "destroy_self_account"})
  end

  test 'should route to user account' do
    assert_routing '/users/1', {format: :json, controller: "v1/users", action: "show", id: "1"}
  end

  test 'should route to update user account' do
    assert_routing({path: '/users/1', method: 'put' }, {format: :json, controller: "v1/users", action: "update", id: "1"})
  end

  test 'should route to users/me/videos/likes' do
    assert_routing '/users/me/videos/likes', {format: :json, controller: 'v1/users', action: 'likes'}
  end
end
