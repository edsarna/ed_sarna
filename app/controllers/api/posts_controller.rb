class Api::PostsController < ApplicationController
  def index
    UserNotifier.send_signup_email(User.first).deliver
    @posts = Post.all
    render 'index.json.jbuilder'
  end

  def create
    @post = Post.new(
      title: params[:title],
      text: params[:text]  
    )
    @post.save
    render 'show.json.jbuilder'
  end

  def last
    @post = Post.last
    render 'show.json.jbuilder'
  end

  def show
    @post = Post.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @post = Post.find(params[:id])
    @post.title = params[:title] || @post.title
    @post.text = params[:text] || @post.text
    @post.save
    render 'show.json.jbuilder'
  end

  def destroy
    @post = Post.find(params[:id])
    @images = Image.where(post_id: params[:id])
    @post.destroy
    @images.each do |image|
      image.destroy
    end
    render json: {message: "You deleted post #{params[:id]} and all of its images"}
  end
end
