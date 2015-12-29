CarrierWave.configure do |config|
  fog_credentials = {
    provider:              'AWS'                           # required
  }

  unless Rails.env.development?
    fog_credentials[:use_iam_profile] = true
  end

  config.fog_credentials = fog_credentials
  config.fog_directory  = 'cizo-assets'                          # required

end
