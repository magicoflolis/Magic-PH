import magicpopup from "../magicpopup.html";
import {
  config, 
  create, 
  err, 
  locate, 
  log, 
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
    c.onerror = () => err(`CSS load error for ${src}`);
    document.head.prepend(c);
  },
  loadScript = (src) => {
    const s = create("script", "module");
    s.async = true;
    s.src = brws.runtime.getURL(src);
    s.crossOrigin = "anonymous";
    s.onload = () => log(`Loaded ${src}`);
    s.onerror = () => err(`Script load error for ${src}`);
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
            return window.scrollTo(0, 110);
          });
          return document.body.prepend(magictop);
        },
        phLogo = () => {
          let sidebar = `<a class="magic1">Home</a><a class="magic2">Catagories</a><a class="magic3">Recommended</a><a class="magic4">Taste Profile(WIP)</a><a class="magic5">Favorites(WIP)</a><a class="magic6">MagicPH Config</a><a class="magic7"></a><a class="magic999">Exit ⟵</a>`,
          find = !$(".gayLayout").length ? '/' : '/gay/',
          lognav = create("div", null, "sidenav"),
          logo = create("a", "button", "magiclogo"),
          nav = create("div", null, "navbackground"),
          load = async (url, selElement, name, target) => {
            await new Promise(() => {
              try {
                fetch(`https://${url}`).then((res) => res.text())
                  .then((text) => {
                    let parser = new DOMParser(),
                      div = create("div", null, name),
                      htmlDocument = parser.parseFromString(text, "text/html"),
                      selected = htmlDocument.documentElement,
                      section = selected.querySelector(selElement),
                      thumb = "none";
                    target ? target.prepend(div) : $(".magic-popup").prepend(div);
                    div.prepend(section);
                    (name == "home") ? (thumb = $(".home").find("img")) :
                    (name == "recommend") ? (thumb = $(".recommend").find("img")) :
                    (name == "categories") ? (thumb = $(".categories").find("img")) : false;
                    if(thumb !== "none") {
                      for (let i = 0; i < thumb.length; i++) {
                        thumb.eq(i).attr("src", thumb.eq(i).attr("data-thumb_url"));
                      }
                      qs(`.${name} > ${selElement}`).addEventListener('scroll', async () => {
                        let pgnav = $(".pagination3 > ul").eq(0);
                        if($(".home > div.frontListingWrapper").scrollTop() > scrollnumber) {
                          pgnav.addClass("top")
                        } else {
                          pgnav.removeClass("top")
                        }
                      })
                    }
                });
              } catch (error) {
                log(error);
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
          logo.addEventListener('click', async () => {
            nav.style.width = "100%";
            // lognav.style.width = "20% !important";
            $(".sidenav").attr("style", "width: 20% !important;");
            $(".wrapper").toggleClass("blur");
            $(".magic-popup").removeClass("open")
            // p.style.visibility = "visible";
            $("html").toggleClass("magicFreeze");
          });
          nav.addEventListener('click', async () => {
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
            $("html").toggleClass("magicFreeze");
          });
          qs(".magic1").addEventListener('click', async () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.home").length ? ($(".magic-popup > div.home").attr("style", "display: block;")) : load(`${document.location.host}`, ".frontListingWrapper", "home");
          });
          qs(".magic2").addEventListener("click", async () => {
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.categories").length ? ($(".magic-popup > div.categories").attr("style", "display: block;")) : load(`${document.location.host}${find}categories`, "ul#categoriesListSection", "categories");
          });
          qs(".magic3").addEventListener('click', async () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.recommend").length ? ($(".magic-popup > div.recommend").attr("style", "display: block;")) : load(`${document.location.host}${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
          });
          qs(".magic4").addEventListener('click', async () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.taste").length ? ($(".magic-popup > div.taste").attr("style", "display: block;")) : (
              load(`${document.location.host}/recommended/taste`, ".sectionWrapper", "taste"),
              loadScript("js/recommended-taste.js"));
          });
          qs(".magic5").addEventListener('click', async () => {
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
          qs(".magic6").addEventListener('click', async () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".magic-popup").addClass("open")
            nav.style.width = "100%";
            $(".magic-popup > div.brws_cfg").attr("style", "display: block;")
          });
          qs(".magic999").addEventListener('click', async () => {
            $(".magic-popup > div.categories").attr("style", "display: none;");
            $(".magic-popup > div.home").attr("style", "display: none;");
            $(".magic-popup > div.brws_cfg").attr("style", "display: none;");
            $(".magic-popup > div.taste").attr("style", "display: none;");
            //$(".magic-popup > div.favorites").attr("style", "display: none;");
            $(".magic-popup > div.recommend").attr("style", "display: none;");
            $(".wrapper").toggleClass("blur");
            lognav.style.width = "0%";
            $(".magic-popup").removeClass("open")
            nav.style.width = "0%";
            $(".pagination3 > ul").eq(0).removeClass("top");
            $("html").toggleClass("magicFreeze");
          });
          let ff = document.querySelector("form.magicph_cfg");
          for (let prop in config) {
            prop in ff.elements
              ? ff.elements[prop].type == "checkbox"
                ? (ff.elements[prop].checked = config[prop])
                : (ff.elements[prop].value = config[prop])
              : false;
          }
          ff.addEventListener("change", (e) => {
            let $el = /** @type {HTMLInputElement} */ (e.target);
            $el.type == "checkbox"
              ? (config[$el.name] = $el.checked)
              : (config[$el.name] = $el.value);
            brws.storage.local.set(config);
            window.location.reload();
          });
        };
        config.blurimg ? blurMO.observe(document.body, { subtree: true, childList: true }) : false;
        config.autoscroll ? window.scrollTo(0, 110) : false;
        config.comments ? $("#cmtWrapper").removeClass("rm") : $("#cmtWrapper").addClass("rm");
        !config.sidebar ? phLogo() : false;
        !config.topbutton ? topBTN() : false;
        if(config.altplayers !== "none" && /view_video.php/.test(locate)) {
          loadCSS("css/plyr.css");
          // loadScript("js/plyr.min.js");
          $(".mainPlayerDiv").addClass("ap");
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
      err(error);
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