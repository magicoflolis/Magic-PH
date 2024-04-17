'use strict';

import Config from './config.js';

const isVideo = (link) =>
    link.match(/(video|watch)+|\/[\d]+\//g) || (link.includes('redtube') && link.match(/\/[\d]+/g));

{
  const getSetup = async (sender, request) => {
    const msgObj = {};
    if (request.player) {
      if (isVideo(request.url)) {
        try {
          const m = await mph.fetchVideo(request.url, 'all');
          Object.assign(msgObj, {
            qualities: m
          });
        // eslint-disable-next-line no-empty
        } catch (ex) { }
      }
    };
    Object.assign(msgObj, {
      cfg: Config.cachedLocalStorage
    });
    return msgObj;
  };

  const onMessage = function (request, sender, callback) {
    if (request.what === 'setup') {
      return getSetup(sender, request).then((response) => callback(response));
    }
    let response;
    callback(response);
  };
  mph.hermes.setup(onMessage);
}

const onSave = function (request, sender, callback) {
  if (request.what === 'Save') {
    if (request.cfg.name === 'Config') {
      Config.local.handler.set({...request.cfg.value});
    } else {
      Config.local.handler.set(request.cfg.name, request.cfg.value);
    };
    return callback(Config.cachedLocalStorage);
  }
  let response;
  return response;
};
mph.hermes.listen({
  name: 'saveConfig',
  listener: onSave
});

const getSetup = async (sender, request) => {
  const { tabId, frameId } = sender;
  if (tabId === undefined || frameId === undefined) {
    return;
  }
  request.tabId = tabId;
  request.frameId = frameId;
  const msgObj = {};
  if (request.player && isVideo(request.url)) {
    try {
      const m = await mph.fetchVideo(request.url, 'all');
      Object.assign(msgObj, {
        qualities: m
      });
    } catch (ex) {
      console.error(ex)
    }
  };
  // mph.log(Config.cachedLocalStorage);
  Object.assign(msgObj, {
    cfg: Config.cachedLocalStorage
  });
  return msgObj;
};
const onMessage = function (request, sender, callback) {
  if (request.what === 'setup') {
    return getSetup(sender, request).then((response) => callback(response));
  }
  let response;
  return response;
};
mph.hermes.listen({
  name: 'retrieveConfig',
  listener: onMessage
});

const onGeneral = function (request, sender, callback) {
  if (request.what === 'Download') {
    for (const m of request.mediaFiles) {
      if (m.match(/onlyfans/g)) {
        if (mph.isMobile) {
          mph.tabs.create(m, {
            active: true
          });
          continue;
        };
        mph.fetchStream(m, request.title, {
          credentials: 'omit'
        });
        continue;
      };
      if (mph.isMobile) {
        mph.fetchVideo(m, 'download').then((response) => {
          mph.tabs.create(response[0], {
            active: true
          });
          callback(response)
        });
        continue;
      };
      mph.fetchVideo(m, 'download');
    };
  } else if (request.what === 'Cookies') {
    const siteCookies = webext.cookies.getAll({});
    return siteCookies.then((cookies) => {
      callback(cookies)
    })
  } else if (request.what === 'Inject') {
    if (request.css) {
      return mph.tabs.insertCSS(sender.tabId, {
        file: request.file,
        allFrames: true
      }).then((result) => {
        callback(result)
      });
    };
    if (request.file) {
      return mph.tabs.executeScript(sender.tabId, {
        file: request.file,
        allFrames: true
      }).then((result) => {
        callback(result)
      });
    };
    return mph.tabs.executeScript(sender.tabId, {
      code: request.code,
      allFrames: true
    }).then((result) => {
      callback(result)
    });
  };
  let response;
  return response;
};
mph.hermes.listen({
  name: 'General',
  listener: onGeneral
});

// runAt: 'document_start',
