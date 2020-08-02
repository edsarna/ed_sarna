/* global Vue, Vue2Filters, VueRouter, axios */

var UnsubscribePage = {
  template: "#unsubscribe-page",
  data: function() {
    return {
      email: "",
      unsubscribed: false
    };
  },
  methods: {
    unsubscribe: function() {
      var params = {
        email: this.email
      };
      axios.delete('/api/users', params).then(function(response) {
        this.unsubscribed = true;
      }.bind(this));
    }
  }
};

var AdminPage = {
  template: "#admin-page",
  data: function() {
    return {
      // SIGN IN
      email: "",
      password: "",
      errors: [],
      loggedIn: false,
      newPassword: {
        email: "",
        oldPassword: "",
        newPasswrod: ""
      },

      // ADMIN STUFF
      message: "Admin Page",
      showSection: "comments",
      newFeaturedImage: {imageUrl: ""},

      unapprovedComments: [],
      posts: [],
      readings: [],
      reviews: [],
      publications: [],

      selectedPost: {},
      selectedReading: {},
      selectedReview: {},
      selectedPublication: {},

      newPost: {
        title: "",
        publication_date: "",
        text: "",
        featured_image_url: "",
        additionalImages: []
      },
      newReading: {
        title: "",
        author: "",
        media_type: "",
        url: "",
        text: ""
      },
      newReview: {
        title: "",
        item: "",
        rating: 0,
        text: ""
      },
      newPublication: {
        title: "",
        media_type: "",
        short_blurb: "",
        long_blurb: "",
        url: "",
        image_url: "",
        pub_date: "",
        full_text: ""
      },
      about: "",
      tagline: ""
    };
  },
  created: function() {
    axios.get('/api/posts').then(function(response) {
      this.posts = response.data.reverse();
    }.bind(this));
    axios.get('/api/readings').then(function(response) {
      this.readings = response.data.reverse();
    }.bind(this));
    axios.get('/api/reviews').then(function(response) {
      this.reviews = response.data.reverse();
    }.bind(this));
    axios.get('/api/publications').then(function(response) {
      this.publications = response.data.reverse();
    }.bind(this));
    axios.get('/api/comments').then(function(response) {
      this.unapprovedComments = response.data.reverse();
    }.bind(this));
    axios.get('/api/text_blocks/1').then(function(response) {
      this.tagline = response.data;
    }.bind(this));
    axios.get('/api/text_blocks/2').then(function(response) {
      this.about = response.data;
    }.bind(this));
  },
  methods: {
    selectPost: function(post) {
      this.newFeaturedImage = {imageUrl: ""};
      this.selectedPost = post;
    },
    selectReading: function(reading) {
      this.selectedReading = reading;
    },
    selectReview: function(review) {
      this.selectedReview = review;
    },
    selectPublication: function(publication) {
      this.selectedPublication = publication;
    },

    updatePost: function() {
      var params = {
        title: this.selectedPost.title,
        text: this.selectedPost.text,
        publication_date: this.selectedPost.publication_date
      };
      axios.patch('/api/posts/' + this.selectedPost.id, params).then(function(response) {
      });

      // FEATURED IMAGE
      if (this.selectedPost.featured_image) {
        axios.patch('/api/images/' + this.selectedPost.featured_image.id, {image_url: this.selectedPost.featured_image.image_url}).then(function(response) {
        });
      } else {
        axios.post('/api/images', {
          image_url: this.newFeaturedImage.imageUrl,
          post_id: this.selectedPost.id,
          featured: true
        }).then(function(response) {
          this.selectedPost.featured_image = response.data;
        }.bind(this));
      }

      // ADDITIONAL IMAGES
      this.selectedPost.additional_images.forEach(function(image) {    
        if (image.image_url === "//orange" || image.image_url === "") {            
          // delete
          axios.delete('/api/images/' + image.id);
        } else if (image.id) {
          // update
          axios.patch('/api/images/' + image.id, {
            image_url: image.image_url
          });
        } else if (image.image_url !== "") {
          // create
          axios.post('/api/images', {
            featured: false,
            image_url: image.image_url,
            post_id: this.selectedPost.id
          }).then(function(response) {
            image = response.data;
          }.bind(this));
        }
      }.bind(this));
    },
    updateReading: function() {
      var params = {
        title: this.selectedReading.title,
        author: this.selectedReading.author,
        media_type: this.selectedReading.media_type,
        url: this.selectedReading.url,
        text: this.selectedReading.text
      };
      axios.patch('/api/readings/' + this.selectedReading.id, params).then(function(response) {
      });
    },
    updateReview: function() {
      var params = {
        title: this.selectedReview.title,
        item: this.selectedReview.item,
        rating: this.selectedReview.rating,
        text: this.selectedReview.text
      };
      axios.patch('/api/reviews/' + this.selectedReview.id, params).then(function(response) {
      });
    },
    updatePublication: function() {
      var inputImage = this.selectedPublication.image_url;
      if (inputImage === "") {
        inputImage = null;
      }
      var params = {
        title: this.selectedPublication.title,
        media_type: this.selectedPublication.media_type,
        short_blurb: this.selectedPublication.short_blurb,
        long_blurb: this.selectedPublication.long_blurb,
        url: this.selectedPublication.url,
        pub_date: this.selectedPublication.pub_date,
        full_text: this.selectedPublication.full_text,
        image_url: inputImage
      };
      axios.patch('/api/publications/' + this.selectedPublication.id, params).then(function(response) {
      });
    },

    addPost: function() {
      var params = {
        title: this.newPost.title,
        text: this.newPost.text,
        publication_date: this.newPost.publication_date
      };
      axios.post('/api/posts', params).then(function(response) {
        this.posts.unshift(response.data);
        this.newPost.title = "";
        this.newPost.text = "";

        // FEATURED IMAGE
        if (this.newPost.featured_image_url !== "") {
          var imageParams = {
            image_url: this.newPost.featured_image_url,
            featured: true,
            post_id: response.data.id
          };
          axios.post('/api/images', imageParams).then(function(response) {
            this.newPost.featured_image_url = "";
          }.bind(this));

          // ADDITIONAL IMAGES
          this.newPost.additionalImages.forEach(function(image) {
            if (image.image_url !== "") {
              var imageParams = {
                image_url: image.image_url,
                featured: false,
                post_id: response.data.id
              };
              axios.post('/api/images', imageParams).then(function(response) {
                this.newPost.additionalImages.splice(this.newPost.additionalImages.indexOf(image), 1);
              }.bind(this));
            } else {
              this.newPost.additionalImages.splice(this.newPost.additionalImages.indexOf(image), 1);
            }
          }.bind(this));

        }
      }.bind(this));
    },
    addReading: function() {
      var params = {
        title: this.newReading.title,
        author: this.newReading.author,
        media_type: this.newReading.media_type,
        url: this.newReading.url,
        text: this.newReading.text
      };
      axios.post('/api/readings', params).then(function(response) {
        this.readings.unshift(response.data);
        this.newReading = {title: "", author: "", media_type: "", url: "", text: ""};
      }.bind(this));
    },
    addReview: function() {
      var params = {
        title: this.newReview.title,
        item: this.newReview.item,
        rating: this.newReview.rating,
        text: this.newReview.text
      };
      axios.post('/api/reviews', params).then(function(response) {
        this.reviews.unshift(response.data);
        this.newReview = {title: "", item: "", rating: 0, text: ""};
      }.bind(this));
    },
    addPublication: function() {
      var inputImage = this.newPublication.image_url;
      if (inputImage === "") {
        inputImage = null;
      }
      var params = {
        title: this.newPublication.title,
        media_type: this.newPublication.media_type,
        short_blurb: this.newPublication.short_blurb,
        long_blurb: this.newPublication.long_blurb,
        url: this.newPublication.url,
        pub_date: this.newPublication.pub_date,
        full_text: this.newPublication.full_text,
        image_url: inputImage
      };
      axios.post('/api/publications', params).then(function(response) {
        this.publications.unshift(response.data);
        this.newPublication = {title: "", media_type: "", short_blurb: "", long_blurb: "", url: "", pub_date: "", full_text: ""};
      }.bind(this));
    },

    deletePost: function() {
      axios.delete('/api/posts/' + this.selectedPost.id).then(function(response) {
        this.posts.splice(this.posts.indexOf(this.selectedPost), 1);
      }.bind(this));
    },
    deleteReading: function() {
      axios.delete('/api/readings/' + this.selectedReading.id).then(function(response) {
        this.readings.splice(this.readings.indexOf(this.selectedReading), 1);
      }.bind(this));
    },
    deleteReview: function() {
      axios.delete('/api/reviews/' + this.selectedReview.id).then(function(response) {
        this.reviews.splice(this.reviews.indexOf(this.selectedReview), 1);
      }.bind(this));
    },
    deletePublication: function() {
      axios.delete('/api/publications/' + this.selectedPublication.id).then(function(response) {
        this.publications.splice(this.publications.indexOf(this.selectedPublication), 1);
      }.bind(this));
    },

    approveComment: function(comment) {
      axios.patch('/api/comments/' + comment.id).then(function(response) {
        this.unapprovedComments.splice(this.unapprovedComments.indexOf(comment), 1);
      }.bind(this));
    },
    deleteComment: function(comment) {
      axios.delete('/api/comments/' + comment.id).then(function(response) {
        this.unapprovedComments.splice(this.unapprovedComments.indexOf(comment), 1);
      }.bind(this));
    },

    changeShowSection: function(section) {
      this.showSection = section;
    },

    newAdditionalImage: function() {
      // Creates a textbox
      this.newPost.additionalImages.push({image_url: ""});
    },
    editNewAdditionalImage: function() {
      // Creates a new textbox
      this.selectedPost.additional_images.push({image_url: ""});
    },
    removeImage: function(image) {
      // removes textbox and and removes data from array
      this.newPost.additionalImages.splice(this.newPost.additionalImages.indexOf(image), 1);
    },
    editRemoveImage: function(image) {
      // removes textbox and tags data for removal, but data isn't deleted until user clicks save
      image.image_url = "//orange";
    },

    updateTextBlocks: function() {
      axios.patch('/api/text_blocks/1', {body: this.tagline.body}).then(function(response) {
      });
      axios.patch('/api/text_blocks/2', {body: this.about.body}).then(function(response) {
      });
    },

    // SIGN IN
    submit: function() {
      var params = {
        email: this.email, password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.loggedIn = true;
        }.bind(this))
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    },
    changePassword: function() {
      axios.patch('/api/users', {
        email: this.newPassword.email,
        old_password: this.newPassword.oldPassword,
        new_password: this.newPassword.newPassword
      }).then(function(response) {
      });
    }
  },
  computed: {}
};

