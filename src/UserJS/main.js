/**
 * Magic PH - main script, wrapped by `header.js` at build time.
 *
 * The header provides: `translations`, `main_css`, `page_css`.
 */
// #region Console
/**
 * Prefixed `console` wrapper.
 *
 * Errors are also forwarded to {@link con.onError} (bound by the UI) so they can be shown to the user.
 */
class con extends null {
  static #title = '[%cMagic PH%c]';
  static #color = 'color: rgb(255,153,0);';
  /** @type {((...msg: unknown[]) => void) | null} */
  static onError = null;
  /**
   * @param {unknown[]} msg
   */
  static dbg(...msg) {
    const dt = new Date();
    console.debug(
      `${con.#title} %cDBG`,
      con.#color,
      '',
      'color: rgb(255, 212, 0);',
      `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
      ...msg
    );
  }
  /**
   * @param {unknown[]} msg
   */
  static err(...msg) {
    console.error(`${con.#title} %cERROR`, con.#color, '', 'color: rgb(249, 24, 128);', ...msg);
    try {
      if (typeof con.onError === 'function') con.onError(...msg);
    } catch {
      /* empty */
    }
  }
  /**
   * @param {unknown[]} msg
   */
  static info(...msg) {
    console.info(`${con.#title} %cINF`, con.#color, '', 'color: rgb(0, 186, 124);', ...msg);
  }
  /**
   * @param {unknown[]} msg
   */
  static log(...msg) {
    console.log(`${con.#title} %cLOG`, con.#color, '', 'color: rgb(219, 160, 73);', ...msg);
  }
}
// #endregion

// #region Custom Elements Compatibility
/**
 * Check for the browser's genuine `HTMLElement` interface object.
 *
 * The genuine interface object inherits from `Element`,
 * ES5 shims are plain functions that inherit from `Function.prototype`.
 * @param {unknown} fn
 * @returns {fn is typeof HTMLElement}
 */
const isNativeHTMLElement = (fn) => {
  try {
    return (
      typeof fn === 'function' &&
      Reflect.getPrototypeOf(fn) === Element &&
      Reflect.getPrototypeOf(/** @type {Function} */ (fn).prototype) === Element.prototype
    );
  } catch {
    return false;
  }
};
/**
 * Recover the genuine `HTMLElement` constructor, even if the webpage replaced `window.HTMLElement`
 * @returns {typeof HTMLElement | undefined}
 */
const resolveHTMLElement = () => {
  /** @type {Array<() => unknown>} */
  const candidates = [
    /** Untouched `window.HTMLElement` */
    () => HTMLElement,
    /** Shims keep the genuine prototype, which still points to the genuine constructor */
    () => HTMLElement.prototype.constructor,
    /** Every built-in element interface inherits from the genuine constructor */
    () => Reflect.getPrototypeOf(HTMLDivElement),
    () => Reflect.getPrototypeOf(HTMLSpanElement),
    () => Reflect.getPrototypeOf(HTMLUnknownElement)
  ];
  for (const candidate of candidates) {
    try {
      const fn = candidate();
      if (isNativeHTMLElement(fn)) return fn;
    } catch {
      /** Try the next candidate */
    }
  }
  return undefined;
};
/**
 * Genuine `HTMLElement`, base class of every custom element in this UserJS
 * @type {typeof HTMLElement}
 */
const NativeHTMLElement = /** @type {typeof HTMLElement} */ (resolveHTMLElement());
if (NativeHTMLElement == null) {
  con.err(new Error('Failed to find the native "HTMLElement"', { cause: 'customElements' }));
  return;
}
/**
 * `define` and `get` of the genuine `CustomElementRegistry`.
 *
 * The ES5 adapter only overwrites them on the global `window.customElements` **instance**,
 * the prototype is left untouched.
 */
const registryProto = /** @type {CustomElementRegistry} */ (
  typeof CustomElementRegistry === 'function'
    ? CustomElementRegistry.prototype
    : Reflect.getPrototypeOf(customElements)
);
const nativeRegistry = {
  define: registryProto.define,
  get: registryProto.get
};
if (typeof nativeRegistry.define !== 'function' || typeof nativeRegistry.get !== 'function') {
  con.err(new Error('Failed to find the native "customElements"', { cause: 'customElements' }));
  return;
}
/**
 * Custom elements registry used by this UserJS.
 *
 * Prefers a scoped registry (keeps the UserJS elements away from the webpage) but only if
 * the browser actually upgrades elements created with it, otherwise falls back to the global registry.
 * @type {CustomElementRegistry}
 */
const ce = (() => {
  try {
    const probeName = 'mujs-probe';
    const probeRegistry = Reflect.construct(CustomElementRegistry, []);
    class Probe extends NativeHTMLElement {}
    Reflect.apply(nativeRegistry.define, probeRegistry, [probeName, Probe]);
    const probe = Reflect.apply(Document.prototype.createElement, document, [
      probeName,
      { customElementRegistry: probeRegistry }
    ]);
    if (probe instanceof Probe) return Reflect.construct(CustomElementRegistry, []);
  } catch {
    /** Scoped registries are not supported, e.g. "Illegal constructor" */
  }
  return customElements;
})();
/**
 * Define a custom element using the genuine `CustomElementRegistry.prototype.define`
 *
 * Never use `ce.define` directly, on pages with the ES5 adapter it wraps the class
 * and calls it without `new` (`Class constructor cannot be invoked without 'new'`)
 * @param {string} name - Custom element name
 * @param {CustomElementConstructor} constructor - Custom element class
 */
const defineElement = (name, constructor) => {
  const existing = Reflect.apply(nativeRegistry.get, ce, [name]);
  if (existing === constructor) return;
  if (existing !== undefined) {
    throw new Error(`"${name}" is already defined by another script`);
  }
  Reflect.apply(nativeRegistry.define, ce, [name, constructor]);
};

class MainUserJS extends NativeHTMLElement {}
/** @type {Array<[string, CustomElementConstructor]>} */
const customElementList = [['mph-userjs', MainUserJS]];
for (const [name, constructor] of customElementList) {
  try {
    defineElement(name, constructor);
  } catch (e) {
    con.err(e);
  }
}
// #endregion

//#region Placeholders
const BLANK_FN = function () {};
const BLANK_PAGE = 'about:blank';
/**
 * Location of the current page.
 * @type {URL}
 */
const url = (() => {
  try {
    /** For some reason `window.location.href` isn't always the same as `location.href` */
    return new URL(window.location.href);
  } catch {
    return new URL(BLANK_PAGE);
  }
})();
/**
 * User configuration, populated by {@link init}
 * @type { import("../typings/types.d.ts").config }
 */
let cfg;
//#endregion
/**
 * @template {string} S
 * @param {S} str
 */
const normalizedHostname = (str) => {
  let resp;
  if (typeof str === 'string') {
    resp = str.replace(/^www\./, '');
  }
  return resp || '';
};
/**
 * Returns the registrable domain (last 2 labels) of a hostname.
 * @template {string} S
 * @param {S} str
 */
const formatURL = (str) => {
  let resp;
  if (typeof str === 'string') {
    resp = str
      .split('.')
      .splice(-2)
      .join('.')
      .replace(/\/|https:/g, '');
  }
  return resp || '';
};
/**
 * @template {string} S
 * @param {S} str
 */
const getHostname = (str) => formatURL(normalizedHostname(str));
// #region Validators
/**
 * Transform parameter into string
 * @template O
 * @param {O} obj
 * @returns {string}
 */
function objToStr(obj) {
  try {
    return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)?.[1] || '';
  } catch {
    return '';
  }
}
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Element | Node)}
 */
const isElem = (obj) => /Document|Element|HTML/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is Function}
 */
const isFN = (obj) => /Function/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Window)}
 */
const isHTML = (obj) => /Document|Element|HTML|Window/.test(objToStr(obj));
/**
 * Parameter is `JSON Object`
 * @template O
 * @param {O} obj
 * @returns {obj is Record<PropertyKey, any>}
 */
const isObj = (obj) => /Object/.test(objToStr(obj));
/**
 * @type { typeof import("../typings/types.d.ts").toArray }
 */
function toArray(target, args, root) {
  if (target == null) return /** @type {any} */ ([]);
  if (Array.isArray(target)) return /** @type {any} */ (target);
  if (target instanceof Window || target instanceof Document) return /** @type {any} */ ([target]);
  if (isHTML(target)) return /** @type {any} */ (Array.of(target));
  const opts = Object.assign({}, args);
  const method = /** @type {"entries" | "keys" | "values" | undefined} */ (
    ['entries', 'keys', 'values'].find((key) => key in opts || opts[key])
  );
  if (typeof target === 'string') {
    if (root instanceof Element || root instanceof Document) {
      return /** @type {any} */ ([...root.querySelectorAll(target)]);
    } else if (method === 'keys' && typeof root === 'string') {
      return /** @type {any} */ (target.split(root));
    }
    return method === 'keys' ? /** @type {any} */ ([...target]) : /** @type {any} */ ([target]);
  }
  if (method != null) {
    const s = objToStr(target);
    if (/Object/.test(s)) {
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof Object>} */
      const _method = method;
      if (Object[_method]) {
        return /** @type {any} */ (Array.from(Object[_method](/** @type {object} */ (target))));
      }
    } else if (/Set|Map/.test(s)) {
      /** @type {Set<unknown> | Map<unknown, unknown>} */
      const _target = /** @type {any} */ (target);
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof _target>} */
      const _method = method;
      if (_target[_method]) {
        return /** @type {any} */ (Array.from(_target[_method]()));
      }
    }
  }
  return /** @type {any} */ (Array.from(/** @type {any} */ (target)));
}
/**
 * Parameter is `null` or `undefined`
 * @template O
 * @param {O} obj
 * @returns {obj is (null | undefined)}
 */
const isNull = (obj) => Object.is(obj, null) || Object.is(obj, undefined);
/**
 * Parameter is an empty `Array`, `JSON Object`, `Map`, `Set`, or `String`
 * @template O
 * @param {O} obj
 */
const isBlank = (obj) => {
  return typeof obj === 'string'
    ? Object.is(obj.replaceAll('\0', '').trim(), '')
    : Object.is(toArray(obj, { keys: true }).length, 0);
};
/**
 * Parameter is Empty
 * @template O
 * @param {O} obj
 */
const isEmpty = (obj) => isNull(obj) || isBlank(obj);
/**
 * @template O
 * @param {O} object
 * @returns {O}
 */
const copyObject = (object) => JSON.parse(JSON.stringify(object));
/**
 * Message of an unknown thrown value.
 * @param {unknown} ex
 */
const errMsg = (ex) => (ex instanceof Error ? ex.message : String(ex));
// #endregion
// #region Constants
const isMobile = (() => {
  const { userAgent = '', userAgentData = {} } = navigator;
  const { platform = '', mobile = false } = Object(userAgentData);
  return (
    /Mobile|Tablet/.test(String(userAgent)) ||
    Boolean(mobile) ||
    /Android|Apple/.test(String(platform))
  );
})();
/**
 * Userscript manager API wrapper.
 *
 * Supports both `GM.*` (Promise based) and legacy `GM_*` handles, falls back to plain web APIs when
 * running outside of a userscript manager (bookmarklet, console).
 */
class $GM extends null {
  static #INFO = {
    script: {
      icon: '',
      name: 'Magic PH',
      namespace: 'https://github.com/magicoflolis/Magic-PH',
      updateURL: 'https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.user.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/Magic-PH/issues'
    }
  };
  static get isGM() {
    return typeof GM !== 'undefined' || typeof GM_xmlhttpRequest !== 'undefined';
  }
  /**
   * Returns the page's version of `element`, needed to read expando properties (e.g. `__vue__`)
   * that are not visible from the userscript sandbox.
   * @template {object} E
   * @param {E} element
   * @returns {E}
   */
  static unwrap(element) {
    // @ts-expect-error `wrappedJSObject` only exists in Firefox
    return (element && element.wrappedJSObject) || element;
  }
  /**
   * @param {...unknown} args
   * @returns {?Element}
   */
  static addElement(...args) {
    try {
      if (typeof GM !== 'undefined' && isFN(GM.addElement)) {
        // @ts-expect-error Overloads
        return GM.addElement(...args);
      }
      if (typeof GM_addElement !== 'undefined' && isFN(GM_addElement)) {
        // @ts-expect-error Overloads
        return GM_addElement(...args);
      }
    } catch (ex) {
      con.err(ex);
    }
    return null;
  }
  /**
   * @param {string} link
   */
  static openInTab(link) {
    try {
      if (typeof GM !== 'undefined' && isFN(GM.openInTab)) {
        return GM.openInTab(link, { active: true, insert: true });
      }
      if (typeof GM_openInTab !== 'undefined' && isFN(GM_openInTab)) {
        return GM_openInTab(link, { active: true, insert: true });
      }
    } catch (ex) {
      con.err(ex);
    }
    return window.open(link, '_blank', 'noopener,noreferrer');
  }
  static get info() {
    if (typeof GM !== 'undefined' && isObj(GM.info)) return GM.info;
    if (typeof GM_info !== 'undefined' && isObj(GM_info)) return GM_info;
    return $GM.#INFO;
  }
  /**
   * @param {string} key
   * @param {unknown} value
   */
  static async setValue(key, value) {
    if (typeof GM !== 'undefined' && isFN(GM.setValue)) return GM.setValue(key, value);
    if (typeof GM_setValue !== 'undefined' && isFN(GM_setValue)) return GM_setValue(key, value);
    return undefined;
  }
  /**
   * @template D
   * @param {string} key
   * @param {D} [def]
   * @returns {Promise<D | undefined>}
   */
  static async getValue(key, def) {
    if (typeof GM !== 'undefined' && isFN(GM.getValue)) return GM.getValue(key, def);
    if (typeof GM_getValue !== 'undefined' && isFN(GM_getValue)) return GM_getValue(key, def);
    return def;
  }
  /**
   * @param {string} text
   * @param {() => void} command
   */
  static registerMenuCommand(text, command) {
    try {
      if (typeof GM !== 'undefined' && isFN(GM.registerMenuCommand)) {
        return GM.registerMenuCommand(text, command);
      }
      if (typeof GM_registerMenuCommand !== 'undefined' && isFN(GM_registerMenuCommand)) {
        return GM_registerMenuCommand(text, command);
      }
    } catch (ex) {
      con.err(ex);
    }
    return undefined;
  }
  /**
   * @param {string} text
   * @param {string} [type]
   * @returns {Promise<boolean>}
   */
  static async setClipboard(text, type = 'text') {
    try {
      if (typeof GM !== 'undefined' && isFN(GM.setClipboard)) {
        await GM.setClipboard(text, type);
        return true;
      }
      if (typeof GM_setClipboard !== 'undefined' && isFN(GM_setClipboard)) {
        GM_setClipboard(text, type);
        return true;
      }
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
  /**
   * Cross-origin capable request. Falls back to a regular `XMLHttpRequest`.
   *
   * Callbacks receive the response object (`status`, `response`, `responseText`, ...).
   * @param {Record<string, any>} details
   * @returns {{ abort: () => void }}
   */
  static xmlHttpRequest(details) {
    if (typeof GM !== 'undefined' && isFN(GM.xmlHttpRequest)) {
      return /** @type {any} */ (GM.xmlHttpRequest(/** @type {any} */ (details)));
    }
    if (typeof GM_xmlhttpRequest !== 'undefined' && isFN(GM_xmlhttpRequest)) {
      return /** @type {any} */ (GM_xmlhttpRequest(/** @type {any} */ (details)));
    }
    const req = new XMLHttpRequest();
    const { onload, onerror, onabort, ontimeout, onprogress } = details;
    req.open(String(details.method || 'GET'), String(details.url));
    req.responseType = /^(arraybuffer|blob|document|json|text)$/.test(details.responseType)
      ? details.responseType
      : 'text';
    if (details.timeout > 0) req.timeout = details.timeout;
    if (details.anonymous === false) req.withCredentials = true;
    if (isObj(details.headers)) {
      for (const [k, v] of Object.entries(details.headers)) {
        try {
          req.setRequestHeader(k, String(v));
        } catch {
          /* forbidden header */
        }
      }
    }
    if (isFN(onload)) req.addEventListener('load', () => onload(req));
    if (isFN(onerror)) req.addEventListener('error', () => onerror(req));
    if (isFN(onabort)) req.addEventListener('abort', () => onabort(req));
    if (isFN(ontimeout)) req.addEventListener('timeout', () => ontimeout(req));
    if (isFN(onprogress)) req.addEventListener('progress', (evt) => onprogress(evt));
    req.send(details.data ?? details.body ?? null);
    return { abort: () => req.abort() };
  }
}
// #endregion
// #region DEFAULT_CONFIG
/**
 * @type { import("../typings/types.d.ts").config }
 */
const DEFAULT_CONFIG = {
  autoinject: true,
  autoexpand: false,
  clearTabCache: true,
  limitDownloads: false,
  autoHLS: false,
  position: 'auto',
  concurrency: 4,
  time: 10000,
  theme: {
    'mph-site-color': '',
    'mph-hover-color': '',
    'mph-background-color': '',
    'mph-border-color': '',
    'mph-text-color': '',
    'mph-root-bg': '',
    'mph-header-bg': '',
    'mujs-font-family': '',
    'mujs-position-top': '',
    'mujs-position-bottom': '',
    'mujs-position-left': '',
    'mujs-position-right': ''
  }
};
// #endregion
// #region i18n
class Language extends null {
  static #map = new Map(Object.entries(translations));
  /**
   * Returns the translation of `key`, falls back to English and finally to `key` itself.
   * @type { typeof import("../typings/UserJS.d.ts").i18n$ }
   */
  static i18n$(key) {
    try {
      const m = Language.#map;
      const current = m.get(Language.current);
      if (isObj(current) && key in current) return current[key];
      const en = m.get('en');
      if (isObj(en) && key in en) return en[key];
    } catch (e) {
      con.err(e);
    }
    return key;
  }
  /**
   * Best matching locale, `zh-TW` matches `zh_TW`, then `zh`, then `en`.
   */
  static get current() {
    const lang = String(navigator.language || 'en');
    const full = lang.replace('-', '_');
    if (Language.#map.has(full)) return full;
    return lang.split('-').find((l) => Language.#map.has(l)) || 'en';
  }
}
const { i18n$ } = Language;
// #endregion
// #region Utilities
/**
 * @type { import("../typings/types.d.ts").qs }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    con.err(ex);
  }
  return null;
};
/**
 * @type { import("../typings/types.d.ts").qsA }
 */
const qsA = (selectors, root) => {
  try {
    return (root || document).querySelectorAll(selectors);
  } catch (ex) {
    con.err(ex);
  }
  return /** @type {any} */ ([]);
};
/**
 * @param {HTMLElement} elem - HTMLElement
 * @param {unknown} str - Class string(s)
 */
function addClass(elem, str) {
  /** @type {string[]} */
  const arr = (Array.isArray(str) ? str : typeof str === 'string' ? str.split(' ') : []).filter(
    (s) => typeof s === 'string' && !isBlank(s)
  );
  if (!isBlank(arr)) elem.classList.add(...arr);
}
/**
 * @template {HTMLElement} E
 * @param {E} elem
 * @param {Record<keyof E, E>} attr
 */
function formAttrs(elem, attr) {
  if (elem != null && isObj(attr)) {
    for (const [key, value] of Object.entries(attr)) {
      if (value == null) {
        continue;
      } else if (isObj(value)) {
        formAttrs(elem[key], value);
      } else if (isFN(value)) {
        if (/^on/.test(key)) {
          elem[key] = value;
        } else {
          elem.addEventListener(key, value);
        }
      } else if (/^class/i.test(key)) {
        addClass(elem, value);
      } else if (
        elem.tagName === 'A' &&
        typeof value === 'string' &&
        /^(download|type)/i.test(key)
      ) {
        elem.setAttribute(key, value);
      } else {
        elem[key] = value;
      }
    }
  }
  return elem;
}
/**
 * @type { typeof import("../typings/types.d.ts").make }
 */
const make = (tagName, ...attributes) => {
  const el = document.createElement(tagName, { customElementRegistry: ce });
  for (let i = 0; i < attributes.length; i++) {
    const _attr = attributes[i];
    if (i === 0) {
      addClass(el, _attr);
    } else if (i === 1 && typeof _attr === 'string' && !isEmpty(_attr)) {
      el.textContent = _attr;
      continue;
    }
    formAttrs(el, _attr);
  }
  return el;
};
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options) => {
  const opts = typeof options === 'object' && options !== null ? options : { capture: !!options };
  for (const elem of toArray(el).filter(isHTML)) {
    elem.addEventListener(type, listener, opts);
  }
};
/**
 * Polls `fn` until it returns a truthy value.
 *
 * Never rejects and never spins forever, resolves `null` once `timeout` (ms) is exceeded.
 * Timer based on purpose, `requestAnimationFrame` is paused in background tabs.
 * @template T
 * @param {() => T} fn
 * @param {number} [timeout] - `0` waits forever
 * @param {number} [interval]
 * @returns {Promise<T | null>}
 */
const waitFor = (fn, timeout = 30000, interval = 100) =>
  new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      let value;
      try {
        value = fn();
      } catch {
        value = null;
      }
      if (value) {
        resolve(value);
      } else if (timeout > 0 && Date.now() - start >= timeout) {
        resolve(null);
      } else {
        setTimeout(tick, interval);
      }
    };
    tick();
  });
