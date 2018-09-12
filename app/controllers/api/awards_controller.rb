class Api::AwardsController < ApplicationController
  def index
    @awards = Award.all
    render 'index.json.jbuilder'
  end

  def create
    @award = Award.new(
      title: params[:title],
      text: params[:text],
      url: params[:url],
      date_received: params[:date_received],
      publication_id: params[:publication_id]
    )
    @award.save
    render 'show.json.jbuilder'
  end

  def show
    @award = Award.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @award = Award.find(params[:id])
    @award.title = params[:title] || @award.title
    @award.text = params[:text] || @award.text
    @award.url = params[:url] || @award.url
    @award.date_received = params[:date_received] || @award.date_received
    @award.publication_id = params[:publication_id] || @award.publication_id
    @award.save
    render 'show.json.jbuilder'
  end

  def destroy
    @award = Award.find(params[:id])
    @award.destroy
    render json: {message: "You deleted award #{params[:id]}"}
  end
end
