'use strict';
import {mph} from './api.js';
import {qs,qsA} from "./querySelector.js";
import webext from './api-webext.js';
import loadHeader from "./header.js";

const win = self ?? window,
doc = win.document,
header = mph.create("div","magic-customize"),
pagination = qsA(".pagination3")[0],
getPage = async (link) => {
  let finalURL = !link.includes("https://") ? `https://${link}` : link,
  res = await fetch(finalURL),
  r = await res.text();
  return Promise.resolve(r);
},
loadPage = (url, type) => {
  let pageInput = qs(".pagination3 > .pjump > input"),
  page = qsA(".pagination3 > ul")[0];
  mph.ael(pageInput,"change", (e) => {
    mph.halt(e);
    let link = `${url}/video?page=${e.target.value}`;
    if(type === "home") {
      qs(".magic-popup > div.home").innerHTML = "";
      link = `${url}/video?page=${e.target.value}`;
      return load(`${link}`,".sectionWrapper","home");
    } else {
      qs(".magic-popup > div.recommend").innerHTML = "";
      link = `${url}?page=${e.target.value}`;
      return load(`${link}`,"ul#recommendedListings","recommend");
    };
  });
  for (let i = 0; i < page.children.length; i++) {
    mph.ael(page.children[i],"click", async (e) => {
      mph.halt(e);
      await load(`${e.target.href}`,".sectionWrapper","home");
    })
  };
},
load = async (url,selElement,name) => {
  await getPage(url).then((text) => {
    let parser = new DOMParser(),
    htmlDocument = parser.parseFromString(text, "text/html"),
    selected = htmlDocument.documentElement,
    section = qs(selElement, selected),
    thumb = "none";
    if(!qs(`.magic-popup > .${name} > ${selElement}`)) {
      qs(`.magic-popup > .${name}`).innerHTML = section.outerHTML;
    };
    (name == "home" || name == "categories" || name == "recommend") ? (thumb = "true") : false;
    if(thumb !== "none") {
      mph.fe("img.lazy",(i) => {
        if(i.src.includes("data:image/gif;base64,")) {
          i.src = i.dataset.thumb_url;
        }
      })
    };
    if(name !== "categories") {
      let scroller = qs(`.${name} > ${selElement}`),
      scrollfn = () => {
        if(scroller.scrollTop > mph.scrollnumber) {
          qsA(".pagination3")[0].children[0].classList.add("top");
          qsA(".pagination3")[0].children[1].classList.add("top");
        } else {
          qsA(".pagination3")[0].children[0].classList.remove("top");
          qsA(".pagination3")[0].children[1].classList.remove("top");
        }
      };
      scroller.removeEventListener("scroll", scrollfn);
      mph.ael(scroller,"scroll", scrollfn);
      loadPage(url, name);
    };
  });
},
loadConfig = () => {
  try {
    webext.getItem(async (config) => {
      if(mph.html.classList.contains("ios")) {return false};
      let vidTitle,favLocation,logoImg,headerContainer;
      if(mph.find.ph) {
        logoImg = qs('.logo > .logoWrapper > a > img').cloneNode(true);
        headerContainer = qs("#headerContainer > .logo");
      };
      if(mph.find.rt) {
        logoImg = qs('#logo_wrap > a > img').cloneNode(true);
        headerContainer = qs("#logo_wrap");
      };
      if(mph.find.tz) {
        logoImg = qs('.mainmenuBar > a > img').cloneNode(true);
        headerContainer = qs('.mainmenuBar');
      };
      if(mph.find.t8) {
        logoImg = qs('a#logo > img').cloneNode(true);
        headerContainer = qs(".logo-box.relative");
      };
      if(mph.find.yp) {
        logoImg = qs('a > img.js_logo_img').cloneNode(true);
        headerContainer = qs(".headerContainer");
      };
      // config.debug ? (mpg.cache = true) : false;
      let sidebar = mph.create("div","sidenav"),
      magicpopup = mph.create("div","magic-popup"),
      logo = mph.create("a","magiclogo","button"),
      mTop = mph.create("input","magicTop","button"),
      mCenter = mph.create("input","magicCenter","button"),
      nav = mph.create("div","navbackground"),
      handleBtns = (t,btnText,btnFinal) => {
        if(t.innerText === btnText) {
          t.parentElement.previousElementSibling.classList.add("rm");
          t.parentElement.parentElement.parentElement.classList.add("marked");
          t.parentElement.parentElement.nextElementSibling.classList.add("rm");
          t.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("rm");
          t.innerText = btnFinal;
        } else {
          t.parentElement.previousElementSibling.classList.remove("rm");
          t.parentElement.parentElement.parentElement.classList.remove("marked");
          t.parentElement.parentElement.nextElementSibling.classList.remove("rm");
          t.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.remove("rm");
          t.innerText = btnText;
        }
      },
      downloadfn = async (e) => {
        mph.halt(e);
        self.open(e.target.parentElement.parentElement.nextElementSibling.href, 'MagicPH Downloader', 'width=750,height=650');
      },
      removerfn = (e) => {
        mph.halt(e);
        handleBtns(e.target,"Remove","Undo");
      },
      saveFav = () => {
        mph.fe("button.remove-trigger",(item,i) => {
          item.removeEventListener("click", removerfn);
          mph.ael(item,"click", removerfn);
          mph.qa("button.download-trigger").then(
            (btn) => {
              btn[i].removeEventListener("click", downloadfn);
              mph.ael(btn[i],"click", downloadfn);
            })
        });
        config.favorites = qs(".magic-popup > .favorites").innerHTML;
        webext.setItem(config);
      },
      phLogo = () => {
        let find = !qs(".gayLayout") ? '/' : '/gay/',
        logoCreate = () => {
          headerContainer.append(logo);
          logo.append(logoImg);
          if(mph.find.yp) {
            qs('a > img.js_logo_img').classList.add("rm");
          };
          if(mph.find.tz || mph.find.t8) {
            qs('a#logo').classList.add("rm");
            logo.id = "logo";
          };
          // if(mph.find.rt) {
          //   logo.id = "redtube_logo";
          //   mph.delay(5000).then(() => {
          //     qs('a#redtube_logo').classList.add("rm");
          //   });
          // };
        };
        qs(".magiclogo") ?? logoCreate();
    //     <section class="checkbox">
    //   <label>
    //     <span></span>
    //     <div class="switch">
    //       <input type="checkbox" name=""/>
    //       <label for=""></label>
    //     </div>
    //   </label>
    // </section>
        magicpopup.innerHTML = `<div id="popupContainer" class="home"></div>
  <div id="popupContainer" class="blacklist">
  <form class="magicph_bl">
  <section class="checkbox">
    <label>
      <span>Blowjob</span>
      <div class="switch">
        <input type="checkbox" name="blowjob"/>
        <label for="blowjob"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Cowgirl</span>
      <div class="switch">
        <input type="checkbox" name="cowgirl"/>
        <label for="cowgirl"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Cumshot</span>
      <div class="switch">
        <input type="checkbox" name="cumshot"/>
        <label for="cumshot"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Doggystyle</span>
      <div class="switch">
        <input type="checkbox" name="doggystyle"/>
        <label for="doggystyle"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Face Sitting</span>
      <div class="switch">
        <input type="checkbox" name="facesitting"/>
        <label for="facesitting"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Facial</span>
      <div class="switch">
        <input type="checkbox" name="facial"/>
        <label for="facial"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Fingering</span>
      <div class="switch">
        <input type="checkbox" name="fingering"/>
        <label for="fingering"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Footjob</span>
      <div class="switch">
        <input type="checkbox" name="footjob"/>
        <label for="footjob"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Handjob</span>
      <div class="switch">
        <input type="checkbox" name="handjob"/>
        <label for="handjob"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Missionary</span>
      <div class="switch">
        <input type="checkbox" name="missionary"/>
        <label for="missionary"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Pussy Licking</span>
      <div class="switch">
        <input type="checkbox" name="pussylicking"/>
        <label for="pussylicking"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Reverse Cowgirl</span>
      <div class="switch">
        <input type="checkbox" name="reversecowgirl"/>
        <label for="reversecowgirl"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Scissoring</span>
      <div class="switch">
        <input type="checkbox" name="scissoring"/>
        <label for="scissoring"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Sex</span>
      <div class="switch">
        <input type="checkbox" name="sex"/>
        <label for="sex"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Titty Fucking</span>
      <div class="switch">
        <input type="checkbox" name="tittyfucking"/>
        <label for="tittyfucking"></label>
      </div>
    </label>
  </section>
  <section class="checkbox">
    <label>
      <span>Toy</span>
      <div class="switch">
        <input type="checkbox" name="toy"/>
        <label for="toy"></label>
      </div>
    </label>
  </section>
  </form>
  </div>
  <div id="popupContainer" class="recommend"></div>
  <div id="popupContainer" class="taste"></div>
  <div id="popupContainer" class="favorites"></div>
  <div id="popupContainer" class="brws_cfg">
    <form class="magicph_cfg">
      <section class="select">
        Alternative player
        <select name="altplayers">
          <option value="none">Default</option>
          <option disabled="" value="plyr">Plyr</option>
        </select>
      </section>
      <section class="select">
        <label>
          <span>Player seek time</span>
          <input type="number" name="seektime" id="seektime" placeholder="Player Seek Time" />
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>Auto "Jump to"</span>
          <div class="switch">
            <input type="checkbox" name="autojump" id="autojump" />
            <label for="autojump"></label>
          </div>
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>Scroll on load</span>
          <div class="switch">
            <input type="checkbox" name="autoscroll" id="autoscroll" />
            <label for="autoscroll"></label>
          </div>
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>Blur thumbnails</span>
          <div class="switch">
            <input type="checkbox" name="blurimg" id="blurimg" />
            <label for="blurimg"></label>
          </div>
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>Comment section</span>
          <div class="switch">
            <input type="checkbox" name="comments" id="comments" />
            <label for="comments"></label>
          </div>
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>"Top" button</span>
          <div class="switch">
            <input type="checkbox" name="topbutton" id="topbutton" />
            <label for="topbutton"></label>
          </div>
        </label>
      </section>
      <section class="checkbox">
        <label>
          <span>Sidebar</span>
          <div class="switch">
            <input type="checkbox" name="sidebar" id="sidebar" />
            <label for="sidebar"></label>
          </div>
        </label>
      </section>
      <section class="select">
      <span>[WIP] "Jump to" Blacklist</span>
      <select name="blacklist">
        <option value="none">None</option>
        <option value="Footjob">Footjob</option>
      </select>
    </section>
    <section class="checkbox">
      <label>
        <span>[WIP] Console logs</span>
        <div class="switch">
          <input disabled="" type="checkbox" name="debug" id="debug" />
          <label for="debug"></label>
        </div>
      </label>
    </section>
    </form>
  </div>
  <div class="pagination3">
    <ul class="firstPage">
      <li class="page_current alpha"><span class="greyButton">1</span></li>
      <li class="page_number">
        <a class="greyButton" href="/video?page=2">2</a>
      </li>
      <li class="page_number">
        <a class="greyButton" href="/video?page=3">3</a>
      </li>
      <li class="page_number">
        <a class="greyButton" href="/video?page=4">4</a>
      </li>
      <li class="page_number">
        <a class="greyButton" href="/video?page=5">5</a>
      </li>
      <li class="page_next_set">
        <a class="greyButton" href="/video?page=10">10</a>
      </li>
      <li class="page_next omega">
        <a href="/video?page=2" class="orangeButton"
          >Next
          <img class="pagination_arrow_right" src="https://ei.phncdn.com/www-static/images/rightArrow.png" alt="Right Arrow" title=""
        /></a>
      </li>
    </ul>
    <div class="pjump">
      <input id="pageInput" type="number" name="pageJump" placeholder="Jump to page" value="">
    </div>
</div>`;
        sidebar.style = "width 0%";
        sidebar.innerHTML = `<a id="sidebar" class="magic1">Home</a><a id="sidebar" class="magic2">Blacklist</a><a id="sidebar" class="magic3">Recommended</a><a id="sidebar" class="magic4">Taste Profile(WIP)</a><a id="sidebar" class="magic5">Favorites</a><a id="sidebar" class="magic6">Config</a><a id="sidebar" class="magic7"></a><a id="sidebar" class="magic999">Exit ⟵</a>`
        document.body.prepend(sidebar,header,mTop,magicpopup);
        document.body.append(nav);
        let ff = qs("form.magicph_cfg");
        for (let prop in config) {
          prop in ff.elements
            ? ff.elements[prop].type == "checkbox"
              ? (ff.elements[prop].checked = config[prop])
              : (ff.elements[prop].value = config[prop])
            : false;
        };
        mph.ael(ff,"change", (e) => {
          let $el = /** @type {HTMLInputElement} */ (e.target);
          $el.type == "checkbox"
            ? (config[$el.name] = $el.checked)
            : (config[$el.name] = $el.value);
          if(config.blurimg && !mph.find.favorites) {
            mph.html.classList.add("magicBlur");
          } else {
            mph.html.classList.remove("magicBlur");
          };
        });
        mph.ael(logo,"click", () => {
          if(qs("header")) {
            qs("header").style = "z-index: -1 !important;";
          };
          if(qs(".site-wrapper")) {
            qs(".site-wrapper").style = "z-index: -1 !important;";
          };
          nav.style.width = "100%";
          qs(".sidenav").setAttribute("style", "width: 20% !important;");
          if(mph.find.ph) {
            qs(".wrapper").classList.toggle("blur");
          };
          qs(".magic-popup").classList.remove("open");
          mph.html.classList.add("magicFreeze");
        });
        let popups = qsA(".magic-popup > #popupContainer"),
        sidebars = qsA(".sidenav > a#sidebar");
        mph.ael(nav,"click", () => {
          if(qs("header")) {
            qs("header").style = "";
          };
          if(qs(".site-wrapper")) {
            qs(".site-wrapper").style = "";
          };
          qs(".magic-customize").setAttribute("style", "display: none;");
          qs(".sidenav").setAttribute("style", "width: 0%;");
          qs(".magic-popup").classList.remove("open");
          if(mph.find.ph) {
            qs(".wrapper").classList.remove("blur");
          };
          nav.style.width = "0%";
          popups.forEach((item) => {
            item.setAttribute("style", "display: none;");
          });
          qs(".pjump > input").value = "";
          qsA(".top").forEach((t) => {
            t.classList.remove("top");
          });
          qsA(".marked").forEach((m) => {
            m.remove();
          });
          mph.html.classList.remove("magicFreeze");
          saveFav();
        });
        sidebars.forEach((sb) => {
          mph.ael(sb,"click", () => {
            popups.forEach((pops) => {
              pops.setAttribute("style", "display: none;");
            });
            pagination.children[0].classList.remove("top");
            pagination.children[1].classList.remove("top");
          });
        });
        mph.ael(qs(".magic1"),"click", () => {
            qs(".magic-popup").classList.add("open");
            nav.style.width = "100%";
            qs(".magic-popup > div.home").setAttribute("style", "display: block;");
            load(`${document.location.host}`, ".frontListingWrapper", "home");
        });
        mph.ael(qs(".magic2"),"click", () => {
          qs(".magic-popup").classList.add("open");
          nav.style.width = "100%";
          qs(".magic-popup > div.blacklist").setAttribute("style", "display: block !important;");
          //load(`${document.location.host}${find}categories?o=al`, "ul#categoriesListSection", "categories");
        });
        mph.ael(qs(".magic3"),"click", () => {
          qs(".magic-popup").classList.add("open");
          nav.style.width = "100%";
          qs(".magic-popup > div.recommend").setAttribute("style", "display: block;");
          load(`${document.location.host}${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
        });
        mph.ael(qs(".magic4"),"click", () => {
          qs(".magic-popup").classList.add("open");
          nav.style.width = "100%";
          qs(".magic-popup > div.taste").setAttribute("style", "display: block;");
          load(`${document.location.host}/recommended/taste`, ".sectionWrapper", "taste");
        });
        mph.ael(qs(".magic5"),"click", () => {
          qs(".magic-popup > div.favorites").setAttribute("style", "display: grid;");
          qs(".magic-popup").classList.add("open");
          nav.style.width = "100%";
          saveFav();
        });
        mph.ael(qs(".magic6"),"click", () => {
          qs(".magic-popup").classList.add("open");
          nav.style.width = "100%";
          qs(".magic-popup > div.brws_cfg").setAttribute("style", "display: block !important;");
        });
        mph.ael(qs(".magic999"),"click", () => {
          if(qs("header")) {
            qs("header").style = "";
          };
          if(qs(".site-wrapper")) {
            qs(".site-wrapper").style = "";
          };
          qs(".magic-customize").setAttribute("style", "display: none;");
          qs(".sidenav").setAttribute("style", "width: 0%;");
          qs(".magic-popup").classList.remove("open");
          if(mph.find.ph) {
            qs(".wrapper").classList.remove("blur");
          };
          nav.style.width = "0%";
          popups.forEach((item) => {
            item.setAttribute("style", "display: none;");
          });
          qs(".pjump > input").value = "";
          qsA(".top").forEach((t) => {
            t.classList.remove("top");
          });
          qsA(".marked").forEach((m) => {
            m.remove();
          });
          mph.html.classList.remove("magicFreeze");
          saveFav();
          // self.location.reload();
        });
      };
      mTop.value = "Top";
      mCenter.value = "Recenter";
      mph.ael(mTop,"click",(e) => {
        mph.halt(e);
        return self.scrollTo(0, 101);
      });
      mph.ael(mCenter,"click",(e) => {
        mph.halt(e);
        return self.scrollTo(0, 101);
      });
      config.sidebar ? phLogo() : false;
      config.autoscroll ? self.scrollTo(0, 101) : false;
      !config.topbutton ? mTop.classList.add("rm") : false;
      if(config.blurimg && !mph.find.favorites) {
        mph.html.classList.add("magicBlur");
      } else {
        mph.html.classList.remove("magicBlur");
      };
      if(mph.find.video) {
        document.body.prepend(mCenter);
        let ypComments = qs("#videoComments"),
        rtFN = (type) => {
          mph.fe(".tab-block-label",(comment) => {
            if(type === "add") {
              (comment.dataset.tabid === "comments_tab") ? comment.classList.add("rm") : false;
            };
            if(type === "remove") {
              (comment.dataset.tabid === "comments_tab") ? comment.classList.remove("rm") : false;
            };
          })
        };
        if(config.comments) {
          ypComments ? ypComments.classList.remove("rm") : false;
          qs(".tab-block-label") ? rtFN("remove") : false;
          qs("#allComments") ? qs("#allComments").classList.remove("rm") : false;
        } else {
          ypComments ? ypComments.classList.add("rm") : false;
          qs(".tab-block-label") ? rtFN("add") : false;
          qs("#allComments") ? qs("#allComments").classList.add("rm") : false;
        };
        if(config.altplayers !== "none") {
          mph.setItem("altplayers", config.altplayers);
        } else {
          if(mph.getItem("altplayers")) {
            mph.removeItem("altplayers")
          };
          if(config.autojump) {
            mph.setItem("autojump", config.autojump);
          } else {
            if(mph.getItem("autojump")) {
              mph.removeItem("autojump")
            };
          }
          if(config.blacklist) {
            mph.setItem("blacklist", config.blacklist);
          } else {
            if(mph.getItem("blacklist")) {
              mph.removeItem("blacklist")
            };
          };
          mph.setItem("seektime", config.seektime);
        };
        mph.query(".mgp_container").then(() => {
          // if(mph.find.ph) {
          //   phplayer = win.MGP.players[win.MGP.getPlayerIds()];
          //   favLocation = qs(".allActionsContainer");
          // }
          // if(mph.find.rt) {
          //   phplayer = win.MGP.players[`playerDiv_${doc.location.pathname.slice(1)}`];
          //   favLocation = qs(".video_action_wrap");
          // };
          // if(mph.find.tz) {
          //   favLocation = qs(".actionWrapper");
          //   phplayer = win.MGP.players.player;
          // };
          // if(mph.find.t8) {
          //   favLocation = qs(".allActionsContainer");
          //   phplayer = win.MGP.players.flvplayer;
          // };
          // if(mph.find.yp) {
          //   phplayer = win.MGP.players['videoContainer'];
          //   favLocation = qs(".feature-wrapper");
          // };
          // vidTitle = phplayer.settings().mainRoll.title;
          // vidThumb = phplayer.settings().mainRoll.poster;
          if(mph.find.ph) {
            vidTitle = qs("h1.title").innerText;
            favLocation = qs(".allActionsContainer");
          }
          if(mph.find.rt) {
            vidTitle = qs("h1.video_page_title").innerText;
            favLocation = qs(".video_action_wrap");
          };
          if(mph.find.tz) {
            vidTitle = qs("h1.videoTitle").innerText;
            favLocation = qs(".actionWrapper");
          };
          if(mph.find.t8) {
            vidTitle = qs("main > header > div > h1").innerText;
            favLocation = qs(".player-under-btns");
          };
          if(mph.find.yp) {
            vidTitle = qs("h1.videoTitle").innerText;
            favLocation = qs(".feature-wrapper");
          };
          let wrap = mph.create("div","wrap"),
          addFav = mph.create("div","magicph-fav icon-wrapper tooltipTrig");
          wrap.innerHTML = `<div class="mph-btns">
          <div class="download-btn">
          <button class="download-trigger" type="button">Download</button>
          </div>
          <div class="remove-btn">
          <button class="remove-trigger" type="button">Remove</button>
          </div>
          </div>
          <a href='${doc.location.href}'>
          <img src='${qs(".mgp_videoPoster > picture > img").src}'></a>
          <span class="title">
          <a href='${doc.location.href}'>${vidTitle}</a>
          </span>`;
          addFav.setAttribute("title","[MagicPH] Add to Favorites");
          addFav.setAttribute("data-title","[MagicPH] Add to Favorites");
          //https://ei.phncdn.com/www-static/thumbzilla/images/pc/sprite-main.png
          addFav.innerHTML = `<i class="ph-icon-favorite icon-heart rt_icon rt_Menu_Heart" ${(mph.find.tz) ? `style="display: inline-block;width: 26px;height: 28px;background-image: url('https://ei.phncdn.com/www-static/thumbzilla/images/pc/sprite-main.png');background-position: 0 -385px;"` : ""}><span></span></i>`;
          favLocation.prepend(addFav);
          mph.fe(".favorites > .wrap > .title > a",(item) => {
            item.textContent.includes(vidTitle) ? (
              addFav.setAttribute("data-title","[MagicPH] Remove from Favorites"),
              addFav.children[0].setAttribute("style", "color: #f90;")
            ) : false;
          });
          mph.ael(addFav,"click", (e) => {
            let a = e.target.parentElement;
            if(!a.title.includes("[MagicPH] Remove from Favorites")) {
              qs(".magic-popup > .favorites").prepend(wrap);
              addFav.children[0].setAttribute("style", "color: #f90;");
              addFav.children[0].children[0].innerHTML = "Saved to Favorites";
              a.dataset.title = "[MagicPH] Remove from Favorites";
              a.title = "[MagicPH] Remove from Favorites";
            } else {
              addFav.children[0].setAttribute("style", "");
              addFav.children[0].children[0].innerHTML = "Removed from Favorites";
              a.dataset.title = "[MagicPH] Add to Favorites";
              a.title = "[MagicPH] Add to Favorites";
              mph.fe(".favorites > .wrap > .title > a",(item,i) => {
                if(item.textContent.includes(vidTitle)) {
                  let t = mph.qa("button.remove-trigger").then(btn => btn[i]);
                  t.parentElement.previousElementSibling.classList.add("rm");
                  t.parentElement.parentElement.parentElement.classList.add("marked");
                  t.parentElement.parentElement.nextElementSibling.classList.add("rm");
                  t.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("rm");
                  t.innerText = "Undo";
                };
              });
            };
            saveFav();
            // mph.delay(3000);
            addFav.children[0].children[0].innerHTML = "";
          });
        })
      }
      (config.favorites !== "") ? (qs(".magic-popup > .favorites").innerHTML = config.favorites) : (config.favorites = qs(".magic-popup > .favorites").innerHTML);
      loadHeader();
      // mph.delay(800);
    });
  } catch (error) {
    mph.err(error);
  }
};

mph.ael(window,"load",loadConfig);