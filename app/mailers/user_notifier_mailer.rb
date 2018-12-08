class UserNotifierMailer < ApplicationMailer
  class UserNotifier < ActionMailer::Base
    default :from => 'ed@edsarna.com'

    # send a signup email to the user, pass in the user object that   contains the user's email address
    def send_signup_email(user)
      @user = user
      mail( :to => @user.email,
      :subject => 'Thanks for signing up for our amazing app' )
    end

    def send_notification_email(user)
      @user = user
      mail( :to => @user.email,
        :subject => 'New Post from Ed Sarna' )
    end

    def send_question_email(question)
      @question = question
      mail( :to => 'ed@edsarna.com',
        :from => "#{@question.email}",
        :subject => "New Question from #{@question.name}" )
    end
  end
end
