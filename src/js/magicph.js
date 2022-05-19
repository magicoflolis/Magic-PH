'use strict';

import mph from './api.js';
import qs from "./querySelector.js";
import { check, userInfo } from "./general.js";
// mph.log("Loading inline script...");
//const pginput = $(`<div class="pjump"><input class="jumper" id="pageInput" type="number" name="pageJump" placeholder="Jump to page"></div>`);

check.channel ? mph.log("Channel page") : false;
check.home
  ? (mph.info("Homepage page"),
  //$(pginput).prependTo(".container > .pagination3"),
  $("#recommended-category-videos").parent().prependTo(".frontListingWrapper"),
  $("#recommended-videos").parent().prependTo(".frontListingWrapper"))
  : false;
//window.PH_Storage.getItem("watchedVideoIds") // stored videos
//window.PH_Storage.saveItem("watchedVideoStorage")
if(check.video) {
  mph.info("Video page");
  $("html").attr("style", "scrollbar-color: #4646463d #000 !important;")
  localStorage.setItem("mgp_player", '{"quality":1080}')
  userInfo("video");
  $('[data-entrycode="VidPg-premVid-videoPage"]').parent().parent().remove();
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
  mph.ael(qs(".mgp_options"),"click", () => {
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
  mph.ael(qs(".mgp_clickHandler"),"click", () => {
    $("div.mgp_optionsMenu")
        .removeClass("mgp_visible mgp_level2")
        .find(".mgp_background")
        .removeClass("mgp_animated")
        .attr("style", "width: 165px; height: 136px;");
    $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
  });
  $("div.mgp_header").on("click", function () {
    $("div.mgp_optionsMenu.mgp_visible.mgp_level2")
      .removeClass("mgp_level2")
      .find(".mgp_background")
      .attr("style", "width: 165px; height: 136px;");
  });
};
check.category ? mph.info("Categories") : false;
check.user ? mph.info("User Profile") : false;
if(check.model) {
  mph.info(`Model`);
  userInfo("model");
}
// check.community
//   ? (mph.info(`Community`),
//     check.lo
//       ? ($(".userWidgetbuttons").remove(), $("#communityMenuWrap").remove())
//       : false)
//   : false;
check.pstar ? mph.info(`Pornstar`) : false;
if (check.gif) {
  mph.info(`Gifs`);
  check.lo ? $(".float-right").remove() : false;
}
check.recommended
  ? (check.lo
    ? $('a[href="/recommended/rate"]').addClass("rm")
    : false
    //$(pginput).prependTo(".recommendedVideosContainer > .pagination3")
    ) : false;
userInfo();

if(check.lo) {
  mph.info("Logged out");
  mph.inject(`disablePlaylistPlusButon = true`);
};

// pginput.on("change", async function (e) {
//   e.preventDefault();
//   let link = `${document.location.origin}${check.recommended ? `?page=` : `/video?page=`}${e.target.value}`;
//   mph.log(link);
//   await mph.getURL(link).then((text) => {
//     $("body").html(text);
//     let thumb = $("ul#videoCategory > li > img");
//     for (let i = 0; i < thumb.length; i++) {
//       thumb.eq(i).attr("src", thumb.eq(i).attr("data-thumb_url"));
//     };
//   });
// });

mph.ael(document,"scroll", () => {
  const search = $(".headerSearchWrapper"),
    pgnav = $(".pagination3 > ul").eq(1),
    pgInput = $(".pagination3 > .pjump").eq(1),
    mph1 = $(".mph1"),
    mph2 = $(".mph2");
    // smol = $(".mainPlayerDiv");
  // sma = $("#vb"),
  // smb = $("#vr"),
  if(check.video) {
    if(document.documentElement.scrollTop > 300) {
      $(".magicCenter").addClass("top");
    } else {
      $(".magicCenter").removeClass("top");
    };
  };
  if(document.documentElement.scrollTop > mph.scrollnumber) {
    $(".magicTop").addClass("top");
    search.addClass("sticky");
    pgnav.addClass("top");
    pgInput.addClass("top");
    mph1.attr("style", "display: block;");
    mph2.attr("style", "display: block;");
    $(".magicCenter").removeClass("top");
    //smol.removeClass("bigp");
    //smol.addClass("smolp");
  } else {
    $(".magicTop").removeClass("top");
    search.removeClass("sticky");
    pgnav.removeClass("top");
    pgInput.removeClass("top");
    mph1.attr("style", "display: none;");
    mph2.attr("style", "display: none;");
    //smol.addClass("bigp");
    //smol.removeClass("smolp");
  };
});