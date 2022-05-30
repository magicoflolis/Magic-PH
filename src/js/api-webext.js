'use strict';
const brws = (typeof browser=="undefined"?chrome:browser),
configDefault = {
  debug: true,
  altplayers: "none",
  seektime: 4,
  autojump: false,
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
  favorites: "",
  blacklist: "none",
  headerOrder: [
    "home",
    "videos",
    "categories",
    "pornstars",
    "gifs",
    "recommended",
    "favorites",
  ],
  headerLinks: {
    url: {
      h1_link: "/",
      h2_link: "/",
      h3_link: "/",
      h4_link: "/",
      h5_link: "/",
      h6_link: "/",
      h7_link: "/",
      h8_link: "/",
    },
    name: {
      h1_link: "/",
      h2_link: "/",
      h3_link: "/",
      h4_link: "/",
      h5_link: "/",
      h6_link: "/",
      h7_link: "/",
      h8_link: "/",
    },
  },
},
webext = {
  getItem(callback) {
    brws.storage.local.get(configDefault,callback);
  },
  getSync(callback) {
    brws.storage.sync.get(configDefault,callback);
  },
  getURL(path) {
    brws.runtime.getURL(path)
    return path;
  },
  setItem(keys) {
    brws.storage.local.set(keys);
    return keys;
  },
  setSync(keys) {
    brws.storage.sync.set(keys);
    return keys;
  },
};

export default webext;