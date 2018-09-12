class Api::AwardsController < ApplicationController
  def index
    @awards = Award.all
    render 'index.json.jbuilder'
  end

  def show
    @award = Award.find(params[:id])
    render 'show.json.jbuilder'
  end
end
