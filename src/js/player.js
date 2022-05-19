'use strict';

import mph from './api.js';
import qs from "./querySelector.js";
import Plyr from '../web_accessible_resources/plyr.min.js';

async function verify(args) {
  while (args) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return args;
};
//media_5
let seektime = localStorage.getItem("seektime"),
pid = window.VIDEO_SHOW.videoId,
phplayer = window.MGP.players[pid],
//fv = window[`flashvars_${window.VIDEO_SHOW.video_id}`],
// phmedia = fv.mediaDefinitions,
mediaFiles = [window.media_0, window.media_1, window.media_2, window.media_3, window.media_4, window.media_5, window.media_6, window.media_7, window.media_8, window.media_9, window.media_10],
vidQuality = mph.create("div","mgp_download"),
dContainer = mph.create("div","mgp_downloadInfo"),
dl = mph.create("h1","mph_progress"),
dScript = mph.create("script",null,"text/javascript"),
q_err = "[Error] Not Found",
dlBtn = mph.create("a","mph_Downloader"),
q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,getMediaUrl;
vidQuality.innerText = 'Video Quality(s)';

mediaFiles.forEach((file) => {
  if(file) {
    if(file.includes("/video/get_media?s=")) {
      getMediaUrl = file;
    }
  };
});

async function fetchLinks() {
  let qURL = await mph.getURL(getMediaUrl).then(r => {
    r.forEach((item) => {
      let quality = item.quality,
      link = item.videoUrl;
      (quality.includes("240")) ? (q_240 = link) :
      (quality.includes("480")) ? (q_480 = link) :
      (quality.includes("720")) ? (q_720 = link) :
      (quality.includes("1080")) ? (q_1080 = link, mph.setItem("mgp_player", '{"quality":1080}')) :
      (quality.includes("1440")) ? (q_1440 = link, mph.setItem("mgp_player", '{"quality":1440}')) :
      (quality.includes("2160")) ? (q_2160 = link, mph.setItem("mgp_player", '{"quality":2160}')) : false;
      q_best = link;
    });
    return [q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best];
  });
  return qURL;
};
async function DownloadVideo(url,title = "MagicPH") {
  try {
    mph.info("Attempting to download...");
    let response = await fetch(url),
    reader = response.body.getReader(),
    contentLength = +response.headers.get('Content-Length'),
    receivedLength = 0,
    chunks = [];
    mph.info("Downloading...");
    document.body.appendChild(dl);
    // eslint-disable-next-line no-constant-condition
    while(true) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }
      receivedLength += value.length;
      chunks.push(value);
      dl.innerText = `[MagicPH Downloader] Received Chunks: ${receivedLength} of ${contentLength}`;
      // mph.info(`Received ${receivedLength} of ${contentLength}`);
    }
    let Uint8Chunks = new Uint8Array(receivedLength), position = 0;
    for (let chunk of chunks) {
      Uint8Chunks.set(chunk, position);
      position += chunk.length;
    }
    let result = new Blob([Uint8Chunks], {type: 'video/mp4'});
    dlBtn.href = window.URL.createObjectURL(result);
    dlBtn.download = `${title}.mp4`;
    dlBtn.click();
    window.URL.revokeObjectURL(dlBtn.href);
    //qs(".wrapper").classList.toggle("blur");
    if (dl) {
      dl.remove();
    };
    return mph.info("Downloaded!");
  } catch (e) {
    mph.err(e);
  }
};

function main() {
  let layout = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div>
<ul>
<li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlAreaBest')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea1')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea2')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea3')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea4')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea5')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea6')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
</ul>`;
dContainer.innerHTML = layout;
dScript.innerHTML = `function copyUrl(id) {
  try {
    navigator.clipboard.writeText(document.getElementById(id).value);
    document.getElementById(id).style.color = '#f90';
  } catch (err) {
    console.log("[MagicPH] " + err);
    document.getElementById(id).style.color = 'rgb(221, 67, 67)';
    document.getElementById(id).select();
    document.execCommand("Copy");
  }
}`;
let altplayer = () => {
  let options = {
    enabled: true,
    title: qs("h1.title > span").innerText,
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
      'fullscreen',
    ],
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
  },
  pVideo = mph.create("div","altframe bigp");
  pVideo.id = "playerframe";
  pVideo.innerHTML = `<video id="altplayer" class="biga" controls data-poster="${qs("img#videoElementPoster").src}"></video>`
  mph.queryAll("div.video-wrapper")[0].prepend(pVideo);
  new Plyr(document.getElementById("altplayer"), options);
  mph.ael(document.getElementById("altplayer"),"ready", event => {
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
    mph.query('head > script[src*="cdn1d-static-shared.phncdn.com/html5player/videoPlayer/es6player/6.1.6/desktop-player-adaptive-hls.min.js"]').then(r => {
      phplayer.mute();
      phplayer.pause();
      mph.inject(`MGP.destroyPlayer(${pid})`);
      // window.MGP.destroyPlayer(pid);
      r.remove();
      qs("v-flag-modal").remove();
    });
    player.on('loadeddata', () => {
      player.currentTime = 4;
      player.play();
      verify(player.currentTime < seektime).then(() => {
        player.currentTime = 4;
        player.play();
        // player.volume = 1;
      });
      qs(".mainPlayerDiv").classList.add("rm");
    });
  });
};
if(localStorage.getItem("altplayers")) {
  altplayer();
} else {
  qs("div.mgp_contextMenu > div.mgp_content").prepend(vidQuality);
  qs(".playerFlvContainer").append(dContainer,dScript);
  mph.ael(vidQuality,"click", () => {
    qs('.mgp_contextMenu').classList.add('mgp_hidden');
    dContainer.classList.add("mgp_active");
  });
  mph.ael(qs(".mgp_hideMenu"),"click", () => {
    dContainer.classList.remove("mgp_active");
  });
  mph.check(phplayer.isReady() ?? phplayer.isPlaying()).then(async () => {
    phplayer.pause();
    mph.delay(1000);
    let jlMain = qs("a.js-triggerJumpCat.alpha");
    if(localStorage.getItem("autojump") && jlMain) {
      mph.info("Attempting to jump...");
      let jumplist = mph.queryAll("a.js-triggerJumpCat"),
      blacklist = localStorage.getItem("blacklist").toLocaleString(),
      filter = jlMain.children[0].innerText.trim().includes(blacklist);
      if(!filter) {
        jlMain.click();
      } else {
        [...jumplist].every((e) => {
          let sortFilter = e.children[0].innerText.trim().includes(blacklist)
          mph.log(![...e.children[0].innerText.trim()].includes(blacklist))
          if(!sortFilter) {
            e.click()
            return false
          } else {
            return true
          }
        });
      };
      mph.info("Jumped!");
    } else {
      mph.info("Attempting to skip...");
      mph.inject(`jumpToAction(${seektime})`);
    };
    phplayer.play();
    mph.info("Skipped!");
  });

};
};

if(window.opener != null) {
  mph.info("Popup");
  fetchLinks().then(async () => {
    await DownloadVideo(q_best,window.VIDEO_SHOW.videoTitleOriginal.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    // main();
  });
} else {
fetchLinks().then(main);
};


// window.media_5 or media_0
// Add "&?mgp_debug=true" in URL to enable debugging.