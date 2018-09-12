class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render 'index.json.jbuilder'
  end

  def show
    @review = Review.find(params[:id])
    render 'show.json.jbuilder'
  end
end
