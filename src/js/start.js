'use strict';
import {mph} from './api.js';
import {qs,qsA} from './querySelector.js';
// import Config from './config.js';
// import loadHeader from './header.js';
let config = {},
log = mph.log,
brws = (typeof browser=='undefined'?chrome:browser),
win = self ?? window,
doc = win.document,
estr = (str) => str === null || str.trim() === '',
progressBar = mph.make('h1','mph_progress'),
progressContainer = mph.make('div','mph_progressContainer'),
progressUpdate = (message,time) => {
  try {
    progressContainer.style = 'display: block;';
    progressBar.innerText = message;
    if(time) {
      if(+time === +time) {
        mph.delay(time).then(() => {
          if(progressContainer) {
            progressContainer.style = '';
            progressBar.innerText = '';
          };
        });
      };
    };
  } catch(e) {mph.err(e)};
},
err = (error) => {
  mph.err(error);
  progressUpdate(error,5000);
},
msg = brws.runtime.connect({name:'messenger'});

const pagination = qsA('.pagination3')[0],
loadPage = (url, type) => {
  let pageInput = qs('.pagination3 > .pjump > input'),
  page = qsA('.pagination3 > ul')[0];
  mph.ael(pageInput,'change', (e) => {
    mph.halt(e);
    let link = `${url}/video?page=${e.target.value}`;
    if(type === 'home') {
      qs('.magic-popup > div.home').innerHTML = '';
      link = `${url}/video?page=${e.target.value}`;
      return load(`${link}`,'.sectionWrapper','home');
    } else {
      qs('.magic-popup > div.recommend').innerHTML = '';
      link = `${url}?page=${e.target.value}`;
      return load(`${link}`,'ul#recommendedListings','recommend');
    };
  });
  for (let i of page.children) {
    mph.ael(i,'click', async (e) => {
      mph.halt(e);
      await load(`${e.target.href}`,'.sectionWrapper','home');
    })
  };
},
load = async (url,selElement,name) => {
  try {
    let page = await mph.fetchURL(url.includes('https://') ? url : `https://${url}`,'GET','text'),
    parser = new DOMParser(),
    htmlDocument = parser.parseFromString(page,'text/html'),
    selected = htmlDocument.documentElement,
    section = qs(selElement, selected);
    if(!qs(`.magic-popup > .${name} > ${selElement}`) && section.outerHTML) {
      qs(`.magic-popup > .${name}`).innerHTML = section.outerHTML;
    };
    if(name !== 'categories') {
      let scroller = qs(`.${name} > ${selElement}`),
      scrollfn = () => {
        if(scroller.scrollTop > mph.scrollnumber) {
          qsA('.pagination3')[0].children[0].classList.add('top');
          qsA('.pagination3')[0].children[1].classList.add('top');
        } else {
          qsA('.pagination3')[0].children[0].classList.remove('top');
          qsA('.pagination3')[0].children[1].classList.remove('top');
        }
      };
      if(scroller) {
        scroller.removeEventListener('scroll',scrollfn);
        mph.ael(scroller,'scroll',scrollfn);
        loadPage(url, name);
      };
    };
  } catch(error) {mph.err(error)}
},
loadConfig = async () => {
  try {
  log('isMobile',mph.find.mobile);
  let saveConfig = (n,v) => {
    let s = brws.runtime.sendMessage({
      name: n,
      value: v
    });
    s.then(mph.log,mph.err);
  },
  saveFav = () => {
    if(qs('.favorites > .wrap')) {
      for (let videos of config['favoriteVideos']) {
        for (let m of qsA('.marked')) {
          for(let cn of m.children) {
            if(!cn.href) continue;
            if(videos.video.link === cn.href) {
              m.remove();
              config['favoriteVideos'].splice(config['favoriteVideos'].indexOf(videos),1);
            };
          };
        }
      };
      msg.postMessage({
        save: 'favoriteVideos',
        params: config['favoriteVideos']
      });
      log('Updated Favorites List:',config['favoriteVideos']);
    };
  },
  nav = mph.make('div','navbackground'),
    sidenav = mph.make('div','sidenav', {
      innerHTML: `<a id="sidebar" class="magic1">Home</a><a id="sidebar" class="magic2">Blacklist [WIP]</a><a id="sidebar" class="magic3">Recommended</a><a id="sidebar" class="magic4">Favorites</a><a id="sidebar" class="magic5">Config</a><a id="sidebar" class="magic6">Import</a><a id="sidebar" class="magic7">Export</a><a id="sidebar" class="magic999">Exit ⟵</a>`,
    }),
    magicpopup = mph.make('div','magic-popup', {
      innerHTML: `<div id="popupContainer" class="home"></div><div id="popupContainer" class="blacklist"><form class="magicph_bl"><section class="checkbox"><label><span>Blowjob</span><div class="switch"><input type="checkbox" name="blowjob"/><label for="blowjob"></label></div></label></section><section class="checkbox"><label><span>Cowgirl</span><div class="switch">      <input type="checkbox" name="cowgirl"/>      <label for="cowgirl"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Cumshot</span>    <div class="switch">      <input type="checkbox" name="cumshot"/>      <label for="cumshot"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Doggystyle</span>    <div class="switch">      <input type="checkbox" name="doggystyle"/>      <label for="doggystyle"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Face Sitting</span>    <div class="switch">      <input type="checkbox" name="facesitting"/>      <label for="facesitting"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Facial</span>    <div class="switch">      <input type="checkbox" name="facial"/>      <label for="facial"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Fingering</span>    <div class="switch">      <input type="checkbox" name="fingering"/>      <label for="fingering"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Footjob</span>    <div class="switch">      <input type="checkbox" name="footjob"/>      <label for="footjob"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Handjob</span>    <div class="switch">      <input type="checkbox" name="handjob"/>      <label for="handjob"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Missionary</span>    <div class="switch">      <input type="checkbox" name="missionary"/>      <label for="missionary"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Pussy Licking</span>    <div class="switch">      <input type="checkbox" name="pussylicking"/>      <label for="pussylicking"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Reverse Cowgirl</span>    <div class="switch">      <input type="checkbox" name="reversecowgirl"/>      <label for="reversecowgirl"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Scissoring</span>    <div class="switch">      <input type="checkbox" name="scissoring"/>      <label for="scissoring"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Sex</span>    <div class="switch">      <input type="checkbox" name="sex"/>      <label for="sex"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Titty Fucking</span>    <div class="switch">      <input type="checkbox" name="tittyfucking"/>      <label for="tittyfucking"></label>    </div>  </label></section><section class="checkbox">  <label>    <span>Toy</span>    <div class="switch">      <input type="checkbox" name="toy"/>      <label for="toy"></label>    </div>  </label></section></form></div><div id="popupContainer" class="recommend"></div><div id="popupContainer" class="taste"></div><div id="popupContainer" class="favorites"></div><div id="popupContainer" class="brws_cfg">  <form class="magicph_cfg">    <section class="select">      Alternative player      <select name="altplayers">        <option value="none">Default</option>        <option value="plyr">Plyr</option>      </select>    </section>    <section class="select">      <label>        <span>Player seek time</span>        <input type="number" name="seektime" id="seektime" placeholder="Player Seek Time" />      </label>    </section>    <section class="checkbox">      <label>        <span>Auto "Jump to"</span>        <div class="switch">          <input type="checkbox" name="autojump" id="autojump" />          <label for="autojump"></label>        </div>      </label>    </section>    <section class="checkbox">      <label>        <span>Scroll on load</span>        <div class="switch">          <input type="checkbox" name="autoscroll" id="autoscroll" />          <label for="autoscroll"></label>        </div>      </label>    </section>    <section class="checkbox">      <label>        <span>Blur thumbnails</span>        <div class="switch">          <input type="checkbox" name="blurimg" id="blurimg" />          <label for="blurimg"></label></div></label></section><section class="checkbox"><label><span>Comment section</span><div class="switch">          <input type="checkbox" name="comments" id="comments" />          <label for="comments"></label>        </div>      </label>    </section>    <section class="checkbox">      <label>        <span>'top' button</span>        <div class="switch">          <input type="checkbox" name="topbutton" id="topbutton" />          <label for="topbutton"></label>        </div>      </label>    </section>    <section class="checkbox">      <label>        <span>Sidebar</span>        <div class="switch">          <input type="checkbox" name="sidebar" id="sidebar" />          <label for="sidebar"></label></div></label></section><section class="checkbox"><label><span>[WIP] Console logs</span><div class="switch"><input disabled='' type="checkbox" name="debug" id="debug" /><label for="debug"></label></div></label></section></form></div><div class="pagination3"><ul class="firstPage"><li class="page_current alpha"><span class="greyButton">1</span></li><li class="page_number"><a class="greyButton" href="/video?page=2">2</a></li><li class="page_number"><a class="greyButton" href="/video?page=3">3</a></li><li class="page_number"><a class="greyButton" href="/video?page=4">4</a></li><li class="page_number"><a class="greyButton" href="/video?page=5">5</a></li><li class="page_next_set"><a class="greyButton" href="/video?page=10">10</a></li><li class="page_next omega"><a href="/video?page=2" class="orangeButton">Next<img class="pagination_arrow_right" src="https://ei.phncdn.com/www-static/images/rightArrow.png" alt="Right Arrow" title='' /></a></li></ul><div class="pjump"><input id="pageInput" type="number" name="pageJump" placeholder="Jump to page" value=''></div></div>`,
    }),
    logo = mph.make('a','magiclogo', {
      type:'button',
      onclick: (e) => {
        mph.halt(e);
        if(qs('header')) {
          qs('header').style = 'z-index: -1 !important;';
        };
        if(qs('.site-wrapper')) {
          qs('.site-wrapper').style = 'z-index: -1 !important;';
        };
        if(mph.find.ph) {
          qs('.wrapper').classList.add('blur');
        };
        nav.style.width = '100%';
        sidenav.style = 'left: 0;';
        magicpopup.classList.remove('open');
        mph.html.classList.add('magicFreeze');
      },
    }),
    logoimg = mph.make('img','js_logo_img'),
    mTop = mph.make('input','magicTop',{
      type:'button',
      value: 'Top',
      onclick: () => self.scrollTo(0, 101),
    }),
    mCenter = mph.make('input','magicCenter',{
      type:'button',
      value: 'Recenter',
      onclick: (e) => {
        mph.halt(e);
        return self.scrollTo(0, 101);
      },
    }),
    dlsvg = `Download <svg viewBox="0 0 330 330" style="width: 1rem;height: auto;fill: #fff;">
    <g>
      <path d="M154.389,255.602c0.351,0.351,0.719,0.683,1.103,0.998c0.169,0.138,0.347,0.258,0.52,0.388
        c0.218,0.164,0.432,0.333,0.659,0.484c0.212,0.142,0.432,0.265,0.649,0.395c0.202,0.121,0.4,0.248,0.608,0.359
        c0.223,0.12,0.453,0.221,0.681,0.328c0.215,0.102,0.427,0.21,0.648,0.301c0.223,0.092,0.45,0.167,0.676,0.247
        c0.236,0.085,0.468,0.175,0.709,0.248c0.226,0.068,0.456,0.119,0.684,0.176c0.246,0.062,0.489,0.131,0.739,0.181
        c0.263,0.052,0.529,0.083,0.794,0.121c0.219,0.031,0.435,0.073,0.658,0.095c0.492,0.048,0.986,0.075,1.48,0.075
        c0.494,0,0.988-0.026,1.479-0.075c0.226-0.022,0.444-0.064,0.667-0.096c0.262-0.037,0.524-0.068,0.784-0.12
        c0.255-0.05,0.504-0.121,0.754-0.184c0.223-0.057,0.448-0.105,0.669-0.172c0.246-0.075,0.483-0.167,0.724-0.253
        c0.221-0.08,0.444-0.152,0.662-0.242c0.225-0.093,0.44-0.202,0.659-0.306c0.225-0.106,0.452-0.206,0.672-0.324
        c0.21-0.112,0.408-0.239,0.611-0.361c0.217-0.13,0.437-0.252,0.648-0.394c0.222-0.148,0.431-0.314,0.644-0.473
        c0.179-0.134,0.362-0.258,0.536-0.4c0.365-0.3,0.714-0.617,1.049-0.949c0.016-0.016,0.034-0.028,0.049-0.044l70.002-69.998
        c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.857-15.355-5.858-21.213-0.001l-44.396,44.393V25c0-8.284-6.716-15-15-15
        c-8.284,0-15,6.716-15,15v183.785l-44.392-44.391c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213
        L154.389,255.602z"></path>
      <path d="M315,160c-8.284,0-15,6.716-15,15v115H30V175c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v130
        c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V175C330,166.716,323.284,160,315,160z"></path>
    </g>
    </svg>`,
    rmsvg = `Remove <svg viewBox="0 0 16 16" style="width: 1rem;height: auto;fill: #fff;">
      <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
    </svg>`,
    downloadfn = async (e) => {
      mph.halt(e);
      try {
        const tar = e.target.classList.length > 0 ? e.target : e.target.parentElement;
        let btnURL = tar.parentElement.nextElementSibling.href;
        log('Video Page URL:',btnURL);
        if(mph.find.ofs) {
          msg.postMessage({
            download: {
              mediaFiles: [btnURL],
              title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
              dlTitle: document.title,
            }
          });
        } else {
          if(btnURL.includes('youporn')) {
            let ypURL = () => {
              if(btnURL.includes('gay')) {
                return 'https://www.youporngay.com'
              } else if(btnURL.includes('premium')) {
                return 'https://www.youpornpremium.com'
              };
              return 'https://www.youporn.com';
            };
            msg.postMessage({
              download: {
                mediaFiles: [`${ypURL()}/api/video/media_definitions/${btnURL.match(/[0-9]+\//gi)}`],
                title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
                dlTitle: document.title,
                credentials: 'omit',
              }
            });
          } else {
            let page = await mph.fetchURL(btnURL,'GET','text').catch((e) => {
              mph.err(e);
              progressUpdate(`(FetchURL) ${e}`,5000);
            });
            let parser = new DOMParser(),
              htmlDocument = parser.parseFromString(page,'text/html'),
              selected = htmlDocument.documentElement,
              temp = '';
            for(let scr of qsA('script', selected)) {
              let rtMedia = scr.innerHTML.match(/https:[\\/.?=0-9A-Z]+mp4[.?=0-9A-Z]+/gi),
              t8Media = scr.innerHTML.match(/https:[\\/A-Z.]+tube8[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9]+/gi),
              tzMedia = scr.innerHTML.match(/https:[\\/A-Z.]+thumbzilla[\\/_.?=A-Z0-9]+media[\\/_.?=A-Z0-9&]+/gi),
              phMedia = scr.innerHTML.match(/media_[0-9]=+/gi);
              if(phMedia) {
                let videosrc = phMedia || [],
                rahd = scr.innerHTML.match(/var [A-Za-z0-9]+=[^;]+/gi) || [];
                if(!videosrc) {
                  throw new Error(`Unable to locate Pornhub video media file(s) [value: ${videosrc}]`)
                };
                for(let r of rahd) {temp += `${r};`};
                for(let i = 0; i < videosrc.length; i++) {
                  let re = new RegExp(`media_[${videosrc[i]}]=[0-9/*+=+\\w\\d\\s]+`, 'gi'),
                  b = scr.innerHTML.match(re) || [];
                  for(let fin of b) {
                    // eslint-disable-next-line no-unused-vars
                    let media_0,media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,
                    mediaFiles = eval(`${temp} ${fin}`);
                    msg.postMessage({
                      download: {
                        mediaFiles: [mediaFiles],
                        title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
                        dlTitle: document.title,
                      }
                    });
                  };
                };
                break;
              };
              if(rtMedia) {
                let videosrc = rtMedia[0] || [],
                usr = selected.innerHTML.match(/isLoggedIn.[:\sA-Z]+/gi) || [],
                loggin = usr[0].replaceAll('isLoggedIn: ', ''),
                mediaFiles = videosrc.replaceAll('\\', '');
                msg.postMessage({
                  download: {
                    mediaFiles: [mediaFiles],
                    title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
                    dlTitle: document.title,
                    credentials: (loggin === 'false' || !loggin) ? 'omit' : 'include',
                  }
                });
                break;
              };
              if(t8Media) {
                let videosrc = t8Media[0] || [],
                mediaFiles = videosrc.replaceAll('\\', '');
                msg.postMessage({
                  download: {
                    mediaFiles: [mediaFiles],
                    title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
                    dlTitle: document.title,
                    credentials: 'omit',
                  }
                });
                break;
              };
              if(tzMedia) {
                let videosrc = tzMedia[0] || [],
                mediaFiles = videosrc.replaceAll('\\', '');
                msg.postMessage({
                  download: {
                    mediaFiles: [mediaFiles],
                    title: tar.parentElement.nextElementSibling.nextElementSibling.innerText,
                    dlTitle: document.title,
                    credentials: 'omit',
                  }
                });
                break;
              };
            };
          };
        };
      } catch (e) {
        mph.err(e);
        progressUpdate(`(download-trigger) ${e}`,5000);
      }
    },
    removefn = (e) => {
      mph.halt(e);
      const tar = e.target.classList.length > 0 ? e.target : e.target.parentElement;
      if(tar.textContent.includes('Remove')) {
        tar.previousElementSibling.classList.add('rm');
        tar.parentElement.parentElement.classList.add('marked');
        tar.parentElement.nextElementSibling.classList.add('rm');
        tar.parentElement.nextElementSibling.nextElementSibling.classList.add('rm');
        tar.innerText = 'Undo';
      } else {
        tar.previousElementSibling.classList.remove('rm');
        tar.parentElement.parentElement.classList.remove('marked');
        tar.parentElement.nextElementSibling.classList.remove('rm');
        tar.parentElement.nextElementSibling.nextElementSibling.classList.remove('rm');
        tar.innerHTML = rmsvg;
      };
    },
    buildList = async () => {
      if(mph.find.href.includes('magicph-favorites')) {
        doc.title = '[MagicPH] Favorites';
        doc.body.classList.add('mph');
        qs(mph.currentSite.container).classList.add('favorites');
        qs(mph.currentSite.container).style = 'overflow-x: scroll !important;';
        qs(mph.currentSite.container).innerHTML = '';
        mph.ael(win,'beforeunload',saveFav);
      };
      if(config['favoriteVideos']) {
        const pfav = await mph.query('.magic-popup > .favorites');
        for (let videos of config['favoriteVideos']) {
          let v = videos.video,
          wrap = mph.make('div','wrap'),
          btns = mph.make('div','mph-btns'),
          downBtn = mph.make('button','download-trigger', {
            type:'button',
            innerHTML: dlsvg,
            onclick: downloadfn,
          }),
          rmBtn = mph.make('button','remove-trigger', {
            type:'button',
            innerHTML: rmsvg,
            onclick: removefn,
          }),
          imgC = mph.make('a',null, {href: v.link,innerHTML: `<img src='${v.thumb}'></img>`}),
          sp = mph.make('span','title', {innerHTML: `<a href='${v.link}'>${v.title}</a>`});
          btns.prepend(downBtn,rmBtn);
          wrap.prepend(btns,imgC,sp);
          pfav.prepend(wrap);
          if(mph.find.href.includes('magicph-favorites')) {
            let favs = wrap.cloneNode(true);
            qs(mph.currentSite.container).prepend(favs);
          };
        };
        if(mph.find.href.includes('magicph-favorites')) {
          for(let d of qsA(`${mph.currentSite.container} .download-trigger`)) {
            mph.ael(d,'click',downloadfn);
            mph.ael(d.nextElementSibling,'click',removefn);
          }
        };
        log('Constructed favorites list to sidebar:',config['favoriteVideos']);
      };
    },
    ofsContainer = mph.make('div','mph_ofsContainer', {
      style: 'display: none;',
    }),
    ofsdwn = mph.make('div','mph_ofs_dwn', {
      title: 'Download',
      innerHTML: 'Download',
    }),
    ofsfav = mph.make('div','mph_ofs_fav', {
      title: 'Add to favorites',
      innerHTML: 'Add to favorites',
    }),
    mphimport = mph.make('input','mph_import', {
      type: 'file',
      accept: '.json',
      style: 'display: none;',
      onchange: (input) => {
        try {
          [...input.target.files].forEach((file) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
              config.favoriteVideos = JSON.parse(reader.result);
              log(`Imported file: "${file.name}"`,JSON.parse(reader.result));
              msg.postMessage({
                save: 'favoriteVideos',
                params: config.favoriteVideos
              });
              log('Saved Favorites List:',config.favoriteVideos);
              progressUpdate(`Success, imported list from "${file.name}"`,3500);
            };
            reader.onerror = () => {err(reader.error)};
          });
        } catch(e) {err(e)}
      },
    }),
    loadHeader = () => {
      try {
        let hl = {
          recA: `<a href="${mph.find.gay ? '/gay/' : '/'}recommended" class="mph-header-btn active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
          recB: `<a href="${mph.find.gay ? '/gay/' : '/'}recommended" class="mph-header-btn js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Recommended</span></a>`,
          favA: `<a href="/magicph-favorites" class="mph-header-btn active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Favorites</span><span class="activeLine"></span></span></a>`,
          favB: `<a href="/magicph-favorites" class="mph-header-btn js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Favorites</span></a>`,
        },
        headerBtns = {
          recommended: mph.make('li','menu_elem menu-item menu js-menu item-7 recommended', {
            id:'menuItem7',
            innerHTML: (mph.find.recommended) ? hl.recA : hl.recB,
          }),
          favorites: mph.make('li','menu_elem menu-item menu js-menu item-8 fav', {
            id: 'menuItem8',
            innerHTML: (mph.find.favorites) ? hl.favA : hl.favB,
          }),
          mobilerecommended: mph.make('a',`mph-header-btn noImage recommended ${mph.find.recommended ? 'active' :''}`, {
            href: `${mph.find.gay ? '/gay/' : '/'}recommended`,
            innerHTML: `<span>Recommended</span>`,
          }),
          mobilefavorites: mph.make('a',`mph-header-btn noImage fav ${mph.find.favorites ? 'active' :''}`, {
            href: '/magicph-favorites',
            innerHTML: `<span>Favorites</span>`,
          }),
        };
        if(mph.find.mobile) {
          if(mph.find.yp) {
            return qs(mph.currentSite.menu).append(headerBtns.recommended,headerBtns.favorites);
          };
          return qs(mph.currentSite.menu).append(headerBtns.mobilerecommended,headerBtns.mobilefavorites);
        };
        return qs(mph.currentSite.menu).append(headerBtns.recommended,headerBtns.favorites);
      } catch(error) {err(error)}
    },
    phLogo = async () => {
      if(mph.find.ofs) {
        await mph.query(mph.currentSite.headerContainer);
        let c = mph.make('a','l-header__menu__item m-size-lg-hover m-with-round-hover m-width-fluid-hover', {
          style: 'cursor: pointer;',
          innerHTML: `<span data-v-7f5ddb54="" class="l-header__menu__item__icon"><svg data-v-4125b130="" extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true"><use xlink:href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings" href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings"></use></svg></span><span data-v-7f5ddb54="" class="l-header__menu__item__text"> MagicPH </span>`,
          onclick: () => {
            logo.click()
          },
        });
        c.setAttribute('data-v-7f5ddb54','');
        logo.setAttribute('style','display: none;');
        // <a data-v-7f5ddb54="" active-class="m-current" exact-active-class="" data-name="MagicPH" class="l-header__menu__item m-size-lg-hover m-with-round-hover m-width-fluid-hover"><span data-v-7f5ddb54="" class="l-header__menu__item__icon"><svg data-v-4125b130="" extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true"><use xlink:href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings" href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings"></use></svg></span><span data-v-7f5ddb54="" class="l-header__menu__item__text"> MagicPH </span></a>
        qs(mph.currentSite.headerContainer).prepend(c);
        c.prepend(logo);
      } else {
        logoimg.src = qs(mph.currentSite.logoImg).src ?? qs(mph.currentSite.logoImg).style.background;
        if(mph.find.yp && !mph.find.mobile) {
          qs(mph.currentSite.headerContainer).prepend(logo);
        } else if(mph.find.rt) {
          qs('a#redtube_logo').setAttribute('style','visibility: hidden;');
          qs(mph.currentSite.headerContainer).prepend(logo);
        } else if(mph.find.t8) {
          qs('#logo').classList.add('rm');
          logoimg.setAttribute('style','border: none;display: flex;align-items: center;margin: auto;height: 45px;');
          qs(mph.currentSite.headerContainer).prepend(logo);
        } else {
          qs(mph.currentSite.headerContainer).append(logo);
        };
        logo.append(logoimg);
        if(mph.find.tz) {
          if(qs('#logo')) {
            qs('#logo').classList.add('rm');
            logo.id = 'logo';
          };
        };
      };
      doc.body.prepend(sidenav,mTop,magicpopup);
      doc.body.append(nav,mphimport);

      let bl = qs('form.magicph_bl');
      for (let prop of config['blacklist']) {
        bl.elements[prop].checked = true;
      };
      mph.ael(bl,'change', (e) => {
        try {
          let $el = /** @type {HTMLInputElement} */ (e.target);
          if($el.checked) {
            config['blacklist'].push($el.name)
          } else {
            for (let b of config['blacklist']) {
              config['blacklist'].splice(config['blacklist'].indexOf(b),1)
            };
          };
          // log($el.name,$el.checked);
          msg.postMessage({
            save: 'blacklist',
            params: config['blacklist']
          });
        } catch(error) {err(error)}
      });

      let ff = qs('form.magicph_cfg');
      for (let prop in config) {
        prop in ff.elements
          ? ff.elements[prop].type == 'checkbox'
            ? (ff.elements[prop].checked = config[prop])
            : (ff.elements[prop].value = config[prop])
          : false;
      };
      mph.ael(ff,'change', (e) => {
        let $el = /** @type {HTMLInputElement} */ (e.target);
        $el.type == 'checkbox' ? (config[$el.name] = $el.checked) : (config[$el.name] = $el.value);
        saveConfig($el.name,config[$el.name]);
        if(config.blurimg && !mph.find.favorites) {
          mph.html.classList.add('magicBlur');
        } else {
          mph.html.classList.remove('magicBlur');
        };
      });
      let popups = qsA('.magic-popup > #popupContainer'),
      sidebars = qsA('.sidenav > a#sidebar');
      mph.ael(nav,'click', () => {
        if(qs('header')) {
          qs('header').style = '';
        };
        if(qs('.site-wrapper')) {
          qs('.site-wrapper').style = '';
        };
        if(mph.find.ph) {
          qs('.wrapper').classList.remove('blur');
        };
        sidenav.style = 'left: -200vw;';
        magicpopup.classList.remove('open');
        nav.style.width = '0%';
        for(let item of popups) {
          item.setAttribute('style', 'display: none;');
        };
        for(let item of qsA('.top')) {
          item.classList.remove('top');
        };
        qs('.pjump > input').value = '';
        mph.html.classList.remove('magicFreeze');
        saveFav();
      });
      for(let sb of sidebars) {
      mph.ael(sb,'click', () => {
        for(let item of popups) {
          item.setAttribute('style', 'display: none;');
        };
        pagination.children[0].classList.remove('top');
        pagination.children[1].classList.remove('top');
      });
      };
      mph.ael(qs('.magic1'),'click', () => {
        magicpopup.classList.add('open');
        nav.style.width = '100%';
        qs('.magic-popup > div.home').setAttribute('style', 'display: block;');
        load(`${mph.find.gay ? `${document.location.host}/gay` : document.location.host}`,mph.currentSite.home, 'home');
      });
      mph.ael(qs('.magic2'),'click', () => {
        magicpopup.classList.add('open');
        nav.style.width = '100%';
        qs('.magic-popup > div.blacklist').setAttribute('style', 'display: block !important;');
        //load(`${document.location.host}${!qs('.gayLayout') ? '/' : '/gay/'}categories?o=al`, 'ul#categoriesListSection', 'categories');
      });
      mph.ael(qs('.magic3'),'click', () => {
        magicpopup.classList.add('open');
        nav.style.width = '100%';
        qs('.magic-popup > div.recommend').setAttribute('style', 'display: block;');
        load(`${document.location.host}${!qs('.gayLayout') ? '/' : '/gay/'}recommended`, 'ul.recommendedContainerLoseOne', 'recommend');
      });
      mph.ael(qs('.magic4'),'click', () => {
        qs('.magic-popup > div.favorites').setAttribute('style', 'display: grid;');
        magicpopup.classList.add('open');
        nav.style.width = '100%';
      });
      mph.ael(qs('.magic5'),'click', () => {
        magicpopup.classList.add('open');
        nav.style.width = '100%';
        qs('.magic-popup > div.brws_cfg').setAttribute('style', 'display: block !important;');
      });
      mph.ael(qs('.magic6'),'click', () => {
        mphimport.click();
      });
      mph.ael(qs('.magic7'),'click', () => {
        const str = JSON.stringify(config['favoriteVideos']),
        bytes = new TextEncoder().encode(str),
        blob = new Blob([bytes], {type: 'application/json;charset=utf-8'});
        let dlBtn = mph.make('a','mph_Downloader', {
          href: win.URL.createObjectURL(blob),
          download: `mph_videos.json`,
        });
        dlBtn.click();
        win.URL.revokeObjectURL(dlBtn.href);
        progressUpdate('Exported favorites as "mph_videos.json"',3500);
      });
      mph.ael(qs('.magic999'),'click', () => {
        if(qs('header')) {
          qs('header').style = '';
        };
        if(qs('.site-wrapper')) {
          qs('.site-wrapper').style = '';
        };
        if(mph.find.ph) {
          qs('.wrapper').classList.remove('blur');
        };
        sidenav.style = 'left: -200vw;';
        magicpopup.classList.remove('open');
        nav.style.width = '0%';
        for(let item of popups) {
          item.setAttribute('style', 'display: none;');
        };
        qs('.pjump > input').value = '';
        for(let item of qsA('.top')) {
          item.classList.remove('top');
        };
        mph.html.classList.remove('magicFreeze');
        saveFav();
      });
    };
  if(config.favorites) {
    mph.err('LEGACY FAVORITES LIST');
    config['favoriteVideos'] = [];
    qs('.magic-popup > .favorites').innerHTML = config.favorites;
    for(let w of qsA('.magic-popup > .favorites > .wrap')) {
      let legacyTitle = w.children[2].children[0].innerHTML,
      legacyThumb = w.children[1].children[0].src,
      legacyLink = w.children[1].href;
      config['favoriteVideos'].push({
        video: {
          title: legacyTitle,
          thumb: legacyThumb,
          link: legacyLink
        }
      },);
      saveFav();
      msg.postMessage({delete: 'favorites'});
    };
  };
  if(mph.find.ofs) {
    let tempsrc = '',
    temptitle = '';
    mph.observe(win.document.documentElement, (mutations) => {
      for(let mutation of mutations) {
        for(let node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          // eslint-disable-next-line no-unused-vars
          for(let elem of node.querySelectorAll('source')) {
            ofsContainer.setAttribute('style','');
            tempsrc = elem.getAttribute('src');
            temptitle = elem.parentElement.getAttribute('id');
            continue;
          };
        };
        for(let node of mutation.removedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          // eslint-disable-next-line no-unused-vars
          for(let elem of node.querySelectorAll('source')) {
            ofsContainer.setAttribute('style','display: none;');
          };
        };
      }
    });
    mph.ael(ofsdwn,'click', (e) => {
      mph.halt(e);
      msg.postMessage({
        download: {
          mediaFiles: [tempsrc],
          title: temptitle,
          dlTitle: document.title,
        }
      });
    });
    mph.ael(ofsfav,'fclick',(e) => {
      try {
        let vthumb = '';
        for(let vp of qsA('video')) {
          if(estr(vp.getAttribute('poster'))) continue;
          vthumb = vp.getAttribute('poster');
        };
        let favmsg = '',
        a = e.target,
        wrap = mph.make('div','wrap'),
        btns = mph.make('div','mph-btns'),
        downBtn = mph.make('button','download-trigger', {
          type:'button',
          innerHTML: dlsvg,
          onclick: downloadfn,
        }),
        rmBtn = mph.make('button','remove-trigger', {
          type:'button',
          innerHTML: rmsvg,
          onclick: removefn,
        }),
        imgC = mph.make('a',null, {
          href: doc.location.href,
          innerHTML: `<img src='${vthumb}'></img>`,
        }),
        sp = mph.make('span','title', {
          innerHTML: `<a href='${tempsrc}'>${temptitle}</a>`,
        });
        favmsg = a.title.includes('[MagicPH] Remove from Favorites') ? '[MagicPH] Add to Favorites' : '[MagicPH] Remove from Favorites';
        if(a.title.includes('[MagicPH] Remove from Favorites')) {
          ofsfav.style = '';
          for(let item of qsA('.favorites > .wrap > .title')) {
            const txt = item.textContent.trim();
            if(txt.includes(temptitle)) {
              item.previousElementSibling.previousElementSibling.lastElementChild.click();
            };
          };
          progressUpdate('Removed from Favorites',3500);
        } else {
          btns.prepend(downBtn,rmBtn);
          wrap.prepend(btns,imgC,sp);
          qs('.magic-popup > .favorites').prepend(wrap);
          ofsfav.style = 'color: #f90;';
          config['favoriteVideos'].push(
            {
              video: {
                title: temptitle,
                thumb: vthumb,
                link: tempsrc
              }
            },
          );
          progressUpdate('Saved to Favorites',3500);
        };
        a.dataset.title = favmsg;
        a.title = favmsg;
        saveFav();
      } catch(e) {mph.err(e)}
    });
    if(!doc.body.contains(ofsContainer)) {
      ofsContainer.append(ofsdwn,ofsfav);
      doc.body.prepend(ofsContainer);
    };
  };
  config.sidebar ? phLogo() : false;
  config.autoscroll ? self.scrollTo(0, 101) : false;
  !config.topbutton ? mTop.classList.add('rm') : false;
  if(config.blurimg && !mph.find.favorites) {
    mph.html.classList.add('magicBlur');
  } else {
    mph.html.classList.remove('magicBlur');
  };
  if(mph.find.video) {
    try {
      doc.body.prepend(mCenter);
      let rtFN = (type) => {
        for(let comment of qsA('.tab-block-label')) {
          if(type === 'add') {
            (comment.dataset.tabid === 'comments_tab') ? comment.classList.add('rm') : false;
          };
          if(type === 'remove') {
            (comment.dataset.tabid === 'comments_tab') ? comment.classList.remove('rm') : false;
          };
        };
      };
      if(config.comments) {
        qs('#videoComments') ? qs('#videoComments').classList.remove('rm') : false;
        qs('#comments') ? qs('#comments').classList.remove('rm') : false;
        qs('.tab-block-label') ? rtFN('remove') : false;
        qs('#allComments') ? qs('#allComments').classList.remove('rm') : false;
        qs('.mostPopularComment') ? qs('.mostPopularComment').classList.remove('rm') : false;
        qs('.commentsTab') ? qs('.commentsTab').classList.remove('rm') : false;
      } else {
        qs('#videoComments') ? qs('#videoComments').classList.add('rm') : false;
        qs('#comments') ? qs('#comments').classList.add('rm') : false;
        qs('.tab-block-label') ? rtFN('add') : false;
        qs('#allComments') ? qs('#allComments').classList.add('rm') : false;
        qs('.mostPopularComment') ? qs('.mostPopularComment').classList.add('rm') : false;
        qs('.commentsTab') ? qs('.commentsTab').classList.add('rm') : false;
      };
      if(config.altplayers !== 'none') {
        mph.setItem('altplayers', config.altplayers);
      } else {
        if(mph.getItem('altplayers')) {
          mph.removeItem('altplayers')
        };
        if(config.autojump) {
          mph.setItem('autojump', config.autojump);
        } else {
          if(mph.getItem('autojump')) {
            mph.removeItem('autojump')
          };
        };
        if(config.blacklist.length > 0) {
          mph.setItem('blacklist', JSON.stringify(config['blacklist']));
        } else {
          if(mph.getItem('blacklist')) {
            mph.removeItem('blacklist')
          };
        };
        mph.setItem('seektime', config.seektime);
      };
      await mph.query('.mgp_container');
      let addFav = mph.make('div','magicph-fav icon-wrapper tooltipTrig', {
        title: '[MagicPH] Add to Favorites',
        innerHTML: mph.find.rt ? `<em class="magicph-icon video-action-icon rt_icon rt_Menu_Heart"></em>` : `<svg class="magicph-icon" viewBox="0 0 471.701 471.701">
        <g><path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
            C444.801,187.101,434.001,213.101,414.401,232.701z"/>
        </g></svg>`,
        //innerHTML: `<i class='ph-icon-favorite icon-heart rt_icon rt_Menu_Heart' ${(mph.find.tz) ? `style="display: inline-block;width: 26px;height: 28px;background-image: url('https://ei.phncdn.com/www-static/thumbzilla/images/pc/sprite-main.png');background-position: 0 -385px;"` : ''}></i>`,
      }),
      titletxt = qs(mph.currentSite.vTitle).textContent.trim();
      mph.query('.favorites > .wrap > .title').then(() => {
        addFav.dataset.title = '[MagicPH] Add to Favorites';
        for(let item of qsA('.favorites > .wrap > .title')) {
          try {
            const txt = item.textContent.trim();
            if(txt.includes(titletxt)) {
              addFav.title = '[MagicPH] Remove from Favorites';
              addFav.dataset.title = '[MagicPH] Remove from Favorites';
              addFav.firstElementChild.style = 'color: #f90; fill: #f90;';
              break;
            };
          } catch(error) {err(error)}
        };
      });
      qs(mph.currentSite.favLocation).prepend(addFav);
      mph.ael(addFav,'fclick', () => {
        try {
          let favmsg = '',vthumb = '';
          for(let vp of qsA('.mgp_videoPoster img')) {
            if(estr(vp.src)) continue;
            vthumb = vp.src;
          };
          let wrap = mph.make('div','wrap'),
          btns = mph.make('div','mph-btns'),
          downBtn = mph.make('button','download-trigger', {
            type:'button',
            innerHTML: dlsvg,
            onclick: downloadfn,
          }),
          rmBtn = mph.make('button','remove-trigger', {
            type:'button',
            innerHTML: rmsvg,
            onclick: removefn,
          }),
          imgC = mph.make('a',null, {
            href: doc.location.href,
            innerHTML: `<img src='${vthumb}'></img>`,
          }),
          sp = mph.make('span','title', {
            innerHTML: `<a href='${doc.location.href}'>${qs(mph.currentSite.vTitle).innerText}</a>`,
          });
          favmsg = addFav.title.includes('[MagicPH] Remove from Favorites') ? '[MagicPH] Add to Favorites' : '[MagicPH] Remove from Favorites';
          if(addFav.title.includes('[MagicPH] Remove from Favorites')) {
            addFav.firstElementChild.style = '';
            for(let item of qsA('.favorites > .wrap > .title')) {
              const txt = item.textContent.trim();
              if(txt.includes(titletxt)) {
                item.previousElementSibling.previousElementSibling.lastElementChild.click();
              };
            };
            progressUpdate('Removed from Favorites',3500);
          } else {
            btns.prepend(downBtn,rmBtn);
            wrap.prepend(btns,imgC,sp);
            qs('.magic-popup > .favorites').prepend(wrap);
            addFav.firstElementChild.style = 'color: #f90; fill: #f90;';
            config['favoriteVideos'].push(
              {
                video: {
                  title: titletxt,
                  thumb: vthumb,
                  link: doc.location.href
                }
              },
            );
            progressUpdate('Saved to Favorites',3500);
          };
          addFav.dataset.title = favmsg;
          addFav.title = favmsg;
          saveFav();
        } catch(e) {err(e)}
      });
    } catch(error) {
      err(error)
    }
  };
  buildList();
  if(!mph.find.ofs) {
    loadHeader();
  }
  } catch(e) {mph.err(e)}
};
msg.onMessage.addListener((m) => {
  if(!m) return;
  if(m.cfg) {
    config = m.cfg ?? config;
    log('Config:',config);
    mph.ael(win,'load',loadConfig);
    mph.ael(doc,'readystatechange', (e) => {
      if(e.target.readyState === 'complete') {
        if(!doc.body.contains(progressContainer)) {
          progressContainer.append(progressBar);
          doc.body.prepend(progressContainer);
        };
      };
    });
  };
  if(m.dlProgress) {
    doc.title = `${m.dlProgress}% - ${m.dlTitle}`;
    progressUpdate(`(Web Ext) Downloading... ${m.dlProgress}%`);
  };
  if(m.dlDone) {
    doc.title = m.dlTitle;
    if(m.dlDone.match(/complete/gi)) {
      log(m);
    } else {
      err(m);
    };
    progressUpdate(`(Web Ext) ${m.dlDone}`,3500);
  };
});
