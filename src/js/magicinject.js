import magicpopup from "../magicpopup.html";
import log from "./logger";
import {
  ael,
  config,
  create,
  locate,
  qs,
  scrollnumber
} from "./general";
import { loadHeader } from "./header";


const brws = (typeof browser == "undefined") ? chrome : browser,
  magictop = create("input", "button", "magicTop"),
  header = create("div", null, "magic-customize"),
  loadCSS = (src) => {
    const c = create("link", null, null);
    c.rel="stylesheet";
    c.href = brws.runtime.getURL(src);
    c.onload = () => log(`Loaded ${src}`);
    c.onerror = () => log(`CSS load error for ${src}`);
    document.head.prepend(c);
  },
  loadScript = (src) => {
    const s = create("script", "module");
    s.async = true;
    s.src = brws.runtime.getURL(src);
    s.crossOrigin = "anonymous";
    s.onload = () => log(`Loaded ${src}`);
    s.onerror = () => log(`Script load error for ${src}`);
    document.head.prepend(s);
  },
  loadConfig = () => {
    try {
      brws.storage.local.get((storedConfig) => {
        Object.assign(config, storedConfig);
        let blurName = config.blurimg ? "Unblur" : "Blur",
        blurFrame = $(`<div class="blur-btn display-none"><button class="blur-trigger" type="button">${blurName}</button></div>`),
        blurMO = new MutationObserver(() => {
          let x = $("div.phimage.blur"),
          y = $("div.phimage");
          if(x.length != y.length) {
            y.addClass("blur");
            $("a > img.js-menuSwap").addClass("blur");
            $("li > a > img.lazy").addClass("blur");
            $("li > a > video.lazyVideo").addClass("blur");
            $(".largeThumb").addClass("blur");
            $(".playlist-thumb").addClass("blur");
            /categories/.test(locate)
              ? $('a[data-mxptype="Category"] > img').addClass("blur")
              : false;
            /view_video.php/.test(locate)
              ? ($("#videoElementPoster").addClass("blur"),
                $(".mgp_videoPoster").addClass("blur"),
                $("span.thumb > img.lazy").addClass("blur")
                )
              : false;
            $("a.orangeButton > img").removeClass("blur");
            $("img.catIcon").removeClass("blur");
          } else {
            (x.length === y.length) ? blurMO.disconnect() : false;
          }
        }),
        topBTN = () => {
          magictop.value = "Top";
          magictop.addEventListener('click', () => {
            return window.scrollTo(0, 101);
          });
          return document.body.prepend(magictop);
        },
        phLogo = () => {
          let sidebar = `<a class="magic1">Home</a><a class="magic2">Catagories</a><a class="magic3">Recommended</a><a class="magic4">Taste Profile(WIP)</a><a class="magic5">Favorites(WIP)</a><a class="magic6">MagicPH Config</a><a class="magic7"></a><a class="magic999">Exit ⟵</a>`,
          find = !$(".gayLayout").length ? '/' : '/gay/',
          lognav = create("div", null, "sidenav"),
          logo = create("a", "button", "magiclogo"),
          nav = create("div", null, "navbackground"),
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
          load = async (url, selElement, name) => {
            await new Promise(() => {
              try {
                fetch(`https://${url}`).then((res) => res.text())
                  .then((text) => {
                    let parser = new DOMParser(),
                    htmlDocument = parser.parseFromString(text, "text/html"),
                    selected = htmlDocument.documentElement,
                    section = selected.querySelector(selElement),
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
                      let scroller = $(`.${name} > ${selElement}`);
                      scroller.on("scroll", function (e) {
                        let pgnav = $(".pagination3 > ul").eq(0);
                        if($(this).scrollTop() > scrollnumber) {
                          $(".pagination3 > .pjump").eq(0).addClass("top");
                          pgnav.addClass("top");
                        } else {
                          $(".pagination3 > .pjump").eq(0).removeClass("top");
                          pgnav.removeClass("top");
                        }
                      });
                      loadPage(url, name);
                    }
                  });
              } catch (error) {
                log(error, "err");
              }
            });
          };
          qs(".magiclogo") ?? (
          qs("#headerContainer > .logo").appendChild(logo),
          $('.logo > .logoWrapper > a > img').clone().appendTo(logo) );
          lognav.innerHTML = sidebar;
          $(magicpopup).prependTo(document.body)
          document.body.prepend(lognav, header);
          document.body.append(nav);
          let ff = qs("form.magicph_cfg");
          for (let prop in config) {
            prop in ff.elements
              ? ff.elements[prop].type == "checkbox"
                ? (ff.elements[prop].checked = config[prop])
                : (ff.elements[prop].value = config[prop])
              : false;
          }
          ael(logo,"click", () => {
            nav.style.width = "100%";
            // lognav.style.width = "20% !important";
            $(".sidenav").attr("style", "width: 20% !important;");
            $(".wrapper").toggleClass("blur");
            $(".magic-popup").removeClass("open")
            // p.style.visibility = "visible";
            $("html").toggleClass("magicFreeze");
          });
          ael(nav,"click", () => {
            $("form.magicph_customize") ? $("form.magicph_customize").attr("style", "display: none;") : false
            $(".wrapper").toggleClass("blur");
            lognav.style.width = "0%";
            $(".magic-popup").removeClass("open")
            nav.style.width = "0%";
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            // f ? (f.className = "favorites",f.style.display = "none") : false;
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            qs(".pjump > input").value = "";
            $("html").toggleClass("magicFreeze");
            brws.storage.local.set(config);
            // window.location.reload();
          });
          ael(qs(".magic1"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.home").attr("style", "display: block;")
            load(`${document.location.host}`, ".frontListingWrapper", "home");
          });
          ael(qs(".magic2"),"click", () => {
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.categories").attr("style", "display: block;");
            load(`${document.location.host}${find}categories`, "ul#categoriesListSection", "categories");
          });
          ael(qs(".magic3"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.recommend").attr("style", "display: block;");
            load(`${document.location.host}${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
          });
          ael(qs(".magic4"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.taste").attr("style", "display: block;");
            load(`${document.location.host}/recommended/taste`, ".sectionWrapper", "taste");
          });
          ael(qs(".magic5"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            // $(".magic-popup > div.favorites").addClass("sb");
            // $(".magic-popup > div.favorites").attr("style", "display: grid;");
            // f.className += " sb";
            // f ? f.style.display = "grid" : false;
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
          });
          ael(qs(".magic6"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.brws_cfg").attr("style", "display: block !important;")
          });
          ael(qs(".magic999"),"click", () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".wrapper").toggleClass("blur");
            lognav.style.width = "0%";
            $(".magic-popup").removeClass("open");
            nav.style.width = "0%";
            $(".pagination3 > ul").eq(0).removeClass("top");
            $(".pagination3 > .pjump").eq(0).removeClass("top");
            qs(".pjump > input").value = "";
            $("html").toggleClass("magicFreeze");
            brws.storage.local.set(config);
            // window.location.reload();
          });
          ael(ff,"change", (e) => {
            let $el = /** @type {HTMLInputElement} */ (e.target);
            $el.type == "checkbox"
              ? (config[$el.name] = $el.checked)
              : (config[$el.name] = $el.value);
          });
        };
        config.blurimg ? blurMO.observe(document.body, { subtree: true, childList: true }) : false;
        config.autoscroll ? window.scrollTo(0, 110) : false;
        config.comments ? $("#cmtWrapper").removeClass("rm") : $("#cmtWrapper").addClass("rm");
        !config.sidebar ? phLogo() : false;
        !config.topbutton ? topBTN() : false;
        if(/view_video.php/.test(locate)) {
          if(config.altplayers !== "none") {
            loadCSS("css/plyr.css");
            // loadScript("js/plyr.min.js");
            $(".mainPlayerDiv").addClass("ap");
          }
          $(".mainPlayerDiv").attr("magicph-seek", config.seektime);
        }
        blurFrame.appendTo($("div.wrap"));
        $("div.wrap").hover(
          function() {
            $(this).children(".blur-btn").toggleClass("display-none")
            $(this).children(".phimage").removeClass("blur")
          },
          function() {
            if($(this).children(".blur-btn").text() !== "Blur") {
              $(this).children(".phimage").addClass("blur")
            }
            $(this).children(".blur-btn").toggleClass("display-none") })
        $("button.blur-trigger").on("click", function () {
          if($(this).text() == "Blur") {
            $(this).parent().siblings(".phimage").addClass("blur");
            $(this).text("Unblur");
          } else {
            $(this).parent().siblings(".phimage").removeClass("blur");
            $(this).text("Blur");
          }
        })
      });
    } catch (error) {
      log(error);
    }
  };
// window.readyState == "loading" ? loadConfig() : false;
window.addEventListener('load', () => {
  loadConfig();
  loadHeader();
  loadScript("js/magicph.js");
});


// let favs = create("div", null, "favorites"),
//   uName = $("div.usernameWrap > a");
// $(".magic-popup").prepend(favs);
// for (let i = 0; i < uName.attr("href").length; i++) {
//   uName.eq(i).attr("href", `${uName.eq(i).attr("href")}/videos`);
// }
//(!$(".logged-out").length) ? (pReplace.attr('href', `${pReplace.attr("href")}/videos`)) : false;