'use strict';

const err = (...msg) => console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...msg);
const info = (...msg) => console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...msg);
const log = (...msg) => console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...msg);
const table = (...msg) => console.table(...msg);

export { err,info,log,table };
