'use strict';

// class mphError extends Error {
//   /**
//    *
//    * @param {*} fn - Function name
//    * @param  {...any} params
//    */
//   constructor(fn = 'mphError', ...params) {
//     super(...params);
//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, mphError);
//     };
//     this.fn = `[${fn}]`;
//   }
// }
let win = self ?? window,
doc = win.document,
origin = doc.location.origin,
path = doc.location.pathname,
l = {
  ph: origin.includes('pornhub'),
  rt: origin.includes('redtube'),
  t8: origin.includes('tube8'),
  tz: origin.includes('thumbzilla'),
  yp: origin.includes('youporn'),
  ofs: origin.includes('onlyfans'),
  video: path.match(/video+/g) || path.match(/watch+/g) || origin.includes('redtube') && path.match(/\/[\d]+/g) || path.match(/\/[\d]+\//g),
},
/**
 * If true, string IS empty / object IS null!
 * @param {string|object} str - String or object
 */
estr = (str) => str === null || str.trim() === '',
isMobile = () => {
  let a = navigator.userAgent||navigator.vendor||win.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4));
},
cacheSite,
site = {
  ofs: {
    logoImg: '.logo > .logoWrapper > a > img',
    headerContainer: 'nav.l-header__menu',
    container: '.wrapper > .container',
    home: '.frontListingWrapper',
    menu: '.bottomNav',
    vTitle: 'h1.title',
    favLocation: '.allActionsContainer',
    jlMain: false,
    jl: '',
    jc: '',
    origin: 'onlyfans',
  },
  ph: {
    logoImg: isMobile() ? '.phLogoWrap > img' : '.logo > .logoWrapper > a > img',
    headerContainer: isMobile() ? '#topMenuSection' : '#headerContainer > .logo',
    container: isMobile() ? '.container' : '.wrapper > .container',
    home: '.frontListingWrapper',
    menu: isMobile() ? '.bottomNav' : 'ul#headerMainMenu',
    vTitle: isMobile() ? '.headerWrap' : 'h1.title',
    favLocation: isMobile() ? '.underThumbButtons' : '.allActionsContainer',
    jlMain: isMobile() ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat.alpha',
    jl: isMobile() ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat.alpha',
    jc: isMobile() ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat',
    origin: 'pornhub',
  },
  rt: {
    logoImg: isMobile() ? '#redtube_logo img' : '#logo_wrap > a > img',
    headerContainer: isMobile() ? '#logo_container' : '#logo_wrap',
    container: isMobile() ? '#content_wrapper' : '#content_float > #content_wrapper',
    home: '#content_container',
    menu: isMobile() ? '#menu_container' : 'ul.menu_list',
    vTitle: 'h1.video_page_title',
    favLocation: isMobile() ? '.video_actions_container' : '.video_action_wrap',
    jlMain: isMobile() ? 'jlMain' : '.action_tags_list .owl-stage',
    jl: isMobile() ? 'jl' : '.action_tags_list .owl-item > div',
    jc: isMobile() ? 'jc' : '.action_tags_list .owl-item > div',
    origin: 'redtube',
  },
  t8: {
    logoImg: '#logo img',
    headerContainer: isMobile() ? '#logo' : '.logo-box.relative',
    container: isMobile() ? '.content-wrapper' : '.main-wrapper > .content-wrapper',
    home: '#home_page_wrapper',
    menu: isMobile() ? '#primaryHeaderNav' : 'ul#main-nav',
    vTitle: isMobile() ? 'h1#title_video_page' : 'main > header > div > h1',
    favLocation: '.player-under-btns',
    jlMain: false,
    jl: 'a.js-triggerJumpCat',
    jc: 'a.js-triggerJumpCat',
    origin: 'tube8',
  },
  tz: {
    logoImg: isMobile() ? '#logo' : '.mainmenuBar > a > img',
    headerContainer: isMobile() ? '#leftMenu' : '.mainmenuBar',
    container: isMobile() ? '#mobileContainer' : '#contentWrapper > section',
    home: '#content',
    menu: isMobile() ? '#leftMenu' : 'ul.categoryList',
    vTitle: 'h1.videoTitle',
    favLocation: '.actionWrapper',
    jlMain: false,
    jl: 'a.js-triggerJumpCat',
    jc: 'a.js-triggerJumpCat',
    origin: 'thumbzilla',
  },
  yp: {
    logoImg: 'a > img.js_logo_img',
    headerContainer: isMobile() ? '.topHeader > li:nth-child(2)' : '.headerContainer',
    container: isMobile() ? '#mobileContainer' : '.container',
    home: '.row:not(#pagination) > div.clearfix',
    menu: isMobile() ? '#paidSites' : 'ul#headerMainMenu',
    vTitle: 'h1.videoTitle',
    favLocation: '.feature-wrapper',
    jlMain: false,
    jl: 'a.js-triggerJumpCat',
    jc: 'a.js-triggerJumpCat',
    origin: 'youporn',
  },
  find() {
    if(!cacheSite) {
      if(doc.location.origin.includes('pornhub')) {
        cacheSite = this.ph;
      } else if (doc.location.origin.includes('redtube')) {
        cacheSite = this.rt;
      } else if (doc.location.origin.includes('tube8')) {
        cacheSite = this.t8;
      } else if (doc.location.origin.includes('thumbzilla')) {
        cacheSite = this.tz;
      } else if (doc.location.origin.includes('youporn')) {
        cacheSite = this.yp;
      } else if (doc.location.origin.includes('onlyfans')) {
        cacheSite = this.ofs;
      };
    };
    return cacheSite;
  }
};
export const mph = {
  // body #counter a clearModalCookie();
  ael(elm,event,callback) {
    try {
      elm = elm ?? doc;
      if(isMobile()) {
        if(event === 'click') {
          event = 'mouseup';
          // elm.addEventListener('mouseup', callback);
          elm.addEventListener('touchstart', callback);
          elm.addEventListener('touchend', callback);
        };
      };
      if(event === 'fclick') {event = 'click'};
      return elm.addEventListener(event, callback);
    } catch(error) {
      this.err(error);
    };
  },
  /** Can make various elements */
  make(element,cname,attrs = {}) {
    try {
      let el = doc.createElement(element);
      !estr(cname) ? el.className = cname : false;
      if(attrs) {
        for(let key in attrs) {
          el[key] = attrs[key]
        };
      };
      return el;
    } catch(error) {this.err(error)};
  },
  /** Waits until args return true */
  async check(args) {
    while (args === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    };
    return args;
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
  async fetchURL(url,method = 'GET',responseType = 'json',params = {}) {
    try {
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: method,
          ...params,
        }).then((response) => {
          if(!response.ok) reject(response);
          if(responseType.includes('json')) {
            resolve(response.json());
          } else if(responseType.includes('text')) {
            resolve(response.text());
          } else if(responseType.includes('blob')) {
            resolve(response.blob());
          };
          resolve(response);
        });
      });
    } catch (error) {this.err(error);}
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  info(...message) {
    console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  inject(src,keep) {
    let s = this.make('script','mphInjected', {
      type: 'text/javascript',
      innerHTML: src,
    });
    // doc.createTextNode(src)
    if(!keep) {
      (doc.head || this.html || doc).appendChild(s);
    };
    this.log(`Injected: ${s.innerHTML}`);
    if(s && !keep) {
      s.remove();
    } else {
      return s;
    };
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
      return this.err(error);
    }
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
  table(...message) {
    // '[%cMagicPH%c] %cTBL', 'color: rgb(255,153,0);', '', 'color: rgb(175, 24, 32);'
    return console.table(...message);
  },
  find: {
    href: doc.location.href,
    path: doc.location.pathname,
    ph: doc.location.origin.includes('pornhub'),
    rt: doc.location.origin.includes('redtube'),
    t8: doc.location.origin.includes('tube8'),
    tz: doc.location.origin.includes('thumbzilla'),
    yp: doc.location.origin.includes('youporn'),
    ofs: doc.location.origin.includes('onlyfans'),
    mobile: isMobile(),
    community: path.includes('discover'),
    channel: doc.querySelector('#channelsProfile'),
    category: path.includes('categories'),
    favorites: path.includes('magicph-favorites'),
    home: doc.location.pathname == '/',
    gay: win.isGay === '1' || path.includes('gay'),
    gif: path.includes('gif'),
    lo: doc.querySelector('body.logged-out'),
    model: doc.querySelector('div.amateurModel'),
    new: doc.querySelector('#headerSearchWrapperFree'),
    premium: doc.querySelector('.premiumUser'),
    pstar: path.includes('pornstar'),
    user: doc.querySelector('#profileContent'),
    video: l.video,
    recommended: path.includes('recommended'),
  },
  currentSite: site.find(),
  scrollnumber: l.video ? 400 : 101,
};