/* global Vue, VueRouter, axios */

var PublicationsPage = {
  template: "#publications-page",
  data: function() {
    return {
      message: "Publications Page!",
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
      message: "Blog Page!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/blog", component: BlogPage },
    { path: "/publications", component: PublicationsPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});