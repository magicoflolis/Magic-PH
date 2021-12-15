import log from "./logger";

const brws = (typeof browser == "undefined") ? chrome : browser;

//https://*.phncdn.com/html5player/videoPlayer/es6player/*/desktop-player-adaptive-hls.*


let blockList = [
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
];

function blocked(details) {
  log(details.url);
  return { cancel: true };
}

brws.webRequest.onBeforeRequest.addListener(blocked,
{
  urls: blockList,
  types: ["image", "script", "stylesheet"]
},
['blocking']
);