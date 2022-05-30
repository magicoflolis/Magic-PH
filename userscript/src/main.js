'use strict';

let debug = true;

const mph = {
  ael(elm = document, event, callback){
    return elm.addEventListener(event, callback);
  },
  /** Can create various elements */
  create(element,cname,type) {
    let el = document.createElement(element);
    type ? (el.type = type) : false;
    cname ? (el.className = cname) : false;
    return el;
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  err(...error) {
    console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  getURL(url, responseType = 'json', retry = 3) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        responseType,
        onerror: e => {
          (retry === 0) ? reject(e) : (
            this.err('Network error, retry.'),
            setTimeout(() => resolve(this.getURL(url, responseType, retry - 1)),1000)
          );
        },
        onload: ({ status, response }) => {
          (status === 200) ? resolve(response) :
          (retry === 0) ? reject(`${status} ${url}`) : (
            this.log(status, url),
            setTimeout(() => resolve(this.getURL(url, responseType, retry - 1)),500)
          );
        },
      });
    })
  },
  loadCSS(css, name = "common") {
    let s = this.create("style");
    s.id = `mph-${name}`;
    s.innerHTML = css;
    return (!document.head.contains(s)) ? document.head.appendChild(s) : false;
  },
  info(...message){
    if(!debug) {return;}
    console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  inject(src) {
    let script,
    doc = document;
    script = this.create("script",null,"text/javascript");
    script.innerHTML = src;
    (doc.head || doc.documentElement || doc).appendChild(script);
    if (script) {
      script.remove();
    };
  },
  log(...message){
    if(!debug) {return;}
    console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
  },
  async query(selector, root = document) {
    while ( root.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return root.querySelector(selector);
  },
},
qsA = (element, selector = document) => {
  return selector.querySelectorAll(element);
},
qs = (element, selector = document) => {
  return selector.querySelector(element);
};

(async () => {
  // eslint-disable-next-line no-undef
  mph.loadCSS(mphCSS,"core");
  let mediaFiles,vs,phplayer,q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,linkType,vidTitle,
  l = {
    ph: document.location.origin.includes("pornhub"),
    rt: document.location.origin.includes("redtube"),
    t8: document.location.origin.includes("tube8"),
    tz: document.location.origin.includes("thumbzilla"),
    yp: document.location.origin.includes("youporn"),
  },
  vidQuality = mph.create("div","mgp_download"),
  dContainer = mph.create("div","mgp_downloadInfo"),
  mobileContainer = mph.create("ul","mgp_downloadInfo mgp_optionsList"),
  dlContainer = mph.create("div","mph_progressContainer"),
  dl = mph.create("h1","mph_progress"),
  q_err = "[Error] Not Found",
  dlBtn = mph.create("a","mph_Downloader"),
  dCopy = `<a class="suggestToggleAlt" title="Copy">
  ${l.rt ? `<span>C</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="copy"><path d="M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z"></path></g></svg></a>'}`,
  dDownload = `<a class="suggestToggleAlt" title="Download">
  ${l.rt ? `<span>D</span></a>` : '<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></g></svg></a>'}`;

  mph.info(`Site: ${document.location.origin}`);

  if(l.ph) {
    vs = unsafeWindow.VIDEO_SHOW;
    vidTitle = vs.videoTitleOriginal;
    if(document.documentElement.classList.contains("ios")) {
      phplayer = unsafeWindow.MGP.players[unsafeWindow.document.documentElement.querySelector('.mgp_desktop').id];
      mediaFiles = self[`flashvars_${unsafeWindow.document.documentElement.querySelector('.mgp_desktop').id.slice(10)}`].mediaDefinitions;
    } else {
      phplayer = unsafeWindow.MGP.players[vs.videoId];
      mediaFiles = [unsafeWindow.media_0,unsafeWindow.media_1,unsafeWindow.media_2,unsafeWindow.media_3,unsafeWindow.media_4,unsafeWindow.media_5,unsafeWindow.media_6,unsafeWindow.media_7,unsafeWindow.media_8,unsafeWindow.media_9,unsafeWindow.media_10];
    };
  };

  if(l.rt) {
    vs = unsafeWindow.page_params.video_player_setup;
    phplayer = vs[`playerDiv_${document.location.pathname.slice(1)}`];
    vidTitle = phplayer.playervars.video_title;
    mediaFiles =  phplayer.playervars.mediaDefinitions;
  };

  if(l.tz) {
    vidTitle = unsafeWindow.video_vars.video_title;
    mediaFiles = unsafeWindow.video_vars.mediaDefinitions;
  };

  if(l.t8) {
    vidTitle = unsafeWindow.flashvars.video_title;
    mediaFiles = unsafeWindow.flashvars.mediaDefinition;
  };

  if(l.yp) {
    vidTitle = unsafeWindow.page_params.video.playerParams.mainRoll.title;
    linkType = `${document.location.origin}/api/video/media_definitions/${unsafeWindow.page_params.videoId}/`;
  } else {
    mediaFiles.forEach((file) => {
      if(l.ph && !document.documentElement.classList.contains("ios")) {
        if(file) {
          linkType = file.includes("/video/get_media?s=") ? file : false;
        };
      } else {
        if(file.format === "mp4") {
          linkType = file.videoUrl;
        };
      }
    });
  };
  let links = await mph.getURL(linkType).then(r => r);
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
if(qs("div.mgp_controls > div.mgp_qualitiesMenu")) {
  mph.info("Switching to Tablet...");
  tablet();
} else {
  if(qs("div.mgp_contextMenu > div.mgp_content")) {
    mph.info("Switching to Desktop...");
    primary();
  } else {
    mph.info("Switching to Mobile...");
    mobile();
  };
};

function primary() {
  mph.info("Desktop");
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
    qsA(".mphURL").forEach((u) => {
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
        if (document.body.contains(dlContainer)) {
          return;
        };
        await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
      });
    });
  });
};

