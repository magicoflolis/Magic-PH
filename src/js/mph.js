/* eslint-disable no-unused-vars */
'use strict';

// eslint-disable-next-line prefer-const
let webext = (self.webext = typeof browser == 'undefined' ? chrome : browser);
/** @type { object{} } */
let mph = self.mph;

// Skip text/plain documents.
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.mph instanceof Object === false || mph.MPH !== true)
) {
  mph = self.mph = { MPH: true };
}

void 0;
