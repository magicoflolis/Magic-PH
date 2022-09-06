'use strict';

class mphError extends Error {
  /**
   *
   * @param {*} fn - Function name
   * @param  {...any} params
   */
  constructor(fn = 'mphError', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, mphError);
    };
    this.fn = `[${fn}]`;
  }
}

const brws = (typeof browser=='undefined'?chrome:browser),
win = self ?? window,
doc = win.document,
lpath = doc.location.pathname,
fvideo = lpath.match(/video+/g) || lpath.match(/watch+/g) || doc.location.origin.includes('redtube') && lpath.match(/\/[\d]+/g) || lpath.match(/\/[\d]+\//g),
log = (...message) => {
  console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
},
err = (...error) => {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
},
handle = (e) => {
  return e.fn ? err(`${e.fn} ${e.message} ${e.stack}`) : err(e);
},
getConfig = async (n) => {
  try {
    let sender = brws.runtime.sendMessage({
      name: n
    }),
    response = await sender.then(r => r.value);
    log('Response',n,response);
    return response;
  } catch(error) {handle(error)};
},
remover = (e) => {
  log(`Script Loaded: ${e.src}`);
  if (e) {
    e.remove();
  };
},
observe = (element, callback, options = {subtree:true,childList:true}) => {
  let observer = new MutationObserver(callback);
  callback([], observer);
  observer.observe(element, options);
  return observer;
},
inject = (src,type) => {
  try {
    return new Promise((resolve, reject) => {
      if ( !doc ) { return; }
      let elm;
      if(type.match(/script/g)) {
        elm = doc.createElement('script');
        elm.async = true;
        elm.type = 'module';
        elm.src = brws.runtime.getURL(src);
        elm.crossOrigin = 'anonymous';
      } else {
        elm = doc.createElement('link');
        elm.href = brws.runtime.getURL(src);
        elm.rel = 'stylesheet';
      };
      elm.onload = () => resolve(elm);
      elm.onerror = () => reject(new mphError('inject',`Load error for ${src}`));
      (doc.head || doc.documentElement || doc).appendChild(elm);
    });
  } catch (error) {handle(error)}
};
getConfig('altplayers').then((r) => {
  win.onload = () => {
    try {
      if(doc.location.origin.includes('pornhub')) inject('js/magicph.js','script').then(remover);
      if(!doc.location.origin.includes('onlyfans') && fvideo) {
        if(r.match(/none/g)) {
          inject('js/networkPlayer.js','script').then(remover);
        } else {
          inject('css/plyr.css','stylesheet').then((css) => {
            log(`Stylesheet Loaded: ${css.href}`);
            inject('web_accessible_resources/plyr.min.js','script').then((plyr) => {
              log(`Script Loaded: ${plyr.src}`);
              inject('js/networkPlayer.js','script').then(remover);
            });
          });
        };
      };
      observe(win.document.documentElement,(mutations) => {
        for(let mutation of mutations) {
          for(let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            for(let elem of node.querySelectorAll('img[class*="lazy"]')) {
              elem.src = elem.dataset.thumb_url ?? elem.getAttribute('data-src');
              elem.classList.remove('lazy');
            };
          }
        }
      });
    } catch(error) {handle(error)}
  };
});
// window.isGay
// window.playerObjList