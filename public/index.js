/* global Vue, VueRouter, axios */

var AdminPage = {
  template: "#admin-page",
  data: function() {
    return {
      message: "Admin Page"
    };
  },
  created: function() {},
  methods: {},
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
      this.images = response.data;
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
      this.readings = response.data;
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
      this.reviews = response.data;
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
      this.publications = response.data;
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
      this.posts = response.data;
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
      recentImages: []
    };
  },
  created: function() {
    axios.get('/api/posts/last').then(function(response) {
      this.post = response.data;
    }.bind(this));
    axios.get('/api/images/recent').then(function(response) {
      this.recentImages = response.data;
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