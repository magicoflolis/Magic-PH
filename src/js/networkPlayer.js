/* eslint-disable no-useless-escape */
'use strict';

import { mph } from './api.js';
import { qs,qsA } from './querySelector.js';

let og_style;

const log = mph.log,
err = mph.err;

const win = self ?? window,
doc = win.document,
body = doc.body ?? doc.documentElement.body ?? qs('body'),
progressBar = qs('.mph_progress'),
progressContainer = qs('.mph_progressContainer'),
progressUpdate = (message,time) => {
  try {
    progressContainer.style = '';
    progressBar.innerText = message;
    if(!og_style) {
      og_style = body.style;
      body.style = 'height: fit-content !important;';
    };
    if(time) {
      if(+time === +time) {
        mph.delay(time).then(() => {
          if(progressContainer) {
            progressContainer.style = 'display: none;';
            progressBar.innerText = '';
            body.style = og_style;
          };
        });
      };
    };
  } catch(e) {mph.err(e)};
};
let vid,mediaFiles,vs,q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,
seektime = mph.getItem('seektime'),
playerID = win.MGP.getPlayerIds(),
phplayer = win.MGP.players[playerID],
vidTitle = phplayer.settings().mainRoll.title,
vidThumb = phplayer.settings().mainRoll.poster,
vidQuality = mph.make('div','mgp_download'),
dContainer = mph.make('div','mgp_downloadInfo'),
mobileContainer = mph.make('ul','mgp_downloadInfo mgp_optionsList'),
q_err = '[Error] Not Found',
dlBtn = mph.make('a','mph_Downloader'),
tags = mph.make('div','mgp_actionNavWrapper', {
  innerHTML: qs('.mgp_actionNavWrapper') ? qs('.mgp_actionNavWrapper').innerHTML : '',
}),
vidFrame = mph.make('div','altframe', {id: 'playerframe',}),
vidPlayer = mph.make('video','biga', {id: 'altplayer',controls: true,}),
dCopy = `<a class="suggestToggleAlt" title="Copy">
${mph.find.rt ? `<span>C</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="copy"><path d="M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z"></path></g></svg></a>'}`,
dDownload = `<a class="suggestToggleAlt" title="Download">
${mph.find.rt ? `<span>D</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></g></svg></a>'}`;

