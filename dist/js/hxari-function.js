
function shortText( text, rem, max ) {
  if( text.length > max ) {
    text = text.substr( 0, rem );
    text += "...";
  }
  return text;
}

function image( path ) {
  return `https://raw.githubusercontent.com/hxAri/hxAri.github.io/main/dist/img/${path}`;
}

function imageLang( lang ) {
  switch( lang ) {
    case "PHP":
      lang = "language/a5Erelw.1WTyY.png"; break;
    case "Java":
      lang = "language/bbHVlJ3Eo8RXo.png"; break;
    case "Python":
      lang = "language/d7HR9yGedMoC2.png"; break;
    case "JavaScript":
      lang = "language/5eP.zAQHRKTkM.png"; break;
  }
  return image( lang );
}

var self = Object.create({
  author: "hxAri",
  profile: {
    name: "Ari Setiawan",
    face: "https://avatars.githubusercontent.com/u/90847846?v=4",
    info: {
      alias: "hxAri",
      about: "Just a Programmer from Indonesian.",
      motto: "Everybody Needs A Programmer."
    }
  },
  projects: [
    {
      app: {
        name: "Yume",
        about: "Yume is a very simple PHP framework.\n\nThis framework is not used to undermine or compete with existing frameworks. Just for fun ><",
        route: {
          path: "Yume",
          inner: "View project"
        },
        repos: {
          author: "hxAri",
          target: "Yume"
        }
      },
      icon: {
        alt: "Yume Avatar",
        src: "avatar/2fM7JQH-BeImw.png",
        author: []
      },
      version: "1.0.1",
      language: "PHP"
    },
    {
      app: {
        name: "Syntax",
        about: "This project has been temporarily archived.",
        route: {
          path: "Syntax",
          inner: "View project"
        },
        repos: {
          author: "hxAri",
          target: "Syntax"
        }
      },
      icon: {
        alt: "Syntax Avatar",
        src: "avatar/6dOFxNDTRMAAk.png",
        author: []
      },
      version: null,
      language: "JavaScript"
    },
    {
      app: {
        name: "PHPTree",
        about: "Build tree structure like in Command Line Interface with Array. You want to create a tree structure like in the Command Line Interface? Sans!... PHPTree is the solution!.. It's really very simple and without the hassle!",
        route: {
          path: "PHPTree",
          inner: "View project"
        },
        repos: {
          author: "hxAri",
          target: "PHPTree"
        }
      },
      icon: {
        alt: "PHPTree Avatar",
        src: "avatar/31sJ3mJPD9xDc.png",
        author: []
      },
      version: "1.0.1",
      language: "PHP"
    }
  ]
});

var component = [];
  component.home = [];
  component.yume = [];
  component.syntax = [];
  component.phptree = [];

var Document = Object.create({
  doc: document.documentElement,
  get: function( data ) {
    return( this.doc.dataset[data] );
  },
  set: function( data, value ) {
    return( this.doc.dataset[data] = value );
  }
});

var Theme = function() {
  
  var c = Cookies.get( "theme" );
  var d = Document.get( "theme" );
  
  var o = Object.create({
    get: function( mode ) {
      if( typeof c !== "undefined" ) {
        return( c );
      } else {
        if( typeof d !== "undefined" ) {
          return( d );
        }
        return "light";
      }
    },
    set: function( mode ) {
      
      // Meta Set
      
      // Cookie Set
      Cookies.set( "theme", mode );
      
      // Document Set
      Document.set( "theme", mode );
    }
  });
  
  if( typeof c !== "undefined" ) {
    
    // Theme Set
    o.set( c );
  } else {
    if( d !== "undefined" ) {
      
      // Theme Set
      o.set( d );
    }
  }
  
  return( o );
};
