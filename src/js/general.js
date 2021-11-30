import jQuery from '../web_accessible_resources/jquery.js';

window.$ = window.jQuery = jQuery;

const log = (msg) => {
  return console.log("[MagicPH]", msg);
},
err = (msg) => {
  return console.log("[MagicPH] YOU FUCKED IT"),console.error("[MagicPH]", msg);
},
qs = (element) => {
  return document.querySelector(element);
},
/**
 * Can create various elements.
 */
create = (element, type, name) => {
  let el = document.createElement(element);
  type ? (el.type = type) : false;
  name ? (el.className = name) : false;
  return el;
},
/**
 * Finds which subpage the user is currently on.
 */
// fpg = (url) => {
//   return url.test(document.location.href);
// },
locate = document.location.href,
check = {
  community: document.location.pathname == "/user/discover" ? true : false,
  channel: $("#channelsProfile").length,
  cv: $(".gridWrapper").length,
  home: document.location.pathname == "/" ? true : false,
  gay: /gay/.test(locate),
  gif: $("#gifWrap").length,
  lo: $("body.logged-out").length,
  model: $("div.amateurModel").length,
  new: $("#headerSearchWrapperFree").length,
  premium: $(".premiumUser").length,
  pstar: $(".claimed").length,
  user: $("#profileContent").length,
  video: /view_video.php/.test(locate),
  //recommended: $("div#recommendations").length
  recommended: /recommended/.test(locate),
};

let config = {
  altplayers: "none",
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: false,
  sidebar: false,
  headerOrder: [
    "home",
    "videos",
    "categories",
    "pornstars",
    "gifs",
    "recommended",
    "custom",
  ],
  headerLinks: {
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community: "/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    Gift: "/premium",
    GPremium: "/gay/premium",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr",
  },
},
scrollnumber = /view_video.php/.test(locate) ? 400 : 110,
userInfo = (url = "default") => {
  let uName = $("div.usernameWrap > a"),
  mod = $("a.usernameLink"),
  vid = $("span.usernameBadgesWrapper > a"),
  val = "";
  (url == "model") ? (val = mod) : (url == "video") ? (val = vid) : (val = uName);
  for (let i = 0; i < val.attr("href").length; i++) {
    val.eq(i).attr("href", `${val.eq(i).attr("href")}/videos`);
  }
};

export {
  locate,
  log,
  err,
  qs,
  create,
  check,
  config,
  userInfo,
  scrollnumber
};