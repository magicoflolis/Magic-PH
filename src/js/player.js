import mph from './api.js';
import Plyr from '../web_accessible_resources/plyr.min.js';
import qs from "./querySelector.js";
import fetchP from "./fetchPlayer.js";
//dispatchEvent(new MouseEvent('click'));

if(window.opener != null) {
  mph.log("Popup");
  mph.query(".wrapper").then(() => {
    fetchP().then((e) => {
      mph.log(e);
      let vframe = mph.create("vframe","iframe");
      vframe.src = e
      $(".wrapper").html(vframe);
    })
  })
};

const video = $(".mainPlayerDiv").attr('data-video-id'),
seektime = localStorage.getItem("seektime"),
pid = `playerDiv_${video}`,
flashvarsId = `flashvars_${video}`,
phplayer = window.MGP.players[pid],
phmedia = window[flashvarsId].mediaDefinitions,
button = `<div class="mgp_download">Video Quality(s)</div>`,
q_err = "[Error] Not Found";
mph.query(".video-wrapper").then(async() => {
let { q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,getMediaUrl } = q_err;
for(let i = 0; i < phmedia.length; i++) {
  let media = phmedia[i];
  media.format === "mp4" ? (getMediaUrl = media.videoUrl) : false;
};
await mph.getURL(getMediaUrl).then(r => {
  for (let i = 0; i < r.length; i++) {
    let vid = r[i],
    quality = vid.quality,
    link = vid.videoUrl;
    (quality === "240") ? (q_240 = link) :
    (quality === "480") ? (q_480 = link) :
    (quality === "720") ? (q_720 = link) :
    (quality === "1080") ? (q_1080 = link, mph.setItem("mgp_player", '{"quality":1080}')) :
    (quality === "1440") ? (q_1440 = link, mph.setItem("mgp_player", '{"quality":1440}')) :
    (quality === "2160") ? (q_2160 = link, mph.setItem("mgp_player", '{"quality":2160}')) : false;
    q_best = link ?? q_2160 ?? q_1440 ?? q_1080 ?? q_720;
  };
});
let layout = `<div class="mgp_downloadInfo">
<div class="mgp_copyCloseDiv">
  <div class="mgp_title">Video Quality(s)</div>
  <div class="mgp_hideMenu" title="Close">🗙</div>
</div>
<ul>
<li><span>Best:</span><input value="${q_best}" type="url" size="70" id="urlAreaBest" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlAreaBest')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea1')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea2')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea3')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea4')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea5')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
<li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" readonly></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea6')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
</ul>
</div>
<script>
function copyUrl(id) {
  let urlbox = document.getElementById(id);
  try {
    navigator.clipboard.writeText(urlbox.value);
    urlbox.style.color = '#f90';
  } catch (err) {
    urlbox.style.color = 'rgb(221, 67, 67)';
    console.log("[MagicPH] " + err);
    urlbox.select();
    document.execCommand("Copy");
  }
}
</script>`;
$(button).prependTo("div.mgp_contextMenu > div.mgp_content");
$(layout).appendTo(".playerFlvContainer");
mph.ael(qs(".mgp_download"),"click", () =>{
  return $('.mgp_contextMenu').addClass('mgp_hidden'),$('.mgp_downloadInfo').addClass('mgp_active');
});
mph.ael(qs(".mgp_hideMenu"),"click", () =>{
  return $('.mgp_downloadInfo').removeClass('mgp_active');
});
let altplayer = () => {
  let options = {
    enabled: true,
    title: $("h1.title > span").text(),
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
      default: 576,
      options: [2160, 1440, 1080, 720, 576, 480, 360, 240]
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
  pframe = `<div id="playerframe" class="altframe bigp">
  <video id="altplayer" class="biga" controls data-poster="${$("img#videoElementPoster").attr("src")}"></video>
  </div>`;
  $(pframe).prependTo($("div.video-wrapper").eq(0));
  new Plyr(document.getElementById("altplayer"), options);
  mph.ael(document.getElementById("altplayer"),"ready", event => {
    const player = event.detail.plyr;
    player.source = {
      type: 'video',
      sources: [
        {
          src: q_best,
          type: 'video/mp4',
          size: 576,
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
      window.MGP.destroyPlayer(pid);
      r.remove();
      $(".mainPlayerDiv").empty().remove();
      $("v-flag-modal").remove();
    });
    player.on('loadeddata', () => {
      player.currentTime = 4;
      player.play();
      mph.check(player.currentTime < seektime).then(() => {
        player.currentTime = 4;
        player.play();
        // player.volume = 1;
      })
    });
  });
};
if(localStorage.getItem("altplayers")) {
  altplayer();
} else {
  mph.check(phplayer.isReady() ?? phplayer.isPlaying()).then(async () => {
    phplayer.pause();
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Attempting to skip...");
    window.jumpToAction(seektime);
    if(localStorage.getItem("autojump")) {
      console.log("Attempting to jump...");
      let jumplist = mph.queryAll("a.js-triggerJumpCat.alpha");
      for (let i = 0; i < jumplist.length; i++) {
        jumplist[i].click();
      };
      console.log("Jumped!");
    }
    phplayer.play();
    console.log("Skipped!");
  })
};
});


// export default ph_player
// window.media_5 or media_0
// Add "&?mgp_debug=true" in URL to enable debugging.