'use strict';

const brws = (typeof browser=="undefined"?chrome:browser),
win = self ?? window,
doc = win.document,
lpath = doc.location.pathname,
fvideo = lpath.includes("view_video") || lpath.includes("porn_video") || lpath.includes("watch") || lpath.includes("video") || doc.location.origin.includes("redtube"),
log = (...message) => {
  console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
},
err = (...error) => {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
},
remover = (e) => {
  log(`Script Loaded: ${e.src}`);
  if (e) {
    e.remove();
  };
};

async function loadCSS(src) {
  try {
    return await new Promise((resolve, reject) => {
      if ( !doc ) { return; }
      let c;
      c = doc.createElement('link');
      c.rel="stylesheet";
      c.href = brws.runtime.getURL(src);
      c.onload = () => resolve(c);
      c.onerror = () => reject(new Error(`Stylesheet load error for ${src}`));
      (doc.head || doc.documentElement || doc).appendChild(c);
    });
  } catch (error) {
    return err(error.message);
  }
};

async function loadScript(src) {
  try {
    return await new Promise((resolve, reject) => {
      if ( !doc ) { return; }
      let s;
      s = doc.createElement('script');
      s.async = true;
      s.type = "module";
      s.src = brws.runtime.getURL(src);
      s.crossOrigin = "anonymous";
      s.onload = () => resolve(s);
      s.onerror = () => reject(new Error(`Script load error for ${src}`));
      (doc.head || doc.documentElement || doc).appendChild(s);
    });
  } catch (error) {
    return err(error.message);
  }
};

win.onload = () => {
  if(doc.location.origin.includes("pornhub")) {
    loadScript("js/magicph.js").then(s => remover(s)).then(() => {
      if(fvideo) {
        if(localStorage.getItem("altplayers")) {
          loadCSS("css/plyr.css").then((css) => {
              log(`Stylesheet Loaded: ${css.href}`);
              loadScript("web_accessible_resources/plyr.min.js").then((plyr) => {
                log(`Script Loaded: ${plyr.src}`);
                loadScript("js/networkPlayer.js").then(s => remover(s));
              })
            });
            } else {
              loadScript("js/networkPlayer.js").then(s => remover(s));
            }
          }
        });
      } else {
        loadScript("js/networkPlayer.js").then(s => remover(s));
      };
    };