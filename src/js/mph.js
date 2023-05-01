/* eslint-disable no-unused-vars */
'use strict';

let webext = (self.webext = typeof browser == 'undefined' ? chrome : browser);
let mph = self.mph;

// Skip text/plain documents.
if (
  (document instanceof HTMLDocument ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.mph instanceof Object === false || mph.MPH !== true)
) {
  mph = self.mph = { MPH: true };
}

void 0;