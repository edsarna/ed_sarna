class Api::PublicationsController < ApplicationController
  def index
    @publications = Publication.all
    render 'index.json.jbuilder'
  end

  def show
    @publication = Publication.find(params[:id])
    render 'show.json.jbuilder'
  end
end