/**
 * Waits for `selector` to exist.
 * @param {string} selector
 * @param {ParentNode} [root]
 * @param {number} [timeout] - ms, `0` waits forever
 * @returns {Promise<Element | null>}
 */
const query = (selector, root, timeout = 30000) =>
  waitFor(() => (root || document).querySelector(selector), timeout);
/**
 * @param {number} duration - Seconds
 * @returns {string} `1:01`, `4:03:59`, `123:03:59`
 */
const fancyTimeFormat = (duration) => {
  const total = Math.max(0, Math.floor(Number(duration) || 0));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return `${hrs > 0 ? `${hrs}:${mins < 10 ? '0' : ''}` : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
/**
 * Seconds of a duration: `754`, `"754"`, `"12:34"` or an ISO 8601 duration (`"PT12M34S"`).
 * @param {unknown} value
 * @returns {number} `0` when unknown
 */
const toSeconds = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  const str = String(value ?? '').trim();
  if (/^\d+(?:\.\d+)?$/.test(str)) return Math.floor(Number(str));
  if (/^\d+(?::\d+){1,2}$/.test(str)) {
    return str.split(':').reduce((total, part) => total * 60 + Number(part), 0);
  }
  const [, d = 0, h = 0, m = 0, sec = 0] =
    /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i.exec(str) ?? [];
  return Math.floor(Number(d) * 86400 + Number(h) * 3600 + Number(m) * 60 + Number(sec));
};
/**
 * Makes `str` safe to use as a filename on Windows / macOS / Linux.
 * @param {unknown} str
 * @param {string} [fallback]
 */
const sanitizeFilename = (str, fallback = 'MagicPH') => {
  /** @type {Record<string, string>} */
  const invalid = {
    '\\': '＼',
    '/': '／',
    '|': '｜',
    '<': '＜',
    '>': '＞',
    ':': '：',
    '*': '＊',
    '?': '？',
    '"': '＂',
    '#': '',
    '🔞': ''
  };
  const name = String(str ?? '')
    .replace(/[\\/|<>:*?"#]|🔞/g, (v) => invalid[v] ?? '')
    .replace(/\p{Cc}/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s.]+|[\s.]+$/g, '')
    .slice(0, 150)
    .trim();
  return name || fallback;
};
/**
 * Trusted Types policy owned by this script, `null` if unsupported or refused by the page's CSP.
 *
 * A private policy is used instead of installing a pass-through `default` policy on the website.
 */
const ttPolicy = (() => {
  try {
    const tt = /** @type {any} */ (window).trustedTypes;
    if (tt && isFN(tt.createPolicy)) {
      return /** @type {{ createHTML(s: string): string } | null} */ (
        tt.createPolicy('magicph', { createHTML: (/** @type {string} */ s) => s })
      );
    }
  } catch {
    /* CSP `trusted-types` does not allow the policy name */
  }
  return null;
})();
/**
 * Parses an HTML string into an inert document (no scripts run, no resources load).
 * @param {string} html
 * @returns {Document}
 */
const parseHTML = (html) => {
  const str = String(html);
  return new DOMParser().parseFromString(
    /** @type {string} */ (ttPolicy ? ttPolicy.createHTML(str) : str),
    'text/html'
  );
};
/**
 * Plain text of an HTML fragment.
 * @param {unknown} html
 */
const htmlToText = (html) => {
  try {
    return (parseHTML(String(html ?? '')).body.textContent ?? '').replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
};
/**
 * @param {string} text
 * @returns {Promise<boolean>}
 */
const writeClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (ex) {
    con.info('Clipboard API unavailable, using fallback:', errMsg(ex));
  }
  if (await $GM.setClipboard(text)) return true;
  try {
    const area = make('textarea', { value: text, readOnly: true });
    area.style.cssText = 'position:fixed;top:-100px;opacity:0;';
    (document.body || document.documentElement).append(area);
    area.select();
    const done = document.execCommand('copy');
    area.remove();
    return done;
  } catch (ex) {
    con.err(ex);
  }
  return false;
};
/**
 * Saves `blob` to disk.
 * @param {Blob} blob
 * @param {string} filename
 */
const saveAs = (blob, filename) => {
  const href = URL.createObjectURL(blob);
  const a = make('a', { href, download: filename, rel: 'noopener' });
  a.style.display = 'none';
  (document.body || document.documentElement).append(a);
  a.click();
  a.remove();
  // Revoking immediately can cancel the download (Firefox)
  setTimeout(() => URL.revokeObjectURL(href), 60000);
};
/**
 * Runs `worker` for every item with at most `limit` in flight, result order is preserved.
 * @template T, R
 * @param {T[]} items
 * @param {number} limit
 * @param {(item: T, index: number) => Promise<R>} worker
 * @returns {Promise<R[]>}
 */
const runPool = async (items, limit, worker) => {
  /** @type {R[]} */
  const results = new Array(items.length);
  let next = 0;
  const lane = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  };
  const lanes = Math.max(1, Math.min(Math.floor(limit) || 1, items.length));
  await Promise.all(Array.from({ length: lanes }, lane));
  return results;
};
// #endregion
// #region DOM helpers
class dom extends null {
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @returns {E[]}
   */
  static HTML(target) {
    return toArray(target).filter(isHTML);
  }
  /**
   * @template {HTMLElement} E
   * @template V
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @param {keyof E} prop
   * @param {V} [value=undefined]
   */
  static prop(target, prop, value = undefined) {
    const t = dom.HTML(target);
    if (value === undefined) {
      return t.find((elem) => elem[prop]);
    }
    for (const elem of t) {
      elem[prop] = value;
    }
  }
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   */
  static remove(target) {
    for (const elem of dom.HTML(target)) elem.remove();
    return dom;
  }
  /**
   * Removes every child element of `target`
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   */
  static rmChildren(target) {
    for (const elem of dom.HTML(target)) {
      for (const e of Array.from(elem.children)) e.remove();
    }
  }
  static get cl() {
    return {
      /**
       * @template {HTMLElement} E
       * @template {string} T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      add(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        for (const elem of dom.HTML(target)) elem.classList.add(..._token);
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      remove(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        for (const elem of dom.HTML(target)) elem.classList.remove(..._token);
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       * @param {boolean} [force]
       */
      toggle(target, token, force) {
        let r;
        for (const elem of dom.HTML(target)) {
          r = elem.classList.toggle(String(token), force);
        }
        return r;
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       */
      has(target, token) {
        return dom.HTML(target).some((elem) => elem.classList.contains(String(token)));
      }
    };
  }
}
/**
 * @typedef { { "active": (tab: HTMLElement, build: boolean) => void; "close": (tab: HTMLElement) => void; "internal": (host: string | undefined, hostname: string) => void; } } tabEvents
 */
/**
 * Tab strip. Every tab is identified by `dataset.host`.
 *
 * - `about:blank` is the "new tab", it accepts a URL / video id
 * - `mujs:<name>` are internal pages, e.g. `mujs:settings`
 * - anything else is a group of videos
 */
class Tabs {
  /** @type { Set<{ type: keyof tabEvents; listener: tabEvents[keyof tabEvents] }> } */
  events = new Set();
  /** @type { Set<HTMLElement> } */
  pool = new Set();
  /** @type { typeof BLANK_PAGE } */
  blank = BLANK_PAGE;
  /** @type { "mujs:" } */
  protocal = 'mujs:';
  /** @type { RegExp } */
  protoReg = new RegExp(`${this.protocal}(.+)`, 'i');
  /** @type { { [key: string]: HTMLElement } } */
  el = {
    add: make('tab-add', {
      textContent: '+',
      title: i18n$('newTab'),
      dataset: {
        command: 'new-tab'
      }
    }),
    head: make('tab-root')
  };
  /**
   * @param { ?HTMLElement } root
   */
  constructor(root) {
    this.el.head.append(this.el.add);
    // A mouse wheel scrolls vertically, the tabs overflow horizontally
    ael(
      this.el.head,
      'wheel',
      (evt) => {
        const e = /** @type {WheelEvent} */ (evt);
        const head = this.el.head;
        if (e.deltaX !== 0 || head.scrollWidth <= head.clientWidth) return;
        e.preventDefault();
        head.scrollLeft += e.deltaY;
      },
      { passive: false }
    );
    root?.append(this.el.head);
  }
  get _pool() {
    return toArray(this.pool).filter((e) => !isNull(e));
  }
  get _active() {
    return this._pool.find(({ classList }) => classList.contains('active')) || null;
  }
  /**
   * @template H
   * @param {H} hostname
   */
  getTab(hostname) {
    const host = this.validate(hostname);
    return this._pool.find(({ dataset }) => dataset.host === host) || null;
  }
  /**
   * @template H
   * @param {H} hostname
   */
  validate(hostname) {
    if (typeof hostname === 'string') {
      return hostname;
    } else if (hostname instanceof URL || hostname instanceof Location) {
      return hostname.toString();
    }
    return '';
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {tabEvents[K]} listener
   */
  addListener(type, listener) {
    this.events.add({ type, listener });
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {...unknown} args
   */
  #dispatch(type, ...args) {
    for (const evt of toArray(this.events).filter((event) => event.type === type)) {
      try {
        if (isFN(evt.listener)) {
          /** @type {Function} */ (evt.listener).call(this, ...args);
        }
      } catch (ex) {
        con.err(ex);
      }
    }
    return this;
  }
  /**
   * Handles internal protocols
   * @template H
   * @param {H} hostname
   */
  intFN(hostname) {
    const h = this.validate(hostname);
    const [, host] = this.protoReg.exec(h) || [];
    return this.#dispatch('internal', host, h);
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   * @param {boolean} [build]
   */
  active(tab, build = true) {
    if (isElem(tab)) {
      if (!this.pool.has(tab)) {
        this.pool.add(tab);
      }
      return this.#dispatch('active', tab, build);
    }
    return this;
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   */
  close(tab) {
    if (isElem(tab)) {
      this.pool.delete(tab);
      this.#dispatch('close', tab);
      tab.remove();
    }
    return this;
  }
  /**
   * @param {string} [hostname] - `undefined` creates a "new tab"
   * @param {string} [title] - Label of the tab
   * @param {boolean} [activate] - Switch to the tab
   */
  create(hostname = undefined, title = undefined, activate = true) {
    if (typeof hostname === 'string') {
      const createdTab = this.getTab(hostname);
      if (createdTab) {
        if (activate) this.active(createdTab);
        return createdTab;
      }
    }
    const tab = make('tab-content', {
      dataset: {
        command: 'switch-tab'
      },
      style: `order: ${this.el.head.childElementCount};`
    });
    const tabClose = make('tab-close', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabHost = make('tab-host');
    tab.append(tabHost, tabClose);
    const [, host] = this.protoReg.exec(hostname ?? '') ?? [];
    if (isNull(hostname)) {
      tab.dataset.host = this.blank;
      tabHost.title = tabHost.textContent = i18n$('newTab');
    } else if (host) {
      tab.dataset.host = hostname;
      tabHost.title = tabHost.textContent = i18n$(host);
    } else {
      tab.dataset.host = hostname;
      tabHost.title = tabHost.textContent = title ?? hostname;
    }
    this.el.head.append(tab);
    this.pool.add(tab);
    if (activate) this.active(tab, true);
    return tab;
  }
}
class Timeout {
  /**
   * @type {number[]}
   */
  ids = [];
  /**
   * @param {number} delay
   * @returns {Promise<void>}
   */
  set(delay) {
    return new Promise((resolve) => {
      /** @type {number} */
      const id = setTimeout(() => {
        this.clear(id);
        resolve();
      }, delay);
      this.ids.push(id);
    });
  }
  /**
   * @param {...number} ids
   */
  clear(...ids) {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
    return this;
  }
  /**
   * Clears every pending timeout.
   */
  clearAll() {
    return this.clear(...this.ids);
  }
}
//#region Icon SVGs
/**
 * Icons are described as data and built with `createElementNS`, no HTML parsing (`innerHTML`)
 * is involved, so they work on pages that enforce Trusted Types.
 */
class IconSVG extends null {
  static NS = 'http://www.w3.org/2000/svg';
  /**
   * @type { { [key: string]: { viewBox: string; fill?: string; stroke?: string; nodes: [string, Record<string, string>][] } } }
   */
  static type = {
    _: {
      viewBox: '0 0 0 0',
      nodes: []
    },
    close: {
      viewBox: '0 0 384 512',
      nodes: [
        [
          'path',
          {
            d: 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
          }
        ]
      ]
    },
    collapse: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z'
          }
        ]
      ]
    },
    download: {
      viewBox: '0 0 384 512',
      nodes: [
        [
          'path',
          {
            d: 'M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z'
          }
        ]
      ]
    },
    expand: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z'
          }
        ]
      ]
    },
    gear: {
      viewBox: '0 0 512 512',
      nodes: [
        [
          'path',
          {
            d: 'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z'
          }
        ]
      ]
    },
    minus: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z'
          }
        ]
      ]
    },
    copy: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z'
          }
        ]
      ]
    },
    open: {
      viewBox: '0 0 512 512',
      nodes: [
        [
          'path',
          {
            d: 'M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z'
          }
        ]
      ]
    },
    video: {
      viewBox: '0 0 576 512',
      nodes: [
        [
          'path',
          {
            d: 'M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z'
          }
        ]
      ]
    },
    remove: {
      viewBox: '0 0 16 16',
      nodes: [
        [
          'path',
          {
            d: 'M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z'
          }
        ]
      ]
    }
  };
  /**
   * @param {keyof typeof IconSVG["type"]} key
   * @param {HTMLElement} [container] - Element to append to
   * @returns {SVGSVGElement}
   */
  static load(key, container) {
    if (!(key in IconSVG.type)) {
      key = '_';
    }
    const sel = IconSVG.type[key];
    const svgElem = document.createElementNS(IconSVG.NS, 'svg');
    svgElem.setAttribute('viewBox', sel.viewBox);
    svgElem.setAttribute('aria-hidden', 'true');
    svgElem.setAttribute('class', 'mujs-icon magicph-icon');
    svgElem.dataset.icon = String(key);
    if (sel.fill) svgElem.setAttribute('fill', sel.fill);
    if (sel.stroke) svgElem.setAttribute('stroke', sel.stroke);
    for (const [tag, attrs] of sel.nodes) {
      const node = document.createElementNS(IconSVG.NS, tag);
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
      svgElem.append(node);
    }
    if (container) container.append(svgElem);
    return svgElem;
  }
}
//#endregion
/**
 * `localStorage` wrapper, only used when no userscript manager is available.
 *
 * Every access is guarded, `localStorage` throws on sandboxed frames / blocked cookies.
 */
class jsStorage extends null {
  static prefix = 'MPH';
  /**
   * @returns {Storage | null}
   */
  static get #store() {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
  /**
   * @param {string} key
   */
  static getItem(key) {
    try {
      return jsStorage.#store?.getItem(`${jsStorage.prefix}-${key}`) ?? null;
    } catch {
      return null;
    }
  }
  /**
   * @param {string} key
   * @param {string} value
   */
  static setItem(key, value) {
    try {
      jsStorage.#store?.setItem(`${jsStorage.prefix}-${key}`, value);
    } catch (ex) {
      con.err(ex);
    }
    return jsStorage;
  }
  /**
   * @param {string} key
   * @param {unknown} v
   */
  static async setValue(key, v) {
    if (v !== undefined) {
      const str = typeof v === 'string' ? v : JSON.stringify(v);
      if ($GM.isGM) {
        await $GM.setValue(key, str);
      } else {
        jsStorage.setItem(key, str);
      }
    }
    return jsStorage;
  }
  /**
   * @template D
   * @param {string} key
   * @param {D} def
   * @returns {Promise<D>}
   */
  static async getValue(key, def) {
    try {
      const _def = Object.assign({}, def);
      /**
       * @param {unknown} s
       */
      const parse = (s) => {
        if (typeof s === 'string') {
          try {
            const p = JSON.parse(s);
            if (isObj(p) && !isEmpty(p)) return p;
          } catch {
            /* empty */
          }
        } else if (isObj(s) && !isEmpty(s)) {
          return s;
        }
        return _def;
      };
      const store = $GM.isGM
        ? await $GM.getValue(key, JSON.stringify(_def))
        : jsStorage.getItem(key);
      return /** @type {D} */ (parse(store));
    } catch (ex) {
      con.err(ex);
      return def;
    }
  }
}
// #endregion
// #region Network
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  req(requestURL, method = 'GET', responseType = 'json', data, useFetch = false) {
    return new Promise((resolve, reject) => {
      const target = requestURL instanceof URL ? requestURL.href : String(requestURL ?? '');
      if (isEmpty(target)) {
        reject(new Error('"url" parameter is empty', { cause: 'Network.req' }));
        return;
      }
      const params = Object.assign({}, data);
      params.method = String(method).toUpperCase().replaceAll(/\W/g, '');
      const type = String(responseType).toLowerCase().replaceAll(/\W/g, '');
      const timeout = typeof params.timeout === 'number' ? params.timeout : 30000;
      /**
       * @param {string | number} status
       * @param {string} cause
       */
      const fail = (status, cause) => {
        const e = new Error(`status: ${status} finalURL: ${target}`, { cause });
        e.name = '';
        reject(e);
      };
      /**
       * @param {string} txt
       */
      const asJSON = (txt) => {
        try {
          return JSON.parse(txt);
        } catch (ex) {
          reject(ex);
          return undefined;
        }
      };
      if (useFetch || !$GM.isGM) {
        const ctl = new AbortController();
        const timer = timeout > 0 ? setTimeout(() => ctl.abort(), timeout) : undefined;
        const init = { ...params };
        if (!init.signal) init.signal = ctl.signal;
        delete init.onprogress;
        delete init.timeout;
        delete init.anonymous;
        // `fetch` only accepts a same-origin referrer
        if (
          init.referrer &&
          new URL(init.referrer, window.location.href).origin !== window.location.origin
        ) {
          delete init.referrer;
        }
        fetch(target, init)
          .then(async (resp) => {
            if (!resp.ok) {
              fail(resp.status, 'Network.req::fetch');
              return;
            }
            if (/array|buffer/.test(type)) {
              resolve(await resp.arrayBuffer());
            } else if (/json/.test(type)) {
              resolve(await resp.json());
            } else if (/text/.test(type)) {
              resolve(await resp.text());
            } else if (/blob/.test(type)) {
              resolve(await resp.blob());
            } else if (/form|data/.test(type)) {
              resolve(await resp.formData());
            } else if (/clone|copy/.test(type)) {
              resolve(resp.clone());
            } else if (/document/.test(type)) {
              resolve(parseHTML(await resp.text()));
            } else {
              resolve(resp);
            }
          })
          .catch(reject)
          .finally(() => {
            if (timer !== undefined) clearTimeout(timer);
          });
        return;
      }
      if (params.credentials) {
        params.anonymous = Object.is(params.credentials, 'omit');
        delete params.credentials;
      }
      if (params.referrer) {
        params.headers = { Referer: params.referrer, ...params.headers };
        delete params.referrer;
      }
      /** @type {'arraybuffer' | 'blob' | 'json' | 'text'} */
      const gmType = /array|buffer/.test(type)
        ? 'arraybuffer'
        : /^(blob|json)$/.test(type)
          ? /** @type {'blob' | 'json'} */ (type)
          : 'text';
      $GM.xmlHttpRequest({
        ...params,
        url: target,
        responseType: gmType,
        timeout: timeout > 0 ? timeout : undefined,
        onerror(r) {
          fail(r?.status ?? 0, 'Network.req::onerror');
        },
        ontimeout() {
          fail('timeout', 'Network.req::ontimeout');
        },
        onabort() {
          fail('aborted', 'Network.req::onabort');
        },
        onload(r) {
          if (r.status < 200 || r.status >= 300) {
            fail(r.status, 'Network.req::onload');
          } else if (/basic/.test(type)) {
            resolve(r);
          } else if (/document/.test(type)) {
            resolve(parseHTML(String(r.responseText ?? r.response ?? '')));
          } else if (gmType === 'json') {
            resolve(
              typeof r.response === 'string' || r.response == null
                ? asJSON(String(r.response ?? r.responseText ?? ''))
                : r.response
            );
          } else {
            resolve(r.response);
          }
        }
      });
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes <= 0) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), this.sizes.length - 1);
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  prog(evt) {
    return !evt.total
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  async doc(pageURL, data, useFetch) {
    return parseHTML(await Network.req(pageURL, 'GET', 'text', data, useFetch));
  },
  async fetchChunks(chunkURL, data, onProgress) {
    /** @type {Response} */
    const resp = await Network.req(chunkURL, 'GET', 'basic', { timeout: 0, ...data }, true);
    const total = Number(resp.headers.get('Content-Length')) || 0;
    if (!resp.body || !isFN(resp.body.getReader)) {
      const buf = new Uint8Array(await resp.arrayBuffer());
      if (isFN(onProgress)) onProgress({ loaded: buf.length, total: buf.length });
      return { chunks: [buf], size: buf.length };
    }
    /** @type {Uint8Array[]} */
    const chunks = [];
    let size = 0;
    const reader = resp.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        size += value.length;
        if (isFN(onProgress)) onProgress({ loaded: size, total });
      }
    } finally {
      reader.releaseLock();
    }
    return { chunks, size };
  },
  gmBlob(blobURL, data, onProgress) {
    return new Promise((resolve, reject) => {
      const fail = (/** @type {string | number} */ status) =>
        reject(new Error(`status: ${status} finalURL: ${blobURL}`, { cause: 'Network.gmBlob' }));
      $GM.xmlHttpRequest({
        url: blobURL,
        method: 'GET',
        responseType: 'blob',
        anonymous: Object.is(data?.credentials, 'omit'),
        headers: data?.referrer ? { Referer: data.referrer } : undefined,
        onprogress(evt) {
          if (isFN(onProgress)) onProgress({ loaded: evt.loaded, total: evt.total });
        },
        onload(r) {
          if (r.status >= 200 && r.status < 300 && r.response) {
            resolve(r.response);
          } else {
            fail(r.status);
          }
        },
        onerror: (r) => fail(r?.status ?? 0),
        ontimeout: () => fail('timeout'),
        onabort: () => fail('aborted')
      });
    });
  },
  async blob(blobURL, data, onProgress) {
    try {
      const { chunks } = await Network.fetchChunks(blobURL, data, onProgress);
      return new Blob(chunks, { type: 'application/octet-stream' });
    } catch (ex) {
      // Most commonly CORS, a userscript manager request is not bound by it
      if (!$GM.isGM) throw ex;
      con.info('Fetch failed, retrying with "xmlHttpRequest":', errMsg(ex));
      return Network.gmBlob(blobURL, data, onProgress);
    }
  },
  async download(details, onProgress) {
    const blob = await Network.blob(details.url, details.data, onProgress);
    saveAs(blob, details.name);
    return details.name;
  }
};
// #endregion
// #region Handle Page
/**
 * Information about a supported website / page.
 * @typedef {{
 *   webpage: URL;
 *   host: string;
 *   root: string;
 *   pathType: string;
 * }} SiteInfo
 */
/**
 * Resolves which supported website a URL belongs to, provides the site palette and page globals.
 */
class HandlePage {
  /**
   * Supported websites, key is the "root" name used by the site handlers.
   * @type {Record<string, { domains: string[] }>}
   */
  static HOST = {
    pornhub: { domains: ['pornhub.com', 'pornhubpremium.com'] },
    youporn: { domains: ['youporn.com', 'youporngay.com'] },
    redtube: { domains: ['redtube.com'] },
    tube8: { domains: ['tube8.com'] },
    thumbzilla: { domains: ['thumbzilla.com'] },
    onlyfans: { domains: ['onlyfans.com'] },
    xhamster: { domains: ['xhamster.com'] },
    xnxx: { domains: ['xnxx.com'] },
    xvideos: { domains: ['xvideos.com'] },
    '91porn': { domains: ['91porn.com'] },
    hqporner: { domains: ['hqporner.com'] },
    spankbang: { domains: ['spankbang.com'] },
    porntrex: { domains: ['porntrex.com'] },
    analdin: { domains: ['analdin.com'] },
    porn00: { domains: ['porn00.org'] },
    sxyprn: { domains: ['sxyprn.com'] },
    eporner: { domains: ['eporner.com'] },
    youjizz: { domains: ['youjizz.com'] }
  };
  /**
   * @param {string | URL | Location} [input]
   * @returns {URL}
   */
  static toURL(input = window.location.href) {
    try {
      if (input instanceof URL) return input;
      if (typeof input === 'string') return new URL(input, window.location.href);
      if (input && typeof input.href === 'string') return new URL(input.href);
    } catch (ex) {
      con.err(ex);
    }
    return new URL(BLANK_PAGE);
  }
  /**
   * Resolves `input` without touching any state.
   * @param {string | URL | Location} [input]
   * @returns {SiteInfo}
   */
  static resolve(input) {
    const webpage = HandlePage.toURL(input);
    const host = getHostname(webpage.hostname);
    const root = Object.keys(HandlePage.HOST).find((k) =>
      HandlePage.HOST[k].domains.includes(host)
    );
    /** @type {Map<string, RegExp>} */
    const routes = new Map();
    if (root && /pornhub|tube8|youporn|thumbzilla|redtube/.test(root)) {
      if (root === 'pornhub') {
        routes.set('GIF', /^\/gif\/\d+(?:\/(?=$))?$/i);
        routes.set('Shorties', /^\/shorties(?:\/(?=$))?$/i);
      }
      routes.set('Video', root === 'redtube' ? /\/[\d]+/ : /(video|watch)+|\/[\d]+\//);
    }
    const pathType = [...routes].find(([, reg]) => reg.test(webpage.pathname))?.[0] ?? 'Unknown';
    return { webpage, host, root: root ?? 'blank', pathType };
  }
  /**
   * Site palette, applied as CSS variables.
   * @param {string} root
   * @returns {Record<string, string>}
   */
  static palette(root) {
    if (/tube8/.test(root)) {
      return {
        'mph-site-color': 'hsl(201, 64%, 40%)',
        'mph-hover-color': 'hsl(201, 64%, 25%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(201, 64%, 40%)'
      };
    } else if (/thumbzilla/.test(root)) {
      return {
        'mph-site-color': 'hsl(168, 75%, 42%)',
        'mph-hover-color': 'hsl(168, 75%, 27%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(168, 75%, 42%)'
      };
    } else if (/redtube/.test(root)) {
      return {
        'mph-site-color': 'hsl(357, 76%, 39%)',
        'mph-hover-color': 'hsl(357, 76%, 24%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(357, 76%, 39%)'
      };
    } else if (/youporn/.test(root)) {
      return {
        'mph-site-color': 'hsl(345, 80%, 63%)',
        'mph-hover-color': 'hsl(345, 80%, 48%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(345, 80%, 63%)'
      };
    } else if (/onlyfans/.test(root)) {
      return {
        'mph-site-color': 'var(--text-color, var(--mph-text-color, hsl(210, 12%, 97%)))',
        'mph-hover-color': 'var(--swiper-theme-color, hsl(196, 100%, 32%))',
        'mph-background-color': 'rgba(138,150,163,.12)',
        'mph-border-color': 'rgba(138,150,163,.12)',
        'mph-accent': 'hsl(196, 100%, 47%)',
        'mph-root-bg': 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))',
        'mph-header-bg': 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))'
      };
    } else if (/xhamster/.test(root)) {
      return {
        'mph-site-color': 'var(--color-white-origin, #fff)',
        'mph-hover-color': '#d42025',
        'mph-background-color': 'var(--color-accent-red, #e34449)',
        'mph-border-color': 'var(--color-accent-red, #e34449)'
      };
    }
    return {
      'mph-site-color': 'hsl(36, 100%, 50%)',
      'mph-hover-color': 'hsl(36, 100%, 35%)',
      'mph-background-color': 'hsl(0, 0%, 0%)',
      'mph-border-color': 'hsl(36, 100%, 50%)'
    };
  }
  /**
   * Default spot of the floating button, `[corner, distance from the edge in rem]`.
   *
   * Keeps it clear of what websites pin to their corners: bottom navigation bars on phones,
   * "live cams" / chat popups on desktop.
   * @type {Record<string, { desktop: [string, number]; mobile: [string, number] }>}
   */
  static SPOTS = {
    default: { desktop: ['bottom-right', 1], mobile: ['bottom-right', 4.5] },
    onlyfans: { desktop: ['bottom-right', 1], mobile: ['bottom-right', 5] },
    xhamster: { desktop: ['bottom-left', 1], mobile: ['bottom-right', 4.5] }
  };
  /**
   * Where the floating button sits, as `--mujs-position-*` values.
   * @param {string} [corner] - `auto` (website default), `top-left`, `top-right`, `bottom-left` or `bottom-right`
   * @param {string} [root] - Website
   * @param {boolean} [mobile]
   * @returns {Record<string, string>}
   */
  static placement(corner = 'auto', root = 'default', mobile = isMobile) {
    const spot = (HandlePage.SPOTS[root] ?? HandlePage.SPOTS.default)[
      mobile ? 'mobile' : 'desktop'
    ];
    const [where, lift] = /^(top|bottom)-(left|right)$/.test(corner) ? [corner, 1] : spot;
    const [vertical, horizontal] = where.split('-');
    const safe = (/** @type {string} */ edge) => `env(safe-area-inset-${edge}, 0px)`;
    /** @param {string} edge @param {number} rem */
    const at = (edge, rem) => `calc(${rem}rem + ${safe(edge)})`;
    return {
      'mujs-position-top': vertical === 'top' ? at('top', lift) : 'auto',
      'mujs-position-bottom': vertical === 'bottom' ? at('bottom', lift) : 'auto',
      'mujs-position-left': horizontal === 'left' ? at('left', 1) : 'auto',
      'mujs-position-right': horizontal === 'right' ? at('right', 1) : 'auto'
    };
  }
  /** @type {SiteInfo} */
  #info;
  /**
   * @param {string | URL | Location} [input]
   */
  constructor(input) {
    this.#info = HandlePage.resolve(input);
  }
  /**
   * @param {string | URL | Location} input
   */
  setCurrent(input) {
    this.#info = HandlePage.resolve(input);
    return this;
  }
  /**
   * @type { import("../typings/types.d.ts").HandlePage['current'] }
   */
  get current() {
    return this.#info;
  }
  get webpage() {
    return this.#info.webpage;
  }
  get host() {
    return this.#info.host;
  }
  get root() {
    return this.#info.root;
  }
  get palette() {
    return HandlePage.palette(this.#info.root);
  }
  /**
   * Mobile websites redirect to "Continue to video" (interstitial), skip it.
   * @returns {boolean} `true` when the page is being redirected
   */
  mobileFix() {
    if (!isMobile || this.root !== 'pornhub') return false;
    try {
      document.cookie = `views=0; path=/; domain=.${this.host}`;
      const { webpage } = this;
      if (webpage.pathname.startsWith('/interstitial') && webpage.searchParams.has('viewkey')) {
        const videoURL = `${webpage.origin}/view_video.php?viewkey=${encodeURIComponent(webpage.searchParams.get('viewkey') ?? '')}`;
        con.info(`Redirecting to "${videoURL}"`);
        window.location.href = videoURL;
        return true;
      }
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
}
const HP = new HandlePage();
// #endregion
// #region Media
/**
 * Resolution of a video url: `720p.mp4`, `720P_4000K_1.mp4`, `720p.h264.mp4`, `720.mp4`.
 * The query is ignored, signed urls contain random characters.
 * @param {string} src
 */
/**
 * Sorts `hlsByQuality` best-first into a playlist array, only when its best quality actually beats
 * `files`' best (or there are no files) -- otherwise HLS adds nothing worth offering.
 * @param {Array<string | { src: string }>} files
 * @param {Map<number, string>} hlsByQuality
 * @returns {{ ts: string[]; preferHLS: boolean }}
 */
const pickHLS = (files, hlsByQuality) => {
  if (!hlsByQuality.size) return { ts: [], preferHLS: false };
  const bestFile = Math.max(
    0,
    ...files.map((f) =>
      typeof f === 'string' ? resolutionOf(f) : parseInt(f.label, 10) || resolutionOf(f.src)
    )
  );
  const bestHls = Math.max(...hlsByQuality.keys());
  if (bestHls <= bestFile && files.length) return { ts: [], preferHLS: false };
  const ts = Array.from(hlsByQuality.keys())
    .sort((a, b) => b - a)
    .map((q) => /** @type {string} */ (hlsByQuality.get(q)));
  return { ts, preferHLS: true };
};
const resolutionOf = (src) => {
  const path = src.split('?')[0];
  return +(
    /(\d{3,4})p(?=[._]|$)/i.exec(path.split('/').pop() ?? '')?.[1] ??
    /\d+(?=P|p\.)/.exec(path)?.[0] ??
    /\/(\d{3,4})\.(?:mp4|webm)$/.exec(path)?.[1] ??
    0
  );
};
/**
 * Sorts video urls by resolution, highest first.
 * @param {string} ma
 * @param {string} mb
 */
const sortVideos = (ma, mb) => resolutionOf(mb) - resolutionOf(ma);
/**
 * @param {string} str - Contents of a JSON string (without quotes)
 */
const unescapeJSON = (str) => {
  try {
    return JSON.parse(`"${str}"`);
  } catch {
    return str;
  }
};
// #region xHamster
/**
 * xHamster hides the urls of its streams. `ciphertext = [algorithm, seed (int32, little endian), data...]`,
 * every byte of `data` is XORed with the next byte of a pseudo random sequence.
 *
 * Algorithms are the ones of the website player, see also the `xhamster` extractor of yt-dlp.
 * @type {Record<number, (state: { s: number }) => number>}
 */
const XH_ALGORITHMS = {
  1: (st) => (st.s = (Math.imul(st.s, 1664525) + 1013904223) | 0),
  2: (st) => {
    let s = st.s;
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (st.s = s | 0);
  },
  3: (st) => {
    let s = (st.s = (st.s + 0x9e3779b9) | 0);
    s ^= s >>> 16;
    s = Math.imul(s, 0x85ebca77);
    s ^= s >>> 13;
    s = Math.imul(s, 0xc2b2ae3d);
    return s ^ (s >>> 16);
  },
  4: (st) => {
    let s = (st.s = (st.s + 0x6d2b79f5) | 0);
    s = (s << 7) | (s >>> 25);
    s = (s + 0x9e3779b9) | 0;
    s ^= s >>> 11;
    return Math.imul(s, 0x27d4eb2d);
  },
  5: (st) => {
    let s = st.s;
    s ^= s << 7;
    s ^= s >>> 9;
    s ^= s << 8;
    return (st.s = (s + 0xa5a5a5a5) | 0);
  },
  6: (st) => {
    const s = (st.s = (Math.imul(st.s, 0x2c9277b5) + 0xac564b05) | 0);
    return (s ^ (s >>> 18)) >>> ((s >>> 27) & 31);
  },
  7: (st) => {
    const s = (st.s = (st.s + 0x9e3779b9) | 0);
    let e = s ^ (s << 5);
    e = Math.imul(e, 0x7feb352d);
    e ^= e >>> 15;
    return Math.imul(e, 0x846ca68b);
  }
};
/**
 * @param {string} hex
 * @returns {string | null} `null` for unknown algorithms
 */
const xhDecipherHex = (hex) => {
  const b = hex.match(/../g)?.map((x) => parseInt(x, 16)) ?? [];
  const next = XH_ALGORITHMS[b[0]];
  if (!next) return null;
  const st = { s: b[1] | (b[2] << 8) | (b[3] << 16) | (b[4] << 24) | 0 };
  let out = '';
  for (let i = 5; i < b.length; i++) out += String.fromCharCode(b[i] ^ (next(st) & 0xff));
  return out;
};
/**
 * The ciphertext is either the whole url or the first segment of its path.
 * @param {unknown} str
 * @returns {string | null} `null` when it is not a stream url (or the algorithm is unknown)
 */
const xhDecipherURL = (str) => {
  if (typeof str !== 'string') return null;
  const hexRE = /^[0-9a-f]{12,}$/i;
  let out = null;
  if (hexRE.test(str)) {
    out = xhDecipherHex(str);
  } else {
    try {
      const u = new URL(str);
      const [, hex, rest] = /^\/([0-9a-f]{12,})([/,].+)$/i.exec(u.pathname) ?? [];
      const path = hex && xhDecipherHex(hex);
      if (path) out = `${u.origin}/${path}${rest}${u.search}`;
    } catch {
      /* not a url */
    }
  }
  return out && /^https?:\/\//.test(out) ? out : null;
};
/**
 * First balanced `{...}` or `[...]` of `txt` (from `from`), `window.initials={...};` -> object.
 * @param {string} txt
 * @param {number} [from]
 * @returns {any}
 */
const extractJSON = (txt, from = 0) => {
  const start = txt.slice(from).search(/[{[]/) + from;
  let depth = 0;
  let quoted = false;
  for (let i = start; i >= from && i < txt.length; i++) {
    const c = txt[i];
    if (quoted) {
      if (c === '\\') i++;
      else if (c === '"') quoted = false;
    } else if (c === '"') {
      quoted = true;
    } else if (c === '{' || c === '[') {
      depth++;
    } else if ((c === '}' || c === ']') && --depth === 0) {
      return JSON.parse(txt.slice(start, i + 1));
    }
  }
  throw new SyntaxError('No JSON found');
};
/**
 * Video sources of an xHamster page.
 * @param {any} initials - `window.initials`
 * @returns {{ title: string; files: string[]; hls: string[] }} `hls` lists master playlists, best choice first
 */
const xhSources = (initials) => {
  const sources = initials?.xplayerSettings?.sources ?? {};
  /** @type {string[]} */
  const files = [];
  /** @type {Array<[string, string]>} */
  const hls = [];
  /**
   * @param {string} codec
   * @param {any} entry
   */
  const add = (codec, entry) => {
    for (const key of ['url', 'fallback']) {
      const u = xhDecipherURL(entry?.[key]);
      if (!u) continue;
      if (/\.m3u8(?:$|\?)/.test(u)) hls.push([codec, u]);
      else if (!files.includes(u)) files.push(u);
    }
  };
  // h264 plays everywhere, av1 is the last resort
  /** @param {Array<[string, any]>} list */
  const h264First = (list) => list.sort(([a], [b]) => Number(a !== 'h264') - Number(b !== 'h264'));
  for (const [codec, entry] of h264First(Object.entries(sources.hls ?? {}))) add(codec, entry);
  for (const [codec, list] of h264First(Object.entries(sources.standard ?? {}))) {
    for (const entry of toArray(list)) add(codec, entry);
  }
  hls.sort(([a], [b]) => Number(a !== 'h264') - Number(b !== 'h264'));
  return {
    title: String(initials?.videoModel?.title ?? ''),
    files,
    hls: [...new Set(hls.map(([, u]) => u))]
  };
};
// #endregion
/**
 * HTTP Live Streaming, merges the segments of a playlist into a single file.
 */
class mphHLS {
  /**
   * @param {string[]} playlists - URLs of the (master) playlist, mirrors are tried in order
   * @param {Record<string, any>} [data] - Request options
   * @param {?HTMLElement} [$el] - Element that displays the progress
   * @param {string} [root] - Website "root" name
   */
  constructor(playlists, data = {}, $el = null, root = HP.root) {
    this.urls = playlists;
    this.data = data;
    this.$el = $el;
    /** File extension of the merged file */
    this.ext = 'ts';
    /** Use the userscript manager for segments, `fetch` is usually blocked by CORS */
    this.viaGM = /xhamster/.test(root);
  }
  /**
   * Resolves a playlist entry against the playlist that lists it.
   * @param {string} ref
   * @param {string} from
   */
  resolve(ref, from) {
    return new URL(ref, from).href.replace(/m3u8\/\//g, 'm3u8/');
  }
  /**
   * @param {string} playlistURL
   * @returns {Promise<string>}
   */
  async req(playlistURL) {
    return (await Network.req(playlistURL, 'GET', 'text', this.data)).trim();
  }
  /**
   * Reads a playlist: every line that is not a tag is a URI (RFC 8216), of a variant in a master playlist
   * or of a segment in a media playlist.
   * @param {string} text
   */
  static parse(text) {
    /** @type {Array<{ uri: string; height: number; bandwidth: number }>} */
    const variants = [];
    /** @type {string[]} */
    const segments = [];
    let map;
    let encrypted = false;
    let info = '';
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (line.startsWith('#EXT-X-STREAM-INF:')) {
        info = line;
      } else if (line.startsWith('#EXT-X-MAP:')) {
        map = /URI="([^"]+)"/.exec(line)?.[1];
      } else if (line.startsWith('#EXT-X-KEY:')) {
        encrypted ||= !/METHOD=NONE/i.test(line);
      } else if (line && !line.startsWith('#')) {
        if (info) {
          variants.push({
            uri: line,
            height: +(/RESOLUTION=\d+x(\d+)/.exec(info)?.[1] ?? /(\d+)p/.exec(line)?.[1] ?? 0),
            bandwidth: +(/BANDWIDTH=(\d+)/.exec(info)?.[1] ?? 0)
          });
          info = '';
        } else {
          segments.push(line);
        }
      }
    }
    variants.sort((a, b) => b.height - a.height || b.bandwidth - a.bandwidth);
    return { variants, segments, map, encrypted };
  }
  /**
   * Downloads a single segment, retries on failure.
   * @param {string} segmentURL
   * @returns {Promise<BlobPart[]>}
   */
  async segment(segmentURL) {
    /** @type {unknown} */
    let last;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (!this.viaGM) {
          try {
            return (await Network.fetchChunks(segmentURL, this.data)).chunks;
          } catch (ex) {
            if (!$GM.isGM) throw ex;
            this.viaGM = true;
          }
        }
        return [await Network.gmBlob(segmentURL, this.data)];
      } catch (ex) {
        last = ex;
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
    throw last;
  }
  /**
   * Merges a media playlist into a single file, throws when a single segment fails.
   * @param {ReturnType<typeof mphHLS.parse>} playlist
   * @param {string} playlistURL
   */
  async merge(playlist, playlistURL) {
    if (playlist.encrypted) {
      throw new Error('Encrypted HLS streams are not supported', { cause: 'mphHLS.merge' });
    }
    if (isEmpty(playlist.segments)) throw new Error('No segments found', { cause: 'mphHLS.merge' });
    /** @type {BlobPart[]} */
    const parts = [];
    if (playlist.map) {
      // fMP4: the initialization segment comes first
      this.ext = 'mp4';
      parts.push(...(await this.segment(this.resolve(playlist.map, playlistURL))));
    }
    const name = playlistURL.split(/[/?]/).filter(Boolean).pop() ?? playlistURL;
    const frags = playlist.segments.map((s) => this.resolve(s, playlistURL));
    const limit = cfg?.limitDownloads || isMobile ? 1 : Math.max(1, Number(cfg?.concurrency) || 4);
    let done = 0;
    const chunks = await runPool(frags, limit, async (f) => {
      const part = await this.segment(f);
      done++;
      if (this.$el) this.$el.textContent = `${done}/${frags.length}`;
      msg(`[MagicPH] Merging segments for "${name}" (${done}/${frags.length})`);
      return part;
    });
    parts.push(...chunks.flat());
    return new Blob(parts, { type: this.ext === 'mp4' ? 'video/mp4' : 'video/mp2t' });
  }
  /**
   * Builds the best quality that works, the next one is tried when a quality fails.
   * @returns {Promise<?Blob>} `null` on failure
   */
  async start() {
    msg('[MagicPH] Creating cache using "Fetch API"', 2500);
    /** @type {unknown} */
    let last = new Error('No playlist', { cause: 'mphHLS.start' });
    for (const url of this.urls) {
      try {
        return await this.build(url);
      } catch (ex) {
        last = ex;
        con.err(ex);
      }
    }
    msg(`[MagicPH] Error occured while creating cache: ${errMsg(last)}`, 4000);
    return null;
  }
  /**
   * Builds the best quality of a playlist that works, the next one is tried when a quality fails.
   * @param {string} url
   * @returns {Promise<Blob>}
   */
  async build(url) {
    let base = url;
    let text = await this.req(base);
    if (text.startsWith('[{')) {
      // Pornhub lists the playlists as JSON
      const hls = JSON.parse(text).find(
        (/** @type {any} */ e) => e.format === 'hls' && e.defaultQuality
      );
      base = hls?.videoUrl;
      text = await this.req(base);
    }
    const master = mphHLS.parse(text);
    /** @type {unknown} */
    let last = new Error('No qualities found', { cause: 'mphHLS.build' });
    for (const uri of master.variants.length ? master.variants.map((v) => v.uri) : [null]) {
      try {
        const playlistURL = uri ? this.resolve(uri, base) : base;
        const playlist = uri ? mphHLS.parse(await this.req(playlistURL)) : master;
        msg(`[MagicPH] Building cache for "${playlistURL.split(/[/?]/).filter(Boolean).pop()}"`);
        const blob = await this.merge(playlist, playlistURL);
        msg('[MagicPH] Cache complete!', 2500);
        return blob;
      } catch (ex) {
        last = ex;
        con.err(ex);
      }
    }
    throw last;
  }
}
/**
 * Absolute address of `ref`.
 * @param {string} ref
 * @param {string | URL} base
 * @returns {string} Empty when `ref` is not an address
 */
const absURL = (ref, base) => {
  try {
    return ref ? new URL(ref, base).href : '';
  } catch {
    return '';
  }
};
/**
 * JSON-LD objects of a page.
 * @param {Document} doc
 * @returns {Array<Record<string, any>>}
 */
const ldNodes = (doc) => {
  /** @type {Array<Record<string, any>>} */
  const nodes = [];
  for (const node of qsA('script[type="application/ld+json"]', doc)) {
    try {
      const json = JSON.parse(node.textContent ?? '');
      nodes.push(...[].concat(json?.['@graph'] ?? json).filter(isObj));
    } catch {
      /* not JSON */
    }
  }
  return nodes;
};
/**
 * Title, thumbnail and duration a page announces to search engines and social networks (JSON-LD, Open Graph).
 * @param {Document} doc
 * @param {string | URL} base - Address of the page, thumbnails may be relative
 * @returns {{ title?: string; poster?: string; duration: number }}
 */
const readMeta = (doc, base) => {
  /** @param {string} selector */
  const meta = (selector) => qs(selector, doc)?.getAttribute('content')?.trim() || undefined;
  const video = ldNodes(doc).find((n) => /VideoObject/.test(String([].concat(n['@type']))));
  const thumb = [].concat(video?.thumbnailUrl ?? []).find((t) => typeof t === 'string' || t?.url);
  const poster =
    (typeof thumb === 'string' ? thumb : thumb?.url) ||
    meta('meta[property="og:image"]') ||
    meta('meta[name="twitter:image"]') ||
    qs('link[rel="image_src"]', doc)?.getAttribute('href');
  return {
    title:
      (video?.name && htmlToText(video.name)) || meta('meta[property="og:title"]') || undefined,
    poster: poster ? absURL(poster, base) || undefined : undefined,
    duration: toSeconds(
      video?.duration ||
        meta('meta[property="og:video:duration"]') ||
        meta('meta[property="video:duration"]') ||
        meta('meta[property="og:duration"]') ||
        meta('meta[itemprop="duration"]')
    )
  };
};
/**
 * Finds the video files of a page.
 *
 * The page is requested and parsed (`Network.doc`), what the website keeps in its own variables
 * can be changed or removed at any time.
 */
class mphMedia {
  /**
   * @param {string | URL | Location} [webpage] - Page that contains the video
   */
  constructor(webpage = HP.webpage) {
    /** @type {string} */
    this.webpage = HandlePage.toURL(webpage).href;
    this.site = HandlePage.resolve(this.webpage);
  }
  /**
   * Requests the page, resolves every video quality.
   * @returns {Promise<import("../typings/types.d.ts").VideoData>}
   */
  async find() {
    const { webpage } = this;
    // mydaddy.cc (hqporner's player iframe) rejects the request made through the userscript
    // manager's own networking, a plain `fetch` with no cookies attached goes through instead
    const doc = await (webpage.includes('mydaddy.cc')
      ? Network.doc(webpage, { credentials: 'omit' }, true)
      : Network.doc(webpage));
    const meta = readMeta(doc, webpage);
    /** @type {Set<string>} */
    const files = new Set();
    /** @type {Set<string>} */
    const ts = new Set();
    let title = '';
    let poster = meta.poster;
    let preferHLS = false;
    /** File labelled by the site itself, wins over a label guessed from its address */
    const labelled = new Map();
    if (/xhamster/.test(webpage)) {
      const found = xhSources(
        extractJSON(doc.getElementById('initials-script')?.textContent ?? '')
      );
      title = found.title;
      for (const f of found.files) files.add(f);
      for (const h of found.hls) ts.add(h);
    } else {
      // Pornhub and its siblings: the player setup lists the streams, some of them are addresses
      // that resolve (`"remote":true`) to the per-quality files instead of being one directly
      for (const script of doc.getElementsByTagName('script')) {
        const txt = script.textContent ?? '';
        const at = txt.indexOf('"mediaDefinitions"');
        if (at < 0) continue;
        const [, name = ''] = /"video_title":"(.*?)",/.exec(txt) ?? [];
        if (name) title = unescapeJSON(name);
        /** @type {Array<{ format?: string; videoUrl?: string; remote?: boolean }>} */
        let defs;
        try {
          defs = extractJSON(txt, at);
        } catch (ex) {
          con.err(ex);
          continue;
        }
        /** Best quality found per format, only kept when it beats the files found directly */
        const hlsByQuality = new Map();
        for (const d of toArray(defs)) {
          if (d?.format !== 'mp4' && d?.format !== 'hls') continue;
          const u = absURL(String(d.videoUrl ?? ''), webpage);
          if (!u) continue;
          if (d.remote) {
            try {
              /** @type {Array<{ format?: string; videoUrl?: string; quality?: unknown }>} */
              const list = await Network.req(u);
              for (const q of toArray(list)) {
                const qu = absURL(String(q?.videoUrl ?? ''), webpage);
                if (!qu || Array.isArray(q.quality)) continue;
                const quality = parseInt(String(q.quality), 10) || 0;
                if (q.format === 'hls' || /\.m3u8/.test(qu)) hlsByQuality.set(quality, qu);
                else if (/\.mp4[.?]/.test(qu)) files.add(qu);
              }
            } catch (ex) {
              con.err(ex);
            }
          } else if (d.format === 'hls') {
            ts.add(u);
          } else if (/\.mp4/.test(u)) {
            files.add(u);
          }
        }
        const picked = pickHLS(Array.from(files), hlsByQuality);
        if (picked.preferHLS) {
          preferHLS = true;
          for (const u of picked.ts) ts.add(u);
        }
        if (files.size || ts.size) break;
      }
      if (files.size === 0) {
        const txt = doc.documentElement.innerHTML;
        // `do_pl()`-style embed (hqporner's player iframe): the video markup is a JS string
        // built inline with escaped quotes, quality sits on each source's `title`. The string
        // isn't valid HTML on its own (it's inline in a `<script>`, sometimes duplicated across
        // an if/else), so its `<source>` tags are read directly rather than through parseHTML
        const clean = txt.replace(/\\(["'])/g, '$1');
        /** @param {string} tag @param {string} name */
        const attr = (tag, name) => new RegExp(`${name}=["']([^"']*)["']`).exec(tag)?.[1];
        const sources = Array.from(clean.matchAll(/<source\b([^>]*)>/gi)).filter(
          ([, attrs]) => /\bsrc=/.test(attrs) && /\btitle=/.test(attrs)
        );
        if (sources.length && /id=["']flvv["']/.test(clean)) {
          const videoTag = /<video\b[^>]*\bid=["']flvv["'][^>]*>/i.exec(clean)?.[0] ?? '';
          poster = absURL(attr(videoTag, 'poster') ?? '', webpage) || poster;
          for (const [, attrs] of sources) {
            const src = absURL(attr(attrs, 'src') ?? '', webpage);
            if (!src) continue;
            files.add(src);
            const label = attr(attrs, 'title');
            if (label) labelled.set(src, label);
          }
        } else {
          // KVS players (porntrex, analdin, ...)
          /** @param {RegExp} reg */
          const addAlt = (reg) => {
            for (const r of txt.match(new RegExp(reg.source, 'g')) ?? []) {
              const [, alt = ''] = reg.exec(r) ?? [];
              if (!isEmpty(alt)) files.add(alt.replaceAll('function/0/', ''));
            }
          };
          title = /video_title: '(.*?)'/.exec(txt)?.[1] || title;
          if (!/porntrex/.test(webpage)) addAlt(/video_alt_url: '(.*?)'/);
          addAlt(/video_alt_url\d+: '(.*?)'/);
          const [, A, B, C] =
            /(\w+)\.replaceAll\("\w+",(\w+)\+"pubs\/"\+(\w+)\+"\/"\)/.exec(txt) ?? [];
          const [, videoHTML] = (A && new RegExp(`${A}="(<video.+</video>)"`).exec(txt)) || [];
          if (videoHTML) {
            const [b = '', c = ''] = [B, C].map(
              (e) => new RegExp(`${e}="(.*?)"`).exec(txt)?.[1] ?? ''
            );
            const html = parseHTML(
              videoHTML.replaceAll('nrpuv', `${b}pubs/${c}/`).replaceAll('\\"', '"')
            );
            poster = absURL(qs('video', html)?.getAttribute('poster') ?? '', webpage) || poster;
            for (const source of qsA('source', html)) {
              const src = absURL(source.getAttribute('src') ?? '', webpage);
              if (src) files.add(src);
            }
          }
        }
      }
    }
    return {
      page: webpage,
      title: title || meta.title || doc.title,
      poster,
      duration: meta.duration,
      preferHLS,
      files: Array.from(files)
        .sort(sortVideos)
        .map((src) =>
          labelled.has(src) ? { src, label: /** @type {string} */ (labelled.get(src)) } : src
        ),
      ts: Array.from(ts)
    };
  }
}
// #endregion
// #region Library
/**
 * File extension of a media url.
 * @param {string} src
 * @param {string} [def]
 */
const extFromURL = (src, def = 'mp4') => {
  try {
    const [, ext = ''] =
      /\.(mp4|webm|m4v|mov|ts|m4s|gif|webp|jpe?g|png|avif|mp3|m4a)$/i.exec(new URL(src).pathname) ??
      [];
    return ext ? ext.toLowerCase() : def;
  } catch {
    return def;
  }
};
/**
 * Request options (`fetch` style) required to download media of `root`.
 * @param {string} root
 * @returns {Record<string, any>}
 */
const requestOptions = (root) => {
  if (/xhamster/.test(root)) {
    return { credentials: 'omit', referrer: `${HP.webpage.protocol}//${HP.host}/` };
  }
  return {};
};
/**
 * Progress reporter for a transfer, updates the notice at most 4 times per second.
 * @param {string} name
 * @returns {(evt: { loaded: number; total: number }) => void}
 */
