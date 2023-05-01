/* eslint-disable no-empty */
'use strict';

mph.supportsUserStylesheets = mph.webextFlavor.soup.has('user_stylesheet');

mph.isBehindTheSceneTabId = function (tabId) {
  return tabId < 0;
};

mph.unsetTabId = 0;
mph.noTabId = -1; // definitely not any existing tab

// To ensure we always use a good tab id
const toTabId = function (tabId) {
  return typeof tabId === 'number' && isNaN(tabId) === false ? tabId : 0;
};

mph.Tabs = class {
  constructor() {
    webext.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.onUpdatedHandler(tabId, changeInfo, tab);
    });
    webext.tabs.onRemoved.addListener((tabId, details) => {
      this.onRemovedHandler(tabId, details);
    });
  }

  async get(tabId) {
    if (tabId === null) {
      return this.getCurrent();
    }
    if (tabId <= 0) {
      return null;
    }
    let tab;
    try {
      tab = await webext.tabs.get(tabId);
    } catch (reason) {}
    return tab instanceof Object ? tab : null;
  }

  async getCurrent() {
    const tabs = await this.query({ active: true, currentWindow: true });
    return tabs.length !== 0 ? tabs[0] : null;
  }

  async insertCSS(tabId, details) {
    if (mph.supportsUserStylesheets) {
      details.cssOrigin = 'user';
    }
    try {
      await webext.tabs.insertCSS(...arguments);
    } catch (reason) {}
  }

  async query(queryInfo) {
    let tabs;
    try {
      tabs = await webext.tabs.query(queryInfo);
    } catch (reason) {}
    return Array.isArray(tabs) ? tabs : [];
  }

  async removeCSS(tabId, details) {
    if (mph.supportsUserStylesheets) {
      details.cssOrigin = 'user';
    }
    try {
      await webext.tabs.removeCSS(...arguments);
    } catch (reason) {}
  }

  async create(url, details) {
    if (details.active === undefined) {
      details.active = true;
    }

    const subWrapper = async () => {
      const updateDetails = {
        url: url,
        active: !!details.active
      };

      // Opening a tab from incognito window won't focus the window
      // in which the tab was opened
      const focusWindow = (tab) => {
        if (tab.active && mph.windows instanceof Object) {
          mph.windows.update(tab.windowId, { focused: true });
        }
      };

      if (!details.tabId) {
        if (details.index !== undefined) {
          updateDetails.index = details.index;
        }
        webext.tabs.create(updateDetails, focusWindow);
        return;
      }

      // update doesn't accept index, must use move
      const tab = await mph.tabs.update(toTabId(details.tabId), updateDetails);
      // if the tab doesn't exist
      if (tab === null) {
        webext.tabs.create(updateDetails, focusWindow);
      } else if (details.index !== undefined) {
        webext.tabs.move(tab.id, { index: details.index });
      }
    };

    // Open in a standalone window
    //
    // https://github.com/uBlockOrigin/uBlock-issues/issues/168#issuecomment-413038191
    //   Not all platforms support mph.windows.
    //
    // For some reasons, some platforms do not honor the left,top
    // position when specified. I found that further calling
    // windows.update again with the same position _may_ help.
    if (details.popup !== undefined && mph.windows instanceof Object) {
      const createDetails = {
        url: details.url,
        type: details.popup
      };
      if (details.box instanceof Object) {
        Object.assign(createDetails, details.box);
      }
      const win = await mph.windows.create(createDetails);
      if (win === null) {
        return;
      }
      if (details.box instanceof Object === false) {
        return;
      }
      if (win.left === details.box.left && win.top === details.box.top) {
        return;
      }
      mph.windows.update(win.id, {
        left: details.box.left,
        top: details.box.top
      });
      return;
    }

    if (details.index !== -1) {
      subWrapper();
      return;
    }

    const tab = await mph.tabs.getCurrent();
    if (tab !== null) {
      details.index = tab.index + 1;
    } else {
      details.index = undefined;
    }
    subWrapper();
  }

  // Properties of the details object:
  // - url: 'URL',    => the address that will be opened
  // - tabId: 1,      => the tab is used if set, instead of creating a new one
  // - index: -1,     => undefined: end of the list, -1: following tab, or
  //                     after index
  // - active: false, => opens the tab in background - true and undefined:
  //                     foreground
  // - select: true,  => if a tab is already opened with that url, then select
  //                     it instead of opening a new one
  // - popup: true    => open in a new window

  async open(details) {
    let targetURL = details.url;
    if (typeof targetURL !== 'string' || targetURL === '') {
      return null;
    }

    // extension pages
    if (/^[\w-]{2,}:/.test(targetURL) !== true) {
      targetURL = mph.getURL(targetURL);
    }

    if (!details.select) {
      this.create(targetURL, details);
      return;
    }

    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query#Parameters
    //   "Note that fragment identifiers are not matched."
    //   Fragment identifiers ARE matched -- we need to remove the fragment.
    const pos = targetURL.indexOf('#');
    const targetURLWithoutHash = pos === -1 ? targetURL : targetURL.slice(0, pos);

    const tabs = await webext.tabs.query({ url: targetURLWithoutHash });
    if (tabs.length === 0) {
      this.create(targetURL, details);
      return;
    }
    let tab = tabs[0];
    const updateDetails = { active: true };
    // https://github.com/uBlockOrigin/uBlock-issues/issues/592
    if (tab.url.startsWith(targetURL) === false) {
      updateDetails.url = targetURL;
    }
    tab = await webext.tabs.update(tab.id, updateDetails);
    if (mph.windows instanceof Object === false) {
      return;
    }
    mph.windows.update(tab.windowId, { focused: true });
  }

  async remove(tabId) {
    tabId = toTabId(tabId);
    if (tabId === 0) {
      return;
    }
    try {
      await webext.tabs.remove(tabId);
    } catch (reason) {}
  }

  sanitizeURL(url) {
    if (url.startsWith('data:') === false) {
      return url;
    }
    const pos = url.indexOf(',');
    if (pos === -1) {
      return url;
    }
    const s = url.slice(0, pos);
    if (s.search(/\s/) === -1) {
      return url;
    }
    return s.replace(/\s+/, '') + url.slice(pos);
  }

  onUpdatedHandler(tabId, changeInfo, tab) {
    // Ignore uninteresting update events
    const { status = '', title = '', url = '' } = changeInfo;
    if (status === '' && title === '' && url === '') {
      return;
    }
    // https://github.com/gorhill/uBlock/issues/3073
    //   Fall back to `tab.url` when `changeInfo.url` is not set.
    if (url === '') {
      changeInfo.url = tab && tab.url;
    }
    if (changeInfo.url) {
      changeInfo.url = this.sanitizeURL(changeInfo.url);
    }
    // if (!changeInfo.status || !tab.url) {
    //   return;
    // }
    this.onUpdated(tabId, changeInfo, tab);
  }

  onRemovedHandler(tabId, details) {
    this.onClosed(tabId, details);
  }

  onActivated(/* details */) {}

  onClosed(/* tabId, details */) {}

  onCreated(/* details */) {}

  onNavigation(/* details */) {}

  onUpdated(/* tabId, changeInfo, tab */) {}
};

