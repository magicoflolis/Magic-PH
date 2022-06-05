'use strict';

import { mph } from './api.js';
import { qs,qsA } from "./querySelector.js";

(async () => {
  await mph.query(".mgp_container");
  const win = self ?? window,
  doc = win.document,
  body = document.documentElement.body,
  verify = async (args) => {
    while (args) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return args;
  };
  let mediaFiles,vs,phplayer,q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,linkType,vidTitle,vidThumb,
  isMobile = typeof screen.orientation === 'undefined',
  seektime = localStorage.getItem("seektime"),
  vidQuality = mph.create("div","mgp_download"),
  dContainer = mph.create("div","mgp_downloadInfo"),
  mobileContainer = mph.create("ul","mgp_downloadInfo mgp_optionsList"),
  dlContainer = mph.create("div","mph_progressContainer"),
  dl = mph.create("h1","mph_progress"),
  q_err = "[Error] Not Found",
  dlBtn = mph.create("a","mph_Downloader"),
  dCopy = `<a class="suggestToggleAlt" title="Copy">
  ${mph.find.rt ? `<span>C</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="copy"><path d="M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z"></path></g></svg></a>'}`,
  dDownload = `<a class="suggestToggleAlt" title="Download">
  ${mph.find.rt ? `<span>D</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></g></svg></a>'}`;

  dlContainer.append(dl);
  mph.info(`Site: ${doc.location.origin}`);
  // mph.setItem("mgp_player",`{"autoplayAds": "false"}`);
  phplayer = win.MGP.players[win.MGP.getPlayerIds()];
  vidTitle = phplayer.settings().mainRoll.title;
  vidThumb = phplayer.settings().mainRoll.poster;
  if(mph.find.ph) {
    try {
      if(!isMobile) {
        mediaFiles = [win.media_0,win.media_1,win.media_2,win.media_3,win.media_4,win.media_5,win.media_6,win.media_7,win.media_8,win.media_9,win.media_10];
      } else {
        mediaFiles = win[`flashvars_${win.MGP.players[win.MGP.getPlayerIds()].settings().playerId.slice(10)}`].mediaDefinitions;
      };
    } catch(e) {
      mph.err(e)
    };
  }

  if(mph.find.rt) {
    vs = win.page_params.video_player_setup;
    mediaFiles = vs[win.MGP.getPlayerIds()].playervars.mediaDefinitions;
  };

  if(mph.find.tz) {
    mediaFiles = win.video_vars.mediaDefinitions;
  };

  if(mph.find.t8) {
    mediaFiles = win.flashvars.mediaDefinition;
  };

  if(mph.find.yp) {
    linkType = `${doc.location.origin}/api/video/media_definitions/${win.page_params.videoId}/`;
  } else {
    try {
    mediaFiles.forEach((file) => {
      //qs(".mgp_desktop",mph.html)
      if(mph.find.ph && !isMobile) {
        if(file) {
          if(file.includes("/video/get_media?s=")) {
            linkType = file;
          };
        };
      } else {
        if(file.format === "mp4") {
          linkType = file.videoUrl;
        };
      }
    });
  } catch (e) {
    mph.err(e)
  }
  };

  if(!linkType) {
    mph.err("Unable to resolve video quality(s)");
    dl.innerText = "[MagicPH] ERROR: Unable to resolve video quality(s)";
    body.style = "height: fit-content !important;";
    body.prepend(dlContainer);
    mph.delay(5000).then(() => {
      if (dlContainer) {
        dlContainer.remove();
        body.style = "";
      };
    });
  };

  let links = await mph.fetchURL(linkType);
  links.forEach((item) => {
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
    q_best = q_2160 ?? q_1440 ?? q_1080 ?? q_720 ?? q_480 ?? q_240 ?? item.videoUrl;
  });


  if(win.opener != null) {
    mph.info("Popup");
    phplayer.mute();
    phplayer.pause();
    await DownloadVideo(q_best,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
  };

if(mph.find.ph) {
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
    },
    vidFrame = mph.create("div","altframe bigp"),
    vidPlayer = mph.create("video","biga");
    vidFrame.id = "playerframe";
    vidPlayer.id = "altplayer";
    vidPlayer.controls = true;
    vidPlayer.setAttribute("data-poster",vidThumb);
    vidFrame.prepend(vidPlayer);
    qsA("div.video-wrapper")[0].prepend(vidFrame);
    new win.Plyr(vidPlayer, options);
    mph.ael(vidPlayer,"ready", event => {
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
      mph.fe("head > script",(v) => {
        if(v.src) {
          if(v.src.includes("desktop-player-adaptive-hls.min.js")) {
            phplayer.mute();
            phplayer.pause();
            mph.inject(`window.MGP.destroyPlayer(${vs.videoId})`)
            v.remove();
            qs(".mgp_container").parentElement.parentElement.classList.add("rm");
          }
        };
      });
      player.on('download', () => {
        DownloadVideo(player.media.src,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'))
      });
      player.on('loadeddata', () => {
        if(player.currentTime === 0) {
          mph.info("Attempting to skip...");
          player.currentTime = 4;
          player.play();
          mph.info("Skipped!");
        };
      });
    });
  };
  if(!mph.getItem("altplayers")) {
    verify(phplayer.isReady() ?? phplayer.isPlaying()).then(() => {
      phplayer.pause();
      mph.delay(1000);
      let jlMain = qs("a.js-triggerJumpCat.alpha");
      if(mph.getItem("autojump") && jlMain) {
        mph.info("Attempting to jump...");
        let blacklist = mph.getItem("blacklist").toLocaleString(),
        filter = jlMain.children[0].innerText.trim().includes(blacklist);
        if(!filter) {
          jlMain.click();
        } else {
          mph.qa("a.js-triggerJumpCat").then((jlist) => {
            [...jlist].every((e) => {
              let sortFilter = e.children[0].innerText.trim().includes(blacklist)
              mph.log(![...e.children[0].innerText.trim()].includes(blacklist))
              if(!sortFilter) {
                e.click()
                return false
              } else {
                return true
              }
            });
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

  } else {
    altplayer();
  };
} else {
  if(!mph.getItem("altplayers")) {
    verify(phplayer.isReady() && phplayer.isPlaying()).then(() => {
      mph.delay(1000).then(() => {
        mph.info("Attempting to skip...");
        mph.inject(phplayer.seek(seektime));
        mph.info("Skipped!");
      });
    });
  };
}



if(isMobile) {
  if(mph.find.yp) {
    tablet();
  } else {
    qs("div.mgp_controls > div.mgp_qualitiesMenu") ? tablet() : mobile();
  }
} else {
  desktop();
};


function desktop() {
  mph.info("Detected desktop...");
  dContainer.innerHTML = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = 'Video Quality(s)';
  mph.query("div.mgp_contextMenu > div.mgp_content").then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    qs(".mgp_desktop").append(dContainer);
    mph.ael(vidQuality,"click", () => {
      qs('.mgp_contextMenu').classList.add('mgp_hidden');
      dContainer.classList.add("mgp_active");
    });
    mph.ael(qs(".mgp_hideMenu"),"click", () => {
      dContainer.classList.remove("mgp_active");
    });
    urlFN();
  });
};

function tablet() {
  mph.info("Detected tablet...");
  let c = dContainer;
  c.innerHTML = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="50" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="50" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="50" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="50" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="50" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="50" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="50" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = "Video Quality(s)";
  mph.query(".mgp_controls").then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    body.append(c);
    mph.ael(vidQuality,"mouseup", () => {
      c.classList.add("mgp_active");
    });
    mph.ael(vidQuality,"touchstart", () => {
      c.classList.add("mgp_active");
    });
    mph.ael(vidQuality,"touchend", () => {
      c.classList.add("mgp_active");
    });
    mph.ael(qs(".mgp_hideMenu"),"mouseup", () => {
      c.classList.remove("mgp_active");
    });
    mph.ael(qs(".mgp_hideMenu"),"touchstart", () => {
      c.classList.remove("mgp_active");
    });
    mph.ael(qs(".mgp_hideMenu"),"touchend", () => {
      c.classList.remove("mgp_active");
    });
    urlFN();
  });
};

function mobile() {
  mph.info("Detected mobile...");
  let c = mobileContainer;
  c.innerHTML = `<li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="10" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="10" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="10" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="10" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="10" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="10" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="10" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li>`;
 vidQuality.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg><span>Video</span><div class="mgp_value">Quality(s) </div>`;
 vidQuality.classList.add('mgp_selector');
mph.query("ul.mgp_switches").then((vidFrame) => {
  let om = qs(".mgp_optionsMenu");
  vidFrame.prepend(vidQuality);
  qs(".mgp_subPage > .mgp_content").append(mobileContainer);
  mph.ael(vidQuality,"mouseup", (e) => {
    mph.halt(e);
    qs(".mgp_subPage > .mgp_header").innerHTML = "Video Quality(s)";
    c.style.display = "block";
    if(!om.classList.contains("mgp_level2")) {
      om.classList.add('mgp_level2');
    };
    if(!om.classList.contains("mgp_visible")) {
      om.classList.add('mgp_visible');
    };
  });
  mph.ael(vidQuality,"touchstart", (e) => {
    mph.halt(e);
    qs(".mgp_subPage > .mgp_header").innerHTML = "Video Quality(s)";
    c.style.display = "block";
    if(!om.classList.contains("mgp_level2")) {
      om.classList.add('mgp_level2');
    };
    if(!om.classList.contains("mgp_visible")) {
      om.classList.add('mgp_visible');
    };
  });
  mph.ael(vidQuality,"touchend", (e) => {
    mph.halt(e);
    qs(".mgp_subPage > .mgp_header").innerHTML = "Video Quality(s)";
    c.style.display = "block";
    if(!om.classList.contains("mgp_level2")) {
      om.classList.add('mgp_level2');
    };
    if(!om.classList.contains("mgp_visible")) {
      om.classList.add('mgp_visible');
    };
  });
  mph.ael(qs(".mgp_options > .mgp_optionsBtn"),"mouseup", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    c.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_options > .mgp_optionsBtn"),"touchend", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    c.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_subPage > .mgp_header"),"mouseup", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    c.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_subPage > .mgp_header"),"touchend", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    c.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  urlFN();
});
};

function urlFN() {
  mph.fe(".mphURL",(u) => {
    mph.ael(u.nextElementSibling,"mouseup",async() => {
      if(u.value === q_err) {
        return;
      };
      navigator.clipboard.writeText(u.value);
      u.style.color = '#f90';
      mph.delay(2000).then(() => u.style.color = '#ccc');
    });
    mph.ael(u.nextElementSibling,"touchstart",async() => {
      if(u.value === q_err) {
        return;
      };
      navigator.clipboard.writeText(u.value);
      u.style.color = '#f90';
      mph.delay(2000).then(() => u.style.color = '#ccc');
    });
    mph.ael(u.nextElementSibling,"touchend",async() => {
      if(u.value === q_err) {
        return;
      };
      navigator.clipboard.writeText(u.value);
      u.style.color = '#f90';
      mph.delay(2000).then(() => u.style.color = '#ccc');
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"mouseup",async() => {
      if(u.value === q_err) {
        return;
      };
      if (body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"touchstart",async() => {
      if(u.value === q_err) {
        return;
      };
      if (body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"touchend",async() => {
      if(u.value === q_err) {
        return;
      };
      if (body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
    mph.ael(u.nextElementSibling,"click",async() => {
      if(u.value === q_err) {
        return;
      };
      navigator.clipboard.writeText(u.value);
      u.style.color = '#f90';
      mph.delay(2000).then(() => u.style.color = '#ccc');
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"click",async() => {
      if(u.value === q_err) {
        return;
      };
      if (body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
  })
};

async function DownloadVideo(url,title = "MagicPH") {
  try {
    await mph.query("body");
    mph.info("Attempting to download...");
    let response = await fetch(url),
    reader = response.body.getReader(),
    contentLength = +response.headers.get('Content-Length'),
    receivedLength = 0,
    chunks = [];
    mph.info("Downloading...");
    if (!dlContainer.contains(dl)) {
      dlContainer.append(dl);
    };
    document.body.style = "height: fit-content !important;";
    document.body.prepend(dlContainer);
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
    dlBtn.href = win.URL.createObjectURL(result);
    dlBtn.download = `${title}.mp4`;
    dlBtn.click();
    win.URL.revokeObjectURL(dlBtn.href);
    if (dlContainer) {
      dl.innerText = "[MagicPH] Download Complete!";
      mph.delay(5000).then(() => {
        document.body.style = "";
        dlContainer.remove();
        if(win.opener != null) {
          phplayer.unmute();
          win.close();
        };
      });
    };
    return mph.info("Downloaded!");
  } catch (e) {
    mph.err(e);
  }
};



})();