import { check, create, log, qs } from "./general";
import hInit from "./header";
import ph_player from "./player";
log("Loading inline script...");
let scrollnumber = 110,
  p = qs(".magic-popup"),
  load = async (url, selElement, name, target) => {
    await new Promise((reject) => {
      try {
        fetch(url)
          .then((res) => res.text())
          .then((text) => {
            let parser = new DOMParser(),
              div = create("div", null, name),
              htmlDocument = parser.parseFromString(text, "text/html"),
              selected = htmlDocument.documentElement,
              section = selected.querySelector(selElement);
              target ? target.prepend(div) : p.prepend(div);
              div.prepend(section);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
function menu(item) {
  let nav = $(".navbackground"),
    cat = qs(".magic-popup > div.categories"),
    f = qs(".magic-popup > div.favorites"),
    front = qs(".magic-popup > div.home"),
    rec = qs(".magic-popup > div.recommend"),
    t = qs(".magic-popup > div.taste"),
    find = !check.gay ? '/' : '/gay/';
  if (item == "exit") {
    cat ? (cat.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    qs(".wrapper").className = "wrapper";
    qs(".sidenav").style = "";
    p.style.top = "100%";
    nav.attr("style", "width: 0%;");
    $("html").toggleClass("magicFreeze");
  }
  if (item == "home") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    t ? (t.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.attr("style", "width: 100%;");
    front ? (front.style.display = "block") : load(`/`, ".frontListingWrapper", "home");
  }
  if (item == "catagories") {
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.attr("style", "width: 100%;");
    cat ? (cat.style = "block") : load(`${find}categories`, "ul#categoriesListSection", "categories");
  }
  if (item == "recommended") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    t ? (t.style.display = "none") : false;
    p.style.top = "0px";
    nav.attr("style", "width: 100%;");
    rec ? (rec.style.display = "block") : load(`${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
  }
  if (item == "taste") {
    cat ? (cat.style.display = "none") : false;
    f.style.display = "none";
    front ? (front.style.display = "none") : false;
    rec ? (rec.style.display = "none") : false;
    p.style.top = "0px";
    nav.attr("style", "width: 100%;");
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
    nav.attr("style", "width: 100%;");
  }
}
hInit();
check.channel ? log("Channel page") : false;
check.home
  ? (log("Homepage page"),
    $("#recommended-category-videos").prependTo(".frontListingWrapper"),
    $("#recommended-videos").prependTo(".frontListingWrapper"))
  : false;
/view_video.php/.test(window.location.href)
  ? (log("Video page"),
    (scrollnumber = 400),
    $(".mainPlayerDiv").addClass("bigp"),
    (qs(".mgp_options").onclick = async () => {
      if (!$("div.mgp_optionsMenu.mgp_visible.mgp_level2").length) {
        $("div.mgp_header").text("Quality");
        $("div.mgp_optionsMenu")
          .addClass("mgp_visible mgp_level2")
          .find(".mgp_background")
          .addClass("mgp_animated")
          .attr("style", "width: 110px; height: 194px;");
        $("ul.mgp_quality.mgp_optionsList").attr("style", "display:block;");
      } else {
        $("div.mgp_optionsMenu")
          .removeClass("mgp_visible mgp_level2")
          .find(".mgp_background")
          .removeClass("mgp_animated")
          .attr("style", "width: 165px; height: 136px;");
      $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
      }
    }),
    (qs(".mgp_clickHandler").onclick = async () => {
      $("div.mgp_optionsMenu")
          .removeClass("mgp_visible mgp_level2")
          .find(".mgp_background")
          .removeClass("mgp_animated")
          .attr("style", "width: 165px; height: 136px;");
      $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
    }),
    $("div.mgp_header").on("click", function () {
      $("div.mgp_optionsMenu.mgp_visible.mgp_level2")
        .removeClass("mgp_level2")
        .find(".mgp_background")
        .attr("style", "width: 165px; height: 136px;");
    }),
    $("html").attr("style", "scrollbar-color: #4646463d #000 !important;"),
    $(".relatedVideos").addClass(
      "mph1 video-info-row showLess allRelatedVideos"
    ),
    $(".show-more-btn").addClass("bottom"),
    $(".mph1").appendTo(".video-actions-tabs"),
    $(".videos-list").addClass("mph2 video-info-row showLess"),
    $(".mph2").appendTo(".mph1"),
    $("#cmtWrapper").addClass("mph3 video-info-row showLess"),
    qs(".js-relatedRecommended").append(qs(".mph3")),
    $(".mph2 > .user-playlist").attr("id", "relatedVideosCenter"),
    $("ul.mgp_quality.mgp_optionsList").find(".mgp_active").removeClass("mgp_active").find("li").eq(0).addClass("mhp1138_active"),
    localStorage.setItem("mgp_player", '{"quality":"1080"}'),
    check.lo ? ($(".votes-fav-wrap").hide(), $(".userActions").hide(),
    ph_player()
    ) : false)
  : false;
check.cv ? log(`Categories`) : false;
check.user ? log(`User Profile`) : false;
if (check.model) {
  log(`Model`);
  let ab = $("a.usernameLink");
  for (let i = 0; i < ab.attr("href").length; i++) {
    ab.eq(i).attr("href", `${ab.eq(i).attr("href")}/videos`);
  }
}
check.community
  ? (log(`Community`),
    check.lo
      ? ($(".userWidgetbuttons").remove(), $("#communityMenuWrap").remove())
      : false)
  : false;
check.pstar ? log(`Pornstar`) : false;
check.gif
  ? (log(`Gifs`), check.lo ? $(".float-right").remove() : false)
  : false;
/recommended/.test(window.location.href)
  ? check.lo
    ? $('a[href="/recommended/rate"]').addClass("rm")
    : false
  : false;
qs(".magic1").onclick = async () => {
  menu("home");
};
qs(".magic2").addEventListener("click", async () => {
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
qs(".magic999").onclick = async () => {
  menu("exit");
};
let favs = create("div", null, "favorites"),
  a = $("div.usernameWrap > a");
  // pReplace = $("li.profile > a"),
$(".magic-popup").prepend(favs);
for (let i = 0; i < a.attr("href").length; i++) {
  a.eq(i).attr("href", `${a.eq(i).attr("href")}/videos`);
}
//(!check.lo) ? (pReplace.attr('href', `${pReplace.attr("href")}/videos`)) : false;


window.onscroll = async () => {
  const search = $(".headerSearchWrapper"),
    pgnav = $(".pagination3 > ul"),
    mph1 = $(".mph1"),
    mph2 = $(".mph2"),
    smol = $(".mainPlayerDiv");
  // sma = $("#vb"),
  // smb = $("#vr"),
  return $(window).scrollTop() > scrollnumber
    ? ($(".magicTop").addClass("top"),
      search.addClass("sticky"),
      pgnav.addClass("top"),
      mph1.attr("style", "display: block;"),
      mph2.attr("style", "display: block;")
      // smol.removeClass("bigp"),
      // smol.addClass("smolp")
      ) : ($(".magicTop").removeClass("top"),
      search.removeClass("sticky"),
      pgnav.removeClass("top"),
      mph1.attr("style", "display: none;"),
      mph2.attr("style", "display: none;")
      // smol.addClass("bigp"),
      // smol.removeClass("smolp")
      );
};
