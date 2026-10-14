[[metadata]]
(() => {
'use strict';
/******************************************************************************/

this.MagicJS ||= {};
if (this.MagicJS.userjs === true) return;
this.MagicJS.userjs = true;

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
    ((document instanceof Document || document instanceof XMLDocument) && document.createElement('div') instanceof HTMLDivElement) &&
    /^text\/html|^application\/(xhtml|xml)/.test(document.contentType || '') === true
  )
) {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', `MIME type is not a document, got "${document.contentType || ''}"`);
  return;
}

/** [i18n directory](https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales) */
const translations = [[languageList]];
/** [source code](https://github.com/magicoflolis/Magic-PH/tree/master/src/sass/_main.scss) */
const main_css = `[[mainCSS]]`;
/******************************************************************************/
[[code]]
/******************************************************************************/
})();
