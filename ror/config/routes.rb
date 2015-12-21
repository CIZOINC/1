Rails.application.routes.draw do


  use_doorkeeper do
       controllers tokens: 'custom/tokens'
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
      get 'streams/:stream_type', to: 'streams#show', param: :stream_type
      post 'streams/transcode_notification', to: 'streams#transcode_notification', on: :collection
      post :streams, to: "streams#create"
      post :hero_image
    end

    resources :users do
      get :me, on: :collection
    end
    resources :categories
  end

  root 'welcome#index'
  get 'health', to: 'application#health_check'

end
