// ==UserScript==
// @name         MagicPH
// @description  Best downloader for any PH Network site.
// @author       Magic <magicoflolis@tuta.io>
// @version      2.0.0rc3
// @icon         https://github.com/magicoflolis/Magic-PH/raw/master/assets/magicph_logo.png
// @downloadURL  https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @updateURL    https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues/new
// @namespace    https://github.com/magicoflolis/Magic-PH
// @homepageURL  https://github.com/magicoflolis/Magic-PH
// @license      GPL-3.0-only
// @connect      *
// @match        https://*.pornhub.com/view_video.php?viewkey=*
// @match        https://*.pornhubpremium.com/view_video.php?viewkey=*
// @match        https://*.youporn.com/watch/*
// @match        https://*.youpornpremium.com/watch/*
// @match        https://*.youporngay.com/watch/*
// @match        https://*.redtube.com/*
// @match        https://*.redtubepremium.com/*
// @match        https://*.tube8.com/porn-video/*
// @match        https://*.thumbzilla.com/video/*
// @grant        unsafeWindow
// @noframes
// @compatible   Chrome
// @compatible   Firefox
// @run-at       document-end
// ==/UserScript==

'use strict';
let debug = false;
let mphCSS =`.mgp_videoStarted.mgp_hideControls .mgp_download{display:none}.mph_progressContainer{background:#f90;background-color:#000;border:2px solid #f90;color:#f90;width:fit-content;height:auto;border-radius:16px;margin:0 3px;padding:1px 5px 1px 5px;position:fixed;display:none;top:25%;left:0%;z-index:50000}.mph_progressContainer h1{line-height:25px;font-size:16px;font-family:inherit;font-weight:700;margin:0 3px;color:#f90 !important}.mgp_contextMenu>.mgp_content>.mgp_download{border-bottom:1px solid rgba(255,255,255,.2) !important}.mgp_controls>.mgp_download{position:absolute;top:50%;bottom:0;left:80%;right:0;color:#ccc;cursor:pointer;width:fit-content;height:min-content;z-index:150;border-radius:5px;background-color:rgba(0,0,0,.7);padding:8px 10px}div.mgp_downloadInfo{display:grid;grid-auto-flow:row}.mgp_downloadInfo ul{padding:2px 4px !important}.mgp_downloadInfo li{display:grid;grid-auto-flow:column;margin:auto;width:100%}.mgp_downloadInfo.mgp_active{opacity:1 !important;visibility:visible !important}.mgp_downloadInfo input{color:#ccc;text-align:center;outline:0 none;background:rgba(0,0,0,0);border:none;margin:auto}.mgp_downloadInfo span{width:45px;margin:auto}.mgp_downloadInfo a.suggestToggleAlt{cursor:pointer;margin:auto}.mgp_downloadInfo a.suggestToggleAlt:hover{color:#f90;text-decoration:0}.mgp_downloadInfo a.suggestToggleAlt .magicph-icon{position:relative;height:1.25em;fill:currentcolor}.mgp_downloadInfo.mgp_active{opacity:1 !important;visibility:visible !important}body>.mgp_downloadInfo{font-size:16px;font-family:inherit;font-weight:700;line-height:25px;top:25%}@media only screen and (min-device-width: 375px)and (max-device-width: 812px)and (-webkit-min-device-pixel-ratio: 3)and (orientation: landscape){body>.mgp_downloadInfo li{grid-template-columns:50px 2fr 25px 25px}}div.mgp_container>.mgp_downloadInfo{top:46%}body>.mgp_downloadInfo,div.mgp_container>.mgp_downloadInfo{z-index:2000;background:rgba(0,0,0,.75);position:absolute;left:50%;transition:opacity .2s linear;transform:translate(-50%, -50%);opacity:0;visibility:hidden;color:#ccc}body>.mgp_downloadInfo>.mgp_copyCloseDiv,div.mgp_container>.mgp_downloadInfo>.mgp_copyCloseDiv{border-bottom:1px solid rgba(255,255,255,.2);overflow:hidden;padding:2px 4px}body>.mgp_downloadInfo>.mgp_copyCloseDiv>.mgp_title,div.mgp_container>.mgp_downloadInfo>.mgp_copyCloseDiv>.mgp_title{font-size:16px;line-height:30px;padding:0 0 0 5px;float:left}body>.mgp_downloadInfo>.mgp_copyCloseDiv>.mgp_hideMenu,div.mgp_container>.mgp_downloadInfo>.mgp_copyCloseDiv>.mgp_hideMenu{font-size:25px;float:right;cursor:pointer;padding:5px}input[value^="[Error] Not Found"]{visibility:hidden !important}ul.mgp_switches>.mgp_download{display:grid !important}ul.mgp_switches>.mgp_download .magicph-icon{display:block;font-size:25px;min-height:36px;left:50%;padding-bottom:5px;position:relative;top:0px;transform:translate(-50%, 0%)}.mgp_download .magicph-icon{height:1.25em}/*# sourceMappingURL=downloader.css.map */
`;