const progressNotice = (name) => {
  let last = 0;
  return (evt) => {
    const now = Date.now();
    if (now - last < 250 && evt.loaded !== evt.total) return;
    last = now;
    msg(`[MagicPH] (${Network.prog(evt)}) Downloading "${name}" using "Fetch API"`);
  };
};
/**
 * Type of a media, an image is a photo.
 * @param {string} src
 * @returns {import("../typings/types.d.ts").MediaType}
 */
const typeFromURL = (src) =>
  /^(?:gif|webp|jpe?g|png|avif)$/.test(extFromURL(src, '')) ? 'photo' : 'video';
/**
 * Holds every video found on the page, owns the elements that display them.
 *
 * Everything is a card in the feed of a tab (the layout of an OnlyFans post):
 *
 * - `post`: an OnlyFans post, every tile is a media of the post
 * - `video`: a video, every tile is a quality of it (or the HLS stream when that is all there is)
 */
class Library {
  /** @type {Map<string, import("../typings/types.d.ts").MediaGroup>} */
  groups = new Map();
  /** @type {Map<string, import("../typings/types.d.ts").MediaItem>} */
  items = new Map();
  /** @type {Map<string, import("../typings/types.d.ts").PostEntry>} */
  posts = new Map();
  /** @type {?HTMLVideoElement} */
  static #probe = null;
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.container = container;
  }
  /**
   * Returns the group for `key`, creates it (pane + tab) when missing.
   * @param {string} key
   * @param {{ title?: string; counted?: boolean; activate?: boolean }} [opts]
   */
  group(key, opts = {}) {
    const { container } = this;
    container.init();
    let group = this.groups.get(key);
    if (!group) {
      const pane = make('mujs-list', 'mph-feed hidden', { dataset: { host: key } });
      container.tbody.append(pane);
      group = {
        key,
        title: opts.title ?? key,
        counted: opts.counted ?? false,
        items: new Set(),
        pane,
        tab: null
      };
      this.groups.set(key, group);
    }
    if (!group.tab || !group.tab.isConnected) {
      group.tab = container.Tabs.create(key, group.title, opts.activate ?? true);
    }
    return group;
  }
  /**
   * Adds a video: one card, one tile per quality, or a single tile for the HLS stream when
   * there is nothing else.
   * @param {import("../typings/types.d.ts").VideoData} video
   * @returns {boolean} `false` when the page has no video
   */
  addVideo(video) {
    const page = HandlePage.toURL(video.page ?? HP.webpage);
    const title = String(isEmpty(video.title) ? document.title || 'MagicPH' : video.title);
    const shared = { poster: video.poster, data: video.hermes ?? {} };
    const files = Library.qualities(video.files);
    /** @type {import("../typings/types.d.ts").PostMedia[]} */
    const media = files.map(({ src, label }) => ({
      ...shared,
      id: label,
      label,
      src,
      type: typeFromURL(src),
      name: files.length > 1 ? `${title} (${label})` : title
    }));
    const stream = toArray(video.ts);
    if (stream.length && (media.length === 0 || video.preferHLS) || stream.find((i) => i.includes('xhcdn.com'))) {
      media.push({ ...shared, id: 'hls', label: 'HLS', type: 'video', stream, name: title });
    }
    if (media.length === 0) {
      con.info('No video found:', page.href);
      return false;
    }
    const added = this.addPost({
      id: video.id ?? page.href,
      variant: 'video',
      groupKey: title,
      groupTitle: title,
      user: { name: title, avatar: `${page.origin}/favicon.ico` },
      meta: [
        getHostname(page.hostname),
        video.duration ? fancyTimeFormat(video.duration) : ''
      ].filter(Boolean),
      media
    });
    const hls = added.find((i) => i.stream);
    if (hls && cfg.autoHLS) this.container.loadHLS(hls.id).catch((ex) => con.err(ex));
    return true;
  }
  /**
   * Adds a card and its media, media that is already in the card is skipped.
   * @param {import("../typings/types.d.ts").Post} post
   * @returns {import("../typings/types.d.ts").MediaItem[]} The tiles that were added
   */
  addPost(post) {
    const video = post.variant === 'video';
    const group = this.group(post.groupKey, {
      title: post.groupTitle,
      counted: !video,
      activate: video || this.container.Tabs._active === null
    });
    const key = `${group.key}:${post.id}`;
    let entry = this.posts.get(key);
    /** @type {import("../typings/types.d.ts").MediaItem[]} */
    const added = [];
    for (const m of post.media) {
      const id = `${key}:${m.id}`;
      if (this.items.has(id) || !(m.src || m.stream || m.drm)) continue;
      entry ??= this.#renderPost(key, post, group);
      added.push(this.#addItem(entry, group, id, m));
    }
    if (entry) this.#updatePost(entry);
    this.#done();
    return added;
  }
  /**
   * Replaces the HLS tile by the video that was built from it.
   * @param {import("../typings/types.d.ts").MediaItem} item - The HLS tile
   * @param {Blob} blob
   * @param {string} ext
   */
  addBlob(item, blob, ext) {
    const entry = this.posts.get(item.post);
    const group = this.groups.get(item.group);
    if (!entry || !group) return;
    this.#addItem(entry, group, `${item.post}:${ext}`, {
      id: ext,
      type: 'video',
      label: ext.toUpperCase(),
      name: item.title,
      src: URL.createObjectURL(blob),
      blob,
      ext,
      poster: item.poster,
      thumb: item.thumb,
      duration: item.duration,
      data: item.data
    });
    this.removeItem(item.id);
    this.#done();
  }
  /**
   * @param {import("../typings/types.d.ts").PostEntry} entry
   * @param {import("../typings/types.d.ts").MediaGroup} group
   * @param {string} id
   * @param {import("../typings/types.d.ts").PostMedia} m
   */
  #addItem(entry, group, id, m) {
    const { user } = entry.post;
    /** @type {import("../typings/types.d.ts").MediaItem} */
    const item = {
      id,
      src: m.src ?? '',
      title: m.name ?? `${user.username || user.name}-${m.id}`,
      group: group.key,
      post: entry.key,
      type: m.type,
      label: m.label,
      blob: m.blob,
      stream: m.stream,
      drm: m.drm,
      data: m.data ?? {},
      ext: m.ext ?? extFromURL(m.src ?? '', m.type === 'photo' ? 'jpg' : 'mp4'),
      poster: m.poster,
      thumb: m.thumb,
      duration: m.duration,
      preview: m.preview,
      el: /** @type {any} */ (null)
    };
    item.el = this.#renderTile(item, entry);
    entry.grid.append(item.el);
    entry.ids.add(id);
    group.items.add(id);
    this.items.set(id, item);
    return item;
  }
  #done() {
    this.updateCounts();
    if (cfg.autoinject) this.container.inject();
  }
  /**
   * @param {string} id
   */
  removeItem(id) {
    const item = this.items.get(id);
    if (!item) return false;
    item.el.remove();
    if (item.blob) URL.revokeObjectURL(item.src);
    this.groups.get(item.group)?.items.delete(id);
    this.items.delete(id);
    const entry = this.posts.get(item.post);
    if (entry) {
      entry.ids.delete(id);
      if (entry.ids.size === 0) {
        entry.el.remove();
        this.posts.delete(entry.key);
      } else {
        this.#updatePost(entry);
      }
    }
    this.updateCounts();
    return true;
  }
  /**
   * @param {string} postKey
   */
  removePost(postKey) {
    for (const id of Array.from(this.posts.get(postKey)?.ids ?? [])) this.removeItem(id);
  }
  /**
   * Removes a group and everything it holds, does not touch the tab.
   * @param {string} key
   */
  removeGroup(key) {
    const group = this.groups.get(key);
    if (!group) return false;
    for (const id of Array.from(group.items)) this.removeItem(id);
    group.pane.remove();
    this.groups.delete(key);
    this.updateCounts();
    return true;
  }
  /**
   * Every media of the OnlyFans posts.
   */
  get feed() {
    return Array.from(this.items.values()).filter(
      (i) => this.posts.get(i.post)?.post.variant === 'post'
    );
  }
  /**
   * Every OnlyFans media that can be downloaded.
   */
  get media() {
    return this.feed.filter((i) => i.src);
  }
  /**
   * Number of videos: the media of the OnlyFans posts + the videos of the other websites.
   */
  get count() {
    let total = 0;
    for (const { post, ids } of this.posts.values())
      total += post.variant === 'post' ? ids.size : 1;
    return total;
  }
  /**
   * Refreshes every counter.
   */
  updateCounts() {
    for (const group of this.groups.values()) {
      const tabHost = group.tab?.firstElementChild;
      if (tabHost) {
        tabHost.setAttribute('title', group.title);
        tabHost.textContent = group.counted ? `${group.title} (${group.items.size})` : group.title;
      }
    }
    this.container.updateCounters();
  }
  /**
   * Frees every object url, empties the library.
   */
  clear() {
    for (const key of Array.from(this.groups.keys())) this.removeGroup(key);
  }
  /**
   * One entry per quality, highest first. A file without a quality in its url is named after its format.
   * @param {Array<string | { src: string; label?: string }>} [files]
   * @returns {Array<{ src: string; label: string }>}
   */
  static qualities(files) {
    /** @type {Map<string, string>} */
    const seen = new Map();
    /** @type {string[]} */
    const other = [];
    for (const file of toArray(files)) {
      const { src, label = '' } = typeof file === 'string' ? { src: file } : file;
      if (!src) continue;
      const q = label || (resolutionOf(src) ? `${resolutionOf(src)}p` : '');
      if (!q) other.push(src);
      else if (!seen.has(q)) seen.set(q, src);
    }
    const out = Array.from(seen, ([label, src]) => ({ src, label })).sort(
      (a, b) => (parseInt(b.label, 10) || 0) - (parseInt(a.label, 10) || 0)
    );
    for (const src of other) {
      if (out.some((o) => o.src === src)) continue;
      const ext = extFromURL(src).toUpperCase();
      let label = ext;
      for (let n = 2; out.some((o) => o.label === label); n++) label = `${ext} ${n}`;
      out.push({ src, label });
    }
    return out;
  }
  /**
   * Can the browser play `mime`?
   * @param {string} mime
   */
  static canPlay(mime) {
    Library.#probe ??= /** @type {HTMLVideoElement} */ (make('video'));
    return Boolean(Library.#probe.canPlayType(mime));
  }
  /**
   * Playing it in the viewer works: nothing is offered that would only fail.
   * @param {import("../typings/types.d.ts").MediaItem} item
   */
  static playable(item) {
    if (item.stream) return Library.canPlay('application/vnd.apple.mpegurl');
    if (!item.src) return false;
    return item.type === 'photo' || !item.blob || Library.canPlay(item.blob.type || 'video/mp4');
  }
  /**
   * Icon-only action button for a tile.
   * @param {string} icon
   * @param {string} command
   * @param {string} text
   * @param {Record<string, string>} [dataset]
   */
  static tileBtn(icon, command, text, dataset = {}) {
    const btn = make('mujs-btn', 'tile-btn', {
      title: text,
      role: 'button',
      tabIndex: 0,
      dataset: { command, ...dataset }
    });
    IconSVG.load(/** @type {any} */ (icon), btn);
    return btn;
  }
  /**
   * @param {string} icon
   * @param {string} command
   * @param {string} text
   * @param {Record<string, string>} [dataset]
   */
  static action(icon, command, text, dataset = {}) {
    const a = make('mujs-a', {
      title: text,
      role: 'button',
      tabIndex: 0,
      dataset: { command, ...dataset }
    });
    IconSVG.load(/** @type {any} */ (icon), a);
    a.append(document.createTextNode(` ${text}`));
    return a;
  }
  /**
   * @param {string} key
   * @param {import("../typings/types.d.ts").Post} post
   * @param {import("../typings/types.d.ts").MediaGroup} group
   */
  #renderPost(key, post, group) {
    const { user } = post;
    const video = post.variant === 'video';
    const el = make('mujs-post', {
      dataset: {
        post: key,
        variant: post.variant,
        search: `${user.name} ${post.text ?? ''}`.toLowerCase()
      }
    });
    const avatar = make('mujs-elem', 'avatar');
    if (video) IconSVG.load('video', avatar);
    else avatar.textContent = (user.name || '?').slice(0, 1).toUpperCase();
    if (user.avatar) {
      const img = make('img', { src: user.avatar, alt: '', decoding: 'async' });
      img.addEventListener('load', () => avatar.replaceChildren(img), { once: true });
    }
    const who = make('mujs-elem', 'post-who');
    const name = make('mujs-elem', 'post-name', { textContent: user.name });
    if (user.username) {
      name.append(make('span', 'post-handle', { textContent: ` @${user.username}` }));
    }
    const meta = make('mujs-elem', 'post-meta');
    who.append(name, meta);
    const head = make('mujs-row', 'post-head');
    head.append(avatar, who);
    if (post.isMessage) {
      head.append(make('mujs-elem', 'pill muted', { textContent: i18n$('message') }));
    }
    if (post.isFree) {
      head.append(make('mujs-elem', 'pill free', { textContent: i18n$('free') }));
    } else if (post.price) {
      head.append(make('mujs-elem', 'pill', { textContent: `$${post.price}` }));
    }
    if (post.original) {
      head.append(Library.action('open', 'of-open', i18n$('open'), { webpage: post.original }));
    }
    el.append(head);
    if (post.text) {
      el.append(make('mujs-elem', 'post-text', { textContent: post.text, title: post.text }));
    }
    const grid = make('mujs-elem', 'post-media');
    el.append(grid);
    group.pane.append(el);
    const entry = { key, post, el, grid, meta, ids: new Set() };
    this.posts.set(key, entry);
    return entry;
  }
  /**
   * Line under the name, counts and layout of the media, buttons that would do nothing are hidden.
   * @param {import("../typings/types.d.ts").PostEntry} entry
   */
  #updatePost(entry) {
    const { post } = entry;
    /** @type {string[]} */
    let line;
    if (post.variant === 'video') {
      line = post.meta ?? [];
    } else {
      /** @type {Record<string, number>} */
      const counts = {};
      for (const id of entry.ids) {
        const type = this.items.get(id)?.type ?? 'video';
        counts[type] = (counts[type] ?? 0) + 1;
      }
      let date = '';
      try {
        if (post.date) {
          date = new Intl.DateTimeFormat(navigator.language, { dateStyle: 'medium' }).format(
            new Date(post.date)
          );
        }
      } catch {
        /* invalid date */
      }
      line = [
        date,
        ...Object.entries(counts).map(([type, n]) => `${n} ${i18n$(n === 1 ? type : `${type}s`)}`)
      ];
    }
    entry.meta.textContent = line.filter(Boolean).join(' \u00b7 ');
    entry.grid.dataset.count = String(entry.ids.size);
    const downloadable = Array.from(entry.ids).some((id) => this.items.get(id)?.src);
    for (const btn of qsA('[data-command="post-download"], [data-command="post-copy"]', entry.el)) {
      btn.classList.toggle('hidden', !downloadable);
    }
  }
  /**
   * Thumbnail of a media: its preview image, or the media itself (photo, first frame of a video).
   *
   * Appended right away, a lazy image outside of the document never loads.
   * @param {import("../typings/types.d.ts").MediaItem} item
   * @returns {HTMLElement}
   */
  static thumbnail(item) {
    const none = () => {
      const el = make('mujs-elem', 'thumb-none');
      IconSVG.load('video', el);
      return el;
    };
    const fallback = () => {
      if (!item.src || (item.blob && !Library.playable(item))) return none();
      if (item.type === 'photo') {
        return make('img', { src: item.src, alt: '', loading: 'lazy', decoding: 'async' });
      }
      const video = make('video', {
        src: `${item.src}#t=0.1`,
        preload: 'metadata',
        muted: true,
        playsInline: true,
        disablePictureInPicture: true
      });
      video.addEventListener('error', () => video.replaceWith(none()), { once: true });
      return video;
    };
    const src = item.thumb ?? item.poster;
    if (!src) return fallback();
    const img = make('img', { src, alt: '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => img.replaceWith(fallback()), { once: true });
    return img;
  }
  /**
   * A thumbnail: opens the viewer, or builds the video when the browser cannot play the HLS stream.
   * Tiles that cannot do anything have no buttons.
   * @param {import("../typings/types.d.ts").MediaItem} item
   * @param {import("../typings/types.d.ts").PostEntry} entry
   */
  #renderTile(item, entry) {
    const playable = Library.playable(item);
    const command = playable ? 'view-media' : item.stream ? 'load-ts' : '';
    const tile = make('mujs-tile', {
      title: item.drm ? i18n$('drm_notice') : item.title,
      dataset: { id: item.id, type: item.type }
    });
    if (command) {
      Object.assign(tile.dataset, { command });
      tile.setAttribute('role', 'button');
      tile.tabIndex = 0;
    }
    tile.append(Library.thumbnail(item));
    if (item.preview) {
      tile.append(make('mujs-elem', 'badge top', { textContent: i18n$('free_preview') }));
    }
    const badge = make('mujs-elem', 'badge');
    if (item.drm) {
      badge.textContent = 'DRM';
      badge.classList.add('drm');
    } else if (item.label) {
      badge.textContent = item.label;
    } else if (item.type === 'video') {
      IconSVG.load('video', badge);
      if (item.duration) badge.append(document.createTextNode(` ${item.duration}`));
    } else if (item.type !== 'photo') {
      badge.textContent = item.type.toUpperCase();
    }
    if (badge.hasChildNodes()) tile.append(badge);
    const actions = make('mujs-elem', 'tile-actions');
    if (item.stream && !playable) {
      actions.append(Library.tileBtn('download', 'load-ts', i18n$('hls_load'), { id: item.id }));
    } else if (item.src) {
      actions.append(
        Library.tileBtn('download', 'download-video', i18n$('download'), { id: item.id })
      );
    }
    if (item.src && !item.blob) {
      actions.append(Library.tileBtn('copy', 'copy', i18n$('copy'), { id: item.id }));
    }
    if (entry.post.variant === 'post') {
      actions.append(Library.tileBtn('remove', 'of-remove', i18n$('remove'), { id: item.id }));
    }
    if (actions.hasChildNodes()) tile.append(actions);
    return tile;
  }
}
// #endregion
// #region Config
/**
 * Keeps only known keys with the expected type, protects against corrupted storage / bad imports.
 * @template {Record<string, any>} T
 * @param {unknown} input
 * @param {T} [defaults]
 * @returns {Partial<T>}
 */
