'use strict';
const brws = (typeof browser=='undefined'?chrome:browser),
Config = {
  configLocalListeners: [],
  configSyncListeners: [],
  syncDefaults: {
    debug: true,
    altplayers: 'none',
    seektime: 4,
    autojump: false,
    autoscroll: true,
    blurimg: false,
    comments: false,
    topbutton: true,
    sidebar: true,
    favoriteVideos: [],
    blacklist: [],
  },
  cachedSyncConfig: {},
  cachedLocalStorage: {},
  resetToDefault,
  clearFavorites,
};

function configProxy() {
  brws.storage.onChanged.addListener((changes = brws.storage.StorageChange, areaName) => {
    if (areaName === 'sync') {
      for (const key in changes) {
        Config.cachedSyncConfig[key] = changes[key].newValue;
      };
      for (const callback of Config.configSyncListeners) {
        callback(changes);
      };
    } else if (areaName === 'local') {
      for (const key in changes) {
        Config.cachedLocalStorage[key] = changes[key].newValue;
      };
      for (const callback of Config.configLocalListeners) {
        callback(changes);
      };
    };
  });

  const syncHandler= {
    set(prop,value) {
      Config.cachedSyncConfig[prop] = value;
      brws.storage.sync.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedSyncConfig[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      brws.storage.sync.remove(prop);
      return true;
    }
  };

  const localHandler = {
    set(prop, value) {
      Config.cachedLocalStorage[prop] = value;
      brws.storage.local.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedLocalStorage[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      brws.storage.local.remove(prop);
      return true;
    }
  };
  return {
    sync: new Proxy({ handler: syncHandler }, syncHandler),
    local: new Proxy({ handler: localHandler }, localHandler)
  };
};

async function fetchConfig() {
  await Promise.all([new Promise((resolve) => {
    brws.storage.sync.get(null, function(items) {
      Config.cachedSyncConfig = items;
      resolve();
    });
  }), new Promise((resolve) => {
    brws.storage.local.get(null, function(items) {
      Config.cachedLocalStorage = items;
      resolve();
    });
  })]);
};

async function setupConfig() {
  await fetchConfig();
  for (const key in Config.syncDefaults) {
    if(!Object.hasOwn(Config.cachedSyncConfig, key)) {
      Config.cachedSyncConfig[key] = Config.syncDefaults[key];
    };
    if(!Object.hasOwn(Config.cachedLocalStorage, key)) {
      Config.cachedLocalStorage[key] = Config.syncDefaults[key];
    };
  };
  const config = configProxy();
  Config.config = config.sync;
  Config.local = config.local;
};

function resetToDefault() {
  brws.storage.sync.set({
    ...Config.syncDefaults,
  });
  brws.storage.local.set({
    ...Config.syncDefaults,
  });
};

function clearFavorites() {
  brws.storage.local.set({
    favoriteVideos: []
  });
  brws.storage.sync.set({
    favoriteVideos: []
  });
  return 'Favorites have been cleared';
};

setupConfig();

export default Config;