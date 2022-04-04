import brws from './webext.js';

const mAPI = {
  localStorage: {
    start: async function() {
      if ( this.cache instanceof Promise ) { return this.cache; }
      if ( this.cache instanceof Object ) { return this.cache; }
      this.cache = brws.storage.local.get('localStorage').then(bin => {
          this.cache = bin instanceof Object &&
              bin.localStorage instanceof Object
                  ? bin.localStorage
                  : {};
      });
      return this.cache;
    },
    clear: function() {
        this.cache = {};
        return brws.storage.local.set({ localStorage: this.cache });
    },
    getItem: function(key) {
      if ( this.cache instanceof Object === false ) {
          console.info(`localStorage.getItem('${key}') not ready`);
          return null;
      }
      const value = this.cache[key];
      return value !== undefined ? value : null;
    },
    getItemAsync: async function(key) {
      await this.start();
      const value = this.cache[key];
      return value !== undefined ? value : null;
    },
    removeItem: async function(key) {
        this.setItem(key);
    },
    setItem: async function(key, value = undefined) {
      await this.start();
      // if ( value === this.cache[key] ) { return; }
      this.cache[key] = value;
      return brws.storage.local.set({ localStorage: this.cache });
    },
    cache: undefined,
  }
};

mAPI.localStorage.start();

export default mAPI;