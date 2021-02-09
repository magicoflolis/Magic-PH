"use strict";
import { $, cfg, check, ls, mod, src } from "./core.js";

const jsname = "[Header]",
  debug = "[Header Debug]",
  coms = $("#cmtWrapper"),
  recommended = document.querySelector(".realsex > a"),
  r_span = document.querySelector("#menuItem6 > a:nth-child(1) > span:nth-child(1)"),
  altplayers = localStorage.getItem("altplayers"),
  autoscroll = localStorage.getItem("autoscroll"),
  blurimg = localStorage.getItem("blurimg"),
  comments = localStorage.getItem("comments"),
  fav = localStorage.getItem("favorites"),
  mran = localStorage.getItem("magicran"),
  // fasttravel = localStorage.getItem("fasttravel") , // Sidebar
  thumbnails = localStorage.getItem("magicthumb"),
  topbutton = localStorage.getItem("topbutton");
try {
  check.gay = $(".gayLayout").length;
  check.new = $("#headerSearchWrapperFree").length;
  check.premium = $(".premiumUser").length;
  check.video = $("#player").length;
  mod.Logo = "/recommended";
  mod.Home = "/";
  mod.Video = "/video?o=tr&hd=1";
  mod.Category = "/categories?o=al";
  mod.Pornstar = "/pornstars?performerType=pornstar";
  mod.Community = "/user/discover";
  mod.Photo = "/gifs";
  mod.Premium = "/premium";
  mod.GPremium = "/gay/premium";
  mod.Gift = "/premium";
  mod.GLogo = "/gay/recommended";
  mod.GHome = "/gay";
  mod.GVideo = "/gay/video?o=tr&hd=1";
  mod.GCategory = "/gay/categories?o=al";
  mod.GPornstar = "/gay/pornstars?performerType=pornstar";
  mod.GCommunity = "/user/discover/gay";
  mod.GPhoto = "/gay/gifs?o=tr";
  src.Logo = $('.logoWrapper > a[itemprop="url"]');
  src.Home = $('.home > a[href="/"]');
  src.Video = $('.videos > a[href="/video"]');
  src.Category = $('.categories > a[href="/categories"]');
  src.Pornstar = $('.pornstar > a[href="/pornstars"]');
  src.Community = $('.community > a[href^="/community"]');
  src.Photo = $('.photos > a[href^="/albums"]');
  src.Premium = $('.premium > a[href="/premium"]');
  src.Gift = $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]');
  src.GLogo = $('.logoWrapper > a[href="/gayporn"]');
  src.GHome = $('.home > a[href="/"]');
  src.GVideo = $('.videos > a[href="/gayporn"]');
  src.GCategory = $('.categories > a[href="/gay/categories"]');
  src.GPornstar = $('.pornstar > a[href="/gay/pornstars"]');
  src.GCommunity = $('.community > a[href^="/community?section=gay"]');
  src.GPhoto = $('.photos > a[href^="/albums/gay"]');
  src.GPremium = $('.premium > a[href="/gay/premium"]');
  cfg.altplayers = localStorage.setItem("altplayers", "false");
  cfg.autoscroll = localStorage.setItem("autoscroll", "true");
  cfg.blurimg = localStorage.setItem("blurimg", "false");
  cfg.comments = localStorage.setItem("comments", "false");
  cfg.fav = localStorage.setItem("favorites", "{}");
  // cfg.fasttravel = localStorage.setItem("fasttravel", false) // Sidebar
  cfg.thumbnails = localStorage.setItem("magicthumb", "true");
  cfg.topbutton = localStorage.setItem("topbutton", "true");
  cfg.mran = () => {
    console.log(`${jsname} Init Local Storage`);
    localStorage.setItem("magicran", 1);
    window.location.reload();
  };
  ls.init = async () => {
    altplayers ?? cfg.altplayers;
    autoscroll ?? cfg.autoscroll;
    blurimg ?? cfg.blurimg;
    comments ?? cfg.comments;
    fav ?? cfg.fav;
    thumbnails ?? cfg.thumbnails;
    topbutton ?? cfg.topbutton;
    mran ?? cfg.mran(); //reloads
  };
  ls.begin = () => {
    console.log(`${jsname} Local Storage Passed`);
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
      chvid = () => {
        src.Home.attr("href", mod.Home);
      },
      chnp = () => {
        // src.Logo.attr("href", mod.Logo);
        // src.Home.attr("href", mod.Home);
        src.Video.attr("href", mod.Video);
        src.Category.attr("href", mod.Category);
        src.Pornstar.attr("href", mod.Pornstar);
        src.Community.attr("href", mod.Community);
        src.Photo.attr("href", mod.Photo);
        // src.Premium.attr("href", mod.Premium);
        // src.Gift.attr("href", mod.Gift);
      },
      cfblur = () => {
        $(".js-mxp > img").addClass("blur");
        $("img.thumb").addClass("blur");
        $(".title").hide();
        $(".videoUploaderBlock").hide();
        $(".isMe").hide();
      };
    autoscroll == "true"
      ? $("html, body").animate({ scrollTop: 100 }, 800)
      : false;
    blurimg == "true" ? cfblur() : false;
    topbutton == "false" ? $("#magicTop").addClass("rm") : false;
    comments == "false"
      ? coms.hide()
      : coms.addClass("video-info-row showLess");
    check.gay ? chgay() : false;
    check.new || check.Premium ? chnp() : false;
    check.video ? chvid() : false;
  };
  // ls.begin()
  mran ? ls.begin() : ls.init();
} catch (err) {
  console.error(`${debug} ${err}`);
}
// ch = check.gay ? chgay() : check.video ? chvid() : check.new || check.Premium ? chnp() : ch;
    //   cfscroll = autoscroll == "true" ? $("html, body").animate({ scrollTop: 100 }, 800) : blurimg == "true" ? cfblur() : topbutton == "false" ? $("#magicTop").addClass("rm") : comments == "false" ? coms.hide() : coms.addClass("video-info-row showLess");
    // return cfscroll;
