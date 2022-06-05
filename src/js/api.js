'use strict';

let win = self ?? window,
doc = win.document,
l = {
  href: doc.location.href,
  path: doc.location.pathname,
  ph: doc.location.origin.includes("pornhub"),
  rt: doc.location.origin.includes("redtube"),
  t8: doc.location.origin.includes("tube8"),
  tz: doc.location.origin.includes("thumbzilla"),
  yp: doc.location.origin.includes("youporn"),
},
fvideo = l.path.includes("view_video") || l.path.includes("porn_video") || l.path.includes("watch") || l.path.includes("video") || l.rt;

export const mph = {
  ael(elm,event,callback){
    elm = elm ?? doc;
    return elm.addEventListener(event, callback);
  },
  /** Waits until args return true */
  async check(args) {
    while (args === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return args;
  },
  /** Can create various elements */
  create(element,cname,type) {
    let el = doc.createElement(element);
    type ? (el.type = type) : false;
    cname ? (el.className = cname) : false;
    return el;
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  err(...error) {
    console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  html: doc.documentElement,
  async fe(elements,callback) {
    try {
      return await new Promise((resolve, reject) => {
        elements = elements ?? reject(new Error(`Element(s) not found ${elements})`));
        this.qa(elements).then(e => resolve(e.forEach(callback)))
      });
    } catch (error) {
      return this.err(error.message);
    }
  },
  async fetchURL(url) {
    let f = await fetch(url),
    response = await f.json();
    return response;
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  info(...message){
    console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  inject(src) {
    let s;
    s = this.create("script","mphInjected","text/javascript");
    s.innerHTML = src;
    (doc.head || this.html || doc).appendChild(s);
    this.log(`Injected: ${s.innerHTML}`);
    if(s) {
      s.remove();
    }
  },
  log(...message) {
    console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
  },
/**
 * @param {Node} element
 * @param {MutationCallback} callback
 * @param {MutationObserverInit} options
 */
  observe(element, callback, options = {subtree:true,childList:true}) {
    let observer = new MutationObserver(callback);
    callback([], observer);
    observer.observe(element, options);
    return observer;
  },
  /** Waits until element exists */
  async query(selector,root) {
    root = root ?? doc;
    while ( root.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return root.querySelector(selector);
  },
  /** If element exists then querySelectorAll */
  async qa(selector,root) {
    try {
      return await new Promise((resolve, reject) => {
        root = root ?? doc;
        if (root.querySelector(selector) === null) {
          reject(new Error(`Element(s) not found ${root}.querySelector(${selector})`));
        } else {
          resolve(root.querySelectorAll(selector));
        }
      });
    } catch (error) {
      return this.err(error.message);
    }
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
  find: {
    href: doc.location.href,
    path: doc.location.pathname,
    ph: doc.location.origin.includes("pornhub"),
    rt: doc.location.origin.includes("redtube"),
    t8: doc.location.origin.includes("tube8"),
    tz: doc.location.origin.includes("thumbzilla"),
    yp: doc.location.origin.includes("youporn"),
    community: l.path.includes("discover"),
    channel: doc.querySelector("#channelsProfile"),
    category: l.path.includes("categories"),
    favorites: l.path.includes("magicph-favorites"),
    home: doc.location.pathname == "/",
    gay: l.path.includes("gay"),
    gif: l.path.includes("gif"),
    lo: doc.querySelector("body.logged-out"),
    model: doc.querySelector("div.amateurModel"),
    new: doc.querySelector("#headerSearchWrapperFree"),
    premium: doc.querySelector(".premiumUser"),
    pstar: l.path.includes("pornstar"),
    user: doc.querySelector("#profileContent"),
    video: fvideo,
    recommended: l.path.includes("recommended"),
  },
  scrollnumber: fvideo ? 400 : 101,
};