'use strict';
const brws = (typeof browser=='undefined'?chrome:browser),
configDefault = {
  debug: true,
  altplayers: 'none',
  seektime: 4,
  autojump: false,
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
  favorites: {
    video: {
      title: '',
      thumb: '',
      link: '',
    },
  },
  blacklist: 'none',
  headerOrder: [
    'home',
    'videos',
    'categories',
    'pornstars',
    'gifs',
    'recommended',
    'favorites',
  ],
  headerLinks: {
    url: {
      h1_link: '/',
      h2_link: '/',
      h3_link: '/',
      h4_link: '/',
      h5_link: '/',
      h6_link: '/',
      h7_link: '/',
      h8_link: '/',
    },
    name: {
      h1_link: '/',
      h2_link: '/',
      h3_link: '/',
      h4_link: '/',
      h5_link: '/',
      h6_link: '/',
      h7_link: '/',
      h8_link: '/',
    },
  },
},
// blacklist: {
//   blowjob: false,
//   cumshot: false,
//   facesitting: false,
//   fingering: false,
//   footjob: true,
//   missionary: false,
//   pussylicking: false,
//   tittyfucking: false,
//   toy: false,
//   scissoring: false,
//   sex: false,
// },
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
// {video: {
//   title: '',
//   thumb: '',
//   link: '',
// }},

export default webext;