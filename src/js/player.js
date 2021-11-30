import Plyr from '../web_accessible_resources/plyr.js';
// window.media_5 or media_0
// MGP.destroyPlayer()
let quality_error = "[Error] Not Found",
quality_240p = quality_error,
quality_480p = quality_error,
quality_720p = quality_error,
quality_1080p = quality_error,
quality_1440p = quality_error,
quality_2160p = quality_error,
quality_best = quality_error,
ph_player = async () => {
// let vurl = window.location.toString();
// document.location.search != `${document.location.search}&t=3` ? (window.location = vurl.replace(document.location.search, `${document.location.search}&t=3`)) : false
let flashvarsId = `flashvars_${WIDGET_RATINGS_LIKE_FAV.itemId}`,
  flashvarsObject = eval(flashvarsId),
  getMediaUrl = quality_error;
  $.each(flashvarsObject.mediaDefinitions, function (i, item) {
    (item.format == 'mp4') ? (getMediaUrl = item.videoUrl) : false;
  })
  await getVideoUrl(getMediaUrl)
  let button = `<div class="mgp_download">Video Quality(s)</div>`,
  layout = `
  <div class="mgp_downloadInfo">
    <div class="mgp_copyCloseDiv">
      <div class="mgp_title">Video Quality(s)</div>
      <div class="mgp_hideMenu" title="Close">×</div>
    </div>
    <ul>
    <li><span>Best:</span><input type="url" size="70" id="urlAreaBest" readonly value="${quality_best}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlAreaBest')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>240p:</span><input type="url" size="70" id="urlArea1" readonly value="${quality_240p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea1')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>480p:</span><input type="url" size="70" id="urlArea2" readonly value="${quality_480p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea2')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>720p:</span><input type="url" size="70" id="urlArea3" readonly value="${quality_720p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea3')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>1080p:</span><input type="url" size="70" id="urlArea4" readonly value="${quality_1080p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea4')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>1440p:</span><input type="url" size="70" id="urlArea5" readonly value="${quality_1440p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea5')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
    <li><span>2160p:</span><input type="url" size="70" id="urlArea6" readonly value="${quality_2160p}"></input><a class="suggestToggleAlt" onclick="copyUrl('urlArea6')" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>
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
  $(button).prependTo("div.mgp_contextMenu > div.mgp_content")
  $(layout).appendTo(".playerFlvContainer")
  document.querySelector(".mgp_download").addEventListener('click', async () => {
    return $('.mgp_contextMenu').addClass('mgp_hidden'),$('.mgp_downloadInfo').addClass('mgp_active');
  })
  document.querySelector(".mgp_hideMenu").addEventListener('click', async () => {
    return $('.mgp_downloadInfo').removeClass('mgp_active');
  })

function getVideoUrl(link) {
  return new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: link,
      success: (data, status) => {
        if (status == "success") {
          $.each(data, function (i, item) {
            // let m = console.log(`[MagicPH] ${item.videoUrl}`);
            (item.quality == '240') ? (quality_240p = item.videoUrl, quality_best = item.videoUrl) :
            (item.quality == '480') ? (quality_480p = item.videoUrl, quality_best = item.videoUrl) :
            (item.quality == '720') ? (quality_720p = item.videoUrl, quality_best = item.videoUrl) :
            (item.quality == '1080') ? (quality_1080p = item.videoUrl, quality_best = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":1080}')) : 
            (item.quality == '1440') ? (quality_1440p = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":1440}')) : 
            (item.quality == '2160') ? (quality_2160p = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":2160}')) : false
          });
          resolve("We loaded")
        }
    }
    })
  });
};
let altplayer = () => {
  let options = {
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
    seekTime: 3,
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
  <video id="altplayer" class="biga" controls></video>
  </div>`;
  $(pframe).prependTo($("div.video-wrapper").eq(0));
  new Plyr(document.getElementById("altplayer"), options);
  document.getElementById("altplayer").addEventListener('ready', event => {
    const player = event.detail.plyr;
    player.source = {
      type: 'video',
      sources: [
        {
          src: document.querySelector("#urlAreaBest").value,
          type: 'video/mp4',
          size: 576,
        },
        {
          src: document.querySelector("#urlArea1").value,
          type: 'video/mp4',
          size: 240,
        },
        {
          src: document.querySelector("#urlArea2").value,
          type: 'video/mp4',
          size: 480,
        },
        {
          src: document.querySelector("#urlArea3").value,
          type: 'video/mp4',
          size: 720,
        },
        {
          src: document.querySelector("#urlArea4").value,
          type: 'video/mp4',
          size: 1080,
        },
        {
          src: document.querySelector("#urlArea5").value,
          type: 'video/mp4',
          size: 1440,
        },
        {
          src: document.querySelector("#urlArea6").value,
          type: 'video/mp4',
          size: 2160,
        },
      ],
      poster: document.querySelector('img#videoElementPoster').src,
      previewThumbnails: {
        src: document.querySelector('img.mgp_image').src,
      },
    };
    MGP.destroyPlayer(MGP.getPlayerIds());
    $(".mainPlayerDiv").remove();
    $("video-element").remove();
    // player.volume = 0;
    player.on('loadeddata', () => {
      player.currentTime = 3;
      player.play();
      // player.volume = 1;
    })
    // console.log(player);
    // console.log(player.currentTime);
  });
}

if(document.readyState === "complete") {
  $(".video-wrapper > div.mainPlayerDiv.ap").length ? altplayer() : false
}

};
export { ph_player }