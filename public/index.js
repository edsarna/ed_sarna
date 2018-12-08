/* global Vue, VueRouter, axios */

var AdminPage = {
  template: "#admin-page",
  data: function() {
    return {
      message: "Admin Page",
      posts: [],
      readings: [],
      reviews: [],
      publications: [],
      selectedPost: {},
      selectedReading: {},
      selectedReview: {},
      selectedPublication: {},
      newPost: {title: "", text: "", image_url: ""},
      newReading: {title: "", author: "", media_type: "", url: "", text: ""},
      newReview: {title: "", item: "", rating: 0, text: ""},
      newPublication: {title: "", media_type: "", short_blurb: "", long_blurb: "", url: "", pub_date: "", full_text: ""}
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
  },
  methods: {
    selectPost: function(post) {
      this.selectedPost = post;
      // console.log(this.selectedPost);
    },
    selectReading: function(reading) {
      this.selectedReading = reading;
      // console.log(this.selectedReading);
    },
    selectReview: function(review) {
      this.selectedReview = review;
      // console.log(this.selectedPost);
    },
    selectPublication: function(publication) {
      this.selectedPublication = publication;
      // console.log(this.selectedPost);
    },

    updatePost: function() {
      var params = {
        title: this.selectedPost.title,
        text: this.selectedPost.text
      };
      axios.patch('/api/posts/' + this.selectedPost.id, params).then(function(response) {
        // console.log(response.data);
      });
      if (this.selectedPost.images_exist) {
        axios.patch('/api/images/' + this.selectedPost.images[0].id, {image_url: this.selectedPost.images[0].image_url}).then(function(response) {
          console.log('image updated too');
        });
      }
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
        // console.log(response.data);
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
        // console.log(response.data);
      });
    },
    updatePublication: function() {
      var params = {
        title: this.selectedPublication.title,
        media_type: this.selectedPublication.media_type,
        short_blurb: this.selectedPublication.short_blurb,
        long_blurb: this.selectedPublication.long_blurb,
        url: this.selectedPublication.url,
        pub_date: this.selectedPublication.pub_date,
        full_text: this.selectedPublication.full_text
      };
      axios.patch('/api/publications/' + this.selectedPublication.id, params).then(function(response) {
        // console.log(response.data);
      });
    },

    addPost: function() {
      var params = {
        title: this.newPost.title,
        text: this.newPost.text
      };
      axios.post('/api/posts', params).then(function(response) {
        // console.log(response.data);
        this.posts.unshift(response.data);
        this.newPost.title = "";
        this.newPost.text = "";
        if (this.newPost.image_url !== "") {
          var imageParams = {
            image_url: this.newPost.image_url,
            post_id: response.data.id
          };
          axios.post('/api/images', imageParams).then(function(response) {
            // console.log(response.data);
            this.newPost.image_url = "";
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
        // console.log(response.data);
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
        // console.log(response.data);
        this.reviews.unshift(response.data);
        this.newReview = {title: "", item: "", rating: 0, text: ""};
      }.bind(this));
    },
    addPublication: function() {
      var params = {
        title: this.newPublication.title,
        media_type: this.newPublication.media_type,
        short_blurb: this.newPublication.short_blurb,
        long_blurb: this.newPublication.long_blurb,
        url: this.newPublication.url,
        pub_date: this.newPublication.pub_date,
        full_text: this.newPublication.full_text
      };
      axios.post('/api/publications', params).then(function(response) {
        // console.log(response.data);
        this.publications.unshift(response.data);
        this.newPublication = {title: "", media_type: "", short_blurb: "", long_blurb: "", url: "", pub_date: "", full_text: ""};
      }.bind(this));
    },

    deletePost: function() {
      axios.delete('/api/posts/' + this.selectedPost.id).then(function(response) {
        console.log(response.data);
        this.posts.splice(this.posts.indexOf(this.selectedPost), 1);
      }.bind(this));
    },
    deleteReading: function() {
      axios.delete('/api/readings/' + this.selectedReading.id).then(function(response) {
        console.log(response.data);
        this.readings.splice(this.readings.indexOf(this.selectedReading), 1);
      }.bind(this));
    },
    deleteReview: function() {
      axios.delete('/api/reviews/' + this.selectedReview.id).then(function(response) {
        console.log(response.data);
        this.reviews.splice(this.reviews.indexOf(this.selectedReview), 1);
      }.bind(this));
    },
    deletePublication: function() {
      axios.delete('/api/publications/' + this.selectedPublication.id).then(function(response) {
        console.log(response.data);
        this.publications.splice(this.publications.indexOf(this.selectedPublication), 1);
      }.bind(this));
    }
  },
  computed: {}
};

var BlogShowPage = {
  template: "#blog-show-page",
  data: function() {
    return {
      message: "Blog Show Page",
      post: {},
      imagesExist: false
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response) {
      this.post = response.data;
      if (this.post.images[0]) {
        this.imagesExist = true;
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var AboutPage = {
  template: "#about-page",
  data: function() {
    return {
      message: "About Ed",
      images: []
    };
  },
  created: function() {
    axios.get('/api/images').then(function(response) {
      this.images = response.data;
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var ContactPage = {
  template: "#contact-page",
  data: function() {
    return {
      message: "",
      images: [],
      name: "",
      email: "",
      errors: []
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
      console.log(this.images);
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var ReadingsPage = {
  template: "#readings-page",
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
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var ReviewsPage = {
  template: "#reviews-page",
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
        console.log(this.reviews[i].rating);
        var ratingArray = [];
        for (var n = 1; n <= this.reviews[i].rating; n++) {
          ratingArray.push(n);
        }
        this.reviews[i].rating = ratingArray;
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
      awardsExist: false
    };
  },
  created: function() {
    axios.get("/api/publications/" + this.$route.params.id).then(function(response) {
      this.publication = response.data;
      if (this.publication.awards.length > 0) {
        this.awardsExist = true;
      }
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var PublicationsPage = {
  template: "#publications-page",
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
  data: function() {
    return {
      message: "Blog Page!",
      posts: []
    };
  },
  created: function() {
    axios.get('/api/posts').then(function(response) {
      this.posts = response.data.reverse();
      console.log(this.posts);
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome Ed Sarna's Website!",
      post: {},
      postImage: null,
      story: {},
      recentImages: [{image_url: ""},{image_url: ""},{image_url: ""}]
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
    }.bind(this));
  },
  methods: {},
  computed: {}
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
    { path: "/edmin", component: AdminPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});