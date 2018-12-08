require 'pony'

p 'about to send mail'
Pony.mail(:to => 'joshsarna@gmail.com', :from => 'joshsarna@g.ucla.edu', :subject => 'hi', :body => 'Hello there.')
Pony.mail(:to => 'joshsarna@g.ucla.edu', :from => 'joshsarna@gmail.com', :subject => 'hi', :body => 'Hello there.')
p 'just sent mail'