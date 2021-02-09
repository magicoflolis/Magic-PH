"use strict";
import { $, check } from "./core.js";
import { sidescr } from "./load.js";
import "./header.js";
// page_params.jqueryVersion = 'https://code.jquery.com/jquery-git.js'
// console.clear();
let scrollnumber = 110,
  jsname = "[MagicPH]",
  debug = "[MagicPH Debug]",
  dl = document.location,
  magictop = document.createElement("input"),
  sidenav = document.createElement("div"),
  navscript = document.createElement("script"),
  lognav =
    '<a class="magic1" id="magicNav" href="/">Home</a>\n<a class="magic2" id="magicNav">Catagories</a>\n<a class="magic3" id="magicNav" href="/recommended">Recommended (WIP)</a>\n<a class="magic4" id="magicNav" href="/recommended/taste">Taste Profile (WIP)</a>\n<a class="magic5" id="magicNav">Favorites (WIP)</a>\n<a class="magic6" id="magicNav"> (WIP)</a>\n<a class="magic7" id="magicNav"> (WIP)</a>\n<a class="magic999" id="magicNav">Options (WIP)</a>',
  callback = () => {
    try {
      console.log(`${jsname} Loading inline script...`);
      sidenav.className = "sidenav";
      sidenav.innerHTML = lognav;
      navscript.innerHTML = sidescr;
      magictop.className = "magicTop";
      magictop.value = "Top";
      magictop.type = "button";
      magictop.onclick = async () => {
        $("html, body").animate({ scrollTop: 100 }, 800);
      };
      $(".wrapper").before(magictop, sidenav, navscript);
      check.channel = $("#channelsProfile").length;
      check.home = $(".frontListingWrapper").length;
      check.video = $("#player").length;
      check.cv = $(".gridWrapper").length;
      check.new = $("#headerSearchWrapperFree").length;
      check.gay = $(".gayLayout").length;
      check.lo = $(".logged-out").length;
      check.premium = $(".premiumUser").length;
      check.gif = $("#gifWrap").length;
      check.user = $("#profileContent").length;
      check.model = $(".amateurModel").length;
      check.pstar = $(".claimed").length;
      // PH.Find();
      if (check.channel) {
        console.log(`${jsname} Channel`);
      }
      if (check.home) {
        console.log(`${jsname} Homepage`);
        $("#recommended-category-videos").prependTo(".frontListingWrapper");
        $("#recommended-videos").prependTo(".frontListingWrapper");
      }
      if (check.video) {
        console.log(`${jsname} Video Page`);
        let q = $("mhp1138_quality.mhp1138_optionsList > li:nth-child(1)");
        scrollnumber = 400;
        $(".show-more-btn").addClass("bottom");
        $(".mainPlayerDiv").addClass("bigp");
        $(".relatedVideos")
          .attr("id", "vb")
          .addClass("video-info-row showLess allRelatedVideos");
        $("#vb").appendTo(".video-actions-tabs");
        $(".videos-list").attr("id", "vr").addClass("video-info-row showLess");
        $("#vr").appendTo("#vb");
        $("#vr > .user-playlist").attr("id", "relatedVideosCenter");
        q.attr("class", "mhp1138_active");
        // $("#player").attr("class", "mainPlayerDiv wide");
        if (check.lo) {
          $(".votes-fav-wrap").hide();
          $(".userActions").hide();
        }
      }
      if (check.cv) {
        console.log(`${jsname} Categories`);
        // PH.catjunk();
      }
      if (check.user) {
        console.log(`${jsname} User Profile`);
      }
      if (check.model) {
        console.log(`${jsname} Model`);
      }
      if (dl.pathname == "/user/discover") {
        if (check.lo) {
          $(".userWidgetbuttons").remove();
          $("#communityMenuWrap").remove();
        }
      }
      if (check.pstar) {
        console.log(`${jsname} Pornstar`);
      }
      if (check.gif) {
        console.log(`${jsname} Gifs`);
        if (check.lo) {
          $(".float-right").remove();
        }
      }
    } catch (err) {
      console.error(`${debug} ${err}`);
    }
  };
window.onscroll = () => {
  let sticky = $(".headerSearchWrapper"),
    fixed = $(".pagination3 > ul"),
    smol = $(".mainPlayerDiv"),
    scroll = $(window).scrollTop(),
    sma = $("#vb"),
    smb = $("#vr"),
    a = () => {
      $(".magicTop").attr("style", "top: 90%");
      sticky.addClass("sticky");
      fixed.attr("style", "top: 90%");
      sma.attr("style", "display: block;");
      smb.attr("style", "display: block;");
      smol.removeClass("bigp");
      // $(".navbackground").addClass("smolnav");
      // smol.prependTo(".navbackground")
      smol.addClass("smolp");
    },
    b = () => {
      $(".magicTop").attr("style", "");
      sticky.removeClass("sticky");
      fixed.attr("style", "");
      sma.attr("style", "display: none;");
      smb.attr("style", "display: none;");
      smol.addClass("bigp");
      // $(".navbackground").removeClass("smolnav");
      // smol.prependTo(".video-wrapper")
      smol.removeClass("smolp");
    };
  scroll >= scrollnumber ? a() : b();
};
document.readyState === "complete" ||
(document.readyState !== "loading" && !document.documentElement.doScroll)
  ? callback()
  : document.addEventListener("DOMContentLoaded", callback);
// console.log(cacheVersion)
