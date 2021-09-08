import { config, create, err, log, qs } from "./general";
import lognav from "./sidebar.html";
const brws = (typeof browser == "undefined") ? chrome : browser,
  logo = create("a", "button", "magiclogo"),
  p = create("div", null, "magic-popup"),
  nav = create("div", null, "navbackground"),
  magictop = create("input", "button", "magicTop"),
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
      brws.storage.local.get((storedConfig) => {
        Object.assign(config, storedConfig);
        let blurName = config.blurimg ? "Unblur" : "Blur",
        blurFrame = $(`<div class="blur-btn display-none"><button class="blur-trigger" type="button">${blurName}</button></div>`);
        const observer = new MutationObserver(() => {
          let x = $("div.phimage.blur"),
          y = $("div.phimage");
          if(x.length != y.length) {
            y.addClass("blur");
            $("a > img.js-menuSwap").addClass("blur");
            $("li > a > img.lazy").addClass("blur");
            $("li > a > video.lazyVideo").addClass("blur");
            $(".largeThumb").addClass("blur");
            $(".playlist-thumb").addClass("blur");
            /categories/.test(window.location.href)
              ? $('a[data-mxptype="Category"] > img').addClass("blur")
              : false;
            /view_video.php/.test(window.location.href)
              ? ($("#videoElementPoster").addClass("blur"),
                $(".mgp_videoPoster").addClass("blur"),
                $("span.thumb > img.lazy").addClass("blur")
                )
              : false;
            $("a.orangeButton > img").removeClass("blur");
            $("img.catIcon").removeClass("blur");
          } else {
            (x.length === y.length) ? observer.disconnect() : false;
          }
          });
        config.blurimg ? observer.observe(document.body, { subtree: true, childList: true }) : false;
        config.autoscroll ? window.scroll(0, 110) : false;
        config.comments ? $("#cmtWrapper").removeClass("rm") : $("#cmtWrapper").addClass("rm");
        config.sidebar ? $("div.sidenav").addClass("rm") : false;
        config.topbutton ? $(".magicTop").addClass("rm") : false;
        blurFrame.appendTo($("div.wrap"));
        $("div.wrap").hover(
          function() { $(this).children(".blur-btn").removeClass("display-none") },
          function() { $(this).children(".blur-btn").addClass("display-none") })
        $("button.blur-trigger").on("click", function () {
          ($(this).text() == "Blur") ? (
            $(this).parent().siblings().addClass("blur"),
            $(this).text("Unblur")
            ) : (
              $(this).parent().siblings().removeClass("blur"),
              $(this).text("Blur")
              );
        }) 
      });
    } catch (error) {
      err(error);
    }
  };
magictop.value = "Top";
magictop.onclick = () => {
  return window.scroll(0, 110);
};
window.onload = () => {
  loadScript("js/magicph.js");
  document.body.prepend(magictop);
  $(lognav).prependTo(document.body);
  cfgLoader();
  const wrapper = $(".wrapper"),
    sNav = $(".sidenav"),
    mLogo = () => {
      qs("#headerContainer > .logo").appendChild(logo);
      $('.logo > .logoWrapper > a > img').clone().appendTo(logo);
    };
  qs(".magiclogo") ?? mLogo();
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
  wrapper.before(p);
  wrapper.after(nav);
  if(/view_video.php/.test(window.location.href)) {
    let uName = $("span.usernameBadgesWrapper > a");
    for (let i = 0; i < uName.attr("href").length; i++) {
      uName.eq(i).attr("href", `${uName.eq(i).attr("href")}/videos`);
    }
  }
};
