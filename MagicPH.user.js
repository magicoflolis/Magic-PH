// ==UserScript==
// @name         Magic's PornHub AIO Beta
// @namespace    https://github.com/magicoflolis
// @version		 2020.03.26
// @author       Magic Of Lolis
// @description  AIO tweaks for PornHub and PornHub Premium
// @homepage	 https://twitter.com/for_lollipops
// @homepageURL  https://twitter.com/for_lollipops
// @supportURL	 https://github.com/magicoflolis/Magic-PH/issues
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/MagicPH.user.js
// @installURL   https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/MagicPH.user.js
// @setupURL     https://raw.githubusercontent.com/magicoflolis/Magic-PH/MagicPH.user.js
// @updateURL    https://raw.githubusercontent.com/magicoflolis/Magic-PH/MagicPH.user.js
// @match        *://*.pornhubpremium.com/*
// @match        *://*.pornhub.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-start
// ==/UserScript==

// Large video player
window.onload = setTimeout(function(){
	if( window.location.pathname.indexOf("/gif/") != -1 ){
		document.getElementsByClassName("toggleGifWebmButton")[0].click();
	} else {
		localStorage.setItem("player_quality", '{"quality":"2160"}');
		document.getElementById("player").classList.add("wide");
		document.getElementById("hd-rightColVideoPage").classList.add("wide");
		document.getElementById("hd-rightColVideoPage").setAttribute('style', 'margin-top:1030px');
		var rect = document.getElementById("main-container").getBoundingClientRect();
		window.scrollBy( rect.left, rect.top );
	}
}, 1000);

// Webpage Fullscreen
(function() {
    'use strict';

    const headEle = document.querySelector('head'),
        style = document.createElement('style'),
        styleText = `
          .playerFlvContainer.fullscreen {
              position: fixed !important;
              z-index: 10000000;
             width: 100%;
             height: 100%;
             left: 0;
             top: 0;
          }`;
    style.innerHTML = styleText;
    headEle.append(style);

    function poll() {
       const wrap = document.querySelector('.mhp1138_front');
        if (!wrap) return setTimeout(poll, 1000);
        let btn = wrap.querySelector('.fullscreen');
        if (!btn) {
           btn = document.createElement('div');
           btn.setAttribute('style', 'float:right; margin-top: 10px;margin-right: 8px; cursor: pointer;');
           btn.title = 'webpage fullscreen';
           btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 451.111 451.111" height="16px" viewBox="0 0 451.111 451.111" width="16px" class=""><g><path d="m290 0 56.389 56.389-88.611 88.611 48.333 48.333 88.611-88.611 56.389 56.389v-161.111z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#CCCCCC"/><path d="m145 257.778-88.611 88.611-56.389-56.389v161.111h161.111l-56.389-56.389 88.611-88.611z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#CCCCCC"/><path d="m306.111 257.778-48.333 48.333 88.611 88.611-56.389 56.389h161.111v-161.111l-56.389 56.389z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#CCCCCC"/><path d="m161.111 0h-161.111v161.111l56.389-56.389 88.611 88.611 48.333-48.333-88.611-88.611z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#CCCCCC"/><style xmlns="" id="8dca7fd2-2718-4c92-9e83-fd40994931ba" class="active-path">.select-text-inside-a-link{ -moz-user-select: text!important; }</style></g> </svg>`
           const player = document.querySelector('.playerFlvContainer');
           const header = document.querySelector('#header');
           btn.addEventListener('click', () => {
              const className = 'fullscreen';
              if (player.classList.contains(className)) {
                header.style.display = 'grid';
                player.classList.remove(className);
              } else {
                header.style.display = 'none';
                player.classList.add(className);
              }
           })
           wrap.append(btn);
        }
    }

    poll();
})();

// Downloader
console.log("PornHub Downloader loaded...");
setTimeout(function(){
document.getElementById("js-shareData").style.width="100%";
    //document.querySelector(".tab-menu-wrapper-cell").style.marginRight="5px";
    if(ad_player_id) {
        console.log("PORNHUB Downloader : Found video ID:"+ad_player_id);
        var v = window["flashvars_"+ad_player_id];
        console.log("PORNHUB Downloader : Try to find variable named 'flashvars_"+ad_player_id+"'");
        var a = Object.values(v);
        a.forEach(function(entry) {
            var box = document.querySelector(".tab-menu-wrapper-row");
            if(entry.length>=20){
                var c = entry.indexOf(".mp4");
                if(c!="-1") {
                    var f = false;
                    if(entry.indexOf("2160P")!="-1") f = "2160P";
                    else if(entry.indexOf("1440P")!="-1") f = "1440P";
                    else if(entry.indexOf("1080P")!="-1") f = "1080P";
                    else if(entry.indexOf("720P")!="-1") f = "720P";
                    else if(entry.indexOf("480P")!="-1") f = "480P";
                    else if(entry.indexOf("240P")!="-1") f = "240P";
                    else f = false;
                    if(f!==false) box.innerHTML += '<div class="tab-menu-wrapper-cell"><a class="tab-menu-item tooltipTrig" data-tab="download-tab" target="_blank" href="'+entry+'" data-title="Download at '+f+'"><i class="main-sprite-dark-2"></i><span>In '+f+'</span></a></div>';
                }
            }
        });

    }
},5000);