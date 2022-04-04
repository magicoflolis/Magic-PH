import brws from './webext.js';

const block = {
  fn: () => {
    return { cancel: true };
  },
  urls: [
    "https://static.trafficjunky.com/*",
    "https://hubt.pornhub.com/*",
    "https://*.phncdn.com/www-static/*/htmlPauseRoll/pb_block.*",
    "https://*.phncdn.com/www-static/js/lib/networkbar-*",
    "https://*.phncdn.com/www-static/js/lib/generated/front-index-*",
    "https://*.phncdn.com/www-static/css/front-index-pc.css",
    "https://*.phncdn.com/www-static/*/premium/premium-modals.*",
    "https://*.phncdn.com/www-static/js/ph-*",
    "https://*.phncdn.com/www-static/js/promo-*",
    "https://*.pornhub.com/_xa/ads_*"
  ],
  start: () => {
    return brws.webRequest.onBeforeRequest.addListener(block.fn, {
      urls: block.urls,
      types: ["image", "script", "stylesheet"]
    }, ['blocking'] );
  },
};

export default block;