function tablet() {
  try{
  mph.info("Tablet");
  let c = dContainer;
  c.innerHTML = `<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul><li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="50" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="50" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="50" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="50" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="50" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="50" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="50" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = "Video Quality(s)";
  mph.query(".mgp_controls").then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    document.body.append(c);
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
    qsA(".mphURL").forEach((u) => {
      mph.ael(u.nextElementSibling,"mosueup",async() => {
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
        if (document.body.contains(dlContainer)) {
          return;
        };
        await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
      });
      mph.ael(u.nextElementSibling.nextElementSibling,"touchstart",async() => {
        if(u.value === q_err) {
          return;
        };
        if (document.body.contains(dlContainer)) {
          return;
        };
        await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
      });
      mph.ael(u.nextElementSibling.nextElementSibling,"touchend",async() => {
        if(u.value === q_err) {
          return;
        };
        if (document.body.contains(dlContainer)) {
          return;
        };
        await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
      });
    });
  });
} catch (e) {
  mph.err(e)
}
};

function mobile() {
  mph.info("Mobile");
  mobileContainer.innerHTML = `<li><span>Best:</span><input value="${q_best ?? q_err}" type="url" size="10" id="urlAreaBest" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value="${q_240 ?? q_err}" type="url" size="10" id="urlArea1" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value="${q_480 ?? q_err}" type="url" size="10" id="urlArea2" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value="${q_720 ?? q_err}" type="url" size="10" id="urlArea3" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value="${q_1080 ?? q_err}" type="url" size="10" id="urlArea4" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value="${q_1440 ?? q_err}" type="url" size="10" id="urlArea5" class="mphURL" readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value="${q_2160 ?? q_err}" type="url" size="10" id="urlArea6" class="mphURL" readonly></input>${dCopy}${dDownload}</li>`;
 vidQuality.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" class="magicph-icon"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg><span>Video</span><div class="mgp_value">Quality(s) </div>`;
 vidQuality.classList.add('mgp_selector');
mph.query("ul.mgp_switches").then((vidFrame) => {
  let om = qs(".mgp_optionsMenu");
  vidFrame.prepend(vidQuality);
  qs(".mgp_subPage > .mgp_content").append(mobileContainer);
  mph.ael(vidQuality,"mouseup", (e) => {
    mph.halt(e);
    qs(".mgp_subPage > .mgp_header").innerHTML = "Video Quality(s)";
    mobileContainer.style.display = "block";
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
    mobileContainer.style.display = "block";
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
    mobileContainer.style.display = "block";
    if(!om.classList.contains("mgp_level2")) {
      om.classList.add('mgp_level2');
    };
    if(!om.classList.contains("mgp_visible")) {
      om.classList.add('mgp_visible');
    };
  });
  mph.ael(qs(".mgp_options > .mgp_optionsBtn"),"mouseup", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    mobileContainer.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_options > .mgp_optionsBtn"),"touchend", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    mobileContainer.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_subPage > .mgp_header"),"mouseup", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    mobileContainer.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  mph.ael(qs(".mgp_subPage > .mgp_header"),"touchend", () => {
    qs(".mgp_subPage > .mgp_header").innerHTML = "Settings";
    mobileContainer.style.display = "none";
    om.classList.contains("mgp_level2") ? om.classList.remove('mgp_level2') : false;
  });
  qsA(".mphURL").forEach((u) => {
    mph.ael(u.nextElementSibling,"mosueup",async() => {
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
      if (document.body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"touchstart",async() => {
      if(u.value === q_err) {
        return;
      };
      if (document.body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
    mph.ael(u.nextElementSibling.nextElementSibling,"touchend",async() => {
      if(u.value === q_err) {
        return;
      };
      if (document.body.contains(dlContainer)) {
        return;
      };
      await DownloadVideo(u.value,vidTitle.replace(/[^a-z0-9 ]/ig, '').replace(/[ ]/ig, '_'));
    });
  });
});
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
    dlContainer.append(dl);
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
    dlBtn.href = unsafeWindow.URL.createObjectURL(result);
    dlBtn.download = `${title}.mp4`;
    dlBtn.click();
    unsafeWindow.URL.revokeObjectURL(dlBtn.href);
    if (dlContainer) {
      dlContainer.remove();
    };
    return mph.info("Downloaded!");
  } catch (e) {
    mph.err(e);
  }
};

})();