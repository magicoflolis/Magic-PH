'use strict';

const brws = (typeof browser=="undefined"?chrome:browser),
configDefault = {
  debug: true,
  altplayers: "none",
  seektime: 4,
  autojump: false,
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
  favorites: "",
  blacklist: "none",
  headerOrder: [
    "home",
    "videos",
    "categories",
    "pornstars",
    "gifs",
    "recommended",
    "favorites",
  ],
  headerLinks: {
    url: {
      h1_link: "/",
      h2_link: "/",
      h3_link: "/",
      h4_link: "/",
      h5_link: "/",
      h6_link: "/",
      h7_link: "/",
      h8_link: "/",
    },
    name: {
      h1_link: "/",
      h2_link: "/",
      h3_link: "/",
      h4_link: "/",
      h5_link: "/",
      h6_link: "/",
      h7_link: "/",
      h8_link: "/",
    },
  },
},
doc = document,
qsA = (element,selector) => {
  if(!selector) {
    selector = document;
  };
  return selector.querySelectorAll(element);
},
qs = (element,selector) => {
  if(!selector) {
    selector = document;
  };
  return selector.querySelector(element);
},
injectCSS = (src) => {
  if ( !doc ) { return; }
  let c;
  c = doc.createElement('link');
  c.rel="stylesheet";
  c.href = brws.runtime.getURL(src);
  (doc.head || doc.documentElement || doc).appendChild(c);
},
injectScript = (src,remover) => {
  if ( !doc ) { return; }
  let s;
  s = doc.createElement('script');
  s.async = true;
  s.type = "module";
  s.src = brws.runtime.getURL(src);
  s.crossOrigin = "anonymous";
  (doc.head || doc.documentElement || doc).appendChild(s);
  if (s && !remover) {
    s.remove();
  };
};

self.onload = () => {
  if(doc.location.origin.includes("pornhub")) {
    injectScript("js/magicph.js");
    if(/view_video.php/.test(self.location.href)) {
      if(localStorage.getItem("altplayers")) {
        injectCSS("css/plyr.css");
        injectScript("web_accessible_resources/plyr.min.js",true);
      };
      // injectScript("js/player.js");
      injectScript("js/networkPlayer.js");
    };
  } else {
    brws.storage.local.get(configDefault,async (config) => {
      let rtComments = qsA(".tab-block-label"),
      ypComments = qs("#videoComments"),
      rtFN = (type) => {
        rtComments.forEach((comment) => {
          if(type === "add") {
            (comment.dataset.tabid === "comments_tab") ? comment.classList.add("rm") : false;
          };
          if(type === "remove") {
            (comment.dataset.tabid === "comments_tab") ? comment.classList.remove("rm") : false;
          };
        })
      };
      config.autoscroll ? window.scrollTo(0, 101) : false;
      localStorage.setItem("seektime", config.seektime);
      if(config.comments) {
        ypComments ? ypComments.classList.remove("rm") : false;
        qs(".tab-block-label") ? rtFN("remove") : false;
        qs("#allComments") ? qs("#allComments").classList.remove("rm") : false;
      } else {
        ypComments ? ypComments.classList.add("rm") : false;
        qs(".tab-block-label") ? rtFN("add") : false;
        qs("#allComments") ? qs("#allComments").classList.add("rm") : false;
      };
      if(config.autojump) {
        localStorage.setItem("autojump", config.autojump);
      } else {
        if(localStorage.getItem("autojump")) {
          localStorage.removeItem("autojump")
        };
      };
      injectScript("js/networkPlayer.js");
    });
  };

};