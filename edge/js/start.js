(()=>{"use strict";var e={"./html/header.html":(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const n='<section class="head-select">\r\n  Header #1\r\n  <select class="item-1" name="head1">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #2\r\n  <select class="item-2" name="head2">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #3\r\n  <select class="item-3" name="head3">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #4\r\n  <select class="item-4" name="head4">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #5\r\n  <select class="item-5" name="head5">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #6\r\n  <select class="item-6" name="head6">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #7\r\n  <select class="item-7" name="head7">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<section class="head-select">\r\n  Header #8\r\n  <select class="item-8" name="head8">\r\n    <option value="home">Home</option>\r\n    <option value="videos">Porn Videos</option>\r\n    <option value="categories">Categories</option>\r\n    <option value="pornstars">Pornstars</option>\r\n    <option value="gifs">Photos & Gifs</option>\r\n    <option value="recommended">Recommended</option>\r\n    <option value="favorites">Favorites</option>\r\n    <option value="custom">Custom URL</option>\r\n  </select>\r\n</section>\r\n<button class="header_reset" type="button">Defaults</button>\r\n<input class="magicph-url rm" name="h1_link" placeholder="/">\r\n<input class="magicph-url rm" name="h2_link" placeholder="/">\r\n<input class="magicph-url rm" name="h3_link" placeholder="/">\r\n<input class="magicph-url rm" name="h4_link" placeholder="/">\r\n<input class="magicph-url rm" name="h5_link" placeholder="/">\r\n<input class="magicph-url rm" name="h6_link" placeholder="/">\r\n<input class="magicph-url rm" name="h7_link" placeholder="/">\r\n<input class="magicph-url rm" name="h8_link" placeholder="/">\r\n\r\n<input class="magicph-name rm" name="h1_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h2_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h3_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h4_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h5_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h6_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h7_link" placeholder="Custom name...">\r\n<input class="magicph-name rm" name="h8_link" placeholder="Custom name...">'},"./js/api-webext.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});const n="undefined"==typeof browser?chrome:browser,s={debug:!0,altplayers:"none",seektime:4,autojump:!1,autoscroll:!0,blurimg:!1,comments:!1,topbutton:!0,sidebar:!0,favorites:"",blacklist:"none",headerOrder:["home","videos","categories","pornstars","gifs","recommended","favorites"],headerLinks:{url:{h1_link:"/",h2_link:"/",h3_link:"/",h4_link:"/",h5_link:"/",h6_link:"/",h7_link:"/",h8_link:"/"},name:{h1_link:"/",h2_link:"/",h3_link:"/",h4_link:"/",h5_link:"/",h6_link:"/",h7_link:"/",h8_link:"/"}}},o={getItem(e){n.storage.local.get(s,e)},getSync(e){n.storage.sync.get(s,e)},getURL:e=>(n.runtime.getURL(e),e),setItem:e=>(n.storage.local.set(e),e),setSync:e=>(n.storage.sync.set(e),e)}},"./js/api.js":(e,t,a)=>{a.r(t),a.d(t,{mph:()=>n});const n={ael:(e=document,t,a)=>e.addEventListener(t,a),async check(e){for(;null===e;)await new Promise((e=>requestAnimationFrame(e)));return e},create(e,t,a){let n=document.createElement(e);return a&&(n.type=a),t&&(n.className=t),n},delay:e=>new Promise((t=>setTimeout(t,e))),err(...e){console.error("[%cMagicPH%c] %cERROR","color: rgb(255,153,0);","","color: rgb(249, 24, 128);",...e)},getItem:e=>localStorage.getItem(e),async getURL(e){let t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),a=await t.json();return Promise.resolve(a)},halt(e){e.preventDefault(),e.stopPropagation()},info(...e){console.info("[%cMagicPH%c] %cINF","color: rgb(255,153,0);","","color: rgb(0, 186, 124);",...e)},inject(e){let t,a=document;t=this.create("script",null,"text/javascript"),t.innerHTML=e,(a.head||a.documentElement||a).appendChild(t),t&&t.remove()},log(...e){console.log("[%cMagicPH%c] %cDBG","color: rgb(255,153,0);","","color: rgb(255, 212, 0);",...e)},observe(e,t,a={subtree:!0,childList:!0}){let n=new MutationObserver(t);return t([],n),n.observe(e,a),n},async query(e,t=document){for(;null===t.querySelector(e);)await new Promise((e=>requestAnimationFrame(e)));return t.querySelector(e)},removeItem:e=>localStorage.removeItem(e),setItem:(e,t)=>localStorage.setItem(e,t),scrollnumber:/view_video.php/.test(window.location.href)?400:101}},"./js/general.js":(e,t,a)=>{a.r(t),a.d(t,{check:()=>o});const n=(e,t=document)=>t.querySelector(e),s=document.location.href,o={community:"/user/discover"==document.location.pathname,channel:n("#channelsProfile"),category:/categories/.test(s),favorites:/magicph-favorites/.test(s),home:"/"==document.location.pathname,gay:/gay/.test(s),gif:/gifs/.test(s)||/gif/.test(s),lo:n("body.logged-out"),model:n("div.amateurModel"),new:n("#headerSearchWrapperFree"),premium:n(".premiumUser"),pstar:/pornstars/.test(s),user:n("#profileContent"),video:/view_video.php/.test(s),recommended:"/recommended"===document.location.pathname}},"./js/header.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var n=a("./html/header.html"),s=a("./js/api.js"),o=a("./js/general.js"),i=a("./js/querySelector.js"),r=a("./js/api-webext.js");const l=function(){try{const e=o.check.gay?"/gay/":"/",t=(0,i.qs)("ul#headerMainMenu"),a={headerOrder:["home","videos","categories","pornstars","gifs","recommended","favorites"]};let l=s.mph.create("li","menu customize"),c=s.mph.create("a","customize-header js-topMenuLink","button"),p={homA:`<a href="${e}" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Home</span><span class="activeLine"></span></span></a>`,homB:`<a href="${e}" class="js-topMenuLink"><span class="itemName">Home</span></a>`,vidA:`<a href="${e}video?o=tr&hd=1" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Porn Videos</span><span class="activeLine"></span></span></a>`,vidB:`<a href="${e}video?o=tr&hd=1" class="js-topMenuLink"><span class="itemName">Porn Videos</span></a>`,catA:`<a href="${e}categories?o=al" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Categories</span><span class="activeLine"></span></span></a>`,catB:`<a href="${e}categories?o=al" class="js-topMenuLink"><span class="itemName">Categories</span></a>`,porA:`<a href="${e}pornstars?performerType=pornstar" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Pornstars</span><span class="activeLine"></span></span></a>`,porB:`<a href="${e}pornstars?performerType=pornstar" class="js-topMenuLink"><span class="itemName">Pornstars</span></a>`,gifA:`<a href="${e}gifs?o=tr" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Photos & Gifs</span><span class="activeLine"></span></span></a>`,gifB:`<a href="${e}gifs?o=tr" class="js-topMenuLink"><span class="itemName">Photos & Gifs</span></a>`,comA:`<a href="/user/discover${e}" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Community</span><span class="activeLine"></span></span></a>`,comB:`<a href="/user/discover${e}" class="js-topMenuLink"><span class="itemName">Community</span></a>`,recA:`<a href="${e}recommended" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,recB:`<a href="${e}recommended" class="js-topMenuLink"><span class="itemName">Recommended</span></a>`,favA:'<a href="/magicph-favorites" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Favorites</span><span class="activeLine"></span></span></a>',favB:'<a href="/magicph-favorites" class="js-topMenuLink"><span class="itemName">Favorites</span></a>'},m={home:o.check.home?p.homA:p.homB,videos:/video/.test(document.location.href)?p.vidA:p.vidB,categories:o.check.category?p.catA:p.catB,pornstars:o.check.pstar?p.porA:p.porB,gifs:o.check.gif?p.gifA:p.gifB,community:o.check.community?p.comA:p.comB,recommended:o.check.recommended?p.recA:p.recB,favorites:o.check.favorites?p.favA:p.favB,custom:'<a href="" class="js-topMenuLink"><span class="itemName">custom url</span></a>'},d={recommended:s.mph.create("li","menu js-menu item-7 recommended"),favorites:s.mph.create("li","menu js-menu item-8 fav"),custom:s.mph.create("li","menu js-menu item-9")};r.default.getItem((e=>{s.mph.query("body").then((()=>{let o=s.mph.create("form","magicph_customize");o.innerHTML=n.default,(0,i.qs)(".magic-customize").append(o);let p=()=>{l.id="menuItem99",c.title="Customize Header",c.innerHTML='<span class="itemName">customize (wip)</span>',s.mph.query("ul#headerMainMenu").then((e=>{e.appendChild(l),l.appendChild(c),s.mph.ael(c,"click",(()=>{(0,i.qs)(".wrapper").classList.remove("blur"),(0,i.qs)("html").classList.remove("magicFreeze"),(0,i.qs)(".navbackground").setAttribute("style","width: 100%"),(0,i.qs)(".magic-customize").setAttribute("style","display: grid;")}))}))},u=(0,i.qsA)("section.head-select > select");d.recommended.id="menuItem7",d.recommended.innerHTML=m.recommended,d.favorites.id="menuItem8",d.favorites.innerHTML=m.favorites,t.append(d.recommended,d.favorites),u.forEach(((t,a)=>{t.value=e.headerOrder[a],"custom"===t.value&&((0,i.qsA)(".magicph-name")[a].classList.remove("rm"),(0,i.qsA)(".magicph-url")[a].classList.remove("rm")),s.mph.ael(t,"change",(t=>{try{let n=t.target,o=n.className;"custom"!==n.value&&((0,i.qs)(".magicph-name").classList.add("rm"),(0,i.qs)(".magicph-url").classList.add("rm")),(0,i.qs)(`#headerMainMenu > .${o}`).innerHTML=`${m[n.value]}`,e.headerOrder.splice(a,a,n.value),s.mph.log(e.headerOrder),r.default.setItem(e)}catch(e){s.mph.err(e)}}))})),p(),s.mph.query("button.header_reset").then((t=>{s.mph.ael(t,"click",(()=>{e.headerOrder=a.headerOrder,r.default.setItem(e),e.headerOrder.forEach(((e,t)=>{(0,i.qs)(`#headerMainMenu > .${u[t].className}`).innerHTML=`${m[e]}`,u[t].value=a.headerOrder[t]})),p()}))}))}))}))}catch(e){s.mph.err(e)}}},"./js/querySelector.js":(e,t,a)=>{a.r(t),a.d(t,{qs:()=>s,qsA:()=>n});const n=(e,t=document)=>t.querySelectorAll(e),s=(e,t=document)=>t.querySelector(e)}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{a.r(n);var e=a("./js/header.js"),t=a("./js/api.js"),s=a("./js/general.js"),o=a("./js/querySelector.js"),i=a("./js/api-webext.js");const r=t.mph.create("div","magic-customize"),l=(0,o.qsA)(".pagination3")[0],c=async(e,a,n)=>{await(async e=>{let t=await fetch(e),a=await t.text();return Promise.resolve(a)})(`https://${e}`).then((s=>{let i=(new DOMParser).parseFromString(s,"text/html").documentElement,r=(0,o.qs)(a,i),l="none";if((0,o.qs)(`.magic-popup > .${n} > ${a}`)||((0,o.qs)(`.magic-popup > .${n}`).innerHTML=r.outerHTML),("home"==n||"categories"==n||"recommend"==n)&&(l="true"),"none"!==l&&(0,o.qsA)("img.lazy").forEach((e=>{e.src.includes("data:image/gif;base64,")&&(e.src=e.dataset.thumb_url)})),"categories"!==n){let s=(0,o.qs)(`.${n} > ${a}`),i=()=>{s.scrollTop>t.mph.scrollnumber?((0,o.qsA)(".pagination3")[0].children[0].classList.add("top"),(0,o.qsA)(".pagination3")[0].children[1].classList.add("top")):((0,o.qsA)(".pagination3")[0].children[0].classList.remove("top"),(0,o.qsA)(".pagination3")[0].children[1].classList.remove("top"))};s.removeEventListener("scroll",i),t.mph.ael(s,"scroll",i),((e,a)=>{let n=(0,o.qs)(".pagination3 > .pjump > input");t.mph.ael(n,"change",(n=>{t.mph.halt(n);let s=`${e}/video?page=${n.target.value}`;return"home"===a?((0,o.qs)(".magic-popup > div.home").innerHTML="",s=`${e}/video?page=${n.target.value}`,c(`${s}`,".sectionWrapper","home")):((0,o.qs)(".magic-popup > div.recommend").innerHTML="",s=`${e}?page=${n.target.value}`,c(`${s}`,"ul#recommendedListings","recommend"))}))})(e,n)}}))};t.mph.ael(window,"load",(()=>{try{i.default.getItem((async a=>{let n=t.mph.create("div","sidenav"),p=t.mph.create("div","magic-popup"),m=t.mph.create("a","magiclogo","button"),d=t.mph.create("input","magicTop","button"),u=t.mph.create("input","magicCenter","button"),h=t.mph.create("div","navbackground"),v=t.mph.observe(document.body,(()=>{(0,o.qsA)("div.phimage").forEach((e=>{if(a.blurimg&&!s.check.favorites&&!e.classList.contains("blur")){let t=e=>{(0,o.qsA)(e).forEach((e=>{e.classList.add("blur")}))};e.classList.add("blur"),(0,o.qs)("img.js-menuSwap")&&t("img.js-menuSwap"),(0,o.qs)("li > a > img.lazy")&&t("li > a > img.lazy"),(0,o.qs)(".largeThumb")&&t(".largeThumb"),(0,o.qs)(".playlist-thumb")&&t(".playlist-thumb"),(0,o.qs)('a[data-mxptype="Category"] > img')&&t('a[data-mxptype="Category"] > img'),(0,o.qs)("#videoElementPoster")&&t("#videoElementPoster"),(0,o.qs)(".mgp_videoPoster")&&t(".mgp_videoPoster"),(0,o.qs)(".lazyVideo")&&t(".lazyVideo"),(0,o.qs)("a.orangeButton > img")&&(0,o.qs)("a.orangeButton > img").classList.remove("blur"),(0,o.qs)("img.catIcon")&&(0,o.qs)("img.catIcon").classList.remove("blur")}})),(0,o.qsA)("li > .wrap > .phimage").forEach((e=>{let n=t.mph.create("div","blur-btn"),s=t.mph.create("button","blur-trigger","button"),o=a.blurimg?"Show":"Blur";s.innerText=o,n.prepend(s),t.mph.ael(s,"click",(e=>{t.mph.halt(e),e.target.textContent.includes("Blur")?(e.target.parentElement.nextElementSibling.classList.add("blur"),e.target.innerText="Show"):(e.target.parentElement.nextElementSibling.classList.remove("blur"),e.target.innerText="Blur")})),!e.previousElementSibling&&e.before(n),t.mph.ael(e,"mouseenter",(e=>{e.target.classList.remove("blur")})),t.mph.ael(e,"mouseleave",(e=>{"Blur"!==e.target.previousElementSibling.children[0].innerText&&e.target.classList.add("blur")}))}))})),g=async e=>{t.mph.halt(e),window.open(e.target.parentElement.parentElement.nextElementSibling.href,"_blank")},b=e=>{var a,n,s;t.mph.halt(e),a=e.target,n="Remove",s="Undo",a.innerText===n?(a.parentElement.previousElementSibling.classList.add("rm"),a.parentElement.parentElement.parentElement.classList.add("marked"),a.parentElement.parentElement.nextElementSibling.classList.add("rm"),a.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("rm"),a.innerText=s):(a.parentElement.previousElementSibling.classList.remove("rm"),a.parentElement.parentElement.parentElement.classList.remove("marked"),a.parentElement.parentElement.nextElementSibling.classList.remove("rm"),a.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.remove("rm"),a.innerText=n)},f=()=>{let e=(0,o.qsA)("button.download-trigger");(0,o.qsA)("button.remove-trigger").forEach(((a,n)=>{a.removeEventListener("click",b),t.mph.ael(a,"click",b),e[n].removeEventListener("click",g),t.mph.ael(e[n],"click",g)})),a.favorites=(0,o.qs)(".magic-popup > .favorites").innerHTML,i.default.setItem(a)};d.value="Top",u.value="Recenter",t.mph.ael(d,"click",(e=>(t.mph.halt(e),window.scrollTo(0,101)))),t.mph.ael(u,"click",(e=>(t.mph.halt(e),window.scrollTo(0,101)))),a.sidebar&&(()=>{let e=(0,o.qs)(".gayLayout")?"/gay/":"/";(0,o.qs)(".magiclogo")??(()=>{let e=(0,o.qs)(".logo > .logoWrapper > a > img").cloneNode(!0);(0,o.qs)("#headerContainer > .logo").append(m),m.append(e)})(),p.innerHTML='<div id="popupContainer" class="home"></div>\n          <div id="popupContainer" class="categories"></div>\n          <div id="popupContainer" class="recommend"></div>\n          <div id="popupContainer" class="taste"></div>\n          <div id="popupContainer" class="favorites"></div>\n          <div id="popupContainer" class="brws_cfg">\n            <form class="magicph_cfg">\n              <section class="select">\n                Alternative player\n                <select name="altplayers">\n                  <option value="none">Default</option>\n                  <option disabled="" value="plyr">Plyr</option>\n                </select>\n              </section>\n              <section class="select">\n                <label>\n                  <span>Player seek time</span>\n                  <input type="number" name="seektime" id="seektime" placeholder="Player Seek Time" />\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>Auto "Jump to"</span>\n                  <div class="switch">\n                    <input type="checkbox" name="autojump" id="autojump" />\n                    <label for="autojump"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>Scroll on load</span>\n                  <div class="switch">\n                    <input type="checkbox" name="autoscroll" id="autoscroll" />\n                    <label for="autoscroll"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>Blur thumbnails</span>\n                  <div class="switch">\n                    <input type="checkbox" name="blurimg" id="blurimg" />\n                    <label for="blurimg"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>Comment section</span>\n                  <div class="switch">\n                    <input type="checkbox" name="comments" id="comments" />\n                    <label for="comments"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>"Top" button</span>\n                  <div class="switch">\n                    <input type="checkbox" name="topbutton" id="topbutton" />\n                    <label for="topbutton"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="checkbox">\n                <label>\n                  <span>Sidebar</span>\n                  <div class="switch">\n                    <input type="checkbox" name="sidebar" id="sidebar" />\n                    <label for="sidebar"></label>\n                  </div>\n                </label>\n              </section>\n              <section class="select">\n              <span>[WIP] "Jump to" Blacklist</span>\n              <select name="blacklist">\n                <option value="none">None</option>\n                <option value="Footjob">Footjob</option>\n              </select>\n            </section>\n            <section class="checkbox">\n              <label>\n                <span>[WIP] Console logs</span>\n                <div class="switch">\n                  <input disabled="" type="checkbox" name="debug" id="debug" />\n                  <label for="debug"></label>\n                </div>\n              </label>\n            </section>\n            </form>\n          </div>\n          <div class="pagination3">\n            <ul class="firstPage">\n              <li class="page_current alpha"><span class="greyButton">1</span></li>\n              <li class="page_number">\n                <a class="greyButton" href="/video?page=2">2</a>\n              </li>\n              <li class="page_number">\n                <a class="greyButton" href="/video?page=3">3</a>\n              </li>\n              <li class="page_number">\n                <a class="greyButton" href="/video?page=4">4</a>\n              </li>\n              <li class="page_number">\n                <a class="greyButton" href="/video?page=5">5</a>\n              </li>\n              <li class="page_next_set">\n                <a class="greyButton" href="/video?page=10">10</a>\n              </li>\n              <li class="page_next omega">\n                <a href="/video?page=2" class="orangeButton"\n                  >Next\n                  <img class="pagination_arrow_right" src="https://ei.phncdn.com/www-static/images/rightArrow.png" alt="Right Arrow" title=""\n                /></a>\n              </li>\n            </ul>\n            <div class="pjump">\n              <input id="pageInput" type="number" name="pageJump" placeholder="Jump to page" value="">\n            </div>\n        </div>',n.style="width 0%",n.innerHTML='<a id="sidebar" class="magic1">Home</a><a id="sidebar" class="magic2">Blacklist</a><a id="sidebar" class="magic3">Recommended</a><a id="sidebar" class="magic4">Taste Profile(WIP)</a><a id="sidebar" class="magic5">Favorites</a><a id="sidebar" class="magic6">Config</a><a id="sidebar" class="magic7"></a><a id="sidebar" class="magic999">Exit ⟵</a>',document.body.prepend(n,r,d,p),document.body.append(h);let s=(0,o.qs)("form.magicph_cfg");for(let e in a)e in s.elements&&("checkbox"==s.elements[e].type?s.elements[e].checked=a[e]:s.elements[e].value=a[e]);t.mph.ael(s,"change",(e=>{let t=e.target;"checkbox"==t.type?a[t.name]=t.checked:a[t.name]=t.value})),t.mph.ael(m,"click",(()=>{h.style.width="100%",(0,o.qs)(".sidenav").setAttribute("style","width: 20% !important;"),(0,o.qs)(".wrapper").classList.toggle("blur"),(0,o.qs)(".magic-popup").classList.remove("open"),(0,o.qs)("html").classList.toggle("magicFreeze")}));let i=(0,o.qsA)(".magic-popup > #popupContainer"),u=(0,o.qsA)(".sidenav > a#sidebar");t.mph.ael(h,"click",(()=>{(0,o.qs)(".magic-customize").setAttribute("style","display: none;"),(0,o.qs)(".sidenav").setAttribute("style","width: 0%;"),(0,o.qs)(".magic-popup").classList.remove("open"),(0,o.qs)(".wrapper").classList.toggle("blur"),h.style.width="0%",i.forEach((e=>{e.setAttribute("style","display: none;")})),(0,o.qs)(".pjump > input").value="",(0,o.qsA)(".top").forEach((e=>{e.classList.remove("top")})),(0,o.qsA)(".marked").forEach((e=>{e.remove()})),(0,o.qs)("html").classList.remove("magicFreeze"),f()})),u.forEach((e=>{t.mph.ael(e,"click",(()=>{i.forEach((e=>{e.setAttribute("style","display: none;")})),l.children[0].classList.remove("top"),l.children[1].classList.remove("top")}))})),t.mph.ael((0,o.qs)(".magic1"),"click",(()=>{(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%",(0,o.qs)(".magic-popup > div.home").setAttribute("style","display: block;"),c(`${document.location.host}`,".frontListingWrapper","home")})),t.mph.ael((0,o.qs)(".magic2"),"click",(()=>{(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%"})),t.mph.ael((0,o.qs)(".magic3"),"click",(()=>{(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%",(0,o.qs)(".magic-popup > div.recommend").setAttribute("style","display: block;"),c(`${document.location.host}${e}recommended`,"ul.recommendedContainerLoseOne","recommend")})),t.mph.ael((0,o.qs)(".magic4"),"click",(()=>{(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%",(0,o.qs)(".magic-popup > div.taste").setAttribute("style","display: block;"),c(`${document.location.host}/recommended/taste`,".sectionWrapper","taste")})),t.mph.ael((0,o.qs)(".magic5"),"click",(()=>{(0,o.qs)(".magic-popup > div.favorites").setAttribute("style","display: grid;"),(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%",f()})),t.mph.ael((0,o.qs)(".magic6"),"click",(()=>{(0,o.qs)(".magic-popup").classList.add("open"),h.style.width="100%",(0,o.qs)(".magic-popup > div.brws_cfg").setAttribute("style","display: block !important;")})),t.mph.ael((0,o.qs)(".magic999"),"click",(()=>{(0,o.qsA)(".top").forEach((e=>{e.classList.remove("top")})),(0,o.qsA)(".marked").forEach((e=>{e.remove()})),(0,o.qs)(".wrapper").classList.toggle("blur"),(0,o.qs)(".sidenav").setAttribute("style","width: 0%;"),(0,o.qs)(".magic-popup").classList.remove("open"),h.style.width="0%",(0,o.qs)(".pjump > input").value="",(0,o.qs)("html").classList.toggle("magicFreeze"),f()}))})(),a.autoscroll&&window.scrollTo(0,101),!a.topbutton&&d.classList.add("rm"),s.check.video&&(document.body.prepend(u),a.comments?(0,o.qs)("#cmtWrapper").classList.remove("rm"):(0,o.qs)("#cmtWrapper").classList.add("rm"),"none"!==a.altplayers?t.mph.setItem("altplayers",a.altplayers):(t.mph.getItem("altplayers")&&t.mph.removeItem("altplayers"),a.autojump?t.mph.setItem("autojump",a.autojump):t.mph.getItem("autojump")&&t.mph.removeItem("autojump"),a.blacklist?t.mph.setItem("blacklist",a.blacklist):t.mph.getItem("blacklist")&&t.mph.removeItem("blacklist")),t.mph.setItem("seektime",a.seektime),t.mph.query(".video-wrapper").then((()=>{let e=(0,o.qs)("h1.title > span").innerHTML,a=(0,o.qsA)(".favorites > .wrap > .title > a"),n=t.mph.create("div","wrap"),s=t.mph.create("div","magicph-fav icon-wrapper tooltipTrig");n.innerHTML=`<div class="mph-btns">\n            <div class="download-btn">\n            <button class="download-trigger" type="button">Download</button>\n            </div>\n            <div class="remove-btn">\n            <button class="remove-trigger" type="button">Remove</button>\n            </div>\n            </div>\n            <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>\n            <img src='${(0,o.qs)("img#videoElementPoster").src}'></a>\n            <span class="title">\n            <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>${e}</a>\n          </span>`,s.setAttribute("data-title","[MagicPH] Add to Favorites"),s.innerHTML='<i class="ph-icon-favorite"><span></span></i>',(0,o.qs)(".allActionsContainer").prepend(s),a.forEach((t=>{t.textContent.includes(e)&&(s.setAttribute("data-title","[MagicPH] Remove from Favorites"),s.children[0].setAttribute("style","color: #f90;"))})),t.mph.ael(s,"click",(t=>{let i=t.target.parentElement;i.dataset.title.includes("[MagicPH] Remove from Favorites")?(s.children[0].setAttribute("style",""),s.children[0].children[0].innerHTML="Removed from Favorites",i.dataset.title="[MagicPH] Add to Favorites",a.forEach(((t,a)=>{if(t.textContent.includes(e)){let e=(0,o.qsA)("button.remove-trigger")[a];e.parentElement.previousElementSibling.classList.add("rm"),e.parentElement.parentElement.parentElement.classList.add("marked"),e.parentElement.parentElement.nextElementSibling.classList.add("rm"),e.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("rm"),e.innerText="Undo"}}))):((0,o.qs)(".magic-popup > .favorites").prepend(n),s.children[0].setAttribute("style","color: #f90;"),s.children[0].children[0].innerHTML="Saved to Favorites",i.dataset.title="[MagicPH] Remove from Favorites"),f(),s.children[0].children[0].innerHTML=""}))}))),""!==a.favorites?(0,o.qs)(".magic-popup > .favorites").innerHTML=a.favorites:a.favorites=(0,o.qs)(".magic-popup > .favorites").innerHTML,v.disconnect(),(0,e.default)()}))}catch(e){t.mph.err(e)}}))})()})();
//# sourceMappingURL=start.js.map