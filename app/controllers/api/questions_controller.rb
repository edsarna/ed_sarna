class Api::QuestionsController < ApplicationController
  def create
    @question = Question.new(name: params[:name], email: params[:email], text: params[:text])
    @question.save
    UserNotifierMailer::UserNotifier.send_question_email(@question).deliver
    render json: {message: 'Thank you for your question or comment'}
  end
end
