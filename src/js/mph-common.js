'use strict';

if (typeof mph === 'object' && mph.isNull instanceof Function === false) {
  let mediaFiles = [];
  let loggin;

  const controller = new AbortController();
  // const signal = controller.signal;
  const location = window.location;
  const origin = location.origin;
  const path = location.pathname;
  const l = {
    ph: origin.includes('pornhub'),
    rt: origin.includes('redtube'),
    t8: origin.includes('tube8'),
    tz: origin.includes('thumbzilla'),
    yp: origin.includes('youporn'),
    ofs: origin.includes('onlyfans'),
    video(other) {
      let locOrigin = origin;
      let locPath = path;
      if (other) {
        locOrigin = other.origin;
        locPath = other.pathname;
      }
      if (locOrigin.includes('pornhub')) {
        return locPath.match(/view_video+/g);
      }
      return (
        locPath.match(/video+/g) ||
        locPath.match(/watch+/g) ||
        (locOrigin.includes('redtube') && locPath.match(/\/[\d]+/g)) ||
        locPath.match(/\/[\d]+\//g)
      );
    }
  };
  const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
  /**
   * Object is typeof `Element`
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isElem = (obj) => {
    /** @type { string } */
    const s = Object.prototype.toString.call(obj);
    return s.includes('Element');
  };
  /**
   * Object is typeof `"..."`
   * @template O
   * @param { O } obj
   * @returns { boolean }
   */
  const isStr = (obj) => {
    /** @type { string } */
    const s = Object.prototype.toString.call(obj);
    return s.includes('String');
  };
  /**
   * Object is typeof `object`
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
   * @template { * } T
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
      return toQuery ? Array.from(document.querySelectorAll(target)) : [target];
    }
    if (isElem(target)) {
      return [target];
    }
    return Array.from(target);
  };
  /**
   * @param { Document } doc
   * @param { Function } callback
   * @returns { null | true }
   */
  const loadDOM = (doc, callback, obj = undefined) => {
    if (!isFN(callback)) {
      return null;
    }
    const readyState = doc.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      callback.call({}, obj ?? doc);
    }
    doc.addEventListener('DOMContentLoaded', (evt) => callback.call({}, obj ?? evt.target), {
      once: true
    });
    return true;
  };
  const isVideo = (link) =>
    link.match(/(video|watch)+|\/[\d]+\//g) || (link.includes('redtube') && link.match(/\/[\d]+/g));
  mph.Error = class extends Error {
    /**
     * @param {string} fnName - (Optional) Function name
     * @param {...string} params - Extra error parameters
     */
    constructor(fnName = 'MPHError', ...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, mph.Error);
      } else {
        this.stack = new Error().stack;
      }
      this.fn = `[${fnName}]`;
      this.name = this.constructor.name;
    }
  };
  /**
   * setTimeout w/ Promise
   * @param { number } timeout - Timeout in milliseconds (ms)
   * @returns { Promise<void> } Promise object
   */
  mph.delay = (timeout = 5000) => new Promise((resolve) => setTimeout(resolve, timeout));
  mph.Timeout = class {
    constructor() {
      this.ids = [];
    }
    /**
     * Set the Delay and reason for timeout
     * @param {number} localDelay - Delay in ms
     * @param {string} reason - Reason for timeout
     * @returns {Promise} Promise Function
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
  };
  mph.shutdown = {
    jobs: [],
    add: function (job) {
      this.jobs.push(job);
    },
    exec: function () {
      // Shutdown asynchronously, to ensure shutdown jobs are called from
      // the top context.
      self.requestIdleCallback(() => {
        const jobs = this.jobs.slice();
        this.jobs.length = 0;
        while (jobs.length !== 0) {
          jobs.pop()();
        }
      });
    },
    remove: function (job) {
      let pos;
      while ((pos = this.jobs.indexOf(job)) !== -1) {
        this.jobs.splice(pos, 1);
      }
    }
  };
  mph.err = (...msg) =>
    console.error(
      '[%cMagicPH-COMMON%c] %cERROR',
      'color: rgb(255,153,0);',
      '',
      'color: rgb(249, 24, 128);',
      ...msg
    );
  mph.info = (...msg) =>
    console.info(
      '[%cMagicPH-COMMON%c] %cINF',
      'color: rgb(255,153,0);',
      '',
      'color: rgb(0, 186, 124);',
      ...msg
    );
  mph.log = (...msg) =>
    console.log(
      '[%cMagicPH-COMMON%c] %cLOG',
      'color: rgb(255,153,0);',
      '',
      'color: rgb(255, 212, 0);',
      ...msg
    );
  mph.table = (...msg) => console.table(...msg);
  mph.loadDOM = loadDOM;
  mph.isMobile = isMobile;
  mph.isVideo = isVideo;

  Object.assign(mph, {
    isElem,
    isStr,
    isObj,
    isFN,
    isNull,
    isBlank,
    isEmpty,
    isIFrame() {
      return (
        window.document.querySelector(':root') !== window.top.document.querySelector(':root') ||
        !mph.isNull(window.frameElement)
      );
    },
    /**
     * Add Event Listener
     * @template { HTMLElement } E
     * @template { keyof HTMLElementEventMap } K
     * @param { E } el
     * @param { K } event
     * @param { (this: E, ev: HTMLElementEventMap[K]) => any } callback
     * @param { boolean | AddEventListenerOptions } options
     */
    ael(el, event, callback, options = {}) {
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
        mph.err(ex);
      }
      // try {
      //   root = root || document || document.documentElement;
      //   if (mph.isMobile && type === 'click') {
      //     type = 'mouseup';
      //     root.addEventListener('touchstart', callback);
      //     root.addEventListener('touchend', callback);
      //   }
      //   if (type === 'fclick') {
      //     type = 'click';
      //   }
      //   return root.addEventListener(type, callback, options);
      // } catch (ex) {
      //   return mph.err(ex);
      // }
    },
    /**
     * Form Attributes of Element
     * @template { keyof HTMLElementTagNameMap } K
     * @param { K } elem
     * @param { keyof HTMLElement } attr
     */
    formAttrs(elem, attr = {}) {
      for (const key in attr) {
        if (typeof attr[key] === 'object') {
          mph.formAttrs(elem[key], attr[key]);
        }
        if (key === 'dataset') {
          for (const key2 in attr[key]) {
            elem[key][key2] = attr[key][key2];
          }
        } else if (isFN(attr[key])) {
          if (/^on/.test(key)) {
            elem[key] = attr[key];
            continue;
          }
          mph.ael(elem, key, attr[key]);
        } else if (key === 'class') {
          elem.className = attr[key];
        } else {
          elem[key] = attr[key];
        }
      }
      // try {
      //   if (!mph.isEmpty(cname)) {
      //     el.className = cname;
      //   }
      //   if (!mph.isEmpty(attrs)) {
      //     for (const key in attrs) {
      //       if (key === 'dataset') {
      //         for (const key2 in attrs[key]) {
      //           el[key][key2] = attrs[key][key2];
      //         }
      //       } else if (key === 'click') {
      //         mph.ael(el, 'click', attrs[key]);
      //       } else if (key === 'container') {
      //         if (typeof key === 'function') {
      //           key();
      //         }
      //       } else {
      //         el[key] = attrs[key];
      //       }
      //     }
      //   }
      //   return el;
      // } catch (ex) {
      //   mph.err(ex);
      //   return el;
      // }
    },
    /**
     * Make Element
     * @template { keyof HTMLElementTagNameMap } K
     * @param { K } element
     * @param { string } cname
     * @param { keyof HTMLElement } attrs
     * @returns { HTMLElementTagNameMap[K] }
     */
    make(element, cname, attrs = {}) {
      let el = null;
      try {
        el = document.createElement(element);
        if (!isEmpty(cname) && typeof cname === 'string') {
          el.className = cname;
        }
        if (!isEmpty(attrs)) {
          mph.formAttrs(el, attrs);
        }
      } catch (ex) {
        mph.err(ex);
      }
      return el;
    },
    async imageError() {
      return await new Promise((resolve) => {
        const imgErr = new Image();
        imgErr.alt = '';
        imgErr.referrerPolicy = 'no-referrer';
        imgErr.src = webext.runtime.getURL('img/image-error.svg');
        imgErr.onload = () => resolve(imgErr);
        imgErr.onerror = () => resolve(webext.runtime.getURL('img/image-error.svg'));
      });
    },
    /**
     * Make new Image
     * @param { string } imgSrc - Image source
     * @param { {} } [attrs={}] - (Optional) Image attributes
     * @param { string } cname - (Optional) Image class name
     * @returns { HTMLImageElement } Returns created Image
     */
    toImage(imgSrc = '', attrs = {}, cname) {
      const img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = imgSrc;
      mph.formAttrs(img, cname, attrs);
      return new Promise((resolve) => {
        img.onload = () => resolve(img);
        img.onerror = () => {
          mph.imageError().then(resolve);
        };
      });
    },
    async toBlob(imgSrc = '') {
      try {
        const blob = await fetch(imgSrc).then((r) => r.blob());
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (ex) {
        /* empty */
      }
      const imgErr = await mph.imageError();
      return imgErr;
    },
    controller,
    /**
     * Add videos to sidebar
     */
    async makeFav(params = {}, pfav) {
      if (!pfav) {
        return null;
      }
      const v = params.video;
      const wrap = mph.make('div', 'wrap', {
        dataset: {
          title: v.title,
          link: v.link,
          thumb: v.thumb
        }
      });
      const btns = mph.make('div', 'mph-btn-container');
      const downBtn = mph.make('mph-btn', 'fav-download-trigger', {
        innerHTML: ' Download',
        dataset: {
          command: 'fav-download'
        }
      });
      const dlSVG = await mph.toImage(webext.runtime.getURL('img/magicph-download.svg'));
      if (!isStr(dlSVG)) {
        downBtn.prepend(dlSVG);
      }
      const rmBtn = mph.make('mph-btn', 'fav-remove-trigger', {
        innerHTML: ' Remove',
        dataset: {
          command: 'fav-remove'
        }
      });
      const rmSVG = await mph.toImage(webext.runtime.getURL('img/magicph-remove.svg'));
      if (!isStr(rmSVG)) {
        rmBtn.prepend(rmSVG);
      }
      const imgC = mph.make('a', '', {
        href: v.link
      });
      const sp = mph.make('span', 'title');
      const fTitle = mph.make('a', '', {
        href: v.link,
        innerHTML: v.title
      });
      // const b = await mph.toBlob(v.thumb);
      // if (isStr(b)) {
      //   const thumb = await mph.toImage(b);
      //   if (!isStr(thumb)) {
      //     imgC.append(thumb);
      //   }
      // } else {
      //   imgC.append(b);
      // }
      const thumb = await mph.toImage(v.thumb);
      if (!isStr(thumb)) {
        imgC.append(thumb);
      }
      btns.prepend(downBtn, rmBtn);
      sp.append(fTitle);
      wrap.prepend(btns, imgC, sp);
      pfav.prepend(wrap);
      return true;
    },
    /**
     * Fetch a URL with fetch API
     * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
     * @param { RequestInfo | URL } url - The URL to fetch
     * @param { Request['method'] } method - Fetch method
     * @param { 'buffer' | 'json' | 'text' | 'blob' | 'document' } responseType - Response type
     * @param { RequestInit } data - Fetch parameters
     * @returns { Promise<Response> } Fetch results
     */
    async fetchURL(url, method = 'GET', responseType = 'json', data = {}) {
      try {
        const bscStr = (str = '', lowerCase = true) => {
          const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
          return txt.replaceAll(/\W/g, '');
        };
        if (mph.isEmpty(url)) {
          throw new Error('"url" parameter is empty');
        }
        method = bscStr(method, false);
        responseType = bscStr(responseType);
        const params = {
          method,
          ...data
        };
        if (params.onprogress) {
          delete params.onprogress;
        }
        return await new Promise((resolve, reject) => {
          /**
           * @param { Response } response_1
           * @returns { Response | Document }
           */
          const fetchResp = (response_1) => {
            if (!response_1.ok) reject(response_1);
            const check = (str_2 = 'text') => {
              return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
            };
            if (responseType.match(/basic/i)) {
              resolve(response_1);
            } else if (responseType.match(/buffer/i)) {
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
          fetch(url, params).then(fetchResp).catch(reject);
        });
      } catch (ex) {
        return mph.err(ex);
      }
    },
    fetchQualities(mFiles = []) {
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
          if (mph.isBlank(mf)) {
            resolve(blankArr);
          }
          mFiles = [];
          mph
            .fetchURL(mf)
            .then((fQualites) => {
              for (const item of fQualites) {
                if (mph.isEmpty(item.videoUrl) || Array.isArray(item.quality)) continue;
                if (/\.mp4[.?]/g.test(item.videoUrl)) {
                  mFiles.push(item.videoUrl);
                }
              }
              mFiles = mFiles.sort((ma, mb) => {
                const a = ma.match(/\d+(?=P)/g);
                const b = mb.match(/\d+(?=P)/g);
                return b[0] - a[0];
              });
              if (testURL[0].match(/thumbzilla/g)) {
                mFiles.push(testURL[0]);
              }
              resolve(mFiles);
            })
            .catch(reject);
        });
      } catch (ex) {
        mph.err(ex);
        return blankArr;
      }
    },
    async fetchVideo(url = '', type = 'media', dl = {}) {
      const timeout = new mph.Timeout();
      try {
        mph.info(`Site: ${location.origin} isMobile: ${isMobile}`);
        if (type === 'all') {
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
                const u = new URL(url);
                mediaTxt = u.origin + t;
              }
              const resp = await mph.fetchURL(mediaTxt.replaceAll('\\', ''));
              mediaFiles.push(...resp.map((i) => i.videoUrl));
              break;
            }
          };
          await timeout.wrap(mph.fetchURL(url, 'GET', 'document').then(handleDoc), 10000, {
            reason: 'Fetch timeout'
          });
        }
        if (type === 'all') {
          if (mediaFiles.length === 1) {
            return await mph.fetchQualities(mediaFiles);
          }
          return mediaFiles;
        }
        if (type.match(/download/gi)) {
          let dlurl;
          if (type === 'npDownload') {
            dlurl = [url];
          } else {
            dlurl = await mph.fetchQualities(mediaFiles);
          }
          if (dlurl[0].includes('redtube')) {
            dl.params = {
              credentials: loggin === 'false' || !loggin ? 'omit' : 'include'
            };
          }
          if (mph.isMobile) {
            return dlurl;
          }
          mph.fetchStream(dlurl[0], dl.title, dl.params);
        }
        if (type === 'media') {
          return mediaFiles;
        }
      } catch (ex) {
        mph.err(ex);
        return [];
      } finally {
        timeout.clear(...timeout.ids);
      }
    },
    async fetchStream(url = '', title = 'MagicPH', data = {}) {
      try {
        mph.info('Attempting to download...');
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
        const chunks = [];
        const content = title.replace(/[\\\\/\\|<>\\*\\?:#']/g, (v) => invalid_chars[v]);
        const response = await mph.fetchURL(url, 'GET', 'basic', data);
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        let receivedLength = 0;
        let result = await reader.read();
        mph.info('Downloading...');
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
          mph.table({
            DownloadProgress: `${percentComplete.toFixed(2)}%`,
            VideoTitle: content
          });
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
        const dlBtn = mph.make('a', 'mph_Downloader');
        dlBtn.href = self.URL.createObjectURL(makevideo);
        dlBtn.download = `${content}.mp4`;
        dlBtn.click();
        self.URL.revokeObjectURL(dlBtn.href);
        dlBtn.remove();
      } catch (ex) {
        mph.err(ex);
      }
    },
    /**
     * preventDefault + stopPropagation
     * @param { Event } evt - Selected Element
     */
    halt(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    injScript(text, remove = true, root) {
      if (!document) {
        return;
      }
      const inj = mph.make('script', 'mph-injected', {
        type: 'text/javascript',
        innerHTML: text
      });
      root = root || document.head || document.documentElement || document;
      root.appendChild(inj);
      if (!remove) {
        return inj;
      }
      mph.delay(1000).then(() => inj.remove());
    },
    /**
     * @template { HTMLElement } E
     * @param { E } element
     * @param { (this: E, ev: MutationRecord[]) => any } callback
     * @param { MutationObserverInit } options
     * @returns { MutationObserver }
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      const observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    }
  });

  mph.Page = class {
    constructor(other) {
      if (other instanceof mph.Page) {
        return this.setPage(other);
      }
      // if(other) {
      //   this.loc = new URL(other.location);
      //   this.gay = other.isGay === '1' || this.loc.pathname.includes('gay');
      // } else {
      //   this.loc = new URL(window.location);
      //   this.gay = window.isGay === '1' || this.loc.pathname.includes('gay');
      // };
      this.loc = new URL(window.location);
      this.gay = window.isGay === '1' || this.loc.pathname.includes('gay');
      this.favorites = this.loc.href.includes('magicph-favorites');
      this.recommended = this.loc.pathname.includes('recommended');
      this.video = l.video(this.loc);
      this.scrollnumber = mph.isMobile ? 0 : l.video() ? 400 : 101;
      this.webpage = null;
      return this;
    }

    findPage() {
      const list = {
        onlyfans: {
          logoImg: '.logo > .logoWrapper > a > img',
          logoContainer: 'nav.l-header__menu',
          comments: '',
          container: '.wrapper > .container',
          home: '',
          menu: '',
          favLocation: '.allActionsContainer',
          jlMain: false,
          jl: '',
          jc: '',
          sticky: '',
          body: '.main-wrapper',
          origin: 'onlyfans'
        },
        pornhub: {
          logoImg: mph.isMobile ? '.phLogoWrap > img' : 'img[itemprop="logo"]', // img[itemprop="logo"]
          logoContainer: mph.isMobile ? '#topMenuSection' : '#headerContainer .logo',
          comments: '#under-player-comments',
          container: mph.isMobile ? '.container' : '.wrapper > .container',
          home: '.frontListingWrapper',
          menu: mph.isMobile ? '.menuWrapper' : 'ul#headerMainMenu', // .bottomNav
          favLocation: mph.isMobile ? '.underThumbButtons' : '.allActionsContainer',
          jlMain: mph.isMobile ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat.alpha',
          jl: mph.isMobile ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat.alpha',
          jc: mph.isMobile ? '.mgp_actionTagPill' : 'a.js-triggerJumpCat',
          sticky: '#headerWrapper',
          body: '.wrapper',
          origin: 'pornhub'
        },
        redtube: {
          logoImg: mph.isMobile ? '#redtube_logo img' : '#logo_wrap > a > img',
          logoContainer: mph.isMobile ? '#logo_container' : '#logo_wrap',
          comments: '.tab-block-labels-list > li[data-tabid="comments_tab"]',
          container: mph.isMobile ? '#content_wrapper' : '#content_float > #content_wrapper',
          home: '#content_container',
          menu: mph.isMobile ? '#menu_container' : 'ul.menu_list',
          favLocation: mph.isMobile ? '.video_actions_container' : '.video_action_wrap',
          jlMain: mph.isMobile ? 'jlMain' : '.action_tags_list .owl-stage',
          jl: mph.isMobile ? 'jl' : '.action_tags_list .owl-item > div',
          jc: mph.isMobile ? 'jc' : '.action_tags_list .owl-item > div',
          sticky: '',
          body: '#redtube_layout',
          origin: 'redtube'
        },
        tube8: {
          logoImg: '#logo img',
          logoContainer: mph.isMobile ? '#logo' : '.logo-box.relative',
          comments: '#allComments',
          container: mph.isMobile ? '.content-wrapper' : '.main-wrapper > .content-wrapper',
          home: '#home_page_wrapper',
          menu: mph.isMobile ? '#primaryHeaderNav' : 'ul#main-nav',
          favLocation: '.player-under-btns',
          jlMain: false,
          jl: '',
          jc: '',
          sticky: '',
          body: '.main-wrapper',
          origin: 'tube8'
        },
        thumbzilla: {
          logoImg: mph.isMobile ? '#logo' : '.mainmenuBar > a > img',
          logoContainer: mph.isMobile ? '#leftMenu' : '.mainmenuBar',
          comments: '',
          container: mph.isMobile ? '#mobileContainer' : '#contentWrapper > section',
          home: '#content',
          menu: mph.isMobile ? '#leftMenu' : 'ul.categoryList',
          favLocation: '.actionWrapper',
          jlMain: false,
          jl: '',
          jc: '',
          sticky: '',
          body: '#contentWrapper',
          origin: 'thumbzilla'
        },
        xhamster: {
          logoImg: '.logo > .theme-dark',
          logoContainer: '.logo-container',
          comments: '.comments-section',
          container: 'main',
          home: '',
          menu: 'ul.top-menu__side-group.right',
          favLocation: '.controls',
          jlMain: false,
          jl: '',
          jc: '',
          sticky: '',
          body: '.main-wrap',
          origin: 'xhamster'
        },
        xvideos: {
          logoImg: '',
          logoContainer: '',
          comments: '',
          container: '',
          home: '',
          menu: '',
          favLocation: '',
          jlMain: false,
          jl: '',
          jc: '',
          sticky: '',
          body: '',
          origin: 'xvideos'
        },
        youporn: {
          logoImg: 'a > img.js_logo_img',
          logoContainer: mph.isMobile ? '.topHeader > li:nth-child(2)' : '.headerContainer',
          comments: '#videoComments',
          container: mph.isMobile ? '#mobileContainer' : '.container',
          home: '.row:not(#pagination) > div.clearfix',
          menu: mph.isMobile ? '#paidSites' : 'ul#headerMainMenu',
          favLocation: '.feature-wrapper',
          jlMain: false,
          jl: '', // a.js-triggerJumpCat
          jc: '',
          sticky: '',
          body: '.site-wrapper',
          origin: 'youporn'
        }
      };
      if (this.loc.hostname.includes('xhamster')) {
        this.webpage = list.xhamster;
      } else if (this.loc.hostname.includes('onlyfans')) {
        this.webpage = list.onlyfans;
      } else {
        const listLoc = this.loc.hostname.match(/\..+\./gi);
        if (!mph.isEmpty(listLoc)) {
          this.webpage = list[listLoc[0].replace(/\.|premium/gi, '')];
        }
      }
      if (this.webpage === null) {
        return null;
      }
      return this.webpage;
    }

    getPage() {
      return this.webpage !== null ? this.webpage : this.findPage();
    }

    setPage(other) {
      this.loc = new URL(other.location);
      this.gay = other.isGay === '1' || this.loc.pathname.includes('gay');
      this.favorites = this.loc.href.includes('magicph-favorites');
      this.recommended = this.loc.pathname.includes('recommended');
      this.video = l.video(this.loc);
      this.scrollnumber = mph.isMobile ? 0 : l.video() ? 400 : 101;
      this.webpage = null;
      return this;
    }

    duplicate() {
      return new mph.Page(this);
    }
  };

  mph.page = new mph.Page();
}
