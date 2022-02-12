
/*
 * Project Section.
 *
 */
component.home.project = {
  data: function() {
    return {
      display: false,
      project: false,
      projects: false
    };
  },
  mounted: function() {
    this.projects = self.projects
  },
  methods: {
    image: function( src ) {
      return image( src );
    },
    imageLang: function( lang ) {
      return imageLang( lang );
    },
    shortText: function( text ) {
      return shortText( text, 12, 12 );
    },
    slideOn: function( project ) {
      this.display = true;
      this.project = project;
    },
    slideOff: function() {
      this.display = false;
      this.project = false;
    }
  },
  components: {
    Card: card,
    SlideTop: slide.top
  },
  template: `
    <div class="mg-top-32">
      <Card v-for="i in projects" :keys="i" class="card bg-c-02 mg-right-14 mg-bottom-14 dp-inline-block rd-square">
        <template v-slot:content>
          <div @click="slideOn( i )">
            <img class="card-image" :src="image( i.icon.src )" :alt="i.icon.alt" />
            <div class="card-cover"></div>
            <div class="card-lang rd-circle">
              <img class="card-image" :src="imageLang( i.language )" :alt="i.language + ' Avatar'" />
              <div class="card-cover"></div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="card-footer">
            <h5 class="card-title"><span class="author">{{ i.app.repos.author }}</span>/{{ shortText( i.app.name) }}</h5>
            <div class="detail">
              Xxx
            </div>
          </div>
        </template>
      </Card>
      <SlideTop v-if="display" @slide-close="( slideOff() )" slide="up" level="slide-cover" show="slide-show">
        <template v-slot:header>
          <h4 class="title">{{ project.app.name }}</h4>
        </template>
        <template v-slot:default>
          <div class="pd-12 text fs-14 mg-bottom-14 mg-lc-bottom bg-c-03 rd-square">
            {{ project.app.about }}
          </div>
          <div class="pd-12 fn-14 mg-bottom-14 mg-lc-bottom bg-c-03 rd-square">
            <p class="text fs-14">Want to visit the documentation page?</p>
            <router-link :to="{ path: project.app.route.path }">
              https://hxari.github.io/{{ project.app.route.path }}
            </router-link>
          </div>
          <div class="pd-12 fn-14 mg-bottom-14 mg-lc-bottom bg-c-03 rd-square">
            <p class="text fs-14">Or want to visit the github repository?</p>
            <a :href="'https://github.com/hxAri/' + project.app.repos.target">
              https://github.com/hxAri/{{ project.app.repos.target }}
            </a>
          </div>
        </template>
      </SlideTop>
    </div>
  `
};

/*
 * Contact Section.
 *
 */
component.home.contact = {
  data: function() {
    return {
      action: "https://formspree.io/f/xoqrezbv",
      alerts: {
        danger: [],
        success: null
      },
      form: {
        name: null,
        email: null,
        subject: null,
        message: null
      },
      data: null
    };
  },
  mounted: function() {
  },
  methods: {
    submit: function( e ) {
      
      var x = this;
      
      var data = new FormData();
        data.append( "name", this.form.name );
        data.append( "email", this.form.email );
        data.append( "subject", this.form.subject );
        data.append( "message", this.form.message );
      
      fetch( this.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      })
      .then( r => {
        if( r.ok ) {
          for( let name in x.form ) {
            x.form[name] = null;
          }
          x.alerts.success = "Thanks for your submission!";
        } else {
          r.json().then( data => {
            if( Object.hasOwn( data, "errors" ) ) {
              x.alerts.danger.push( data["errors"].map( e => e["message"] ).join( ", " ) );
            } else {
              x.alerts.danger.push( "Oops! There was a problem submitting your form." );
            }
          });
        }
      })
      .catch( e => {
        x.alerts.danger.push( "Oops! There was a problem submitting your form." );
      });
      e.preventDefault();
    }
  },
  components: {
    Trigger: trigger
  },
  template: `
    <div class="contact">
      <div class="section">
        <div class="single">
          <h1 class="title">Contact Me</h1>
          <div class="detail mg-top-32 dp-flex">
            
            <div class="info">
              <div class="center dp-flex flex-center">
                <div class="dp-block">
                  <div class="group dp-flex flex-left mg-bottom-16">
                    <div class="icon mg-right-10">
                      <i class="bx bx-map fs-30"></i>
                    </div>
                    <div class="text">
                      Indonesian, Lampung, Pringsewu Regency, Sukoharjo Sub-District, Sukoharjo II
                    </div>
                  </div>
                  <div class="group dp-flex flex-left mg-bottom-16">
                    <div class="icon mg-right-10">
                      <i class="bx bxl-whatsapp fs-30"></i>
                    </div>
                    <div class="text">
                      +62 8583 9211 030
                    </div>
                  </div>
                  <div class="group dp-flex flex-left mg-bottom-16">
                    <div class="icon mg-right-10">
                      <i class="bx bx-send fs-30"></i>
                    </div>
                    <div class="text">
                      ari160824@gmail.com
                    </div>
                  </div>
                  <div class="group dp-flex flex-left">
                    <div class="icon mg-right-10">
                      <i class="bx bx-world fs-30"></i>
                    </div>
                    <div class="text">
                      https://hxari.github.io/
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form pd-14">
              <form method="POST" @submit="submit">
                <div class="double dp-flex">
                  <div class="group mg-right-14">
                    <label class="label">Name</label>
                    <input v-model="form.name" data-label="name" class="input" type="text" name="name" />
                  </div>
                  <div class="group">
                    <label class="label">Subject</label>
                    <input v-model="form.subject" data-label="subject" class="input" type="text" name="subject" />
                  </div>
                </div>
                <div class="group">
                  <label class="label">Email Address</label>
                  <input v-model="form.email" data-label="email" class="input" type="email" name="email" />
                </div>
                <div class="group">
                  <label class="label">Your Message</label>
                  <textarea v-model="form.message" data-label="message" class="textarea" name="message"></textarea>
                </div>
                <div class="group mg-top-14">
                  <button class="submit">Send Message</button>
                </div>
              </form>
              <div v-if="alerts.danger.length" v-for="i in alerts.danger" :keys="i">
                <Trigger level="danger" :string="i" class="mg-bottom-14 mg-lc-bottom" />
              </div>
              <Trigger v-if="( alerts.success !== null )" level="success" :string="alerts.success" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  `
};

