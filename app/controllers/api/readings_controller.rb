class Api::ReadingsController < ApplicationController
  before_action :authenticate_user, :only => [:create, :update, :destroy]
  
  def index
    @readings = Reading.all
    render 'index.json.jbuilder'
  end

  def create
    @reading = Reading.new(
      title: params[:title],
      author: params[:author],
      media_type: params[:media_type],
      url: params[:url],
      text: params[:text]
    )
    @reading.save
    render 'show.json.jbuilder'
  end

  def show
    @reading = Reading.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @reading = Reading.find(params[:id])
    @reading.title = params[:title] || @reading.title
    @reading.author = params[:author] || @reading.author
    @reading.media_type = params[:media_type] || @reading.media_type
    @reading.url = params[:url] || @reading.url
    @reading.text = params[:text] || @reading.text
    @reading.save
    render 'show.json.jbuilder'
  end

  def destroy
    @reading = Reading.find(params[:id])
    @reading.destroy
    render json: {message: "You deleted reading #{params[:id]}"}
  end
end
