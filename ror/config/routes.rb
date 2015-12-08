Rails.application.routes.draw do

    api_version(module: 'V1',defaults: {format: :json},
                header: { name: 'Accept', value: 'application/vnd.cizo.com; version=1' },
                default: true) do

      resources :videos
    end

  root 'welcome#index'

  get 'health', to: 'application#health_check'

end
