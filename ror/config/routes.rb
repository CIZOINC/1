Rails.application.routes.draw do

    api_version(module: 'V1',defaults: {format: :json},
                header: { name: 'Accept', value: 'application/vnd.cizo.com; version=1' },
                default: true) do

      resources :videos do
        get 'streams/:stream_type', to: 'streams#show', param: :stream_type
        post 'streams/transcode_notification', to: 'streams#transcode_notification', on: :collection
        post 'streams', to: "streams#create"
      end
    end


  root 'welcome#index'

  get 'health', to: 'application#health_check'

end
