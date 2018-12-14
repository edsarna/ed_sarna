class Api::PostsController < ApplicationController
  before_action :authenticate_user, :only => [:create, :update, :destroy]

  def index
    @posts = Post.all
    render 'index.json.jbuilder'
  end

  def create
    @post = Post.new(
      title: params[:title],
      text: params[:text]  
    )
    if @post.save
      users = User.all
      users.each do |user|
        UserNotifierMailer::UserNotifier.send_notification_email(user).deliver
      end
      render 'show.json.jbuilder'
    end
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
    @comments = Comment.where(post_id: params[:id])
    @post.destroy

    # images
    @images.each do |image|
      image.destroy
    end

    # comments
    @comments.each do |comment|
      comment.destroy
    end

    render json: {message: "You deleted post #{params[:id]} and all of its images"}
  end
end
