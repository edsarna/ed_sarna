class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
    render 'index.json.jbuilder'
  end

  def show
    @image = Image.find(params[:id])
    render 'show.json.jbuilder'
  end
end
