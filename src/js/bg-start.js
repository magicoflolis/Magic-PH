'use strict';

import './bg-common.js';
import './bg-background.js';
import './messaging.js';

// eslint-disable-next-line no-unused-vars
// import logger from './logger.js';

import Config from './config.js';
import webRequest from './traffic.js';

(() => {
  mph.log('Background loaded');

  window.Config = Config;

  webRequest.start();

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
