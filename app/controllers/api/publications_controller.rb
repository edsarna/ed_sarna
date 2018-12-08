class Api::PublicationsController < ApplicationController
  def index
    @publications = Publication.all
    render 'index.json.jbuilder'
  end

  def create
    @publication = Publication.new(
      title: params[:title],
      media_type: params[:media_type],
      short_blurb: params[:short_blurb],
      long_blurb: params[:long_blurb],
      pub_date: params[:pub_date],
      full_text: params[:full_text],
      url: params[:url]
    )
    @publication.save
    render 'show.json.jbuilder'
  end

  def last
    @publication = Publication.last
    render 'show.json.jbuilder'
  end

  def show
    @publication = Publication.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @publication = Publication.find(params[:id])
    @publication.title = params[:title] || @publication.title
    @publication.media_type = params[:media_type] || @publication.media_type
    @publication.short_blurb = params[:short_blurb] || @publication.short_blurb
    @publication.long_blurb = params[:long_blurb] || @publication.long_blurb
    @publication.pub_date = params[:pub_date] || @publication.pub_date
    @publication.full_text = params[:full_text] || @publication.full_text
    @publication.url = params[:url] || @publication.url
    @publication.save
    render 'show.json.jbuilder'
  end

  def destroy
    @publication = Publication.find(params[:id])
    @publication.destroy
    render json: {message: "You deleted publication #{params[:id]}"}
  end
end
