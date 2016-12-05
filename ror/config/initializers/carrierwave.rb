CarrierWave.configure do |config|
  fog_credentials = {
    provider:              'AWS',                        # required
  }

  unless Rails.env.development? || Rails.env.test?
    fog_credentials[:use_iam_profile] = true
    fog_credentials.except! :aws_access_key_id, :aws_secret_access_key
  end

  config.fog_credentials = fog_credentials
  config.fog_directory  = 'cizo-assets'                          # required
  config.asset_host = 'https://cdn.cizo.com'

end
