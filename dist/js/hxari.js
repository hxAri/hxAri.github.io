
// Create the router instance.
var router = VueRouter.createRouter({
  
  // Provide the history implementation to use.
  history: VueRouter.createWebHistory(),
  
  // Define some routes.
  // Each route should map to a component.
  routes: [
    {
      path: "/",
      component: component.home.index
    },
    {
      path: "/Yume",
      component: component.yume.index
    },
    {
      path: "/Syntax",
      component: component.syntax.index
    },
    {
      path: "/PHPTree",
      component: component.phptree.index
    }
  ]
});

// Create root application.
var root = {
  name: "root",
  data: function() {
    return {
      paths: [
        {
          path: "/",
          inner: "Home"
        },
        {
          path: "/about",
          inner: "About"
        },
        {
          path: "/privacy",
          inner: "Privacy"
        },
        {
          path: "/contact",
          inner: "Contact"
        },
        {
          path: "/sitemap",
          inner: "SiteMap"
        }
      ],
      medsos: [
        {
          href: "https://instagram.com/hx.ari",
          icon: "bx bxl-instagram"
        },
        {
          href: "https://facebook.com/hxare",
          icon: "bx bxl-facebook"
        },
        {
          href: "https://twitter.com/hxxare",
          icon: "bx bxl-twitter"
        },
        {
          href: "https://github.com/hxari",
          icon: "bx bxl-github"
        }
      ]
    };
  },
  components: {
    Avatar: avatar,
  },
  template: `
    <div class="root">
      <router-view />
      <div class="footer">
        <div class="deep">
          <div class="line-up dp-flex">
            <div class="single">
              <h5 class="mg-bottom-8">Pages</h5>
              <p>Some important pages.</p>
              <li v-for="i in paths" :keys="i" class="li dp-inline-block mg-right-10">
                <router-link :to="{ path: i.path }" class="fs-14">{{ i.inner }}</router-link>
              </li>
            </div>
            <div class="single">
              <h5 class="mg-bottom-8">Follow Me</h5>
              <p class="mg-bottom-8">Stay connected with me.</p>
              <li v-for="i in medsos" :keys="i" class="li dp-inline-block mg-right-10">
                <a :href="i.href"><i :class="i.icon + ' fs-24'"></i></a>
              </li>
            </div>
          </div>
          <div class="single">
            <p class="fs-14">&copy hxAri 2022</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Create and mount the root instance.
var app = Vue.createApp( root );
  
  // Make sure to "use" the router instance.
  app.use( router );
  
  // Target element.
  app.mount( "#vue-root" );
