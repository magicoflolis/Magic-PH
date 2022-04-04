import magicpopup from "../html/magicpopup.html";
import sidebar from "../html/sidebar.html";
import loadHeader from "./header.js";
import mph from './api.js';
import { check, getVideoUrl } from "./general.js";
import qs from "./querySelector.js";
import webext from './api-webext.js';

let config = webext.config;

const header = mph.create("magic-customize","div"),
  loadCSS = (src) => {
    const c = mph.create("","link");
    c.rel="stylesheet";
    c.href = webext.getURL(src);
    c.onload = () => mph.log(`Loaded ${src}`);
    c.onerror = () => mph.log(`CSS load error for ${src}`);
    document.head.prepend(c);
  },
  loadScript = (src) => {
    const s = mph.create("","script","module");
    s.async = true;
    s.src = webext.getURL(src);
    s.crossOrigin = "anonymous";
    s.onload = () => mph.log(`Loaded ${src}`);
    s.onerror = () => mph.log(`Script load error for ${src}`);
  },
  loadPage = (url, type) => {
    let pagination = $(".pagination3 > ul").eq(0).children(),
    pageInput = $(".pagination3 > .pjump > input");
    for (let i = 0; i < pagination.length; i++) {
      pagination.eq(i).on("click", function (e) {
        e.preventDefault();
        return load(`${url}${pagination.children().eq(i).attr("href")}`,".sectionWrapper","home");
      })
    };
    pageInput.on("change", function (e) {
      e.preventDefault();
      let link = `${url}/video?page=${e.target.value}`;
      if(type === "home") {
        $(".magic-popup > div.home").html("");
        link = `${url}/video?page=${e.target.value}`;
        return load(`${link}`,".sectionWrapper","home");
      } else {
        $(".magic-popup > div.recommend").html("");
        link = `${url}?page=${e.target.value}`;
        return load(`${link}`,"ul#recommendedListings","recommend");
      };
    });
  },
  load = async (url,selElement,name) => {
    await getVideoUrl(`https://${url}`).then((text) => {
      let parser = new DOMParser(),
      htmlDocument = parser.parseFromString(text, "text/html"),
      selected = htmlDocument.documentElement,
      section = qs(selElement, selected),
      thumb = "none";
      if(!$(`.magic-popup > .${name} > ${selElement}`).length) {
        $(`.magic-popup > .${name}`).html(section);
      };
      (name == "home") ? (thumb = $(".home").find("img")) :
      (name == "recommend") ? (thumb = $(".recommend").find("img")) :
      (name == "categories") ? (thumb = $(".categories").find("img")) :
      (name == "taste") ? loadScript("js/recommended-taste.js") : false;
      if(thumb !== "none") {
        for (let i = 0; i < thumb.length; i++) {
          thumb.eq(i).attr("src", thumb.eq(i).attr("data-thumb_url"));
        };
      };
      if(name !== "categories") {
        let scroller = qs(`.${name} > ${selElement}`),
        scrollfn = () => {
          let pg = $(`.${name} > ${selElement}`),
          pgnav = $(".pagination3 > ul").eq(0);
          if(pg.scrollTop() > mph.scrollnumber) {
            $(".pagination3 > .pjump").eq(0).addClass("top");
            pgnav.addClass("top");
          } else {
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            pgnav.removeClass("top");
          }
        };
        scroller.removeEventListener("scroll", scrollfn)
        mph.ael(scroller,"scroll", scrollfn)
        loadPage(url, name);
      };
    });
  },
  loadConfig = () => {
    try {
      webext.getItem(async (storedConfig) => {
        Object.assign(config, storedConfig);
        // config.debug ? (mpg.cache = true) : false;
        let blurName = config.blurimg ? "Show" : "Blur",
        blurFrame = $(`<div class="blur-btn"><button class="blur-trigger" type="button">${blurName}</button></div>`),
        observeFn = mph.observe(document.body, () => {
          let x = $("div.phimage.blur"),
          y = $("div.phimage");
          if(x.length !== y.length) {
            y.addClass("blur");
            $("a > img.js-menuSwap").addClass("blur");
            $("li > a > img.lazy").addClass("blur");
            $("li > a > video.lazyVideo").addClass("blur");
            $(".largeThumb").addClass("blur");
            $(".playlist-thumb").addClass("blur");
            check.category
              ? $('a[data-mxptype="Category"] > img').addClass("blur")
              : false;
            check.video
              ? ($("#videoElementPoster").addClass("blur"),
                $(".mgp_videoPoster").addClass("blur"),
                $("span.thumb > img.lazy").addClass("blur")
                )
              : false;
            $("a.orangeButton > img").removeClass("blur");
            $("img.catIcon").removeClass("blur");
          }
        }),
        handleBtns = (target,btnText,btnFinal) => {
          if($(target).text() == btnText) {
            $(target).parent().siblings("div").addClass("rm");
            $(target).parent().parent().parent().addClass("marked");
            $(target).parent().parent().siblings("a").addClass("rm");
            $(target).parent().parent().siblings("span").addClass("rm");
            $(target).text(btnFinal);
          } else {
            $(target).parent().siblings("div").removeClass("rm");
            $(target).parent().parent().parent().removeClass("marked");
            $(target).parent().parent().siblings("a").removeClass("rm");
            $(target).parent().parent().siblings("span").removeClass("rm");
            $(target).text(btnText);
          }
        },
        blurfn = (e) => {
          e.preventDefault();
          if(e.target.textContent === "Blur") {
            $(e.target).parent(".blur-btn").siblings(".phimage").addClass("blur");
            $(e.target).text("Show");
          } else {
            $(e.target).parent(".blur-btn").siblings(".phimage").removeClass("blur");
            $(e.target).text("Blur");
          };
        },
        downloadfn = async (e) => {
          e.preventDefault();
          // handleBtns(e.target,"Download","[WIP]");
          window.open($(e.target).parent().parent().siblings("a").attr("href"),"_blank")
        },
        removerfn = (e) => {
          e.preventDefault();
          handleBtns(e.target,"Remove","Undo");
        },
        saveFav = () => {
          let downloader = mph.queryAll("button.download-trigger"),
          remover = mph.queryAll("button.remove-trigger");
          for (let i = 0; i < remover.length; i++) {
            remover[i].removeEventListener("click", removerfn)
            mph.ael(remover[i],"click", removerfn);
            downloader[i].removeEventListener("click", downloadfn)
            mph.ael(downloader[i],"click", downloadfn);
          };
          config.favorites = $(".magic-popup > .favorites").html();
          webext.setItem(config);
        },
        phLogo = () => {
          let find = !$(".gayLayout").length ? '/' : '/gay/',
          logo = mph.create("magiclogo","a","button"),
          nav = mph.create("navbackground","div");
          qs(".magiclogo") ?? (
          qs("#headerContainer > .logo").appendChild(logo),
          $('.logo > .logoWrapper > a > img').clone().appendTo(logo) );
          // lognav.innerHTML = sidebar;
          $(magicpopup).prependTo(document.body);
          $(sidebar).prependTo(document.body);
          document.body.prepend(header);
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
            $(".sidenav").attr("style", "width: 20% !important;");
            $(".wrapper").toggleClass("blur");
            $(".magic-popup").removeClass("open");
            $("html").toggleClass("magicFreeze");
          });
          mph.ael(nav,"click", () => {
            $(".magic-customize").attr("style", "display: none;");
            $(".sidenav").attr("style", "width: 0%;");
            $(".magic-popup").removeClass("open");
            $(".wrapper").toggleClass("blur");
            nav.style.width = "0%";
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            qs(".pjump > input").value = "";
            $("html").toggleClass("magicFreeze");
            $(".favorites > .wrap.marked").remove();
            saveFav();
            // window.location.reload();
          });
          mph.ael(qs(".magic1"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.home").attr("style", "display: block;");
            load(`${document.location.host}`, ".frontListingWrapper", "home");
          });
          mph.ael(qs(".magic2"),"click", () => {
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.categories").attr("style", "display: block;");
            load(`${document.location.host}${find}categories?o=al`, "ul#categoriesListSection", "categories");
          });
          mph.ael(qs(".magic3"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.recommend").attr("style", "display: block;");
            load(`${document.location.host}${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
          });
          mph.ael(qs(".magic4"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.taste").attr("style", "display: block;");
            load(`${document.location.host}/recommended/taste`, ".sectionWrapper", "taste");
          });
          mph.ael(qs(".magic5"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            // $(".magic-popup > div.favorites").addClass("sb");
            $(".magic-popup > div.favorites").attr("style", "display: grid;");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup").addClass("open");
            nav.style.width = "100%";
            saveFav();
          });
          mph.ael(qs(".magic6"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.brws_cfg").attr("style", "display: block !important;")
          });
          mph.ael(qs(".magic999"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".wrapper").toggleClass("blur");
            // lognav.style.width = "0%";
            $(".sidenav").attr("style", "width: 0%;");
            $(".magic-popup").removeClass("open");
            nav.style.width = "0%";
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            qs(".pjump > input").value = "";
            $("html").toggleClass("magicFreeze");
            $(".favorites > .wrap.marked").remove();
            saveFav();
            // window.location.reload();
          });
        };
        !config.sidebar ? phLogo() : false;
        (config.blurimg && !check.favorites) ? observeFn : false;
        config.autoscroll ? window.scrollTo(0, 101) : false;
        config.topbutton ? $(".magicTop").addClass("rm") : false;
        if(check.video) {
          config.comments ? $("#cmtWrapper").removeClass("rm") : $("#cmtWrapper").addClass("rm");
          if(config.altplayers !== "none") {
            loadCSS("css/plyr.css");
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
          };
          mph.setItem("seektime", config.seektime);
          mph.query(".video-wrapper").then(() => {
            let title = $("h1.title > span").text(),
            checker = mph.queryAll(".favorites > .wrap > .title > a"),
            wrap = $(`<div class="wrap">
            <div class="mph-btns">
            <div class="download-btn">
              <button class="download-trigger" type="button">Download</button>
            </div>
            <div class="remove-btn">
              <button class="remove-trigger" type="button">Remove</button>
            </div>
            </div>
            <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>
              <img src='${$("img#videoElementPoster").attr("src")}'></a>
              <span class="title">
                <a href='${document.location.origin}/view_video.php?viewkey=${document.location.search.replace("?viewkey=","")}'>${title}</a>
              </span>
          </div>`),
            favicon = $(`<div class="magicph-fav icon-wrapper tooltipTrig" data-title="[MagicPH] Add to Favorites" ><i class="ph-icon-favorite"><span></span></i></div>`);
            favicon.prependTo($(".allActionsContainer"));
            for (let i = 0; i < checker.length; i++) {
              checker[i].textContent === title ? (
                $(".magicph-fav").attr("data-title", "[MagicPH] Remove from Favorites"),
                $(".magicph-fav").children("i").attr("style", "color: #f90;")
              ) : false;
            };
            $(".magicph-fav").on("click", async function () {
              if($(this).attr("data-title") !== "[MagicPH] Remove from Favorites") {
                wrap.prependTo($(".magic-popup > .favorites"));
                $(this).children("i").attr("style", "color: #f90;");
                $(this).children("i").children("span").text("Saved to Favorites");
                $(this).attr("data-title", "[MagicPH] Remove from Favorites");
              } else {
                $(this).children("i").attr("style", "");
                $(this).children("i").children("span").text("Removed from Favorites");
                $(this).attr("data-title", "[MagicPH] Add to Favorites");
                for (let i = 0; i < checker.length; i++) {
                  if(checker[i].textContent === title) {
                    $("button.remove-trigger").eq(i).parent().siblings("div").addClass("rm");
                    $("button.remove-trigger").eq(i).parent().parent().parent().addClass("marked");
                    $("button.remove-trigger").eq(i).parent().parent().siblings("a").addClass("rm");
                    $("button.remove-trigger").eq(i).parent().parent().siblings("span").addClass("rm");
                    $("button.remove-trigger").eq(i).text("Undo");
                  }
                };
              };
              saveFav();
              await new Promise((resolve) => setTimeout(resolve, 3000));
              $(this).children("i").children("span").text("");
            });
          })
        }
        config.favorites !== "" ? $(".magic-popup > .favorites").html(config.favorites) : false;
        blurFrame.prependTo($("li > div.wrap"));
        let blurb = mph.queryAll(".blur-trigger"),
        w = mph.queryAll("li > .wrap > .phimage");
        observeFn.disconnect();
        for (let i = 0; i < blurb.length; i++) {
          mph.ael(blurb[i],"click", blurfn);
          mph.ael(w[i],"mouseenter", (e) => {
            $(e.target).removeClass("blur");
            //$(e.target).parent().children(".blur-btn").children(".blur-trigger").removeClass("display-none");
          });
          mph.ael(w[i],"mouseleave", (e) => {
            if($(e.target).parent().children(".blur-btn").children(".blur-trigger").text() !== "Blur") {
              $(e.target).addClass("blur")
            };
            //$(e.target).parent().children(".blur-btn").children(".blur-trigger").addClass("display-none");
          });
        };
        loadHeader();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if(qs(".js-menu.categories")) {
          mph.ael(qs(".js-menu.categories > a"),"click",() => {
            load(`${document.location.host}${!$(".gayLayout").length ? '/' : '/gay/'}categories?o=al`, "ul#categoriesListSection", "categories");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".magic-popup > div.favorites").attr("style", "display: none;");
            // $(".sidenav").attr("style", "width: 20% !important;");
            $(".wrapper").toggleClass("blur");
            $(".magic-popup").removeClass("open");
            $("html").toggleClass("magicFreeze");
            $(".magic-popup").addClass("open");
            $(".navbackground").attr("style", "width: 100%");
            $(".magic-popup > div.categories").attr("style", "display: block;");
          });
        }
      });
    } catch (error) {
      mph.err(error);
    }
  };
// window.readyState == "loading" ? loadConfig() : false;

mph.ael(window,"load",loadConfig);