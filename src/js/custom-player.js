'use strict';
import { dom, qs, qsA, query } from './querySelector.js';

if (typeof mph === 'object' && !mph.contentPlayer) {
  mph.contentPlayer = true;
  {
    let context = self;
    try {
      while (
        context !== self.top &&
        context.location.href.startsWith('about:blank') &&
        context.parent.location.href
      ) {
        context = context.parent;
      }
      // eslint-disable-next-line no-empty
    } catch (ex) {}
    mph.effectiveSelf = context;
  }
  let cfg = {};
  let currentVideoId;

  const debug = true;

  const {
    err,
    hermes,
    info,
    log,
    page,
    make,
    ael,
    loadDOM,
    isMobile,
    isEmpty,
    isBlank,
    isNull,
    fetchStream
  } = mph;
  const { loc } = page;
  const pgparam = page.getPage();
  const UnsafeDomEngine = class {
    constructor() {
      this.exDoms = [];
      this.dom = window;
      this.domProxy = {
        get(target, prop) {
          return target[prop];
        },
        set(obj, prop, value) {
          // The default behavior to store the value
          obj[prop] = value;
          // Indicate success
          return true;
        }
      };
      if (window.wrappedJSObject) {
        this.dom = window.wrappedJSObject;
      }
    }

    exportFn(fn, str, wrapper = window) {
      try {
        if (typeof exportFunction === 'function') {
          exportFunction(fn, wrapper, {
            defineAs: str
          });
        } else {
          this.dom[str] = fn;
        }
      } catch (ex) {
        err(ex);
      }
    }

    async fromDom(elem, isObj, waitForKeys = false) {
      let prox;
      let fRule;
      if (!isObj) {
        if (typeof elem === 'object') {
          fRule = this.domFilter(elem);
          if (!isBlank(fRule)) {
            return fRule[0].dom;
          }
          prox = new Proxy(elem, this.domProxy);
          this.exDoms.push({
            elem: elem,
            dom: prox
          });
        } else {
          if (isNull(qs(elem, this.dom.document))) {
            await query(elem, this.dom.document);
          }
          fRule = this.domFilter(qs(elem, this.dom.document));
          if (!isBlank(fRule)) {
            return fRule[0].dom;
          }
          prox = new Proxy(qs(elem, this.dom.document), this.domProxy);
          if (waitForKeys && isBlank(Object.keys(qs(elem, this.dom.document)))) {
            while (isBlank(Object.keys(qs(elem, this.dom.document)))) {
              await new Promise((resolve) => requestAnimationFrame(resolve));
            }
          }
          this.exDoms.push({
            elem: qs(elem, this.dom.document),
            dom: prox
          });
        }
        return prox;
      }
      while (isNull(this.dom[elem])) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      if (typeof this.dom[elem] === 'object') {
        fRule = this.domFilter(this.dom[elem]);
        if (!isBlank(fRule)) {
          return fRule[0].dom;
        }
        prox = new Proxy(this.dom[elem], this.domProxy);
        this.exDoms.push({
          elem: this.dom[elem],
          dom: prox
        });
        return prox;
      }
      return this.dom[elem];
    }

    domFilter(rule) {
      return this.exDoms.filter((e) => Object.is(e.elem, rule));
    }
  };
  const unsafeDom = new UnsafeDomEngine();
  const PHPlayer = {
    cfg: {},
    handle: {},
    name: '',
    title: '',
    thumb: ''
  };
  const setPHPlayer = (obj) => Object.assign(PHPlayer, obj);
  const injectScriptlet = function (doc, text) {
    if (!doc) {
      return;
    }
    let script, url;
    try {
      const blob = new self.Blob([text], { type: 'text/javascript; charset=utf-8' });
      url = self.URL.createObjectURL(blob);
      script = doc.createElement('script');
      script.async = false;
      script.src = url;
      (doc.head || doc.documentElement || doc).appendChild(script);
    } catch (ex) {
      /* empty */
    }
    if (url) {
      if (script) {
        script.remove();
      }
      self.URL.revokeObjectURL(url);
    }
  };
  const setClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
    } catch (ex) {
      err(`[Clipboard] Failed to copy: ${ex}`);
    }
  };
  const msg = async (text, time) => {
    const notice = qs('.mph_progressContainer');
    if (!notice) {
      return;
    }
    const noticeElem = qs('.mph_progress');
    if (!noticeElem) {
      return;
    }
    const timeout = new mph.Timeout();

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
  const plyrOptions = {
    enabled: true,
    disableContextMenu: true,
    controls: [
      'restart',
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'download',
      'fullscreen'
    ],
    clickToPlay: true,
    quality: {
      default: 4320,
      options: [4320, 2160, 1440, 1080, 720, 480, 360, 240]
    },
    settings: ['quality', 'speed', 'loop'],
    autopause: true,
    autoplay: false,
    seekTime: 4,
    hideControls: true,
    keyboard: {
      focused: true,
      global: true
    },
    tooltips: {
      controls: true,
      seek: true
    },
    displayDuration: true,
    fullscreen: {
      enabled: true,
      fallback: true,
      iosNative: false,
      container: null
    },
    storage: {
      enabled: true,
      key: 'plyr'
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

  const videoCache = new Map();
  const frame = make('main-userjs', 'hidden', {
    dataset: {
      insertedBy: 'magic-ph',
      role: 'primary-container'
    }
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
          // Tab.open(dataset.webpage);
          window.open(dataset.webpage);
        } else if (cmd === 'close') {
          dom.remove(qsA('video', frame));
          dom.cl.remove(frame, 'expanded');
          dom.cl.add(frame, 'hidden');
        } else if (cmd === 'copy' && dataset.webpage) {
          await setClipboard(dataset.webpage);
          const inp = qs('input', target.parentElement);
          msg('[MagicPH] Copied URL to Clipboard', 2500);
          // if (l.xham) {
          //   inp.style.color = siteTheme.background;
          // } else {
          //   inp.style.color = siteTheme.get();
          // }
          // await delay(2500);
          dom.attr(inp, 'style', '');
        } else if (cmd === 'download-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
          const vid = videoCache.get(dataset.webpage);
          msg(`[MagicPH] Downloading Video "${vid.title}"`);
          await fetchStream(dataset.webpage, vid.title, vid.data);
          msg('[MagicPH] Download complete', 2500);
        } else if (cmd === 'preview-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
          if (!debug) {
            msg('[MagicPH] Disabled, WIP', 2500);
            return;
          }

          dom.remove(qsA('video', frame));
          const videoElem = make('video', '', {
            preload: 'auto'
          });
          dom.attr(videoElem, 'controls', '');
          dom.attr(videoElem, 'disablepictureinpicture', '');
          const src = make('source', '', {
            src: dataset.webpage,
            type: 'video/mp4'
          });
          videoElem.append(src);
          dom.cl.add(frame, 'expanded');
          qs('.mph-list').append(videoElem);
        }
      } catch (ex) {
        err(ex);
      }
    }
  });
  const vidQuality = make('div', 'mgp_download mgp_optionSelector', {
    innerHTML: 'Video Quality(s)',
    onclick(e) {
      mph.halt(e);
      dom.cl.remove(frame, 'hidden');
      if (isMobile) {
        if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || location.origin.includes('youporn')) {
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
  const vidFrame = make('div', 'altframe', { id: 'playerframe' });
  const vidPlayer = make('video', 'biga', { id: 'altplayer', controls: true });

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
        msg(
          `[MagicPH] Deleted Video Id: ${target.parentElement.parentElement.dataset.title}`,
          2500
        );
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
          innerHTML: location.origin.match(/redtube/g)
            ? 'Download'
            : `${iconSVG.download} Download`,
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
        liElem.append(r);
      }
      dul.append(liElem);
    }
    close.append(closeVQ, closeHM);
    return dContainer.append(close, dul);
  };
  const getMGP = async () => {
    while (isNull(unsafeDom.dom.MGP)) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    while (isEmpty(Object.keys(unsafeDom.dom.MGP.players))) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return unsafeDom.dom.MGP;
  };
  const networkPlayer = async (mediaDefinitions = []) => {
    try {
      if (isMobile) {
        await query('.mgp_container');
      }

      const MGP = await getMGP();
      const p = Object.keys(MGP.players)[0]; // MGP.players[MGP.focusedPlayer.get()]
      setPHPlayer({
        cfg: MGP.players[p].settings(),
        handle: MGP.players[p],
        name: p,
        title: MGP.players[p].settings().mainRoll.title,
        thumb: MGP.players[p].settings().mainRoll.poster
      });
      MGP.players[p].mute();
      MGP.players[p].pause();

      let oldPlayer =
        qs('[id="player"]') ||
        qs('.player') ||
        qs('section[id="fullsContainer"]') ||
        qs('[id="redtube-player"]') ||
        qs('[id="playerContainerWrapper"]') ||
        qs('[id="videoWrapper"]') ||
        qs('[id="videoPlayerPlaceholder"]') ||
        qs('.playWrapper');

      if (isMobile) {
        oldPlayer = qs('.playerWrapper');
        dom.cl.add(vidFrame, 'mph_mobile');
      }

      if (!cfg.altplayers.match(/none/g)) {
        injectScriptlet(
          document,
          `(function() {
          'use strict';
          if(!(Object.is(window.MGP, null) || Object.is(window.MGP, undefined))) {
            window.MGP.players[Object.keys(window.MGP.players)[0]].destroy(() => {});
            delete window.MGP.players[Object.keys(window.MGP.players)[0]];
          };
        })();`
        );
        if (oldPlayer) {
          oldPlayer.remove();
        }
      }
      makeContainer(mediaDefinitions, PHPlayer.title ?? document.title);
      if (isEmpty(mediaDefinitions)) {
        return;
      }
      dom.attr(vidPlayer, 'data-poster', PHPlayer.thumb);
      vidFrame.prepend(vidPlayer);

      if (pgparam.origin.match(/pornhub/g)) {
        if (isMobile) {
          qs('[id="videoShow"').prepend(vidFrame);
        } else {
          qs('.video-wrapper').prepend(vidFrame);
        }
      } else if (pgparam.origin.match(/redtube/g)) {
        isMobile
          ? qs('[id="player-placeholder"]').prepend(vidFrame)
          : qs('[id="video_left_col"]').prepend(vidFrame);
        if (qs('.js_player_seek_trigger')) {
          for (const s of qsA('.js_player_seek_trigger')) {
            s.onclick = (e) => {
              mph.halt(e);
              PHPlayer.handle.seek(s.dataset.seekTo, true);
            };
          }
        }
      } else if (pgparam.origin.match(/thumbzilla/g)) {
        isMobile
          ? qs('[id="mobileContainer"] .wrapper').prepend(vidFrame)
          : qs('.fullGrey').prepend(vidFrame);
      } else if (pgparam.origin.match(/tube8/g)) {
        qs('body').prepend(vidFrame);
      } else if (pgparam.origin.match(/youporn/g)) {
        if (isMobile) {
          qs('.videoCta').prepend(vidFrame);
          dom.cl.add('.mgp_container', 'rm');
          dom.attr(vidFrame, 'style', 'position: absolute;top: 0;bottom: 0;left: 0;right: 0;');
        } else {
          qs('.main_content > .container').prepend(vidFrame);
        }
      }
      const plyrSetup = () => {
        try {
          plyrOptions.title = PHPlayer.title;
          plyrOptions.iconUrl = webext.runtime.getURL('web_accessible_resources/plyr.svg');
          plyrOptions.blankVideo = webext.runtime.getURL('web_accessible_resources/blank.mp4');
          const sources = mediaDefinitions.map((m) => {
            const dnum = m.match(/(_|\/)\d+P_/g);
            return {
              src: m,
              type: 'video/mp4',
              size: dnum[0].match(/\d+/g)
            };
          });
          // eslint-disable-next-line no-undef
          const mphPlayer = new Plyr('[id="altplayer"]', plyrOptions);
          mphPlayer.source = {
            type: 'video',
            sources
          };
          mphPlayer.on('download', (e) => {
            mph.halt(e);
            mph.fetchVideo(mphPlayer.media.src, 'npDownload', {
              title: PHPlayer.title
            });
          });
          mphPlayer.on('loadeddata', () => {
            if (mphPlayer.currentTime === 0) {
              mphPlayer.currentTime = cfg.seektime;
              mphPlayer.play();
            }
          });
        } catch (ex) {
          err(ex);
        }
      };
      const customPlayer = async (p) => {
        let furl;
        try {
          if (pgparam.origin.match(/thumbzilla/g)) {
            furl = mediaDefinitions.at(-1);
            mediaDefinitions.pop();
          }
          const sources = mediaDefinitions.map((m) => {
            const dnum = m.match(/(_|\/)\d+P_/g);
            const n = dnum[0].match(/\d+/g);
            return {
              defaultQuality: false,
              format: 'mp4',
              quality: n[0],
              videoUrl: m
            };
          });
          sources.push({
            defaultQuality: 0,
            format: 'mp4',
            quality: pgparam.origin.match(/pornhub/g) ? [0] : 0,
            videoUrl: mediaDefinitions[0]
          });
          const bytes = new TextEncoder().encode(JSON.stringify(sources));
          if (isEmpty(furl)) {
            furl = URL.createObjectURL(
              new Blob([bytes], { type: 'application/json;charset=utf-8' })
            );
          }
          const vidEnv = loc.host.split('.');
          const vidParams = {
            adRolls: [],
            autoplayAds: false,
            closedCaptionsStyle: {
              size: '1.0',
              bg: '0.75',
              color: 'white',
              bg_color: 'black'
            },
            defaultQuality: pgparam.origin.match(/pornhub/g) ? [0] : [0, 0],
            embeds: {
              enabled: false,
              imageUrl: '',
              watchHD: false,
              utmRedirect: {
                logo: true,
                title: false,
                relatedBtns: false,
                videoArea: false
              },
              redirect: {
                onFullscreen: false,
                videoArea: true,
                logoUrl: ''
              },
              domain: false,
              whitelisted: true
            },
            env: '',
            eventTracking: {
              enabled: false,
              cdn: '',
              videoId: '',
              url: ''
            },
            events: {},
            features: {
              autoplay: true,
              autoplaySwitch: true,
              benchmarking: false,
              ccMenu: true,
              ccVisible: true,
              chapters: true,
              chromecast: true,
              chromecastSkin: true,
              cinema: false,
              fullscreen: true,
              iosFullscreen: true,
              iosAutoFullscreen: true,
              autoFullscreen: true,
              hotspots: true,
              logo: false,
              customLogo: '',
              mute: true,
              nextVideo: true,
              options: true,
              share: false,
              speed: true,
              tooltips: true,
              topBar: false,
              volume: true,
              grid: false,
              alternativeOptionsMenu: true,
              embedCode: '',
              themeColor: '',
              ignorePreferences: false,
              hideControlsTimeout: 2,
              qualityAutoWrap: false,
              minIosForAdRoll: 9999,
              minAndroidForAdRoll: 9999,
              qualityMenu: true
            },
            locale: 'en',
            // autoplay: false,
            // nextVideo: {
            //   thumb: '',
            //   duration: '',
            //   title: '',
            //   isHD: false,
            //   nextUrl: '',
            //   desktop: false,
            //   mobile: false,
            //   tablet: false,
            //   chanel: '',
            //   timeout: 10
            // },

            startOffset: cfg.seektime,
            referrerUrl: '',
            videoPreload: 'auto',
            viewedRequestTimeout: 60,
            viewedRequestURL: '',
            vastParserErrorReportURL: '',
            htmlSettings: {
              skin: 'default',
              skipMessage: '%SKIP_AD%',
              skipDelayMessage: '%SKIP_TIMER%',
              adsTrackUrl: '',
              listedTrackUrl: ''
            },

            playbackTracking: false,
            playerId: 'playerframe',

            // hlsConfig: {
            //   autoStartLoad: false,
            //   fragLoadingMaxRetry: 2,
            //   maxBufferLength: 60,
            //   maxMaxBufferLength: 60,
            //   maxBufferSize: 30000000,
            //   maxWaitingTime: 15
            // },
            // dashConfig: {
            //   streaming: {
            //     fastSwitchEnabled: true,
            //     flushBufferAtTrackSwitch: true,
            //     stableBufferTime: 20,
            //     bufferTimeAtTopQuality: 20,
            //     bufferTimeAtTopQualityLongForm: 20,
            //     trackSwitchMode: {
            //       audio: 'alwaysReplace',
            //       video: 'alwaysReplace'
            //     }
            //   }
            // },
            // shakaConfig: {
            //   defaultBandwidthEstimate: 1500000,
            //   prebufferGoal: 120,
            //   bandwidthDowngradeTarget: 0.75,
            //   bandwidthUpgradeTarget: 0.7,
            //   switchInterval: 2
            // },

            mainRoll: {
              appId: '10829',
              siteName: '',
              chapters: '',
              clickUrl: '',
              imageWidth: 0,
              defaultQuality: pgparam.origin.match(/pornhub/g) ? [0] : [0, 0],
              fallbackOrder: ['mp4', 'mp4x2', 'hls'],
              mediaPriority: 'mp4',
              mediaDefinition: [
                {
                  format: 'mp4',
                  remote: true,
                  videoUrl: furl
                }
              ],
              overlays: [],
              overlayTextAd: {
                displayDuration: 1,
                displayText: '',
                linkUrl: '',
                showDelay: 1
              },
              // poster: '',
              // posterWEBP: '',
              cdnTimeLimit: 20,
              // thumbs: {
              //   urlPattern: '',
              //   format: '5x5',
              //   type: 'normal',
              //   cdnType: 'regular',
              //   preload: true,
              //   progressive: false,
              //   async: false,
              //   samplingFrequency: '0',
              //   thumbWidth: '160',
              //   thumbHeight: '90',
              //   vertical: false,
              //   crop: false,
              // },
              // title: '',
              trackUrl: '',
              duration: 0,
              vertical: false,
              videoUnavailableMessages: {
                default: 'This video is currently unavailable on this site.',
                hlsNotSupported: 'No valid HLS sources are available for this video.',
                dashNotSupported: 'No valid DASH sources are available for this video.',
                onerror: 'There was an error loading or playing the video.',
                noSources: 'No valid sources are available for this video.',
                siteDisabled: 'This video is currently unavailable on this site.',
                sourceError: 'Format is not supported or source is unavailable.'
              },
              videoUrl: '',
              watchPageUrl: '',
              weight: 1,
              campaignWeight: 1,
              user_accept_language: '',
              svvtRemote: ''
            },
            menu: {
              url: '',
              deferredLoad: true,
              related: true,
              topRated: true,
              mostViewed: true,
              showOnPause: false,
              showOnPost: false,
              linkColor: null
            },
            autoPause: {
              desktop: false,
              mobile: false
            },
            quickSetup: vidEnv[1] || 'pornhub'
          };
          for (const key in p) {
            if (!Object.hasOwn(vidParams, key)) {
              vidParams[key] = p[key];
            } else if (key === 'dashConfig') {
              for (const key2 in p[key].streaming) {
                if (!Object.hasOwn(vidParams[key].streaming, key2)) {
                  vidParams[key].streaming[key2] = p[key].streaming[key2];
                }
              }
            } else if (key === 'features') {
              for (const key2 in p[key]) {
                if (!Object.hasOwn(vidParams[key], key2)) {
                  vidParams[key][key2] = p[key][key2];
                }
              }
            } else if (key === 'mainRoll') {
              for (const key2 in p[key]) {
                if (!Object.hasOwn(vidParams[key], key2)) {
                  vidParams[key][key2] = p[key][key2];
                }
              }
            }
          }
          injectScriptlet(
            document,
            `(function() {
            'use strict';
            if(!(Object.is(window.MGP, null) || Object.is(window.MGP, undefined))) {
              window.MGP.createPlayer('playerframe', ${JSON.stringify(vidParams)});
              window.playerObjList = window.MGP.players['playerframe'];
              window.top.jumpToAction = (e) => { return window.MGP.players['playerframe'].seek(e, true) };
            };
          })();`
          );

          info('Old Player:', p, 'New Player:', vidParams);
        } catch (ex) {
          err(ex);
        }
      };
      if (cfg.altplayers.match(/plyr/g)) {
        await hermes.send('General', {
          what: 'Inject',
          css: true,
          file: 'css/plyr.css'
        });
        await hermes.send('General', {
          what: 'Inject',
          file: 'web_accessible_resources/plyr.js'
        });
        plyrSetup();
        return;
      } else if (cfg.altplayers.match(/enhanced/g)) {
        await customPlayer(PHPlayer.cfg);
        while (Object.keys(unsafeDom.dom.MGP.players).length === 0) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        while (isNull(unsafeDom.dom.MGP.players.playerframe)) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        setPHPlayer({
          cfg: MGP.players['playerframe'].settings(),
          handle: MGP.players['playerframe'],
          name: 'playerframe',
          title: MGP.players['playerframe'].settings().mainRoll.title,
          thumb: MGP.players['playerframe'].settings().mainRoll.poster
        });

        if (qs('.mgp_actionTagsScreen')) {
          const tags = make('div', 'mgp_actionNavWrapper', {
            innerHTML: qs('.mgp_actionNavWrapper') ? qs('.mgp_actionNavWrapper').innerHTML : ''
          });
          qs('.mgp_actionTagsScreen').append(tags);
        }
      } else {
        vidFrame.remove();
        if (isEmpty(Object.keys(MGP.players))) {
          while (isEmpty(Object.keys(MGP.players))) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }

        const p = Object.keys(MGP.players);
        setPHPlayer({
          cfg: MGP.players[p].settings(),
          handle: MGP.players[p],
          name: p,
          title: MGP.players[p].settings().mainRoll.title,
          thumb: MGP.players[p].settings().mainRoll.poster
        });
      }

      info('Wating for player...', PHPlayer.handle.isReady());
      while (PHPlayer.handle.isReady() == false) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      info('Player is ready', PHPlayer.handle.isReady());

      PHPlayer.handle.unmute();

      const seekVideo = () => {
        info('Attempting to skip...');
        try {
          PHPlayer.handle.seek(cfg.seektime, true);
          PHPlayer.handle.isPlaying() || PHPlayer.handle.play();
        } catch {
          qs('[id="playerframe"] video').fastSeek(cfg.seektime);
        }
        info('Skipped!');
      };
      if (cfg.autojump && PHPlayer.cfg.mainRoll.actionTags) {
        if (!cfg.blacklist) {
          return seekVideo();
        }
        info('Attempting to jump...');
        let r = '';
        for (const bl of cfg.blacklist) {
          r += `${bl}|`;
        }
        const reg = new RegExp(r.slice(0, -1), 'gi');
        const j = PHPlayer.cfg.mainRoll.actionTags.split(',');
        for (const a of j) {
          const nam = a.match(/\w+/gi);
          const tim = a.match(/\d+/gi);
          const sortFilter = nam[0].match(reg) || [];
          if (isEmpty(sortFilter)) {
            PHPlayer.handle.seek(tim[0], true);
            PHPlayer.handle.isPlaying() || PHPlayer.handle.play();
            break;
          }
        }
        info('Jumped!');
      } else {
        seekVideo();
      }

      let injInto = document.documentElement;
      if (isMobile) {
        dom.cl.add(vidQuality, 'mgp_selector');

        if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || location.origin.includes('youporn')) {
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
  const onlyfans = () => {
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    mph.observe(document.documentElement, (mutations) => {
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

    if (!document.body.contains(ofsContainer)) {
      ofsContainer.append(ofsCCopy, ofsCDownload, ofsLSToggle);
      ofsHeader.append(ofscopy, ofsdwn);
      ofsRoot.append(ofsHeader, ofsLS);
      document.body.prepend(ofsContainer);
    }
  };
  const xham = async () => {
    try {
      const qual = [];
      let t = null;
      for (const s of document.getElementsByTagName('script')) {
        if (isEmpty(s.innerHTML)) continue;
        if (s.getAttribute('id') !== 'initials-script') continue;
        const txt = s.innerHTML.toString();
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
          t = titleReg[1];
        }
        for (const src of q) {
          qual.push(src.replaceAll('\\', ''));
        }
      }
      makeContainer(qual, t, {
        credentials: 'omit',
        referrer: `${location.protocol}//${location.hostname}`
      });
      const menu = qs(isMobile ? '.xplayer-menu-mobile-bottom-left' : '.xp-context-menu');
      if (menu) {
        menu.prepend(vidQuality);
      }

      // const qual = [];
      // for (const s of document.getElementsByTagName('script')) {
      //   if (isEmpty(s.innerHTML)) continue;
      //   if (s.getAttribute('id') !== 'initials-script') continue;
      //   const ih = s.innerHTML.toString();
      //   const final = new Function(`${ih}return window.initials`)();
      //   const globalQual = final.xplayerSettings.sources.standard.h264
      //     .filter((q) => q.label !== 'auto')
      //     .map((q) => q.url);
      //   qual.push(...globalQual);
      // }
      // makeContainer(qual);
      // const menu = qs(isMobile ? '.xplayer-menu-mobile-bottom-left' : '.xp-context-menu');
      // menu.prepend(vidQuality);

      // document.body.prepend(dContainer);
      const xplayer = await unsafeDom.fromDom('xplayer');
      const sourceController = xplayer.core.sourceController;
      while (typeof sourceController.hls.levels === 'undefined') {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      const getQuality = sourceController.getQualityName(sourceController.hls.levels.at(-1));
      sourceController.setQuality(getQuality);
      const xvid = qs('video');
      if (!xvid) {
        await query('video');
      }
      if (cfg.seektime) {
        xvid.currentTime = parseInt(cfg.seektime);
      }
    } catch (ex) {
      err(ex);
    }
  };

  //#region Messenger
  const start = performance.now();

  const portMessage = (root = {}) => {
    if (root instanceof Object === false) {
      return;
    }
    mph.bootstrap = undefined;
    cfg = root.cfg || cfg;
    log(`[onConnected] Total time taken : ${performance.now() - start}ms`);

    frame.append(pgparam.origin.match(/onlyfans/g) ? ofsRoot : dContainer);
    document.documentElement.appendChild(frame);

    if (isMobile) {
      dom.cl.add([frame, ofsContainer, ofsLS], 'mph_mobile');
    }

    if (!pgparam.origin.match(/xhamster|onlyfans/g)) {
      loadDOM(document, networkPlayer, root.qualities);
    }
    if (pgparam.origin.match(/onlyfans/g)) {
      loadDOM(document, onlyfans);
    }
    if (pgparam.origin.match(/xhamster/g) && loc.href.includes('/videos/')) {
      loadDOM(document, xham);
    }
  };
  mph.bootstrap = () => {
    if (isNull(pgparam)) {
      return;
    }
    hermes
      .send('retrieveConfig', {
        what: 'setup',
        player: true,
        url: mph.effectiveSelf.location.href
      })
      .then((response) => {
        portMessage(response);
      });
  };
  mph.bootstrap();
  //#endregion
}

// if (win.MGP) {
//   const phPlayerComponent = win.phPlayerComponent;
//   const p = `playerDiv_${embedId}`;
//   const playerId = win[p];
//   const MGP = win.MGP;
//   while (isNull(MGP.players)) {
//     await new Promise((resolve) => requestAnimationFrame(resolve));
//   }
//   const destoryPlayer = async () => {
//     return await new Promise((resolve) => {
//       MGP.destroyPlayer(p);
//       MGP.players[p].destroy(resolve);
//       delete MGP.players[p];
//     })
//   };
//   await destoryPlayer();
//   const vidCfg = phPlayerComponent.getPlayerConfig(playerId, flashvars);
//   Object.assign(vidCfg, {
//     id: p,
//     adRolls: [],
//     autoplayAds: false,
//     events: {},
//     menu: {
//       relatedUrl: ''
//     }
//   });
//   vidCfg.eventTracking = {
//     enabled: false,
//     cdn: '',
//     videoId: '',
//     url: ''
//   };
//   log('vidCfg', vidCfg);
//   injectScriptlet(
//     document,
//     `(function() {'use strict';
//     if(!(Object.is(window.MGP, null) || Object.is(window.MGP, undefined))) {
//       window.MGP.createPlayer('${vidCfg.id}', ${JSON.stringify(vidCfg)});
//     };
//   })();`
//   );
//   while (isNull(MGP.players[p])) {
//     await new Promise((resolve) => requestAnimationFrame(resolve));
//   }
//   if (MGP.players[p]) {
//     log('settings', MGP.players[p].settings());
//   }
// }
