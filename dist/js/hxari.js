/*
 * https://hxAri.github.io/
 *
 * @author hxAri
 * @create 15.02-2022
 * @update 04.05-2022
 * @github https://github.com/hxAri
 *
 * All source code license under MIT.
 * Please see the MIT documentation for details.
 *
 * Copyright (c) 2022 hxAri <ari160824@gmail.com>
 */

;( function( $Root ) {
    
    const $Error = 3;
    const $TypeError = 3517;
    const $AttributeError = 3526;
    const $ParameterError = 3534;
    const $ReferenceError = 3536;
    const $ConnectionError = 3548;
    const $UnexpectedError = 3561;
    
    function Null()
    {
        return( null );
    }
    
    function Defined( args )
    {
        return( typeof args !== "undefined" );
    }
    
    function Undefined( args )
    {
        return( typeof args === "undefined" );
    }
    
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
    const $Type = function( params, object, handler, catcher )
    {
        var closure = {
            handler: () => typeof handler === "function" ? handler( params ) : true,
            catcher: () => typeof catcher === "function" ? catcher( params ) : false
        };
        
        if( typeof object === "function" )
        {
            return( $Type( params ) === object.name ? closure.handler() : closure.catcher() );
        } else {
            if( typeof object === "object" )
            {
                for( let i in object )
                {
                    if( $Type( params, object[i] ) )
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
     * Display error messages by error type or level.
     *
     * @params Number $type
     * @params Object $option
     */
    const $Except = function( type, option )
    {
        if( $Type( type, Number ) && $Type( option, [ String, Object ] ) )
        {
            switch( type )
            {
                case $Error:
                    break;
                case $TypeError:
                    if( option.on && option.name && option.type && option.vtype )
                    {
                        console.error( `${option.on}: The value of the ${option.type} ${option.name} must be of type ${option.vtype}, ${$Type( option.given )} given.` );
                    }
                    break;
                case $AttributeError:
                    if( option.on && option.name )
                    {
                        if( option.type )
                        {
                            console.error( `${option.on}: Attribute .${option.name} must be of type ${option.type}, ${$Type( option.given )} given.` );
                        } else {
                            if( option.value )
                            {
                                if( $Type( option.value, Array ) )
                                {
                                    option.value = option.value.join( "|" );
                                }
                                console.error( `${option.on}: The .${option.name} attribute must have a value of /${option.value}/, ${option.given} is given.` );
                            } else {
                                console.error( `${option.on}: The .${option.name} attribute is undefined or may be deleted.` );
                            }
                        }
                    }
                    break;
                case $ParameterError:
                    if( option.on && option.name )
                    {
                        if( option.type )
                        {
                            console.error( `${option.on}: The parameter ${option.name} must be of type ${option.type}, ${$Type( option.given )} given.` );
                        } else {
                            if( option.value )
                            {
                                if( $Type( option.value, Array ) )
                                {
                                    option.value = option.value.join( "|" );
                                }
                                console.error( `${option.on}: The ${option.name} parameter must have a value of /${option.value}/, ${option.given} is given.` );
                            } else {
                                console.error( `${option.on}: The ${option.name} parameter is undefined.` );
                            }
                        }
                    }
                    break;
                case $ReferenceError:
                    if( option.on && option.name && option.type )
                    {
                        console.error( `${option.on}: The ${option.type} reference ${option.name} is undefined.` );
                    }
                    break;
                case $ConnectionError:
                    break;
                case $UnexpectedError:
                    break;
                default:
                    break;
            }
            return;
        }
        $Except( $UnexpectedError, "" );
    };
    
    const $Theme = function( $args )
    {
        
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
        
        /*
         * Private access property.
         *
         * @values Object
         */
        const $self = {
            option: {
                path: true,
                domain: true,
                expires: true,
                samesite: true
            }
        };
        
        /*
         * Delete one or even more than one cookies.
         *
         * @params Array, Object
         *
         * @return Object, String
         */
        function del( params )
        {
            if( $Type( params, Array ) )
            {
                for( let i in params )
                {
                    params[i] = set( params[i] );
                }
                return( params );
            }
            if( $Type( params, Object ) )
            {
                if( $Type( params, Undefined ) )
                {
                    params.opt = {};
                }
                params.opt.expires = -1;
                
                return( set( params ) );
            }
        }
        
        /*
         * Take cookies based on the name of the cookie, or take all cookies.
         *
         * @params Array, String $params
         *
         * @return Object, String
         */
        function get( params )
        {
            var result = {};
            
            if( $Type( params, Array ) )
            {
                for( let i in params )
                {
                    result[i] = set( params[i] );
                }
                return( result );
            }
            if( $Type( params, String ) )
            {
                if( $Type( result = document.cookie.split( ";" ).find( r => r.startsWith( encodeURIComponent( params ) + "=" ) ) ) !== "Undefined" )
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
        }
        
        /*
         * Set one or more than one kuuki.
         *
         * @params Array, Object
         *
         * @return Object, String
         */
        function set( params )
        {
            
            var string = "";
            var result = {};
            
            if( $Type( params, Array ) )
            {
                for( let i in params )
                {
                    result[i] = set( params[i] );
                }
                return( result );
            }
            if( $Type( params, Object ) )
            {
                if( $Type( params.key, String ) )
                {
                    params.key = encodeURIComponent( params.key );//.replace( /%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent ).replace( /[\(\)]/g, escape );
                } else {
                    return( $Except( $AttributeError, {
                        on: "Cookie.set",
                        name: "key",
                        type: "String",
                        given: params.key
                    }));
                }
                if( $Type( params.val, String ) )
                {
                    params.val = encodeURIComponent( params.val );//.replace( /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent );
                } else {
                    params.val = "None";
                    params.opt.expires = -1;
                }
                if( $Type( params.opt, Object ) )
                {
                    if( $Type( params.opt.path, String ) )
                    {
                        if( params.opt.path === "" )
                        {
                            delete params.opt.path;
                        }
                    }
                    if( $Type( params.opt.domain, String ) )
                    {
                        if( params.opt.domain === "" )
                        {
                            delete params.opt.domain;
                        }
                    }
                    if( $Type( params.opt.expires, Number ) )
                    {
                        var dateTime = new Date();
                            dateTime.setMilliseconds( dateTime.getMilliseconds() + params.opt.expires * 864e+5 );
                        
                        params.opt.expires = dateTime.toUTCString();
                    } else {
                        delete params.opt.expires;
                    }
                    if( $Type( params.opt.samesite, String ) )
                    {
                        if( params.opt.samesite === "" )
                        {
                            delete params.opt.samesite;
                        }
                    }
                    for( let i in params.opt )
                    {
                        if( $Type( $self.option[i], Boolean ) )
                        {
                            string += "; " + i + "=" + params.opt[i];
                        }
                    }
                }
                return( document.cookie = params.key + "=" + params.val + string );
            }
        }
        
        return({
            res: {
                del: set( $args.del ),
                get: set( $args.get ),
                set: set( $args.set )
            },
            del: del,
            get: get,
            set: set
        });
        
    };
    
    /*
     * Element utility.
     *
     * Create one or more elements in one
     * parameter, you can also append elements.
     *
     * @version 1.0.4
     */
    const $Element = function( $args )
    {
        
        /*
         * Build single element HTML.
         *
         * @params Object $params
         *
         * @return HTMLElement
         */
        function create( el )
        {
            if( $Type( el.name, String ) )
            {
                
                // Create root element.
                var root = document.createElement( el.name );
                
                // If the element has no data.
                if( $Type( el.data, Undefined ) )
                {
                    el.data = {};
                }
                
                // Inject data.
                root.data = el.data;
                
                // If element has attribute.
                if( $Type( el.self, Object ) )
                {
                    for( let i in el.self )
                    {
                        switch( i )
                        {
                            case "data":
                            case "dataset":
                                if( $Type( el.self[i], Object ) )
                                {
                                    for( let d in el.self[i] )
                                    {
                                        root.dataset[d] = replace( el.self[i][d] );
                                    }
                                } else {
                                    $Except( $AttributeError, {
                                        on: "Element.create",
                                        name: i,
                                        type: "Object",
                                        given: el.self[i]
                                    });
                                }
                                break;
                            case "innerHTML":
                                if( $Type( el.self.innerHTML, Array ) )
                                {
                                    multiple( root, el.self.innerHTML );
                                } else {
                                    if( $Type( el.self.innerHTML, Object ) )
                                    {
                                        root.appendChild( create( el.self.innerHTML ) )
                                    } else {
                                        root.innerHTML = replace( el.self.innerHTML );
                                    }
                                    
                                }
                                break;
                            default:
                                if( $Type( el.self[i], String ) )
                                {
                                    el.self[i] = replace( el.self[i] );
                                }
                                root[i] = el.self[i];
                                break;
                        }
                    }
                }
                
                return( root );
            } else {
                return( $Except( $AttributeError, {
                    on: "Element.create",
                    name: "name",
                    type: "String",
                    given: el.name
                }));
            }
        }
        
        /*
         * Build or add more than one HTML element to root.
         *
         * @params HTMLElement, Array $root
         * @params Array $params
         *
         * @return Array
         */
        function multiple( root, els )
        {
            if( $Type( els, Array ) )
            {
                for( let i in els )
                {
                    root.appendChild( create( els[i] ) )
                }
                return( root );
            }
            if( $Type( root, Array ) )
            {
                return( multiple( {}, root ) );
            }
            for( let i in els )
            {
                els[i] = single( els[i] );
            }
            return( els );
        }
        
        /*
         * Replace sensitive characters.
         *
         * @params String $string
         *
         * @return String
         */
        function replace( string )
        {
            return(
                String( string )
                .replace( /\&/g, "&amp;" )
                .replace( /\</g, "&#60;" )
                .replace( /\>/g, "&#62;" )
                .replace( /\"/g, "&#34;" )
                .replace( /\'/g, "&#39;" )
            );
        }
        
        if( $Type( $args, Array ) )
        {
            if( $Type( $args[1], Array ) )
            {
                return( multiple( $args[0], $args[1] ) );
            }
            return( multiple( $args ) );
        }
        if( $Type( $args, Object ) )
        {
            return( create( $args ) );
        }
        
        return({
            create: create,
            multiple: multiple
        });
        
    };
    
    const $HTTPRoute = {};
    
    /*
     * HTTPRouter utility.
     *
     * ....
     *
     * @version 1.0.0
     */
    const $HTTPRouter = function( $args = {} )
    {
        
        /*
         * Private access property.
         *
         * @values Object
         */
        const $self = {
            title: null,
            route: {
                path: null,
                root: location.origin
            },
            routes: [],
            config: {
                mode: "history"
            },
            view: {
                parent: {
                    name: "div",
                    self: {
                        id: "router-view",
                        dataset: {
                            self: "router-view"
                        },
                        className: "router-view"
                    }
                },
                child: null
            }
        };
        
        /*
         * Create new router link.
         *
         * @params String $path
         * @params Object $query
         * @params Array, Object, String innerHTML
         *
         * @return Object
         */
        function link( path, query, innerHTML )
        {
            return({
                name: "a",
                self: {
                    href: path,
                    onclick: onclick,
                    className: active( path ),
                    innerHTML: innerHTML
                }
            });
        }
        
        /*
         * Create view for router.
         *
         * @return Object
         */
        function view( args )
        {
            if( $self.routes.length !== 0 )
            {
                if( $self.config.mode === "history" )
                {
                    for( let i in $self.routes )
                    {
                        var route = $self.routes[i];
                    }
                } else {
                    
                }
            } else {
                $Except();
            }
        }
        
        function regexp( route )
        {
            
            if( route.path.length > 1 && route.path[route.path.length-1] === "/" )
            {
                route.path = route.path.slice( 0, -1 );
            }
            
            var regex = /\:([a-zA-Z0-9\-\_]+)|\(.*?\)/g;
            
            var capture = "";
            var results = [];
            var segment = {};
            
            var pattern = route.path.replace( regex, function( m, c )
            {
                if( $Type( route.where, Object ) )
                {
                    if( $Type( route.where[c], String ) )
                    {
                        return( segment[( c = c.replace( /\-/g, "" ) )] = "("+route.where[c]+")" );
                    }
                }
                return( segment[( c = c.replace( /\-/g, "" ) )] = "([a-zA-Z0-9\-\_]+)" );
            });
            
            if( pattern !== route.path )
            {
                var regexp = new RegExp( pattern, "g" ), matched;
                
                while( matched = regexp.exec( location.pathname ) )
                {
                    var i = 0;
                    
                    for( let s in segment )
                    {
                        i++;
                        
                        capture += "/";
                        capture += segment[s] = results[( results.push( matched[i] ) -1 )];
                    }
                }
            } else {
                capture = route.path;
            }
            
            if( capture === location.pathname )
            {
                return({});
            }
            
        }
        
        /*
         * ....
         *
         * @params Object $e
         *
         * @return Void
         */
        function onclick( e )
        {
            if( $Type( this.href, String ) )
            {
                // ....
                history.pushState( null, null, this.href.replace( $self.route.root, "" ) );
            } else {
                $Except( $AttributeError, {
                    on: "Router.link",
                    name: "path",
                    type: "String",
                    given: path
                });
            }
            e.preventDefault();
        }
        
        /*
         * Router get active class.
         *
         * @params String $path
         *
         * @return String
         */
        function active( path )
        {
            if( location.pathname === path.replace( $self.route.root, "" ) )
            {
                return( "router-link router-active" );
            }
            return( "router-link" );
        }
        
        //; Arguments handler.
        if( $Type( $args, Object ) )
        {
            //; Argument:mode handler.
            if( $Type( $args.mode, String ) )
            {
                if( $args.mode === "history" || $args.mode === "hash" )
                {
                    $self.mode = $args.mode;
                } else {
                    $Except( $AttributeError, {
                        on: "Router",
                        name: "mode",
                        value: [
                            "history",
                            "hash"
                        ],
                        given: $args.mode
                    });
                }
            }
            //; Argument:title handler.
            if( $Type( $args.title, String ) )
            {
                $self.title = $args.title;
            } else {
                if( $Type( document.title, String ) )
                {
                    $self.title = document.title;
                }
            }
            //; Argument:routes handler.
            if( $Type( $args.routes, Array ) )
            {
                $self.routes = $args.routes;
            } else {
                $Except( $AttributeError, {
                    on: "Router",
                    name: "routes",
                    type: "Array",
                    given: $args.routes
                });
            }
        }
        
        /*
         * @visit https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
         * @visit https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
         *
         */
        window.addEventListener( "popstate", function( e )
        {
            
        });
        
        return({
            link: link,
            view: view
        });
        
    };
    
    if( $Type( $Root, String ) )
    {
        if( $Root[0] !== "#" )
        {
            return( $Except( $ParameterError, {
                on: "Window",
                name: "$Root",
                value: [
                    "Object",
                    "String"
                ],
                given: $Root
            }));
        }
        if( $Type( $Root = document.getElementById( $Root.substr( 1 ) ), Null ) )
        {
            return( $Except( $ReferenceError, {
                 on: "Window",
                 name: "by id",
                 type: "HTMLElement"
            }));
        }
    }
    
    /*
     * @visit https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * @visit https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
     *
     */
    window.addEventListener( "load", function( e )
    {
        
        // Create new HTTPRouter instance.
        const $Router = new $HTTPRouter({
            
            title: "hxAri",
            
            /*
             * List of all defined route paths.
             *
             * @values Array
             */
            routes: [
                {
                    path: "/",
                    model: {}
                },
                {
                    path: "/:test/:case/",
                    where: {
                        test: "[r-u]+",
                        case: "[c-t]+"
                    },
                    model: {
                        data: {
                            username: null
                        },
                        instance: function()
                        {
                            alert( JSON.stringify( arguments ) );
                        },
                        template: function()
                        {
                            
                        }
                    },
                    guards: {
                        
                        /*
                         * Before Enter
                         *
                         * Called before the route that renders
                         * this component is confirmed.
                         *
                         * @params 
                         * @params 
                         *
                         * @return
                         */
                        enter: function()
                        {
                        },
                        
                        /*
                         * Before Leave
                         *
                         * Called when the route that renders
                         * this component is about to be navigated away from.
                         * 
                         * @params 
                         * @params 
                         *
                         * @return Boolean
                         */
                        leave: function()
                        {
                        },
                        
                        /*
                         * Before Update
                         *
                         * Called when the route that renders
                         * this component has changed.
                         *
                         * @params 
                         * @params 
                         *
                         * @return
                         */
                        update: function()
                        {
                        }
                        
                    }
                }
            ],
            
            /*
             * Route guard navigation.
             *
             * @values Object
             */
            guards: {
                each: {
                    after: function( to, from )
                    {
                        
                    },
                    before: function( to, from )
                    {
                        
                    }
                },
                resolve: function( to, from )
                {
                    
                }
            }
            
        });
        
        $Root.appendChild( $Element({
            name: "p",
            self: {
                innerHTML: "Oops! Sorry, the website is currently under development."
            }
        }));
        
    });
    
}( document.getElementById( "root" ) ));
