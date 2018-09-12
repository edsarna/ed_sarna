class Api::ReadingsController < ApplicationController
  def index
    @readings = Reading.all
    render 'index.json.jbuilder'
  end

  def show
    @reading = Reading.find(params[:id])
    render 'show.json.jbuilder'
  end
end
