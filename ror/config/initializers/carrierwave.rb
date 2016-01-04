CarrierWave.configure do |config|
  fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     'AKIAJWMTWVQJCMXSZGLA',
    aws_secret_access_key: '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'
  }

  unless Rails.env.development? || Rails.env.test?
    fog_credentials[:use_iam_profile] = true
  end

  config.fog_credentials = fog_credentials
  config.fog_directory  = 'cizo-assets'                          # required

end
