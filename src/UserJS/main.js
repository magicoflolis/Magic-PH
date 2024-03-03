let userjs = (self.userjs = {});
let mediaFiles = [];
let loggin;
let vidTitle;
let currentVideoId;
// Skip text/plain documents.
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
// #region Console Logs
const dbg = (...msg) => {
  if (!debug) return;
  const dt = new Date();
  console.debug(
    '[%cMagicPH%c] %cINF',
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
  let alertBrowser = false;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex) {
      alertBrowser = true;
      break;
    }
  }
  if (isMobile || alertBrowser) {
    alert(...msg);
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
// eslint-disable-next-line no-unused-vars
const log = (...msg) => {
  console.log(
    '[%cMagicPH%c] %cDBG',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(255, 212, 0);',
    ...msg
  );
};
const table = (...msg) => console.table(...msg);
// #endregion
const Supports = {
  gm: typeof GM !== 'undefined',
  uwin: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
};
/**
 * Object is typeof `Element`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isElem = (obj) => {
  // const s = /** @type { string } */ (Object.prototype.toString.call(obj));
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Element');
};
/**
 * Object is typeof `object` / JSON Object
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isObj = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Object');
};
/**
 * Object is typeof `Function`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isFN = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Function');
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @template O
 * @param { O } obj
 * @returns { boolean }
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
 * Object is Empty
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @template T
 * @param { T } target
 * @param { boolean } toQuery
 * @returns { T[] }
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
/**
 * preventDefault + stopPropagation
 * @param { Event } evt - Selected Element
 */
const halt = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
};
/**
 * Add Event Listener
 * @template { HTMLElement } E
 * @template { keyof HTMLElementEventMap } K
 * @param { E } el
 * @param { K } event
 * @param { (this: E, ev: HTMLElementEventMap[K]) => any } callback
 * @param { boolean | AddEventListenerOptions } options
 */
const ael = (el, event, callback, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (isMobile && event === 'click') {
        event = 'mouseup';
        elem.addEventListener('touchstart', callback);
        elem.addEventListener('touchend', callback);
      }
      if (event === 'fclick') {
        event = 'click';
      }
      elem.addEventListener(event, callback, options);
    }
  } catch (ex) {
    err(ex);
  }
};
/**
 * Prefix for `document.querySelectorAll()`
 * @template { Element } E
 * @param { string } selectors - Elements for query selection
 * @param { E } root - Root selector Element
 * @returns { NodeListOf<E> }
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
 * Prefix for `document.querySelector()`
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { E | null }
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
 * Prefix for `document.querySelector()` w/ Promise
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { Promise<E | null> }
 */
