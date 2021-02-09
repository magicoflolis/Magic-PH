"use strict";
const jsname = "[Sync]",
  debug = "[Sync Debug]",
  check = {};
let config = {
    altplayers: false,
    autoscroll: true,
    blurimg: false,
    comments: true,
    topbutton: false,
    fasttravel: true,
    header1: "separate",
  },
  cfblur = () => {
    document.querySelector(".js-mxp > img").className += " blur";
    document.querySelector("img.thumb").className += " blur";
    document.querySelector(".title").setAttribute("style", "display: none !important");
    document.querySelector(".videoUploaderBlock").setAttribute("style", "display: none !important");
    document.querySelector(".isMe").setAttribute("style", "display: none !important");
  };
  coms = document.querySelector("#cmtWrapper") ? true : false;
  console.log(`${jsname} Loading Sync`);
  config.autoscroll == "true" ? window.scrollTo(0, 110) : console.log("a");
  config.blurimg == "true" ? cfblur() : console.log("b");
  config.topbutton == "false"
    ? (document.querySelector(".magicTop").className += " rm")
    : console.log("t");
    check.video = (document.location.pathname == "/view_video.php") ? () => {
      config.comments == "false" ? coms.hide() : (coms.className += "video-info-row showLess");
    } : console.log("v");

document.readyState === "complete" ||
(document.readyState !== "loading" && !document.documentElement.doScroll)
  ? begin()
  : document.addEventListener("DOMContentLoaded", begin);
  console.log(`${jsname} Loaded`);
