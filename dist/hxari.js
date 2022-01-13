
// Create the router instance.
var router = VueRouter.createRouter({
    
    // Provide the history implementation to use.
    history: VueRouter.createWebHistory(),
    
    // Define some routes.
    // Each route should map to a component.
    routes: [
        {
            path: "/",
            component: home
        },
        {
            path: "/Yume",
            component: yume
        },
        {
            path: "/Syntax",
            component: syntax
        }
    ]
});

// Create root appkication.
var root = {
    name: "root",
    data: function() {
        return {
            menu: {
                yume: false,
                syntax: false
            }
        };
    },
    mounted: function() {
        
    },
    methods: {
        toggle: function( c ) {
            this.menu[c] = !this.menu[c];
        }
    },
    components: {
        Avatar: avatar,
    },
    template: `
        <div class="root">
            <router-view />
        </div>
    `
};

// Create and mount the root instance.
var app = Vue.createApp( root );
    
    // Make sure to "use" the router instance.
    app.use( router );
    
    // Target element.
    app.mount( "#vue-root" );
