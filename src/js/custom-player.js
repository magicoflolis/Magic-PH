'use strict';
import { qs, qsA, query } from './querySelector.js';

if (typeof mph === 'object' && !mph.contentScriptPlayer) {
  mph.contentScriptPlayer = true;
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
  const hermes = mph.hermes;
  // const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);

  // let messenger = mph.hermes.getPort();
  let config = {};
  let vidTitle = 'MagicPH';
  let globalQualities = [];
  let exDom = [];
  const progressUpdate = async (msg, time) => {
    const timeout = new mph.Timeout();
    qs('.mph_progressContainer').setAttribute('style', 'display: block;');
    qs('.mph_progress').innerHTML = msg;
    if (typeof time === 'number' && !isNaN(time)) {
      await timeout.set(time);
      qs('.mph_progressContainer').setAttribute('style', '');
      qs('.mph_progress').innerHTML = '';
    }
    return timeout.clear(...timeout.ids);
  };
  const pgparam = mph.page.getPage(),
    win = mph.isNull(window.wrappedJSObject) ? window : window.wrappedJSObject,
    doc = document,
    location = window.location,
    launch = (callback, obj = {}) => {
      const readyState = document.readyState;
      if (readyState === 'interactive' || readyState === 'complete') {
        return callback(obj);
      }
      mph.ael(document, 'DOMContentLoaded', () => callback(obj), { once: true });
    },
    fromDom = async (obj) => {
      if (!mph.isEmpty(exDom)) {
        let doms = exDom.filter((d) => Object.is(d.dom, obj));
        mph.log(doms, obj, exDom);
        if (!mph.isBlank(doms)) {
          return doms[0].root;
        }
      }
      let win = mph.isNull(window.wrappedJSObject) ? window : window.wrappedJSObject;
      const handler = {
        get(obj, prop) {
          return prop in obj ? obj[prop] : win[prop];
        }
      };
      if (typeof win[obj] === 'undefined') {
        while (typeof win[obj] === 'undefined') {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }
      let root = new Proxy(win[obj], handler);
      exDom.push({
        dom: obj,
        root: root
      });
      return root;
    },
    dContainer = mph.make('div', 'mgp_downloadInfo'),
    mobileContainer = mph.make('ul', 'mgp_downloadInfo mgp_optionsList'),
    vidQuality = mph.make('div', 'mgp_download', {
      innerHTML: 'Video Quality(s)'
    });
    mph.ael(vidQuality, 'click', (e) => {
      mph.halt(e);
      if (pgparam.origin.match(/xhamster/g)) {
        dContainer.classList.add('mgp_active');
        dContainer.setAttribute('style', 'z-index: 1000000;');
        return;
      }
      let dt = () => {
        dContainer.classList.add('mgp_active');
        qs('.mgp_contextMenu').classList.add('mgp_hidden');
      };
      if (mph.isMobile) {
        if (qs('div.mgp_controls > div.mgp_qualitiesMenu')) {
          dt();
        } else {
          if (qs('.mgp_subPage > .mgp_header')) {
            qs('.mgp_subPage > .mgp_header').innerHTML = 'Video Quality(s)';
          }
          mobileContainer.setAttribute('style', 'display: block !important;');
          mobileContainer.firstElementChild.setAttribute('style', 'display: none;');
          mobileContainer.lastElementChild.setAttribute('style', 'display: block !important;');
          if (qs('.mgp_optionsMenu')) {
            if (!qs('.mgp_optionsMenu').classList.contains('mgp_level2')) {
              qs('.mgp_optionsMenu').classList.add('mgp_level2');
            }
            if (!qs('.mgp_optionsMenu').classList.contains('mgp_visible')) {
              qs('.mgp_optionsMenu').classList.add('mgp_visible');
            }
          }
        }
      } else {
        dt();
      }
    });
    const vidFrame = mph.make('div', 'altframe', { id: 'playerframe' }),
    vidPlayer = mph.make('video', 'biga', { id: 'altplayer', controls: true }),
    makeContainer = (q = []) => {
      mph.log('globalQualities', q);
      if (mph.isEmpty(q)) {
        mph.log('Empty quality list', q);
        return;
      }
      let close = mph.make('div', 'mgp_copyCloseDiv'),
        closeVQ = mph.make('div', 'mgp_title', {
          innerHTML: 'Video Quality(s)'
        }),
        closeHM = mph.make('div', 'mgp_hideMenu', {
          innerHTML: '🗙'
        }),
        dul = mph.make('ul');
      for (const v of q) {
        let l = mph.make('li'),
          s = mph.make('label'),
          inp = mph.make('input', 'mphURL', {
            value: v,
            type: 'url',
            size: '70'
          }),
          dCopy = mph.make('a', 'suggestToggleAlt', {
            title: 'Copy',
            innerHTML: pgparam.origin.match(/redtube/g)
              ? '<span>C</span>'
              : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="copy"><path d="M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z"></path></g></svg>',
            onclick: (e) => {
              mph.halt(e);
              navigator.clipboard.writeText(inp.value).then(() => mph.log(inp.value), mph.err);
              inp.style.color = '#f90';
              mph.delay(2000).then(() => inp.setAttribute('style', ''));
            }
          }),
          dDownload = mph.make('a', 'suggestToggleAlt', {
            title: 'Download',
            innerHTML: pgparam.origin.match(/redtube/g)
              ? '<span>D</span>'
              : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></g></svg>'
          });
        inp.setAttribute('readonly', '');
        s.append(inp);
        mph.ael(dDownload, 'fclick', async (e) => {
          mph.halt(e);
          try {
            if (pgparam.origin.match(/xhamster/g)) {
              let aElem = mph.make('a', 'mph_Downloader', {
                target: '_blank',
                href: inp.value,
                download: `mph_${encodeURIComponent(win.initials.videoModel.title)}.mp4`
              });
              aElem.click();
              aElem.remove();
              // mph.hermes.send('xhamDownload', {
              //   mediaFiles: inp.value,
              //   params: win.initials.videoModel.title,
              // });
              return;
            }
            mph.fetchStream(inp.value, vidTitle);
          } catch (ex) {
            mph.err(ex);
          }
        });
        l.append(s, dCopy, dDownload);
        dul.append(l);
      }
      mph.ael(closeHM, 'click', () => {
        dContainer.classList.remove('mgp_active');
      });
      close.append(closeVQ, closeHM);
      if (mph.isMobile) {
        if (!qs('div.mgp_controls > div.mgp_qualitiesMenu') && !pgparam.origin.match(/xhamster/g)) {
          return mobileContainer.append(close, dul);
        }
      }
      return dContainer.append(close, dul);
    },
    networkPlayer = async (mediaDefinitions = []) => {
      try {
        let playername,
          vid,
          phplayer,
          vidThumb,
          oldPlayer =
            qs('[id="player"]') ||
            qs('.player') ||
            qs('section[id="fullsContainer"]') ||
            qs('[id="redtube-player"]') ||
            qs('[id="playerContainerWrapper"]') ||
            qs('[id="videoWrapper"]') ||
            qs('[id="videoPlayerPlaceholder"]') ||
            qs('.playWrapper');

        if (mph.isMobile) {
          oldPlayer = qs('.playerWrapper');
          vidFrame.classList.add('mph_mobile');
        }
        let MGP = await fromDom('MGP');
        if (mph.isEmpty(Object.keys(MGP.players))) {
          while (mph.isEmpty(Object.keys(MGP.players))) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
        for (const p of Object.keys(MGP.players)) {
          playername = p;
          phplayer = MGP.players[p];
          vid = phplayer.settings();
          vidTitle = phplayer.settings().mainRoll.title;
          vidThumb = phplayer.settings().mainRoll.poster;
          phplayer.mute();
        }
        makeContainer(mediaDefinitions);
        vidPlayer.setAttribute('data-poster', vidThumb);
        vidFrame.prepend(vidPlayer);
        if (pgparam.origin.match(/pornhub/g)) {
          mph.log(qs('[id="videoShow"'));
          if (mph.isMobile) {
            qs('[id="videoShow"').prepend(vidFrame);
          } else {
            qs('.video-wrapper').prepend(vidFrame);
          };
        } else if (pgparam.origin.match(/redtube/g)) {
          mph.isMobile
            ? qs('#player-placeholder').prepend(vidFrame)
            : qs('#video_left_col').prepend(vidFrame);
          if (qs('.js_player_seek_trigger')) {
            for (const i of qsA('.js_player_seek_trigger')) {
              i.onclick = (e) => {
                mph.halt(e);
                phplayer.seek(i.dataset.seekTo, true);
              };
            }
          }
        } else if (pgparam.origin.match(/thumbzilla/g)) {
          mph.isMobile
            ? qs('#mobileContainer .wrapper').prepend(vidFrame)
            : qs('.fullGrey').prepend(vidFrame);
        } else if (pgparam.origin.match(/tube8/g)) {
          qs('body').prepend(vidFrame);
        } else if (pgparam.origin.match(/youporn/g)) {
          if (mph.isMobile) {
            qs('.videoCta').prepend(vidFrame);
            qs('.mgp_container').classList.add('rm');
            vidFrame.setAttribute('style', 'position: absolute;top: 0;bottom: 0;left: 0;right: 0;');
          } else {
            qs('.main_content > .container').prepend(vidFrame);
          }
        }
        if (config.altplayers.match(/none/g)) {
          vidFrame.remove();
        } else {
          mph.injScript(`MGP.players['${playername}'].destroy(() => {});`).then(() => {
            if (oldPlayer) {
              oldPlayer.remove();
            }
          });
        };
        let plyrSetup = () => {
            let options = {
              enabled: true,
              title: vidTitle,
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
              blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
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
            let s = [];
            for (let v of mediaDefinitions) {
              let dnum = v.match(/(_|\/)\d+P_/g),
                n = dnum[0].match(/\d+/g);
              s.push({
                src: v,
                type: 'video/mp4',
                size: n
              });
            }
            win.altDownload = (mediaSrc) =>
              mph.fetchVideo(mediaSrc, 'npDownload', {
                title: vidTitle
              });
            mph.injScript(
              `'use strict';\nlet mphPlayer = new Plyr('#altplayer', ${JSON.stringify(
                options
              )});\nmphPlayer.source = {\ntype: 'video',\nsources: ${JSON.stringify(
                s
              )},};\nmphPlayer.on('download', () => window.altDownload(mphPlayer.media.src));\nmphPlayer.on('loadeddata', () => {\nif(mphPlayer.currentTime === 0) {\nmphPlayer.currentTime = ${
                config.seektime
              };\nmphPlayer.play();\n}\n});`
            );
          },
          customPlayer = (p) => {
            let s = [],
              furl = '';
            if (pgparam.origin.match(/thumbzilla/g)) {
              furl = mediaDefinitions.at(-1);
              mediaDefinitions.pop();
            }
            s.push({
              defaultQuality: 0,
              format: 'mp4',
              quality: pgparam.origin.match(/pornhub/g) ? [0] : 0,
              videoUrl: mediaDefinitions[0]
            });
            for (let v of mediaDefinitions) {
              let dnum = v.match(/(_|\/)\d+P_/g),
                n = dnum[0].match(/\d+/g);
              s.push({
                defaultQuality: false,
                format: 'mp4',
                quality: n[0],
                videoUrl: v
              });
            }
            const str = JSON.stringify(s),
              bytes = new TextEncoder().encode(str);
            if (mph.isEmpty(furl)) {
              furl = self.URL.createObjectURL(
                new Blob([bytes], { type: 'application/json;charset=utf-8' })
              );
            }
            let vidEnv = location.host.split('.'),
              vidParams = {
                quickSetup: vidEnv[1] || 'pornhub',
                locale: 'en',
                autoplayAds: false,
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
                env: '',
                startOffset: config.seektime,
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
                eventTracking: {
                  enabled: false,
                  cdn: '',
                  videoId: '',
                  url: ''
                },
                playbackTracking: false,
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
                hlsConfig: {
                  autoStartLoad: false,
                  fragLoadingMaxRetry: 2,
                  maxBufferLength: 60,
                  maxMaxBufferLength: 60,
                  maxBufferSize: 30000000,
                  maxWaitingTime: 15
                },
                dashConfig: {
                  streaming: {
                    fastSwitchEnabled: true,
                    flushBufferAtTrackSwitch: true,
                    stableBufferTime: 20,
                    bufferTimeAtTopQuality: 20,
                    bufferTimeAtTopQualityLongForm: 20,
                    trackSwitchMode: {
                      audio: 'alwaysReplace',
                      video: 'alwaysReplace'
                    }
                  }
                },
                shakaConfig: {
                  defaultBandwidthEstimate: 1500000,
                  prebufferGoal: 120,
                  bandwidthDowngradeTarget: 0.75,
                  bandwidthUpgradeTarget: 0.7,
                  switchInterval: 2
                },
                adRolls: [],
                defaultQuality: pgparam.origin.match(/pornhub/g) ? [0] : [0, 0],
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
                // theme: {
                //   themeCode: '',
                //   customColor: '',
                //   customLogo: ''
                // },
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
                closedCaptionsStyle: {
                  size: '1.0',
                  bg: '0.75',
                  color: 'white',
                  bg_color: 'black'
                }
              };
            for (const key in p) {
              if (!Object.hasOwn(vidParams, key)) {
                vidParams[key] = p[key];
              } else if (key === 'dashConfig') {
                for (const s in p[key].streaming) {
                  if (!Object.hasOwn(vidParams[key].streaming, s)) {
                    vidParams[key].streaming[s] = p[key].streaming[s];
                  }
                }
              } else if (key === 'events') {
                for (const e in p[key]) {
                  if (!Object.hasOwn(vidParams[key], e)) {
                    vidParams[key][e] = p[key][e];
                  }
                }
              } else if (key === 'features') {
                for (const f in p[key]) {
                  if (!Object.hasOwn(vidParams[key], f)) {
                    vidParams[key][f] = p[key][f];
                  }
                }
              } else if (key === 'mainRoll') {
                for (const mr in p[key]) {
                  if (!Object.hasOwn(vidParams[key], mr)) {
                    vidParams[key][mr] = p[key][mr];
                  }
                }
              }
            }
            if (!mph.isEmpty(vidParams.events)) {
              for (const key of Object.keys(vidParams.events)) {
                vidParams.events[key] = () => {};
              }
            }
            mph.log('Old Player:', p, 'New Player:', vidParams);
            mph.injScript(`MGP.createPlayer('playerframe', ${JSON.stringify(vidParams)})`);
            phplayer = MGP.players['playerframe'];
            vid = phplayer.settings();
            win.playerObjList = phplayer;
            win.top.jumpToAction = (e) => phplayer.seek(e, true);
          };
        if (config.altplayers.match(/plyr/g)) {
          let inject = async (src, type = 'script') => {
            let elm;
            return await new Promise((resolve, reject) => {
              if (!doc) {
                return;
              }
              if (type.match(/script/g)) {
                elm = mph.make('script', '', {
                  type: 'module',
                  src: webext.runtime.getURL(src),
                  crossOrigin: 'anonymous'
                });
              } else {
                elm = mph.make('link', '', {
                  href: webext.runtime.getURL(src),
                  rel: 'stylesheet'
                });
              }
              elm.onload = () => resolve(elm);
              elm.onerror = () => reject(`Load error for ${src}`);
              (doc.head || mph.html || doc).appendChild(elm);
            });
          };
          inject('css/plyr.css', 'stylesheet');
          inject('web_accessible_resources/plyr.js').then(plyrSetup);
          return;
        } else if (config.altplayers.match(/enhanced/g)) {
          customPlayer(phplayer.settings());
          if (qs('.mgp_actionTagsScreen')) {
            let tags = mph.make('div', 'mgp_actionNavWrapper', {
              innerHTML: qs('.mgp_actionNavWrapper') ? qs('.mgp_actionNavWrapper').innerHTML : ''
            });
            qs('.mgp_actionTagsScreen').append(tags);
          }
        }
        mph.info('Wating for player...', phplayer.isReady());
        while (phplayer.isReady() == false) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        mph.info('Player is ready', phplayer.isReady());
        let seekVideo = () => {
          mph.info('Attempting to skip...');
          try {
            phplayer.seek(config.seektime, true);
          } catch {
            qs('#playerframe video').fastSeek(config.seektime);
          }
          mph.info('Skipped!');
        };
        if (config.autojump && vid.mainRoll.actionTags) {
          let lslist = config.blacklist;
          if (!lslist) return seekVideo();
          mph.info('Attempting to jump...');
          let r = '';
          for (let bl of lslist) {
            r += `${bl}|`;
          }
          let reg = new RegExp(r.slice(0, -1), 'gi'),
            j = vid.mainRoll.actionTags.split(',');
          for (let a of j) {
            let nam = a.match(/\w+/gi),
              tim = a.match(/\d+/gi),
              sortFilter = nam[0].match(reg) || [];
            if (mph.isEmpty(sortFilter)) {
              phplayer.seek(tim[0], true);
              break;
            }
          }
          mph.info('Jumped!');
        } else {
          seekVideo();
        }
        if (!mph.isMobile) {
          return desktop();
        }
        return qs('div.mgp_controls > div.mgp_qualitiesMenu') ? tablet() : mobile();
      } catch (ex) {
        mph.err(ex);
      }
    },
    desktop = () => {
      mph.info('Detected desktop...');
      qs('.mgp_contextMenu .mgp_content').prepend(vidQuality);
      qs('.mgp_desktop').append(dContainer);
    },
    tablet = () => {
      mph.info('Detected tablet...');
      query('.mgp_controls').then((vidFrame) => {
        vidFrame.prepend(vidQuality);
        document.documentElement.append(dContainer);
      });
    },
    mobile = () => {
      mph.info('Detected mobile...');
      vidQuality.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill=\'none\' stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg><span>Video</span><div class="mgp_value">Quality(s) </div>';
      vidQuality.classList.add('mgp_selector');
      let om = qs('.mgp_optionsMenu');
      qs('ul.mgp_switches').prepend(vidQuality);
      qs('.mgp_subPage > .mgp_content').append(mobileContainer);
      mph.ael(qs('.mgp_options > .mgp_optionsBtn'), 'click', () => {
        qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
        mobileContainer.setAttribute('style', 'display: none;');
        om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
      });
      mph.ael(qs('.mgp_subPage > .mgp_header'), 'click', () => {
        qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
        mobileContainer.setAttribute('style', 'display: none;');
        om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
      });
    },
    onlyfans = () => {
      let tempsrc = '',
        temptitle = '';
      const ofsContainer = mph.make('div', 'mph_ofsContainer', {
          style: 'display: none;'
        }),
        ofsdwn = mph.make('div', 'mph_ofs_dwn', {
          title: 'Download',
          innerHTML: 'Download',
          onclick: (e) => {
            mph.halt(e);
            progressUpdate('Downloading in the background...', 5000);
            mph.hermes.send('General', {
              what: 'Download',
              mediaFiles: [tempsrc],
              title: temptitle
            });
          }
        });
      query('main[id="content"]').then(() => {
        mph.observe(qs('main[id="content"]'), (mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (!(node instanceof HTMLElement)) continue;
              if (!mph.isEmpty(node.classList)) {
                if (node.matches('video') || node.classList.contains('video-js')) {
                  mph.ael(node, 'play', () => {
                    ofsContainer.setAttribute('style', '');
                    tempsrc = node.children[node.children.length - 1].getAttribute('src');
                    temptitle = node.getAttribute('id');
                  });
                  mph.ael(node.parentElement, 'suspend', () => {
                    ofsContainer.setAttribute('style', 'display: none;');
                  });
                }
              }
            }
            for (const node of mutation.removedNodes) {
              if (!(node instanceof HTMLElement)) continue;
              if (!mph.isEmpty(node.classList)) {
                if (node.classList.contains('video-js')) {
                  ofsContainer.setAttribute('style', 'display: none;');
                }
              }
            }
          }
        });
      });
      // mph.observe(document, (mutations) => {
      //   for (const mutation of mutations) {
      //     for (const node of mutation.addedNodes) {
      //       if (node.nodeType !== 1) {
      //         continue;
      //       }
      //       if (ignoreTags.has(node.localName)) {
      //         continue;
      //       }
      //       if (node.parentElement === null) {
      //         continue;
      //       }
      //       if (node.matches('video')) {
      //         mph.ael(node, 'play', () => {
      //           ofsContainer.setAttribute('style', '');
      //           tempsrc = node.children[node.children.length - 1].getAttribute('src');
      //           temptitle = node.getAttribute('id');
      //         });
      //         mph.ael(node, 'suspend', () => {
      //           ofsContainer.setAttribute('style', 'display: none;');
      //         });
      //         // mph.ael(node.parentElement, 'suspend', () => {
      //         //   ofsContainer.setAttribute('style', 'display: none;');
      //         // });
      //       }
      //     }
      //     for (const node of mutation.removedNodes) {
      //       if (node.nodeType !== 1) {
      //         continue;
      //       }
      //       if (ignoreTags.has(node.localName)) {
      //         continue;
      //       }
      //       if (node.parentElement === null) {
      //         continue;
      //       }
      //       if (node.matches('video')) {
      //         ofsContainer.setAttribute('style', 'display: none;');
      //       }
      //     }
      //   }
      // });
      if (!doc.body.contains(ofsContainer)) {
        ofsContainer.append(ofsdwn);
        doc.body.prepend(ofsContainer);
      }
    },
    xham = async () => {
      try {
        const s = qs('script[id="initials-script"]');
        if(mph.isEmpty(s)) {
          return;
        };
        const ih = s.innerHTML.toString();
        let link, menu;
        if (mph.isMobile) {
          let hQuality = ih
            .split('"mp4"')[1]
            .split('"url"')
            .filter((m) => m.match(/"quality"/i))
            .at(-1);
          link = unescape(hQuality.split('"')[1].split('"')[0]).replace(/\\/g, '');
          menu = qs('.xplayer-menu-mobile-bottom-left');
        } else {
          link = unescape(ih.split('"mp4File"')[1].split('"')[1].split('"')[0]).replace(/\\/g, '');
          menu = qs('.xp-context-menu');
        }
        globalQualities.push(link);
        makeContainer(globalQualities);
        menu.prepend(vidQuality);
        doc.body.prepend(dContainer);
        let xplayer = await fromDom('xplayer');
        let sourceController = xplayer.core.sourceController;
        if (typeof sourceController.hls.levels === 'undefined') {
          while (typeof sourceController.hls.levels === 'undefined') {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
        let getQuality = sourceController.getQualityName(sourceController.hls.levels.at(-1));
        sourceController.setQuality(getQuality);
        let xvid = qs('video');
        if (!xvid) {
          await query('video');
        }
        if (config.seektime) {
          xvid.currentTime = parseInt(config.seektime);
        }
      } catch (ex) {
        mph.err(ex);
      }
    },
    xvideos = async () => {
      try {
        const html5player = await fromDom('html5player');
        const dlbtn = mph.make('button', 'mph-dwn dl tab-button', {
          innerHTML: '<span class="icon-f icf-download"></span><span>[MPH] Download</span>',
          onclick: async (e) => {
            mph.halt(e);
            mph.log(html5player.url_high); // html5player.url_low
          }
        });
        qs('.tabs').append(dlbtn);
      } catch (ex) {
        mph.err(ex);
      }
    };

  //#region Messenger
  let start = performance.now();

  const portMessage = (root = {}) => {
    mph.bootstrap = undefined;
    config = root.cfg || config;
    mph.log(`[onConnected] Total time taken : ${performance.now() - start}ms`);
    // mph.info('Media Definitions:', m.qualities);
    if (!pgparam.origin.match(/xhamster|onlyfans/g)) {
      launch(networkPlayer, root.qualities);
    }
    if (pgparam.origin.match(/onlyfans/g)) {
      launch(onlyfans);
    }
    if (pgparam.origin.match(/xhamster/g) && location.href.includes('/videos/')) {
      launch(xham);
    }
    if (pgparam.origin.match(/xvideos/g) && location.href.includes('/video')) {
      launch(xvideos);
    }
  };
  mph.bootstrap = () => {
    if (mph.isNull(pgparam)) {
      return;
    }
    hermes
      .send('retrieveConfig', {
        what: 'setup',
        player: true,
        url: mph.effectiveSelf.location.href
      })
      .then((response) => {
        mph.log('Reponse B', response);
        portMessage(response);
      });
  };
  mph.bootstrap();
  //#endregion
}
