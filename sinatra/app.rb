require 'sinatra'

get '/hls' do
	redirect 'https://s3.amazonaws.com/cizo-assets/staging/stream/simpsons/hls/index.m3u8'
end

get '/mp4' do
  redirect 'https://s3.amazonaws.com/cizo-assets/staging/stream/simpsons/mp4/video.mp4'
end

get '/' do 
	File.read(File.join('public', 'swagger.json'))
end