const query = async (selector, root) => {
  let el = null;
  try {
    el = root || document;
    while (isNull(el.querySelector(selector))) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return el.querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return el;
};
/**
 * Form Attributes of Element
 * @template { keyof HTMLElementTagNameMap } K
 * @param { K } elem
 * @param { keyof HTMLElement } attr
 */
const formAttrs = (elem, attr = {}) => {
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
};
/**
 * Make Element
 * @template { keyof HTMLElementTagNameMap } K
 * @param { K } tagName
 * @param { string } cname
 * @param { keyof HTMLElement } attrs
 * @returns { HTMLElementTagNameMap[K] }
 */
const make = (tagName, cname, attrs = {}) => {
  let el = null;
  try {
    el = document.createElement(tagName);
    if (typeof cname === 'string' && !isEmpty(cname)) {
      el.className = cname;
    }
    if (!isEmpty(attrs)) {
      formAttrs(el, attrs);
    }
  } catch (ex) {
    err(ex);
  }
  return el;
};
/**
 * Inject CSS (Cascading Style Sheet Document) into `document.head`
 * @param { string } css - CSS to inject
 * @param { string } name - (optional) Name of stylesheet `mph-`
 * @param { * } root - (optional) Custom `document.head` path
 * @return { HTMLStyleElement | null } Style element
 */
const loadCSS = (css, name = 'CSS', root = document) => {
  /** @type {Element} */
  let el;
  try {
    if (typeof css !== 'string') {
      throw new Error('[loadCSS] "css" must be a typeof "String"');
    }
    if (typeof name !== 'string') {
      throw new Error('[loadCSS] "name" must be a typeof "String"');
    }
    el =
      root ||
      document ||
      document.querySelector(':root') ||
      document.documentElement ||
      document.head ||
      document.body;
    const head = Object.is(root, document.head) ? root : el.querySelector('head') ?? document.head;
    if (isBlank(css)) {
      throw new Error(`[loadCSS] "${name}" contains empty CSS string`);
    }
    if (!head) {
      throw new Error(`[loadCSS] Unable to locate "head", got "${head}"`);
    }
    for (const s of el.querySelectorAll('head > style')) {
      if (!s.dataset) {
        continue;
      }
      if (!s.dataset.role) {
        continue;
      }
      if (Object.is(s.dataset.role, name)) {
        return s;
      }
    }
    const sty = make('style', `mph-${name}`, {
      textContent: css,
      dataset: {
        insertedBy: 'MagicPH',
        role: name
      }
    });
    if (!isEmpty(root.shadowRoot)) {
      root.shadowRoot.appendChild(sty);
    } else {
      head.appendChild(sty);
    }
    return sty;
  } catch (ex) {
    err(ex);
  }
  return null;
};
const delay = (timeout = 5000) => new Promise((resolve) => setTimeout(resolve, timeout));
/**
 * @template { HTMLElement } E
 * @param { E } element
 * @param { (this: E, ev: MutationRecord[]) => any } callback
 * @param { MutationObserverInit } options
 * @returns { MutationObserver }
 */
const observe = (element, callback, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(callback);
  callback([], observer);
  observer.observe(element, options);
  return observer;
};

// #region Classes
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
   * @template { HTMLElementTagNameMap } K
   * @param { K } a
   * @returns { HTMLElementTagNameMap[K] }
   */
  static create(a) {
    if (typeof a === 'string') {
      return document.createElement(a);
    }
    throw new Error('"a" must be a typeof "String"');
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
// #endregion

const win = Supports.uwin;
const origin = window.location.origin;
const pathname = window.location.pathname;
const l = {
  ofs: origin.includes('onlyfans'),
  ph: origin.includes('pornhub') && pathname.match(/view_video/gi),
  rt: origin.includes('redtube') && pathname.match(/[0-9]+/gi),
  t8: origin.includes('tube8') && pathname.match(/porn-video[/0-9]+/gi),
  tz: origin.includes('thumbzilla') && pathname.match(/video[/A-Z0-9-]+/gi),
  xham: origin.includes('xhamster'),
  xnxx: origin.includes('xnxx'),
  xvid: origin.includes('xvideos'),
  yp: origin.includes('youporn') //&& pathname.match(/watch\/\d+/gi)
};
const siteTheme = {
  background: null,
  border: null,
  color: null,
  hover: null,
  get() {
    return this.color !== null ? this.color : this.find();
  },
  find() {
    if (l.ph) {
      this.color = 'hsl(36, 100%, 50%)';
      this.hover = 'hsl(36, 100%, 35%)';
      this.background = 'hsl(0, 0%, 0%)';
      this.border = this.color;
    } else if (l.t8) {
      this.color = 'hsl(201, 64%, 40%)';
      this.hover = 'hsl(201, 64%, 25%)';
      this.background = 'hsl(0, 0%, 0%)';
      this.border = this.color;
    } else if (l.tz) {
      this.color = 'hsl(168, 75%, 42%)';
      this.hover = 'hsl(168, 75%, 27%)';
      this.background = 'hsl(0, 0%, 0%)';
      this.border = this.color;
    } else if (l.rt) {
      this.color = 'hsl(357, 76%, 39%)';
      this.hover = 'hsl(357, 76%, 24%)';
      this.background = 'hsl(0, 0%, 0%)';
      this.border = this.color;
    } else if (l.yp) {
      this.color = 'hsl(345, 80%, 63%)';
      this.hover = 'hsl(345, 80%, 48%)';
      this.background = 'hsl(0, 0%, 0%)';
      this.border = this.color;
    } else if (l.ofs) {
      this.color = 'var(--text-color)';
      this.hover = 'var(--swiper-theme-color, hsl(196, 100%, 32%))';
      this.background = 'rgba(138,150,163,.12)';
      this.border = this.background;
    } else if (l.xham) {
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
    if (!this.color) {
      this.get();
    }
    qs(':root').style.setProperty('--mph-site-color', this.color);
    if (this.hover) {
      qs(':root').style.setProperty('--mph-hover-color', this.hover);
    }
    if (this.background) {
      qs(':root').style.setProperty('--mph-background-color', this.background);
    }
    if (this.border) {
      qs(':root').style.setProperty('--mph-border-color', this.border);
    }
    return this.color;
  }
};
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
/**
 * @template { string } S
 * @param { S } str
 * @param { boolean } lowerCase
 * @returns { S }
 */
const bscStr = (str = '', lowerCase = true) => {
  const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
  return txt.replaceAll(/\W/g, '');
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
   * @param { GM.Request['responseType'] | 'buffer' | 'json' | 'text' | 'blob' | 'document' } responseType - Response type
   * @param { RequestInit | GM.Request | XMLHttpRequest } data - Fetch parameters
   * @param { boolean } useFetch
   * @returns { Promise<Response> } Fetch results
   */
  async req(url, method = 'GET', responseType = 'json', data = {}, useFetch = false) {
    try {
      if (isEmpty(url)) {
        throw new Error('"url" parameter is empty');
      }
      method = bscStr(method, false);
      responseType = bscStr(responseType);
      const params = {
        method,
        ...data
      };
      if (Supports.gm && !useFetch) {
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
         * @param { Response } response
         * @returns { Response | Document }
         */
        const fetchResp = (response_1) => {
          if (!response_1.ok) reject(response_1);
          const check = (str_2 = 'text') => {
            return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
          };
          if (responseType.match(/buffer/i)) {
            resolve(check('arrayBuffer'));
          } else if (responseType.match(/json/i)) {
            resolve(check('json'));
          } else if (responseType.match(/text/i)) {
            resolve(check('text'));
          } else if (responseType.match(/blob/i)) {
            resolve(check('blob'));
          } else if (responseType.match(/formdata/i)) {
            resolve(check('formData'));
          } else if (responseType.match(/clone/i)) {
            resolve(check('clone'));
          } else if (responseType.match(/document/i) && isFN(response_1.text)) {
            const domParser = new DOMParser();
            const respTxt = response_1.text();
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
        if (responseType.match(/buffer/i)) {
          fetch(url, params).then(fetchResp).catch(reject);
        } else if (Supports.gm && !useFetch) {
          Network.xmlRequest({
            url,
            responseType,
            ...params,
            onerror: reject,
            onload: (r_1) => {
              if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
              if (responseType.match(/basic/i)) resolve(r_1);
              resolve(r_1.response);
            }
          });
        } else {
          fetch(url, params).then(fetchResp).catch(reject);
        }
      });
    } catch (ex) {
      return err(ex);
    }
  },
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
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  /**
   * @param { GM.Request } details
   * @returns { Promise<void> }
   */
  xmlRequest(details) {
    if (Supports.gm) {
      return GM.xmlHttpRequest(details);
    }
    try {
      return new Promise((resolve, reject) => {
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
            if (value.match(/buffer|blob|document|json|text/i)) {
              if (value.match(/buffer/i)) {
                req.responseType = 'arraybuffer';
              } else {
                req.responseType = value;
              }
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
    } catch (ex) {
      err(ex);
    }
  }
};
const Tab = {
  open(
    url,
    params = {
      active: true,
      insert: true
    },
    features
  ) {
    if (!Supports.gm && isBlank(params)) {
      params = '_blank';
    }
    if (features) {
      return window.open(url, params, features);
    }
    return Supports.gm ? GM.openInTab(url, params) : window.open(url, params);
  }
};

const videoCache = new Map();


const progressElem = make('h1', 'mph_progress');
const progressFrame = make('div', 'mph_progressContainer');

const frame = make('main-userjs', 'hidden', {
  dataset: {
    insertedBy: 'magic-ph',
    role: 'primary-container'
  },
});
const dContainer = make('mph-elem', 'mgp_downloadInfo', {
  async click(evt) {
    try {
      /** @type { Element } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const dataset = target.dataset;
      const cmd = dataset.command;
      if (cmd === 'open-tab' && dataset.webpage) {
        Tab.open(dataset.webpage);
      } else if (cmd === 'close') {
        dom.remove(qsA('video', frame));
        dom.cl.remove(frame, 'expanded');
        dom.cl.add(frame, 'hidden');
      } else if (cmd === 'copy' && dataset.webpage) {
        await setClipboard(dataset.webpage);
        const inp = qs('input', target.parentElement);
        msg('[MagicPH] Copied URL to Clipboard', 2500);
        if (l.xham) {
          inp.style.color = siteTheme.background;
        } else {
          inp.style.color = siteTheme.get();
        }
        await delay(2500);
        dom.attr(inp, 'style', '');
      } else if (cmd === 'download-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        const vid = videoCache.get(dataset.webpage);
        msg(`[MagicPH] Downloading Video "${vid.title}"`);
        await fetchStream(dataset.webpage, vid.title, vid.data);
        msg('[MagicPH] Download complete', 2500);
      } else if (cmd === 'preview-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        msg('[MagicPH] Disabled, WIP', 2500);
        // dom.remove(qsA('video', frame));
        // const videoElem = make('video', '', {
        //   preload: 'auto'
        // });
        // dom.attr(videoElem, 'controls', '');
        // dom.attr(videoElem, 'disablepictureinpicture', '');
        // const src = make('source', '', {
        //   src: dataset.webpage,
        //   type: 'video/mp4',
        // });
        // videoElem.append(src);
        // dom.cl.add(frame, 'expanded');
        // qs('.mph-list').append(videoElem);
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
const ofVideos = new Map();
const getOFQuality = (key, quality = 'original') => {
  if (!ofVideos.has(key)) {
    return null;
  }
  for (const vid of ofVideos.get(key)) {
    if (vid.quality === quality) {
      return vid;
    }
  }
};
const ofsContainer = make('div', 'mph_ofsContainer', {
  style: isMobile ? 'display: none;' : '',
  onclick: async (evt) => {
    const target = evt.target;
    if (!target.dataset) {
      return;
    }
    if (!target.dataset.command) {
      return;
    }
    const cmd = target.dataset.command;
    if (cmd === 'copy') {
      const vid = getOFQuality(currentVideoId);
      if (!vid) {
        return;
      }
      await setClipboard(vid.src);
      msg('[MagicPH] Copied URL to Clipboard', 2500);
    } else if (cmd === 'download') {
      const vid = getOFQuality(currentVideoId);
      if (!vid) {
        return;
      }
      info('Downloading Video Id:', vid);
      msg(`[MagicPH] Downloading Video Id: ${vid.title}`);
      await fetchStream(vid.src, vid.title);
      msg('[MagicPH] Downloads complete!', 2500);
    } else if (cmd === 'toggle') {
      if (target.innerHTML === 'Hide List') {
        dom.cl.add(frame, 'hidden');
        target.innerHTML = 'Show List';
        return;
      }
      dom.cl.remove(frame, 'hidden');
      target.innerHTML = 'Hide List';
      populateList();
    }
  }
});
const ofsHeader = make('div', 'mph_of_header');
const ofsLS = make('div', 'mph_of_list', {
  onclick: async (evt) => {
    const target = evt.target;
    dbg('target', target);
    if (target.classList.contains('mph_of_list')) {
      dom.cl.add(frame, 'hidden');
      ofsLSToggle.innerHTML = 'Show List';
    }
    if (!target.dataset) {
      return;
    }
    if (!target.dataset.command) {
      return;
    }
    const cmd = target.dataset.command;
    if (cmd === 'copy') {
      const vid = getOFQuality(target.parentElement.parentElement.dataset.title);
      if (!vid) {
        return;
      }
      await setClipboard(vid.src);
      msg('[MagicPH] Copied URL to Clipboard', 2500);
    } else if (cmd === 'download') {
      const vid = getOFQuality(target.parentElement.parentElement.dataset.title);
      if (!vid) {
        return;
      }
      info('Downloading Video Id:', vid);
      msg(`[MagicPH] Downloading Video Id: ${vid.title}`);
      await fetchStream(vid.src, vid.title);
      msg('[MagicPH] Downloads complete!', 2500);
    } else if (cmd === 'remove') {
      if (!ofVideos.has(target.parentElement.parentElement.dataset.title)) {
        return;
      }
      msg(`[MagicPH] Deleted Video Id: ${target.parentElement.parentElement.dataset.title}`, 2500);
      ofVideos.delete(target.parentElement.parentElement.dataset.title);
      target.parentElement.parentElement.remove();
    } else if (cmd === 'remove-all') {
      ofVideos.clear();
      dom.remove(qsA('.mph_of_list > .wrap'));
    } else if (cmd === 'copy-all') {
      const arr = [];
      for (const v of ofVideos.values()) {
        for (const vid of v) {
          if (vid.quality === 'original') {
            arr.push(vid.src);
          }
        }
      }
      await setClipboard(arr.join('\n'));
      msg('[MagicPH] Copied URLs to Clipboard', 2500);
    } else if (cmd === 'download-all') {
      for (const key of ofVideos.keys()) {
        const vid = getOFQuality(key);
        if (!vid) {
          continue;
        }
        info(`Downloading Video Id: ${vid.title}`, vid);
        msg(`[MagicPH] Downloading Video Id: ${vid.title}`, 5000);
        if (Limit_Downloads || ofVideos.size > 16 || isMobile) {
          await fetchStream(vid.src, vid.title);
        } else {
          fetchStream(vid.src, vid.title);
        }
        dom.remove(qs(`.mph_of_list > .wrap[data-title="${vid.title}"]`));
        ofVideos.delete(vid.title);
      }
    }
    ofsdwn.innerHTML = `Download (${ofVideos.size})`;
    ofscopy.innerHTML = `Copy (${ofVideos.size})`;
    ofsRm.innerHTML = `Remove (${ofVideos.size})`;
  }
});
const ofsRoot = make('div', 'mph_of_root');
const populateList = () => {
  const createWrapper = (vid) => {
    const wrap = make('div', 'wrap', {
      dataset: {
        title: vid.title
      }
    });
    const imgC = make('a', '', {
      href: vid.src
    });
    const btns = make('div', 'mph_of_btn_container');
    const cpBtn = make('div', 'mph_of_btn', {
      type: 'button',
      innerHTML: 'Copy',
      dataset: {
        command: 'copy'
      }
    });
    const downBtn = make('div', 'mph_of_btn', {
      type: 'button',
      innerHTML: 'Download',
      dataset: {
        command: 'download'
      }
    });
    const rmBtn = make('div', 'mph_of_btn', {
      type: 'button',
      innerHTML: 'Remove',
      dataset: {
        command: 'remove'
      }
    });
    const img = new Image();
    img.alt = '';
    img.referrerPolicy = 'no-referrer';
    img.src = vid.poster;
    img.onload = () => {
      imgC.append(img);
    };
    const sp = make('span', 'title');
    const fTitle = make('a', '', {
      href: vid.src,
      innerHTML: vid.title
    });

    // const videoElem = make('video', '', {
    //   preload: 'auto',
    //   poster: vid.poster,
    // });
    // dom.attr(videoElem, 'controls', '');
    // dom.attr(videoElem, 'disablepictureinpicture', '');
    // const src = make('source', '', {
    //   src: vid.src,
    //   type: 'video/mp4',
    // });
    // videoElem.append(src);
    // wrap.append(videoElem);

    btns.prepend(cpBtn, downBtn, rmBtn);
    sp.append(fTitle);
    wrap.append(btns, imgC, sp);
    ofsLS.append(wrap);
  };
  for (const v of ofVideos.values()) {
    for (const vid of v) {
      if (vid.quality === 'original') {
        if (qs(`.mph_of_list > .wrap[data-title="${vid.title}"]`)) {
          continue;
        }
        createWrapper(vid);
      }
    }
  }
};
const ofsdwn = make('div', 'mph_of_btn', {
  title: 'Download available videos',
  innerHTML: 'Download All',
  dataset: {
    command: 'download-all'
  }
});
const ofscopy = make('div', 'mph_of_btn', {
  title: 'Copy all available videos to clipboard',
  innerHTML: 'Copy All',
  dataset: {
    command: 'copy-all'
  }
});
const ofsRm = make('div', 'mph_of_btn', {
  title: 'Remove all available videos',
  innerHTML: 'Remove All',
  dataset: {
    command: 'remove-all'
  }
});
const ofsCCopy = make('div', 'mph_of_btn', {
  title: 'Copy current video to clipboard',
  innerHTML: 'Copy',
  style: isMobile ? '' : 'display: none;',
  dataset: {
    command: 'copy'
  }
});
const ofsCDownload = make('div', 'mph_of_btn', {
  title: 'Download current video',
  innerHTML: 'Download',
  style: isMobile ? '' : 'display: none;',
  dataset: {
    command: 'download'
  }
});
const ofsLSToggle = make('div', 'mph_of_btn', {
  title: 'Hide/show list',
  innerHTML: 'Show List',
  style: 'background-color: var(--bg-color);',
  dataset: {
    command: 'toggle'
  }
});
const vidQuality = make('div', 'mgp_download mgp_optionSelector', {
  innerHTML: 'Video Quality(s)',
  onclick(e) {
    halt(e);

    dom.cl.remove(frame, 'hidden');

    if (isMobile) {
      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || l.yp) {
        dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
        return;
      }
      // dom.prop(qs('.mgp_subPage > .mgp_header'), 'innerHTML', 'Video Quality(s)');
      if (qs('.mgp_optionsMenu')) {
        dom.cl.remove('.mgp_optionsMenu', ['mgp_visible', 'mgp_level2']);
        // if (!dom.cl.has('.mgp_optionsMenu', 'mgp_level2')) {
        //   dom.cl.add('.mgp_optionsMenu', ['mgp_visible', 'mgp_level2']);
        // }
        // if (!dom.cl.has('.mgp_optionsMenu', 'mgp_visible')) {
        //   dom.cl.add('.mgp_optionsMenu', ['mgp_visible', 'mgp_level2']);
        // }
      }
      return;
    }
    dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
  }
});
const setClipboard = async (txt) => {
  try {
    await navigator.clipboard.writeText(txt);
  } catch (ex) {
    err(`[Clipboard] Failed to copy: ${ex}`);
    if (Supports.gm) {
      GM.setClipboard(txt);
    }
  }
};
const isVideo = (link) =>
  link.match(/(video|watch)+|\/[\d]+\//g) || (link.includes('redtube') && link.match(/\/[\d]+/g));
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
const fetchStream = async (url = '', title = 'MagicPH', data = {}) => {
  try {
    info('Attempting to download...');
    const chunks = [];
    const content = cleanURL(title);
    const response = await Network.req(url, 'GET', 'basic', data, true);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0;
    let result = await reader.read();
    info('Downloading...');
    while (!result.done) {
      const value = result.value;
      receivedLength += value.length;
      const percentComplete = (receivedLength / contentLength) * 100;
      chunks.push(value);
      console.groupCollapsed(
        '[%cMagicPH%c] %cProgress',
        'color: rgb(255,153,0);',
        '',
        'color: rgb(175, 24, 32);',
        `${percentComplete.toFixed(2)}%`
      );
      table({
        DownloadProgress: `${percentComplete.toFixed(2)}%`,
        VideoTitle: content
      });
      msg(`[MagicPH] Downloading Video "${percentComplete.toFixed(2)}%"`);
      console.groupEnd();
      result = await reader.read();
    }
    const Uint8Chunks = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      Uint8Chunks.set(chunk, position);
      position += chunk.length;
    }
    const makevideo = new Blob([Uint8Chunks], { type: 'video/mp4' });
    const dlBtn = make('a', 'mph_Downloader');
    dlBtn.href = win.URL.createObjectURL(makevideo);
    dlBtn.download = `${content}.mp4`;
    dlBtn.click();
    win.URL.revokeObjectURL(dlBtn.href);
    dlBtn.remove();
  } catch (ex) {
    err(ex);
    Tab.open(url);
  }
};
const fetchQualities = (mFiles = []) => {
  const blankArr = [];
  try {
    return new Promise((resolve, reject) => {
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
          mFiles = mFiles.sort((ma, mb) => {
            const a = ma.match(/\d+(?=P|p\.)/g);
            const b = mb.match(/\d+(?=P|p\.)/g);
            if (a && b) {
              return b[0] - a[0];
            }
            return 0;
          });
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
};
const fetchVideo = async (url = '', type = 'media', dl = {}) => {
  const timeout = new Timeout();
  try {
    if (type.match(/all/g)) {
      mediaFiles = [];
    }
    if (isEmpty(mediaFiles) && type !== 'npDownload') {
      const handleDoc = async (htmlDocument) => {
        /** @type {HTMLElement} */
        const selected = htmlDocument.documentElement;
        for (const s of selected.getElementsByTagName('script')) {
          const txt = s.innerHTML;
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
            mediaTxt = origin + t;
          }
          const resp = await Network.req(mediaTxt.replaceAll('\\', ''));
          mediaFiles.push(...resp.map((i) => i.videoUrl));
        }
      };
      await timeout.wrap(Network.req(url, 'GET', 'document').then(handleDoc), 10000, {
        reason: 'Fetch timeout'
      });
    }
    if (type === 'all') {
      if (mediaFiles.length === 1) {
        return await fetchQualities(mediaFiles);
      }
      return mediaFiles.sort((ma, mb) => {
        const a = ma.match(/\d+(?=P|p\.)/g);
        const b = mb.match(/\d+(?=P|p\.)/g);
        if (a && b) {
          return b[0] - a[0];
        }
        return 0;
      });
    }
    if (type.match(/download/gi)) {
      let dlurl;
      if (type === 'npDownload') {
        dlurl = [url];
      } else {
        dlurl = await fetchQualities(mediaFiles);
      }
      if (dlurl[0].includes('redtube')) {
        dl.params = {
          credentials: loggin === 'false' || !loggin ? 'omit' : 'include'
        };
      }
      if (isMobile) {
        return dlurl;
      }
      fetchStream(dlurl[0], dl.title, dl.params);
    }
    if (type === 'media') {
      return mediaFiles;
    }
  } catch (ex) {
    err(ex);
    return [];
  } finally {
    timeout.clear(...timeout.ids);
  }
};
const makeContainer = (q = [], title = 'MagicPH', data = {}) => {
  if (isEmpty(q)) {
    info('Empty quality list', q);
    return;
  }
  info('VIDEO QUALITIES', q);
  const close = make('mph-elem', 'mph_list_header');
  const closeVQ = make('mph-elem', 'mgp_title', {
    innerHTML: 'Video Quality(s)'
  });
  const closeHM = make('mph-elem', 'mgp_hideMenu', {
    innerHTML: '🗙',
    dataset: {
      command: 'close'
    }
  });
  const dul = make('mph-elem', 'mph-list');
  for (const v of q) {
    if (!videoCache.has(v)) {
      videoCache.set(v, { title, data });
    }
    const liElem = make('mph-elem', 'mph-item');
    const s = make('label');
    const inp = make('input', 'mphURL', {
      value: v,
      type: 'url',
      size: '70'
    });
    const rows = [
      make('mph-a', '', {
        title: 'Copy',
        innerHTML: location.origin.match(/redtube/g) ? 'Copy' : `${iconSVG.copy} Copy`,
        dataset: {
          command: 'copy',
          webpage: v
        }
      }),
      make('mph-a', '', {
        title: 'Download',
        innerHTML: location.origin.match(/redtube/g) ? 'Download' : `${iconSVG.download} Download`,
        dataset: {
          command: 'download-video',
          webpage: v
        }
      }),
      make('mph-a', '', {
        title: 'Open in new Tab',
        innerHTML: 'Open',
        dataset: {
          command: 'open-tab',
          webpage: v
        }
      }),
      make('mph-a', '', {
        title: 'Preview',
        innerHTML: 'Preview',
        dataset: {
          command: 'preview-video',
          webpage: v
        }
      })
    ];
    dom.attr(inp, 'readonly', '');
    s.append(inp);
    liElem.append(s);
    for (const r of rows) {
      liElem.append(r)
    };
    dul.append(liElem);
  }
  close.append(closeVQ, closeHM);
  return dContainer.append(close, dul);
};
// #region Setup UserJS
const setup = async (doc = document) => {
  try {
    if (window.location === null) {
      return;
    }
    if (doc === null) {
      return;
    }

    const injectedCore = loadCSS(downloadCSS, 'core');
    if (!injectedCore) {
      throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
    }

    info(`Site: ${origin} isMobile: ${isMobile}`);

    doc.documentElement.appendChild(frame);
    frame.append(l.ofs ? ofsRoot : dContainer);

    siteTheme.load();
    progressFrame.append(progressElem);

    if (doc.body === null) {
      return;
    }
    doc.body.prepend(progressFrame);

    if (isMobile) {
      dom.cl.add([frame, ofsContainer, ofsLS], 'mph_mobile');
      // Prevents being redirected to "Continue to video"
      if (l.ph) {
        /**
         * Create/Make/Update Cookie
         * @param {string} name - Create cookie w/ this name
         * @param {string} value - Cookie value
         * @param {object} options - (Optional) Additional options // Converts {key: value} => key=value
         * @returns {string} Returns value of created/made/updated Cookie
         */
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
            dbg('[makeCookie] New cookie value:', updatedCookie);
            return updatedCookie;
          } catch (ex) {
            return err(ex);
          }
        };
        makeCookie('views', '0', { domain: '.pornhub.com' });
        // If we are on `/interstitial?viewkey=`
        if (isFN(win.clearModalCookie)) {
          const url = new URL(location);
          if (url.searchParams.has('viewkey')) {
            window.location.href = `${url.origin}/view_video.php?viewkey=${url.searchParams.get('viewkey')}`;
            return;
          }
        }
      }
    }

    if (l.ofs) {
      const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
      observe(win.document.documentElement, (mutations) => {
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
              if (node.localName === 'video') {
                const rawId = /video(Player)?-(\d{10})/.exec(
                  node.getAttribute('playerId') || node.getAttribute('id') || ''
                );
                if (!rawId) {
                  continue;
                }
                const playerId = rawId[2];
                if (isMobile) {
                  dom.attr(ofsContainer, 'style', '');
                } else {
                  dom.attr([ofsCCopy, ofsCDownload], 'style', '');
                }
                currentVideoId = playerId;
                if (ofVideos.has(playerId)) {
                  continue;
                }
                ofVideos.set(playerId, []);
                const vid = ofVideos.get(playerId) || [];
                for (const elem of node.querySelectorAll('source')) {
                  vid.push({
                    poster: node.getAttribute('poster'),
                    quality: elem.getAttribute('label'),
                    src: elem.getAttribute('src'),
                    title: playerId
                  });
                }
                ofVideos.set(playerId, vid);
                ofscopy.innerHTML = `Copy (${ofVideos.size})`;
                ofsdwn.innerHTML = `Download (${ofVideos.size})`;
                populateList();
                info('Added to list:', ofVideos);
              }
            }
            for (const node of mutation.removedNodes) {
              if (node.nodeType !== 1) {
                continue;
              }
              if (!(node instanceof HTMLElement)) {
                continue;
              }
              if (node.localName === 'video') {
                const rawId = /video(Player)?-(\d{10})/.exec(
                  node.getAttribute('playerId') || node.getAttribute('id') || ''
                );
                if (!rawId) {
                  continue;
                }
                if (isMobile) {
                  dom.attr(ofsContainer, 'style', 'display: none;');
                } else {
                  dom.attr([ofsCCopy, ofsCDownload], 'style', 'display: none;');
                }
              }
            }
          }
        } catch (ex) {
          err(ex);
        }
      });
      if (!doc.body.contains(ofsContainer)) {
        ofsContainer.append(ofsCCopy, ofsCDownload, ofsLSToggle);
        ofsHeader.append(ofscopy, ofsdwn);
        ofsRoot.append(ofsHeader, ofsLS);
        doc.body.prepend(ofsContainer);
      }
      return;
    }
    if (l.xham) {
      const qual = [];
      for (const s of doc.getElementsByTagName('script')) {
        if (isEmpty(s.innerHTML)) continue;
        if (s.getAttribute('id') !== 'initials-script') continue;
        const ih = s.innerHTML.toString();
        const final = new Function(`${ih}return window.initials`)();
        const globalQual = final.xplayerSettings.sources.standard.h264
          .filter((q) => q.label !== 'auto')
          .map((q) => q.url);
        qual.push(...globalQual);
      }
      makeContainer(qual, `mph_${encodeURIComponent(win.initials.videoModel.title)}`, {
        credentials: 'omit',
        referrer: `${location.protocol}//${location.hostname}`
      });
      const menu = qs(isMobile ? '.xplayer-menu-mobile-bottom-left' : '.xp-context-menu');
      if (menu) {
        menu.prepend(vidQuality);
      }
      return;
    }

    if (!isVideo(window.location.href)) return;
    const qualities = await fetchVideo(window.location.href, 'all');
    if (isEmpty(qualities)) {
      info('Empty quality list', qualities);
      return;
    }
    if (isMobile) {
      await query('.mgp_container');
    }
    if (l.ph) {
      const MGP = win.MGP;
      if (MGP) {
        const p = Object.keys(MGP.players);
        vidTitle = MGP.players[p].settings().mainRoll.title;
      } else {
        vidTitle = win.VIDEO_SHOW?.videoTitleOriginal ?? doc.title;
      }
    }
    if (l.rt) {
      vidTitle =
        win.page_params.video_player_setup[`playerDiv_${pathname.match(/\d+/gi)}`].playervars
          .video_title;
    }
    if (l.tz) {
      vidTitle = win.video_vars.video_title;
    }
    if (l.t8) {
      vidTitle = win.flashvars.video_title;
    }
    if (l.yp) {
      vidTitle = !win.page_params.video.playerParams
        ? win.page_params.shareVideo.title
        : win.page_params.video.playerParams.mainRoll.title;
    }
    makeContainer(qualities, vidTitle ?? doc.title);

    let injInto = doc.documentElement;
    if (isMobile) {
      dom.cl.add(vidQuality, 'mgp_selector');

      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || l.yp) {
        info('Detected tablet...');
        const vidFrame = await query('div.mgp_options');
        vidFrame.append(vidQuality);
        dom.cl.add(vidQuality, 'mgp_optionsBtn');
        dom.prop(vidQuality, 'innerHTML', iconSVG.mobileDownload);
        return;
      }

      info('Detected mobile...');
      dom.prop(
        vidQuality,
        'innerHTML',
        `${iconSVG.mobileDownload}<div class="mgp_value">Quality(s)</div>`
      );

      const injVid = qs('ul.mgp_switches') || qs('ul.mgp_optionsSwitches');
      if (injVid) {
        injVid.prepend(vidQuality);
      }
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

    info('Detected desktop...');
    if (qs('.mgp_contextMenu .mgp_content')) {
      injInto = qs('.mgp_contextMenu .mgp_content');
    } else if (qs('.mgp_contextMenu .mgp_contextContent')) {
      injInto = qs('.mgp_contextMenu .mgp_contextContent');
    }
    injInto.prepend(vidQuality);
  } catch (ex) {
    err(ex);
  }
};
// #endregion
/**
 * @param { Function } callback
 * @returns { null | true }
 */
const loadDOM = (callback) => {
  if (!isFN(callback)) {
    return null;
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    callback.call({}, document);
  }
  document.addEventListener('DOMContentLoaded', (evt) => callback.call({}, evt.target), {
    once: true
  });
  return true;
};

if (typeof userjs === 'object' && userjs.UserJS && window && window.self === window.top) {
  loadDOM(setup);
}
