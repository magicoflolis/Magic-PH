const brws = (typeof browser=="undefined"?chrome:browser),
injectScript = (src) => {
  let script,
  doc = document;
  script = doc.createElement('script');
  script.async = true;
  script.src = brws.runtime.getURL(src);
  script.crossOrigin = "anonymous";
  (doc.head || doc.documentElement || doc).appendChild(script);
  if (script) {
    script.remove();
  };
};

window.addEventListener('load', () => {
  injectScript("js/magicph.js");
  if(/view_video.php/.test(document.location.href)) {
    injectScript("js/player.js");
  };
});

// if (!extra) {
//   script.remove();
// };