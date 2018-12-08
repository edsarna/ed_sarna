class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where(approved: false)
    render 'index.json.jbuilder'
  end

  def create
    @comment = Comment.new(
      commenter: params[:commenter],
      comment: params[:comment],
      post_id: params[:post_id],
      approved: false
    )
    @comment.save
    render 'show.json.jbuilder'
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.approved = true
    @comment.save
    render 'show.json.jbuilder'
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: {message: 'Comment deleted'}
  end
end
