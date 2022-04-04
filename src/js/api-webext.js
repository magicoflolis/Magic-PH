const brws = (typeof browser=="undefined"?chrome:browser),
webext = {
  config: {
    debug: true,
    altplayers: "none",
    seektime: 4,
    autojump: false,
    autoscroll: true,
    blurimg: false,
    comments: false,
    topbutton: false,
    sidebar: false,
    favorites: "",
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
  getItem(callback) {
    return brws.storage.local.get(null,callback);
  },
  getURL(path) {
    brws.runtime.getURL(path)
    return path;
  },
  setItem(keys) {
    brws.storage.local.set(keys)
    return keys;
  },
};

export default webext;