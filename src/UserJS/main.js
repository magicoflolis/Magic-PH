let currentUserId;
let tsSrc;
let vueRouter = [];

const debug = true;
const getUAData = () => {
  if (typeof navigator.userAgentData !== 'undefined') {
    const { platform, mobile } = navigator.userAgentData ?? {};
    return mobile || /Android|Apple/.test(platform ?? '');
  }
  return false;
};
const isMobile = /Mobile|Tablet/.test(navigator.userAgent ?? '') || getUAData();
// #region Console Logs

const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cMagicPH%c] %cDBG',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cMagicPH%c] %cERROR',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex) {
      alert(`[MagicPH] (${ex.cause}) ${ex.message}`);
      break;
    }
  }
};
const info = (...msg) => {
  console.info(
    '[%cMagicPH%c] %cINF',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};

// const log = (...msg) => {
//   console.log(
//     '[%cMagicPH%c] %cLOG',
//     'color: rgb(255,153,0);',
//     '',
//     'color: rgb(255, 212, 0);',
//     ...msg
//   );
// };
// #endregion
const Supports = {
  gm: typeof GM !== 'undefined',
  uwin: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
};
const isGM = Supports.gm;
const win = Supports.uwin;
const navLang = (navigator.language ?? 'en').split('-')[0] ?? 'en';
const i18n$ = (...args) => {
  const arr = [];
  for (const arg of args) {
    arr.push(languageList[navLang][arg]);
  }
  return arr.length !== 1 ? arr : arr[0];
};
/**
 * @type { import("./types").objToStr }
 */
const objToStr = (obj) => {
  return Object.prototype.toString.call(obj);
};
/**
 * @type { import("./types").mkURL }
 */
const mkURL = (str) => {
  let u;
  try {
    u = objToStr(str).includes('URL') ? str : new URL(str);
  } catch (ex) {
    u = {};
    err(ex, { cause: 'mkURL' });
  }
  return u;
};
/**
 * @type { import("./types").isRegExp }
 */
const isRegExp = (obj) => {
  const s = objToStr(obj);
  return s.includes('RegExp');
};
/**
 * @type { import("./types").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("./types").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("./types").isFn }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("./types").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("./types").isBlank }
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (isObj(obj) && Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * @type { import("./types").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @type { import("./types").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true) => {
  if (isNull(target)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from(qsA(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};
const smToArr = (m) => {
  let arr = [];
  if (objToStr(m).includes('Map')) {
    for (const [k, v] of m) {
      arr.push([k, v]);
    }
  } else if (objToStr(m).includes('Set')) {
    arr.push(...[...m]);
  } else if (Array.isArray(m)) {
    arr = m;
  } else {
    arr = normalizeTarget(m);
  }
  return arr;
};
const fancyTimeFormat = (duration) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
};
/**
 * @type { import("./types").halt }
 */
const halt = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
};
/**
 * @type { import("./types").ael }
 */
const ael = (el, type, listener, options) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
      if (isMobile && type === 'click') {
        elem.addEventListener('touchstart', listener, options);
        // elem.addEventListener('touchend', listener, options);
        // type = 'mouseup';
        continue;
      }
      elem.addEventListener(type, listener, options);
    }
  } catch (ex) {
    err(ex);
  }
};
/**
 * @type { import("./types").qsA }
 */
const qsA = (selectors, root) => {
  try {
    return (root || document).querySelectorAll(selectors);
  } catch (ex) {
    err(ex);
  }
  return [];
};
/**
 * @type { import("./types").qs }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * @type { import("./types").query }
 */
const query = async (selector, root) => {
  try {
    while (isNull((root || document).querySelector(selector))) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return root;
};
/**
 * @type { import("./types").formAttrs }
 */
const formAttrs = (elem, attr = {}) => {
  if (!elem) {
    return elem;
  }
  for (const key in attr) {
    if (typeof attr[key] === 'object') {
      formAttrs(elem[key], attr[key]);
    } else if (isFN(attr[key])) {
      if (/^on/.test(key)) {
        elem[key] = attr[key];
        continue;
      }
      ael(elem, key, attr[key]);
    } else if (key === 'class') {
      elem.className = attr[key];
    } else {
      elem[key] = attr[key];
    }
  }
  return elem;
};
/**
 * @type { import("./types").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    el = document.createElement(tagName);
    if (!isEmpty(cname)) {
      if (typeof cname === 'string') {
        el.className = cname;
      } else {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (typeof attrs === 'string') {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
    err(ex);
  }
  return el;
};
/**
 * @type { import("./types").loadCSS }
 */
const loadCSS = (css, name = 'CSS') => {
  try {
    if (typeof name !== 'string') {
      throw new Error('[loadCSS] "name" must be a typeof "String"');
    }
    if (qs(`style[data-role="${name}"]`)) {
      return qs(`style[data-role="${name}"]`);
    }
    if (typeof css !== 'string') {
      throw new Error('[loadCSS] "css" must be a typeof "String"');
    }
    if (isBlank(css)) {
      throw new Error(`[loadCSS] "${name}" contains empty CSS string`);
    }
    const sty = make('style', `mph-${name}`, {
      textContent: css,
      dataset: {
        insertedBy: 'MagicPH',
        role: name
      }
    });
    (document.documentElement || document.head).appendChild(sty);
    return sty;
  } catch (ex) {
    err(ex);
  }
  return undefined;
};
const delay = (timeout = 5000) => new Promise((resolve) => setTimeout(resolve, timeout));
/**
 * @type { import("./types").observe }
 */
const observe = (element, listener, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(listener);
  observer.observe(element, options);
  listener.call(element, [], observer);
  return observer;
};

// #region Classes
/**
 * Based on uBlock Origin by Raymond Hill (https://github.com/gorhill/uBlock)
 * @link { https://github.com/gorhill/uBlock/blob/master/src/js/dom.js }
 */
class dom {
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } attr
   * @param { * } [value=undefined]
   */
  static attr(target, attr, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr);
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   */
  static clear(target) {
    for (const elem of normalizeTarget(target)) {
      while (elem.firstChild !== null) {
        elem.removeChild(elem.firstChild);
      }
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @returns { Node }
   */
  static clone(target) {
    return normalizeTarget(target)[0].cloneNode(true);
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } prop
   * @param { * } [value=undefined]
   * @returns { keyof T | void }
   */
  static prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } text
   */
  static text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   */
  static remove(target) {
    for (const elem of normalizeTarget(target)) {
      elem.remove();
    }
  }
}
dom.cl = class {
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string | string[] } name
   */
  static add(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(name);
      }
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string | string[] } name
   */
  static remove(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(name);
      }
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } name
   * @param { boolean | undefined } state
   * @returns { boolean }
   */
  static toggle(target, name, state) {
    let r;
    for (const elem of normalizeTarget(target)) {
      r = elem.classList.toggle(name, state);
    }
    return r;
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } name
   * @returns { boolean }
   */
  static has(target, name) {
    for (const elem of normalizeTarget(target)) {
      if (elem.classList.contains(name)) {
        return true;
      }
    }
    return false;
  }
};
/**
 * @type { import("./types").setObj }
 */
const setObj = (objA = {}, objB = {}) => {
  objA = objA || {};
  objB = objB || {};
  const hasOwn = Object.hasOwn || Object.prototype.hasOwnProperty.call;
  for (const [key, value] of Object.entries(objA)) {
    if (!hasOwn(objB, key)) {
      objB[key] = value;
    } else if (typeof value === 'object') {
      setObj(value, objB[key]);
    }
  }
  return objB;
};