var BlogShowPage = {
  template: "#blog-show-page",
  data: function() {
    return {
      message: "Blog Show Page",
      commentMessage: "Please note: comments must be approved before they are displayed to the public.",
      post: {},
      commentsExist: false,
      commentName: "",
      commentComment: ""
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response) {
      this.post = response.data;
      this.post.text = this.post.text.split("\n");
      if (this.post.comments[0]) {
        this.commentsExist = true;
      }
    }.bind(this));
  },
  methods: {
    submitComment: function() {
      var params = {
        commenter: this.commentName,
        comment: this.commentComment,
        post_id: this.post.id
      };
      axios.post('/api/comments', params).then(function(response) {
        this.commentMessage = "Your comment has been submitted and is pending approval.";
        this.commentName = "";
        this.commentComment = "";
      }.bind(this));
    }
  },
  computed: {}
};

var AboutPage = {
  template: "#about-page",
  data: function() {
    return {
      message: "About Ed",
      about: ""
    };
  },
  created: function() {
    axios.get('/api/text_blocks/2').then(function(response) {
      this.about = response.data;
    }.bind(this));
  }
};

var ContactPage = {
  template: "#contact-page",
  data: function() {
    return {
      message: "",
      images: [],
      name: "",
      email: "",
      errors: [],
      inputName: null,
      inputEmail: null,
      inputMessage: null
    };
  },
  created: function() {
    axios.get('/api/images').then(function(response) {
      this.images = response.data;
    }.bind(this));
  },
  methods: {
    addSubscriber: function() {
      if (this.name === "Ed Sarna") {
        this.errors.push('Imposter!');
      }
      if (this.email.indexOf('@') >= 0) {
        var params = {
          name: this.name,
          email: this.email
        };
        axios.post('/api/users', params).then(function(response) {
          this.name = "";
          this.email = "";
        }.bind(this));
      } else {
        this.errors.push('Your email needs an @');
      }
    },
    submitForm: function() {
      var params = {
        name: this.inputName,
        email: this.inputName,
        text: this.inputMessage
      };
      axios.post('/api/questions', params).then(function(response) {
      });
    }
  },
  computed: {}
};

