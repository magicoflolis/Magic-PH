"use strict";

(() => {
  const block = {
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
      "https://*.pornhub.com/_xa/ads_*",
      "https://*.pornhub.com/front/menu_livesex?segment=*",
      "https://www.etahub.com/*",
    ],
    start: () => {
      brws.webRequest.onBeforeRequest.addListener(
        () => {
          return { cancel: true };
        },
        {
          urls: block.urls,
          types: ["image", "script", "stylesheet"],
        },
        ["blocking"]
      );
    },
  };
  block.start();
})();

// export default block;
