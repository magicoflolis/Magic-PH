import $ from "jquery";
import "./header.js";

try {

let enableDebugLogging = true;
function log(...args) {
  if (enableDebugLogging) {
    let label = '[MagicPH]';
  console.groupCollapsed(label)
  console.log(...args)
  console.groupEnd(label)
  }
}

const qs = (element) => {
  return document.querySelector(element);
},
create = (element) => {
  return document.createElement(element);
},
check = {
  community: document.location.pathname == "/user/discover" ? true : false,
  channel: $("#channelsProfile").length,
  home: $(".frontListingWrapper").length,
  video: $("#player").length,
  cv: $(".gridWrapper").length,
  new: $("#headerSearchWrapperFree").length,
  gay: $(".gayLayout").length,
  lo: $(".logged-out").length,
  premium: $(".premiumUser").length,
  gif: $("#gifWrap").length,
  user: $("#profileContent").length,
  model: $(".amateurModel").length,
  pstar: $(".claimed").length,
};

let scrollnumber = 110,
  p = qs(".magic-popup"),
  href = document.location.href;
function load(url, selElement, name) {
  fetch(url)
    .then((res) => res.text())
    .then((text) => {
      let parser = new DOMParser(),
        div = create("div"),
        htmlDocument = parser.parseFromString(text, "text/html"),
        selected = htmlDocument.documentElement,
        pagination = selected.querySelector(".pagination3") ?? false,
        section = selected.querySelector(selElement);
      div.className = name;
      p.prepend(div);
      div.prepend(section, pagination);
    })
    .catch((err) => {
      log(`Something went wrong.`, err);
    });
}
function menu(item) {
  let freeze = qs("html#magicFreeze"),
    nav = qs(".navbackground"),
    cat = qs(".magic-popup > div.categories"),
    f = qs(".magic-popup > div.favorites"),
    front = qs(".magic-popup > div.home"),
    rec = qs(".magic-popup > div.recommend"),
    t = qs(".magic-popup > div.taste");
  if (item == "exit") {
    freeze ? freeze.id = "": false;
    cat ? (cat.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    qs(".wrapper").className = "wrapper";
    qs(".sidenav").style = "";
    p.style.top = "100%";
    nav.style.width = "0%";
  }
  if (item == "home") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    t ? (t.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.style.width = "100%";
    front
      ? (front.style.display = "block")
      : load(`/`, ".frontListingWrapper", "home");
  }
  if (item == "catagories") {
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.style.width = "100%";
    cat
      ? (cat.style = "block")
      : !check.gay
      ? load(`/categories`, "ul#categoriesListSection", "categories")
      : load(`/gay/categories`, "ul#categoriesListSection", "categories");
  }
  if (item == "recommended") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    p.style.top = "0px";
    nav.style.width = "100%";
    rec
      ? (rec.style.display = "block")
      : load(`/recommended`, "ul.recommendedContainerLoseOne", "recommend");
  }
  if (item == "taste") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.style.width = "100%";
    t
      ? (t.style.display = "block")
      : load(`/recommended/taste`, ".sectionWrapper", "taste");
  }
  if (item == "favorites") {
    cat ? (cat.style.display = "none") : false;
    front ? (front.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    f.className += " sb";
    f.style.display = "grid";
    p.style.top = "0px";
    nav.style.width = "100%";
  }
}
log("Loading inline script...");
qs(".magic999").onclick = async () => {
  menu("exit");
};
qs(".magic1").onclick = async () => {
  menu("home");
};
qs(".magic2").addEventListener("click", () => {
  let css = create("style");
  css.rel = "stylesheet";
  css.media = "all";
  css.href = "https://di.phncdn.com/www-static/css/video-category-pc.css";
  css.onload = "this.media='all'";
  document.body.append(css);
  menu("catagories");
});
qs(".magic3").onclick = async () => {
  menu("recommended");
};
qs(".magic4").onclick = async () => {
  menu("taste");
};
qs(".magic5").onclick = async () => {
  menu("favorites");
};
if (check.channel) {
  log("Channel page");
}
if (check.home) {
  log("Homepage page");
  $("#recommended-category-videos").prependTo(".frontListingWrapper");
  $("#recommended-videos").prependTo(".frontListingWrapper");
}
if (check.video) {
  log("Video page");
  let q = $("mhp1138_quality.mhp1138_optionsList > li").eq(0);
  scrollnumber = 400;
  $(".show-more-btn").addClass("bottom");
  $(".mainPlayerDiv").addClass("bigp");
  $(".relatedVideos").addClass(
    "mph1 video-info-row showLess allRelatedVideos"
  );
  $(".mph1").appendTo(".video-actions-tabs");
  $(".videos-list").addClass("mph2 video-info-row showLess");
  $(".mph2").appendTo(".mph1");
  $("#cmtWrapper").addClass("mph3 video-info-row showLess rm");
  qs(".js-relatedRecommended").append(qs(".mph3"));
  $(".mph2 > .user-playlist").attr("id", "relatedVideosCenter");
  q.addClass("mhp1138_active");
  localStorage.setItem("player_quality", '{"quality":"1440"}');
  if (check.lo) {
    $(".votes-fav-wrap").hide();
    $(".userActions").hide();
  }
  // qs(".magic-popup > div.modJump")
  //   ? (qs(".magic-popup > div.modJump").innerHTML = "")
  //   : false;
  // qs('[data-tab="jump-to-tab"]') ? menu("jump") : false;
}
if (check.cv) {
  log(`Categories`);
}
if (check.user) {
  log(`User Profile`);
}
if (check.model) {
  log(`Model`);
}
// if (dl.pathname == "/user/discover") {
if (check.community) {
  log(`Community`);
  if (check.lo) {
    $(".userWidgetbuttons").remove();
    $("#communityMenuWrap").remove();
  }
}
if (check.pstar) {
  log(`Pornstar`);
}
if (check.gif) {
  log(`Gifs`);
  if (check.lo) {
    $(".float-right").remove();
  }
}
if (!check.gay) {
  //pop.innerHTML = scr;
} else {
  //pop.innerHTML = `<div></div>`;
}
let favs = create("div");
favs.className = "favorites";
$(".magic-popup").prepend(favs);
window.onscroll = async () => {
  let scroll = $(window).scrollTop(),
    search = $(".headerSearchWrapper"),
    pgnav = $(".pagination3 > ul"),
    sma = $(".mph1"),
    smb = $(".mph2"),
    smol = $(".mainPlayerDiv"),
    // sma = $("#vb"),
    // smb = $("#vr"),
    a = () => {
      $(".magicTop").addClass("top");
      search.addClass("sticky");
      pgnav.addClass("top");
      sma.attr("style", "display: block;");
      smb.attr("style", "display: block;");
      smol.removeClass("bigp");
      // $(".navbackground").addClass("smolnav");
      // smol.prependTo(".navbackground")
      smol.addClass("smolp");
    },
    b = () => {
      $(".magicTop").removeClass("top");
      search.removeClass("sticky");
      pgnav.removeClass("top");
      sma.attr("style", "display: none;");
      smb.attr("style", "display: none;");
      smol.addClass("bigp");
      //$(".navbackground").removeClass("smolnav");
      //smol.prependTo(".video-wrapper")
      smol.removeClass("smolp");
    };
  return scroll > scrollnumber ? a() : b();
};

} catch (e) {
  let label = "[MagicPH Debugger]";
  console.group(label);
  console.error(e);
  console.groupEnd(label);
}
