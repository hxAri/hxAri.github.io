
/*
 * https://hxAri.github.io/
 *
 * @author hxAri
 * @create 15.02-2022
 * @update 19.05-2022
 * @github https://github.com/hxAri
 *
 * @version 4.0.4
 *
 * All source code license under MIT.
 * Please see the MIT documentation for details.
 *
 * Copyright (c) 2022 hxAri <ari160824@gmail.com>
 *
 * I -py ? Basically you don't think of me at all, I hate that.
 */
try {
;
( function( global, factory )
{
    if( typeof exports === "object" && typeof module !== "undefined" )
    {
        factory();
    } else {
        if( typeof define === "function" && define.amd )
        {
            define( factory );
        } else {
            factory();
        }
    }
}( this, function() {
    
    "use strict";
    
    const Null = x => typeof x === "null";
    const Defined = x => typeof x !== "undefined";
    const Undefined = x => typeof x === "undefined";
    
    /*
     * Get value type or match value type.
     *
     * @params Mixed $params
     * @params Function $object
     * @params Function $handler
     * @params Function $catcher
     *
     * @return Mixed
     */
    const $Is = function( params, object, handler, catcher )
    {
        var closure = {
            handler: () => typeof handler === "function" ? handler( params ) : true,
            catcher: () => typeof catcher === "function" ? catcher( params ) : false
        };
        
        if( typeof object === "function" )
        {
            if( object.name === "Defined" || object.name === "Undefined" )
            {
                return( object( params ) ? closure.handler() : closure.catcher() );
            }
            return( $Is( params ) === object.name ? closure.handler() : closure.catcher() );
        } else {
            if( typeof object === "object" )
            {
                for( let i in object )
                {
                    if( $Is( params, object[i] ) )
                    {
                        return( closure.handler() );
                    }
                }
                return( closure.catcher() );
            }
        }
        return( Object.prototype.toString.call( params ).replace( /\[object\s*(.*?)\]/, `$1` ) );
    };
    
    /*
     * String Formater utility
     *
     * @params String $string
     * @params String ...
     * 
     * @return String
     * 
     * @version 1.0.0
     */
    const $f = function()
    {
        var i = 1;
        var args = arguments;
        
        return( args[0].replace( /{}/g, function ()
        {
            return( typeof args[i] !== "undefined" ? args[i++] : "" );
        }));
    };
    
    /*
     * ....
     *
     * @params Array, Object, String $v
     * 
     * @return String
     */
    const $v = function( v )
    {
        if( $Is( v, Array ) )
        {
            for( let i in v )
            {
                if( $Is( v[i], Function ) )
                {
                    v[i] = v[i].name;
                }
            }
            v = v.join( "|" );
        } else {
            if( $Is( v, Function ) )
            {
                v = v.name;
            }
        }
        return( v );
    };
    
    /*
     * A collection of error lists that can be used.
     *
     * @values Object.
     */
    const $E = {
        TypeError: {
            
            /*
             * When a function returns the wrong phone.
             *
             * @params String $__OBJECT__
             * @params String $name
             * @params Object $type
             * @params Mixed $given
             * 
             * @return Void
             */
            return: ( __OBJECT__, name, type, given ) => 
            {
                console.error( $f( "{}: The return value of function {} must be of type {}, {} is returned.", __OBJECT__, name, $v( type ), $Is( given ) ) );
            },
            
            /*
             * When the value of an attribute, parameter,
             * or variable does not match.
             * 
             * @params String $__OBJECT__
             * @params String $name
             * @params Mixed $value
             * @params Mixed $given
             * 
             * @return Void
             */
            value: ( __OBJECT__, name, value, given ) => 
            {
                console.error( $f( "{}: The value of {} must contain {}, {} is given.", __OBJECT__, name, $v( value ), given ) );
            }
        },
        AttributeError: {
            catch: ( __OBJECT__, name ) => 
            {
                console.error( $f( "{}: The {} attribute is undefined or may be deleted.", __OBJECT__, name ) );
            },
            value: ( __OBJECT__, name, value, given ) => 
            {
                console.error( $f( "{}: The .{} attribute must have a value of /{}/, {} is given.", __OBJECT__, name, $v( value ), given ) );
            }
        },
        CallbackError: {},
        ParameterError: {},
        ReferenceError: ( __OBJECT__, name ) => 
        {
            console.error( $f( "{}: Reference of {} undefined.", __OBJECT__, name ) );
        },
        ConnectionError: {},
        UnexpectedError: {}
    };
    
    /*
     * Theme utility
     *
     * Preference themes that support
     * detection of theme colors on the device.
     *
     * @version 1.0.8
     */
    const $Theme = function({ get, set })
    {
        if( $Is( set, Undefined ) )
        {
            if( window.matchMedia )
            {
                if( window.matchMedia( "(prefers-color-scheme: dark)" ).matches )
                {
                    set = "dark";
                } else {
                    set = this.get();
                }
            } else {
                set = this.get();
            }
        }
        this.set( set );
    };
    
    /* Theme alias name. */
    $Theme.prototype.name = "dGhlbWU";
    
    /* Theme colors. */
    $Theme.prototype.theme = {
        dark: {
            color: "#202521",
            token: "7a51da870ccc24c22518717d3cf56d29"
        },
        light: {
            color: "#eeeeee",
            token: "73fe8a55fee50b1e4b81af2e2446ea04"
        }
    };
    
    /* Theme contructor results. */
    $Theme.prototype.result = null;
    
    /* Theme default color. */
    $Theme.prototype.default = "light";
    
    /*
     * Get current theme token.
     *
     * @return String
     */
    $Theme.prototype.get = function()
    {
        var token;
        
        if( token = new $Cookie({ get: this.name }).result )
        {
            return( token === this.theme.light.token ? "light" : "dark" );
        } else {
            return( "light" );
        }
    };
    
    /*
     * Set theme color.
     *
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set = function( color )
    {
        var roti;
        
        if( $Is( color, Undefined ) )
        {
            color = this.default;
        }
        if( $Is( roti = new $Cookie({ get: this.name }), Undefined ) || roti !== this.theme[color].token )
        {
            new $Cookie({ set: {
                key: this.name,
                val: this.theme[color].token,
                opt: {
                    path: "/",
                    expires: 30
                }
            }});
        }
        this.set.prototype.html( color );
        this.set.prototype.meta( color );
    };
    
    /*
     * Set theme color to HTMLHeadElement.
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set.prototype.html = color => document.documentElement.dataset.theme = color;
    
    /*
     * Set theme color to HTMLMetaElement.
     *
     * @params String $color
     *
     * @return Void
     */
    $Theme.prototype.set.prototype.meta = color =>
    {
        var meta = null;
        
        // Check if HTMLMetaElement has been created.
        if( $Is( meta = document.querySelector( "meta[name=\"theme-color\"]" ), Null ) )
        {
            
            // Create new HTMLMetaElement.
            meta = document.createElement( "meta" );
            
            // Set meta attribute.
            meta.setAttribute( "name", "theme-color" );
            
            // Append HTMLMetaElement to HTMLHeadElement.
            document.head.appendChild( meta );
        }
        
        // Set meta attribute content value.
        meta.setAttribute( "content", $Theme.prototype.theme[color].color );
        
    };
    
    /*
     * Cookie utility.
     *
     * A utility that provides various
     * APIs for managing cookies.
     *
     * @version 1.0.0
     */
    const $Cookie = function( $args )
    {
        if( $Is( $args, Object ) )
        {
            if( $Is( $args.del, Defined ) )
            {
                return( this.result = this.del( $args.del ) );
            }
            if( $Is( $args.get, Defined ) )
            {
                return( this.result = this.get( $args.get ) );
            }
            if( $Is( $args.set, Defined ) )
            {
                return( this.result = this.set( $args.set ) );
            }
        }
    };
    
    $Cookie.prototype.option = {
        path: true,
        domain: true,
        expires: true,
        samesite: true
    };
    
    /* Cookie constructor result. */
    $Theme.prototype.result = null;
    
    /*
     * Delete one or even more than one cookies.
     *
     * @params Array, Object
     *
     * @return Object, String
     */
    $Cookie.prototype.del = function( params )
    {
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                params[i] = this.set( params[i] );
            }
            return( params );
        }
        if( $Is( params, Object ) )
        {
            if( $Is( params, Undefined ) )
            {
                params.opt = {};
            }
            params.opt.expires = -1;
            
            return( this.set( params ) );
        }
    };
    
    /*
     * Take cookies based on the name of the cookie, or take all cookies.
     *
     * @params Array, String $params
     *
     * @return Object, String
     */
    $Cookie.prototype.get = function( params )
    {
        var result = {};
        
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                result[i] = this.set( params[i] );
            }
            return( result );
        }
        if( $Is( params, String ) )
        {
            if( $Is( result = document.cookie.split( ";" ).find( r => r.startsWith( encodeURIComponent( params ) + "=" ) ) ) !== "Undefined" )
            {
                result = decodeURIComponent( result.split( "=" )[1] );
            }
            return( result );
        }
        document.cookie.split( ";" ).map( part =>
        {
            result[decodeURIComponent( part.split( "=" )[0] )] = decodeURIComponent( part.split( "=" )[1] );
        });
        return( result );
    };
    
    /*
     * Set one or more than one kuuki.
     *
     * @params Array, Object
     *
     * @return Object, String
     */
    $Cookie.prototype.set = function( params )
    {
        
        var string = "";
        var result = {};
        
        if( $Is( params, Array ) )
        {
            for( let i in params )
            {
                result[i] = this.set( params[i] );
            }
            return( result );
        }
        if( $Is( params, Object ) )
        {
            if( $Is( params.key, String ) )
            {
                params.key = encodeURIComponent( params.key );//.replace( /%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent ).replace( /[\(\)]/g, escape );
            } else {
                return( $E.TypeError.value( "$Cookie::set", ".key", String, params.key ) );
            }
            if( $Is( params.val, String ) )
            {
                params.val = encodeURIComponent( params.val );//.replace( /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent );
            } else {
                params.val = "None";
                params.opt.expires = -1;
            }
            if( $Is( params.opt, Object ) )
            {
                if( $Is( params.opt.path, String ) )
                {
                    if( params.opt.path === "" )
                    {
                        delete params.opt.path;
                    }
                }
                if( $Is( params.opt.domain, String ) )
                {
                    if( params.opt.domain === "" )
                    {
                        delete params.opt.domain;
                    }
                }
                if( $Is( params.opt.expires, Number ) )
                {
                    var dateTime = new Date();
                        dateTime.setMilliseconds( dateTime.getMilliseconds() + params.opt.expires * 864e+5 );
                    
                    params.opt.expires = dateTime.toUTCString();
                } else {
                    delete params.opt.expires;
                }
                if( $Is( params.opt.samesite, String ) )
                {
                    if( params.opt.samesite === "" )
                    {
                        delete params.opt.samesite;
                    }
                }
                for( let i in params.opt )
                {
                    if( $Is( this.option[i], Boolean ) )
                    {
                        string += "; " + i + "=" + params.opt[i];
                    }
                }
            }
            return( document.cookie = params.key + "=" + params.val + string );
        }
    };
    
    const $Bash = function( input )
    {
        if( $Is( input, String ) && this.spaces( input ) !== "" )
        {
            input.split( "&&" ).forEach( input => this.result.push({ input: this.spaces( input ), output: this.execute( this.spaces( input ) ) }) );
        }
    };
    
    $Bash.prototype.prompt = "\\e[05mhxari\\e[04m@github.io\\e[01m:\\e[08m~\\e[00m$";
    
    $Bash.prototype.result = [
        {
            input: false,
            output: [
                // \\e[03m
                "\\e[00m             ::                                 \\e[00m",
                "\\e[00m            ~JJ^... :~^                         \\e[00m",
                "\\e[00m      .^::~7JJJJJJ??JJJ^                        \\e[00m",
                "\\e[00m      7JJJYYJ?77??JJJJJJ?!!??:                  \\e[00m",
                "\\e[00m      :JJJ?^.     .^!?JJJJJJ?.                  \\e[00m",
                "\\e[00m    :^?JJJ.    ~7^   .~?JJJJJ?: ..              \\e[00m",
                "\\e[00m   .?JJJJJ^  .!JY7     .?JJJJ~::^::.            \\e[00m",
                "\\e[00m    ..^?JJJ??JJJJ:      :JJJ7.:~!~::.           \\e[00m",
                "\\e[00m       :JJJ?J?7JJ~       7JJ?^:::::.            \\e[00m",
                "\\e[00m       .!7^..  :^.       ?JJ?!!~~^              \\e[00m",
                "\\e[00m                        :JJJ7!!!!!              \\e[00m",
                "\\e[00m                       .?JJ?!!!~~~.             \\e[00m",
                "\\e[00m                      ^?JJ?!!^:::::.            \\e[00m",
                "\\e[00m                    :7JJJ7!!~.:~!~::.           \\e[00m",
                "\\e[00m                  .!JJJJ7!!!!^::^::.            \\e[00m",
                "\\e[00m                .~JJJJJ7!!!!!!!^ .              \\e[00m",
                "\\e[00m               ^?JJJJ?!!!!!!!!^                 \\e[00m",
                "\\e[00m             :7JJJJJ?!!!~^^:^^                  \\e[00m",
                "\\e[00m           .!JJJJJJ7!!!^::~~::.                 \\e[00m",
                "\\e[00m          ~?JJJJJJ7!!!!^.^!!^:.                 \\e[00m",
                "\\e[00m        ^?JJJJJJJ7!!!!!!^:::..                  \\e[00m",
                "\\e[00m      :7JJJJJJJ?!!!!!!!!^                       \\e[00m",
                "\\e[00m      7JJJJJJJ?!!!!!!!~:                        \\e[00m",
            ]
        }
    ];
    
    $Bash.prototype.spaces = function( input )
    {
        return( ( input = ( input[0] === " " ? input = input.slice( 1 ) : ( input[( input.length -1 )] === " " ? input = input.slice( 0, -1 ) : input ) ) )[0] === " " || input[( input.length -1 )] === " " ? this.spaces( input ) : input );
    };
    
    $Bash.prototype.execute = function( input )
    {
        var name; name = $Is( name = input.split( " " ), Array ) ? name[0] : name;
        
        for( let command of this.commands )
        {
            if( command.name === name )
            {
                var parameter = {};
                
                for( let argument of command.argument )
                {
                    if( this.arguments[argument.type.name] )
                    {
                        var regexp = new RegExp( this.arguments[argument.type.name].pattern.replace( /\:\$/g, argument.name ) );
                        var result = null;
                        
                        if( result = input.match( regexp ) )
                        {
                            input = input.replace( result[0], m =>
                            {
                                parameter[( argument.name.replace( /\-/, "$" ) )] = this.arguments[argument.type.name].transform( result[1] ? result[1] : result[2] ); return "";
                            });
                        } else {
                            if( argument.require )
                            {
                                return( this.message( "sh", argument.name, "Argument required." ) );
                            }
                        }
                    } else {
                        return( this.message( "sh", argument.name, "Invalid argument type." ) );
                    }
                }
                
                var $ = this.spaces( input.replace( new RegExp( "^" + command.name ), "" ) );
                
                for( let argument of command.argument )
                {
                    if( $ !== "" && argument.name === "$" )
                    {
                        parameter.$ = $;
                    }
                }
                
                if( $ !== "" && $Is( parameter.$, Undefined ) )
                {
                    return( this.message( "sh", command.name, "Too many arguments." ) );
                }
                
                return( command.callback( parameter ) );
            }
        }
        return( this.message( "sh", name, "Command error not found." ) );
    };
    
    $Bash.prototype.message = ( command, value, message ) => `${command}: ${value}: ${message}`;
    
    $Bash.prototype.colorable = string =>
    {
        var regexp = new RegExp( /\\e\[([0-9]+)m/g );
        var result;
        
        while( result = regexp.exec( string ) )
        {
            string = string.replace( result[0], `<span class="fc-sh-${result[1]}m">` );
            string += "</span>";
        }
        return( string );
    };
    
    $Bash.prototype.arguments = {
        Boolean: {
            pattern: ":$ (false|true)",
            transform: argument => argument === "true" ? true : false
        },
        String: {
            pattern: ":$ \"(.*)\"|:$ (.*)",
            transform: argument => argument
        },
        Number: {
            pattern: ":$ ([0-9]+)",
            transform: argument => parseInt( argument )
        }
    };
    
    $Bash.prototype.commands = [
        {
            name: "cd",
            argument: [
                {
                    name: "$",
                    type: String,
                    require: false
                }
            ],
            callback: function({ $ })
            {
                if( $Is( $Bash.prototype.router, Defined ) )
                {
                    var matched = $Bash.prototype.router.resolve({ path: ( $ = $Is( $, Undefined ) ? "/" : ( $[0] !== "/" ? `/${$}` : $ ) ) }).matched;
                    
                    if( matched.length > 0 && matched[0].name !== "error" )
                    {
                        $Bash.prototype.router.push( $ ); return;
                    }
                    return( $Bash.prototype.message( "cd", $, "No such file or directory." ) );
                } else {
                    return( $Bash.prototype.message( "cd", "router", "" ) );
                }
            }
        },
        {
            name: "tree",
            data: {
                abouts: {},
                contact: {},
                projects: {
                    yume: {
                        start: {},
                        install: {}
                    }
                },
                privacy: {},
                sitemap: {}
            },
            argument: [
                {
                    name: "$",
                    type: String,
                    require: false
                }
            ],
            callback: function({ $ })
            {
                var maps = this.data;
                
                if( $Is( $, Undefined ) )
                {
                    $ = "/";
                }
                if( $ !== "/" )
                {
                    for( let path of $.split( "/" ) )
                    {
                        if( path !== "" )
                        {
                            if( $Is( maps[path], Defined ) )
                            {
                                maps = maps[path];
                            } else {
                                return( $Bash.prototype.message( "tree", $, "No such file or directory." ) );
                            }
                        }
                    }
                }
                return( JSON.stringify( maps, null, 4 ) );
            }
        },
        {
            name: "echo",
            argument: [
                {
                    name: "-e",
                    type: String,
                    require: true
                }
            ],
            callback: function({ $e }, x = /\\e\[([0-9]+)m/g )
            {
                return( $e );
            }
        },
        {
            name: "clear",
            argument: [],
            callback: function()
            {
                $Bash.prototype.result = [];
            }
        }
    ];
    
    const $Avatar = {
        name: "Avatar",
        data: function()
        {
            return({
                EMPTY: "",
                className: "avatar-wrapper flex flex-center"
            });
        },
        props: {
            src: {
                type: String,
                require: true
            },
            alt: String,
            link: String,
            route: String,
            title: String,
            inject: String
        },
        mounted: function()
        {
            if( $Is( this.inject, String ) )
            {
                this.className += " ";
                this.className += this.inject;
            }
        },
        template: `
            <div class="avatar">
                <div :class="className" v-if="route">
                    <router-link :to="{ path: route }">
                        <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                        <div class="avatar-cover"></div>
                    </router-link>
                </div>
                <div :class="className" v-else-if="link">
                    <a :href="link" target="_blank" rel="noopener noreferrer">
                        <img class="avatar-image" :src="( src ? src : EMPTY )" :alt="( alt ? alt : EMPTY )" :title="( title ? title : EMPTY )" />
                        <div class="avatar-cover"></div>
                    </a>
                </div>
            </div>
        `
    };
    
    const $Sidebr = {
        name: "Sidebr",
        props: {
            pages: {
                type: Array,
                require: true
            },
            left: {
                type: Number,
                require: true
            }
        },
        data: function()
        {
            return({
                className: ""
            });
        },
        computed: {
            loop: function()
            {
                return({
                    template: this.self( this.pages, this.left )
                });
            }
        },
        methods: {
            self: function( pages, left )
            {
                var template = "<div class=\"" + ( left === 0 ? "pd-14" : "dropdown-content pd-left-" + left ) + "\">";
                
                for( let page in pages )
                {
                    if( $Is( pages[page].drop, Array ) )
                    {
                        template += "<div class=\"dropdown\">";
                            template += "<div class=\"li\">";
                                template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                            template += "</div>";
                            template += this.self( pages[page].drop, left === 0 ? 28 : left + 2 );
                        template += "</div>";
                    } else {
                        template += "<div class=\"li\">";
                            template += "<router-link to=\"" + pages[page].path + "\">";
                                template += "<i class=\"" + ( this.$route.path === pages[page].path ? pages[page].icon[1] : pages[page].icon[0] ) + " mg-right-14\"></i>" + pages[page].slot;
                            template += "</router-link>";
                        template += "</div>";
                    }
                }
                return( template + "</div>" );
            }
        },
        template: `<component v-bind:is="loop"></component>`
    };
    
    const $Footer = {
        name: "Footer",
        data: function()
        {
            return({
                pages: [
                    { path: "/", slot: "Home" },
                    { path: "/abouts", slot: "Abouts" },
                    { path: "/contact", slot: "Contact" },
                    { path: "/privacy", slot: "Privacy" },
                    { path: "/sitemap", slot: "Sitemap" }
                ],
                socmed: [
                    { link: "https://instagram.com/hx.ari", icon: "bx bxl-instagram" },
                    { link: "https://facebook.com/hx.are", icon: "bx bxl-facebook" },
                    { link: "https://twitter.com/hxxAre", icon: "bx bxl-twitter" },
                    { link: "https://github.com/hxAri", icon: "bx bxl-github" }
                ]
            });
        },
        template: `
            <div class="footer flex flex-center">
                <div class="footer-wrapper">
                    <div class="footer-content dp-flex">
                        <div class="footer-group pd-14">
                            <h5 class="mg-bottom-8">Pages</h5>
                            <p class="fc-1m">Some important pages.</p>
                            <li class="li dp-inline-block mg-right-10" v-for="i in pages">
                                <router-link :to="{ path: i.path }" class="fs-14">{{ i.slot }}</router-link>
                            </li>
                        </div>
                        <div class="footer-group pd-14">
                            <h5 class="mg-bottom-8">Follow Me</h5>
                            <p class="">Stay connected with me.</p>
                            <li class="li dp-inline-block mg-right-10" v-for="i in socmed">
                                <a :href="i.link" target="_blank" rel="noopener noreferrer">
                                    <i :class="i.icon"></i>
                                </a>
                            </li>
                        </div>
                    </div>
                    <div class="footer-single">
                        <p class="">&copy hxAri 2022</p>
                    </div>
                </div>
            </div>
        `
    };
    
    const $Home = {
        data: function()
        {
            return({
                model: null,
                prompt: $Bash.prototype.prompt,
                display: $Bash.prototype.result,
                welcome: [{
                    output: [
                        "",
                        "Hello World!",
                        ""
                    ]
                }]
            });
        },
        props: {
            command: Array
        },
        mounted: function()
        {
            var self = this;
            
            if( $Is( $Bash.prototype.router, Undefined ) )
            {
                $Bash.prototype.router = self.$router;
            }
            if( $Is( self.command, Array ) )
            {
                self.command.forEach( io =>
                    self.display.push({
                        input: io.input,
                        output: io.output
                    })
                );
            } else {
                self.welcome.forEach( io => self.display.push( io ) );
            }
        },
        methods: {
            submit: function( e )
            {
                e.preventDefault();
                
                this.display = new $Bash( this.model ).result;
                this.model = null;
            },
            replace: function( input )
            {
                const syntax = [
                    {
                        pattern: /\"(.*?)\"/,
                        replace: "<span class=\"fc-sh-08m\">$</span>"
                    },
                    {
                        pattern: /^([a-zA-Z0-9\-]+)/,
                        replace: "<span class=\"fc-sh-02m\">$</span>"
                    },
                    {
                        pattern: /\s([\-]+)([a-zA-Z0-9]+)/,
                        replace: "<span class=\"fc-sh-05m\">$</span>"
                    },
                ];
                
                syntax.forEach( self =>
                {
                    input = input.replace( self.pattern, m => self.replace.replace( /\$/, m ) );
                });
                
                return( input );
            },
            compile: function()
            {
                var compile = "";
                
                for( let command of this.display )
                {
                    compile += "<div class=\"terminal-group\">";
                        if( $Is( command.input, String ) )
                        {
                            compile += "<label class=\"terminal-prompt mg-right-8\">";
                                compile += $Bash.prototype.colorable( this.prompt );
                            compile += "</label>";
                            compile += "<label class=\"terminal-output\">";
                                compile += command.input;
                            compile += "</label>";
                        }
                        if( $Is( command.output, Array ) )
                        {
                            for( let output of command.output )
                            {
                                if( output !== "" )
                                {
                                    compile += "<div class=\"terminal-output\">";
                                        compile += $Bash.prototype.colorable( output );
                                    compile += "</div>";
                                } else {
                                    compile += "</br>";
                                }
                            }
                        } else {
                            compile += "<div class=\"terminal-output\">";
                                compile += command.output ? $Bash.prototype.colorable( command.output ) : "";
                            compile += "</div>";
                        }
                    compile += "</div>";
                }
                
                return( compile );
            },
            cprompt: function()
            {
                return( $Bash.prototype.colorable( this.prompt ) );
            }
        },
        template: `
            <div class="home pd-14 fm-inconsolata">
                <pre class="terminal" v-html="compile()" v-if="display.length !== 0"></pre>
                <form class="form" @submit="submit">
                    <div class="terminal-form">
                        <label class="terminal-prompt mg-0 fs-16" v-html="cprompt()"></label>
                        <input class="terminal-input mg-left-8 fm-inconsolata fs-16" type="text" v-model="model" placeholder="..." autocapitalize="none" />
                    </div>
                </form>
            </div>
        `
    };
    
    // The router instance.
    const $Router = $Bash.prototype.router = VueRouter.createRouter({
        
        // Router history mode.
        history: VueRouter.createWebHistory(),
        
        // Define some routes.
        // Each route should map to a component.
        routes: [
            {
                path: "/",
                component: $Home
            },
            {
                path: "/about",
                component: {}
            },
            {
                path: "/privacy",
                component: {}
            },
            {
                path: "/contact",
                component: {}
            },
            {
                path: "/sitemap",
                component: {}
            },
            {
                path: "/projects",
                children: [
                    {
                        path: "Yume",
                        component: {}
                    }
                ],
                component: {}
            },
            {
                name: "error",
                path: "/:e(.*)*",
                component: $Home,
                props: route => ({
                    command: [{
                        output: [ "", `cd: ${route.path}: No such file or directory.`, "" ]
                    }]
                })
            }
        ]
        
    });
    
    // Root component option.
    const $Option = {
        data: function()
        {
            return({
                pages: [
                    {
                        path: "/",
                        icon: [
                            "bx bx-home",
                            "bx bxs-home"
                        ],
                        slot: "Home"
                    },
                    {
                        path: "/abouts",
                        icon: [
                            "bx bx-user",
                            "bx bxs-user"
                        ],
                        slot: "Abouts"
                    },
                    {
                        path: "/projects",
                        icon: [
                            "bx bx-code",
                            "bx bx-code-alt"
                        ],
                        drop: [
                            {
                                path: "/projects/yume",
                                icon: "",
                                slot: "Yume"
                            }
                        ],
                        slot: "Projects"
                    },
                    {
                        path: "/address",
                        icon: [
                            "bx bx-map",
                            "bx bxs-map"
                        ],
                        slot: "Address"
                    },
                    {
                        path: "/contact",
                        icon: [
                            "bx bx-phone",
                            "bx bxs-phone"
                        ],
                        slot: "Contact"
                    },
                    {
                        path: "/privacy",
                        icon: [
                            "bx bx-lock-open",
                            "bx bxs-lock-open"
                        ],
                        slot: "Privacy"
                    },
                    {
                        path: "/sitemap",
                        icon: [
                            "bx bx-link",
                            "bx bx-link-alt"
                        ],
                        slot: "Sitemap"
                    }
                ],
                sidebr: "sidebr",
                sidebrMain: "sidebr-main",
                burger: "button burger"
            });
        },
        mounted: function()
        {
            new $Theme({});
        },
        methods: {
            open: function()
            {
                if( this.burger.match( /[a-z]+\-active/g ) )
                {
                    this.sidebr = "sidebr";
                    this.sidebrMain = "sidebr-main";
                    this.burger = "button burger";
                } else {
                    this.sidebr = "sidebr sidebr-active";
                    this.sidebrMain = "sidebr-main sidebr-active";
                    this.burger = "button burger burger-active";
                }
            }
        },
        template: `
            <div class="template responsive-column">
                <div class="header"><!-- v-if="( $route.path !== '/' )">-->
                    <div class="header-banner flex pd-14">
                        <Avatar src="https://raw.githubusercontent.com/hxAri/hxAri.github.io/main/dist/img/avatar/hxari.png" alt="hxAri" title="hxAri" route="/" inject="rd-circle" />
                        <button :class="burger" @click="open">
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                        </button>
                    </div>
                </div>
                <div class="breakr"><!-- v-if="( $route.path !== '/' )">--></div>
                <div class="parent">
                    <router-view />
                </div>
                <div :class="sidebr">
                    <div class="sidebr-exit" @click="open"></div>
                    <div :class="sidebrMain">
                        <Sidebr :pages="pages" :left="0" />
                    </div>
                </div>
                <Footer /><!--v-if="( $route.path !== '/' )" />-->
            </div>
        `,
        components: {
            Avatar: $Avatar,
            Sidebr: $Sidebr,
            Footer: $Footer
        }
    };
    
    // The application instance.
    const 
        $Object = Vue.createApp( $Option );
        
        // Make sure to "use" the router instance.
        $Object.use( $Router );
        
        // Mount element.
        $Object.mount( "#root" );
    
}));
} catch( e ) {
    console.error( e );
}
