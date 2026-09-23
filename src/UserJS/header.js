[[metadata]]
(() => {
'use strict';
/******************************************************************************/

if (typeof window === 'undefined') {
  return;
}

// The interface is only useful in the top frame
const inIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
if (inIframe) return;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [source code](https://github.com/gorhill/uBlock/blob/68962453ff6eec7ff109615a738beb8699b9844a/platform/common/vapi.js#L35)
 */
if (
  !(
    (document instanceof Document ||
      (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
    /^text\/html|^application\/(xhtml|xml)/.test(document.contentType || '') === true
  )
) {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', `MIME type is not a document, got "${document.contentType || ''}"`);
  return;
}
/**
 * `self.userjs` is shared with other UserJS, every script owns its own key
 * so it can run once per page without blocking (or being blocked by) the others.
 */
if (!(self.userjs instanceof Object)) {
  self.userjs = {};
}
if (self.userjs.MagicPH === true) return;
self.userjs.MagicPH = true;
/** [i18n directory](https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales) */
const translations = [[languageList]];
/** [source code](https://github.com/magicoflolis/Magic-PH/tree/master/src/sass/_main.scss) */
const main_css = `[[mainCSS]]`;
/******************************************************************************/
[[code]]
/******************************************************************************/
})();
