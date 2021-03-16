"use strict";
import { $ } from "./core.js";

const check = {},
  debug = "[Header Debug]",
  recommended = document.querySelector(".realsex > a"),
  r_span = document.querySelector(
    "#menuItem6 > a:nth-child(1) > span:nth-child(1)"
  );
try {
  check.gay = document.querySelectorAll(".gayLayout").length;
  check.new = document.querySelectorAll("#headerSearchWrapperFree").length;
  check.premium = document.querySelectorAll(".premiumUser").length;
  check.video = document.querySelectorAll("#player").length;
  let mod = {
    Logo: "/recommended",
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community: "/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    GPremium: "/gay/premium",
    Gift: "/premium",
    GLogo: "/gay/recommended",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr",
  },
  src = {
    Logo: $('.logoWrapper > a[itemprop="url"]'),
    Home: $('.home > a[href="/"]'),
    Video: $('.videos > a[href="/video"]'),
    Category: $('.categories > a[href="/categories"]'),
    Pornstar: $('.pornstar > a[href="/pornstars"]'),
    Community: $('.community > a[href^="/community"]'),
    Photo: $('.photos > a[href^="/albums"]'),
    Premium: $('.premium > a[href="/premium"]'),
    Gift: $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]'),
    GLogo: $('.logoWrapper > a[href="/gayporn"]'),
    GHome: $('.home > a[href="/"]'),
    GVideo: $('.videos > a[href="/gayporn"]'),
    GCategory: $('.categories > a[href="/gay/categories"]'),
    GPornstar: $('.pornstar > a[href="/gay/pornstars"]'),
    GCommunity: $('.community > a[href^="/community?section=gay"]'),
    GPhoto: $('.photos > a[href^="/albums/gay"]'),
    GPremium: $('.premium > a[href="/gay/premium"]'),
  }
  r_span.textContent = "recommended";
  recommended.setAttribute("href", "/recommended");
  recommended.setAttribute("target", "_self");
  let chgay = () => {
      // src.GLogo.attr("href", mod.GLogo);
      // src.GHome.attr("href", mod.GHome);
      src.GVideo.attr("href", mod.GVideo);
      src.GCategory.attr("href", mod.GCategory);
      src.GPornstar.attr("href", mod.GPornstar);
      src.GCommunity.attr("href", mod.GCommunity);
      src.GPhoto.attr("href", mod.GPhoto);
      recommended.attr("href", "/gay/recommended");
      // src.Gift.attr("href", mod.Gift);
      // src.GPremium.attr("href", mod.GPremium);
    },
    // chvid = () => {
    //   src.Home.attr("href", mod.Home);
    // },
    chnp = () => {
      // src.Logo.attr("href", mod.Logo);
      // src.Home.attr("href", mod.Home);
      src.Video.attr("href", mod.Video);
      // src.Category.attr("href", mod.Category);
      src.Pornstar.attr("href", mod.Pornstar);
      src.Community.attr("href", mod.Community);
      src.Photo.attr("href", mod.Photo);
      // src.Premium.attr("href", mod.Premium);
      // src.Gift.attr("href", mod.Gift);
    };
  check.gay ? chgay() : false;
  check.new || check.Premium ? chnp() : false;
  // check.video ? chvid() : false;
} catch (err) {
  console.error(`${debug} ${err}`);
}



//   ls.init = () => {
//     console.log(`${jsname} Init Local Storage`);
//     localStorage.setItem("magicran", "true");
//     document.onstorage = event => { // same as window.addEventListener('storage', event => {
//       console.log(`${event.key}:${event.newValue}:${event.oldValue}`);
//       // magicCheck();
//       // localStorage.setItem(event.key, event.newValue);
// };
//   };
// ch = check.gay ? chgay() : check.video ? chvid() : check.new || check.Premium ? chnp() : ch;
//   cfscroll = autoscroll == "true" ? $("html, body").animate({ scrollTop: 100 }, 800) : blurimg == "true" ? cfblur() : topbutton == "false" ? $("#magicTop").addClass("rm") : comments == "false" ? coms.hide() : coms.addClass("video-info-row showLess");
// return cfscroll;
// cfg.altplayers = localStorage.setItem("altplayers", "false");
// cfg.autoscroll = localStorage.setItem("autoscroll", "true");
// cfg.blurimg = localStorage.setItem("blurimg", "false");
// cfg.comments = localStorage.setItem("comments", "false");
// cfg.fav = localStorage.setItem("favorites", "{}");
// // cfg.fasttravel = localStorage.setItem("fasttravel", false) // Sidebar
// cfg.thumbnails = localStorage.setItem("magicthumb", "true");
// cfg.topbutton = localStorage.setItem("topbutton", "true");

// window.onstorage = event => {
// };
