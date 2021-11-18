import { check, config, create, err, locate, log, qs } from "./general";
import magicpopup from "./magicpopup.html";
// import { phLogo } from "./popup";
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
                        if($(".home > div.frontListingWrapper").scrollTop() > 110) {
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
          document.body.prepend(lognav);
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
          // let favs = create("div", null, "favorites"),
          //   uName = $("div.usernameWrap > a");
          // $(".magic-popup").prepend(favs);
          // for (let i = 0; i < uName.attr("href").length; i++) {
          //   uName.eq(i).attr("href", `${uName.eq(i).attr("href")}/videos`);
          // }
          //(!$(".logged-out").length) ? (pReplace.attr('href', `${pReplace.attr("href")}/videos`)) : false;
          document.body.prepend(header);
        let mod = {
          Home: "/",
          Video: "/video?o=tr&hd=1",
          Category: "/categories?o=al",
          Pornstar: "/pornstars?performerType=pornstar",
          Community: "/user/discover",
          Photo: "/gifs",
          Premium: "/premium",
          Gift: "/premium",
          GPremium: "/gay/premium",
          GHome: "/gay",
          GVideo: "/gay/video?o=tr&hd=1",
          GCategory: "/gay/categories?o=al",
          GPornstar: "/gay/pornstars?performerType=pornstar",
          GCommunity: "/user/discover/gay",
          GPhoto: "/gay/gifs?o=tr",
        },
        src = {
          Home: $('.home > a[href="/"]'),
          Video: $('.videos > a[href="/video"]'),
          Category: $('.categories > a[href="/categories"]'),
          Pornstar: $('.pornstar > a[href="/pornstars"]'),
          Community: $('.community > a[href^="/community"]'),
          Photo: $('.photos > a[href^="/albums"]'),
          Premium: $('.premium > a[href="/premium"]'),
          Gift: $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]'),
          GHome: $('.home > a[href="/"]'),
          GVideo: $('.videos > a[href="/gayporn"]'),
          GCategory: $('.categories > a[href="/gay/categories"]'),
          GPornstar: $('.pornstar > a[href="/gay/pornstars"]'),
          GCommunity: $('.community > a[href^="/community?section=gay"]'),
          GPhoto: $('.photos > a[href^="/albums/gay"]'),
          GPremium: $('.premium > a[href="/gay/premium"]'),
        },
        fg = !check.gay ? '/recommended' : '/gay/recommended',
        selA = `<a href="${fg}" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
        selB = `<a href="${fg}" class="js-topMenuLink"><span class="itemName">recommended</span></a>`,
        recommended = $(`<li class="menu recommended" data-hover="0">${(check.recommended) ? selA : selB}</li>`),
        custom = $(`<li class="menu customize"><a title="Customize Header" type="button" class="customize-header js-topMenuLink"><span class="itemName">customize (wip)</span></a></li>`),
        custom_layout = $(`
  <form class="magicph_customize">
  <section class="select">
    Header #1
    <select name="head1">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <section class="select">
    Header #2
    <select name="head2">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <section class="select">
    Header #3
    <select name="head3">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <section class="select">
    Header #4
    <select name="head4">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <section class="select">
    Header #5
    <select name="head5">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <section class="select">
    Header #6
    <select name="head6">
      <option value="home">Home</option>
      <option value="videos">Porn Videos</option>
      <option value="categories">Categories</option>
      <option value="pornstars">Pornstars</option>
      <option value="gifs">Photos & Gifs</option>
      <option value="recommended">Recommended</option>
      <option value="custom">Custom URL</option>
    </select>
  </section>
  <input class="magicph_h1" name="h1_link" placeholder="/">
</form>
        `);
        $("ul#headerMainMenu").append(recommended, custom)
        custom_layout.appendTo($(".magic-customize"))
        $("a.customize-header").on("click", function () {
          $("form.magicph_customize").attr("style", "display: grid;");
          $(".wrapper").toggleClass("blur");
          $("html").toggleClass("magicFreeze");
          $(".navbackground").attr("style", "width: 100%");
        })
        !check.gay ? (
          // src.Home.attr("href", mod.Home)
          src.Video.attr("href", mod.Video),
          src.Category.attr("href", mod.Category),
          src.Pornstar.attr("href", mod.Pornstar),
          src.Community.attr("href", mod.Community),
          src.Photo.attr("href", mod.Photo)
        ) : (
          // src.GHome.attr("href", mod.GHome)
          src.GVideo.attr("href", mod.GVideo),
          src.GCategory.attr("href", mod.GCategory),
          src.GPornstar.attr("href", mod.GPornstar),
          src.GCommunity.attr("href", mod.GCommunity),
          src.GPhoto.attr("href", mod.GPhoto)
        );
        };
        config.blurimg ? blurMO.observe(document.body, { subtree: true, childList: true }) : false;
        config.autoscroll ? window.scrollTo(0, 110) : false;
        config.comments ? $("#cmtWrapper").removeClass("rm") : $("#cmtWrapper").addClass("rm");
        !config.sidebar ? phLogo() : false;
        !config.topbutton ? topBTN() : false;
        if(config.altplayers !== "none" && /view_video.php/.test(locate)) {
          loadCSS("css/plyr.css");
          loadScript("js/plyr.min.js");
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
  loadScript("js/magicph.js");
});