class HandlePage {
  constructor(url) {
    this.hosts = {
      // 'about:blank': {
      //   domains: [],
      //   ...HandlePage.domainDefaults
      // },
      pornhub: {
        domains: ['pornhub.com', 'pornhubpremium.com']
      },
      youporn: {
        domains: ['youporn.com', 'youporngay.com', 'youpornpremium.com']
      },
      redtube: {
        domains: ['redtube.com', 'redtubepremium.com']
      },
      tube8: {
        domains: ['tube8.com']
      },
      thumbzilla: {
        domains: ['thumbzilla.com']
      },
      onlyfans: {
        domains: ['onlyfans.com']
      },
      xhamster: {
        domains: ['xhamster.com']
      },
      xnxx: {
        domains: ['xnxx.com']
      },
      xvideos: {
        domains: ['xvideos.com']
      },
      beeg: {
        domains: ['beeg.com']
      }
    };
    this.videoData = {};
    this.cache = {
      domain: 'blank'
    };
    this.current = url;
    this.theme = undefined;
    if (isEmpty(url) || !isNull(this.theme)) {
      this.theme = this.themeHandler().load();
    }

    // dbg(this);
  }
  themeHandler() {
    return {
      background: null,
      border: null,
      'controls-background': null,
      color: null,
      header: null,
      hover: null,
      root: null,
      get() {
        return this.color !== null ? this.color : this.find();
      },
      find() {
        const p = this.current ? this.current.root : window.location.host;
        if (/tube8/.test(p)) {
          this.color = 'hsl(201, 64%, 40%)';
          this.hover = 'hsl(201, 64%, 25%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/thumbzilla/.test(p)) {
          this.color = 'hsl(168, 75%, 42%)';
          this.hover = 'hsl(168, 75%, 27%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/redtube/.test(p)) {
          this.color = 'hsl(357, 76%, 39%)';
          this.hover = 'hsl(357, 76%, 24%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/youporn/.test(p)) {
          this.color = 'hsl(345, 80%, 63%)';
          this.hover = 'hsl(345, 80%, 48%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/onlyfans/.test(p)) {
          this.color = 'var(--text-color, var(--mph-text-color, hsl(210, 12%, 97%)))';
          this.hover = 'var(--swiper-theme-color, hsl(196, 100%, 32%))';
          this.background = 'rgba(138,150,163,.12)';
          // rgba(138, 150, 163, 0.12)
          // opacity: 0.4;
          this['controls-background'] =
            'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))';
          this.border = this.background;
          this.root = 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))';
          this.header = this.root;
        } else if (/xhamster/.test(p)) {
          this.color = 'var(--color-white-origin, #fff)';
          this.hover = '#d42025';
          this.background = 'var(--color-accent-red, #e34449)';
          this.border = this.background;
        } else {
          this.color = 'hsl(36, 100%, 50%)';
          this.hover = 'hsl(36, 100%, 35%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        }
        return this.color;
      },
      load() {
        const root = qs(':root');
        if (!root) {
          err('"root" not found');
          return this;
        }
        if (!this.color) {
          this.get();
        }
        root.style.setProperty('--mph-site-color', this.color);
        if (this.hover) {
          root.style.setProperty('--mph-hover-color', this.hover);
        }
        if (this.background) {
          root.style.setProperty('--mph-background-color', this.background);
        }
        if (this.border) {
          root.style.setProperty('--mph-border-color', this.border);
        }
        if (this.root) {
          root.style.setProperty('--mph-root-bg', this.root);
        }
        if (this.header) {
          root.style.setProperty('--mph-header-bg', this.header);
        }
        return this;
      }
    };
  }
  static domainDefaults = {
    validDomain: false,
    validPath: false,
    pathType: 'Unknown'
  };
  static videoDefaults = {
    title: 'MagicPH',
    mediaFiles: [],
    playerId: 0
  };
  /**
   * @type { import("./types").HandlePage['current'] }
   */
  get current() {
    return this.cache;
  }
  set current(url) {
    const urlObj = mkURL(url || window.location);
    const { host } = urlObj;
    this.webpage = urlObj;
    this.host = this.getHost(host);
    /** @type { string } */
    const d = host.split('.').at(-2);
    const root = this.hosts[d] ? d : 'blank';
    const hostDom = setObj(HandlePage.domainDefaults, this.hosts[d] ?? {});
    const routes = new Map();
    if (this.hosts[d]) {
      const findIn = (reg, type = 'domains') => {
        return hostDom[type].find(
          (h) => (isRegExp(reg) && reg.test(h)) || (typeof reg === 'string' && reg.includes(h))
        );
      };
      if (findIn(/pornhub|tube8|youporn|thumbzilla|redtube/)) {
        if (findIn(/pornhub/)) {
          routes.set('GIF', /^\/gif\/\d+(?:\/(?=$))?$/i);
          routes.set('Shorties', /^\/shorties(?:\/(?=$))?$/i);
        }
        if (findIn(/redtube/)) {
          routes.set('Video', /\/[\d]+/g);
        } else {
          routes.set('Video', /(video|watch)+|\/[\d]+\//g);
        }
      }
      for (const [k, v] of routes) {
        if (isRegExp(v) && v.test(urlObj.pathname)) {
          hostDom.validPath = true;
          hostDom.pathType = k;
          break;
        } else if (typeof v === 'string' && v.includes(urlObj.pathname)) {
          hostDom.validPath = true;
          hostDom.pathType = k;
          break;
        }
      }
      // if (/onlyfans/.test(root)) {
      //   hostDom.validPath = true;
      //   hostDom.pathType = urlObj.pathname;
      // }
      if (!hostDom.validPath) {
        hostDom.pathType = 'Unknown';
      }
      if (findIn(urlObj.host, 'domains')) {
        hostDom.validDomain = true;
      } else {
        hostDom.validDomain = false;
      }
    }
    this.cache = {
      webpage: this.webpage,
      host: this.host,
      root,
      routes,
      ...hostDom
    };
  }
  get Video() {
    return this.videoData;
  }
  set Video(obj = {}) {
    this.videoData = setObj(this.videoData, obj);
  }
  /**
   * @template { string } S
   * @param { S } str
   * @returns { S }
   */
  getHost(str = '') {
    return str.split('.').splice(-2).join('.');
  }
  refresh() {
    dom.cl.add(qsA('mph-list', dul), 'hidden');
  }
  updateCounters(num, ...hosts) {
    for (const h of hosts) {
      dom.text(qsA(`mph-count[data-host="${h}"]`), ` (${num ?? 0})`);
    }
    dom.text(qsA('mph-count:not([data-host])'), `(${num ?? 0})`);
  }
}
const HP = new HandlePage();
class Timeout {
  constructor() {
    this.ids = [];
  }
  /**
   * Set the Delay and reason for timeout
   * @param { number } localDelay - Delay in ms
   * @param { string } reason - Reason for timeout
   * @returns { Promise<void> } Promise Function
   */
  set = (localDelay, reason) =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        Object.is(reason, null) || Object.is(reason, undefined) ? resolve() : reject(reason);
        this.clear(id);
      }, localDelay);
      this.ids.push(id);
    });
  wrap = (promise, localDelay, reason) => Promise.race([promise, this.set(localDelay, reason)]);
  clear = (...ids) => {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
  };
}
// #endregion