var ImagesPage = {
  template: "#images-page",
  data: function() {
    return {
      message: "Images Page!",
      images: []
    };
  },
  created: function() {
    axios.get('/api/images').then(function(response) {
      this.images = response.data.reverse();
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var ReadingsPage = {
  template: "#readings-page",
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Readings Page!",
      readings: []
    };
  },
  created: function() {
    axios.get('/api/readings').then(function(response) {
      this.readings = response.data.reverse();
      for (var i = 0; i < this.readings.length; i++) {
        this.readings[i].media_type = this.readings[i].media_type.charAt(0).toUpperCase() + this.readings[i].media_type.slice(1);
        this.readings[i].text = this.readings[i].text.split("\n");
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var ReviewsPage = {
  template: "#reviews-page",
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Reviews Page!",
      reviews: []
    };
  },
  created: function() {
    axios.get('/api/reviews').then(function(response) {
      this.reviews = response.data.reverse();
      for (var i = 0;i < this.reviews.length; i++) {
        var ratingArray = [];
        for (var n = 1; n <= this.reviews[i].rating; n++) {
          ratingArray.push(n);
        }
        this.reviews[i].rating = ratingArray;
        this.reviews[i].text = this.reviews[i].text.split("\n");
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var PublicationShowPage = {
  template: "#publication-show-page",
  data: function() {
    return {
      message: "Publication Show Page",
      publication: {},
      awardsExist: false,
      url: ""
    };
  },
  created: function() {
    axios.get("/api/publications/" + this.$route.params.id).then(function(response) {
      this.publication = response.data;
      this.publication.full_text = this.publication.full_text.split("\n");
      this.publication.long_blurb = this.publication.long_blurb.split("\n");
      if (this.publication.awards.length > 0) {
        this.awardsExist = true;
      }
      if (this.publication.url) {
        if (!this.publication.url.includes("http")) {
          this.url = "http://" + this.publication.url;
        } else {
          this.url = this.publication.url;
        }
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var PublicationsPage = {
  template: "#publications-page",
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Stories Page!",
      publications: []
    };
  },
  created: function() {
    axios.get('/api/publications').then(function(response) {
      this.publications = response.data.reverse();
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var BlogPage = {
  template: "#blog-page",
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Blog Page!",
      posts: [{created_at: 1}]
    };
  },
  created: function() {
    axios.get('/api/posts').then(function(response) {
      this.posts = response.data.reverse();
      this.posts = this.posts.map((post) => {
        post.text = post.text.split("\n");
        return post;
      });
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      post: {},
      postImage: null,
      storyImage: null,
      story: {},
      recentImages: [{image_url: ""},{image_url: ""},{image_url: ""}],
      tagline: ""
    };
  },
  created: function() {
    axios.get('/api/posts/last').then(function(response) {
      this.post = response.data;
      if (this.post.images && this.post.images.length > 0) {
        this.postImage = this.post.images[0].image_url;
      }
    }.bind(this));
    axios.get('/api/images/recent').then(function(response) {
      this.recentImages = response.data;
    }.bind(this));
    axios.get('/api/publications/last').then(function(response) {
      this.story = response.data;
      if (this.story.image_url && this.story.image_url !== "") {
        this.storyImage = this.story.image_url;
      }
    }.bind(this));
    axios.get('/api/text_blocks/1').then(function(response) {
      this.tagline = response.data;
    }.bind(this));
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/blog", component: BlogPage },
    { path: "/blog/:id", component: BlogShowPage },
    { path: "/stories", component: PublicationsPage },
    { path: "/stories/:id", component: PublicationShowPage },
    { path: "/reviews", component: ReviewsPage },
    { path: "/readings", component: ReadingsPage },
    { path: "/images", component: ImagesPage },
    { path: "/contact", component: ContactPage },
    { path: "/about", component: AboutPage },
    { path: "/edmin", component: AdminPage },
    { path: "/unsubscribe", component: UnsubscribePage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});