CarrierWave.configure do |config|
  # config.fog_provider = 'fog/aws'                        # required
  fog_credentials = {
    provider:              'AWS'                           # required
    # region:                'eu-west-1',                  # optional, defaults to 'us-east-1'
    # host:                  's3.example.com',             # optional, defaults to nil
    # endpoint:              'https://s3.example.com:8080' # optional, defaults to nil
  }

  if not Rails.env.development? 
    fog_credentials[:use_iam_profile] = true
  else
    fog_credentials[:aws_access_key_id] = ENV['AWS_ACCESS_KEY_ID']
    fog_credentials[:aws_secret_access_key] = ENV['AWS_SECRET_ACCESS_KEY']
  end

  config.fog_credentials = fog_credentials

  config.fog_directory  = 'cizo-assets'                          # required
  # config.fog_public     = false                                        # optional, defaults to true
  # config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" } # optional, defaults to {}
end
