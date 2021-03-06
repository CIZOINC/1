require File.expand_path("../../../test_helper", __FILE__)

class V1::VideosControllerTest < ActionController::TestCase

  setup do
    @request.headers['Accept'] = Mime::JSON
    @request.headers['Content-Type'] = Mime::JSON.to_s
  end

  test 'should route to videos' do
    assert_routing 'videos', {format: :json, controller: "v1/videos", action: "index"}
  end

  test "should route to video" do
    assert_routing '/videos/1', {format: :json, controller: "v1/videos", action: "show", id: "1" }
  end

  test "should route to create video" do
    assert_routing( { method: 'post', path: '/videos' }, {format: :json, controller: "v1/videos", action: "create" })
  end

  test "should route to update video" do
    assert_routing({ method: 'put', path: '/videos/1' }, {format: :json, controller: "v1/videos", action: "update", id: "1" })
  end

  test "should route to destroy video" do
    assert_routing({ method: 'delete', path: '/videos/1' }, {format: :json, controller: "v1/videos", action: "destroy", id: "1" })
  end

  test "should route to hero_image" do
    assert_routing({ method: 'post', path: '/videos/1/hero_image' }, {format: :json, controller: "v1/videos", action: "hero_image", video_id: "1" })
  end

  test "should route to create like" do
    assert_routing({ method: 'put', path: '/videos/1/like' }, {format: :json, controller: "v1/videos", action: "like", video_id: "1" })
  end

  test "should route to destroy like" do
    assert_routing({ method: 'delete', path: '/videos/1/like' }, {format: :json, controller: "v1/videos", action: "dislike", video_id: "1" })
  end

  test 'should route to trending' do
    assert_routing 'trending', {format: :json, controller: "v1/videos", action: "trending"}
  end

  test 'should route to search' do
    assert_routing 'search', {format: :json, controller: "v1/videos", action: 'search'}
  end

  test 'should route to featured' do
    assert_routing 'featured', {format: :json, controller: "v1/videos", action: 'featured'}
  end

  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show, {id: Video.first.id}
    assert_response :success
  end

  test 'should have create action' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    post :create, {title: "Title", description: "Description", category_id: 1, mpaa_rating: "G"}
    assert_response :success
  end

  test 'should have update action' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    put :update, {id: 1, title: "Updated title", description: "Updated description", category_id: 1, mpaa_rating: "G"}
    assert_response :success
  end

  test 'users can not create video' do
    @request.headers["Authorization"] = "Bearer user_access_token"
    post :create, {title: "Title", description: "Description", category_id: 1, mpaa_rating: "G"}
    assert_response 403
  end

  test 'only admins can create video' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    post :create, {title: "Title", description: "Description", category_id: 1, mpaa_rating: "G"}
    assert_response 201
  end

  test 'users can not update video' do
    @request.headers["Authorization"] = "Bearer user_access_token"
    put :update, {id: 1, title: "Updated title", description: "Updated description", category_id: 1, mpaa_rating: "G"}
    assert_response 403
  end

  test 'only admins can update video' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    put :update, {id: 1, title: "Updated title", description: "Updated description", category_id: 1, mpaa_rating: "G"}
    assert_response 201
  end

  test 'users can not destroy video' do
    @request.headers["Authorization"] = "Bearer user_access_token"
    put :update, {id: 1, title: "Updated title", description: "Updated description", category_id: 1, mpaa_rating: "G"}
    assert_response 403
  end

  test 'only admin can destroy video' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    delete 'destroy', {id: 1}
    assert_response 204
  end

  test 'users can not post hero image' do
    @request.headers["Authorization"] = "Bearer user_access_token"
    post 'hero_image', {video_id: 1}
    assert_response 403
  end

  test 'admins can post hero image' do
    @request.headers["Authorization"] = "Bearer admin_access_token"
    post 'hero_image', {video_id: 1}
    assert_response 202
  end

  test 'users can like videos' do
    @request.headers["Authorization"] = "Bearer young_user_access_token"
    likes_count = Like.all.count
    put 'like', {video_id: 1, user_id: 3}
    assert_response 204
    assert_equal likes_count+1, Like.all.count
  end

  test 'users can dislike videos' do
    @request.headers["Authorization"] = "Bearer young_user_access_token"
    delete 'like', {video_id: 1, user_id: 3}
    assert_response 204
  end

end
