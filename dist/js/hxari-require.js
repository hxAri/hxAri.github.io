
const avatar = {
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

const card = {
    props: [
        "alt",
        "img",
        "link",
        "text",
        "title"
    ],
    template: `
        <div class="area">
            <div class="card-content flex flex-center">
                <img class="card-image" :src="img" :alt="alt" />
                <div class="card-cover"></div>
            </div>
            <div class="card-footer">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">
                    <router-link :to="{ path: link }">{{ text }}</router-link>
                </p>
            </div>
        </div>
    `
};

const iloop = {
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

const rloop = {
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

const intro = {
    data: function() {
        return {
            skills: [
                {
                    img: "skill/a8ci.cq6U3T.Q.png",
                    alt: "Coding Logo",
                    inner: "Coding",
                    childs: [
                        {
                            img: "language/a5Erelw.1WTyY.png",
                            alt: "Php Logo",
                            inner: "Php",
                            childs: [
                                {
                                    img: "framework/9eSMBN6wiuM.I.jpg",
                                    alt: "Laravel Logo",
                                    inner: "Laravel"
                                }
                            ]
                        },
                        {
                            img: "language/bbHVlJ3Eo8RXo.png",
                            alt: "Java Logo",
                            inner: "Java"
                        },
                        {
                            img: "language/d7HR9yGedMoC2.png",
                            alt: "Python Logo",
                            inner: "Python",
                            childs: [
                                {
                                    img: "framework/c3KJbv1ckwtNc.png",
                                    alt: "Flask Logo",
                                    inner: "Flask"
                                },
                                {
                                    img: "framework/93b1SeJX4QEvY.png",
                                    alt: "Django Logo",
                                    inner: "Django"
                                }
                            ]
                        },
                        {
                            img: "language/5eP.zAQHRKTkM.png",
                            alt: "JavaScript Logo",
                            inner: "JavaScript",
                            childs: [
                                {
                                    img: "framework/ddcCMfsMyEjs..png",
                                    alt: "Vue Logo",
                                    inner: "Vue"
                                },
                                {
                                    img: "framework/17Glaiqd3ge4I.jpg",
                                    alt: "React Logo",
                                    inner: "React"
                                }
                            ]
                        }
                    ]
                },
                {
                    img: "skill/4d33qhhQrenGs.png",
                    alt: "Design Logo",
                    inner: "Design",
                }
            ],
            contact: [
                {
                    inner: "Email",
                    childs: [{
                        href: "mailto:ari160826@gmail.com",
                        inner: "ari160826@gmail.com",
                    }]
                },
                {
                    inner: "Phone",
                    childs: [{
                        inner: "Unavaible"
                    }]
                },
                {
                    inner: "Social",
                    childs: [
                        {
                            inner: "Instagram",
                            childs: [{
                                href: "https://instagram.com/hx.ari",
                                inner: "instagram.com/hx.ari"
                            }]
                        },
                        {
                            inner: "Facebook",
                            childs: [{
                                href: "https://facebook.com/hxAre",
                                inner: "facebook.com/hxAre"
                            }]
                        },
                        {
                            inner: "Twitter",
                            childs: [{
                                href: "https://twitter.com/hxxAre",
                                inner: "twitter.com/hxxAre"
                            }]
                        },
                        {
                            inner: "Github",
                            childs: [{
                                href: "https://github.com/hxAri",
                                inner: "github.com/hxAri"
                            }]
                        }
                    ]
                }
            ]
        };
    },
    components: {
        ILoop: iloop
    },
    template: `
        <div class="row intro">
            <div class="col rd-square">
                <h4 class="title">Skills</h4>
                <p class="text">These are some of the skills I have learned or am currently learning.</p><br/>
                <ILoop ul="unorder" li="unorder-li" :vl="skills" />
            </div>
            <div class="col rd-square">
                <h4 class="title">Contact</h4>
                <p class="text">You can contact me if there is a need by clicking one of the links below.</p><br/>
                <ILoop ul="unorder" li="unorder-li" :vl="contact" />
            </div>
        </div>
    `
};

const project = {
    data: function() {
        return {
            project: [
                {
                    alt: "Yume Avatar",
                    img: "avatar/2fM7JQH-BeImw.png",
                    link: "Yume",
                    text: "hxAri/Yume",
                    title: "Yume"
                },
                {
                    alt: "Syntax Avatar",
                    img: "avatar/6dOFxNDTRMAAk.png",
                    link: "Syntax",
                    text: "hxAri/Syntax",
                    title: "Syntax"
                }
            ]
        };
    },
    methods: {
        image: function( src ) {
            return `https://raw.githubusercontent.com/hxAri/hxAri.github.io/main/dist/img/${src}`;
        }
    },
    components: {
        Card: card
    },
    template: `
        <div class="project">
            <h4 class="title margin-0">Projects</h4>
            <div class="row projects scroll-hidden">
                <div v-for="i in project" :keys="i" class="col card rd-square">
                    <Card :alt="i.alt" :img="image(i.img)" :link="i.link" :text="i.text" :title="i.title" />
                </div>
            </div>
        </div>
    `
};

const resume = {
    template: `
        <div class="resume">
            <h4 class="title margin-0">Resume</h4>
            <div class="row">
                Not available for now
            </div>
        </div>
    `
};

const home = {
    components: {
        Intro: intro,
        Resume: resume,
        Project: project
    },
    template: `
        <div class="main">
            <div class="header">
                <div class="header-banner">
                    <h6 class="header-title">
                        <a href="https://hxari.github.io">hxAri</a>
                    </h6>
                </div>
            </div>
            <div class="header-br"></div>
            <div class="container">
                <div class="banner rd-square flex flex-center">
                    <div class="content">
                        <h1 class="title">About</h1>
                        <p class="text">
                            Hello, I'm Ari Setiawan, I'm a Programmer from Indonesian. I'm currently undergoing a Software Engineering vocational high school. I usually work on my own projects but I can also work with a team.
                        </p>
                    </div>
                </div>
                <Intro />
                <Resume />
                <Project />
            </div>
            <div class="container footer flex flex-center">
                <div class="content">
                    <h6 class="footer-title">Created by hxAri <b>&copy; 2022</b></h6>
                </div>
            </div>
        </div>
    `
};

const yume = {
    data: function() {
        return {
            open: "",
            menu: [
                {
                    inner: "Home",
                    target: "Yume"
                },
                {
                    inner: "About",
                    target: "Yume/about"
                },
                {
                    inner: "Index",
                    target: "Yume/index",
                    childs: [
                        {
                            inner: "Apps",
                            target: "app",
                            childs: [
                                {
                                    inner: "Http",
                                    childs: [{
                                        inner: "Controllers",
                                        target: "controller"
                                    }]
                                },
                                {
                                    inner: "Models",
                                    target: "model"
                                },
                                {
                                    inner: "Plugins",
                                    target: "plugin"
                                },
                                {
                                    inner: "Views",
                                    target: "view"
                                }
                            ]
                        },
                        {
                            inner: "Routes",
                            target: "routes"
                        },
                        {
                            inner: "Util",
                            target: "util",
                            childs: [
                                {
                                    inner: "Exception",
                                },
                                {
                                    inner: "Functions",
                                },
                                {
                                    inner: "Http",
                                },
                                {
                                    inner: "Keisitu",
                                },
                                {
                                    inner: "Loader",
                                },
                                {
                                    inner: "Package",
                                },
                                {
                                    inner: "Pstrace",
                                },
                                {
                                    inner: "Reflection",
                                },
                                {
                                    inner: "RunTime",
                                },
                                {
                                    inner: "Spl",
                                },
                                {
                                    inner: "Storage"
                                },
                                {
                                    inner: "Tree",
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        attr: function( m ) {
            return `${m} ${this.open}`;
        },
        toggle: function() {
            if( this.open != "" ) {
                this.open = "";
            } else
                this.open = "open-left";
        }
    },
    components: {
        RLoop: rloop
    },
    template: `
        <div class="yume">
            <div class="header">
                <div class="header-banner">
                    <button @click="toggle()" class="header-button flex flex-center">
                        <i class="bx bx-menu"></i>
                    </button>
                    <h6 class="header-title">
                        <a href="https://hxari.github.io/Yume">Yume</a>
                    </h6>
                </div>
            </div>
            <div class="header-br"></div>
            <div class="wrapper flex">
                <div :class="attr('yume-menu')">
                    <div :class="attr('yume-menu-main')">
                        <RLoop ul="unorder" li="unorder-li" :vl="menu" />
                    </div>
                    <div class="yume-menu-exit" @click="toggle()"></div>
                </div>
                <div class="yume-content">
                    <div class="yume-banner flex flex-center">
                        <div class="yume-banner-image flex flex-center">
                            <img src="https://raw.githubusercontent.com/hxAri/Yume/main/resource/statics/bundle/image/38lBrtqvT212w.png" alt="Yume Logo" />
                        </div>
                    </div>
                    <h2 class="title">A very simple PHP framework</h2>
                    <div class="col text bg-c pd-24 rd-square">
                        Yume is a very simple PHP framework and does not require any libraries or modules in the packagist. <b>This framework is not used to undermine or compete with existing frameworks!</b>
                    </div>
                    <h2 class="title">Why is it simple?</h2>
                    <div class="col text bg-c pd-24 rd-square">
                        Yume is built with custom classes and functions in other words Yume does not use any other PHP library to run it but you can still use other PHP libraries in this framework.
                    </div>
                    <div class="col text bg-c pd-24 rd-square">
                        Yume is also intended for those of you who want to create their own PHP Framework but don't know where to start.
                        You are allowed to edit all Yume files or classes as you wish.
                    </div>
                    <h2 class="title margin-0">Installation</h2>
                    <div class="row install">
                        <div class="col bg-c pd-24 rd-square">
                            <h4 class="title">Composer</h4>
                            <p class="text">Install with composer &#128512</p>
                            <pre class="pre bg-b pd-10 rd-square scroll-hidden">composer create-project yume/yume </pre>
                        </div>
                        <div class="col bg-c pd-24 rd-square">
                            <h4 class="title">Git Clone</h4>
                            <p class="text">Clone the github repository &#128513;</p>
                            <pre class="pre bg-b pd-10 rd-square scroll-hidden">git clone https://github.com/hxAri/Yume</pre>
                        </div>
                        <div class="col bg-c pd-24 rd-square">
                            <h4 class="title">Github</h4>
                            <p class="text">Download via github repo &#128511</p>
                            <pre class="pre bg-b pd-10 rd-square scroll-hidden"><a href="https://github.com/hxAri/Yume/archive/refs/heads/main.zip">https://github.com/hxAri/Yume</a></pre>
                        </div>
                    </div>
                    <div class="footer flex flex-center rd-square margin-0">
                        <div class="content">
                            <h6 class="footer-title">Created by hxAri <b>&copy; 2022</b></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

const syntax = {
    template: `
        <div class="syntax">
            Syntax
        </div>
    `
};