if(!body.contains(progressContainer)) {
  progressContainer.append(progressBar);
  body.prepend(progressContainer);
};
async function preSetup() {
  try {
    const page = await mph.fetchURL(doc.location.href,'GET','text');
    let htmlDocument = new DOMParser().parseFromString(page,'text/html'),
    selected = htmlDocument.documentElement,
    temp = '';
    if(doc.location.origin.includes('youporn')) {
      mediaFiles = `${doc.location.origin}/api/video/media_definitions${document.location.href.match(/\/[0-9]+\//gi)}`
    } else {
      for(let script of qsA('script', selected)) {
        let rtMedia = script.innerHTML.match(/https:[\\/.?=0-9A-Z]+mp4[.?=0-9A-Z]+/gi),
        t8Media = script.innerHTML.match(/https:[\\/A-Z.]+tube8[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9]+/gi),
        tzMedia = script.innerHTML.match(/https:[\\/A-Z.]+thumbzilla[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9&]+/gi),
        phMedia = script.innerHTML.match(/media_[0-9]=+/gi),
        phMobile = script.innerHTML.match(/https:[\\/A-Z.]+pornhub[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9&]+/gi);
        if(phMedia) {
          let videosrc = phMedia || [],
          rahd = script.innerHTML.match(/var [A-Za-z0-9]+=[^;]+/gi) || [];
          if(!videosrc) {
            progressUpdate(`[MagicPH] ERROR: Unable to locate Pornhub video media file(s) [value: ${videosrc}]`,5000)
          };
          for(let r of rahd) {temp += `${r};`};
          for(let i = 0; i < videosrc.length; i++) {
            let re = new RegExp(`media_[${videosrc[i]}]=[0-9/*+=+\\w\\d\\s]+`, 'gi'),
            b = script.innerHTML.match(re) || [];
            for(let fin of b) {
              // eslint-disable-next-line no-unused-vars
              let media_0,media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10;
              mediaFiles = eval(`${temp} ${fin}`);
            };
          };
          break;
        };
        if(phMobile) {
          let videosrc = phMobile[0] || []
          mediaFiles = videosrc.replaceAll('\\', '');
          break;
        };
        if(rtMedia) {
          let videosrc = rtMedia[0] || []
          mediaFiles = videosrc.replaceAll('\\', '');
          break;
        };
        if(t8Media) {
          let videosrc = t8Media[0] || [];
          mediaFiles = videosrc.replaceAll('\\', '');
          break;
        };
        if(tzMedia) {
          let videosrc = tzMedia[0] || [];
          mediaFiles = videosrc.replaceAll('\\', '');
          break;
        };
      };
    };
    for(let file of [mediaFiles]) {
      if(file.includes('get_media?s=') || file.includes('media/mp4?s=') || file.includes('youporn') || file.includes('tube8')) {
        mph.fetchURL(file,'GET','json').then((links) => {
          for(let item of links) {
            let q = item.quality.toLocaleString();
            (q.match(/240/gi)) ? (q_240 = item.videoUrl) :
            (q.match(/480/gi)) ? (q_480 = item.videoUrl) :
            (q.match(/720/gi)) ? (q_720 = item.videoUrl) :
            (q.match(/1080/gi)) ? (q_1080 = item.videoUrl) :
            (q.match(/1440/gi)) ? (q_1440 = item.videoUrl) :
            (q.match(/2160/gi)) ? (q_2160 = item.videoUrl) : q_err;
            q_best = q_2160 ?? q_1440 ?? q_1080 ?? q_720 ?? q_480 ?? q_240 ?? item.videoUrl;
          };
          if(!q_240 || q_240 === '') {q_240 = q_err};
          if(!q_480 || q_480 === '') {q_480 = q_err};
          if(!q_720 || q_720 === '') {q_720 = q_err};
          if(!q_1080 || q_1080 === '') {q_1080 = q_err};
          if(!q_1440 || q_1440 === '') {q_1440 = q_err};
          if(!q_2160 || q_2160 === '') {q_2160 = q_err};
          if(!q_best || q_best === '') {q_best = q_1080 || q_720};
          dContainer.innerHTML = `<div class="mgp_copyCloseDiv">
          <div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
          if(win.opener != null) {
            mph.info('Popup');
            DownloadVideo(q_best,vidTitle);
          } else {
            networkPlayer();
          };
        }).catch(err);
      } else {
        progressUpdate(`[MagicPH] ERROR: Unable to locate video media file(s) [mediaFiles: "${mediaFiles}"]`,5000);
      };
    };
  } catch(error) {err(error)}
};
async function networkPlayer() {
  try {
    if(mph.find.mobile) {await mph.query('.mgp_container')};
    phplayer.mute();
    phplayer.pause();
    mph.info(`Site: ${doc.location.origin}`);
    vidPlayer.setAttribute('data-poster',vidThumb);
    vidFrame.prepend(vidPlayer);
    if(mph.find.ph) {
      vs = phplayer.settings();
      vid = vs;
    };
    if(mph.find.rt) {
      mph.find.mobile ? qs('#player-placeholder').prepend(vidFrame) : qs('#video_left_col').prepend(vidFrame);
      vs = win.page_params.video_player_setup;
      vid = vs[`playerDiv_${win.page_params.view_history.videoId}`].createPlayerSetup;
      if(!mph.find.mobile) {
        vidFrame.setAttribute('style','min-height: 70vh !important;');
      }
    };
    if(mph.find.tz) {
      if(qs('.fullGrey')) {
        qs('.fullGrey').prepend(vidFrame)
      };
      vs = win.video_vars;
      vid = vs;
    };
    if(mph.find.t8) {
      vs = win.flashvars;
      vid = vs;
      qs('body').prepend(vidFrame);
    };
    if(mph.find.yp) {
      mph.find.mobile ? qs('.videoCta').prepend(vidFrame) : qs('.main_content').prepend(vidFrame);
      vid = win.page_params.video.playerParams;
      if(!mph.find.mobile) {
        vidFrame.setAttribute('style','min-height: 70vh !important;');
      }
    };
  log('Old Player:',vs ?? vid);
  let altplayer = () => {
    let options = {
    enabled: true,
    title: vidTitle,
    disableContextMenu: true,
    controls: ['restart','rewind','play','fast-forward','progress','current-time','duration','mute','volume','settings','download','fullscreen'],
    clickToPlay: true,
    blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
    quality: {
      default: 4320,
      options: [4320, 2160, 1440, 1080, 720, 480, 360, 240]
    },
    settings: ['quality','speed','loop'],
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
    new win.Plyr(vidPlayer, options);
    mph.ael(vidPlayer,'ready', event => {
    const player = event.detail.plyr;
    player.source = {
      type: 'video',
      sources: [
        {
          src: q_best,
          type: 'video/mp4',
          size: 4320,
        },
        {
          src: q_240,
          type: 'video/mp4',
          size: 240,
        },
        {
          src: q_480,
          type: 'video/mp4',
          size: 480,
        },
        {
          src: q_720,
          type: 'video/mp4',
          size: 720,
        },
        {
          src: q_1080,
          type: 'video/mp4',
          size: 1080,
        },
        {
          src: q_1440,
          type: 'video/mp4',
          size: 1440,
        },
        {
          src: q_2160,
          type: 'video/mp4',
          size: 2160,
        },
      ]
    };
    phplayer.mute();
    phplayer.pause();
    qs('.mgp_container').parentElement.parentElement.classList.add('rm');
    if(mph.find.tz || mph.find.t8) {
      phplayer.mute();
      phplayer.pause();
      mph.inject(`window.MGP.destroyPlayer(${win.MGP.getPlayerIds()})`);
      qs('.mgp_container').classList.add('rm');
    };
    player.on('download', () => {
      DownloadVideo(player.media.src,vidTitle)
    });
    player.on('loadeddata', () => {
      if(player.currentTime === 0) {
        mph.info('Attempting to skip...');
        player.currentTime = 4;
        player.play();
        mph.info('Skipped!');
      };
    });
    });
  },
  customPlayer = (p) => {
    let vidEnv = doc.location.host.split('.'),
    vidParams = {
      playerId: 'playerframe',
      autoplayAds: false,
      eventTracking: {enabled: false},
      dashConfig: {
        streaming: {
          bufferTimeAtTopQuality: 20,
          bufferTimeAtTopQualityLongForm: 20,
          fastSwitchEnabled: true,
          flushBufferAtTrackSwitch: true,
          stableBufferTime: 20,
          trackSwitchMode: {
            audio: "alwaysReplace",
            video: "alwaysReplace"
          }
        }
      },
      priority: "hls",
      mainRoll: {
        defaultQuality: [ 2160,1080,720,480,240,144 ],
        mediaPriority: "mp4",
        mediaDefinition: [
          {
            defaultQuality: false,
            format: "mp4",
            quality: 144,
            videoUrl: q_720
          },
          {
            defaultQuality: false,
            format: "mp4",
            quality: 240,
            videoUrl: q_1080
          },
          {
            defaultQuality: false,
            format: "mp4",
            quality: 480,
            videoUrl: q_best
          },
          {
            defaultQuality: false,
            format: "mp4",
            quality: 720,
            videoUrl: q_best
          },
          {
            defaultQuality: false,
            format: "mp4",
            quality: 1080,
            videoUrl: q_best
          },
          {
            defaultQuality: false,
            format: "mp4",
            quality: 1440,
            videoUrl: q_best
          },
          {
            defaultQuality: true,
            format: "hls",
            quality: 2160,
            videoUrl: q_best
          }
        ],
        videoUnavailable: false,
      },
      startOffset: 0,
    };
    vidParams['autoplayAds'] = false;
    vidParams['env'] = vidEnv[1];
    vidParams['quickSetup'] = vidEnv[1];
    for(const key in p) {
      if(!Object.hasOwn(vidParams, key)) {
        vidParams[key] = p[key];
      };
    };
    return vidParams;
  },
  verify = async (args) => {
    if(mph.getItem('altplayers')) return 'cancel';
    // if(mph.find.mobile && !mph.find.t8 && !mph.find.rt && !mph.find.yp) {
    //   while(args === false) {
    //     await new Promise(resolve => requestAnimationFrame(resolve))
    //   };
    //   return args;
    // };
    while(args === false || args === null) {
      await new Promise(resolve => requestAnimationFrame(resolve))
    };
    return args;
  };
if(mph.getItem('altplayers')) {
  if(win.Plyr) {
    altplayer()
  } else {
    progressUpdate('[MagicPH] ERROR: Unable to create new Plyr (reload webpage)',5000);
  };
} else {
  if(mph.find.mobile) {
    vidFrame.classList.add('mph_mobile');
  };
  if(mph.find.tz) {
    // qs('.mgp_container').classList.add('rm');
    vidFrame.classList.add('rm');
    // qs('#fullsContainer').classList.add('rm');
  } else if(mph.find.t8) {
    if(qs('#playerContainerWrapper')) qs('#playerContainerWrapper').classList.add('rm');
    if(qs('#videoWrapper')) qs('#videoWrapper').classList.add('rm');
  } else if(mph.find.rt) {
    qs('#redtube-player').classList.add('rm');
    if(qs('.js_player_seek_trigger')) {
      for(let i of qsA('.js_player_seek_trigger')) {
        i.onclick = (e) => {
          mph.halt(e);
          phplayer.seek(i.dataset.seekTo, true);
        }
      };
    };
  } else if(mph.find.yp) {
    if(mph.find.mobile) {
      qs('.mgp_container').classList.add('rm');
      vidFrame.setAttribute('style', 'position: absolute;top: 0;bottom: 0;left: 0;right: 0;');
    } else {
      qs('#videoWrapper').classList.add('rm');
    };
  } else if(mph.find.ph) {
    if(qs('#player')) {
      qs('#player').classList.add('bigp');
    };
  };
  // else {
  //   qs('.mgp_container').parentElement.parentElement.classList.add('rm');
  // };
  if(!mph.find.ph) {
    if(!mph.find.tz) {
      win.MGP.createPlayer('playerframe',customPlayer(vid));
      phplayer = win.MGP.players['playerframe'];
      win.jumpToAction = (e) => {phplayer.seek(e, true)};
      log('New Player:',phplayer.settings());
      qs('.mgp_actionTagsScreen').append(tags);
    }
  };
};
// phplayer.play();
mph.info('Loading player...');
let playerready = await verify(phplayer.isReady() ?? phplayer.isPlaying());
// let playerready = await verify(phplayer.isReady() ?? phplayer.isPlaying());
if(typeof playerready === 'string') { return };
// phplayer.pause();
if(mph.getItem('autojump') && mph.currentSite.jlMain && qs(mph.currentSite.jlMain)) {
  let jlMain = qs(mph.currentSite.jlMain);
  mph.info('Attempting to jump...');
  let blacklist = mph.getItem('blacklist').toLocaleString(),
  filter = jlMain.children[0].innerText.trim().includes(blacklist);
  if(!filter) {
    mph.find.mobile ? qs(mph.currentSite.jl).dispatchEvent(new Event('mouseup')) : qs(mph.currentSite.jl).click();
  } else {
    for(let jlist of qsA(mph.currentSite.jc)) {
      let sortFilter = jlist.children[0].innerText.trim().includes(blacklist);
      if(sortFilter) continue;
      mph.find.mobile ? jlist.dispatchEvent(new Event('mouseup')) : jlist.click();
      break;
    };
  };
  mph.info('Jumped!');
} else {
  mph.info('Attempting to skip...');
  phplayer.seek(seektime);
  mph.info('Skipped!');
};
phplayer.play();
if(mph.find.mobile) {
  qs('div.mgp_controls > div.mgp_qualitiesMenu') ? tablet() : mobile();
} else {
  desktop();
};

} catch(e) {mph.err(e)}
};
function desktop() {
  mph.info('Detected desktop...');
  dContainer.innerHTML = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = 'Video Quality(s)';
  mph.query('div.mgp_contextMenu > div.mgp_content').then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    qs('.mgp_desktop').append(dContainer);
    mph.ael(vidQuality,'click', () => {
      qs('.mgp_contextMenu').classList.add('mgp_hidden');
      dContainer.classList.add('mgp_active');
    });
    mph.ael(qs('.mgp_hideMenu'),'click', () => {
      dContainer.classList.remove('mgp_active');
    });
    urlFN();
  });
};
function tablet() {
  mph.info('Detected tablet...');
  let c = dContainer;
  c.innerHTML = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="50" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="50" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="50" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="50" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="50" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="50" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="50" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = 'Video Quality(s)';
  mph.query('.mgp_controls').then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    body.append(c);
    mph.ael(vidQuality,'click', () => {
      qs('.mgp_contextMenu').classList.add('mgp_hidden');
      dContainer.classList.add('mgp_active');
    });
    mph.ael(qs('.mgp_hideMenu'),'click', () => {
      dContainer.classList.remove('mgp_active');
    });
    urlFN();
  });
};
function mobile() {
  mph.info('Detected mobile...');
  let c = mobileContainer;
  c.innerHTML = `<li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="10" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="10" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="10" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="10" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="10" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="10" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="10" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li>`;
  vidQuality.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill='none' stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg><span>Video</span><div class="mgp_value">Quality(s) </div>`;
  vidQuality.classList.add('mgp_selector');
  mph.query('ul.mgp_switches').then((vidFrame) => {
    let om = qs('.mgp_optionsMenu');
    vidFrame.prepend(vidQuality);
    qs('.mgp_subPage > .mgp_content').append(mobileContainer);
    mph.ael(qs('.mgp_options > .mgp_optionsBtn'),'click', () => {
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
      c.style.display = 'none';
      om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
    });
    mph.ael(vidQuality,'click', (e) => {
      mph.halt(e);
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Video Quality(s)';
      c.style.display = 'block';
      if(!om.classList.contains('mgp_level2')) {
        om.classList.add('mgp_level2');
      };
      if(!om.classList.contains('mgp_visible')) {
        om.classList.add('mgp_visible');
      };
    });
    mph.ael(qs('.mgp_subPage > .mgp_header'),'click', () => {
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
      c.style.display = 'none';
      om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
    });
    urlFN();
  });
};
function urlFN() {
  for(let u of qsA('.mphURL')) {
    mph.ael(u.nextElementSibling,'click', () => {
      if(u.value === q_err) { return };
      navigator.clipboard.writeText(u.value).then(() => log(u.value),mph.err);
      u.style.color = '#f90';
      mph.delay(2000).then(() => u.style.color = '#ccc');
    });
    mph.ael(u.nextElementSibling.nextElementSibling,'click', (e) => {
      mph.halt(e);
      if(u.value === q_err) { return };
      DownloadVideo(u.value,vidTitle);
    });
  };
};
async function DownloadVideo(url,title = 'MagicPH') {
  try {
    mph.info('Attempting to download...');
    let invalid_chars = {'\\': '＼', '\/': '／', '\|': '｜', '<': '＜', '>': '＞', ':': '：', '*': '＊', '?': '？', '"': '＂', '🔞': '', '#': ''},
    content = '',
    og_title = doc.title,
    response = await mph.fetchURL(url,'GET','basic'),
    reader = response.body.getReader(),
    contentLength = +response.headers.get('Content-Length'),
    receivedLength = 0,
    chunks = [];
    content = title.replace(/[\\\/\|<>\*\?:#"]/g, v => invalid_chars[v]);
    mph.info('Downloading...');
    if(win.opener != null) {
      phplayer.mute();
      phplayer.pause();
      win.MGP.destroyPlayer([playerID]);
    };
    // eslint-disable-next-line no-constant-condition
    while(true) {
      const {done, value} = await reader.read();
      if(done) {
        break;
      };
      receivedLength += value.length;
      chunks.push(value);
      let percentComplete = (receivedLength / contentLength) * 100;
      doc.title = `${percentComplete.toFixed(2)}% - ${og_title}`;
      progressUpdate(`(Fetch API) Downloading... ${percentComplete.toFixed(2)}%`);
    };
    let Uint8Chunks = new Uint8Array(receivedLength), position = 0;
    for (let chunk of chunks) {
      Uint8Chunks.set(chunk, position);
      position += chunk.length;
    };
    let result = new Blob([Uint8Chunks], {type: 'video/mp4'});
    dlBtn.href = win.URL.createObjectURL(result);
    dlBtn.download = `${content}.mp4`;
    dlBtn.click();
    win.URL.revokeObjectURL(dlBtn.href);
    doc.title = og_title;
    progressUpdate('[MagicPH] Download Complete!',5000);
    mph.delay(5000).then(() => {
      if(win.opener != null) {
        // phplayer.unmute();
        win.close();
      };
    });
    return mph.info('Downloaded!');
  } catch (e) {
    mph.err(e);
  }
};
preSetup();
