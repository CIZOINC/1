Rails.application.routes.draw do

  use_doorkeeper do
       controllers tokens: 'doorkeeper/tokens'
  end

  devise_for :users, controllers: {
    registrations: "auth/registrations"
  }

  if Rails.env.development? || Rails.env.staging?
    get 'api_docs/index'
    get 'api_docs/swagger.json' => 'api_docs#swagger'
  end

  api_version(module: 'V1',defaults: {format: :json},
              header: { name: 'Accept', value: 'application/vnd.cizo.com; version=1' },
              default: true) do

    resources :videos do
      get :raw_stream_upload_request, to: "streams#raw_stream_upload_request"
      get 'streams/:stream_type', to: 'streams#show', param: :stream_type, constraints: {stream_type: /hls|mp4/}
      post 'streams/transcode_notification', to: 'streams#transcode_notification', on: :collection
      post :streams, to: "streams#create"
      post :hero_image
    end

    get :featured, to: "videos#featured"
    get :trending, to: "videos#trending"

    resources :categories

    resources :users, except: [:destroy] do
      get :me, on: :collection
      delete :me, on: :collection, to: "users#destroy_self_account"
      put :me, on: :collection, to: "users#update_self_account"

      put 'me/videos/liked/:video_id', to: "users#like_video", on: :collection
      delete 'me/videos/liked/:video_id', to: "users#dislike_video", on: :collection
      get 'me/videos/liked',  to: "users#likes", on: :collection

      get 'me/videos/skipped', to: 'users#skipped', on: :collection
      put 'me/videos/skipped/:video_id', to: 'users#skip_video', on: :collection
      get 'me/videos/seen', to: 'users#seen', on: :collection
      get 'me/videos/unseen', to: 'users#unseen', on: :collection
      put 'me/videos/seen/:video_id', to: 'users#mark_video_as_seen', on: :collection
    end

    get :search, to: 'videos#search'

  end

  root 'welcome#index'
  get 'health', to: 'application#health_check'

end
