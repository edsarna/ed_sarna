class Api::ReviewsController < ApplicationController
  before_action :authenticate_user, :only => [:create, :update, :destroy]
  
  def index
    @reviews = Review.all
    render 'index.json.jbuilder'
  end

  def create
    @review = Review.new(
      title: params[:title],
      item: params[:item],
      text: params[:text],
      rating: params[:rating]
    )
    @review.save
    render 'show.json.jbuilder'
  end

  def show
    @review = Review.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @review = Review.find(params[:id])
    @review.title = params[:title] || @review.title
    @review.item = params[:item] || @review.item
    @review.text = params[:text] || @review.text
    @review.rating = params[:rating] || @review.rating
    @review.save
    render 'show.json.jbuilder'
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render json: {message: "You deleted review #{params[:id]}"}
  end
end
