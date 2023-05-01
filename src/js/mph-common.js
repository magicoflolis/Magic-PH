'use strict';

if (typeof mph === 'object' && mph.isNull instanceof Function === false) {

  const controller = new AbortController();
  const signal = controller.signal;
  const win = self ?? window;
  const doc = win.document;
  const location = win.location;
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
        if(other) {
          locOrigin = other.origin;
          locPath = other.pathname;
        };
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
  const ypURL = purl => purl.includes('gay')
  ? 'https://www.youporngay.com'
  : purl.includes('premium')
  ? 'https://www.youpornpremium.com'
  : 'https://www.youporn.com';

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
   * @param {number} ms - Timeout in milliseconds (ms)
   * @returns {Promise} Promise object
   */
  mph.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

  mph.err = (...msg) => console.error(
    '[%cMagicPH-COMMON%c] %cERROR',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );

  mph.info = (...msg) => console.info(
    '[%cMagicPH-COMMON%c] %cINF',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );

  mph.log = (...msg) => console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...msg);

  mph.table = (...msg) => console.table(...msg);

  let mediaFiles = [],
    loggin;

  Object.assign(mph, {
    /**
     * Object is Null
     * @param {Object} obj - Object
     * @returns {boolean} Returns if statement true or false
     */
    isNull(obj) {
      return Object.is(obj, null) || Object.is(obj, undefined);
    },
    /**
     * Object is Blank
     * @param {(Object|Object[]|string)} obj - Array, Set, Object or String
     * @returns {boolean} Returns if statement true or false
     */
    isBlank(obj) {
      return (
        (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
        (obj instanceof Set && Object.is(obj.size, 0)) ||
        (Array.isArray(obj) && Object.is(obj.length, 0)) ||
        (obj instanceof Object &&
          typeof obj.entries !== 'function' &&
          Object.is(Object.keys(obj).length, 0))
      );
    },
    /**
     * Object is Empty
     * @param {(Object|Object[]|string)} obj - Array, object or string
     * @returns {boolean} Returns if statement true or false
     */
    isEmpty(obj) {
      return mph.isNull(obj) || mph.isBlank(obj);
    },
    isMobile: /Mobi/.test(navigator.userAgent),
    /**
     * Add Event Listener
     * @param {Object} root - Selected Element
     * @param {string} event - root Event Listener
     * @param {Function} callback - Callback function
     * @param {Object} [options={}] - (Optional) Options
     * @returns {Object} Returns selected Element
     */
    ael(root, event, callback, options = {}) {
      try {
        // let isMobile = /Mobile|Tablet/.test(navigator.userAgent);
        root = root || doc || doc.documentElement;
        if (mph.isMobile && event === 'click') {
          event = 'mouseup';
          root.addEventListener('touchstart', callback);
          root.addEventListener('touchend', callback);
        }
        if (event === 'fclick') {
          event = 'click';
        }
        return root.addEventListener(event, callback, options);
      } catch (ex) {
        return mph.err(ex);
      }
    },
    /**
     * Form Attributes of Element
     * @param {Object} elt - Element
     * @param {string} cname - (Optional) Element class name
     * @param {Object} [attrs={}] - (Optional) Element attributes
     * @returns {Object} Returns created Element
     */
    formAttrs(el, cname, attrs = {}) {
      try {
        if (!mph.isEmpty(cname)) {
          el.className = cname;
        }
        if (!mph.isEmpty(attrs)) {
          for (const key in attrs) {
            if (key === 'dataset') {
              for (const key2 in attrs[key]) {
                el[key][key2] = attrs[key][key2];
              }
            } else {
              el[key] = attrs[key];
            }
          }
        }
        return el;
      } catch (ex) {
        mph.err(ex)
        return el;
      };
    },
    /**
     * Create/Make Element
     * @param {string} element - Element to create
     * @param {string} cname - (Optional) Element class name
     * @param {Object} [attrs={}] - (Optional) Element attributes
     * @returns {Object} Returns created Element
     */
    make(element, cname, attrs = {}) {
      let el;
      try {
        el = doc.createElement(element);
        return mph.formAttrs(el, cname, attrs);
      } catch (ex) {
        mph.err(ex);
        return el;
      }
    },
    /**
     * Create/Make Image
     * @param {string} imgSrc - Image source
     * @param {Object} [attrs={}] - (Optional) Image attributes
     * @param {string} cname - (Optional) Image class name
     * @returns {Object} Returns created Image
     */
    makeImage(imgSrc = '', attrs = {}, cname) {
      const fallbackErr = mph.make('div', 'mph-image-error', {
        innerHTML: 'Failed to load'
      });
      const img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = imgSrc;
      if (!mph.isEmpty(cname)) {
        img.className = cname;
      }
      if (!mph.isEmpty(attrs)) {
        if(!mph.isEmpty(attrs.container)) {
          const container = attrs.container;
          img.onerror =  () => {
            const imgErr = new Image();
            imgErr.src = webext.runtime.getURL('img/image-error.svg');
            imgErr.onload =  () => container.append(imgErr);
            imgErr.onerror =  () => container.append(fallbackErr);
          },
          img.onload =  () => {
            return container.append(img)
          };
        };
        for (const key in attrs) {
          if(key === 'container') continue;
          img[key] = attrs[key];
        }
      }
      return img;
    },
    controller,
    /**
     * Add videos to sidebar
     */
    makeFav(params = {}, pfav) {
      if (!pfav) {
        return;
      }
      const v = params.video,
      wrap = mph.make('div', 'wrap'),
      btns = mph.make('div', 'mph-btns'),
      downBtn = mph.make('button', 'download-trigger', {
        type: 'button',
        innerHTML: 'Download',
        onclick: (e) => {
          mph.halt(e);
          if(mph.isEmpty(mph.hermes)) {
            return mph.err('Error mph.hermes not found!');
          };
          const tar = e.target.classList.length > 0 ? e.target : e.target.parentElement;
          const btnURL = tar.parentElement.nextElementSibling.href;
          // let params = {};
          // if(pgparam.origin.match(/thumbzilla/g) || pgparam.origin.match(/tube8/g)) {
          //   params = {
          //     credentials: 'omit'
          //   };
          // } else if(pgparam.origin.match(/onlyfans/g)) {
          //   params = {
          //     credentials: 'include'
          //   };
          // };
          mph.hermes.send('General', {
            what: 'Download',
            mediaFiles: [btnURL],
            title: tar.parentElement.nextElementSibling.nextElementSibling.innerText
          }).then((response) => {
            mph.log('Response', response);
          });
        }
      });
      const dlSVG = mph.makeImage(webext.runtime.getURL('img/magicph-download.svg'), {
        onload: () => downBtn.append(dlSVG)
      }),
      rmBtn = mph.make('button', 'remove-trigger', {
        type: 'button',
        innerHTML: 'Remove',
        onclick: (e) => {
          mph.halt(e);
          const tar = e.target.classList.length > 0 ? e.target : e.target.parentElement;
          if (tar.textContent.includes('Remove')) {
            tar.previousElementSibling.classList.add('rm');
            tar.parentElement.parentElement.classList.add('marked');
            tar.parentElement.nextElementSibling.classList.add('rm');
            tar.parentElement.nextElementSibling.nextElementSibling.classList.add('rm');
            tar.innerText = 'Undo';
          } else {
            tar.previousElementSibling.classList.remove('rm');
            tar.parentElement.parentElement.classList.remove('marked');
            tar.parentElement.nextElementSibling.classList.remove('rm');
            tar.parentElement.nextElementSibling.nextElementSibling.classList.remove('rm');
            tar.innerText = 'Remove';
            rmBtn.append(rmSVG);
          }
        }
      }),
      rmSVG = mph.makeImage(webext.runtime.getURL('img/magicph-remove.svg'), {
        onload: () => rmBtn.append(rmSVG)
      }),
      imgC = mph.make('a', '', {
        href: v.link
      }),
      sp = mph.make('span', 'title'),
      fTitle = mph.make('a', '', {
          href: v.link,
          innerHTML: v.title
      });
      const thumb = mph.makeImage(v.thumb, {
        onerror: () => {
            let imgErr = new Image();
            imgErr.src = webext.runtime.getURL('img/image-error.svg');
            mph.ael(imgErr, 'load', () => imgC.append(imgErr));
            mph.ael(imgErr, 'error', () => (imgC.innerHTML = '<div>Failed to load</div>'));
        },
        onload: () => imgC.append(thumb)
      });
      wrap.setAttribute('data-title', v.title);
      btns.prepend(downBtn, rmBtn);
      sp.append(fTitle);
      wrap.prepend(btns, imgC, sp);
      pfav.prepend(wrap);
      return true;
    },
    /**
     * Fetch a URL with fetch API as fallback
     *
     * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
     * @param {string} url - The URL to fetch
     * @param {string} method - Fetch method
     * @param {string} responseType - Response type
     * @param {Object} data - Fetch parameters
     * @returns {*} Fetch results
     * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
     */
    fetchURL(url, method = 'GET', responseType = 'json', data = {}) {
      const params = {
        method: method.toLocaleUpperCase(),
        signal,
        ...data
      };
      return new Promise((resolve, reject) => {
        if (responseType.match(/buffer/gi)) {
          fetch(url, params)
            .then((response) => {
              if (!response.ok) reject(response);
              resolve(response.arrayBuffer());
            })
            .catch(reject);
        } else {
          fetch(url, params)
            .then((response) => {
              if (!response.ok) reject(response);
              if (responseType.match(/json/gi)) {
                resolve(response.json());
              } else if (responseType.match(/text/gi)) {
                resolve(response.text());
              } else if (responseType.match(/blob/gi)) {
                resolve(response.blob());
              }
              resolve(response);
            })
            .catch(reject);
        }
      });
    },
    fetchQualities(mFiles = []) {
      const blankArr = [];
      try {
        return new Promise((resolve, reject) => {
          const testURL = mFiles;
          const mf = mFiles.filter((file) => {
            if (
              file.includes('get_media?s=') ||
              file.includes('media/mp4?s=') ||
              file.match(/youporn|tube8/gi)
            ) {
              return true;
            }
            return false;
          });
          if(mph.isBlank(mf)) {
            resolve(blankArr);
          };
          mFiles = [];
          mph.fetchURL(mf).then((fQualites) => {
            for (const item of fQualites) {
              if (mph.isEmpty(item.videoUrl) || Array.isArray(item.quality)) continue;
              if (item.videoUrl.match(/\.mp4[.?]/g)) {
                mFiles.push(item.videoUrl);
              }
            }
            mFiles = mFiles.sort((ma, mb) => {
              let a = ma.match(/\d+(?=P)/g),
                b = mb.match(/\d+(?=P)/g);
              return b[0] - a[0];
            });
            if (testURL[0].match(/thumbzilla/g)) {
              mFiles.push(testURL[0]);
            }
            resolve(mFiles);
          }).catch(reject)
        });
      } catch (ex) {
        mph.err(ex);
        return blankArr;
      }
    },
    async fetchVideo(url = '', type = 'media', dl = {}) {
      const timeout = new mph.Timeout();
      try {
        mph.log('Is Mobile',mph.isMobile);
        if (type.match(/all/g)) {
          mediaFiles = [];
        }
        if (url.includes('youporn')) {
          mediaFiles.push(`${ypURL(url)}/api/video/media_definitions/${url.match(/[\d]+\//gi)}`);
        }
        if (mph.isEmpty(mediaFiles) && type !== 'npDownload') {
          const page = await timeout.wrap(mph.fetchURL(url, 'GET', 'text'), 5000, {
            reason: 'Fetch timeout'
          });
          let parser = new DOMParser(),
            htmlDocument = parser.parseFromString(page, 'text/html'),
            selected = htmlDocument.documentElement,
            temp = '';
          for (const script of selected.querySelectorAll('script')) {
            let videosrc = [],
              txt = script.innerHTML,
              rtMedia = txt.match(/(https:[\\/]+\D+4\?s=)+(\w|\d)+/g),
              // rtMedia = txt.match(/https:[\\/.?=\d\w]+mp4[.?=\d\w]+/g),
              t8Media = txt.match(/https:[\\/\w.]+tube8[\\/_.?=\w\d]+media[\\/_.?=\w\d]+/gi),
              tzMedia = txt.match(/https:[\\/\w.]+thumbzilla[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi),
              // phMedia = txt.match(/media_[\d]=+/gi),
              phMedia = txt.match(/media_[\d]=+[\w\d\\*/+\s]+;/g),
              phMobile = txt.match(/https:[\\/\w.]+pornhub[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi);
            if (phMedia) {
              videosrc = phMedia || [];
              if (mph.isEmpty(videosrc)) {
                break;
              }
              let medias = txt.match(/media_\d+=[/*\s+]+[\w\d/*\s+]+;/g) || [];
              let rahd = txt.match(/var (\w|\d){8}[\w\d]+=[^;]+;/g) || [];
              for (const r of rahd) {
                temp += r;
              }
              for (const fin of medias) {
                const trimFin = fin.replace(/media_\d+/, 'finalmedia');
                const final = new Function(`${temp}var ${trimFin}return finalmedia`);
                mediaFiles.push(final());
              }
              break;
            } else if (phMobile) {
              videosrc = phMobile[0] || [];
              mediaFiles.push(videosrc.replaceAll('\\', ''));
              break;
            } else if (rtMedia) {
              videosrc = rtMedia[0] || [];
              mediaFiles.push(videosrc.replaceAll('\\', ''));
              let usr = selected.innerHTML.match(/isLoggedIn.[:\s\w]+/gi) || [];
              loggin = usr[0].replaceAll('isLoggedIn: ', '');
              break;
            } else if (t8Media) {
              videosrc = t8Media[0] || [];
              mediaFiles.push(videosrc.replaceAll('\\', ''));
              break;
            } else if (tzMedia) {
              videosrc = tzMedia[0] || [];
              mediaFiles.push(videosrc.replaceAll('\\', ''));
              break;
            }
          }
        }
        if (type === 'all') {
          return await mph.fetchQualities(mediaFiles);
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
          if(mph.isMobile) {
            return dlurl;
          };
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
        let invalid_chars = {
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
          },
          content = title.replace(/[\\\\/\\|<>\\*\\?:#']/g, (v) => invalid_chars[v]),
          response = await mph.fetchURL(url, 'GET', 'basic', { ...data }),
          reader = response.body.getReader(),
          contentLength = +response.headers.get('Content-Length'),
          receivedLength = 0,
          chunks = [],
          result = await reader.read();
        mph.info('Downloading...');
        while (!result.done) {
          const value = result.value;
          receivedLength += value.length;
          let percentComplete = (receivedLength / contentLength) * 100;
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
        let Uint8Chunks = new Uint8Array(receivedLength),
          position = 0;
        for (let chunk of chunks) {
          Uint8Chunks.set(chunk, position);
          position += chunk.length;
        }
        let makevideo = new Blob([Uint8Chunks], { type: 'video/mp4' }),
          dlBtn = mph.make('a', 'mph_Downloader');
        dlBtn.href = self.URL.createObjectURL(makevideo);
        dlBtn.download = `${content}.mp4`;
        dlBtn.click();
        self.URL.revokeObjectURL(dlBtn.href);
        dlBtn.remove();
      } catch (ex) {
        mph.err(ex);
        return [];
      }
    },
    /**
     * preventDefault + stopPropagation
     * @param {Object} e - Selected Element
     */
    halt(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    html: document.documentElement,
    injScript(text, remove = true) {
      return new Promise((resolve) => {
        let inj = mph.make('script', 'mph-injected', {
          type: 'text/javascript',
          innerHTML: text
        });
        (document.head || document.documentElement || document).appendChild(inj);
        if (!remove) {
          return resolve(inj);
        }
        mph.delay(1000).then(() => {
          inj.remove();
        });
        resolve(true);
      });
    },
    /**
     * @param {object} element
     * @param {function} callback - callback runs immediately, unlike a chained then()
     * @param {?} [options]
     * @returns observer
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      let observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    }
  });

  mph.Page = class {
    constructor(other) {
      if(other) {
        this.loc = new URL(other.location);
        this.gay = other.isGay === '1' || this.loc.pathname.includes('gay');
      } else {
        this.loc = new URL(window.location);
        this.gay = window.isGay === '1' || this.loc.pathname.includes('gay');
      };
      this.favorites = this.loc.href.includes('magicph-favorites');
      this.recommended = this.loc.pathname.includes('recommended');
      this.video = l.video(this.loc);
      this.scrollnumber = mph.isMobile ? 0 : (l.video() ? 400 : 101);
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
      } else if(this.loc.hostname.includes('onlyfans')) {
        this.webpage = list.onlyfans;
      } else {
        const listLoc = this.loc.hostname.match(/\..+\./gi);
        if(!mph.isEmpty(listLoc)) {
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
  };

  mph.page = new mph.Page();
};
