{{metadata}}
(() => {
'use strict';
const Limit_Downloads = false; // Will apply to OnlyFans only

/******************************************************************************/
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
if (inIframe()) {
  return;
}
/**
* Skip text/plain documents
* @link https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js
*/
let mph = self.mph;
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.mph instanceof Object === false || mph.MPH !== true)
) {
  mph = self.mph = { MPH: true };
}
if (!(typeof mph === 'object' && mph.MPH)) {
  return;
}
/******************************************************************************/

/**
 * To compile this CSS `pnpm run build:Sass`
 * @desc Link to uncompiled Cascading Style Sheet
 * @link https://github.com/magicoflolis/Magic-PH/tree/master/src/sass
 */
const downloadCSS = `{{downloadCSS}}`;
/**
* Link to uncompressed locales + compiler
* @link https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales
* @link https://github.com/magicoflolis/Magic-PH/blob/master/tools/languageLoader.js
*/
const languageList = {{languageList}};
{{code}}
})();