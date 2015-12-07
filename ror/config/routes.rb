Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    api_version(module: 'V1',
                header: { name: 'Accept', value: 'application/vnd.cizo.com; version=1' },
                default: true) do

      resources :videos
    end
  end
  root 'welcome#index'
  get 'health', to: 'application#health_check'

end
