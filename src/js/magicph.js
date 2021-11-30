import { check, locate, log, qs, userInfo, scrollnumber } from "./general";
import { ph_player } from "./player";
// import hInit from "./header";

// log("Loading inline script...");

check.channel ? log("Channel page") : false;
check.home
  ? (log("Homepage page"),
    $("#recommended-category-videos").prependTo(".frontListingWrapper"),
    $("#recommended-videos").prependTo(".frontListingWrapper"))
  : false;
//window.PH_Storage.getItem("watchedVideoIds") // stored videos
//window.PH_Storage.saveItem("watchedVideoStorage")
if(check.video) {
  log("Video page")
  $("html").attr("style", "scrollbar-color: #4646463d #000 !important;")
  localStorage.setItem("mgp_player", '{"quality":2160}')
  ph_player();
  userInfo("video")
  $(".mainPlayerDiv").addClass("bigp")
  $(".relatedVideos").addClass("mph1 video-info-row showLess allRelatedVideos")
  $(".show-more-btn").addClass("bottom")
  $(".mph1").appendTo(".video-actions-tabs")
  $(".videos-list").addClass("mph2 video-info-row showLess")
  $(".mph2").appendTo(".mph1")
  $("#cmtWrapper").addClass("mph3 video-info-row showLess")
  qs(".js-relatedRecommended").append(qs(".mph3"))
  $(".mph2 > .user-playlist").attr("id", "relatedVideosCenter")
  $("ul.mgp_quality.mgp_optionsList").find(".mgp_active").removeClass("mgp_active").find("li").eq(0).addClass("mgp_active")
  qs(".mgp_options").addEventListener('click', async () => {
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
  });
  (qs(".mgp_clickHandler").addEventListener('click', async () => {
    $("div.mgp_optionsMenu")
        .removeClass("mgp_visible mgp_level2")
        .find(".mgp_background")
        .removeClass("mgp_animated")
        .attr("style", "width: 165px; height: 136px;");
    $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
  }));
  $("div.mgp_header").on("click", function () {
    $("div.mgp_optionsMenu.mgp_visible.mgp_level2")
      .removeClass("mgp_level2")
      .find(".mgp_background")
      .attr("style", "width: 165px; height: 136px;");
  });
  check.lo ? ($(".votes-fav-wrap").hide(), $(".userActions").hide()) : false;
};
check.cv ? log(`Categories`) : false;
check.user ? log(`User Profile`) : false;
if (check.model) {
  log(`Model`);
  userInfo("model");
}
check.community
  ? (log(`Community`),
    check.lo
      ? ($(".userWidgetbuttons").remove(), $("#communityMenuWrap").remove())
      : false)
  : false;
check.pstar ? log(`Pornstar`) : false;
if (check.gif) {
  log(`Gifs`);
  check.lo ? $(".float-right").remove() : false;
}
/recommended/.test(locate)
  ? check.lo
    ? $('a[href="/recommended/rate"]').addClass("rm")
    : false
  : false;
userInfo();

if(check.lo) {
  log("Logged out");
  disablePlaylistPlusButon = true;
}

document.addEventListener("scroll", async () => {
  const search = $(".headerSearchWrapper"),
    pgnav = $(".pagination3 > ul").eq(1),
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
      //smol.removeClass("bigp"),
      //smol.addClass("smolp")
      ) : ($(".magicTop").removeClass("top"),
      search.removeClass("sticky"),
      pgnav.removeClass("top"),
      mph1.attr("style", "display: none;"),
      mph2.attr("style", "display: none;")
      //smol.addClass("bigp"),
      //smol.removeClass("smolp")
      );
});
