const brws = (typeof browser=="undefined"?chrome:browser),
is_video = /view_video.php/,
injectCSS = (src) => {
  let c,
  doc = document;
  c = doc.createElement('link');
  c.rel="stylesheet";
  c.href = brws.runtime.getURL(src);
  // c.onload = () => mph.log(`Loaded ${src}`);
  // c.onerror = () => mph.log(`CSS load error for ${src}`);
  (doc.head || doc.documentElement || doc).appendChild(c);
},
injectScript = (src) => {
  let script,
  doc = document;
  script = doc.createElement('script');
  script.async = true;
  script.type = "module";
  script.src = brws.runtime.getURL(src);
  script.crossOrigin = "anonymous";
  (doc.head || doc.documentElement || doc).appendChild(script);
  if (script) {
    script.remove();
  };
};

window.onload = () => {
  // injectScript("js/overrides.js");
  // injectScript("js/replacements.js");
  injectScript("js/magicph.js");
  injectScript("web_accessible_resources/jquery.min.js");
  if(is_video.test(window.location.href)) {
    if(localStorage.getItem("altplayers")) {
      injectCSS("css/plyr.css");
      injectScript("web_accessible_resources/plyr.min.js");
    };
    injectScript("js/player.js");
  };
  //https://ei.phncdn.com/www-static/js/lib/jquery-3.6.0.min.js
    // injectScript("web_accessible_resources/jquery.min.js");
    // injectScript("web_accessible_resources/ffmpeg.min.js");
    // injectScript("web_accessible_resources/ffmpeg-core.js");
    // injectScript("web_accessible_resources/ffmpeg-core.wasm");
    // injectScript("web_accessible_resources/ffmpeg-core.worker.js");
};