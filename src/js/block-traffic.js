'use strict';

let brws = (typeof browser=='undefined'?chrome:browser);
// let log = (...message) => {
//   console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
// };
const block = {
  urls: [
    'https://*.trafficjunky.*/*',
    'https://ads.trafficjunky.net/*',
    'https://static.trafficjunky.com/*',
    'https://*.phncdn.com/pre_videos/*',
    'https://*.phncdn.com/www-static/*/htmlPauseRoll/pb_block.*',
    'https://*.phncdn.com/www-static/js/lib/networkbar-*',
    'https://*.phncdn.com/www-static/js/lib/generated/front-index-*',
    'https://*.phncdn.com/www-static/css/front-index-pc.css',
    'https://*.phncdn.com/www-static/*/premium/premium-modals.*',
    'https://*.phncdn.com/www-static/js/ph-*',
    'https://*.phncdn.com/www-static/js/promo-*',
    'https://www.etahub.com/*',
    'https://*.pornhub.com/_xa/*',
    'https://*.pornhub.com/js/*',
    'https://*.adtng.com/*',
    'https://stats.g.doubleclick.net/*',
    'https://*.pornhub.com/front/menu_livesex*',
    'https://*.phncdn.com/videos/*/*/*/*.webm',
    // 'https://*.phncdn.com/www-static/js/lib/jquery.slimscroll.min.js',
  ],
};
// eslint-disable-next-line no-unused-vars
function blockUrl(request) {
  // console.groupCollapsed('[%cMagicPH%c] %cGROUP', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);');
  // console.groupEnd();
  // filterUrl('pornhub','noop.js');
  // log(decodeURIComponent(request.url));
  return { cancel: true }
};

function isDataURL(requestDetails) {
  const s = requestDetails.url;
  return s.substring(0, 4) === 'data';
};

function promise(requestDetails) {
  if (isDataURL(requestDetails)) {
    return {};
  } else {
    return blockUrl(requestDetails);
  }
};

brws.webRequest.onBeforeRequest.addListener(promise, {urls: block.urls,}, ['blocking']);