const iconSVG = {
  close:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="magicph-icon" aria-hidden="true"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="#ffffff"></path></g></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="magicph-icon" aria-hidden="true"><g class="copy"><path d="M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z"></path></g></svg>',
  download:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="magicph-icon" aria-hidden="true"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></g></svg>',
  mobileDownload:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mgp_icon magicph-icon" aria-hidden="true"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg>',
  remove:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="magicph-icon" aria-hidden="true"><g><path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/></g></svg>'
};
const saveAs = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = make('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
};
const arrayConcat = (inputArray) => {
  const totalLength = inputArray.reduce((prev, cur) => prev + cur.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const e of inputArray) {
    result.set(e, offset);
    offset += e.length;
  }
  return result;
};
const Network = {
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
   * @param { RequestInfo | URL } url - The URL to fetch
   * @param { GM.Request['method'] | Request['method'] } method - Fetch method
   * @param { GM.Request['responseType'] } responseType - Response type
   * @param { RequestInit | GM.Request | XMLHttpRequest } data - Fetch parameters
   * @param { boolean } useFetch
   * @returns { Promise<Response> } Fetch results
   */
  async req(url, method = 'GET', responseType = 'json', data = {}, useFetch = false) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    method = Network.bscStr(method, false);
    responseType = Network.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    if (params.hermes) {
      delete params.hermes;
    }
    if (isGM && !useFetch) {
      if (params.credentials) {
        Object.assign(params, {
          anonymous: false
        });
        if (Object.is(params.credentials, 'omit')) {
          Object.assign(params, {
            anonymous: true
          });
        }
        delete params.credentials;
      }
    } else if (params.onprogress) {
      delete params.onprogress;
    }
    return await new Promise((resolve, reject) => {
      /**
       * @param { Response } response_1
       * @returns { Response | Document }
       */
      const fetchResp = (response_1) => {
        if (!response_1.ok) {
          err({ method, responseType, data, useFetch, resp: response_1 });
          reject(new Error(`${response_1.status} ${url}`));
        }
        const check = (str_2 = 'text') => {
          return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
        };
        if (responseType.match(/buffer/)) {
          resolve(check('arrayBuffer'));
        } else if (responseType.match(/json/)) {
          resolve(check('json'));
        } else if (responseType.match(/text/)) {
          resolve(check('text'));
        } else if (responseType.match(/blob/)) {
          resolve(check('blob'));
        } else if (responseType.match(/formdata/)) {
          resolve(check('formData'));
        } else if (responseType.match(/clone/)) {
          resolve(check('clone'));
        } else if (responseType.match(/document/)) {
          const domParser = new DOMParser();
          const respTxt = check('text');
          if (respTxt instanceof Promise) {
            respTxt.then((txt) => {
              const doc = domParser.parseFromString(txt, 'text/html');
              resolve(doc);
            });
          } else {
            const doc = domParser.parseFromString(respTxt, 'text/html');
            resolve(doc);
          }
        } else {
          resolve(response_1);
        }
      };
      if (isGM && !useFetch) {
        Network.xmlRequest({
          url,
          responseType,
          ...params,
          onerror: reject,
          onload: (r_1) => {
            if (r_1.status !== 200) {
              err({ method, responseType, data, useFetch, resp: r_1 });
              reject(new Error(`${r_1.status} ${url}`));
            }
            if (responseType.match(/basic/)) resolve(r_1);
            resolve(r_1.response);
          }
        });
      } else {
        fetch(url, params).then(fetchResp).catch(reject);
      }
    });
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Network.sizes[i]}`;
  },
  prog(evt) {
    return Object.is(evt.total, 0)
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  async stream(url = '', filename, data = {}) {
    try {
      const chunks = [];
      const response = await Network.req(url, 'GET', 'basic', data, true).catch(err);
      if (!response) {
        return new Uint8Array();
      }
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      for await (const chunk of Network.streamAsyncIterable(response.body)) {
        receivedLength += chunk.length;
        chunks.push(chunk);
        if (filename) {
          const percentComplete = Network.prog({
            loaded: receivedLength,
            total: contentLength
          });
          msg(`[MagicPH] (${percentComplete}) Downloading "${filename}" using "Fetch API"`);
        }
      }
      const Uint8Chunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        Uint8Chunks.set(chunk, position);
        position += chunk.length;
      }
      return Uint8Chunks;
    } catch (ex) {
      err(ex);
    }
    return null;
  },
  async download(details = {}) {
    return await new Promise((resolve) => {
      Network.stream(details.url, details.name).then((Uint8Chunks) => {
        const blob = new Blob([Uint8Chunks], {
          type: 'application/octet-stream'
        });
        saveAs(blob, details.name);
        resolve(details.name);
      });
    });
  },
  /**
   * @param { GM.Request } details
   * @returns { Promise<XMLHttpRequest> }
   */
  async xmlRequest(details) {
    if (isGM) {
      if (isFN(GM.xmlHttpRequest)) {
        return GM.xmlHttpRequest(details);
      } else if (isFN(GM_xmlhttpRequest)) {
        return GM_xmlhttpRequest(details);
      }
    }
    return await new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      let method = 'GET';
      let url = 'about:blank';
      let body;
      for (const [key, value] of Object.entries(details)) {
        if (key === 'onload') {
          req.addEventListener('load', () => {
            if (isFN(value)) {
              value(req);
            }
            resolve(req);
          });
        } else if (key === 'onerror') {
          req.addEventListener('error', (evt) => {
            if (isFN(value)) {
              value(evt);
            }
            reject(evt);
          });
        } else if (key === 'onabort') {
          req.addEventListener('abort', (evt) => {
            if (isFN(value)) {
              value(evt);
            }
            reject(evt);
          });
        } else if (key === 'onprogress') {
          req.addEventListener('progress', value);
        } else if (key === 'responseType') {
          if (value === 'buffer') {
            req.responseType = 'arraybuffer';
          } else {
            req.responseType = value;
          }
        } else if (key === 'method') {
          method = value;
        } else if (key === 'url') {
          url = value;
        } else if (key === 'body') {
          body = value;
        }
      }
      req.open(method, url);

      if (isEmpty(req.responseType)) {
        req.responseType = 'text';
      }

      if (body) {
        req.send(body);
      } else {
        req.send();
      }
    });
  },
  /**
   * @param { ReadableStream<Uint8Array> } stream
   */
  async *streamAsyncIterable(stream) {
    const reader = stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  },
  /**
   * @template { string } S
   * @param { S } str
   * @param { boolean } lowerCase
   * @returns { S }
   */
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};
/**
 * @type { import("./types").openTab }
 */
const openTab = (url) => {
  if (isGM) {
    if (isFN(GM.openInTab)) {
      return GM.openInTab(url);
    } else if (isFN(GM_openInTab)) {
      return GM_openInTab(url, {
        active: true,
        insert: true
      });
    }
  }
  return window.open(url, '_blank');
};

const ofUsers = {};
const videoCache = new Map();
const hostCache = new Map();

const ntHead = make('mph-tabs');
const dul = make('mph-list');

class Tabs {
  constructor() {
    this.Tab = new Map();
  }
  hasTab(...params) {
    for (const p of params) {
      if (!this.Tab.has(p)) {
        return false;
      }
      const content = normalizeTarget(this.Tab.get(p)).filter((t) => p === t.dataset.host);
      if (isBlank(content)) {
        return false;
      }
    }
    return true;
  }
  storeTab(host) {
    const h = host ?? 'about:blank';
    if (!this.Tab.has(h)) {
      this.Tab.set(h, new Set());
    }
    return this.Tab.get(h);
  }
  cache(host, ...tabs) {
    const h = host ?? 'about:blank';
    const tabCache = this.storeTab(h);
    for (const t of normalizeTarget(tabs)) {
      if (tabCache.has(t)) {
        continue;
      }
      tabCache.add(t);
    }
    this.Tab.set(h, tabCache);
    return tabCache;
  }
  mph(host) {
    if (!host.startsWith('mph:')) {
      return;
    }
    // const type = host.match(/mph:(.+)/)[1];
    // if (type === 'newtab') {
    //   dom.cl.remove(cfgpage, 'hidden');
    //   dom.cl.add(table, 'hidden');
    //   if (!container.supported) {
    //     dom.attr(container.frame, 'style', 'height: 100%;');
    //   }
    // }
  }
  active(tab) {
    dom.cl.remove(qsA('mph-tab', ntHead), 'active');
    const tabContent = qsA('mph-list', dul);
    dom.cl.add(tabContent, 'hidden');
    dom.cl.add(tab, 'active');

    const host = tab.dataset.host ?? 'about:blank';
    if (host !== 'about:blank') {
      const title = tab.dataset.title;
      const content = normalizeTarget(tabContent).filter(
        (t) => host === t.dataset.host || title === t.dataset.host
      );
      dom.cl.remove(content, 'hidden');
    }
    if (host === 'about:blank') {
      HP.refresh();
    } else if (host.startsWith('mph:')) {
      this.mph(host);
    }
  }
  /** @param { Element } tab */
  close(tab) {
    const host = tab.dataset.host;
    if (hostCache.has(host)) {
      hostCache.delete(host);
    }
    const sibling = tab.previousElementSibling ?? tab.nextElementSibling;
    if (sibling) {
      if (sibling.dataset.command !== 'new-tab') {
        this.active(sibling);
      }
    }
    if (this.Tab.has(host)) {
      const tabSet = this.Tab.get(host);
      if (tabSet.has(tab)) {
        tabSet.delete(tab);
      }
    }
    tab.remove();
  }
  make(host = undefined, text) {
    const tabCache = this.storeTab(host);
    if (typeof host === 'string') {
      if (host.startsWith('mph:')) {
        this.active(this.Tab.get(host));
        return;
      }
      const content = normalizeTarget(tabCache).filter(
        (t) => host === t.dataset.host || text === t.dataset.host
      );
      if (!isEmpty(content)) {
        return;
      }
    }
    const tab = make('mph-tab', '', {
      dataset: {
        command: 'switch-tab',
        title: text
      },
      style: `order: ${ntHead.childElementCount};`
    });
    const tabClose = make('mph-elem', '', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabBox = make('mph-host');
    tab.append(tabBox, tabClose);
    ntHead.append(tab);

    dom.cl.remove(qsA('mph-tab', ntHead), 'active');
    dom.cl.add(qsA('mph-list', dul), 'hidden');
    dom.cl.add(tab, 'active');

    this.cache(host, tab);

    if (isNull(host)) {
      tab.dataset.host = 'about:blank';
      tabBox.title = i18n$('newTab');
      const siteLoader = async (val) => {
        const value = {
          type: '',
          txt: val,
          url: ''
        };
        let qualities = [];
        const loadMedia = async (str = '') => {
          const s = str.replaceAll('\\', '');
          const media = new mphMedia(s);
          qualities = await media.autoStart(s);
          if (!isEmpty(qualities)) {
            tab.dataset.host = media.title;
            tabBox.title = media.title;
            tabBox.textContent = media.title;
            const count = make('mph-count', '', {
              textContent: ' (0)',
              dataset: {
                host: media.title ?? 'about:blank'
              }
            });
            tabBox.append(count);
            makeContainer(qualities, {
              ts: tsSrc,
              title: media.title
            });
          }
        };
        // if (val.startsWith('mph:')) {
        //   this.close(tab);
        //   if (this.Tab.has(val)) {
        //     this.active(this.Tab.get(val));
        //   } else {
        //     this.make(val);
        //   }
        //   return null;
        // } else if (val === '*') {
        //   tab.dataset.host = val;
        //   tabBox.title = '<All Sites>';
        //   tabBox.textContent = '<All Sites>';
        // }
        if (val.startsWith('http')) {
          const url = mkURL(val);
          if (objToStr(url).includes('URL')) {
            value.url = url;
            if (/onlyfans/.test(HP.current.root) && !/onlyfans/.test(url.host)) {
              throw new Error('Please navigate to "onlyfans.com"');
            }
            await loadMedia(value.url.href);
          }
        } else if (/^\/video-\w+\/[\w-.]+(?:\/(?=$))?$/i.test(val)) {
          if (/xnxx/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.xnxx.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/videos\/[a-z0-9._-]+(?:\/(?=$))?$/i.test(val)) {
          if (/xhamster/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://xhamster.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/watch\/\d+\/[\w-]+(?:\/(?=$))?$/i.test(val)) {
          if (/youporn/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.youporn.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/video\/\w+\/[\w-]+(?:\/(?=$))?$/i.test(val)) {
          if (/thumbzilla/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.thumbzilla.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/porn-video\/\d{8}(?:\/(?=$))?$/i.test(val)) {
          if (/tube8/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.tube8.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/(\d{8})?$/i.test(val)) {
          if (/redtube/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.redtube.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/(view_video\.php\?viewkey=\w+)?$/i.test(val)) {
          if (/pornhub/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.pornhub.com${val}`;
          }
          await loadMedia(value.url);
        } else if (
          /onlyfans/.test(HP.current.root) &&
          /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/(?=$))?$/i.test(val)
        ) {
          value.url = `https://onlyfans.com${val}/videos`;
          await loadMedia(value.url);
        } else if (
          /onlyfans/.test(HP.current.root) &&
          /^\/((?:[a-z0-9][a-z0-9._-]+))\/((?:media|photos|videos|audios|likes|streams|upcoming-streams))(?:\/(?=$))?$/i.test(
            val
          )
        ) {
          value.url = `https://onlyfans.com${val}`;
          await loadMedia(value.url);
        } else if (/\w{13,15}/.test(val)) {
          value.txt = val.match(/\w{13,15}/)[0];
          if (/pornhub/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}/view_video.php?viewkey=${value.txt}`;
          } else {
            value.url = `https://www.pornhub.com/view_video.php?viewkey=${value.txt}`;
          }
          await loadMedia(value.url);
        }
        // else {
        //   value.txt = HP.getHost(val);
        //   newHost = value.txt;
        //   tab.dataset.host = value.txt;
        //   tabBox.title = value.txt;
        //   tabBox.textContent = value.txt;
        // }
        if (!isEmpty(qualities)) {
          this.cache(value.txt, tab);
        }
        return qualities;
      };
      const siteSearcher = make('input', 'mph-searcher', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('newTab'),
        onchange(evt) {
          evt.preventDefault();
          siteLoader(evt.target.value).then((h) => {
            if (isEmpty(h)) {
              tabBox.title = 'An error occured';
              tabBox.textContent = 'An error occured';
              return;
            }
            siteSearcher.remove();
          });
        }
      });
      tabBox.append(siteSearcher);
      return tab;
    }
    let tabHost;
    let tabTitle;
    let tabText;
    if (typeof host === 'string' && host.startsWith('mph:')) {
      const type = host.match(/mph:(.+)/)[1];
      tabHost = host || HP.host;
      tabTitle = text || type || tabHost;
      tabText = text || tabTitle;
      this.mph(host);
    } else {
      tabHost = host || HP.host;
      tabTitle = text || host || dom.attr(qs('meta[property="og:title"]'), 'content') || HP.host;
      tabText = text || tabTitle;
    }
    tab.dataset.host = tabHost;
    tabBox.title = tabTitle;
    tabBox.textContent = tabText;
    const count = make('mph-count', '', {
      textContent: ' (0)',
      dataset: {
        host: tabHost ?? 'about:blank'
      }
    });
    tabBox.append(count);
    return tab;
  }
}
const tab = new Tabs();
const progressElem = make('h1', 'mph_progress');
const progressFrame = make('mph-elem', 'mph_progressContainer');
const frame = make('main-userjs', 'hidden', {
  dataset: {
    insertedBy: 'magic-ph',
    role: 'primary-container'
  }
});
const dContainer = make('mph-root', '', {
  async onclick(evt) {
    try {
      /** @type { Element } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const dataset = target.dataset;
      const cmd = dataset.command;
      if (cmd.startsWith('of-')) {
        if (cmd === 'of-copy') {
          const d = target.parentElement.parentElement.dataset;
          const vid = getOFQuality(d);
          if (!vid) {
            return;
          }
          await writeClipboard(vid.src);
          msg('[MagicPH] Copied URL to Clipboard', 2500);
        } else if (cmd === 'of-download') {
          const d = target.parentElement.parentElement.dataset;
          const vid = getOFQuality(d);
          if (!vid) {
            return;
          }
          const Uint8Chunks = await Network.stream(vid.src, `${cleanURL(vid.title)}.mp4`);
          const blob = new Blob([Uint8Chunks], {
            type: 'application/octet-stream'
          });
          saveAs(blob, `${cleanURL(vid.title)}.mp4`);
          msg('[MagicPH] Downloads complete!', 2500);
        } else if (cmd === 'of-remove') {
          const d = target.parentElement.parentElement.dataset;
          if (!videoCache.has(d.host)) {
            return;
          }
          msg(
            `[MagicPH] Deleted Video Id: ${d.host}`,
            2500
          );
          videoCache.delete(d.host);
          target.parentElement.parentElement.remove();
        } else if (cmd === 'remove-all') {
          videoCache.clear();
          dom.remove(qsA('.mph_of_list > .wrap'));
        } else if (cmd === 'of-copy-all') {
          const arr = [];
          for (const v of videoCache.values()) {
            for (const vid of v) {
              if (vid.quality === 'original') {
                arr.push(vid.src);
              }
            }
          }
          await writeClipboard(arr.join('\n'));
          msg('[MagicPH] Copied URLs to Clipboard', 2500);
        } else if (cmd === 'of-download-all') {
          for (const vid of videoCache.values()) {
            const params = {
              name: `${cleanURL(vid.title)}.mp4`,
              url: vid.src
            };
            if (Limit_Downloads || videoCache.size > 16 || isMobile) {
              await Network.download(params);
            } else {
              Network.download(params);
            }
            dom.remove(qs(`.mph_of_list > .wrap[data-title="${vid.title}"]`));
            videoCache.delete(vid.title);
          }
        } else if (cmd === 'of-open-tab' && dataset.webpage) {
          vueRouter.push(dataset.webpage);
          return;
        }
        ofsdwn.innerHTML = `Download (${videoCache.size})`;
        ofscopy.innerHTML = `${i18n$('copy')} (${videoCache.size})`;
        ofsRm.innerHTML = `Remove (${videoCache.size})`;
        return;
      }
      if (cmd === 'open-tab' && dataset.webpage) {
        openTab(dataset.webpage);
      } else if (cmd === 'new-tab') {
        tab.make();
      } else if (cmd === 'switch-tab') {
        tab.active(target);
      } else if (cmd === 'close-tab' && target.parentElement) {
        tab.close(target.parentElement);
      } else if (cmd === 'close') {
        dom.cl.remove(mphControls, 'hidden');
        dom.remove(qsA('video', frame));
        dom.cl.remove(frame, 'expanded');
        dom.cl.add(frame, 'hidden');
      } else if (cmd === 'copy' && dataset.webpage) {
        await writeClipboard(dataset.webpage);
        const inp = qs('input', target.parentElement);
        msg('[MagicPH] Copied URL to Clipboard', 2500);
        if (HP.host.includes('xhamster')) {
          inp.style.color = HP.theme.background;
        } else {
          inp.style.color = HP.theme.get();
        }
        await delay(2500);
        dom.attr(inp, 'style', '');
      } else if (cmd === 'download-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        const vid = videoCache.get(dataset.webpage);
        const t = cleanURL(vid.title);
        if (vid.isStr) {
          await Network.download(
            {
              name: `${t}.mp4`,
              url: dataset.webpage,
              hermes: vid.data
            },
            true
          );
          msg('[MagicPH] Download complete', 2500);
        } else {
          const a = make('a');
          a.href = dataset.webpage;
          a.download = `${t}.ts`;
          a.click();
          a.remove();
        }
      } else if (cmd === 'preview-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        if (!debug) {
          msg('[MagicPH] Disabled, WIP', 2500);
          return;
        }
        // dom.remove(qsA('video', frame));
        // const videoElem = make('video', '', {
        //   preload: 'auto'
        // });
        // dom.attr(videoElem, 'controls', '');
        // dom.attr(videoElem, 'disablepictureinpicture', '');
        // const src = make('source', '', {
        //   src: dataset.webpage,
        //   type: 'video/mp4'
        // });
        // videoElem.append(src);
        // dom.cl.add(frame, 'expanded');
        // target.parentElement.append(videoElem);
      } else if (cmd === 'load-ts' && dataset.webpage && videoCache.has(dataset.webpage)) {
        const vid = videoCache.get(dataset.webpage);
        const hc = hostCache.get(vid.title);
        const h = new mphHLS(dataset.webpage, hc.hermes, target);
        const q = await h.start();
        if (!isEmpty(q)) {
          h.msg();
          if (hc.rows.has('loadTS')) {
            hc.rows.delete('loadTS');
          }
          makeContainer(q, {
            rows: ['title', 'download'],
            $el: target
          });
        }
      }
    } catch (ex) {
      err(ex);
    }
  }
});
const msg = async (text, time) => {
  const notice = progressFrame ?? qs('.mph_progressContainer');
  if (!notice) {
    return;
  }
  const noticeElem = progressElem ?? qs('.mph_progress');
  if (!noticeElem) {
    return;
  }
  const timeout = new Timeout();

  if (!isNull(text) && !isNull(time)) {
    noticeElem.innerHTML = text;
    notice.setAttribute('style', 'display: block;');
    await timeout.set(time);
    notice.setAttribute('style', '');
    return timeout.clear(...timeout.ids);
  }

  if (typeof text === 'number' && !Number.isNaN(text)) {
    await timeout.set(text);
    notice.setAttribute('style', '');
  } else if (!isNull(text)) {
    noticeElem.innerHTML = text;
    notice.setAttribute('style', 'display: block;');
  }
  if (!isNull(time)) {
    if (isBlank(notice.style.display)) {
      notice.setAttribute('style', 'display: block;');
    }
    await timeout.set(time);
    notice.setAttribute('style', '');
  }
  return timeout.clear(...timeout.ids);
};
const getOFQuality = (d, quality = 'original') => {
  if (!videoCache.has(d.host)) {
    return null;
  }
  for (const vid of videoCache.get(d.host)) {
    if (vid.title !== d.title) {
      continue;
    }
    if (vid.quality === quality) {
      return vid;
    }
  }
  return videoCache.get(d.host)[0];
};
const mphControls = make('mph-controls', '', {
  async onclick(evt) {
    const target = evt.target;
    if (!target.dataset) {
      return;
    }
    if (!target.dataset.command) {
      return;
    }
    const cmd = target.dataset.command;
    if (cmd === 'of-copy') {
      const vid = getOFQuality();
      if (!vid) {
        return;
      }
      await writeClipboard(vid.src);
      msg('[MagicPH] Copied URL to Clipboard', 2500);
    } else if (cmd === 'of-download') {
      const vid = getOFQuality();
      if (!vid) {
        return;
      }
      await Network.download({
        name: `${cleanURL(vid.title)}.mp4`,
        url: vid.src
      });
      msg('[MagicPH] Downloads complete!', 2500);
    } else if (cmd === 'toggle-list') {
      if (dom.cl.has(mphControls, 'hidden')) {
        dom.cl.remove(mphControls, 'hidden');
        dom.cl.add(frame, 'hidden');
        return;
      }
      dom.cl.remove(frame, 'hidden');
      dom.cl.add(mphControls, 'hidden');
    }
  }
});
const dwnCounter = make('mph-count', '', {
  innerHTML: '(0)'
});
const copyCounter = make('mph-count', '', {
  innerHTML: '(0)'
});
const addToWrapper = () => {
  if (videoCache.size === 0) {
    return;
  }
  for (const [userId, userVideos] of videoCache) {
    const mphList =
    qs(`mph-list > mph-list[data-host="${userId}"]`) ??
    make('mph-list', 'mph_of_list', {
      dataset: {
        host: userId
      }
    });
    const hc = hostCache.get(userId);
    tab.make(userId);
    for (const v of userVideos) {
      if (qsA(`[data-title="${v.title}"]`, mphList).length !== 0) {
        continue;
      }

      const $el = make('mph-elem', 'wrap', {
        dataset: {
          title: v.title,
          host: userId
        }
      });
      const imgC = make('mph-a', 'self-container', {
        dataset: {
          command: 'open-tab',
          webpage: v.src
        }
      });
      const btns = make('mph-elem', 'btn-container');
      const cpBtn = make('mph-btn', 'of_btn', {
        title: i18n$('copy'),
        innerHTML: i18n$('copy'),
        dataset: {
          command: 'of-copy'
        }
      });
      const downBtn = make('mph-btn', 'of_btn', {
        title: i18n$('download'),
        innerHTML: i18n$('download'),
        dataset: {
          command: 'of-download'
        }
      });
      const rmBtn = make('mph-btn', 'of_btn', {
        title: i18n$('remove'),
        innerHTML: i18n$('remove'),
        dataset: {
          command: 'of-remove'
        }
      });
      const img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = v.poster;
      img.onload = () => {
        imgC.append(img);
      };
      const sp = make('mph-title');
      const fTitle = make('mph-a', '', {
        dataset: {
          command: 'of-open-tab',
          webpage: v.original
        },
        title: v.text,
        innerHTML: v.title
      });
      btns.prepend(cpBtn, downBtn, rmBtn);
      sp.append(fTitle);
      $el.append(btns, imgC, sp);
      if (v.duration || v.frame) {
        const moreInfo = make('mph-elem', 'more-info');
        if (v.duration) {
          const duration = make('mph-elem', '', {
            textContent: v.duration
          });
          moreInfo.append(duration);
        }
        if (v.frame) {
          const frame = make('mph-elem', '', {
            textContent: v.frame
          });
          moreInfo.append(frame);
        }
        $el.append(moreInfo);
      }
      if (!mphList.contains($el)) {
        mphList.append($el);
        hc.$elems.push($el);
      }
    }
    hostCache.set(userId, hc);
    dul.append(mphList);
    HP.updateCounters(userVideos.length, userId);
  }
}
const ofsdwn = make('mph-btn', 'of_btn', {
  title: 'Download available videos',
  textContent: 'Download ',
  dataset: {
    command: 'of-download-all'
  }
});
const ofscopy = make('mph-btn', 'of_btn', {
  title: 'Copy all available videos to clipboard',
  textContent: `${i18n$('copy')} `,
  dataset: {
    command: 'of-copy-all'
  }
});
const ofsRm = make('mph-btn', 'of_btn', {
  title: 'Remove all available videos',
  innerHTML: 'Remove All',
  dataset: {
    command: 'of-remove-all'
  }
});
const getInfo = () => {
  if (isGM) {
    if (isObj(GM_info)) {
      return GM_info;
    } else if (isObj(GM.info)) {
      return GM.info;
    }
  }
  return {
    script: {
      icon: '',
      name: 'MagicPH',
      namespace: 'https://github.com/magicoflolis/MagicPH',
      updateURL:
        'https://github.com/magicoflolis/Magic-PH/blob/master/dist/UserJS/magicph.user.js?raw=1',
      version: 'Bookmarklet'
    }
  };
};
const userjsInfo = getInfo();
const vidQuality = make('div', 'mgp_download mgp_optionSelector', {
  innerHTML: userjsInfo.script.name,
  onclick(e) {
    halt(e);
    dom.cl.remove(frame, 'hidden');
    if (isMobile) {
      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || HP.host.includes('youporn')) {
        dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
        return;
      }
      if (qs('.mgp_optionsMenu')) {
        dom.cl.remove('.mgp_optionsMenu', ['mgp_visible', 'mgp_level2']);
      }
      return;
    }
    dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
  }
});
const writeClipboard = async (txt) => {
  try {
    await navigator.clipboard.writeText(txt);
  } catch (ex) {
    err(`[Clipboard] Failed to copy: ${ex}`);
    if (isGM) {
      if (isFN(GM.setClipboard)) {
        return GM.setClipboard(txt);
      } else if (isFN(GM_setClipboard)) {
        return GM_setClipboard(txt);
      }
    }
  }
};
const cleanURL = (str = '') => {
  const invalid_chars = {
    '\\': '＼',
    '\\/': '／',
    '\\|': '｜',
    '<': '＜',
    '>': '＞',
    ':': '：',
    '*': '＊',
    '?': '？',
    '"': '＂',
    '🔞': '',
    '#': ''
  };
  return str.replace(/[\\\\/\\|<>\\*\\?:#']/g, (v) => invalid_chars[v]);
};
const sortVideos = (ma, mb) => {
  const a = +(/\d+(?=P|p\.)/.exec(ma) ?? ['0', '0'])[0];
  const b = +(/\d+(?=P|p\.)/.exec(mb) ?? ['0', '0'])[0];
  return b - a;
};
class mphHLS {
  constructor(url = 'about:blank', data = {}, $el) {
    this.url = url;
    this.baseURL = new URL(this.url);
    this.base = this.baseURL.origin + this.baseURL.pathname.replace(/\/(hls|master).m3u8/, '');
    this.data = data;
    this.$el = $el;
    this.blobQualities = [];
    this.resolutions = [];
  }

  msg(text = '') {
    if (!this.$el) {
      return;
    }
    dom.prop(this.$el, 'innerHTML', text);
  }

  static fixURL(str = '') {
    return str.replace(/m3u8\/\//g, 'm3u8/');
  }

  updateBase(str = '') {
    this.baseURL = new URL(str);
    this.base = this.baseURL.origin + this.baseURL.pathname.replace(/\/(hls|master).m3u8/, '');
    return this.base;
  }

  async build(arr = []) {
    const hlsRes = await this.req(this.url).catch(err);
    if (!hlsRes) {
      return [];
    }
    const getFromTxt = (txt) => {
      const resp = [];
      for (const line of txt.split('\n')) {
        // log('line', line);
        if (line.startsWith('http')) {
          resp.push(line);
        } else if (line.match(/(hls|index)-.*?\.m3u8/g)) {
          resp.push(line);
        } else if (line.match(/d+\.mp4\.m3u8/g)) {
          resp.push(line);
        } else if (line.match(/\d+p\.h264\.mp4\.m3u8/g)) {
          resp.push(line);
        }
      }
      return resp;
    };
    if (hlsRes.startsWith('[{') && hlsRes.endsWith('}]')) {
      const j = JSON.parse(hlsRes);
      for (const e of j) {
        if (e.format !== 'hls') {
          continue;
        }
        if (e.defaultQuality) {
          this.updateBase(e.videoUrl);
          const vRes = await this.req(e.videoUrl).catch(err);
          arr.push(...getFromTxt(vRes));
          break;
        }
      }
    } else {
      arr.push(...getFromTxt(hlsRes));
    }
    if (arr.length === 0) {
      err('Could not build');
      return arr;
    }
    return arr.sort((ma, mb) => {
      const a = +(/(\d+)p/.exec(ma) ?? ['0', '0'])[1];
      const b = +(/(\d+)p/.exec(mb) ?? ['0', '0'])[1];
      return b - a;
    });
  }

  trimStr(str = '') {
    return str.match(/[\w-]+\.\w{2,4}/) ? str.match(/[\w-]+\.\w{2,4}/)[0] : str;
  }

  async mergeRecords(res, frags = []) {
    const fragRecords = [];
    let frag;
    for (const f of frags) {
      this.msg(`[MagicPH] Merging segments for "${this.trimStr(res)}" (${this.trimStr(f)})`);
      const s = f.includes('http') ? f : `${this.base}/${f}`;
      if (/xhamster/.test(HP.current.root)) {
        frag = await this.stream(s).catch(err);
      } else {
        frag = await Network.stream(s, null, this.data).catch(err);
      }
      if (frag === null) {
        break;
      }
      fragRecords.push(frag);
    }
    return fragRecords;
  }

  async toBlob() {
    try {
      for (const res of this.resolutions) {
        this.msg(`[MagicPH] Building cache for "${this.trimStr(res)}"`);
        const u = res.startsWith('http') ? res : `${this.base}/${res}`;
        const reqUrl = /xhamster/.test(HP.current.root) ? this.baseURL.origin + res : u;
        const hlsVid = await this.req(reqUrl).catch(err);
        let frags = [];
        if (!hlsVid) {
          break;
        }
        for (const line of hlsVid.split('\n')) {
          if (line.match(/seg[\w-]+\.\w{2,4}/)) {
            frags.push(line);
          } else if (line.startsWith('http')) {
            frags.push(line);
          } else if (line.match(/hls-.*?\.ts/g)) {
            frags.push(line);
          } else if (line.match(/seg-.*?\.m4s/g)) {
            frags.push(line);
          } else if (line.match(/seg-.*?\.ts/g)) {
            frags.push(line);
          }
        }
        if (/xhamster/.test(HP.current.root)) {
          frags = frags.map((f) => {
            if (f.startsWith('/')) {
              return this.baseURL.origin + f;
            }
            return f;
          });
        }
        const fragRecords = await this.mergeRecords(res, frags);
        if (fragRecords === null) {
          return;
        }
        const blob = new Blob([arrayConcat(fragRecords)], {
          type: 'application/octet-stream'
        });
        this.blobQualities.push(blob);
        break; // We only want the highest quality
      }
    } catch (ex) {
      err(ex);
    }
    return this.blobQualities;
  }

  async start() {
    try {
      info('[MagicPH] Creating cache using "Fetch API"');
      this.msg('[MagicPH] Creating cache using "Fetch API"');
      msg('[MagicPH] Creating cache using "Fetch API"', 2500);
      this.resolutions = await this.build();
      if (isBlank(this.resolutions)) {
        this.msg('[MagicPH] Failed to cache, "resolutions" returned 0');
        msg('[MagicPH] Failed to cache, "resolutions" returned 0', 2500);
        return [];
      }
      const q = await this.toBlob();
      this.msg('[MagicPH] Cache complete!');
      msg('[MagicPH] Cache complete!', 2500);
      return q;
    } catch (ex) {
      err(ex);
      this.msg('[MagicPH] Error occured while creating cache');
      msg('[MagicPH] Error occured while creating cache', 2500);
    }
    return [];
  }

  req(str, data) {
    return Network.req(str, 'GET', 'text', data ?? this.data);
  }

  async stream(url = '') {
    try {
      const s = await Network.req(mphHLS.fixURL(url), 'GET', 'blob');
      const ab = await s.arrayBuffer();
      return new Uint8Array(ab);
    } catch (ex) {
      err(ex);
    }
    return null;
  }
}
class mphMedia {
  constructor(url) {
    if (HP.webpage !== url) {
      HP.current = url || HP.webpage.href || window.location;
    }
    this.webpage = HP.webpage.href;
    this.mediaFiles = new Set();
    this.playerId = undefined;
    this.title = 'MagicPH';
  }

  async fetchQualities(mFiles = []) {
    const blankArr = [];
    try {
      return await new Promise((resolve, reject) => {
        const testURL = mFiles;
        const mf = mFiles.filter((file) => {
          if (
            /get_media\?s=/.test(file) ||
            /media\/mp4\?s=/.test(file) ||
            /youporn|tube8/gi.test(file)
          ) {
            return true;
          }
          return false;
        });
        if (isBlank(mf)) {
          resolve(blankArr);
        }
        mFiles = [];
        Network.req(mf)
          .then((fQualites) => {
            for (const item of fQualites) {
              if (isEmpty(item.videoUrl) || Array.isArray(item.quality)) continue;
              if (/\.mp4[.?]/g.test(item.videoUrl)) {
                mFiles.push(item.videoUrl);
              }
            }
            mFiles = mFiles.sort(sortVideos);
            if (testURL[0].match(/thumbzilla/g)) {
              mFiles.push(testURL[0]);
            }
            resolve(mFiles);
          })
          .catch(reject);
      });
    } catch (ex) {
      err(ex);
      return blankArr;
    }
  }

  async mediaFinder(url, doc = document) {
    let resp;
    try {
      const handleDoc = async (htmlDocument) => {
        /** @type {HTMLElement} */
        const selected = htmlDocument.documentElement;
        if (/xhamster/.test(url)) {
          for (const s of selected.getElementsByTagName('script')) {
            if (isEmpty(s.innerHTML)) continue;
            if (s.getAttribute('id') !== 'initials-script') continue;
            const txt = s.innerHTML.toString();
            const hlsReg = /"h264":\[{"url":"(.*?)"/.exec(txt);
            if (hlsReg) {
              tsSrc = hlsReg[1].replaceAll('\\', '');
            }
            const srcReg = /"mp4":{(.*?)}/.exec(txt);
            if (!srcReg) {
              continue;
            }
            const q = srcReg[1].match(/https:.*?p.h264.mp4/g);
            if (!q) {
              continue;
            }
            const titleReg = /"titleLocalized":"(.*?)"/.exec(txt);
            if (titleReg) {
              this.title = titleReg[1];
            }
            for (const src of q) {
              this.mediaFiles.add(src.replaceAll('\\', ''));
            }
          }
          return this.mediaFiles;
        }
        for (const s of selected.getElementsByTagName('script')) {
          const txt = s.innerHTML;
          const vtReg = /"video_title":"(.*?)",/.exec(txt);
          if (vtReg) {
            if (!Object.is(vtReg[1], this.title)) {
              this.title = vtReg[1];
            }
          }
          const embedIdReg = /{"embedId":(\d+)},/.exec(txt);
          if (embedIdReg) {
            if (!Object.is(embedIdReg[1], this.playerId)) {
              this.playerId = embedIdReg[1];
            }
          }
          const siteMedia = [
            /(https:[\\/]+\D+4\?s=)+(\w|\d)+/g.test(txt),
            /https:[\\/\w.]+tube8[\\/_.?=\w\d]+media[\\/_.?=\w\d]+/gi.test(txt),
            /https:[\\/\w.]+thumbzilla[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi.test(txt),
            /media_[\d]=+[\w\d\\*/+\s]+;/g.test(txt),
            /https:[\\/\w.]+pornhub[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi.test(txt),
            /mediaDefinition: (\[.*?\]),/g.test(txt)
          ];
          if (isEmpty(siteMedia.filter((m) => m))) continue;
          const reg = /"format":"mp4",("remote":true,)?"videoUrl":"(.*?)"/.exec(txt);
          if (!reg) {
            continue;
          }
          const t = reg[2].replaceAll('\\', '');
          let mediaTxt = t;
          if (mediaTxt.startsWith('/')) {
            const u = new URL(url);
            mediaTxt = u.origin + t;
          }
          const resp = await Network.req(mediaTxt.replaceAll('\\', ''));
          for (const v of resp.map((i) => i.videoUrl)) {
            if (this.mediaFiles.has(v)) {
              continue;
            }
            this.mediaFiles.add(v);
          }
          // this.mediaFiles.add(...resp.map((i) => i.videoUrl));
          break;
        }
        return this.mediaFiles;
      };
      if (Object.is(url, window.location.href)) {
        resp = handleDoc(doc);
      } else {
        resp = handleDoc(await Network.req(url, 'GET', 'document'));
      }
      await resp;
    } catch (ex) {
      err(ex);
    }
    return resp;
  }

  async fetchVideo(url) {
    url = url ?? this.webpage.href;
    const mFiles = await this.mediaFinder(url);
    for (const m of mFiles) {
      if (this.mediaFiles.has(m)) {
        continue;
      }
      this.mediaFiles.add(m);
    }
    if (this.mediaFiles.size === 1) {
      const arr = await this.fetchQualities(this.mediaFiles);
      return arr.sort(sortVideos);
    }
    return this.mediaFiles;
  }

  async autoStart(url) {
    try {
      this.cleanup();
      const q = await this.fetchVideo(url || this.webpage);
      this.mediaFiles = smToArr(q).sort(sortVideos);
    } catch (ex) {
      err(ex);
    } finally {
      this.cacheToDom();
    }
    return this.mediaFiles;
  }

  cleanup() {
    if (isEmpty(HP.videoData)) {
      return;
    }
    this.cacheToDom();

    this.mediaFiles.clear();
    this.playerId = undefined;
    this.title = 'MagicPH';
  }

  cacheToDom() {
    if (isEmpty(HP.videoData)) {
      return;
    }
    if (isEmpty(this.playerId)) {
      return;
    }
    const obj = {
      [this.playerId]: {
        mediaFiles: [...this.mediaFiles],
        playerId: this.playerId,
        title: this.title
      }
    };
    HP.videoData = setObj(HP.videoData, obj);
    return HP.Video;
  }
}
// #region makeContainer
const makeContainer = (q = [], data = {}) => {
  if (isEmpty(q)) {
    info('Empty quality list', q);
    return;
  }
  const def = {
    mediaFiles: q,
    cache: [],
    rows: new Set(),
    $elems: [],
    hermes: data.hermes ?? {}
  };
  const vt = data.title ?? getVidTitle() ?? HP.Video.title ?? document.title ?? 'MagicPH';
  if (!tab.hasTab(HP.webpage.host)) {
    tab.make(HP.webpage.host, vt);
  }
  if (hostCache.has(vt)) {
    const hc = hostCache.get(vt);
    hc.mediaFiles.push(...q);
    hostCache.set(vt, hc);
  } else if (vt && !hostCache.has(vt)) {
    hostCache.set(vt, def);
  }
  info('Video Qualities', q);
  const hc = hostCache.get(vt) ?? {};
  const mphList = make('mph-list', 'mph-list', {
    dataset: {
      host: vt
    }
  });
  const setRows = (parentElem, val, rows = ['source', 'copy', 'download', 'open', 'preview']) => {
    if (hc.ts || data.ts) {
      rows.push('loadTS');
    }
    const elem = {
      copy: make('mph-a', '', {
        title: i18n$('copy'),
        innerHTML: `${HP.webpage.origin.match(/redtube/g) ? '' : `${iconSVG.copy} `}${i18n$('copy')}`,
        dataset: {
          command: 'copy',
          webpage: val
        }
      }),
      download: make('mph-a', '', {
        title: i18n$('download'),
        innerHTML: `${HP.webpage.origin.match(/redtube/g) ? '' : `${iconSVG.download} `}${i18n$('download')}`,
        dataset: {
          command: 'download-video',
          webpage: val
        }
      }),
      loadTS: make('mph-a', 'mph-item', {
        title: 'Get qualities from .TS file',
        innerHTML: 'Get from HLS stream',
        dataset: {
          command: 'load-ts',
          webpage: val
        }
      }),
      open: make('mph-a', '', {
        title: 'Open in new Tab',
        innerHTML: 'Open',
        dataset: {
          command: 'open-tab',
          webpage: val
        }
      }),
      preview: make('mph-a', '', {
        title: 'Preview',
        innerHTML: 'Preview',
        dataset: {
          command: 'preview-video',
          webpage: val
        }
      }),
      source: make('label'),
      title: make('mph-elem', '', {
        title: vt,
        innerHTML: vt
      })
    };
    const inp = make('input', 'mphURL', {
      value: val,
      type: 'url',
      size: '70'
    });
    dom.attr(inp, 'readonly', '');
    elem.source.append(inp);
    for (const r of rows) {
      if (!elem[r]) {
        continue;
      }
      if (r === 'loadTS' && parentElem.parentElement) {
        if (qs('[data-command="load-ts"]', parentElem.parentElement)) {
          continue;
        }
        parentElem.parentElement.prepend(elem[r]);
      } else {
        parentElem.append(elem[r]);
      }
    }
  };
  const rows = hc.rows ?? def.rows;
  if (isEmpty(data.rows)) {
    for (const r of ['source', 'copy', 'download', 'open', 'preview']) {
      if (rows.has(r)) {
        continue;
      }
      rows.add(r);
    }
  } else {
    for (const r of data.rows) {
      if (rows.has(r)) {
        continue;
      }
      rows.add(r);
    }
  }
  for (const v of q) {
    if (videoCache.has(v)) {
      continue;
    }
    const isStr = typeof v === 'string';
    const val = isStr ? v : URL.createObjectURL(v);
    const $el = data.$el ?? make('mph-elem', 'mph-item');
    videoCache.set(val, { title: vt, data, isStr, $el });
    if (!mphList.contains($el)) {
      mphList.append($el);
      hc.$elems.push($el);
    }
    if (isEmpty(data.rows)) {
      setRows($el, val);
    } else {
      setRows($el, val, data.rows);
    }
    Object.assign(hc, {
      title: vt,
      data,
      isStr,
      rows
    });
    hc.cache.push(val);
    hostCache.set(vt, hc);
  }
  dul.append(mphList);
  HP.updateCounters(q.length, vt, HP.webpage.host);
};
// #endregion
const getVidTitle = (pgUrl) => {
  const cVid = HP.Video;
  try {
    if (!isEmpty(pgUrl)) {
      HP.current = pgUrl;
    }
    const root = HP.current.root;
    if (/pornhub/.test(root)) {
      if (win.playerObjList) {
        const playerObjList = win.playerObjList;
        const embedId = playerObjList[Object.keys(playerObjList)[0]].flashvars.embedId;
        const flashvars = win[`flashvars_${embedId}`];
        cVid.title = flashvars.video_title ?? win.VIDEO_SHOW?.videoTitleOriginal;
        if (!isBlank(flashvars.mediaDefinitions)) {
          const md = flashvars.mediaDefinitions[0];
          if (md) {
            tsSrc = md.videoUrl;
          }
        }
      } else if (win.MGP) {
        const MGP = win.MGP;
        cVid.title = MGP.players[Object.keys(MGP.players)].settings().mainRoll.title;
      } else {
        cVid.title = win.VIDEO_SHOW?.videoTitleOriginal;
      }
    } else if (/redtube|youporn|tube8/.test(root)) {
      const video_player_setup = win.page_params.video_player_setup;
      const playervars = /redtube/.test(root)
        ? video_player_setup[Object.keys(video_player_setup)[0]].playervars
        : video_player_setup.playervars;
      cVid.title = playervars.video_title;
      for (const m of playervars.mediaDefinitions) {
        if (m.format !== 'hls') {
          continue;
        }
        tsSrc = m.videoUrl.startsWith('/') ? HP.webpage.origin + m.videoUrl : m.videoUrl;
        break;
      }
    } else if (/thumbzilla/.test(root)) {
      const video_vars = win.video_vars;
      cVid.title = video_vars.video_title;
      for (const e of video_vars.mediaDefinitions) {
        if (e.format !== 'hls') {
          continue;
        }
        if (e.defaultQuality) {
          tsSrc = e.videoUrl;
          break;
        }
      }
    }
  } catch (ex) {
    err(ex);
  }
  return cVid.title;
};
const geekVideos = async (doc = document, pgUrl) => {
  try {
    const loc = isEmpty(pgUrl) ? HP.webpage : mkURL(pgUrl);
    const media = new mphMedia(loc);
    const qualities = await media.autoStart();
    if (isEmpty(qualities)) {
      info('Empty quality list', qualities);
      return;
    }
    const vt = media.title ?? getVidTitle(pgUrl) ?? doc.title;
    makeContainer(qualities, {
      ts: tsSrc,
      title: vt
    });

    await query('.mgp_container');

    let injInto = doc.documentElement;
    if (isMobile) {
      dom.cl.add(vidQuality, 'mgp_selector');
      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || /youporn/.test(loc.host)) {
        info('Detected tablet...');
        const vidFrame = await query('div.mgp_options');
        if (!vidFrame.contains(vidQuality)) {
          vidFrame.append(vidQuality);
        }
        dom.cl.add(vidQuality, 'mgp_optionsBtn');
        dom.prop(vidQuality, 'innerHTML', iconSVG.mobileDownload);
        return;
      }
      const injVid = qs('ul.mgp_switches') || qs('ul.mgp_optionsSwitches');
      if (!injInto.contains(vidQuality)) {
        injVid.prepend(vidQuality);
        info('Detected mobile...');
        dom.prop(
          vidQuality,
          'innerHTML',
          `${iconSVG.mobileDownload}<div class="mgp_value">Quality(s)</div>`
        );
        const cfgHeader = qs('.mgp_subPage') ? qs('.mgp_subPage').firstElementChild : null;
        ael(qs('.mgp_options > .mgp_optionsBtn'), 'click', () => {
          dom.prop(cfgHeader, 'innerHTML', 'Settings');
          dom.cl.remove(qs('.mgp_optionsMenu'), 'mgp_level2');
        });
        ael(cfgHeader, 'click', () => {
          dom.prop(cfgHeader, 'innerHTML', 'Settings');
          dom.cl.remove(qs('.mgp_optionsMenu'), 'mgp_level2');
        });
        return;
      }
    }
    if (qs('.mgp_contextMenu .mgp_content')) {
      injInto = qs('.mgp_contextMenu .mgp_content');
    } else if (qs('.mgp_contextMenu .mgp_contextContent')) {
      injInto = qs('.mgp_contextMenu .mgp_contextContent');
    }
    if (!injInto.contains(vidQuality)) {
      info('Detected desktop...');
      injInto.prepend(vidQuality);
    }
  } catch (ex) {
    err(ex);
  }
};
const geekGifs = async (doc = document) => {
  const qualities = [];
  try {
    let vt;
    for (const s of doc.getElementsByTagName('script')) {
      if (isEmpty(s.innerHTML)) continue;
      if (s.getAttribute('type') !== 'application/ld+json') continue;
      const txt = s.innerHTML.toString();
      const j = JSON.parse(txt);
      if (isEmpty(vt) && j.name) {
        vt = j.name;
      }
      if (j.contentUrl) {
        qualities.push(j.contentUrl);
      } else if (j.thumbnailUrl) {
        qualities.push(j.thumbnailUrl);
      }
    }
    if (isEmpty(qualities)) {
      info('Empty quality list', qualities);
      return;
    }
    makeContainer(qualities, {
      rows: ['source', 'copy', 'download', 'open'],
      title: vt
    });
    let injInto = doc.documentElement;
    if (qs('[id="js-gifWebMWrapper"]')) {
      injInto = qs('[id="js-gifWebMWrapper"]').parentElement;
    }
    injInto.prepend(vidQuality);
  } catch (ex) {
    err(ex);
  }
};
const geekShorts = async (doc = document) => {
  try {
    const cache = [];
    let currentPage = 1;
    let direction = '';
    if (HP.host.includes('pornhub')) {
      const requestToken = qs('.slider-container').dataset.token;
      const makeData = async (JSON_SHORTIES) => {
        for (const s of normalizeTarget(JSON_SHORTIES)) {
          const media = s.mediaDefinitions.filter((i) => i.format === 'mp4');
          const q = await Network.req(media[0].videoUrl);
          if (!Array.isArray(q)) {
            continue;
          }
          const qualities = q
            .map((i) => i.videoUrl)
            .filter((i) => !cache.includes(i))
            .sort(sortVideos);
          if (isEmpty(qualities)) {
            continue;
          }
          cache.push(...qualities);
          makeContainer(qualities, {
            title: s.videoTitle,
            rows: ['title', 'source', 'copy', 'download', 'open']
          });
        }
      };
      const loadPage = async (page = 1) => {
        let JSON_SHORTIES = win.JSON_SHORTIES ?? [];
        if (page > 1) {
          const sURL =
            '/shorties/get?' +
            new URLSearchParams({
              token: requestToken,
              page
            });
          JSON_SHORTIES = await Network.req(sURL);
        }
        await makeData(JSON_SHORTIES);
      };
      let t = window.scrollY;
      window.addEventListener('scroll', async () => {
        const { scrollTop: e, scrollHeight: h, clientHeight: a } = doc.documentElement;
        if (h - 5 <= e + a) {
          currentPage += 1;
          if (direction === 'next') {
            await loadPage(currentPage);
          }
        }
        if (t < window.scrollY) {
          direction = 'next';
        } else {
          direction = 'previous';
        }
        t = window.scrollY;
      });
      await loadPage(currentPage);
    }
    let injInto = doc.documentElement;
    if (qs('.wrapper > .container')) {
      injInto = qs('.wrapper > .container');
    }
    injInto.prepend(vidQuality);
  } catch (ex) {
    err(ex);
  }
};
const triggerHls = async (id) => {
  if (!id) {
    const ma = qs('meta[name="twitter:image"]').content.match(/\/(\d+)\//);
    id = ma ? ma[1] : location.pathname.replace(/\/-0/, '');
  }
  const req = await Network.req(`https://store.externulls.com/facts/file/${id}`);
  const hls_resources = req.file.hls_resources;
  const fl_cdn = hls_resources[Object.keys(hls_resources)[0]];
  const hls = new mphHLS(`https://video.externulls.com/${fl_cdn}`);
  const frags = await hls.build();
  const m = await hls.mergeRecords(fl_cdn, frags);
  const blob = new Blob([arrayConcat(m)], {
    type: 'application/octet-stream'
  });
  msg('[MagicPH] Cache complete!', 2500);
  makeContainer([blob], {
    rows: ['title', 'download'],
    title: req.file.stuff.sf_name
  });
  const injInto = qs('.XContentViewer__details__actions');
  if (injInto) {
    injInto.append(vidQuality);
  }
};
mph.SafeAnimationFrame = class {
  constructor(callback) {
    this.fid = this.tid = undefined;
    this.callback = callback;
  }
  start(delay) {
    if (delay === undefined) {
      if (this.fid === undefined) {
        this.fid = requestAnimationFrame(() => {
          this.onRAF();
        });
      }
      if (this.tid === undefined) {
        this.tid = setTimeout(() => {
          this.onSTO();
        }, 20000);
      }
      return;
    }
    if (this.fid === undefined && this.tid === undefined) {
      this.tid = setTimeout(() => {
        this.macroToMicro();
      }, delay);
    }
  }
  clear() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
  }
  macroToMicro() {
    this.tid = undefined;
    this.start();
  }
  onRAF() {
    if (this.tid !== undefined) {
      clearTimeout(this.tid);
      this.tid = undefined;
    }
    this.fid = undefined;
    this.callback();
  }
  onSTO() {
    if (this.fid !== undefined) {
      cancelAnimationFrame(this.fid);
      this.fid = undefined;
    }
    this.tid = undefined;
    this.callback();
  }
};
// #region Site Director
const mainUserJS = async (doc = document) => {
  try {
    const current = HP.current;
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    if (/onlyfans/.test(current.root)) {
      const app = await query('[id="app"]');
      while (isNull(app.__vue__)) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      const appVue = app.__vue__;
      const videoPosts = new Set();
      const ofMedia = new Set();
      /**
       * @param { any[] } postArr
       */
      const filterPosts = (postArr) => {
        const media = postArr.filter((i) => {
          if (isNull(i)) {
            return false;
          }
          if (
            normalizeTarget(i?.media).filter((m) => m.type === 'video' && (m.src || m.full))
              .length === 0
          ) {
            return false;
          }
          return true;
        });
        if (media.length === 0) {
          return;
        }
        const mediaObj = media.map((i) => {
          const obj = {
            ...i,
            media: normalizeTarget(i.media)
              .filter((m) => m.type === 'video')
              .map((m) => {
                return { ...m };
              })
          };
          if (obj.chatId && ofUsers[obj.chatId]) {
            obj.userData = ofUsers[obj.chatId];
          } else if (obj.fromUser && ofUsers[obj.fromUser]) {
            obj.userData = ofUsers[obj.fromUser];
          } else if (obj.withUser && ofUsers[obj.withUser]) {
            obj.userData = ofUsers[obj.withUser];
          } else if (obj.author && ofUsers[obj.author]) {
            obj.userData = ofUsers[obj.author];
          }
          return obj;
        });
        for (const p of mediaObj) {
          if (videoPosts.has(p.id)) {
            continue;
          }
          videoPosts.add(p.id);
          if (!p.userData?.name) {
            continue;
          }
          const userData = p.userData;
          if (!videoCache.has(userData.name)) {
            videoCache.set(userData.name, []);
          }
          const vid = videoCache.get(userData.name) || [];
          if (vid.filter(v => v.id === p.id).length !== 0) {
            continue;
          }
          if (!hostCache.has(userData.name)) {
            hostCache.set(userData.name, {
              mediaFiles: [],
              cache: [],
              $elems: []
            });
          };
          for (const m of normalizeTarget(p.media)) {
            const videoId = `${m.id}`;
            const createVideo = () => {
              const vidObj = {
                poster: m.thumb,
                quality: 'original',
                src: m.full,
                title: videoId,
                userId: userData.id,
                username: userData.name,
                name: userData.name,
                user: userData,
                duration: m.source.duration ? fancyTimeFormat(m.source.duration) : null,
                frame: m.source.width ? ` (${m.source.width}x${m.source.height})` : null,
                original:
                  p.responseType === 'post'
                    ? `/${p.id}/${userData.username}`
                    : p.responseType === 'message'
                      ? `/my/chats/chat/${userData.id}/`
                      : `/${p.id}`,
                text: p.text ?? null,
                raw: p
              };
              if (vidObj.src) {
                vidObj.src = m.full;
                if (ofMedia.has(vidObj)) {
                  return null;
                }
                ofMedia.add(vidObj);
                vid.push(vidObj);
                if (vidObj?.userId) {
                  for (const e of qsA(`mph-count[data-host="${vidObj.userId}"]`)) {
                    dom.text(e.parentElement, vidObj.userId);
                  }
                }
              } else if (m.videoSources) {
                for (const [k, v] of Object.entries(m.videoSources)) {
                  if (isNull(v)) {
                    continue;
                  }
                  vidObj.quality = k;
                  vidObj.src = v;
                  if (ofMedia.has(vidObj)) {
                    return null;
                  }
                  ofMedia.add(vidObj);
                  vid.push(vidObj);
                }
              }
              return vidObj;
            };
            const video = createVideo();
            if (isNull(video)) {
              continue;
            }
          }
          if (vid.length !== 0) {
            videoCache.set(userData.name, vid);
          }
        }
        dbg('toGrab', {videoCache, ofMedia, hostCache});
        addToWrapper();
      };
      appVue.$store.watch((a) => {
        // dbg(a.router.route.to);
        const userId = a.router.route.to.params?.userId ?? 'onlyfans';
        if (userId !== currentUserId) {
          currentUserId = userId;
        }
        if (a.users?.items) {
          for (const c of Object.values(a.users.items)) {
            if (!hostCache.has(c.name)) {
              hostCache.set(c.name, {
                mediaFiles: [],
                cache: [],
                $elems: []
              });
            }
            if (ofUsers[c.id]) {
              continue;
            }
            ofUsers[c.id] = c;
          }
        }
        const toGrab = [];
        if (a.posts?.items) {
          toGrab.push(...Object.values(a.posts?.items));
        }
        if (a.chats?.messages) {
          const messages = a.chats.messages;
          if (a.chats?.items) {
            for (const c of Object.values(a.chats.items)) {
              for (const m of c.messages) {
                if (!messages[m]) {
                  continue;
                }
                toGrab.push(messages[m]);
              }
            }
          }
          toGrab.push(...Object.values(messages));
        }
        if (toGrab.length !== 0) {
          filterPosts(toGrab);
        }
      });
      vueRouter = appVue._routerRoot['$options'].router.history;
    } else if (/xnxx|xvideos/.test(current.root)) {
      while (isNull(win.html5player)) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      if (!win.Hls.isSupported()) {
        return;
      }
      const html5player = win.html5player;
      const hls = html5player.hlsobj;
      const h = new mphHLS(hls.url);
      const q = await h.start();
      if (isEmpty(q)) {
        info('Empty quality list', q);
        return;
      }
      makeContainer(q, {
        rows: ['title', 'download'],
        ts: tsSrc,
        title: cleanURL(html5player.video_title ?? doc.title)
      });
      const injInto = /xvideos/.test(HP.current.root) ? qs('div.tabs') : qs('div.video-title');
      if (injInto) {
        injInto.append(vidQuality);
      }
    } else if (/xhamster/.test(current.root)) {
      const media = new mphMedia(HP.webpage.href);
      const qualities = await media.autoStart(HP.webpage.href);
      const vt = media.title ?? doc.title;
      makeContainer(qualities, {
        hermes: {
          credentials: 'omit',
          referrer: `${HP.webpage.protocol}//${HP.host}`
        },
        ts: tsSrc,
        title: vt
      });
      const menu = qs(isMobile ? '.xplayer-menu-mobile-bottom-left' : '.xp-context-menu');
      if (menu) {
        menu.prepend(vidQuality);
      }
    } else if (current.pathType === 'Video') {
      await geekVideos(doc);
    } else if (current.pathType === 'GIF') {
      await geekGifs(doc);
    } else if (current.pathType === 'Shorties') {
      await geekShorts(doc);
    } else if (/beeg/.test(current.root)) {
      observe(doc, (mutations) => {
        try {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType !== 1) {
                continue;
              }
              if (ignoreTags.has(node.localName)) {
                continue;
              }
              if (node.parentElement === null) {
                continue;
              }
              if (!(node instanceof HTMLElement)) {
                continue;
              }
              if (node.localName === 'div' && dom.cl.has(node, 'x-player__video')) {
                const p = node.parentElement.parentElement;
                if (qs('img[src]', p)) {
                  const ma = qs('img[src]', p).src.match(/\/(\d+)\//);
                  if (ma) {
                    triggerHls(ma[1]);
                    continue;
                  }
                }
                triggerHls();
              }
            }
          }
        } catch (ex) {
          err(ex);
        }
      });
    }
    if (!/onlyfans/.test(current.root)) {
      tab.make(HP.webpage.host);
    }
  } catch (ex) {
    err(ex);
  }
};
const initUserJS = (doc) => {
  if (window.location === null) {
    err('"window.location" is null, reload the webpage or use a different one');
    return;
  }
  if (doc === null) {
    err('"doc" is null, reload the webpage or use a different one');
    return;
  }
  if (HP.injected) {
    return;
  }
  HP.injected = true;

  info(`Site: ${HP.webpage.origin} isMobile: ${isMobile}`);

  if (isMobile) {
    dom.cl.add([frame, mphControls, dul], 'mph_mobile');
    // Prevents being redirected to "Continue to video"
    if (HP.host.includes('pornhub')) {
      const makeCookie = (name, value, options = {}) => {
        try {
          Object.assign(options, {
            path: '/'
          });
          if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
          }
          let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
          for (const key in options) {
            updatedCookie += `; ${key}`;
            const optionValue = options[key];
            if (optionValue !== true) {
              updatedCookie += `=${optionValue}`;
            }
          }
          document.cookie = updatedCookie;
          info('[makeCookie] New cookie value:', updatedCookie);
          return updatedCookie;
        } catch (ex) {
          err(ex);
        }
        return '';
      };
      makeCookie('views', '0', { domain: `.${HP.host}` });
      // If we are on `/interstitial?viewkey=`
      if (isFN(win.clearModalCookie) && HP.webpage.searchParams.has('viewkey')) {
        const videoURL = `${HP.webpage.origin}/view_video.php?viewkey=${HP.webpage.searchParams.get('viewkey')}`;
        info(`Redirecting to "${videoURL}"`);
        window.location.href = videoURL;
        return;
      }
    }
  }
  const injectedCore = loadCSS(downloadCSS, 'core');
  if (!injectedCore) {
    throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
  }
  const overlay = make('mph-elem', 'mph_overlay');
  const header = make('mph-elem', 'mph_list_header');
  const closeVQ = make('mph-elem', 'mgp_title', {
    innerHTML: userjsInfo.script.name
  });
  const closeHM = make('mph-close', '', {
    innerHTML: '🗙',
    dataset: {
      command: 'close'
    }
  });
  const ntAdd = make('mph-addtab', '', {
    textContent: '+',
    dataset: {
      command: 'new-tab'
    }
  });
  const listToggle = make('mph-btn', 'of_btn', {
    title: 'Hide/show list',
    textContent: 'Show List ',
    dataset: {
      command: 'toggle-list'
    }
  });
  const listCounter = make('mph-count', '', {
    textContent: '(0)'
  });
  listToggle.append(listCounter);
  ntHead.append(ntAdd);
  header.append(closeVQ, closeHM);
  dContainer.append(header, ntHead, dul);
  frame.append(dContainer);
  mphControls.append(overlay);
  if (/onlyfans/.test(HP.current.root)) {
    const ofsHeader = make('mph-elem', 'mph_of_header');
    ofsHeader.append(ofscopy, ofsdwn);
    header.append(ofsHeader);
    ofscopy.append(copyCounter);
    ofsdwn.append(dwnCounter);
  }
  mphControls.append(listToggle);
  progressFrame.append(progressElem);
  doc.documentElement.append(frame, progressFrame, mphControls);
  mainUserJS(doc);
};
// #endregion
/**
 * @template { Function } F
 * @param { (this: F, doc: Document) => any } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (!isFN(onDomReady)) {
    return;
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    onDomReady.call({}, document);
  }
  document.addEventListener('DOMContentLoaded', (evt) => onDomReady.call({}, evt.target), {
    once: true
  });
};
loadDOM(initUserJS);
