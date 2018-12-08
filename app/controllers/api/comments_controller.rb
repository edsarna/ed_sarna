class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new()
    @comment.save
    render 'show.json.jbuilder'
  end
end
