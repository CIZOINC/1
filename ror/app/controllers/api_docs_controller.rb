class ApiDocsController < ApplicationController

  http_basic_authenticate_with :name => Rails.application.secrets.api_doc_username, :password => Rails.application.secrets.api_doc_password
  
  def index
  end
  
  def swagger
  	send_file 'doc/api/srv/api/swagger.json', :content_type => "application/json"
  end
end
