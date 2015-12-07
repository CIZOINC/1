class Api::V1::VideosController < ApplicationController
  def index
    if created_after = params[:created_after]
      @videos = Video.created_after(created_after)
    elsif created_before = params[:created_before]
      @videos = Video.created_before(created_before)
    elsif created_before = params[:created_before] && created_after = params[:created_after]
      @videos = Video.created_before(created_before).created_after(created_after)
    else
      @videos = Video.all
    end
  end
end
