import { config, create, err, log, qs } from "./general";
// import { brws, cfgLoader } from "./sync";
try {
  const brws = typeof browser == "undefined" ? chrome : browser,
    logo = create("a", "button", "magiclogo"),
    p = create("div", null, "magic-popup"),
    nav = create("div", null, "navbackground"),
    magictop = create("input", "button", "magicTop"),
    sidenav = create("div", null, "sidenav"),
    lognav =
      '<a class="magic1">Home</a>\n<a class="magic2">Catagories</a>\n<a class="magic3">Recommended</a>\n<a class="magic4">Taste Profile(WIP)</a>\n<a class="magic5">Favorites(WIP)</a>\n<a class="magic6"></a>\n<a class="magic7"></a>\n<a class="magic999">Exit ⟵</a>',
    loadScript = (src) => {
      const s = create("script", "module");
        s.async = true;
        s.src = brws.runtime.getURL(src);
        s.crossOrigin = "anonymous";
        s.onload = () => log(`Loaded ${src}`);
        s.onerror = () => err(`Script load error for ${src}`);
        document.head.prepend(s);
    },
    cfgLoader = () => {
      try {
        function blurWatcher() {
          let x = $("div.phimage.blur"),
            y = $("div.phimage");
          x.length != y.length
            ? (y.addClass("blur"),
              $("img.js-menuSwap").addClass("blur"),
              $("img.lazy").addClass("blur"),
              $("video.lazyVideo").addClass("blur"),
              /categories/.test(window.location.href)
                ? $('a[data-mxptype="Category"] > img').addClass("blur")
                : false,
              /view_video.php/.test(window.location.href)
                ? ($("#videoElementPoster").addClass("blur"),
                  $(".mgp_videoPoster").addClass("blur"))
                : false,
              $("a.orangeButton > img").removeClass("blur"),
              $("img.catIcon").removeClass("blur"))
            : false;
        }
  
        brws.storage.local.get((storedConfig) => {
          Object.assign(config, storedConfig);
          config.blurimg
            ? new MutationObserver(() => {
                blurWatcher();
              }).observe(document.body, { subtree: true, childList: true })
            : false;
          window.scroll(0, 110);
          // config.autoscroll ? window.scroll(0, 110) : false;
          config.comments ? ($("div.mph3").removeClass("rm")) : false;
          config.sidebar ? $("div.sidenav").addClass("rm") : false;
          config.topbutton ? $(".magicTop").addClass("rm") : false;
        });
      } catch (error) {
        err(error);
      }
    };
  sidenav.innerHTML = lognav;
  magictop.value = "Top";
  magictop.onclick = () => {
    return window.scroll(0, 110);
  };
  window.onload = () => {
    loadScript("js/magicph.js");
    document.body.prepend(magictop, sidenav);
    const w = qs(".wrapper"),
      wrapper = $(".wrapper"),
      sNav = $(".sidenav"),
      mLogo = () => {
        // Prevents duplicate
        $(".gayLayout").length
          ? ((logo.innerHTML =
              '<img src="https://ci.phncdn.com/www-static/images/pornhub_logo_gay.png">'),
            qs("#headerContainer > .logoGay").appendChild(logo))
          : ((logo.innerHTML =
              '<img src="https://di.phncdn.com/www-static/images/pornhub_logo_straight.png">'),
            qs("#headerContainer > .logo").appendChild(logo));
      };
    qs(".magiclogo") ?? mLogo();
    cfgLoader();
    logo.onclick = () => {
      nav.style.width = "100%";
      sNav.attr("style", "width: 20% !important;");
      wrapper.toggleClass("blur");
      p.style.top = "100%";
      $("html").toggleClass("magicFreeze");
    };
    nav.onclick = async () => {
      let cat = qs(".magic-popup > div.categories"),
        f = qs(".magic-popup > div.favorites"),
        front = qs(".magic-popup > div.home"),
        rec = qs(".magic-popup > div.recommend"),
        t = qs(".magic-popup > div.taste");
      wrapper.toggleClass("blur");
      sNav.attr("style", "");
      p.style.top = "100%";
      p.style.width = "";
      p.style.height = "";
      f.className = "favorites";
      nav.style.width = "0%";
      cat ? (cat.style.display = "none") : false;
      t ? (t.style.display = "none") : false;
      f ? (f.style.display = "none") : false;
      front ? (front.style.display = "none") : false;
      rec ? (rec.style.display = "none") : false;
      $("html").toggleClass("magicFreeze");
    };
    w.before(p);
    w.after(nav);
  };
} catch (error) {
  err(error);
}
