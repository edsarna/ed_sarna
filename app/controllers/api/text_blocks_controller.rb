class Api::TextBlocksController < ApplicationController
  def show
    @text_block = TextBlock.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @text_block = TextBlock.find(params[:id])
    @text_block.body = params[:body] || @text_block.body
    @text_block.save
    render 'show.json.jbuilder'
  end
end
