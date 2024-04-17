'use strict';
const storage = webext.storage;
const Config = {
  configLocalListeners: [],
  configSyncListeners: [],
  syncDefaults: {
    adblock: 'full',
    highquality: true,
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
    blacklist: []
  },
  cachedSyncConfig: {},
  cachedLocalStorage: {},
  resetToDefault,
  clearFavorites
};

function configProxy() {
  storage.onChanged.addListener((changes = storage.StorageChange, areaName) => {
    if (areaName === 'sync') {
      for (const key in changes) {
        Config.cachedSyncConfig[key] = changes[key].newValue;
      }
      for (const callback of Config.configSyncListeners) {
        callback(changes);
      }
    } else if (areaName === 'local') {
      for (const key in changes) {
        Config.cachedLocalStorage[key] = changes[key].newValue;
      }
      for (const callback of Config.configLocalListeners) {
        callback(changes);
      }
    }
  });

  const syncHandler = {
    set(prop, value) {
      Config.cachedSyncConfig[prop] = value;
      storage.sync.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedSyncConfig[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      storage.sync.remove(prop);
      return true;
    }
  };

  const localHandler = {
    set(prop, value) {
      Config.cachedLocalStorage[prop] = value;
      storage.local.set({
        [prop]: value
      });
      return true;
    },
    get(obj, prop) {
      const data = Config.cachedLocalStorage[prop];
      return obj[prop] || data;
    },
    deleteProperty(prop) {
      storage.local.remove(prop);
      return true;
    }
  };
  return {
    sync: new Proxy({ handler: syncHandler }, syncHandler),
    local: new Proxy({ handler: localHandler }, localHandler)
  };
}

async function fetchConfig() {
  await Promise.all([
    new Promise((resolve) => {
      storage.sync.get(null, function (items) {
        Config.cachedSyncConfig = items;
        resolve();
      });
    }),
    new Promise((resolve) => {
      storage.local.get(null, function (items) {
        Config.cachedLocalStorage = items;
        resolve();
      });
    })
  ]);
}

async function setupConfig() {
  await fetchConfig();
  for (const key in Config.syncDefaults) {
    if (!Object.hasOwn(Config.cachedSyncConfig, key)) {
      Config.cachedSyncConfig[key] = Config.syncDefaults[key];
    }
    if (!Object.hasOwn(Config.cachedLocalStorage, key)) {
      Config.cachedLocalStorage[key] = Config.syncDefaults[key];
    }
  }
  const config = configProxy();
  Config.config = config.sync;
  Config.local = config.local;
}

function resetToDefault() {
  const localFav = Config.cachedLocalStorage.favoriteVideos;
  const syncFav = Config.cachedSyncConfig.favoriteVideos;
  Config.cachedLocalStorage = Config.syncDefaults;
  Config.cachedSyncConfig = Config.syncDefaults;
  storage.local.set({
    ...Config.syncDefaults
  });
  storage.sync.set({
    ...Config.syncDefaults
  });
  storage.local.set({
    favoriteVideos: localFav
  });
  storage.sync.set({
    favoriteVideos: syncFav
  });
}

function clearFavorites() {
  storage.local.set({
    favoriteVideos: []
  });
  storage.sync.set({
    favoriteVideos: []
  });
  return 'Favorites have been cleared';
}

setupConfig();

export default Config;
