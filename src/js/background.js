'use strict';

import block from './block-traffic.js';

try {
  block.start();
} catch (error) {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', error);
}
