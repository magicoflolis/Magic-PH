'use strict';
import { err, log } from './logger.js';
import Config from './config.js';

const hermes = mph.hermes;

const block = {
  mini: [
    'phncdn.com/www-static/js/lib/networkbar',
    'phncdn.com/networkbar-*',
    'phncdn.com/www-static/js/quality-selector.js',
    'pornhub.com/front/menu_livesex',
    'phncdn.com/www-static/js/promo-',
  ],
  full: [
    'phncdn.com/www-static/js/lib/networkbar',
    'phncdn.com/networkbar-*',
    'phncdn.com/www-static/js/quality-selector.js',
    'pornhub.com/front/menu_livesex',
    'phncdn.com/www-static/js/promo-',
    'phncdn.com/stattracker-*',
    'phncdn.com/pre_videos/*',
    'phncdn.com/www-static/*/htmlPauseRoll/pb_block.',
    'phncdn.com/www-static/js/lib/generated/front-index-',
    'phncdn.com/www-static/css/front-index-pc.css',
    'phncdn.com/www-static/*/premium/premium-modals.',
    'phncdn.com/www-static/js/ph-',
    'phncdn.com/videos/*/*/*/*.webm',
    'trafficjunky.(com|net)',
    'hotjar.com/c/hotjar-*.js?sv=*',
    'etahub.com/*',
    'g.doubleclick.net/*',
    'adtng.com/*',
    'pornhub.com/_xa',
    'pornhub.com/js/*',
  ],
  final: [],
};

function traffic(details) {
  const requestURL = details.url;
  if (details.tabId > 0 ) {
    // seg-[\w\d-]+\.ts|
    if (requestURL.match(/ads\W\D/g)) {
      return { cancel: true };
    };
    for (const b of block.final) {
      const teststr = new RegExp(`https://\\w+.${b}`,'gi');
      if (requestURL.match(teststr)) {
        return { cancel: true };
      };
    };
  };
  return;
};

const win = self ?? window;
win.Config = Config;

const injMPH = (tabId, changeInfo, tabInfo) => {
  if (mph.isEmpty(tabInfo.url)) { return; };
  if (!tabInfo.url.match(/pornhub/g)) { return; };
  if (!Object.is(changeInfo.status, 'complete')) { return; };
  webext.tabs.executeScript(tabId, {
    file: 'js/mph-common.js'
  }).then(() => {
    webext.tabs.executeScript(tabId, {
      file: 'js/magicph.js'
    });
  });
};

const msgCache = {};
const isVideo = link => link.match(/(video|watch)+|\/[\d]+\//g) || link.includes('redtube') && link.match(/\/[\d]+/g);
webext.runtime.onConnect.addListener((p) => {
  hermes.port = p;
  const cfg = Config.cachedLocalStorage ?? {};
  /**
   * Default post message to send to all connected scripts
   */
  Object.assign(msgCache, { cfg });
  hermes.send('Config', msgCache);
  hermes.getPort().onMessage.addListener((root) => {
    log('Background Script: received message from content script',root);
    const r = root.msg;
    if (root.channel === 'Save') {
      if (mph.isNull(r.params)) {
        Config.local.handler.set(r.save,cfg[r.save]);
      } else {
        Config.local.handler.set(r.save,r.params);
      };
    };
    if (root.channel === 'Download') {
      for (const m of r.mediaFiles) {
        mph.fetchVideo(m,'download');
      };
    };
  });
  block.final = cfg.adblock.match(/full/gi) ? block.full : block.mini;
  if (cfg.adblock.match(/off/gi)) {
    webext.webRequest.onBeforeRequest.removeListener(traffic);
  };
});

webext.webRequest.onBeforeRequest.addListener(traffic, {urls: ['http://*/*', 'https://*/*'],}, ['blocking']);

webext.webRequest.onHeadersReceived.addListener((e) => {
  if (Object.is(e.type,'main_frame')) {
    if (isVideo(e.url)) {
      mph.fetchVideo(e.url,'all').then((m) => {
        hermes.send('Player', {
          qualities: m,
          cfg: Config.cachedLocalStorage
        });
      }).catch(err);
    };
  };
}, { urls: ['https://*/*'] });

/**
* [onMessage description]
* @param  msg      The message itself. This is a JSON-ifiable object.
* @param  sender       A brws.runtime.MessageSender object representing the sender of the message.
* @param  callback  A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
*/
function onMessage(msg, sender, callback) {
  log('Message Handler:', sender, msg);
  const cfg = Config.cachedLocalStorage ?? {};
  if (msg.channel) {
    if (msg.channel === 'cfg') {
      callback({ cfg });
    } else if (msg.channel === 'player') {
      if (isVideo(msg.url)) {
        mph.fetchVideo(msg.url,'all').then((m) => {
          callback({
            cfg,
            qualities: m,
          });
        }).catch(err);
      };
    };
    return true;
  };
  if (msg.name) {
    if (sender.url.includes('options.html')) {
      Config.local.handler.set(msg.name,msg.value);
      callback({
       name: msg.name,
       value: msg.value
      });
    } else {
      callback({ value: cfg[msg.name] });
    };
  };
  if (msg.mediaFiles) {
    mph.fetchQualities(msg.mediaFiles).then((m) => {
      callback({ qualities: m });
    }).catch(err);
  };
  return true;
};

webext.runtime.onMessage.addListener(onMessage);

webext.tabs.onUpdated.addListener(injMPH);
