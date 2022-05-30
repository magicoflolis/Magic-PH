'use strict';

const log = (...msg) => {
  console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);',...msg);
},
err = (...msg) => {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);',...msg);
},
webext = {
  async getCurrent() {
    const tabs = await this.query({ active: true, currentWindow: true });
    return tabs.length !== 0 ? tabs[0] : null;
  },
  async query(queryInfo) {
    let tabs;
    try {
      tabs = await brws.tabs.query(queryInfo);
    }
    catch(reason) {
      err(reason);
    }
    return Array.isArray(tabs) ? tabs : [];
  },
};

(async () => {
  try {
  const tabIds = [];
  const tabs = await webext.query({ url: '<all_urls>' });
  for ( const tab of tabs  ) {
    if ( tab.discarded === true ) { continue; }
    const { id } = tab;
    tabIds.push(id);
    await brws.tabs.executeScript(id, {
      file: "/js/overrides.js",
      allFrames: true,
      runAt: "document_start"
    });
  };
  log(tabIds);
  }
  catch(reason) {
    err(reason);
  }
  // webext.getCurrent().then(tab => {
  //   log(tab && tab.id);
  // });



})();