if (webext.windows instanceof Object) {
  mph.windows = {
    get: async function () {
      let win;
      try {
        win = await webext.windows.get(...arguments);
      } catch (reason) {}
      return win instanceof Object ? win : null;
    },
    create: async function () {
      let win;
      try {
        win = await webext.windows.create(...arguments);
      } catch (reason) {}
      return win instanceof Object ? win : null;
    },
    update: async function () {
      let win;
      try {
        win = await webext.windows.update(...arguments);
      } catch (reason) {}
      return win instanceof Object ? win : null;
    }
  };
}

mph.hermes = {
  ports: new Map(),
  listeners: new Map(),
  defaultHandler: null,
  PRIVILEGED_ORIGIN: mph.getURL('').slice(0, -1),
  NOOPFUNC: function () {},
  UNHANDLED: 'mph.hermes.notHandled',

  listen: function (details) {
    this.listeners.set(details.name, {
      fn: details.listener,
      privileged: details.privileged === true
    });
  },

  onPortDisconnect: function (port) {
    this.ports.delete(port.name);
  },

  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
  //   port.sender is always present for onConnect() listeners.
  onPortConnect: function (port) {
    port.onDisconnect.addListener((port) => this.onPortDisconnect(port));
    port.onMessage.addListener((request, port) => this.onPortMessage(request, port));
    const portDetails = { port };
    const sender = port.sender;
    const { origin, tab, url } = sender;
    portDetails.frameId = sender.frameId;
    portDetails.frameURL = url;
    portDetails.privileged =
      origin !== undefined
        ? origin === this.PRIVILEGED_ORIGIN
        : url.startsWith(this.PRIVILEGED_ORIGIN);
    if (tab) {
      portDetails.tabId = tab.id;
      portDetails.tabURL = tab.url;
    }
    this.ports.set(port.name, portDetails);
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1652925#c24
    port.sender = undefined;
  },

  setup: function (defaultHandler) {
    if (this.defaultHandler !== null) {
      return;
    }

    if (typeof defaultHandler !== 'function') {
      defaultHandler = function () {
        return this.UNHANDLED;
      };
    }
    this.defaultHandler = defaultHandler;

    webext.runtime.onConnect.addListener((port) => this.onPortConnect(port));

    // https://bugzilla.mozilla.org/show_bug.cgi?id=1392067
    //   Workaround: manually remove ports matching removed tab.
    if (mph.webextFlavor.soup.has('firefox') && mph.webextFlavor.major < 61) {
      webext.tabs.onRemoved.addListener((tabId) => {
        for (const { port, tabId: portTabId } of this.ports.values()) {
          if (portTabId !== tabId) {
            continue;
          }
          this.onPortDisconnect(port);
        }
      });
    }
  },

  broadcast: function (message) {
    const messageWrapper = { broadcast: true, msg: message };
    for (const { port } of this.ports.values()) {
      try {
        port.postMessage(messageWrapper);
      } catch (ex) {
        this.onPortDisconnect(port);
      }
    }
    if (this.defaultHandler) {
      this.defaultHandler(message, null, () => {});
    }
  },

  onFrameworkMessage: function (request, port, callback) {
    const portDetails = this.ports.get(port.name) || {};
    const tabId = portDetails.tabId;
    const msg = request.msg;
    switch (msg.what) {
      case 'connectionAccepted':
      case 'connectionRefused': {
        const toPort = this.ports.get(msg.fromToken);
        if (toPort !== undefined) {
          msg.tabId = tabId;
          toPort.port.postMessage(request);
        } else {
          msg.what = 'connectionBroken';
          port.postMessage(request);
        }
        break;
      }
      case 'connectionRequested':
        msg.tabId = tabId;
        for (const { port: toPort } of this.ports.values()) {
          if (toPort === port) {
            continue;
          }
          try {
            toPort.postMessage(request);
          } catch (ex) {
            this.onPortDisconnect(toPort);
          }
        }
        break;
      case 'connectionBroken':
      case 'connectionCheck':
      case 'connectionMessage': {
        const toPort = this.ports.get(port.name === msg.fromToken ? msg.toToken : msg.fromToken);
        if (toPort !== undefined) {
          msg.tabId = tabId;
          toPort.port.postMessage(request);
        } else {
          msg.what = 'connectionBroken';
          port.postMessage(request);
        }
        break;
      }
      case 'localStorage': {
        if (portDetails.privileged !== true) {
          break;
        }
        const args = msg.args || [];
        mph.localStorage[msg.fn](...args).then((result) => {
          callback(result);
        });
        break;
      }
      case 'userCSS':
        if (tabId === undefined) {
          break;
        }
        // eslint-disable-next-line no-case-declarations
        const promises = [];
        if (msg.add) {
          const details = {
            code: undefined,
            frameId: portDetails.frameId,
            matchAboutBlank: true,
            runAt: 'document_start'
          };
          for (const cssText of msg.add) {
            details.code = cssText;
            promises.push(mph.tabs.insertCSS(tabId, details));
          }
        }
        if (msg.remove) {
          const details = {
            code: undefined,
            frameId: portDetails.frameId,
            matchAboutBlank: true
          };
          for (const cssText of msg.remove) {
            details.code = cssText;
            promises.push(mph.tabs.removeCSS(tabId, details));
          }
        }
        Promise.all(promises).then(() => {
          callback();
        });
        break;
    }
  },

  // Use a wrapper to avoid closure and to allow reuse.
  CallbackWrapper: class {
    constructor(messaging, port, msgId) {
      this.messaging = messaging;
      this.callback = this.proxy.bind(this); // bind once
      this.init(port, msgId);
    }
    init(port, msgId) {
      this.port = port;
      this.msgId = msgId;
      return this;
    }
    proxy(response) {
      // https://github.com/chrisaljoudi/uBlock/issues/383
      try {
        this.port.postMessage({
          msgId: this.msgId,
          msg: response !== undefined ? response : null
        });
      } catch (ex) {
        this.messaging.onPortDisconnect(this.port);
      }
      // Store for reuse
      this.port = null;
      this.messaging.callbackWrapperJunkyard.push(this);
    }
  },

  callbackWrapperJunkyard: [],

  callbackWrapperFactory: function (port, msgId) {
    return this.callbackWrapperJunkyard.length !== 0
      ? this.callbackWrapperJunkyard.pop().init(port, msgId)
      : new this.CallbackWrapper(this, port, msgId);
  },

  onPortMessage: function (request, port) {
    // prepare response
    let callback = this.NOOPFUNC;
    if (request.msgId !== undefined) {
      callback = this.callbackWrapperFactory(port, request.msgId).callback;
    }

    // Content process to main process: framework handler.
    if (request.channel === 'mph') {
      this.onFrameworkMessage(request, port, callback);
      return;
    }

    // Auxiliary process to main process: specific handler
    const portDetails = this.ports.get(port.name);
    if (portDetails === undefined) {
      return;
    }

    const listenerDetails = this.listeners.get(request.channel);
    let r = this.UNHANDLED;
    if (
      listenerDetails !== undefined &&
      (listenerDetails.privileged === false || portDetails.privileged)
    ) {
      r = listenerDetails.fn(request.msg, portDetails, callback);
    }
    if (r !== this.UNHANDLED) {
      return;
    }

    // Auxiliary process to main process: default handler
    if (portDetails.privileged) {
      r = this.defaultHandler(request.msg, portDetails, callback);
      if (r !== this.UNHANDLED) {
        return;
      }
    }

    // Auxiliary process to main process: no handler
    // ubolog(
    //     `mph.hermes.onPortMessage > unhandled request: ${JSON.stringify(request.msg)}`,
    //     request
    // );

    // Need to callback anyways in case caller expected an answer, or
    // else there is a memory leak on caller's side
    callback();
  }
};

mph.tabs = new mph.Tabs();
