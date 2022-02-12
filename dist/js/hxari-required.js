
/*
 * Slide animation component.
 *
 */
var slide = [];
  slide.top = {
    props: [
      "slide",
      "level",
      "show"
    ],
    template: `
      <div class="template">
        <div class="slide-area">
          <div class="slide-up">
            <div v-if="( slide === 'up' )" :class="level">
              <div class="slide-close" @click="$emit( 'slide-close' )"></div>
              <div class="slide-show" :id="show">
                <div class="slide-wrapper">
                  <div class="slide-header">
                    <div class="slide-header-banner flex flex-center">
                      <slot name="header" />
                    </div>
                  </div>
                  <hr class="slide-barrier" />
                  <div class="slide-header-barrier"></div>
                  <div class="slide-content">
                    <slot />
                  </div>
                  <div class="slide-footer">
                    <slot name="footer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  };

/*
 * Swiperjs animation component.
 *
 * =====================================
 */
var swiper = [];
  swiper.slideAble = {
    data: function() {
      return {
        slider: null,
        swiper: null,
        option: {
          slidesPerView: "auto",
          initialSlide: 1,
          resistanceRatio: 0,
          slideToClickedSlide: true
        }
      }
    },
    mounted: function() {
      this.swiper = new Swiper( this.$refs.swiper, this.option );
    },
    methods: {
      slideChangeTransitionStart: function () {
        
        var slider = this;
        
        if( slider.activeIndex === 0 ) {
          // menuButton.classList.add('cross');
          // required because of slideToClickedSlide
          // menuButton.removeEventListener('click', openMenu, true);
        } else {
          // menuButton.classList.remove('cross');
        }
      },
      slideChangeTransitionEnd: function () {
        
        var slider = this;
        
        if( slider.activeIndex === 1 ) {
          // menuButton.addEventListener('click', openMenu, true);
        }
      }
    },
    template: `
      <div class="swiper">
        <!-- Slider main container -->
        <div class="swiper-slideable" ref="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slide Menu Value -->
            <div class="swiper-slide menu">
              <slot name="menu"></slot>
            </div>
            <!-- Slide Content Value -->
            <div class="swiper-slide content">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
    `
  };
  swiper.slideCustom = {
    data: function() {
      return {
        slider: null,
        swiper: null
      };
    },
    props: [
      "options"
    ],
    mounted: function() {
      this.swiper = new Swiper( this.$refs.swiper, this.options );
    },
    methods: {
      next: function() {
        this.slider.slideNext();
      }
    },
    template: `
      <div class="swiper">
        <!-- Slider main container -->
        <div class="swiper-container" ref="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <slot name="slide"></slot>
          </div>
        </div>
        <slot name="custom"></slot>
      </div>
    `
  };

/*
 * Trigger component.
 *
 * =====================================
 */
var trigger = {
  data: function() {
    return {
      value: "trigger @level pd-14 pd-top-10 pd-bottom-10 mg-top-14 rd-square @close"
    };
  },
  props: [
    "level",
    "string"
  ],
  mounted: function() {
    this.value = this.value.replace( /\@level/i, this.level );
  },
  methods: {
    close: function() {
      this.value += this.value.replace( /\@close/i, "dp-none" );
    }
  },
  template: `
    <div :class="value">
      <span class="text">{{ string }}</span>
      <button @click="close" class="button close pd-0 fs-20">
        <i class="bx bx-x"></i>
      </button>
    </div>
  `
};

/*
 * Theme Switch component.
 *
 * =====================================
 */
var theme = {
  data: function() {
    return {
      theme: null,
      check: false
    };
  },
  mounted: function() {
    
    this.theme = new Theme();
    
    if( this.theme.get() === "dark" ) {
      this.check = true;
    }
  },
  methods: {
    handler: function( e ) {
      if( e.target.checked ) {
        var theme = "dark"; this.check = true;
      } else {
        var theme = "light"; this.check = false;
      }
      this.theme.set( theme );
    }
  },
  template: `
    <label class="theme switch">
      <input class="checkbox theme" @click="handler" :checked="check" type="checkbox" />
      <span class="rounded bx"></span>
    </label>
  `
};

/*
 * Typewriter animation component.
 *
 * =====================================
 */
var writer = {
  data: function() {
    return {
      timer: null,
      paper: "",
    };
  },
  props: [
    "text"
  ],
  watch: {
    paper: function() {
      if( this.paper.length === this.text.length ) {
        this.paper = "";
      }
    }
  },
  mounted: function() {
    this.printer();
  },
  methods: {
    printer: function() {
      this.stoper();
      let i = 0;
      var x = this;
      this.timer = setInterval(
        function() {
          x.paper += x.text[i++%x.text.length];
        },
        250 - ( Math.random() * 50 )
      );
    },
    stoper: function() {
      clearInterval( this.timer );
      this.paper = "";
    }
  },
  template: `<span class="writer" v-html="paper"></span>`
};

/*
 * Avatar Icon
 *
 * =====================================
 */
var avatar = {
  props: [
    "src",
    "alt"
  ],
  template: `
    <div class="avatar rd-circle">
      <img class="avatar-image rd-circle" :src="src" :alt="alt" />
      <div class="avatar-cover rd-circle"></div>
    </div>
  `
};

/*
 * Avatar Icon
 *
 * =====================================
 */
var card = {
  template: `
    <div class="area">
      <slot name="header"></slot>
      <div class="card-content">
        <slot name="content"></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  `
};

var iloop = {
  props: [
    "ul",
    "li",
    "vl"
  ],
  data: function() {
    return {
      middle: {
        point: "<b>····</b> "
      }
    };
  },
  computed: {
    view() {
      return this.temp( this.ul, this.loop( this.vl ) );
    }
  },
  methods: {
    link: function( rf, ir ) {
      return `<a href="${rf}">${ir}</a>`;
    },
    list: function( vi ) {
      return `<li class="${this.li}">${this.middle.point}${vi}</li>`;
    },
    span: function( vi ) {
      return `<span class="li-title">${vi}</span>`;
    },
    temp: function( ul, ls ) {
      return {
        template: `<ul class="${ul}">${ls}</ul>`
      };
    },
    href: function( rf, al ) {
      return `<img class="li-image" src="https://raw.githubusercontent.com/hxAri/hxAri.github.io/main/dist/img/${rf}" alt="${al}" /> `;
    },
    loop: function( vl ) {
      
      var result = "";
      
      for( let i in vl ) {
        if( typeof
          vl[i].img !== "undefined" ) {
          vl[i].img = this.href( vl[i].img, vl[i].alt );
          vl[i].inner = this.span( vl[i].inner );
          vl[i].inner = vl[i].img + vl[i].inner;
        } else {
          if( typeof
            vl[i].href !== "undefined" ) {
            vl[i].inner = this.link( vl[i].href, vl[i].inner );
          } else {
            vl[i].inner = this.span( vl[i].inner );
          }
        }
        if( typeof
          vl[i].childs !== "undefined" ) {
          vl[i].inner += this.loop( vl[i].childs );
        }
        result += this.list( vl[i].inner );
      }
      return result;
    }
  },
  template: `<component :is="view"></component>`
};

var rloop = {
  props: [
    "ul",
    "li",
    "vl"
  ],
  data: function() {
    return {
      middle: {
        point: "···· "
      },
      back: {
        slash: "<span class=\"hx-l\">\\</span>"
      }
    };
  },
  computed: {
    view() {
      return this.temp( this.ul, this.loop( this.vl ) );
    }
  },
  methods: {
    list: function( vi ) {
      return `<li class="${this.li}">${vi}</li>`;
    },
    temp: function( ul, ls ) {
      return {
        template: `<ul class="${ul}">${ls}</ul>`
      };
    },
    hexa: function( vi ) {
      return `<span class="hx-l">${vi}</span>`;
    },
    span: function( vi ) {
      return `<span class="li-title">${vi}</span>`;
    },
    link: function( lk, ir ) {
      return `<router-link to="${lk}">${ir}</router-link>`;
    },
    loop: function( vl, pr = "" ) {
      
      var result = "";
      
      for( let i in vl ) {
        if( typeof
          vl[i].target !== "undefined" ) {
          vl[i].inner = this.hexa( this.middle.point ) + this.link( pr + "/" + vl[i].target, vl[i].inner );
        } else {
          vl[i].inner = this.middle.point + this.span( vl[i].inner );
        }
        if( typeof
          vl[i].childs !== "undefined" ) {
          vl[i].inner += this.loop( vl[i].childs, pr + ( typeof vl[i].target !== "undefined"? "/" + vl[i].target : "" ) );
        }
        result += this.list( vl[i].inner );
      }
      return result;
    }
  },
  template: `<component :is="view"></component>`
};
