'use strict';
import {mph} from './api.js';
import {qs,qsA} from "./querySelector.js";
import webext from './api-webext.js';
import loadHeader from "./header.js";

const header = mph.create("div","magic-customize"),
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
      qsA("img.lazy").forEach((i) => {
        if(i.src.includes("data:image/gif;base64,")) {
          i.src = i.dataset.thumb_url;
        }
      });
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
      if(document.documentElement.classList.contains("ios")) {return false};
      // config.debug ? (mpg.cache = true) : false;
      let sidebar = mph.create("div","sidenav"),
      magicpopup = mph.create("div","magic-popup"),
      logo = mph.create("a","magiclogo","button"),
      mTop = mph.create("input","magicTop","button"),
      mCenter = mph.create("input","magicCenter","button"),
      nav = mph.create("div","navbackground"),
      watcher = mph.observe(document.body, () => {
        qsA("div.phimage").forEach((ph) => {
            if(config.blurimg && !mph.find.favorites && !ph.classList.contains("blur")) {
              let blur = (elements) => {
                qsA(elements).forEach((e) => {
                  e.classList.add("blur");
                });
              };
              ph.classList.add("blur");
              if(qs("img.js-menuSwap")) {
                blur("img.js-menuSwap");
              };
              if(qs("li > a > img.lazy")) {
                blur("li > a > img.lazy");
              };
              if(qs(".largeThumb")) {
                blur(".largeThumb");
              };
              if(qs(".playlist-thumb")) {
                blur(".playlist-thumb");
              };
              if(qs('a[data-mxptype="Category"] > img')) {
                blur('a[data-mxptype="Category"] > img');
              };
              if(qs("#videoElementPoster")) {
                blur("#videoElementPoster");
              };
              if(qs(".mgp_videoPoster")) {
                blur(".mgp_videoPoster");
              };
              if(qs(".lazyVideo")) {
                blur(".lazyVideo");
              };
              // if(qs("span.thumb > img.lazy")) {
              //   blur("span.thumb > img.lazy");
              // };
              qs("a.orangeButton > img") ? qs("a.orangeButton > img").classList.remove("blur") : false;
              qs("img.catIcon") ? qs("img.catIcon").classList.remove("blur") : false;
            }
        });
        qsA("li > .wrap > .phimage").forEach((item) => {
            let blurFrame = mph.create("div","blur-btn"),
            blurBtn = mph.create("button","blur-trigger","button"),
            blurName = config.blurimg ? "Show" : "Blur";
            blurBtn.innerText = blurName;
            blurFrame.prepend(blurBtn);
            mph.ael(blurBtn,"click", (e) => {
              mph.halt(e);
              if(e.target.textContent.includes("Blur")) {
                e.target.parentElement.nextElementSibling.classList.add("blur");
                e.target.innerText = "Show";
              } else {
                e.target.parentElement.nextElementSibling.classList.remove("blur");
                e.target.innerText = "Blur";
              };
            });
            !item.previousElementSibling ? item.before(blurFrame) : false;
            mph.ael(item,"mouseenter", (e) => {
              e.target.classList.remove("blur");
            });
            mph.ael(item,"mouseleave", (e) => {
              if(e.target.previousElementSibling.children[0].innerText !== "Blur") {
                e.target.classList.add("blur");
              };
            });
        });
      }),
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
        window.open(e.target.parentElement.parentElement.nextElementSibling.href, 'MagicPH Downloader', 'width=750,height=650');
      },
      removerfn = (e) => {
        mph.halt(e);
        handleBtns(e.target,"Remove","Undo");
      },
      saveFav = () => {
        let downloader = qsA("button.download-trigger"),
        remover = qsA("button.remove-trigger");
        remover.forEach((item,i) => {
          item.removeEventListener("click", removerfn)
          mph.ael(item,"click", removerfn);
          downloader[i].removeEventListener("click", downloadfn)
          mph.ael(downloader[i],"click", downloadfn);
        });
        config.favorites = qs(".magic-popup > .favorites").innerHTML;
        webext.setItem(config);
      },
      phLogo = () => {
        let find = !qs(".gayLayout") ? '/' : '/gay/',
        logoCreate = () => {
          let logoImg = qs('.logo > .logoWrapper > a > img').cloneNode(true);
          qs("#headerContainer > .logo").append(logo)
          logo.append(logoImg);
        };
        qs(".magiclogo") ?? logoCreate();
        magicpopup.innerHTML = `<div id="popupContainer" class="home"></div>
          <div id="popupContainer" class="categories"></div>
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
        });
        mph.ael(logo,"click", () => {
            nav.style.width = "100%";
            qs(".sidenav").setAttribute("style", "width: 20% !important;");
            qs(".wrapper").classList.toggle("blur");
            qs(".magic-popup").classList.remove("open");
            qs("html").classList.toggle("magicFreeze");
        });
        let popups = qsA(".magic-popup > #popupContainer"),
        sidebars = qsA(".sidenav > a#sidebar");
        mph.ael(nav,"click", () => {
          qs(".magic-customize").setAttribute("style", "display: none;");
          qs(".sidenav").setAttribute("style", "width: 0%;");
          qs(".magic-popup").classList.remove("open");
          qs(".wrapper").classList.remove("blur");
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
          qs("html").classList.remove("magicFreeze");
          // $(".favorites > .wrap.marked").remove();
          saveFav();
          // window.location.reload();
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
          qsA(".top").forEach((t) => {
            t.classList.remove("top");
          });
          qsA(".marked").forEach((m) => {
            m.remove();
          });
          qs(".wrapper").classList.toggle("blur");
          qs(".sidenav").setAttribute("style", "width: 0%;");
          qs(".magic-popup").classList.remove("open");
          nav.style.width = "0%";
          qs(".pjump > input").value = "";
          qs("html").classList.toggle("magicFreeze");
          saveFav();
          // window.location.reload();
        });
      };
      mTop.value = "Top";
      mCenter.value = "Recenter";
      mph.ael(mTop,"click",(e) => {
        mph.halt(e);
        return window.scrollTo(0, 101);
      });
      mph.ael(mCenter,"click",(e) => {
        mph.halt(e);
        return window.scrollTo(0, 101);
      });
      config.sidebar ? phLogo() : false;
      config.autoscroll ? window.scrollTo(0, 101) : false;
      !config.topbutton ? mTop.classList.add("rm") : false;
      watcher;
      if(mph.find.video) {
        document.body.prepend(mCenter);
        config.comments ? qs("#cmtWrapper").classList.remove("rm") : qs("#cmtWrapper").classList.add("rm");
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
          }
        };
        mph.setItem("seektime", config.seektime);
        mph.query(".video-wrapper").then(() => {
          let title = qs("h1.title > span").innerHTML,
          checker = qsA(".favorites > .wrap > .title > a"),
          wrap = mph.create("div","wrap"),
          addFav = mph.create("div","magicph-fav icon-wrapper tooltipTrig");
          wrap.innerHTML = `<div class="mph-btns">
            <div class="download-btn">
            <button class="download-trigger" type="button">Download</button>
            </div>
            <div class="remove-btn">
            <button class="remove-trigger" type="button">Remove</button>
            </div>
            </div>
            <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>
            <img src='${qs("img#videoElementPoster").src}'></a>
            <span class="title">
            <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>${title}</a>
          </span>`;
          addFav.setAttribute("data-title","[MagicPH] Add to Favorites");
          addFav.innerHTML = '<i class="ph-icon-favorite"><span></span></i>';
          qs(".allActionsContainer").prepend(addFav);
          checker.forEach((item) => {
            item.textContent.includes(title) ? (
              addFav.setAttribute("data-title","[MagicPH] Remove from Favorites"),
              addFav.children[0].setAttribute("style", "color: #f90;")
            ) : false;
          });
          mph.ael(addFav,"click", (e) => {
            let a = e.target.parentElement;
            if(!a.dataset.title.includes("[MagicPH] Remove from Favorites")) {
              qs(".magic-popup > .favorites").prepend(wrap);
              addFav.children[0].setAttribute("style", "color: #f90;");
              addFav.children[0].children[0].innerHTML = "Saved to Favorites";
              a.dataset.title = "[MagicPH] Remove from Favorites";
            } else {
              addFav.children[0].setAttribute("style", "");
              addFav.children[0].children[0].innerHTML = "Removed from Favorites";
              a.dataset.title = "[MagicPH] Add to Favorites";
              checker.forEach((item,i) => {
                if(item.textContent.includes(title)) {
                  let t = qsA("button.remove-trigger")[i];
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
      watcher.disconnect();
      loadHeader();
      // mph.delay(800);
      // if(qs(".js-menu.categories")) {
      //   mph.ael(qs(".js-menu.categories > a"),"click",() => {
      //     load(`${document.location.host}${!$(".gayLayout").length ? '/' : '/gay/'}categories?o=al`, "ul#categoriesListSection", "categories");
      //     $(".pagination3 > .pjump").eq(0).removeClass("top");
      //     $(".pagination3 > ul").eq(0).removeClass("top");
      //     $(".magic-popup > div.favorites").attr("style", "display: none;");
      //     // $(".sidenav").attr("style", "width: 20% !important;");
      //     $(".wrapper").toggleClass("blur");
      //     $(".magic-popup").removeClass("open");
      //     $("html").toggleClass("magicFreeze");
      //     $(".magic-popup").addClass("open");
      //     $(".navbackground").attr("style", "width: 100%");
      //     $(".magic-popup > div.categories").attr("style", "display: block;");
      //   });
      // };
    });
  } catch (error) {
    mph.err(error);
  }
};

mph.ael(window,"load",loadConfig);