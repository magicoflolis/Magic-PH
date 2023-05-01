'use strict';

if (typeof mph === 'object' && !mph.contentScript) {
  mph.contentScript = true;
  {
    let context = self;
    try {
      while (
        context !== self.top &&
        context.location.href.startsWith('about:blank') &&
        context.parent.location.href
      ) {
        context = context.parent;
      }
      // eslint-disable-next-line no-empty
    } catch (ex) {}
    mph.effectiveSelf = context;
  }

  let config;

  mph.SafeAnimationFrame = class {
    constructor(callback) {
      this.fid = this.tid = undefined;
      this.callback = callback;
    }
    start(delay) {
      if (self.mph instanceof Object === false) {
        return;
      }
      if (delay === undefined) {
        if (this.fid === undefined) {
          this.fid = requestAnimationFrame(() => {
            this.onRAF();
          });
        }
        if (this.tid === undefined) {
          this.tid = mph.setTimeout(() => {
            this.onSTO();
          }, 20000);
        }
        return;
      }
      if (this.fid === undefined && this.tid === undefined) {
        this.tid = mph.setTimeout(() => {
          this.macroToMicro();
        }, delay);
      }
    }
    clear() {
      if (this.fid !== undefined) {
        cancelAnimationFrame(this.fid);
        this.fid = undefined;
      }
      if (this.tid !== undefined) {
        clearTimeout(this.tid);
        this.tid = undefined;
      }
    }
    macroToMicro() {
      this.tid = undefined;
      this.start();
    }
    onRAF() {
      if (this.tid !== undefined) {
        clearTimeout(this.tid);
        this.tid = undefined;
      }
      this.fid = undefined;
      this.callback();
    }
    onSTO() {
      if (this.fid !== undefined) {
        cancelAnimationFrame(this.fid);
        this.fid = undefined;
      }
      this.tid = undefined;
      this.callback();
    }
  };

  // mph.domWatcher

  {
    mph.domMutationTime = Date.now();

    const addedNodeLists = [];
    const removedNodeLists = [];
    const addedNodes = [];
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    const listeners = [];

    let domLayoutObserver;
    let listenerIterator = [];
    let listenerIteratorDirty = false;
    let removedNodes = false;
    let safeObserverHandlerTimer;

    const safeObserverHandler = function () {
      let i = addedNodeLists.length;
      while (i--) {
        const nodeList = addedNodeLists[i];
        let iNode = nodeList.length;
        while (iNode--) {
          const node = nodeList[iNode];
          if (node.nodeType !== 1) {
            continue;
          }
          if (ignoreTags.has(node.localName)) {
            continue;
          }
          if (node.parentElement === null) {
            continue;
          }
          addedNodes.push(node);
        }
      }
      addedNodeLists.length = 0;
      i = removedNodeLists.length;
      while (i-- && removedNodes === false) {
        const nodeList = removedNodeLists[i];
        let iNode = nodeList.length;
        while (iNode--) {
          if (nodeList[iNode].nodeType !== 1) {
            continue;
          }
          removedNodes = true;
          break;
        }
      }
      removedNodeLists.length = 0;
      if (addedNodes.length === 0 && removedNodes === false) {
        return;
      }
      for (const listener of getListenerIterator()) {
        try {
          listener.onDOMChanged(addedNodes, removedNodes);
          // eslint-disable-next-line no-empty
        } catch (ex) {}
      }
      addedNodes.length = 0;
      removedNodes = false;
      mph.domMutationTime = Date.now();
    };

    // https://github.com/chrisaljoudi/uBlock/issues/205
    //   Do not handle added node directly from within mutation observer.
    const observerHandler = function (mutations) {
      let i = mutations.length;
      while (i--) {
        const mutation = mutations[i];
        let nodeList = mutation.addedNodes;
        if (nodeList.length !== 0) {
          addedNodeLists.push(nodeList);
        }
        nodeList = mutation.removedNodes;
        if (nodeList.length !== 0) {
          removedNodeLists.push(nodeList);
        }
      }
      if (addedNodeLists.length !== 0 || removedNodeLists.length !== 0) {
        safeObserverHandlerTimer.start(addedNodeLists.length < 100 ? 1 : undefined);
      }
    };

    const startMutationObserver = function () {
      if (domLayoutObserver !== undefined) {
        return;
      }
      domLayoutObserver = new MutationObserver(observerHandler);
      domLayoutObserver.observe(document, {
        childList: true,
        subtree: true
      });
      safeObserverHandlerTimer = new mph.SafeAnimationFrame(safeObserverHandler);
      mph.shutdown.add(cleanup);
    };

    const stopMutationObserver = function () {
      if (domLayoutObserver === undefined) {
        return;
      }
      cleanup();
      mph.shutdown.remove(cleanup);
    };

    const getListenerIterator = function () {
      if (listenerIteratorDirty) {
        listenerIterator = listeners.slice();
        listenerIteratorDirty = false;
      }
      return listenerIterator;
    };

    const addListener = function (listener) {
      if (listeners.indexOf(listener) !== -1) {
        return;
      }
      listeners.push(listener);
      listenerIteratorDirty = true;
      if (domLayoutObserver === undefined) {
        return;
      }
      try {
        listener.onDOMCreated();
        // eslint-disable-next-line no-empty
      } catch (ex) {}
      startMutationObserver();
    };

    const removeListener = function (listener) {
      const pos = listeners.indexOf(listener);
      if (pos === -1) {
        return;
      }
      listeners.splice(pos, 1);
      listenerIteratorDirty = true;
      if (listeners.length === 0) {
        stopMutationObserver();
      }
    };

    const cleanup = function () {
      if (domLayoutObserver !== undefined) {
        domLayoutObserver.disconnect();
        domLayoutObserver = undefined;
      }
      if (safeObserverHandlerTimer !== undefined) {
        safeObserverHandlerTimer.clear();
        safeObserverHandlerTimer = undefined;
      }
    };

    const start = function () {
      for (const listener of getListenerIterator()) {
        try {
          listener.onDOMCreated();
          // eslint-disable-next-line no-empty
        } catch (ex) {}
      }
      startMutationObserver();
    };

    mph.domWatcher = { start, addListener, removeListener };
  }

  const hermes = mph.hermes;
  const onDomReady = () => {
    if (window.location === null) {
      return;
    }
    if (self.mph instanceof Object === false) {
      return;
    };

    if (mph.domWatcher instanceof Object) {
      mph.domWatcher.start();
    }
    mph.injScript(
      `(() => {
    window.open = function () {
      return (function(){}).bind(self)
    };
    })();`,
      false
    );
    mph.injScript(
      `window.XDomainRequest = function () {
    return (function(){}).bind(self)
    };`,
      false
    );
  };
  const portMessage = (root = {}) => {
    if (root instanceof Object === false) {
      return;
    }
    mph.bootstrap = undefined;
    config = root.cfg || config;
    let lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          if (lazyImage.src.includes('data:')) {
            lazyImage.src =
              lazyImage.dataset.thumb_url ??
              lazyImage.dataset.src ??
              lazyImage.dataset.thumbnail ??
              lazyImage.dataset.original;
          }
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    const domWatcherInterface = {
      onDOMCreated: function () {
        if ( self.mph instanceof Object === false ) { return; }
      },
      onDOMChanged: function (addedNodes) {
        if (addedNodes.length === 0) {
          return;
        }
        for (const node of addedNodes) {
          if (config.adblock.match(/full/gi)) {
            if (node.matches('iframe')) {
              if (Object.is(document.body, node.parentElement)) {
                node.remove();
                continue;
              }
              if (!Object.is(node.parentElement.classList.length, 0)) {
                node.parentElement.remove();
                continue;
              }
              if (!Object.is(node.parentElement.parentElement.classList.length, 0)) {
                node.parentElement.parentElement.remove();
                continue;
              }
              if (!Object.is(node.parentElement.parentElement.parentElement.classList.length, 0)) {
                node.parentElement.parentElement.parentElement.remove();
                continue;
              }
            }
            if (node.matches('script')) {
              if (node.src) continue;
              let txt = node.innerHTML;
              if (txt.match(/ADS_TAKEOVER|EmbeddedAds|htScript|GoogleAnalytics|tjPreloadAds/g)) {
                node.innerHTML = '';
              }
            }
          };
          // for (const elem of node.querySelectorAll('.adsbytrafficjunky')) {
          //   mph.log(elem, node);
          // }
          for (const elem of node.querySelectorAll('img[class*="lazy"]')) {
            lazyImageObserver.observe(elem);
          }
        }
      }
    };
    self.mph.domWatcher.addListener(domWatcherInterface);
    // if (config.adblock.match(/full/gi)) {
    //   self.mph.domWatcher.addListener(domWatcherInterface);
    // };

    // debugger
    // MG_Utils.setCookie('trial-step1-modal-shown', null);
    if (window.location.pathname === '/interstitial') {
      const fullURL = new URL(window.location);
      mph.log(fullURL);
      if(fullURL.searchParams) {
        for (const [key, value] of fullURL.searchParams) {
          if(key === 'viewkey') {
            window.location.href = `${fullURL.origin}/view_video.php?viewkey=${value}`;
          }
        }
      }
    };

    const readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      return onDomReady();
    }
    mph.ael(document, 'DOMContentLoaded', onDomReady, { once: true });
  };
  mph.bootstrap = () => {
    hermes
      .send('retrieveConfig', {
        what: 'setup',
        url: mph.effectiveSelf.location.href
      })
      .then((response) => {
        mph.log('Reponse C', response);
        portMessage(response);
      });
  };
  mph.bootstrap();
}
