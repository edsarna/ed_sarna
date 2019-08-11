class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
    render 'index.json.jbuilder'
  end

  def create
    @image = Image.new(
      title: params[:title],
      featured: params[:featured],
      image_url: params[:image_url],
      post_id: params[:post_id]
    )
    @image.save
    render 'show.json.jbuilder'
  end

  def recent
    @images = Image.last(3)
    render 'index.json.jbuilder'
  end

  def show
    @image = Image.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @image = Image.find(params[:id])
    @image.title = params[:title] || @image.title
    @image.image_url = params[:image_url] || @image.image_url
    @image.save
    render 'show.json.jbuilder'
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render json: {message: "You deleted image #{params[:id]}"}
  end

  private
  
    def set_s3_direct_post
      @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    end
end
