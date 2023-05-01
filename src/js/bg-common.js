'use strict';

mph.setTimeout = mph.setTimeout || self.setTimeout.bind(self);

mph.defer = {
  create(callback) {
    return new this.Client(callback);
  },
  once(delay, ...args) {
    const delayInMs = mph.defer.normalizeDelay(delay);
    return new Promise((resolve) => {
      mph.setTimeout(
        (...args) => {
          resolve(...args);
        },
        delayInMs,
        ...args
      );
    });
  },
  Client: class {
    constructor(callback) {
      this.timer = null;
      this.type = 0;
      this.callback = callback;
    }
    on(delay, ...args) {
      if (this.timer !== null) {
        return;
      }
      const delayInMs = mph.defer.normalizeDelay(delay);
      this.type = 0;
      this.timer = mph.setTimeout(() => {
        this.timer = null;
        this.callback(...args);
      }, delayInMs || 1);
    }
    offon(delay, ...args) {
      this.off();
      this.on(delay, ...args);
    }
    onvsync(delay, ...args) {
      if (this.timer !== null) {
        return;
      }
      const delayInMs = mph.defer.normalizeDelay(delay);
      if (delayInMs !== 0) {
        this.type = 0;
        this.timer = mph.setTimeout(() => {
          this.timer = null;
          this.onraf(...args);
        }, delayInMs);
      } else {
        this.onraf(...args);
      }
    }
    onidle(delay, options, ...args) {
      if (this.timer !== null) {
        return;
      }
      const delayInMs = mph.defer.normalizeDelay(delay);
      if (delayInMs !== 0) {
        this.type = 0;
        this.timer = mph.setTimeout(() => {
          this.timer = null;
          this.onric(options, ...args);
        }, delayInMs);
      } else {
        this.onric(options, ...args);
      }
    }
    off() {
      if (this.timer === null) {
        return;
      }
      switch (this.type) {
        case 0:
          self.clearTimeout(this.timer);
          break;
        case 1:
          self.cancelAnimationFrame(this.timer);
          break;
        case 2:
          self.cancelIdleCallback(this.timer);
          break;
        default:
          break;
      }
      this.timer = null;
    }
    onraf(...args) {
      if (this.timer !== null) {
        return;
      }
      this.type = 1;
      this.timer = requestAnimationFrame(() => {
        this.timer = null;
        this.callback(...args);
      });
    }
    onric(options, ...args) {
      if (this.timer !== null) {
        return;
      }
      this.type = 2;
      this.timer = self.requestIdleCallback((deadline) => {
        this.timer = null;
        this.callback(deadline, ...args);
      }, options);
    }
    ongoing() {
      return this.timer !== null;
    }
  },
  normalizeDelay(delay = 0) {
    if (typeof delay === 'object') {
      if (delay.sec !== undefined) {
        return delay.sec * 1000;
      } else if (delay.min !== undefined) {
        return delay.min * 60000;
      } else if (delay.hr !== undefined) {
        return delay.hr * 3600000;
      }
    }
    return delay;
  }
};

mph.webextFlavor = {
  major: 0,
  soup: new Set(),
  get env() {
    return Array.from(this.soup);
  }
};

(() => {
  const ua = navigator.userAgent;
  const flavor = mph.webextFlavor;
  const soup = flavor.soup;
  const dispatch = function () {
    window.dispatchEvent(new CustomEvent('webextFlavor'));
  };

  // This is always true.
  soup.add('MPH').add('webext');

  // Whether this is a dev build.
  // if (/^\d+\.\d+\.\d+\D/.test(webext.runtime.getManifest().version)) {
  //   soup.add('devbuild');
  // }

  if (/\bMobile\b/.test(ua)) {
    soup.add('mobile');
  }

  // Asynchronous
  if (webext instanceof Object && typeof webext.runtime.getwebextInfo === 'function') {
    webext.runtime.getwebextInfo().then((info) => {
      flavor.major = parseInt(info.version, 10) || flavor.major;
      soup.add(info.vendor.toLowerCase()).add(info.name.toLowerCase());
      dispatch();
    });
    if (webext.runtime.getURL('').startsWith('moz-extension://')) {
      soup.add('firefox').add('user_stylesheet').add('html_filtering');
      flavor.major = 91;
    }
    return;
  }

  // Synchronous -- order of tests is important
  const match = /\bChrom(?:e|ium)\/([\d.]+)/.exec(ua);
  if (match !== null) {
    soup.add('chromium').add('user_stylesheet');
    flavor.major = parseInt(match[1], 10) || 0;
    if (flavor.major >= 105) {
      soup.add('native_css_has');
    }
  }

  // Don't starve potential listeners
  mph.setTimeout(dispatch, 97);
})();

mph.getURL = webext.runtime.getURL;

mph.closePopup = function () {
  if (mph.webextFlavor.soup.has('firefox')) {
    window.close();
    return;
  }

  window.open('', '_self').close();
};

mph.localStorage = {
  clear: function () {
    mph.hermes.send('mph', {
      what: 'localStorage',
      fn: 'clear'
    });
  },
  getItemAsync: function (key) {
    return mph.hermes.send('mph', {
      what: 'localStorage',
      fn: 'getItemAsync',
      args: [key]
    });
  },
  removeItem: function (key) {
    return mph.hermes.send('mph', {
      what: 'localStorage',
      fn: 'removeItem',
      args: [key]
    });
  },
  setItem: function (key, value = undefined) {
    return mph.hermes.send('mph', {
      what: 'localStorage',
      fn: 'setItem',
      args: [key, value]
    });
  }
};

void 0;
