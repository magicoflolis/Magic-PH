[[metadata]]
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
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
/******************************************************************************/

/**
 * To compile this CSS `pnpm run build:Sass`
 * @desc Link to uncompiled Cascading Style Sheet
 * @link https://github.com/magicoflolis/Magic-PH/tree/master/src/sass
 */
const mainCSS = `[[mainCSS]]`;
/**
* Link to uncompressed locales + compiler
* @link https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales
* @link https://github.com/magicoflolis/Magic-PH/blob/master/tools/languageLoader.js
*/
const translations = [[languageList]];
[[code]]
})();