let win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window,
doc = document;
const isMobile = () => {
  let a = navigator.userAgent||navigator.vendor||win.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4));
},
err = (...error) => {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
  if(isMobile()) {
    alert(...error)
  };
},
l = {
  ph: doc.location.origin.includes('pornhub') && doc.location.pathname.match(/view_video/gi),
  rt: doc.location.origin.includes('redtube') && doc.location.pathname.match(/[0-9]+/gi),
  t8: doc.location.origin.includes('tube8') && doc.location.pathname.match(/porn-video[/0-9]+/gi),
  tz: doc.location.origin.includes('thumbzilla') && doc.location.pathname.match(/video[/A-Z0-9-]+/gi),
  yp: doc.location.origin.includes('youporn') && doc.location.pathname.match(/watch[/0-9]+/gi),
},
estr = (str) => str === null || str.trim() === '',
ael = (elm, event, callback) => {
  try {
    elm = elm ?? doc;
    if(isMobile()) {
      if(event === 'click') {
        event = 'mouseup';
        elm.addEventListener('touchstart', callback);
        elm.addEventListener('touchend', callback);
      };
    };
    if(event === 'fclick') {event = 'click'};
    return elm.addEventListener(event, callback);
  } catch(error) {
    err(error);
  };
},
/** Can make various elements */
make = (element,cname,attrs = {}) => {
  try {
    let el = doc.createElement(element);
    !estr(cname) ? el.className = cname : false;
    if(attrs) {
      for(let key in attrs) {
        el[key] = attrs[key]
      };
    };
    return el;
  } catch(error) {err(error)};
},
delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
halt = (e) => {
  e.preventDefault();
  e.stopPropagation();
},
fetchURL = async (url,method = 'GET',responseType = 'json',params = {}) => {
  try {
    return new Promise((resolve, reject) => {
      if(responseType === 'download') {
        resolve(fetch(url, {
          method: method,
          credentials: 'omit',
          ...params,
        }));
      };
      fetch(url, {
        method: method,
        credentials: 'include',
        ...params,
      }).then((response) => {
        if(!response.ok) reject(response);
        if(responseType.includes('json')) {
          resolve(response.json());
        } else if(responseType.includes('text')) {
          resolve(response.text());
        } else if(responseType.includes('blob')) {
          resolve(response.blob());
        };
        resolve(response);
      });
    });
  } catch (error) {err(error);}
},
loadCSS = (css, name = 'common') => {
  let s = make('style', `mph-${name}`, {
    innerHTML: css,
  });
  return (!doc.head.contains(s)) ? doc.head.appendChild(s) : false;
},
info = (...message) => {
  if(!debug) return;
  console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...message);
},
qsA = (element, selector = document) => selector.querySelectorAll(element),
qs = (element, selector = document) => selector.querySelector(element),
query = async (selector,root) => {
  root = root ?? doc;
  while(root.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve) )
  };
  return root.querySelector(selector);
},
vidQuality = make('div','mgp_download', {
  innerText: 'Video Quality(s)',
}),
mobileContainer = make('ul','mgp_downloadInfo mgp_optionsList'),
dl = make('h1','mph_progress'),
dlContainer = make('div','mph_progressContainer'),
dlBtn = make('a','mph_Downloader'),
dContainer = make('div','mgp_downloadInfo'),
msg = (message,time) => {
  dlContainer.style = 'display: block;';
  dl.innerText = message;
  if(time) {
    if(+time === +time) {
      delay(time).then(() => {
        if(dlContainer) {
          dlContainer.style = '';
          dl.innerText = '';
        };
      });
    };
  };
},
setClipboard = (message,callback) => {
  try {
    navigator.clipboard.writeText(message).then(callback, (e) => {
      throw new Error(e);
    });
  } catch (error) {err(error);}
};
let mediaFiles,vs,q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,vidTitle,
q_err = '[Error] Not Found',
dCopy = `<a class='suggestToggleAlt' title='Copy'>
${l.rt ? `<span>C</span></a>` : `<svg viewBox='0 0 24 24' aria-hidden='true' class='magicph-icon'><g class='copy'><path d='M6.11 4.25v1.86H4.25C3.01 6.11 2 7.12 2 8.36v11.39C2 20.99 3.01 22 4.25 22h11.39c1.24 0 2.25-1.01 2.25-2.25v-1.86h1.86c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2H8.36C7.12 2 6.11 3.01 6.11 4.25zm9.53 16.25H4.25c-.413 0-.75-.337-.75-.75V8.36c0-.412.337-.75.75-.75h11.39c.412 0 .75.338.75.75v11.39c0 .413-.338.75-.75.75zm4.11-17c.413 0 .75.337.75.75v11.39c0 .412-.337.75-.75.75h-1.86V8.36c0-1.24-1.01-2.25-2.25-2.25H7.61V4.25c0-.413.338-.75.75-.75h11.39z'></path></g></svg></a>`}`,
dDownload = `<a class='suggestToggleAlt' title='Download'>
${l.rt ? `<span>D</span></a>` : `<svg viewBox='0 0 24 24' aria-hidden='true' class='magicph-icon'><g class='download'><path d='M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'></path></g></svg></a>`}`;
async function setup() {
  try {
    loadCSS(mphCSS,'core');
    info(`Site: ${doc.location.origin}`);
    info('isMobile',isMobile());
    dlContainer.append(dl);
    doc.body.prepend(dlContainer);
    let page = await fetchURL(doc.location.href,'GET','text'),
    parser = new DOMParser(),
    htmlDocument = parser.parseFromString(page,'text/html'),
    selected = htmlDocument.documentElement,
    temp = '';
    if(doc.location.origin.includes('youporn')) {
      mediaFiles = `${doc.location.origin}/api/video/media_definitions${document.location.href.match(/\/[0-9]+\//gi)}`
    } else {
      for(let scr of qsA('script', selected)) {
        let txt = scr.innerHTML,
        rtMedia = txt.match(/https:[\\/.?=0-9A-Z]+mp4[.?=0-9A-Z]+/gi),
        t8Media = txt.match(/https:[\\/A-Z.]+tube8[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9]+/gi),
        tzMedia = txt.match(/https:[\\/A-Z.]+thumbzilla[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9&]+/gi),
        phMedia = txt.match(/media_[0-9]=+/gi),
        phMobile = txt.match(/https:[\\/A-Z.]+pornhub[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9&]+/gi);
        info(phMedia);
        if(phMedia) {
          let videosrc = phMedia || [],
          rahd = txt.match(/var [A-Za-z0-9]+=[^;]+/gi) || [];
          if(!videosrc) {
            msg(`[MagicPH] ERROR: Unable to locate Pornhub video media file(s) [value: ${videosrc}]`,5000)
          };
          for(let r of rahd) {temp += `${r};`};
          for(let i = 0; i < videosrc.length; i++) {
            let re = new RegExp(`media_[${videosrc[i]}]=[0-9/*+=+\\w\\d\\s]+`, 'gi'),
            b = txt.match(re) || [];
            for(let fin of b) {
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
    if(mediaFiles) {
      for(let file of [mediaFiles]) {
        if(file.includes('get_media?s=') || file.includes('media/mp4?s=') || file.includes('youporn') || file.includes('tube8')) {
          fetchURL(file,'GET','json').then((links) => {
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
            dContainer.innerHTML = `<div class='mgp_copyCloseDiv'><div class='mgp_title'>Video Quality(s)</div><div class='mgp_hideMenu' title='Close'>🗙</div></div><ul><li><span>Best:</span><input value='${q_best ?? q_err}' type='url' size='70' id='urlAreaBest' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value='${q_240 ?? q_err}' type='url' size='70' id='urlArea1' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value='${q_480 ?? q_err}' type='url' size='70' id='urlArea2' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value='${q_720 ?? q_err}' type='url' size='70' id='urlArea3' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value='${q_1080 ?? q_err}' type='url' size='70' id='urlArea4' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value='${q_1440 ?? q_err}' type='url' size='70' id='urlArea5' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value='${q_2160 ?? q_err}' type='url' size='70' id='urlArea6' class='mphURL' readonly></input>${dCopy}${dDownload}</li></ul>`;
            networkPlayer();
          }).catch(err);
        } else {
          msg(`[MagicPH] ERROR: Unable to locate video media file(s) [mediaFiles: { ${mediaFiles} }]`,5000);
        };
      };
    } else {
      msg(`[MagicPH] ERROR: Unable to locate video media file(s) from page [mediaFiles: { ${mediaFiles} }]`,5000);
    }
  } catch (e) {
    err(e)
  };
};
async function networkPlayer() {
  if(isMobile()) {await query('.mgp_container')};
  if(typeof unsafeWindow !== 'undefined') {
    if(l.ph) {
      vs = win.VIDEO_SHOW;
      vidTitle = vs.videoTitleOriginal;
    };
    if(l.rt) {
      vs = win.page_params.video_player_setup;
      vidTitle = vs[`playerDiv_${doc.location.pathname.match(/[0-9]+/gi)}`].playervars.video_title;
    };
    if(l.tz) {
      vidTitle = win.video_vars.video_title;
    };
    if(l.t8) {
      vidTitle = win.flashvars.video_title;
    };
    if(l.yp) {
      vidTitle = !win.page_params.video.playerParams ? win.page_params.shareVideo.title : win.page_params.video.playerParams.mainRoll.title;
    };
  } else {
    vidTitle = doc.title;
  };
  if(isMobile()) {
    if(l.yp) {
      tablet();
    } else {
      qs('div.mgp_controls > div.mgp_qualitiesMenu') ? tablet() : mobile();
    }
  } else {
    desktop();
  };
};
function desktop() {
  info('Detected { Desktop }');
  query('div.mgp_contextMenu > div.mgp_content').then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    qs('.mgp_desktop').append(dContainer);
    ael(vidQuality,'click', () => {
      qs('.mgp_contextMenu').classList.add('mgp_hidden');
      dContainer.classList.add('mgp_active');
    });
    ael(qs('.mgp_hideMenu'),'click', () => {
      dContainer.classList.remove('mgp_active');
    });
    urlFN();
  });
};
function tablet() {
  info('Detected { Tablet }');
  let c = dContainer;
  c.innerHTML = `<div class='mgp_copyCloseDiv'><div class='mgp_title'>Video Quality(s)</div><div class='mgp_hideMenu' title='Close'>🗙</div></div><ul><li><span>Best:</span><input value='${q_best ?? q_err}' type='url' size='50' id='urlAreaBest' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value='${q_240 ?? q_err}' type='url' size='50' id='urlArea1' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value='${q_480 ?? q_err}' type='url' size='50' id='urlArea2' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value='${q_720 ?? q_err}' type='url' size='50' id='urlArea3' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value='${q_1080 ?? q_err}' type='url' size='50' id='urlArea4' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value='${q_1440 ?? q_err}' type='url' size='50' id='urlArea5' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value='${q_2160 ?? q_err}' type='url' size='50' id='urlArea6' class='mphURL' readonly></input>${dCopy}${dDownload}</li></ul>`;
  vidQuality.innerText = 'Video Quality(s)';
  query('.mgp_controls').then((vidFrame) => {
    vidFrame.prepend(vidQuality);
    doc.body.append(c);
    ael(vidQuality,'click', (e) => {
      halt(e);
      c.classList.add('mgp_active');
    });
    ael(qs('.mgp_hideMenu'),'click', (e) => {
      halt(e);
      c.classList.remove('mgp_active');
    });
    urlFN();
  });
};
function mobile() {
  info('Detected { Mobile }');
  let c = mobileContainer;
  c.innerHTML = `<li><span>Best:</span><input value='${q_best ?? q_err}' type='url' size='10' id='urlAreaBest' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>240p:</span><input value='${q_240 ?? q_err}' type='url' size='10' id='urlArea1' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>480p:</span><input value='${q_480 ?? q_err}' type='url' size='10' id='urlArea2' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>720p:</span><input value='${q_720 ?? q_err}' type='url' size='10' id='urlArea3' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1080p:</span><input value='${q_1080 ?? q_err}' type='url' size='10' id='urlArea4' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>1440p:</span><input value='${q_1440 ?? q_err}' type='url' size='10' id='urlArea5' class='mphURL' readonly></input>${dCopy}${dDownload}</li><li><span>2160p:</span><input value='${q_2160 ?? q_err}' type='url' size='10' id='urlArea6' class='mphURL' readonly></input>${dCopy}${dDownload}</li>`;
  vidQuality.innerHTML = `<svg viewBox='0 0 24 24' aria-hidden='true' class='magicph-icon'><g class='download'><path d='M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' ></path></g></svg><span>Video</span><div class='mgp_value'>Quality(s)</div>`;
  vidQuality.classList.add('mgp_selector');
  query('ul.mgp_switches').then((vidFrame) => {
    let om = qs('.mgp_optionsMenu');
    vidFrame.prepend(vidQuality);
    qs('.mgp_subPage > .mgp_content').append(mobileContainer);
    ael(vidQuality,'click', (e) => {
      halt(e);
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Video Quality(s)';
      c.style.display = 'block';
      if(!om.classList.contains('mgp_level2')) {
        om.classList.add('mgp_level2');
      };
      if(!om.classList.contains('mgp_visible')) {
        om.classList.add('mgp_visible');
      };
    });
    ael(qs('.mgp_options > .mgp_optionsBtn'),'click', (e) => {
      halt(e);
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
      c.style.display = 'none';
      om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
    });
    ael(qs('.mgp_subPage > .mgp_header'),'click', (e) => {
      halt(e);
      qs('.mgp_subPage > .mgp_header').innerHTML = 'Settings';
      c.style.display = 'none';
      om.classList.contains('mgp_level2') ? om.classList.remove('mgp_level2') : false;
    });
    urlFN();
  });
};
function urlFN() {
  for(let u of qsA('.mphURL')) {
    ael(u.nextElementSibling,'fclick', (e) => {
      halt(e);
      if(u.value === q_err) return;
      setClipboard(u.value,() => {
        u.style.color = '#f90';
        msg('[MagicPH] Copied to Clipboard',2500);
      });
      delay(2000).then(() => u.style.color = '#ccc');
    });
    ael(u.nextElementSibling.nextElementSibling,'fclick', (e) => {
      halt(e);
      if(u.value === q_err) return;
      DownloadVideo(u.value,vidTitle);
    });
  };
};
async function DownloadVideo(url,title = 'MagicPH') {
  try {
    let invalid_chars = {'\\': '＼', '/': '／', '|': '｜', '<': '＜', '>': '＞', ':': '：', '*': '＊', '?': '？', '"': '＂', '🔞': '', '#': ''},
    content = '',
    og_title = doc.title;
    content = title.replace(/[\\/|<>*?:#"]/g, v => invalid_chars[v]);
    msg('Attempting to download...');
    let dlRequest = await fetchURL(url,'GET','download'),
    reader = dlRequest.body.getReader(),
    contentLength = +dlRequest.headers.get('Content-Length'),
    receivedLength = 0,
    chunks = [];
    while(true) {
      const {done, value} = await reader.read();
      if (done) break;
      receivedLength += value.length;
      chunks.push(value);
      let percentComplete = (receivedLength / contentLength) * 100;
      doc.title = `${percentComplete.toFixed(2)}% - ${og_title}`;
      msg(`[Method: { Fetch API }] Downloading... ${percentComplete.toFixed(2)}%`);
    };
    let Uint8Chunks = new Uint8Array(receivedLength),
    position = 0;
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
    msg('[MagicPH] Download Complete!',5000);
    return info('Download Complete!');
  } catch (e) {
    err(e);
  }
};

if (doc.readyState == 'complete') {
  setup();
} else {
  win.addEventListener('load', setup);
};
