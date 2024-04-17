'use strict';

import './bg-common.js';
import './bg-background.js';
import './messaging.js';

// eslint-disable-next-line no-unused-vars
// import logger from './logger.js';

import Config from './config.js';
import webRequest from './traffic.js';

(async () => {
  // mph.log('Background loaded');

  const initializeTabs = async () => {
    const manifest = webext.runtime.getManifest();
    if (manifest instanceof Object === false) {
      return;
    }

    const toCheck = [];
    const tabIds = [];
    {
      const checker = { file: 'js/scriptlets/should-inject-contentscript.js' };
      const tabs = await mph.tabs.query({ url: '<all_urls>' });
      for (const tab of tabs) {
        if (tab.discarded === true) {
          continue;
        }
        if (tab.status === 'unloaded') {
          continue;
        }
        const { id, url } = tab;
        // µb.tabContextManager.commit(id, url);
        // µb.bindTabToPageStore(id, 'tabCommitted', tab);

        // https://github.com/chrisaljoudi/uBlock/issues/129
        //   Find out whether content scripts need to be injected
        //   programmatically. This may be necessary for web pages which
        //   were loaded before uBO launched.
        toCheck.push(/^https?:\/\//.test(url) ? mph.tabs.executeScript(id, checker) : false);
        tabIds.push(id);
      }
    }
    // We do not want to block on content scripts injection
    Promise.all(toCheck).then((results) => {
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.length === 0 || result[0] !== true) {
          continue;
        }
        // Inject declarative content scripts programmatically.
        for (const contentScript of manifest.content_scripts) {
          for (const file of contentScript.js) {
            mph.tabs.executeScript(tabIds[i], {
              file: file,
              allFrames: contentScript.all_frames,
              runAt: contentScript.run_at
            });
          }
        }
      }
    });
  };

  window.Config = Config;

  webRequest.start();

  await initializeTabs();

  // webext.cookies.onChanged.addListener((changeInfo) => {
  //   mph.log('Cookie changed: \n'
  //     + ` * Cookie: ${JSON.stringify(changeInfo.cookie)}\n`
  //     + ` * Cause: ${changeInfo.cause}\n`
  //     + ` * Removed: ${changeInfo.removed}`);

  //   if(changeInfo.cookie.name.match(/redirect_after_interstitial/g)) {
  //     changeInfo.cookie.value
  //   };
  // })
})();
