class Api::UsersController < ApplicationController
  def create
    # Create the user from params
    @user = User.new(email: params[:email])
    if @user.save
      # Deliver the signup email
      UserNotifierMailer::UserNotifier.send_signup_email(@user).deliver
    end
    render json: {message: "Maybe it worked?"}
  end
end
