"use strict";const Plyr=window.Plyr;import{mph}from"./api.js";import{qs,qsA}from"./querySelector.js";const verify=async e=>{for(;e;)await new Promise((e=>requestAnimationFrame(e)));return e},l={ph:document.location.origin.includes("pornhub"),rt:document.location.origin.includes("redtube"),t8:document.location.origin.includes("tube8"),tz:document.location.origin.includes("thumbzilla"),yp:document.location.origin.includes("youporn")};let q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,getMediaUrl,mediaFiles=[self.media_0,self.media_1,self.media_2,self.media_3,self.media_4,self.media_5,self.media_6,self.media_7,self.media_8,self.media_9,self.media_10],seektime=localStorage.getItem("seektime"),vs=self.VIDEO_SHOW,pid=vs.videoId,phplayer=self.MGP.players[pid],vidQuality=mph.create("div","mgp_download"),dContainer=mph.create("div","mgp_downloadInfo"),dl=mph.create("h1","mph_progress"),q_err="[Error] Not Found",dlBtn=mph.create("a","mph_Downloader");async function fetchLinks(){return await mph.getURL(getMediaUrl).then((e=>(e.forEach((e=>{e.quality.includes?e.quality.includes("240")?q_240=e.videoUrl:e.quality.includes("480")?q_480=e.videoUrl:e.quality.includes("720")?q_720=e.videoUrl:e.quality.includes("1080")?q_1080=e.videoUrl:e.quality.includes("1440")?q_1440=e.videoUrl:e.quality.includes("2160")&&(q_2160=e.videoUrl):240===e.quality?q_240=e.videoUrl:480===e.quality?q_480=e.videoUrl:720===e.quality?q_720=e.videoUrl:1080===e.quality?q_1080=e.videoUrl:1440===e.quality?q_1440=e.videoUrl:2160===e.quality&&(q_2160=e.videoUrl),q_best=e.videoUrl})),[q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best])))}async function DownloadVideo(e,i="MagicPH"){try{mph.info("Attempting to download...");let l=await fetch(e),t=l.body.getReader(),a=+l.headers.get("Content-Length"),n=0,s=[];for(mph.info("Downloading..."),document.body.appendChild(dl);;){const{done:e,value:i}=await t.read();if(e)break;n+=i.length,s.push(i),dl.innerText=`[MagicPH] Downloading... ${n} of ${a}`}let o=new Uint8Array(n),r=0;for(let e of s)o.set(e,r),r+=e.length;let p=new Blob([o],{type:"video/mp4"});return dlBtn.href=self.URL.createObjectURL(p),dlBtn.download=`${i}.mp4`,dlBtn.click(),self.URL.revokeObjectURL(dlBtn.href),dl&&dl.remove(),mph.info("Downloaded!")}catch(e){mph.err(e)}}function main(){let e=`<div class="mgp_copyCloseDiv"><div class="mgp_title">Video Quality(s)</div><div class="mgp_hideMenu" title="Close">🗙</div></div><ul>\n<li><span>Best:</span><input value="${q_best??q_err}" type="url" size="70" id="urlAreaBest" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>240p:</span><input value="${q_240??q_err}" type="url" size="70" id="urlArea1" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>480p:</span><input value="${q_480??q_err}" type="url" size="70" id="urlArea2" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>720p:</span><input value="${q_720??q_err}" type="url" size="70" id="urlArea3" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>1080p:</span><input value="${q_1080??q_err}" type="url" size="70" id="urlArea4" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>1440p:</span><input value="${q_1440??q_err}" type="url" size="70" id="urlArea5" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n<li><span>2160p:</span><input value="${q_2160??q_err}" type="url" size="70" id="urlArea6" class="mphURL" readonly></input><a class="suggestToggleAlt" title="Copy"><div class="mgp_btn mgp_icon mgp_icon-copy"></div></a></li>\n</ul>`;dContainer.innerHTML=e;localStorage.getItem("altplayers")?(()=>{let e={enabled:!0,title:qs("h1.title > span").innerText,disableContextMenu:!0,controls:["restart","rewind","play","fast-forward","progress","current-time","duration","mute","volume","settings","download","fullscreen"],clickToPlay:!0,blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:4320,options:[4320,2160,1440,1080,720,480,360,240]},settings:["quality","speed","loop"],autopause:!0,autoplay:!1,seekTime:4,hideControls:!0,keyboard:{focused:!0,global:!0},tooltips:{controls:!0,seek:!0},displayDuration:!0,fullscreen:{enabled:!0,fallback:!0,iosNative:!1,container:null},storage:{enabled:!0,key:"plyr"}},i=mph.create("div","altframe bigp");i.id="playerframe",i.innerHTML=`<video id="altplayer" class="biga" controls data-poster="${qs("img#videoElementPoster").src}"></video>`,qsA("div.video-wrapper")[0].prepend(i),new Plyr(document.getElementById("altplayer"),e),mph.ael(document.getElementById("altplayer"),"ready",(e=>{const i=e.detail.plyr;i.source={type:"video",sources:[{src:q_best,type:"video/mp4",size:4320},{src:q_240,type:"video/mp4",size:240},{src:q_480,type:"video/mp4",size:480},{src:q_720,type:"video/mp4",size:720},{src:q_1080,type:"video/mp4",size:1080},{src:q_1440,type:"video/mp4",size:1440},{src:q_2160,type:"video/mp4",size:2160}]},mph.query('head > script[src*="cdn1d-static-shared.phncdn.com/html5player/videoPlayer/es6player/6.1.6/desktop-player-adaptive-hls.min.js"]').then((e=>{phplayer.mute(),phplayer.pause(),mph.inject(`self.MGP.destroyPlayer(${pid})`),e.remove(),qs("v-flag-modal").remove()})),i.on("loadeddata",(()=>{i.currentTime=4,i.play(),verify(i.currentTime<seektime).then((()=>{i.currentTime=4,i.play()})),qs(".mainPlayerDiv").classList.add("rm")}))}))})():(qs("div.mgp_contextMenu > div.mgp_content").prepend(vidQuality),qs(".playerFlvContainer").append(dContainer),qsA(".mphURL").forEach((e=>{mph.ael(e.nextElementSibling,"click",(()=>{try{if(document.body.contains(dl))return;navigator.clipboard.writeText(e.value),e.style.color="#f90",mph.delay(2e3).then((()=>e.style.color="#fff"))}catch(i){mph.err(i),e.style.color="rgb(221, 67, 67)",mph.inject(`${e}.select();self.document.execCommand("Copy");`)}}))})),mph.ael(vidQuality,"click",(()=>{qs(".mgp_contextMenu").classList.add("mgp_hidden"),dContainer.classList.add("mgp_active")})),mph.ael(qs(".mgp_hideMenu"),"click",(()=>{dContainer.classList.remove("mgp_active")})),mph.check(phplayer.isReady()??phplayer.isPlaying()).then((async()=>{phplayer.pause(),mph.delay(1e3);let e=qs("a.js-triggerJumpCat.alpha");if(localStorage.getItem("autojump")&&e){mph.info("Attempting to jump...");let i=qsA("a.js-triggerJumpCat"),l=localStorage.getItem("blacklist").toLocaleString();e.children[0].innerText.trim().includes(l)?[...i].every((e=>{let i=e.children[0].innerText.trim().includes(l);return mph.log(![...e.children[0].innerText.trim()].includes(l)),!!i||(e.click(),!1)})):e.click(),mph.info("Jumped!")}else mph.info("Attempting to skip..."),mph.inject(`self.jumpToAction(${seektime})`);phplayer.play(),mph.info("Skipped!")})))}vidQuality.innerText="Video Quality(s)",mediaFiles.forEach((e=>{e&&(getMediaUrl=!!e.includes("/video/get_media?s=")&&e)})),null!=self.opener&&l.ph?(mph.info("Popup"),fetchLinks().then((async()=>{phplayer.mute(),phplayer.pause(),await DownloadVideo(q_best,vs.videoTitleOriginal.replace(/[^a-z0-9 ]/gi,"").replace(/[ ]/gi,"_"))}))):fetchLinks().then(main);