const sanitizeConfig = (input, defaults = /** @type {any} */ (DEFAULT_CONFIG)) => {
  /** @type {Record<string, any>} */
  const out = {};
  if (!isObj(input)) return /** @type {any} */ (out);
  const source = /** @type {Record<string, any>} */ (input);
  for (const [key, def] of Object.entries(defaults)) {
    if (!(key in source)) continue;
    const value = source[key];
    if (isObj(def)) {
      out[key] = sanitizeConfig(value, def);
    } else if (typeof def === 'number') {
      if (typeof value === 'number' && Number.isFinite(value)) out[key] = value;
    } else if (typeof value === typeof def) {
      out[key] = value;
    }
  }
  return /** @type {any} */ (out);
};
// #endregion
// #region OnlyFans
/**
 * OnlyFans is a single page application (Vue), navigation goes through its router.
 */
const OnlyFans = {
  /** @type {{ push: (path: string) => unknown } | null} */
  router: null,
  /**
   * @param {string} path
   * @returns {boolean}
   */
  navigate(path) {
    try {
      const { router } = OnlyFans;
      if (!router || isEmpty(path)) return false;
      const result = router.push(path);
      // Vue Router rejects duplicate navigations, not an error
      if (result instanceof Promise) result.catch(BLANK_FN);
      return true;
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
};
// #endregion
// #region Container
class Container {
  /** @type {?HTMLElement} */
  #frame = null;
  /** @type {?HTMLElement} */
  #root = null;
  /** @type {Set<string>} */
  #errors = new Set();
  /** Frame is fully visible */
  opacityMax = '1';
  /** Frame is idle */
  opacityMin = '0.4';
  injected = false;
  elementsReady = false;
  /** @type {?HTMLElement} */
  viewer = null;
  viewerIndex = 0;
  /** @type {string[]} */
  viewerList = [];
  cfgBuilt = false;
  constructor() {
    this.webpage = url;
    this.host = getHostname(url.hostname ?? BLANK_PAGE);
    /** @type { { [key: string]: Timeout } } */
    this.timeouts = {
      frame: new Timeout(),
      toast: new Timeout()
    };
    /** @type {Array<{ key: string; elem: HTMLInputElement; type: string }>} */
    this.cfgRows = [];
    this.library = new Library(this);
    con.onError = (...msg) => this.showError(...msg);
    window.addEventListener('pagehide', this, false);
  }
  /**
   * The element inserted into the page.
   * @returns {HTMLElement}
   */
  get frame() {
    if (this.#frame == null) this.#createFrame();
    return /** @type {HTMLElement} */ (this.#frame);
  }
  /**
   * Root of the interface, lives inside the shadow tree.
   * @returns {HTMLElement}
   */
  get root() {
    if (this.#root == null) this.#createFrame();
    return /** @type {HTMLElement} */ (this.#root);
  }
  #createFrame() {
    const frame = make('mph-userjs', {
      dataset: { insertedBy: $GM.info.script.name, role: 'primary-container' }
    });
    /** @type {ShadowRoot | HTMLElement} */
    let shadow = frame;
    try {
      // `closed`, the website cannot reach into the interface
      if (isFN(frame.attachShadow)) shadow = frame.attachShadow({ mode: 'closed' });
    } catch (ex) {
      con.err(ex);
    }
    const root = make('mujs-root');
    if (isMobile) root.dataset.mobile = '';
    // Keep page level shortcuts / popunders from reacting to input inside the interface
    for (const type of [
      'click',
      'mousedown',
      'mouseup',
      'pointerdown',
      'pointerup',
      'touchstart',
      'touchend',
      'keydown',
      'keyup',
      'keypress',
      'contextmenu'
    ]) {
      frame.addEventListener(type, (evt) => evt.stopPropagation());
    }
    this.#frame = frame;
    this.#root = root;
    this.loadCSS(main_css, 'primary-stylesheet', shadow);
    shadow.append(root);
  }
  /**
   * Inserts a stylesheet.
   * @param {string} css
   * @param {string} role - Name of the stylesheet
   * @param {ParentNode & Node} parent
   * @returns {?HTMLStyleElement}
   */
  loadCSS(css, role, parent) {
    try {
      if (typeof css !== 'string' || isBlank(css)) {
        throw new Error(`"${role}" contains an empty CSS string`, { cause: 'loadCSS' });
      }
      /** @type {?Element} */
      let sty = null;
      if ($GM.isGM) {
        sty = $GM.addElement(parent, 'style', { textContent: css });
      }
      if (!(sty instanceof HTMLStyleElement)) {
        sty = make('style', { textContent: css });
        parent.append(sty);
      }
      sty.dataset.insertedBy = $GM.info.script.name;
      sty.dataset.role = role;
      return /** @type {HTMLStyleElement} */ (sty);
    } catch (ex) {
      con.err(ex);
    }
    return null;
  }
  /**
   * Builds the interface, safe to call multiple times.
   */
  init() {
    if (this.elementsReady) return true;
    try {
      const root = this.root;
      // #region Elements
      this.toastElem = make('mujs-toast');
      this.mainframe = make('mujs-mainframe', 'mainframe', {
        title: 'Magic PH',
        style: `opacity: ${this.opacityMax};`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'toggle-list' }
      });
      this.mainbtn = make('count-frame', 'mainbtn', { textContent: '0' });
      IconSVG.load('download', this.mainframe);
      this.mainframe.append(this.mainbtn);
      this.urlBar = make('input', 'mujs-url-bar', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('search_placeholder')
      });
      this.footer = make('mujs-row', 'mujs-footer');
      this.toolbar = make('mujs-toolbar');
      this.header = make('mujs-header');
      this.tbody = make('mujs-body');
      this.main = make('mujs-main', 'hidden');
      this.urlContainer = make('mujs-url');
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.cfgpage = make('mujs-config', 'hidden');
      this.emptyElem = make('mujs-empty', { textContent: i18n$('empty') });
      /**
       * @param {string} cls
       * @param {string} title
       * @param {string} command
       * @param {string} icon
       * @param {Record<string, string>} [dataset]
       */
      const button = (cls, title, command, icon, dataset = {}) => {
        const btn = make('mujs-btn', cls, {
          title,
          role: 'button',
          tabIndex: 0,
          dataset: { command, ...dataset }
        });
        IconSVG.load(/** @type {any} */ (icon), btn);
        return btn;
      };
      this.btnHide = button('hide-list', i18n$('min'), 'hide-list', 'minus');
      this.btnfullscreen = button('fullscreen', i18n$('max'), 'fullscreen', 'expand');
      this.closebtn = button('close', i18n$('close'), 'close', 'close');
      this.btncfg = button('settings', i18n$('settings'), 'settings', 'gear');
      // OnlyFans
      this.ofHeader = make('mujs-row', 'of-actions hidden');
      this.ofdwn = make('mujs-btn', 'of_btn', {
        title: i18n$('download_all'),
        textContent: `${i18n$('download')} (0)`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'of-download-all' }
      });
      this.ofcopy = make('mujs-btn', 'of_btn', {
        title: i18n$('copy_all'),
        textContent: `${i18n$('copy')} (0)`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'of-copy-all' }
      });
      this.ofrm = make('mujs-btn', 'of_btn', {
        title: i18n$('remove_all'),
        textContent: `${i18n$('remove')} (0)`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'of-remove-all' }
      });
      this.ofHeader.append(this.ofcopy, this.ofdwn, this.ofrm);
      // #endregion
      // Always in the toolbar, next to the tabs, on every screen size
      this.btnHandles.append(this.btncfg, this.btnHide, this.btnfullscreen, this.closebtn);
      this.Tabs = new Tabs(this.toolbar);
      this.toolbar.append(this.btnHandles);
      this.urlContainer.append(this.urlBar);
      this.header.append(this.urlContainer, this.ofHeader);
      this.tbody.append(this.emptyElem, this.cfgpage);
      this.main.append(this.toolbar, this.header, this.tbody, this.footer);
      root.append(this.toastElem, this.mainframe, this.main);
      this.#bindTabs();
      this.#bindEvents();
      this.setTheme();
      this.elementsReady = true;
    } catch (ex) {
      con.err(ex);
      this.elementsReady = false;
    }
    return this.elementsReady;
  }
  #bindTabs() {
    const { Tabs: tabs } = this;
    tabs.addListener('active', (tab) => {
      const host = tab.dataset.host ?? tabs.blank;
      dom.cl.remove(tabs.pool, 'active');
      dom.cl.add(tab, 'active');
      tab.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
      dom.cl.add(qsA('mujs-list', this.tbody), 'hidden');
      dom.cl.add([this.cfgpage, this.emptyElem], 'hidden');
      this.urlBar.value = '';
      this.applyFilter('');
      if (host === tabs.blank) {
        this.urlBar.placeholder = i18n$('newTab');
        this.emptyElem.textContent = i18n$('newtab_hint');
        dom.cl.remove(this.emptyElem, 'hidden');
        this.urlBar.focus?.({ preventScroll: true });
      } else if (host.startsWith(tabs.protocal)) {
        tabs.intFN(host);
      } else {
        this.urlBar.placeholder = i18n$('search_placeholder');
        dom.cl.remove(this.library.groups.get(host)?.pane ?? [], 'hidden');
      }
    });
    tabs.addListener('internal', (host) => {
      if (host === 'settings') {
        this.buildConfig();
        this.urlBar.placeholder = i18n$('search_settings');
        dom.cl.remove(this.cfgpage, 'hidden');
      }
    });
    tabs.addListener('close', (tab) => {
      const host = tab.dataset.host ?? tabs.blank;
      const group = this.library.groups.get(host);
      if (group) {
        if (cfg.clearTabCache) {
          this.library.removeGroup(host);
        } else {
          group.tab = null;
        }
      }
      if (tab.classList.contains('active')) {
        const sibling = /** @type {?HTMLElement} */ (
          [tab.nextElementSibling, tab.previousElementSibling].find(
            (e) => e?.localName === 'tab-content'
          )
        );
        if (sibling) {
          tabs.active(sibling);
        } else {
          dom.cl.add(qsA('mujs-list', this.tbody), 'hidden');
          this.emptyElem.textContent = this.library.items.size
            ? i18n$('newtab_hint')
            : i18n$('empty');
          dom.cl.remove(this.emptyElem, 'hidden');
        }
      }
      this.library.updateCounts();
    });
  }
  #bindEvents() {
    const { root, mainframe } = this;
    ael(root, 'click', (evt) => {
      this.handleClick(/** @type {MouseEvent} */ (evt)).catch((ex) => this.showError(ex));
    });
    ael(root, 'auxclick', (evt) => {
      // Middle click closes a tab
      if (/** @type {MouseEvent} */ (evt).button !== 1) return;
      const tab = /** @type {?HTMLElement} */ (
        /** @type {HTMLElement} */ (evt.target)?.closest?.('tab-content')
      );
      if (tab) {
        evt.preventDefault();
        this.Tabs.close(tab);
      }
    });
    ael(root, 'keydown', (evt) => {
      const e = /** @type {KeyboardEvent} */ (evt);
      const target = /** @type {HTMLElement} */ (e.target);
      if (this.viewerOpen) {
        if (e.key === 'Escape') this.closeViewer();
        else if (e.key === 'ArrowLeft') this.showMedia(this.viewerIndex - 1);
        else if (e.key === 'ArrowRight') this.showMedia(this.viewerIndex + 1);
        else return;
        e.preventDefault();
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && target?.closest?.('[data-command]')) {
        if (!/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
          e.preventDefault();
          target.click();
        }
      } else if (e.key === 'Escape' && !dom.cl.has(this.main, 'hidden')) {
        this.hidePanel();
      }
    });
    if (!isMobile) {
      ael(mainframe, 'mouseenter', () => {
        this.timeouts.frame.clearAll();
        mainframe.style.opacity = this.opacityMax;
      });
      ael(mainframe, 'mouseleave', () => this.fade());
    }
    ael(this.urlBar, 'input', () => {
      if (this.Tabs._active?.dataset.host === this.Tabs.blank) return;
      this.applyFilter(this.urlBar.value);
    });
    ael(this.urlBar, 'change', () => {
      const tab = this.Tabs._active;
      if (tab?.dataset.host !== this.Tabs.blank) return;
      const value = this.urlBar.value.trim();
      if (isEmpty(value)) return;
      this.loadFromInput(value, tab).catch((ex) => this.showError(ex));
    });
  }
  /**
   * Hides every row that does not contain `text`.
   * @param {string} text
   */
  applyFilter(text) {
    const needle = text.trim().toLowerCase();
    for (const el of qsA('[data-search]', this.tbody)) {
      const hit = isEmpty(needle) || (el.dataset.search ?? '').includes(needle);
      el.classList.toggle('hidden', !hit);
    }
  }
  /**
   * @param {Event} event
   */
  handleEvent(event) {
    if (event.type === 'pagehide' && !(/** @type {PageTransitionEvent} */ (event).persisted)) {
      this.library.clear();
    }
  }
  /**
   * Adds the interface to the page.
   * @param {Document} [doc]
   */
  inject(doc = document) {
    try {
      if (!this.init()) return this;
      const parent = doc.documentElement;
      if (parent && !parent.contains(this.frame)) parent.append(this.frame);
      if (!this.injected) {
        this.injected = true;
        if (cfg.autoexpand) this.setExpanded(true);
        this.fade();
      }
    } catch (ex) {
      con.err(ex);
    }
    return this;
  }
  /**
   * Removes the interface and frees every video.
   */
  remove() {
    this.library.clear();
    this.timeouts.frame.clearAll();
    this.timeouts.toast.clearAll();
    dom.remove(this.#frame ?? []);
    this.injected = false;
    return this;
  }
  /**
   * Applies the site palette + the theme of the user.
   */
  setTheme() {
    const { style } = this.frame;
    const base = { ...HP.palette, ...HandlePage.placement(cfg?.position, HP.root) };
    for (const [k, v] of Object.entries(base)) style.setProperty(`--${k}`, v);
    // The panel opens on the side of the button
    this.root.dataset.side = base['mujs-position-left'] === 'auto' ? 'right' : 'left';
    for (const [k, v] of Object.entries(cfg?.theme ?? {})) {
      if (typeof v === 'string' && !isEmpty(v)) {
        style.setProperty(`--${k}`, v);
      } else if (!(k in base)) {
        style.removeProperty(`--${k}`);
      }
    }
    return this;
  }
  /**
   * @param {boolean} [expanded]
   */
  setExpanded(expanded) {
    const { btnfullscreen, main } = this;
    const on = expanded ?? !dom.cl.has(main, 'expanded');
    dom.cl[on ? 'add' : 'remove']([btnfullscreen, main], 'expanded');
    dom.rmChildren(btnfullscreen);
    IconSVG.load(on ? 'collapse' : 'expand', btnfullscreen);
    return on;
  }
  showPanel() {
    this.inject();
    dom.cl.remove(this.main, 'hidden');
    dom.cl.add(this.mainframe, 'hidden');
    if (cfg.autoexpand) this.setExpanded(true);
    return this;
  }
  hidePanel() {
    dom.cl.add(this.main, 'hidden');
    dom.cl.remove(this.mainframe, 'hidden');
    this.fade();
    return this;
  }
  /**
   * Fades the floating button after `cfg.time` ms, `0` keeps it visible.
   * @param {number} [time]
   */
  async fade(time = cfg?.time) {
    const { frame } = this.timeouts;
    frame.clearAll();
    this.mainframe.style.opacity = this.opacityMax;
    if (typeof time !== 'number' || !(time > 0)) return this;
    await frame.set(time);
    this.mainframe.style.opacity = this.opacityMin;
    return this;
  }
  /**
   * Notice in the top corner of the page.
   * @param {string | number} [text] - `undefined` hides the notice
   * @param {number} [time] - Hide after `time` ms, defaults to 10 seconds of inactivity
   */
  async toast(text, time) {
    const { toast } = this.timeouts;
    toast.clearAll();
    if (text === undefined || (typeof text === 'number' && time === undefined)) {
      if (typeof text === 'number') await toast.set(text);
      this.toastElem?.classList.remove('show');
      return this;
    }
    if (!this.init()) return this;
    this.inject();
    this.toastElem.textContent = String(text);
    this.toastElem.classList.add('show');
    await toast.set(time ?? 10000);
    this.toastElem.classList.remove('show');
    return this;
  }
  /**
   * Displays errors in the footer, every message is only displayed once.
   * @param {...unknown} ex
   */
  showError(...ex) {
    if (!this.elementsReady) return this;
    let str = '';
    for (const e of ex) {
      if (e instanceof Error) {
        str += `${e.message}${'cause' in e && e.cause ? ` Caused by: "${e.cause}"` : ''}\n`;
      } else if (isObj(e)) {
        try {
          str += JSON.stringify(e) + '\n';
        } catch {
          /* empty */
        }
      } else if (typeof e === 'string') {
        str += `${e}\n`;
      }
    }
    str = str.trim();
    if (isEmpty(str) || this.#errors.has(str)) return this;
    this.#errors.add(str);
    const error = make('mu-js', 'error', {
      title: i18n$('close'),
      onclick: () => {
        error.remove();
        this.#errors.delete(str);
      }
    });
    error.append(document.createTextNode(str));
    this.footer.append(error);
    this.toast(str.split('\n')[0], 5000).catch(BLANK_FN);
    return this;
  }
  /**
   * Refreshes the button, the bulk actions of OnlyFans (only when there is something to act on) and the empty page.
   */
  updateCounters() {
    if (!this.elementsReady) return;
    const { library } = this;
    const { length: all } = library.feed;
    const media = library.media.length;
    this.mainbtn.textContent = String(library.count);
    this.ofdwn.textContent = `${i18n$('download')} (${media})`;
    this.ofcopy.textContent = `${i18n$('copy')} (${media})`;
    this.ofrm.textContent = `${i18n$('remove')} (${all})`;
    this.ofHeader.classList.toggle('hidden', all === 0);
    for (const btn of [this.ofdwn, this.ofcopy]) btn.classList.toggle('hidden', media === 0);
    if (this.Tabs._active === null) {
      this.emptyElem.textContent = library.groups.size ? i18n$('newtab_hint') : i18n$('empty');
    }
  }
  // #region Commands
  /**
   * @param {MouseEvent} evt
   */
  async handleClick(evt) {
    const t = /** @type {?HTMLElement} */ (evt.target);
    const target = /** @type {?HTMLElement} */ (t?.closest?.('[data-command]'));
    if (!target) return;
    const { dataset } = target;
    const cmd = dataset.command ?? '';
    const item = dataset.id ? this.library.items.get(dataset.id) : undefined;
    const { Tabs: tabs, library } = this;
    switch (cmd) {
      case 'toggle-list':
        this.showPanel();
        break;
      case 'hide-list':
        this.hidePanel();
        break;
      case 'close':
        this.closeViewer();
        this.setExpanded(false);
        this.hidePanel();
        break;
      case 'fullscreen':
        this.setExpanded();
        break;
      case 'settings':
        tabs.create('mujs:settings');
        break;
      case 'open-tab':
        if (dataset.webpage) $GM.openInTab(dataset.webpage);
        break;
      case 'new-tab':
        tabs.create();
        break;
      case 'switch-tab':
        tabs.active(target);
        break;
      case 'close-tab':
        if (target.parentElement) tabs.close(target.parentElement);
        break;
      case 'section': {
        target.parentElement?.classList.toggle('collapsed');
        break;
      }
      case 'save':
        if (!dom.prop(target, 'disabled')) await this.save();
        break;
      case 'reset':
        cfg = copyObject(DEFAULT_CONFIG);
        this.reloadConfig();
        break;
      case 'export-config':
        saveAs(
          new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' }),
          'magicph-config.json'
        );
        break;
      case 'import-config':
        this.cfgFile?.click();
        break;
      case 'copy':
        if (item) await this.copyItem(item);
        break;
      case 'download-video':
        if (item) await this.downloadItem(item);
        break;
      case 'load-ts':
        await this.loadHLS(dataset.id ?? '');
        break;
      case 'view-media':
        if (item) this.openViewer(item.id);
        break;
      case 'viewer-close':
        this.closeViewer();
        break;
      case 'viewer-prev':
        this.showMedia(this.viewerIndex - 1);
        break;
      case 'viewer-next':
        this.showMedia(this.viewerIndex + 1);
        break;
      case 'viewer-goto':
        this.showMedia(Number(dataset.index));
        break;
      case 'post-download': {
        await this.downloadAll(library.media.filter((i) => i.post === dataset.post));
        break;
      }
      case 'post-copy': {
        const urls = library.media.filter((i) => i.post === dataset.post).map((i) => i.src);
        if (urls.length && (await writeClipboard(urls.join('\n'))))
          msg('[MagicPH] Copied URLs to Clipboard', 2500);
        break;
      }
      case 'post-remove':
        library.removePost(dataset.post ?? '');
        break;
      case 'of-remove':
        if (item && library.removeItem(item.id)) {
          msg(`[MagicPH] Deleted Video Id: ${item.title}`, 2500);
        }
        break;
      case 'of-open':
        if (dataset.webpage && !OnlyFans.navigate(dataset.webpage)) {
          $GM.openInTab(new URL(dataset.webpage, window.location.origin).href);
        }
        break;
      case 'of-copy-all': {
        const urls = library.media.map((i) => i.src);
        if (urls.length && (await writeClipboard(urls.join('\n')))) {
          msg('[MagicPH] Copied URLs to Clipboard', 2500);
        }
        break;
      }
      case 'of-download-all':
        await this.downloadAll();
        break;
      case 'of-remove-all':
        for (const g of Array.from(library.posts.keys())) library.removePost(g);
        break;
      default:
        break;
    }
  }
  /**
   * @param {import("../typings/types.d.ts").MediaItem} item
   */
  async copyItem(item) {
    const copied = await writeClipboard(item.src);
    msg(`[MagicPH] ${copied ? 'Copied URL to Clipboard' : 'Failed to copy to Clipboard'}`, 2500);
  }
  /**
   * @param {import("../typings/types.d.ts").MediaItem} item
   */
  async downloadItem(item) {
    if (!item.src) {
      throw new Error('There is nothing to download', { cause: 'downloadItem' });
    }
    const name = `${sanitizeFilename(item.title)}.${item.ext}`;
    if (item.blob) {
      saveAs(item.blob, name);
      msg('[MagicPH] Download complete', 2500);
      return;
    }
    try {
      await Network.download({ name, url: item.src, data: item.data }, progressNotice(name));
      msg('[MagicPH] Download complete', 2500);
    } catch (ex) {
      msg(`[MagicPH] Failed to download "${name}"`, 4000);
      throw new Error(`Failed to download "${name}": ${errMsg(ex)}`, { cause: ex });
    }
  }
  /**
   * Downloads every OnlyFans media (or the given ones), the downloaded media is removed.
   * @param {import("../typings/types.d.ts").MediaItem[]} [cards]
   */
  async downloadAll(cards = this.library.media) {
    const { library } = this;
    if (isEmpty(cards)) return;
    const limit =
      cfg.limitDownloads || cards.length > 16 || isMobile ? 1 : Math.max(1, cfg.concurrency);
    await runPool(cards, limit, async (item) => {
      try {
        await this.downloadItem(item);
        library.removeItem(item.id);
      } catch (ex) {
        this.showError(ex);
      }
    });
    msg('[MagicPH] Downloads complete!', 2500);
  }
  /**
   * Builds the video from the HLS playlist of a tile, the tile is replaced by the video.
   * @param {string} id
   */
  async loadHLS(id) {
    const { library } = this;
    const item = library.items.get(id);
    if (!item?.stream || item.el.dataset.busy) return;
    item.el.dataset.busy = 'true';
    const badge = qs('.badge:not(.top)', item.el);
    const label = badge?.textContent ?? '';
    const hls = new mphHLS(item.stream, item.data, badge, HP.root);
    const blob = await hls.start();
    if (blob) {
      if (this.viewerOpen) this.closeViewer();
      library.addBlob(item, blob, hls.ext);
    } else {
      delete item.el.dataset.busy;
      if (badge) badge.textContent = label;
    }
  }
  /**
   * Turns whatever was typed in the "new tab" into videos.
   * @param {string} value - URL, path or id
   * @param {HTMLElement} tab - The "new tab"
   */
  async loadFromInput(value, tab) {
    const target = Container.resolveInput(value);
    if (!target) throw new Error(`Unsupported URL or id: "${value}"`, { cause: 'loadFromInput' });
    if (target.path) {
      if (!OnlyFans.navigate(target.path)) {
        throw new Error('Please navigate to "onlyfans.com"', { cause: 'loadFromInput' });
      }
      this.Tabs.close(tab);
      return;
    }
    con.log(target);
    if (target.url.includes('onlyfans')) {
      if (!OnlyFans.router) {
        throw new Error('Please navigate to "onlyfans.com"', { cause: 'loadFromInput' });
      }
      this.Tabs.close(tab);
      return;
    }
    HP.setCurrent(target.url);
    await runSite();
    this.Tabs.close(tab);
  }
  /**
   * @param {string} value
   * @returns {?{ url?: string; path?: string }}
   */
  static resolveInput(value) {
    const val = value.trim();
    const { root, webpage } = HP;
    /**
     * @param {string} pathname
     */
    const ofArr = (pathname) => {
      const arr = [
        /^(?:\/(?=$))?$/i,
        /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/((?:c\d+)))?(?:\/(?=$))?$/i,
        /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/((?:c\d+)))?\/((?:media|photos|videos|audios|likes|streams|upcoming-streams))(?:\/(?=$))?$/i
      ];
      return arr.map((r) => pathname.match(r)).filter(Boolean);
    };
    if (val.startsWith('http')) {
      try {
        const u = new URL(val);
        if (root === 'onlyfans' && isEmpty(ofArr(u.pathname))) {
          return null;
        } else {
          return { url: u.href };
        }
      } catch {
        return null;
      }
    }
    /** @type {Array<[RegExp, string, string]>} */
    const routes = [
      [/^\/video-\w+\/[\w-.]+(?:\/(?=$))?$/i, 'xnxx', 'https://www.xnxx.com'],
      [/^\/videos\/[a-z0-9._-]+(?:\/(?=$))?$/i, 'xhamster', 'https://xhamster.com'],
      [/^\/watch\/\d+\/[\w-]+(?:\/(?=$))?$/i, 'youporn', 'https://www.youporn.com'],
      [/^\/video\/\w+\/[\w-]+(?:\/(?=$))?$/i, 'thumbzilla', 'https://www.thumbzilla.com'],
      [/^\/porn-video\/\d{8}(?:\/(?=$))?$/i, 'tube8', 'https://www.tube8.com'],
      [/^\/(\d{8})?$/i, 'redtube', 'https://www.redtube.com'],
      [/^\/(view_video\.php\?viewkey=\w+)?$/i, 'pornhub', 'https://www.pornhub.com']
    ];
    for (const [reg, name, fallback] of routes) {
      if (reg.test(val)) return { url: `${root === name ? webpage.origin : fallback}${val}` };
    }
    if (!isEmpty(ofArr(val))) {
      return { path: val.replace(/\/$/, '') };
    }
    const [id] = /\w{13,15}/.exec(val) ?? [];
    if (id) {
      return {
        url: `${root === 'pornhub' ? webpage.origin : 'https://www.pornhub.com'}/view_video.php?viewkey=${id}`
      };
    }
    return null;
  }
  // #endregion
  // #region Viewer
  get viewerOpen() {
    return !!this.viewer && !dom.cl.has(this.viewer, 'hidden');
  }
  /**
   * Full screen viewer for what can be played of a card: the media of a post, the qualities of a video.
   * @param {string} id
   */
  openViewer(id) {
    const { library } = this;
    const item = library.items.get(id);
    if (!item) return;
    const entry = library.posts.get(item.post);
    this.viewerList = Array.from(entry?.ids ?? [id]).filter((key) => {
      const i = library.items.get(key);
      return i && Library.playable(i);
    });
    if (!this.viewer) this.#buildViewer();
    this.strip.textContent = '';
    this.viewerList.forEach((key, index) => {
      const thumb = library.items.get(key);
      const tile = make('mujs-tile', 'thumb', {
        dataset: { command: 'viewer-goto', index: String(index) }
      });
      const src = thumb?.thumb ?? thumb?.poster;
      if (src) tile.append(make('img', { src, alt: '' }));
      else if (!thumb?.label) tile.textContent = String(index + 1);
      if (thumb?.label) tile.append(make('mujs-elem', 'thumb-label', { textContent: thumb.label }));
      this.strip.append(tile);
    });
    dom.cl.remove(this.viewer, 'hidden');
    this.showMedia(this.viewerList.indexOf(id));
  }
  closeViewer() {
    if (!this.viewer) return;
    this.stage.textContent = '';
    dom.cl.add(this.viewer, 'hidden');
  }
  /**
   * @param {number} index
   */
  showMedia(index) {
    const n = this.viewerList.length;
    if (!n) return;
    this.viewerIndex = (index + n) % n;
    const item = this.library.items.get(this.viewerList[this.viewerIndex]);
    if (!item) return this.closeViewer();
    this.stage.textContent = '';
    const src = item.src || item.stream?.[0];
    /** @type {HTMLElement} */
    let el;
    if (item.type === 'photo') {
      el = make('img', { src, alt: '' });
    } else if (item.type === 'audio') {
      el = make('audio', { src, controls: true, autoplay: true });
    } else {
      const gif = item.type === 'gif';
      el = make('video', {
        src,
        poster: item.poster ?? item.thumb,
        controls: !gif,
        loop: gif,
        muted: gif,
        autoplay: true,
        playsInline: true,
        disablePictureInPicture: true
      });
    }
    // The browser refused the media (format, expired address, ...)
    el.addEventListener(
      'error',
      () => el.replaceWith(make('mujs-elem', 'viewer-msg', { textContent: i18n$('play_error') })),
      { once: true }
    );
    this.stage.append(el);
    this.viewerCount.textContent = `${this.viewerIndex + 1} / ${n}`;
    this.viewerTitle.textContent = this.library.posts.get(item.post)?.post.text ?? item.title;
    Object.assign(this.viewerDownload.dataset, {
      id: item.id,
      command: item.stream ? 'load-ts' : 'download-video'
    });
    this.viewerCopy.dataset.id = item.id;
    this.viewerLink.dataset.webpage = item.src;
    const remote = Boolean(item.src) && !item.blob;
    this.viewerDownload.classList.toggle('hidden', !item.src && !item.stream);
    this.viewerCopy.classList.toggle('hidden', !remote);
    // A website that checks where the request comes from refuses a new tab
    this.viewerLink.classList.toggle('hidden', !remote || Boolean(item.data.referrer));
    dom.cl.toggle([this.viewerPrev, this.viewerNext, this.strip], 'hidden', n === 1);
    Array.from(this.strip.children).forEach((c, i) =>
      c.classList.toggle('active', i === this.viewerIndex)
    );
    this.strip.children[this.viewerIndex]?.scrollIntoView?.({ block: 'nearest', inline: 'center' });
  }
  #buildViewer() {
    /**
     * @param {string} cls
     * @param {string} command
     * @param {string} text
     * @param {string} [icon]
     */
    const button = (cls, command, text, icon) => {
      const btn = make('mujs-btn', cls, {
        title: text,
        role: 'button',
        tabIndex: 0,
        dataset: { command }
      });
      if (icon) IconSVG.load(/** @type {any} */ (icon), btn);
      else btn.textContent = text;
      return btn;
    };
    this.viewerCount = make('mujs-elem', 'viewer-count');
    this.viewerTitle = make('mujs-elem', 'viewer-title');
    this.viewerLink = button('', 'open-tab', i18n$('open'), 'open');
    this.viewerDownload = button('', 'download-video', i18n$('download'), 'download');
    this.viewerCopy = button('', 'copy', i18n$('copy'), 'copy');
    this.viewerPrev = button('viewer-nav prev', 'viewer-prev', i18n$('prev'));
    this.viewerNext = button('viewer-nav next', 'viewer-next', i18n$('next'));
    this.viewerPrev.textContent = '\u2039';
    this.viewerNext.textContent = '\u203a';
    const bar = make('mujs-row', 'viewer-bar');
    bar.append(
      this.viewerCount,
      this.viewerTitle,
      this.viewerLink,
      this.viewerDownload,
      this.viewerCopy,
      button('', 'viewer-close', i18n$('close'), 'close')
    );
    this.stage = make('mujs-elem', 'viewer-stage');
    const stageWrap = make('mujs-elem', 'viewer-wrap');
    stageWrap.append(this.stage, this.viewerPrev, this.viewerNext);
    this.strip = make('mujs-elem', 'viewer-strip');
    this.viewer = make('mujs-viewer', 'hidden');
    this.viewer.append(bar, stageWrap, this.strip);
    // Click on the backdrop closes, swipe changes the media
    ael(stageWrap, 'click', (evt) => {
      if (evt.target === stageWrap || evt.target === this.stage) this.closeViewer();
    });
    let x = 0;
    ael(
      stageWrap,
      'touchstart',
      (evt) => {
        x = /** @type {TouchEvent} */ (evt).changedTouches[0].clientX;
      },
      { passive: true }
    );
    ael(
      stageWrap,
      'touchend',
      (evt) => {
        const dx = /** @type {TouchEvent} */ (evt).changedTouches[0].clientX - x;
        if (Math.abs(dx) > 60) this.showMedia(this.viewerIndex + (dx < 0 ? 1 : -1));
      },
      { passive: true }
    );
    this.root.append(this.viewer);
  }
  // #endregion
  // #region Settings
  async save() {
    const config = copyObject(cfg);
    /**
     * @param {Record<string, any>} conf
     * @param {Record<string, any>} def
     */
    const strip = (conf, def) => {
      for (const [key, value] of Object.entries(conf)) {
        if (!(key in def)) {
          delete conf[key];
        } else if (isObj(value) && isObj(def[key])) {
          strip(value, def[key]);
          if (isEmpty(value)) delete conf[key];
        } else if (Object.is(value, def[key])) {
          delete conf[key];
        }
      }
    };
    strip(config, DEFAULT_CONFIG);
    await jsStorage.setValue('Config', isEmpty(config) ? '{}' : config);
    con.info('Saved config:', { config, cfg });
    this.setTheme();
    msg('[MagicPH] Settings saved', 2500);
    return cfg;
  }
  /**
   * Refreshes the settings page after `cfg` was replaced.
   */
  reloadConfig() {
    for (const row of this.cfgRows) {
      const value = row.key.split('.').reduce((o, k) => o?.[k], /** @type {any} */ (cfg));
      if (row.type === 'checkbox') {
        row.elem.checked = !!value;
      } else {
        row.elem.value = value ?? '';
      }
    }
    return this.setTheme();
  }
  /**
   * Builds the settings page.
   */
  buildConfig() {
    if (this.cfgBuilt) return;
    this.cfgBuilt = true;
    const savebtn = make('mujs-btn', 'save', {
      textContent: i18n$('save'),
      role: 'button',
      tabIndex: 0,
      dataset: { command: 'save' },
      disabled: false
    });
    const resetbtn = make('mujs-btn', 'reset', {
      textContent: i18n$('reset'),
      role: 'button',
      tabIndex: 0,
      dataset: { command: 'reset' }
    });
    const cbtn = make('mu-js', 'mujs-sty-flex');
    cbtn.append(resetbtn, savebtn);
    /**
     * @param {string} name
     * @param {string} text
     * @param {boolean} [open]
     */
    const makesection = (name, text, open = false) => {
      const sec = make('mujs-section', open ? '' : 'collapsed', { dataset: { name } });
      const lb = make('label', { dataset: { command: 'section' } });
      lb.append(make('mu-js', { textContent: text }));
      sec.append(lb);
      this.cfgpage.append(sec);
      return sec;
    };
    const sections = {
      general: makesection('general', i18n$('general'), true),
      theme: makesection('theme', i18n$('theme')),
      exp: makesection('exp', i18n$('import_export'))
    };
    /**
     * @param {HTMLElement} sec
     * @param {string} label
     * @param {string} key - Dotted path in the config
     * @param {"checkbox" | "number" | "text" | "select"} type
     * @param {Record<string, unknown>} [attrs]
     */
    const makeRow = (sec, label, key, type, attrs = {}) => {
      const [group, sub] = key.split('.');
      const get = () =>
        sub ? /** @type {any} */ (cfg)[group][sub] : /** @type {any} */ (cfg)[group];
      /** @param {unknown} v */
      const set = (v) => {
        if (sub) {
          /** @type {any} */ (cfg)[group][sub] = v;
        } else {
          /** @type {any} */ (cfg)[group] = v;
        }
      };
      const lb = make('label', 'sub-section', { dataset: { config: key } });
      lb.append(make('mu-js', { textContent: label }));
      const { options, ...rest } = /** @type {Record<string, any>} */ (attrs);
      const inp = /** @type {HTMLInputElement} */ (
        type === 'select'
          ? make('select', { className: 'mujs-select' })
          : make('input', { type, ...rest })
      );
      if (type === 'select') {
        for (const value of options)
          inp.append(make('option', { value, textContent: i18n$(value) }));
        inp.value = String(get());
        lb.append(inp);
        ael(inp, 'change', () => {
          set(inp.value);
          this.setTheme();
        });
      } else if (type === 'checkbox') {
        const inlab = make('mu-js', 'mujs-inlab');
        inlab.append(inp, make('label', { onclick: () => inp.click() }));
        lb.append(inlab);
        inp.checked = !!get();
        ael(inp, 'change', () => {
          set(inp.checked);
          if (key === 'autoexpand') this.setExpanded(inp.checked);
        });
      } else {
        lb.append(inp);
        inp.value = String(get() ?? '');
        if (type === 'number') {
          ael(inp, 'input', () => {
            if (inp.validity.valid && !isEmpty(inp.value)) {
              dom.cl.remove(inp, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', false);
              set(parseFloat(inp.value));
            } else {
              dom.cl.add(inp, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', true);
            }
          });
        } else {
          inp.placeholder = getComputedStyle(this.frame)
            .getPropertyValue(`--${sub ?? key}`)
            .trim();
          ael(inp, 'change', () => {
            set(inp.value.trim());
            this.setTheme();
          });
        }
      }
      sec.append(lb);
      this.cfgRows.push({ key, elem: inp, type });
      return lb;
    };
    if ($GM.isGM) makeRow(sections.general, i18n$('userjs_autoinject'), 'autoinject', 'checkbox');
    makeRow(sections.general, i18n$('userjs_fullscreen'), 'autoexpand', 'checkbox');
    makeRow(sections.general, i18n$('clear_tab_cache'), 'clearTabCache', 'checkbox');
    makeRow(sections.general, i18n$('position'), 'position', 'select', {
      options: ['auto', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
    });
    makeRow(sections.general, i18n$('limit_downloads'), 'limitDownloads', 'checkbox');
    makeRow(sections.general, i18n$('auto_hls'), 'autoHLS', 'checkbox');
    makeRow(sections.general, i18n$('concurrency'), 'concurrency', 'number', {
      min: 1,
      max: 16,
      step: 1
    });
    makeRow(sections.general, `${i18n$('dtime')} (ms)`, 'time', 'number', { min: 0, step: 500 });
    for (const k of Object.keys(DEFAULT_CONFIG.theme)) {
      makeRow(sections.theme, k, `theme.${k}`, 'text', { spellcheck: false });
    }
    for (const type of ['import', 'export']) {
      sections.exp.append(
        make('mujs-btn', `mujs-${type} sub-section`, {
          textContent: i18n$(`${type}_config`),
          role: 'button',
          tabIndex: 0,
          dataset: { command: `${type}-config` }
        })
      );
    }
    this.cfgFile = make('input', 'hidden', { type: 'file', accept: '.json,application/json' });
    ael(this.cfgFile, 'change', async () => {
      try {
        const file = this.cfgFile.files?.[0];
        if (!file) return;
        const imported = sanitizeConfig(JSON.parse(await file.text()));
        cfg = { ...cfg, ...imported, theme: { ...cfg.theme, ...(imported.theme ?? {}) } };
        this.reloadConfig();
        msg('[MagicPH] Config imported, press save to keep it', 4000);
      } catch (ex) {
        this.showError(new Error(`Failed to import config: ${errMsg(ex)}`, { cause: ex }));
      } finally {
        this.cfgFile.value = '';
      }
    });
    sections.exp.append(this.cfgFile);
    const about = make('mu-js', 'mujs-sty-flex about');
    const { script } = $GM.info;
    for (const [text, webpage] of [
      [
        `GitHub (v${script.version})`,
        script.namespace ?? 'https://github.com/magicoflolis/Magic-PH'
      ],
      [i18n$('issue'), script.bugs ?? 'https://github.com/magicoflolis/Magic-PH/issues']
    ]) {
      about.append(
        make('mujs-a', {
          textContent: text,
          role: 'button',
          tabIndex: 0,
          dataset: { command: 'open-tab', webpage }
        })
      );
    }
    this.cfgpage.append(cbtn, about);
  }
  // #endregion
}
const container = new Container();
/**
 * Notice in the top corner of the page.
 * @param {string | number} [text]
 * @param {number} [time] - ms
 */
const msg = (text, time) => container.toast(text, time).catch(BLANK_FN);
// #endregion
// #region Site Director
/**
 * Pornhub, YouPorn, RedTube, Tube8, Thumbzilla videos.
 */
const geekVideos = async () => {
  container.library.addVideo(await new mphMedia(HP.webpage).find());
};
/**
 * Pornhub GIFs.
 */
const geekGifs = async () => {
  const page = HP.webpage;
  const doc = await Network.doc(page);
  const nodes = ldNodes(doc).filter((n) => n.contentUrl || n.thumbnailUrl);
  container.library.addVideo({
    title: nodes[0]?.name ?? doc.title,
    poster: nodes[0]?.contentUrl ? absURL(String(nodes[0].thumbnailUrl ?? ''), page) : undefined,
    files: nodes.map((n) => absURL(String(n.contentUrl ?? n.thumbnailUrl), page)).filter(Boolean)
  });
};
/**
 * Pornhub Shorties, videos are loaded while scrolling.
 */
const geekShorts = async () => {
  const doc = await Network.doc(HP.webpage);
  const token = qs('.slider-container', doc)?.dataset.token;
  /** @type {Set<string>} */
  const seen = new Set();
  let page = 1;
  let busy = false;
  let lastY = window.scrollY;
  /**
   * @param {Array<Record<string, any>>} shorties
   */
  const makeData = async (shorties) => {
    for (const s of toArray(shorties)) {
      try {
        const [def] = toArray(s.mediaDefinitions).filter((m) => m.format === 'mp4');
        if (!def) continue;
        /** @type {Array<{ videoUrl: string }>} */
        const list = await Network.req(absURL(def.videoUrl, HP.webpage));
        const files = toArray(list)
          .map((v) => v.videoUrl)
          .filter((v) => /\.mp4[.?]/.test(v) && !seen.has(v));
        for (const v of files) seen.add(v);
        container.library.addVideo({
          id: String(s.videoId ?? s.id ?? def.videoUrl),
          title: s.videoTitle,
          poster: s.thumb ?? s.thumbnail ?? s.imageUrl ?? s.image_url,
          files
        });
      } catch (ex) {
        con.err(ex);
      }
    }
  };
  for (const script of doc.scripts) {
    const txt = script.textContent ?? '';
    const at = txt.search(/JSON_SHORTIES\s*=/);
    if (at < 0) continue;
    try {
      await makeData(extractJSON(txt, txt.indexOf('=', at)));
    } catch (ex) {
      con.err(ex);
    }
    break;
  }
  window.addEventListener(
    'scroll',
    async () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      if (busy || !down || !token) return;
      if (window.innerHeight + y < document.body.scrollHeight - 200) return;
      busy = true;
      try {
        page++;
        const params = new URLSearchParams({ page: String(page), token });
        const next = await Network.req(new URL(`/shorties/get?${params}`, HP.webpage.origin));
        await makeData(next);
      } catch (ex) {
        con.err(ex);
      } finally {
        busy = false;
      }
    },
    { passive: true }
  );
};
/**
 * Every quality SpankBang lists in the player setup.
 * @param {Document} page
 */
const spankBangFiles = (page) => {
  for (const script of page.scripts) {
    const [, raw] = /stream_data\s*=\s*(\{.*?\});/s.exec(script.textContent ?? '') ?? [];
    if (!raw) continue;
    try {
      /** @type {Record<string, string[]>} */
      const data = JSON.parse(raw.replaceAll("'", '"'));
      return {
        files: Object.entries(data)
          .filter(([quality, list]) => /^(?:\d+p|4k)$/.test(quality) && list[0])
          .map(([quality, list]) => ({
            src: list[0],
            label: quality === '4k' ? '2160p' : quality
          })),
        ts: toArray(data.m3u8).slice(0, 1)
      };
    } catch (ex) {
      con.err(ex);
    }
  }
  return { files: [], ts: [] };
};
/**
 * Runs the handler of the current website.
 * @param {Document} [doc]
 */
const runSite = async (doc = document) => {
  const { root, pathType } = HP.current;
  const { library } = container;
  if (root === 'onlyfans') {
    await runOnlyFans();
  } else if (/^(porntrex|analdin|porn00|xhamster)$/.test(root)) {
    library.addVideo({ ...(await new mphMedia(HP.webpage).find()), hermes: requestOptions(root) });
  } else if (root === 'spankbang') {
    const page = await Network.doc(HP.webpage);
    const meta = readMeta(page, HP.webpage);
    let { files, ts } = spankBangFiles(page);
    if (isEmpty(files)) {
      // The setup was not found, what the player shows
      await waitFor(() => qs('video > source'), 10000);
      files = Array.from(qsA('video > source'), (e) => ({
        src: /** @type {HTMLSourceElement} */ (e).src,
        label: ''
      }));
    }
    // The named qualities top out below 1080p on some accounts, its one HLS playlist is
    // adaptive and often reaches higher, but we can't read its ceiling without building it
    const bestFile = Math.max(0, ...files.map((f) => parseInt(f.label, 10) || 0));
    library.addVideo({
      title: meta.title || doc.title,
      poster: meta.poster,
      duration: meta.duration,
      files,
      ts,
      preferHLS: bestFile < 1080
    });
  } else if (root === '91porn') {
    // The player writes the <source> from a percent encoded string that is in the page
    const page = await Network.doc(HP.webpage);
    const txt = Array.from(page.scripts, (e) => e.textContent ?? '').join('\n');
    const [, encoded = ''] = /strencode2\("([^"]+)"\)/.exec(txt) ?? [];
    const src = qs('source', parseHTML(decodeURIComponent(encoded)))?.getAttribute('src');
    library.addVideo({
      title: page.title
        .replace(/\s+/g, ' ')
        .replace(/\s*-\s*91porn\s*$/i, '')
        .trim(),
      poster: absURL(qs('video', page)?.getAttribute('poster') ?? '', HP.webpage) || undefined,
      duration: toSeconds(/const videoDuration = ([\d.]+)/.exec(txt)?.[1]),
      files: src ? [src] : []
    });
  } else if (root === 'hqporner') {
    const iframe = /** @type {?HTMLIFrameElement} */ (qs('.videoWrapper > iframe'));
    if (!iframe) return;
    const found = await new mphMedia(iframe.src).find();
    const [, min = 0, sec = 0] =
      /duration is (\d+)min (\d+)sec/i.exec(
        qs('meta[name="description"]', doc)?.getAttribute('content') ?? ''
      ) ?? [];
    library.addVideo({
      ...found,
      page: HP.webpage,
      title: doc.title.replace(/\s*-\s*HQporner\.com$/i, '') || qs('h1', doc)?.textContent?.trim(),
      duration: Number(min) * 60 + Number(sec)
    });
  } else if (/^(xnxx|xvideos)$/.test(root)) {
    const page = await Network.doc(HP.webpage);
    const txt = Array.from(page.scripts, (e) => e.textContent ?? '').find((t) =>
      t.includes('html5player.setVideo')
    );
    /** @param {string} name */
    const setup = (name) =>
      new RegExp(`html5player\\.${name}\\('((?:[^'\\\\]|\\\\.)*)'\\)`).exec(txt ?? '')?.[1];
    const meta = readMeta(page, HP.webpage);
    const hls = setup('setVideoHLS');
    library.addVideo({
      title: meta.title || htmlToText(setup('setVideoTitle')) || doc.title,
      poster: meta.poster ?? setup('setThumbUrl'),
      duration: meta.duration,
      // The file name tells the quality (`mp4_sd.mp4`), Low and High are often the same file
      files: [setup('setVideoUrlHigh'), setup('setVideoUrlLow')].map((src = '') => ({
        src,
        label: /\/mp4_(\w+)\.mp4/.exec(src)?.[1].toUpperCase() ?? ''
      })),
      // The direct file is capped to one (low) quality, HLS carries the higher ones
      ts: hls ? [hls] : [],
      preferHLS: true
    });
  } else if (pathType === 'Video') {
    await geekVideos();
  } else if (pathType === 'GIF') {
    await geekGifs();
  } else if (pathType === 'Shorties') {
    await geekShorts();
  } else if (root === 'eporner') {
    // h264 plays everywhere, the AV1 download next to each quality is the last resort
    const page = await Network.doc(HP.webpage);
    const meta = readMeta(page, HP.webpage);
    const files = Array.from(qsA('#hd-porn-dload a[href]', page))
      .filter((a) => a.closest('.download-h264'))
      .map((a) => ({
        src: absURL(a.getAttribute('href') ?? '', HP.webpage),
        label: /\((\d+p)/.exec(a.textContent ?? '')?.[1] ?? ''
      }));
    library.addVideo({
      title: meta.title || doc.title,
      poster: meta.poster,
      duration: meta.duration,
      files
    });
  } else if (root === 'youjizz') {
    // `dataEncodings` lists every quality twice: a direct file and its single-bitrate HLS
    // equivalent, plus one "Auto" adaptive playlist bundling a few of those qualities together
    const page = await Network.doc(HP.webpage);
    const meta = readMeta(page, HP.webpage);
    const txt = Array.from(page.scripts, (e) => e.textContent ?? '').find((t) =>
      t.includes('dataEncodings')
    );
    /** @type {Array<{ quality?: string; filename?: string }>} */
    let entries = [];
    try {
      entries = extractJSON(txt ?? '', (txt ?? '').indexOf('dataEncodings'));
    } catch (ex) {
      con.err(ex);
    }
    /** @type {Array<{ src: string; label: string }>} */
    const files = [];
    /** @type {Map<number, string>} */
    const hlsByQuality = new Map();
    for (const e of entries) {
      const src = absURL(String(e.filename ?? ''), HP.webpage);
      const quality = parseInt(String(e.quality), 10) || 0;
      if (!src || !quality) continue;
      if (/\.m3u8/.test(src)) hlsByQuality.set(quality, src);
      else files.push({ src, label: `${quality}p` });
    }
    library.addVideo({
      title: meta.title || doc.title,
      poster: meta.poster,
      duration: meta.duration,
      files,
      ...pickHLS(files, hlsByQuality)
    });
  } else if (root === 'sxyprn') {
    // The address of the video is set by the scripts of the page
    const player = await waitFor(() => {
      const el = /** @type {?HTMLVideoElement} */ (qs('#player_el'));
      return el?.src && el.src !== window.location.href ? el : null;
    }, 30000);
    if (!player) return;
    const title = (qs('.post_text')?.textContent ?? '').trim();
    library.addVideo({
      title: isEmpty(title) ? doc.title : title.slice(0, 150),
      poster: player.poster || undefined,
      files: [player.src]
    });
  }
};
/**
 * Media of an OnlyFans post, the API changed its shape over time: `full` / `thumb` / `source` used to be
 * on the media itself, they are in `files` now.
 * @param {Record<string, any>} m
 * @returns {import("../typings/types.d.ts").PostMedia | null}
 */
const ofMedia = (m) => {
  if (!m || m.canView === false || m.hasError || m.isReady === false) return null;
  const f = m.files ?? {};
  /** @param {unknown} v */
  const url = (v) => {
    const u = typeof v === 'string' ? v : /** @type {any} */ (v)?.url;
    return typeof u === 'string' && u ? u : undefined;
  };
  const type = /^(video|photo|gif|audio)$/.test(m.type) ? m.type : 'video';
  const preview = url(f.preview) ?? url(m.preview);
  // The original, otherwise the highest quality
  const [best] = Object.entries(m.videoSources ?? {})
    .map(([quality, v]) => [parseInt(quality, 10) || 0, url(v)])
    .filter(([, u]) => u)
    .sort(([a], [b]) => Number(b) - Number(a));
  const src =
    url(m.full) ??
    url(f.full) ??
    url(m.src) ??
    (type === 'photo' ? preview : undefined) ??
    best?.[1];
  // A protected video has nothing to play or download, only its preview image
  const drm = !src && Boolean(url(f.drm?.manifest?.hls));
  if (!src && !drm) return null;
  const duration = m.duration ?? m.source?.duration;
  return {
    id: String(m.id),
    type,
    src: /** @type {string | undefined} */ (src),
    drm,
    poster: preview ?? url(m.thumb),
    thumb: url(f.squarePreview) ?? url(f.thumb) ?? url(m.thumb) ?? preview,
    duration: duration ? fancyTimeFormat(duration) : undefined
  };
};
/**
 * OnlyFans, posts are read from the Vue store of the website.
 */
const runOnlyFans = async () => {
  // `__vue__` is only reliable once the content of the page is rendered
  await query('main[id="content"]', document, 60000);
  const app = await query('[id="app"]', document, 60000);
  if (!app) return;
  const appVue = await waitFor(() => $GM.unwrap(app).__vue__, 120000, 250);
  if (!appVue) {
    con.err('OnlyFans: unable to find the Vue instance');
    return;
  }
  OnlyFans.router = appVue._routerRoot?.$options?.router ?? appVue.$router ?? null;
  /** Post id + number of media, a post is read again when its media change @type {Set<string>} */
  const seen = new Set();
  /** @type {Map<string, Record<string, any>>} */
  const users = new Map();
  /** `author` / `fromUser` are either an id or a user object @param {unknown} v */
  const userOf = (v) => users.get(String(isObj(v) ? /** @type {any} */ (v).id : v));
  /**
   * @param {any[]} posts
   */
  const filterPosts = (posts) => {
    for (const p of posts) {
      if (!isObj(p) || !Array.isArray(p.media) || p.isMediaReady === false) continue;
      const sig = `${p.id}:${p.media.length}`;
      if (seen.has(sig)) continue;
      const user = userOf(p.author) ?? userOf(p.fromUser) ?? userOf(p.withUser) ?? userOf(p.chatId);
      // The post is retried once its user is known
      if (!user?.name) continue;
      seen.add(sig);
      const previews = new Set(toArray(p.previews).map(String));
      const media = p.media
        .map(ofMedia)
        .filter((m) => m !== null)
        .map((m) => ({ ...m, preview: previews.has(m.id) }));
      if (isEmpty(media)) continue;
      container.library.addPost({
        id: String(p.id),
        variant: 'post',
        groupKey: String(user.id),
        groupTitle: user.name,
        user: { name: user.name, username: user.username, avatar: user.avatar },
        date: p.postedAt ?? p.createdAt,
        price: p.price,
        isFree: p.isFree,
        isMessage: p.responseType === 'message' || 'fromUser' in p,
        text: htmlToText(p.text),
        original:
          p.responseType === 'message' || 'fromUser' in p
            ? `/my/chats/chat/${user.id}/`
            : `/${p.id}/${user.username}`,
        media
      });
    }
  };
  // Vuex re-runs the getter every time something it read changes, a callback is never needed
  appVue.$store.watch((/** @type {Record<string, any>} */ a) => {
    try {
      for (const u of Object.values(a.users?.items ?? {})) {
        if (isObj(u) && u.id != null) users.set(String(u.id), u);
      }
      /** @type {any[]} */
      const toGrab = [
        ...Object.values(a.posts?.items ?? {}),
        // Chats hold messages, some builds keep them in `chats.items` directly
        ...Object.values(a.chats?.items ?? {}),
        ...Object.values(a.chats?.messages ?? {})
      ];
      filterPosts(toGrab);
    } catch (ex) {
      con.dbg('OnlyFans store:', errMsg(ex));
    }
    return undefined;
  });
};
// #endregion
// #region Init
/**
 * Runs `onDomReady` once the DOM is available.
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (isFN(onDomReady)) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        (evt) => onDomReady(/** @type {Document} */ (evt.target)),
        {
          once: true
        }
      );
    }
  }
};
/**
 * Websites that change the video without reloading the page.
 */
