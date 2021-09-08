import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
export const log = (msg) => {
    return console.log("[MagicPH]", msg);
  },
  err = (msg) => {
    return console.error("[MagicPH]", msg);
  },
  qs = (element) => {
    return document.querySelector(element);
  },
  create = (element, type, name) => {
    let el = document.createElement(element);
    type ? (el.type = type) : false;
    name ? (el.className = name) : false;
    return el;
  },
  // preventDefault = (ev) => {
  //   ev.preventDefault();
  //   return true;
  // },
  check = {
    recommended: $("div#recommendations").length,
    community: document.location.pathname == "/user/discover" ? true : false,
    channel: $("#channelsProfile").length,
    cv: $(".gridWrapper").length,
    home: $(".frontListingWrapper").length,
    gay: $(".gayLayout").length,
    gif: $("#gifWrap").length,
    lo: $(".logged-out").length,
    model: $("div.amateurModel").length,
    new: $("#headerSearchWrapperFree").length,
    premium: $(".premiumUser").length,
    pstar: $(".claimed").length,
    user: $("#profileContent").length,
    video: $("#player").length,
  };

export let config = {
  altplayers: "none",
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
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
  headerOrder: [
    "home",
    "videos",
    "categories",
    "pornstar",
    "photos",
    "customize",
  ],
};
