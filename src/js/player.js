'use strict';
const Plyr = window.Plyr;
import { mph } from './api.js';
import { qs,qsA } from "./querySelector.js";

//xplayer.qualityList.core.options.sources.standard.mp4

const verify = async (args) => {
  while (args) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return args;
},
l = {
  ph: document.location.origin.includes("pornhub"),
  rt: document.location.origin.includes("redtube"),
  t8: document.location.origin.includes("tube8"),
  tz: document.location.origin.includes("thumbzilla"),
  yp: document.location.origin.includes("youporn"),
};

let mediaFiles = [
  self.media_0,
  self.media_1,
  self.media_2,
  self.media_3,
  self.media_4,
  self.media_5,
  self.media_6,
  self.media_7,
  self.media_8,
  self.media_9,
  self.media_10
],
seektime = localStorage.getItem("seektime"),
vs = self.VIDEO_SHOW,
pid = vs.videoId,
phplayer = self.MGP.players[pid],
vidQuality = mph.create("div","mgp_download"),
dContainer = mph.create("div","mgp_downloadInfo"),
dl = mph.create("h1","mph_progress"),
q_err = "[Error] Not Found",
dlBtn = mph.create("a","mph_Downloader"),
q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,getMediaUrl;
vidQuality.innerText = 'Video Quality(s)';

mediaFiles.forEach((file) => {
  if(file) {
    getMediaUrl = file.includes("/video/get_media?s=") ? file : false;
  };
});

if(self.opener != null && l.ph) {
  mph.info("Popup");
  fetchLinks().then(async () => {
    phplayer.mute();
    phplayer.pause();
    await DownloadVideo(q_best,vs.videoTitleOriginal.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
  });
} else {
  fetchLinks().then(main);
};

async function fetchLinks() {
  let qURL = await mph.getURL(getMediaUrl).then(r => {
    r.forEach((item) => {
      if(!item.quality.includes) {
        (item.quality === 240) ? (q_240 = item.videoUrl) :
        (item.quality === 480) ? (q_480 = item.videoUrl) :
        (item.quality === 720) ? (q_720 = item.videoUrl) :
        (item.quality === 1080) ? (q_1080 = item.videoUrl) :
        (item.quality === 1440) ? (q_1440 = item.videoUrl) :
        (item.quality === 2160) ? (q_2160 = item.videoUrl) : q_err;
      } else {
        (item.quality.includes("240")) ? (q_240 = item.videoUrl) :
        (item.quality.includes("480")) ? (q_480 = item.videoUrl) :
        (item.quality.includes("720")) ? (q_720 = item.videoUrl) :
        (item.quality.includes("1080")) ? (q_1080 = item.videoUrl) :
        (item.quality.includes("1440")) ? (q_1440 = item.videoUrl) :
        (item.quality.includes("2160")) ? (q_2160 = item.videoUrl) : q_err;
      };
      q_best = item.videoUrl;
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
      dl.innerText = `[MagicPH] Downloading... ${receivedLength} of ${contentLength}`;
    };
    let Uint8Chunks = new Uint8Array(receivedLength), position = 0;
    for (let chunk of chunks) {
      Uint8Chunks.set(chunk, position);
      position += chunk.length;
    };
    let result = new Blob([Uint8Chunks], {type: 'video/mp4'});
    dlBtn.href = self.URL.createObjectURL(result);
    dlBtn.download = `${title}.mp4`;
    dlBtn.click();
    self.URL.revokeObjectURL(dlBtn.href);
    if (dl) {
      dl.remove();
    };
    return mph.info("Downloaded!");
  } catch (e) {
    mph.err(e);
  }
};

function main() {
  let layout = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul>
<li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
</ul>`;
dContainer.innerHTML = layout;

let altplayer = () => {
  let options = {
    enabled: true,
    title: qs("h1.title > span").innerText,
    disableContextMenu: true,
    controls: ['restart','rewind','play','fast-forward','progress','current-time','duration','mute','volume','settings','download','fullscreen',],
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
  qsA("div.video-wrapper")[0].prepend(pVideo);
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
      mph.inject(`self.MGP.destroyPlayer(${pid})`);
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
  qs(".playerFlvContainer").append(dContainer);
  qsA(".mphURL").forEach((u) => {
    mph.ael(u.nextElementSibling,"click",() => {
      try {
        if (document.body.contains(dl)) {
          return;
        };
        navigator.clipboard.writeText(u.value);
        u.style.color = '#f90';
        mph.delay(2000).then(() => u.style.color = '#fff');
      } catch (error) {
        mph.err(error);
        u.style.color = 'rgb(221, 67, 67)';
        mph.inject(`${u}.select();self.document.execCommand("Copy");`);
      }
    })
  });
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
      let jumplist = qsA("a.js-triggerJumpCat"),
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
      mph.inject(`self.jumpToAction(${seektime})`);
    };
    phplayer.play();
    mph.info("Skipped!");
  });

};
};

// Add "&?mgp_debug=true" in URL to enable debugging.