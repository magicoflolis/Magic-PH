import block from './block-traffic.js';

try {
  block.start();
} catch (error) {
  console.group(`[MagicPH] Time: ${performance.now()}ms ERROR`),
  console.error(error),
  console.trace(error),
  console.groupEnd();
}


// brws.webRequest.onCompleted.addListener(async (r) => {
//   log(`TabId: ${r.tabId > 0 ? r.tabId : false}`);
//   // log(r);
//   const tabs = await brws.tabs.query({ url: '<all_urls>' });
//   for ( const tab of tabs  ) {
//     if ( tab.discarded === true ) { continue; }
//     const { id, url } = tab;
//     /^https?:\/\//.test(url) ? brws.tabs.executeScript(id,{
//       file: "js/injector.js"
//     }) : false
//   };
// },{urls: ["https://www.pornhub.com/*","https://pornhub.com/*"]}
// );

//https://*.phncdn.com/html5player/videoPlayer/es6player/*/desktop-player-adaptive-hls.*
//"https://*.phncdn.com/www-static/js/mg_modal-*",
