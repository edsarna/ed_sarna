# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Publication.create(
#   title: "",
#   media_type: "",
#   short_blurb: "",
#   long_blurb: "",
#   pub_date: "",
#   full_text: "",
#   url: ""
# )

# Award.create(
#   title: "",
#   text: "",
#   url: "",
#   publication_id: Publication.find_by(name: "").id,
#   date_received: ""
# )

# Publication.create(
#   title: "The Defibrillator Meal",
#   media_type: "short story",
#   short_blurb: "Winner of the Bo Carter Memorial Contest for Nostalgia, and Jade Ring Contest for Humor.",
#   long_blurb: "Winner of the Bo Carter Memorial Contest for Nostalgia, and Jade Ring Contest for Humor."
# )

# Award.create(
#   title: "Bo Carter Memorial Contest",
#   text: "First Place in Nostalgia",
#   url: "https://waukeshawritersworkshop.org/2016-winners/",
#   publication_id: Publication.find_by(title: "The Defibrillator Meal").id,
#   date_received: DateTime.new(2017,1,1,0,0,0)
# )

# Award.create(
#   title: "Jade Ring Contest",
#   text: "Second Place in Humor",
#   url: "https://wiwrite.org/contests/",
#   publication_id: Publication.find_by(title: "The Defibrillator Meal").id,
#   date_received: DateTime.new(2016,6,15,0,0,0)
# )

# Publication.create(
#   title: "Best Day Ever",
#   media_type: "short story",
#   short_blurb: "Winner of the Jade Ring Contest for Fiction.",
#   long_blurb: "Winner of the Jade Ring Contest for Fiction.",
#   url: "https://www.amazon.com/Creative-Wisconsin-Literary-Journal-2017/dp/0982842856/"
# )

# Award.create(
#   title: "Jade Ring Contest",
#   text: "Third Place in Fiction",
#   url: "https://wiwrite.org/contests/",
#   publication_id: Publication.find_by(title: "Best Day Ever").id,
#   date_received: DateTime.new(2016,6,15,0,0,0)
# )

# Publication.create(
#   title: "Dwayne Danger, Private Eye",
#   media_type: "short story",
#   short_blurb: "Florence Lindemann Humor Contest winner.",
#   long_blurb: "Florence Lindemann Humor Contest winner."
# )

# Award.create(
#   title: "Florence Lindemann Humor Contest",
#   text: "Third Place",
#   publication_id: Publication.find_by(title: "Dwayne Danger, Private Eye").id,
#   date_received: DateTime.new(2015,1,1,0,0,0)
# )


# User.create(
#   email: "ed@edsarna.com",
#   password: "password",
#   password_confirmation: "password",
#   name: "Ed"
# )

TextBlock.create(
  name: "tagline",
  body: "'Sensational...Sarna is this generation's Lee Child' -Lee Child"
)
TextBlock.create(
  name: "about",
  body: "Ed Sarna has been a U.S. Marine, actor, director and a number of other things not nearly as challenging. He grew up in Chicago, Illinois, spent more than a decade in Southern California and currently resides outside of Milwaukee, Wisconsin. Ed eventually received a BA in Theatre from California State University, Northridge, after being informed twice that he and Illinois State University might not be as good a fit as originally thought. He's received writing awards in fiction, humor and non-fiction from the Bo Carter Memorial, Jade Ring and Florence Lindemann Humor contests. His short story, BEST DAY EVER, was published in the Creative Wisconsin Literary Journal 2017. He is currently a member of Wisconsin Writers Association and Chicago Writers Association, where he is a reviewer with their book review service, Windy City Reviews."
)