/*
 * Skill Section.
 *
 */
component.home.skill = {
  template: `
    <div class="skill">
      Skill
    </div>
  `
};

/*
 * Portofolio Page.
 *
 */
component.home.index = {
  data: function() {
    return {
    };
  },
  components: {
    Theme: theme,
    Avatar: avatar,
    Writer: writer,
    Contact: component.home.contact,
    Project: component.home.project
  },
  template: `
    <div class="home">
      <div class="header">
        <div class="header-banner">
          <h6 class="header-title">
            <a href="https://hxari.github.io">hxAri</a>
          </h6>
          <Theme class="mg-left-14" />
        </div>
      </div>
      <div class="header-br"></div>
      <div class="banner"></div>
      
      <div class="about single">
        <div class="profile dp-flex flex-center">
          <div class="picture">
            <img class="image" src="/dist/img/banner/5ee9dTsih3ojM.png" alt="hxAri Picture" />
          </div>
        </div>
        <div class="self dp-flex flex-center">
          
          <div class="info">
            <p class="fname">Ari Setiawan</p>
            <p class="xyzjs">Junior Backend Web Develeoper</p>
            <p class="text mg-bottom-32">
              Just a Programmer from Indonesian 😉
            </p>
            <div class="group dp-flex mg-bottom-16">
              <div class="icon pd-right-10 mg-right-10">
                <i class="bx bx-calendar fs-30"></i>
              </div>
              <div class="text">
                16st August 2004
              </div>
            </div>
            <div class="group dp-flex mg-bottom-16">
              <div class="icon pd-right-10 mg-right-10">
                <i class="bx bxl-whatsapp fs-30"></i>
              </div>
              <div class="text">
                +62 8583 9211 030
              </div>
            </div>
            <div class="group dp-flex mg-bottom-16">
              <div class="icon pd-right-10 mg-right-10">
                <i class="bx bx-send fs-30"></i>
              </div>
              <div class="text">
                ari160824@gmail.com
              </div>
            </div>
            <div class="group dp-flex">
              <div class="icon pd-right-10 mg-right-10">
                <i class="bx bxs-map fs-30"></i>
              </div>
              <div class="text">
                Indonesian, Lampung, Pringsewu.
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <div class="section">
        <div class="single">
          <h1 class="title">About Me</h1>
          <div class="paragraph text">
            Hello, I'm Ari Setiawan, I'm a Programmer from Indonesian. I'm currently undergoing a Software Engineering vocational high school. I usually work on my own projects but I can also work with a team. And I'm also a quiet person 😐
          </div>
        </div>
      </div>
      
      <div class="projects">
        <div class="section">
          <div class="single">
            <h1 class="title">My Projects</h1>
            <div class="paragraph text">
              Some of the projects I've made and some I'm currently working on, you can try them out if you're curious 🌟
            </div>
            <Project />
          </div>
        </div>
      </div>
      
      <Contact />
      
    </div>
  `
};

/*

*/

/*
 * Yume Documentations.
 *
 */
component.yume.index = {
  template: `
    <div class="yume">
      Yume
    </div>
  `
};

/*
 * Syntax Documentations Page.
 *
 */
component.syntax.index = {
  template: `
    <div class="syntax">
      Syntax
    </div>
  `
};

/*
 * PHPTree Documentations Page.
 *
 */
component.phptree.index = {
  template: `
    <div class="phptree">
      PHPTree
    </div>
  `
};