const SPA_ROOTS = new Set(['xhamster', 'sxyprn']);
/**
 * Runs the site handler again whenever the address of a single page application changes.
 * @param {Document} doc
 */
const watchNavigation = (doc) => {
  if (!SPA_ROOTS.has(HP.root)) return;
  let last = window.location.href;
  let busy = false;
  setInterval(async () => {
    if (busy || window.location.href === last) return;
    last = window.location.href;
    busy = true;
    try {
      HP.setCurrent(last);
      await runSite(doc);
    } catch (ex) {
      con.err(ex);
    } finally {
      busy = false;
    }
  }, 1000);
};
async function init() {
  const stored = sanitizeConfig(await jsStorage.getValue('Config', DEFAULT_CONFIG));
  const defaults = copyObject(DEFAULT_CONFIG);
  cfg = { ...defaults, ...stored, theme: { ...defaults.theme, ...(stored.theme ?? {}) } };
  con.dbg('Config:', cfg);
  loadDOM((doc) => {
    if (doc == null || window.location === null) {
      con.err('The document is not available, reload the webpage or use a different one');
      return;
    }
    if (HP.mobileFix()) return;
    $GM.registerMenuCommand(i18n$('userjs_inject'), () => container.showPanel());
    $GM.registerMenuCommand(i18n$('userjs_close'), () => container.remove());
    if (cfg.autoinject) container.inject(doc);
    runSite(doc).catch((ex) => con.err(ex));
    watchNavigation(doc);
  });
}
init().catch((ex) => con.err(ex));
// #endregion
