const brws = (typeof browser=="undefined"?chrome:browser);
function loadConfig() {
  let configDefault = {
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
  };
  brws.storage.local.get(configDefault,(config) => {
    let ff = document.querySelector("form.magicph_cfg") ?? console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', "Can't find form");
    for (let prop in config) {
      prop in ff.elements
        ? ff.elements[prop].type == "checkbox"
          ? (ff.elements[prop].checked = config[prop])
          : (ff.elements[prop].value = config[prop])
        : false;
    }
    ff.addEventListener("change", (e) => {
      let $el = /** @type {HTMLInputElement} */ (e.target);
      $el.type == "checkbox"
        ? (config[$el.name] = $el.checked)
        : (config[$el.name] = $el.value);
      brws.storage.local.set(config);
    });
  })
};

document.addEventListener("DOMContentLoaded", loadConfig);

// headerOrder: [
//   "home",
//   "videos",
//   "categories",
//   "pornstars",
//   "gifs",
//   "recommended",
//   "custom",
// ],
// headerLinks: {
//   Home: "/",
//   Video: "/video?o=tr&hd=1",
//   Category: "/categories?o=al",
//   Pornstar: "/pornstars?performerType=pornstar",
//   Community: "/user/discover",
//   Photo: "/gifs",
//   Premium: "/premium",
//   Gift: "/premium",
//   GPremium: "/gay/premium",
//   GHome: "/gay",
//   GVideo: "/gay/video?o=tr&hd=1",
//   GCategory: "/gay/categories?o=al",
//   GPornstar: "/gay/pornstars?performerType=pornstar",
//   GCommunity: "/user/discover/gay",
//   GPhoto: "/gay/gifs?o=tr",
// }