
component.home.info = {
  template: `
    <div>
      <div class="about single">
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
    </div>
  `
};

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
    valid: function() {
      
      var data = new FormData();
      
      for( let i in this.form ) {
        if( this.form[i] === null ) {
          this.alerts.danger.push( `${i.capitalize()} can't be empty!` );
        } else {
          data.append( i, this.form[i] );
        }
      }
      return( data );
    },
    submit: function( e ) {
      
      var x = this;
        x.alerts.danger = [];
        x.alerts.success = null;
      
      var data = this.valid();
      
      if( this.alerts.danger.length === 0 ) {
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
      e.preventDefault();
    }
  },
  components: {
    Trigger: trigger
  },
  template: `
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
                  <input v-model="form.name" data-label="name" class="input name" type="text" name="name" />
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
            <div v-if="alerts.danger.length" class="float-right dp-flex flex-right">
              <div class="dp-block">
                <Trigger v-for="i in alerts.danger" :keys="i" level="danger" :string="i" />
              </div>
            </div>
            <Trigger v-if="( alerts.success !== null )" level="success" :float="true" :string="alerts.success" />
          </div>
          
        </div>
      </div>
    </div>
  `
};


component.home.skill = {
  template: `
    <div class="skill">
      Skill
    </div>
  `
};


component.home.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "Home" );
      }
    }
  },
  components: {
    Theme: theme,
    Writer: writer,
    HomeInfo: component.home.info,
    HomeContact: component.home.contact,
    HomeProject: component.home.project
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
      
      <div class="banner">
        <div class="album"></div>
        <div class="cover"></div>
      </div>
      
      <HomeInfo />
      
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
            <HomeProject />
          </div>
        </div>
      </div>
      
      <div class="contact">
        <HomeContact />
      </div>
      
    </div>
  `
};


component.about.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "About" );
      }
    }
  },
  template: `
    <div class="about bg-c-02 pd-8">
      <div class="section">
        <div class="single">
          <h1 class="title mg-bottom-20">About Page</h1>
          <p class="mg-bottom-20">
            <router-link to="/">hxAri</router-link></h1> is a Personal Blog Platform.
            Here I will only provide you with interesting content, I hope you like it very much.
            I am dedicated to providing you with the best content, focusing on the Documentation of every Project I create, so that it can be used by all without a doubt.
            I'm working on changing my Personal Blog to become a more rapidly growing and well-known website.
            I hope you like my Personal Blog as well as any Documentation or Projects I create, as much as I offer them to you.
          </p>
          <p class=""> Thank you for visiting my Personal Blog 😄 </p>
          <p class=""> <router-link to="/contact">Contact</router-link> me to create a new project 🙃 </p>
          <p class=""> Have a nice days 😉 </p>
        </div>
      </div>
    </div>
  `
};

component.privacy.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "Privacy" );
      }
    }
  },
  template: `
    <div class="privacy bg-c-02 pd-8">
      <div class="section">
        <div class="single">
          <h1 class="title mg-bottom-20">Privacy Policy</h1>
          <p class="fs-14 mg-bottom-16">
            At <router-link to="/">hxAri</router-link>, accessible from <router-link to="/">https://hxari.github.io</router-link>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by <router-link to="/">hxAri</router-link> and how we use it.
          </p>
          <p class="fs-14 mg-bottom-16">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
          <h1 class="title mg-bottom-20">Log Files</h1>
          <p class="fs-14 mg-bottom-16">
            <router-link to="/">hxAri</router-link> follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator.
          </p>
          <h1 class="title mg-bottom-20">Cookies and Web Beacons</h1>
          <p class="fs-14 mg-bottom-16">
            Like any other website, <router-link to="/">hxAri</router-link> uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
          <p class="fs-14 mg-bottom-16">
            For more general information on cookies, please read "Cookies" article from the Privacy Policy Generator.
          </p>
          <h1 class="title mg-bottom-20">Privacy Policies</h1>
          <p class="fs-14 mg-bottom-16">
            You may consult this list to find the Privacy Policy for each of the advertising partners of <router-link to="/">hxAri</router-link>.
          </p>
          <p class="fs-14 mg-bottom-16">
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on <router-link to="/">hxAri</router-link>, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p class="fs-14 mg-bottom-16">
            Note that <router-link to="/">hxAri</router-link> has no access to or control over these cookies that are used by third-party advertisers.
          </p>
          <h1 class="title mg-bottom-20">Third Party Privacy Policies</h1>
          <p class="fs-14 mg-bottom-16">
            <router-link to="/">hxAri's</router-link> Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p class="fs-14 mg-bottom-16">
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?
          </p>
          <h1 class="title mg-bottom-20">Children's Information</h1>
          <p class="fs-14 mg-bottom-16">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p class="fs-14 mg-bottom-16">
            <router-link to="/">hxAri</router-link> does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
          <h1 class="title mg-bottom-20">Online Privacy Policy Only</h1>
          <p class="fs-14 mg-bottom-16">
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in <router-link to="/">hxAri</router-link>. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>
          <h1 class="title mg-bottom-20">Consent</h1>
          <p class="fs-14 mg-bottom-16">
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  `
};

component.contact.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "Contact" );
      }
    }
  },
  components: {
    Contact: component.home.contact
  },
  template: `
    <div class="contact bg-c-01 pd-top-8 pd-bottom-32">
      <Contact />
    </div>
  `
};

component.sitemap.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "Sitemap" );
      }
    }
  },
  template: `
    <div class="sitemap">
      Sitemap
    </div>
  `
};


component.yume.index = {
  watch: {
    title: {
      immediate: true,
      handler: function() {
        Title.set( "Yume" );
      }
    }
  },
  template: `
    <div class="yume">
      Yume
    </div>
  `
};


component.syntax.index = {
  template: `
    <div class="syntax">
      Syntax
    </div>
  `
};


component.phptree.index = {
  template: `
    <div class="phptree">
      PHPTree
    </div>
  `
};
