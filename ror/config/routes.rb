Rails.application.routes.draw do

  use_doorkeeper do
       controllers tokens: 'doorkeeper/tokens'
       skip_controllers :authorizations, :applications, :authorized_applications
  end

  devise_for :users, defaults: {format: :json}, controllers: {
    passwords: 'auth/passwords',
    registrations: "auth/registrations",
    omniauth_callbacks: "auth/omniauth_callbacks"
  }
  devise_scope :user do
    get 'oauth/facebook', to:"auth/omniauth_callbacks#fetch_user_by_facebook_token", defaults: {format: :json}
    post 'users/password_reset', to: 'auth/passwords#password_reset', defaults: {format: :json}
  end

  if Rails.env.development? || Rails.env.staging?
    get 'api_docs/index'
    get 'api_docs/swagger.json' => 'api_docs#swagger'
  end

  api_version(module: 'V1',defaults: {format: :json},
              header: { name: 'Accept', value: 'application/vnd.cizo.com; version=1' },
              default: true) do

    resources :categories
    resources :videos do
      get :upload_ticket, to: "streams#upload_ticket"
      get 'streams/:stream_type', to: 'streams#show', param: :stream_type, constraints: {stream_type: /hls|mp4/}
      post 'streams/transcode_notification', to: 'streams#transcode_notification', on: :collection
      post :streams, to: "streams#create"
      post :hero_image

    end

    get :featured, to: "videos#featured"
    put 'featured/:video_id', to: "videos#add_featured"
    delete 'featured/:video_id', to: 'videos#remove_featured'
    get :trending, to: "videos#trending"
    get :search, to: 'videos#search'

    resources :users, except: [:destroy] do
      get :me, on: :collection
      delete :me, on: :collection, to: "users#destroy_self_account"
      put :me, on: :collection, to: "users#update_self_account"

      put 'me/videos/liked/:video_id', to: "users#like_video", on: :collection
      delete 'me/videos/liked/:video_id', to: "users#dislike_video", on: :collection
      get 'me/videos/liked',  to: "users#liked", on: :collection

      put 'guest/videos/seen/:video_id', to: 'users#guest_mark_video_as_seen', on: :collection
      put 'guest/videos/skipped/:video_id', to: 'users#guest_skip_video', on: :collection

      get 'me/videos/skipped', to: 'users#skipped', on: :collection
      put 'me/videos/skipped/:video_id', to: 'users#skip_video', on: :collection
      get 'me/videos/seen', to: 'users#seen', on: :collection
      get 'me/videos/unseen', to: 'users#unseen', on: :collection
      put 'me/videos/seen/:video_id', to: 'users#mark_video_as_seen', on: :collection
    end
  end
  root 'welcome#index'
  get 'health', to: 'application#health_check'
end
