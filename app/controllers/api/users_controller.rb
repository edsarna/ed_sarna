class Api::UsersController < ApplicationController
  def create
    # Create the user from params
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password] || rand(1..1000000).to_s)
    if @user.save
      # Deliver the signup email
      UserNotifierMailer::UserNotifier.send_signup_email(@user).deliver
    end
    render json: {message: "Maybe it worked?"}
  end

  def update
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:old_password])
      @user.password = params[:new_password]
      if @user.save
        render json: {message: "password updated"}
      else
        render json: {}, status: :unprocessable_entity
      end
    end
  end
end
