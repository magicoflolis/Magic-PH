'use strict';
// eslint-disable-next-line no-unused-vars
import { qs, qsA, query } from './querySelector.js';

const block = {
  mini: [
    'phncdn.com/www-static/js/lib/networkbar',
    'phncdn.com/networkbar-*',
    'phncdn.com/www-static/js/quality-selector.js',
    'pornhub.com/front/menu_livesex',
    'phncdn.com/www-static/js/promo-'
  ],
  full: [
    'phncdn.com/www-static/js/lib/networkbar',
    'phncdn.com/networkbar-*',
    'phncdn.com/www-static/js/quality-selector.js',
    'pornhub.com/front/menu_livesex',
    'phncdn.com/www-static/js/promo-',
    'phncdn.com/stattracker-*',
    'phncdn.com/pre_videos/*',
    'phncdn.com/www-static/*/htmlPauseRoll/pb_block.',
    'phncdn.com/www-static/js/lib/generated/front-index-',
    'phncdn.com/www-static/css/front-index-pc.css',
    'phncdn.com/www-static/*/premium/premium-modals.',
    'phncdn.com/www-static/js/ph-',
    'phncdn.com/videos/*/*/*/*.webm',
    'trafficjunky.(com|net)',
    'hotjar.com/c/hotjar-*.js?sv=*',
    'etahub.com/*',
    'g.doubleclick.net/*',
    'adtng.com/*',
    'pornhub.com/_xa',
    'pornhub.com/js/*'
  ],
  final: []
};

const textEncode = (() => {
  // charset aliases extracted from:
  // https://github.com/inexorabletash/text-encoding/blob/b4e5bc26e26e51f56e3daa9f13138c79f49d3c34/lib/encoding.js#L342
  const normalizedCharset = new Map([
    ['utf8', 'utf-8'],
    ['unicode-1-1-utf-8', 'utf-8'],
    ['utf-8', 'utf-8'],

    ['windows-1250', 'windows-1250'],
    ['cp1250', 'windows-1250'],
    ['x-cp1250', 'windows-1250'],

    ['windows-1251', 'windows-1251'],
    ['cp1251', 'windows-1251'],
    ['x-cp1251', 'windows-1251'],

    ['windows-1252', 'windows-1252'],
    ['ansi_x3.4-1968', 'windows-1252'],
    ['ascii', 'windows-1252'],
    ['cp1252', 'windows-1252'],
    ['cp819', 'windows-1252'],
    ['csisolatin1', 'windows-1252'],
    ['ibm819', 'windows-1252'],
    ['iso-8859-1', 'windows-1252'],
    ['iso-ir-100', 'windows-1252'],
    ['iso8859-1', 'windows-1252'],
    ['iso88591', 'windows-1252'],
    ['iso_8859-1', 'windows-1252'],
    ['iso_8859-1:1987', 'windows-1252'],
    ['l1', 'windows-1252'],
    ['latin1', 'windows-1252'],
    ['us-ascii', 'windows-1252'],
    ['x-cp1252', 'windows-1252']
  ]);

  // http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP1250.TXT
  const cp1250_range0 = new Uint8Array([
    /* 0x0100 */ 0x00, 0x00, 0xc3, 0xe3, 0xa5, 0xb9, 0xc6, 0xe6, /* 0x0108 */ 0x00, 0x00, 0x00,
    0x00, 0xc8, 0xe8, 0xcf, 0xef, /* 0x0110 */ 0xd0, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0118 */ 0xca, 0xea, 0xcc, 0xec, 0x00, 0x00, 0x00, 0x00, /* 0x0120 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0128 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0130 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0138 */ 0x00, 0xc5, 0xe5,
    0x00, 0x00, 0xbc, 0xbe, 0x00, /* 0x0140 */ 0x00, 0xa3, 0xb3, 0xd1, 0xf1, 0x00, 0x00, 0xd2,
    /* 0x0148 */ 0xf2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0150 */ 0xd5, 0xf5, 0x00,
    0x00, 0xc0, 0xe0, 0x00, 0x00, /* 0x0158 */ 0xd8, 0xf8, 0x8c, 0x9c, 0x00, 0x00, 0xaa, 0xba,
    /* 0x0160 */ 0x8a, 0x9a, 0xde, 0xfe, 0x8d, 0x9d, 0x00, 0x00, /* 0x0168 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0xd9, 0xf9, /* 0x0170 */ 0xdb, 0xfb, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0178 */ 0x00, 0x8f, 0x9f, 0xaf, 0xbf, 0x8e, 0x9e, 0x00
  ]);

  // http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP1251.TXT
  const cp1251_range0 = new Uint8Array([
    /* 0x0400 */ 0x00, 0xa8, 0x80, 0x81, 0xaa, 0xbd, 0xb2, 0xaf, /* 0x0408 */ 0xa3, 0x8a, 0x8c,
    0x8e, 0x8d, 0x00, 0xa1, 0x8f, /* 0x0410 */ 0xc0, 0xc1, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7,
    /* 0x0418 */ 0xc8, 0xc9, 0xca, 0xcb, 0xcc, 0xcd, 0xce, 0xcf, /* 0x0420 */ 0xd0, 0xd1, 0xd2,
    0xd3, 0xd4, 0xd5, 0xd6, 0xd7, /* 0x0428 */ 0xd8, 0xd9, 0xda, 0xdb, 0xdc, 0xdd, 0xde, 0xdf,
    /* 0x0430 */ 0xe0, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, /* 0x0438 */ 0xe8, 0xe9, 0xea,
    0xeb, 0xec, 0xed, 0xee, 0xef, /* 0x0440 */ 0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7,
    /* 0x0448 */ 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff, /* 0x0450 */ 0x00, 0xb8, 0x90,
    0x83, 0xba, 0xbe, 0xb3, 0xbf, /* 0x0458 */ 0xbc, 0x9a, 0x9c, 0x9e, 0x9d, 0x00, 0xa2, 0x9f,
    /* 0x0460 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0468 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0470 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0478 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0480 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0488 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0490 */ 0xa5, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);

  // https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP1252.TXT
  const cp1252_range0 = new Uint8Array([
    /* 0x0150 */ 0x00, 0x00, 0x8c, 0x9c, 0x00, 0x00, 0x00, 0x00, /* 0x0158 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0160 */ 0x8a, 0x9a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* 0x0168 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0170 */ 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x0178 */ 0x9f, 0x00, 0x00, 0x00, 0x00, 0x8e, 0x9e, 0x00
  ]);

  const cp125x_range0 = new Uint8Array([
    /* 0x2010 */ 0x00, 0x00, 0x00, 0x96, 0x97, 0x00, 0x00, 0x00, /* 0x2018 */ 0x91, 0x92, 0x82,
    0x00, 0x93, 0x94, 0x84, 0x00, /* 0x2020 */ 0x86, 0x87, 0x95, 0x00, 0x00, 0x00, 0x85, 0x00,
    /* 0x2028 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* 0x2030 */ 0x89, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, /* 0x2038 */ 0x00, 0x8b, 0x9b, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);

  const encoders = {
    'windows-1250': function (buf) {
      let i = 0,
        n = buf.byteLength,
        o = 0,
        c;
      while (i < n) {
        c = buf[i++];
        if (c < 0x80) {
          buf[o++] = c;
        } else {
          if ((c & 0xe0) === 0xc0) {
            c = (c & 0x1f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf0) === 0xe0) {
            c = (c & 0x0f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf8) === 0xf0) {
            c = (c & 0x07) << 18;
            c |= (buf[i++] & 0x3f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          }
          if (c < 0x100) {
            buf[o++] = c;
          } else if (c < 0x180) {
            buf[o++] = cp1250_range0[c - 0x100];
          } else if (c >= 0x2010 && c < 0x2040) {
            buf[o++] = cp125x_range0[c - 0x2010];
          } else if (c === 0x02c7) {
            buf[o++] = 0xa1;
          } else if (c === 0x02d8) {
            buf[o++] = 0xa2;
          } else if (c === 0x02d9) {
            buf[o++] = 0xff;
          } else if (c === 0x02db) {
            buf[o++] = 0xb2;
          } else if (c === 0x02dd) {
            buf[o++] = 0xbd;
          } else if (c === 0x20ac) {
            buf[o++] = 0x88;
          } else if (c === 0x2122) {
            buf[o++] = 0x99;
          }
        }
      }
      return buf.slice(0, o);
    },
    'windows-1251': function (buf) {
      let i = 0,
        n = buf.byteLength,
        o = 0,
        c;
      while (i < n) {
        c = buf[i++];
        if (c < 0x80) {
          buf[o++] = c;
        } else {
          if ((c & 0xe0) === 0xc0) {
            c = (c & 0x1f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf0) === 0xe0) {
            c = (c & 0x0f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf8) === 0xf0) {
            c = (c & 0x07) << 18;
            c |= (buf[i++] & 0x3f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          }
          if (c < 0x100) {
            buf[o++] = c;
          } else if (c >= 0x400 && c < 0x4a0) {
            buf[o++] = cp1251_range0[c - 0x400];
          } else if (c >= 0x2010 && c < 0x2040) {
            buf[o++] = cp125x_range0[c - 0x2010];
          } else if (c === 0x20ac) {
            buf[o++] = 0x88;
          } else if (c === 0x2116) {
            buf[o++] = 0xb9;
          } else if (c === 0x2122) {
            buf[o++] = 0x99;
          }
        }
      }
      return buf.slice(0, o);
    },
    'windows-1252': function (buf) {
      let i = 0,
        n = buf.byteLength,
        o = 0,
        c;
      while (i < n) {
        c = buf[i++];
        if (c < 0x80) {
          buf[o++] = c;
        } else {
          if ((c & 0xe0) === 0xc0) {
            c = (c & 0x1f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf0) === 0xe0) {
            c = (c & 0x0f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          } else if ((c & 0xf8) === 0xf0) {
            c = (c & 0x07) << 18;
            c |= (buf[i++] & 0x3f) << 12;
            c |= (buf[i++] & 0x3f) << 6;
            c |= buf[i++] & 0x3f;
          }
          if (c < 0x100) {
            buf[o++] = c;
          } else if (c >= 0x150 && c < 0x180) {
            buf[o++] = cp1252_range0[c - 0x150];
          } else if (c >= 0x2010 && c < 0x2040) {
            buf[o++] = cp125x_range0[c - 0x2010];
          } else if (c === 0x192) {
            buf[o++] = 0x83;
          } else if (c === 0x2c6) {
            buf[o++] = 0x88;
          } else if (c === 0x2dc) {
            buf[o++] = 0x98;
          } else if (c === 0x20ac) {
            buf[o++] = 0x80;
          } else if (c === 0x2122) {
            buf[o++] = 0x99;
          }
        }
      }
      return buf.slice(0, o);
    }
  };

  return {
    encode: function (charset, buf) {
      // eslint-disable-next-line no-prototype-builtins
      return encoders.hasOwnProperty(charset) ? encoders[charset](buf) : buf;
    },
    normalizeCharset: function (charset) {
      if (charset === undefined) {
        return 'utf-8';
      }
      return normalizedCharset.get(charset.toLowerCase());
    }
  };
})();
const filterDocument = (fctxt, extras) => {
  const filterers = new Map();
  let domParser, xmlSerializer, utf8TextDecoder, textDecoder, textEncoder;
  const textDecode = function (encoding, buffer) {
    if (textDecoder !== undefined && textDecoder.encoding !== encoding) {
      textDecoder = undefined;
    }
    if (textDecoder === undefined) {
      textDecoder = new TextDecoder(encoding);
    }
    return textDecoder.decode(buffer);
  };
  const reContentTypeCharset = /charset=['"]?([^'" ]+)/i;
  const charsetFromContentType = function (contentType) {
    const match = reContentTypeCharset.exec(contentType);
    if (match !== null) {
      return match[1].toLowerCase();
    }
  };

  const charsetFromDoc = function (doc) {
    let meta = doc.querySelector('meta[charset]');
    if (meta !== null) {
      return meta.getAttribute('charset').toLowerCase();
    }
    meta = doc.querySelector('meta[http-equiv="content-type" i][content]');
    if (meta !== null) {
      return charsetFromContentType(meta.getAttribute('content'));
    }
  };
  const streamClose = function (filterer, buffer) {
    if (buffer !== undefined) {
      filterer.stream.write(buffer);
    } else if (filterer.buffer !== undefined) {
      filterer.stream.write(filterer.buffer);
    }
    filterer.stream.close();
  };
  const onStreamData = function (ev) {
    const filterer = filterers.get(this);
    if (filterer === undefined) {
      this.write(ev.data);
      this.disconnect();
      return;
    }
    if (this.status !== 'transferringdata' && this.status !== 'finishedtransferringdata') {
      filterers.delete(this);
      this.disconnect();
      return;
    }
    if (filterer.buffer === null) {
      filterer.buffer = new Uint8Array(ev.data);
      return;
    }
    const buffer = new Uint8Array(filterer.buffer.byteLength + ev.data.byteLength);
    buffer.set(filterer.buffer);
    buffer.set(new Uint8Array(ev.data), filterer.buffer.byteLength);
    filterer.buffer = buffer;
  };
  const onStreamStop = function () {
    const filterer = filterers.get(this);
    // const pgparam = mph.page.getPage(filterer.domain);
    filterers.delete(this);
    if (filterer === undefined || filterer.buffer === null) {
      this.close();
      return;
    }
    if (this.status !== 'finishedtransferringdata') {
      return;
    }

    if (domParser === undefined) {
      domParser = new DOMParser();
      xmlSerializer = new XMLSerializer();
    }
    if (textEncoder === undefined) {
      textEncoder = new TextEncoder();
    }

    let doc;

    // If stream encoding is still unknnown, try to extract from document.
    let charsetFound = filterer.charset,
      charsetUsed = charsetFound;
    if (charsetFound === undefined) {
      if (utf8TextDecoder === undefined) {
        utf8TextDecoder = new TextDecoder();
      }
      doc = domParser.parseFromString(
        utf8TextDecoder.decode(filterer.buffer.slice(0, 1024)),
        filterer.mime
      );
      charsetFound = charsetFromDoc(doc);
      charsetUsed = textEncode.normalizeCharset(charsetFound);
      if (charsetUsed === undefined) {
        return streamClose(filterer);
      }
    }
    doc = domParser.parseFromString(textDecode(charsetUsed, filterer.buffer), filterer.mime);

    // https://github.com/gorhill/uBlock/issues/3507
    //   In case of no explicit charset found, try to find one again, but
    //   this time with the whole document parsed.
    if (charsetFound === undefined) {
      charsetFound = textEncode.normalizeCharset(charsetFromDoc(doc));
      if (charsetFound !== charsetUsed) {
        if (charsetFound === undefined) {
          return streamClose(filterer);
        }
        charsetUsed = charsetFound;
        doc = domParser.parseFromString(textDecode(charsetFound, filterer.buffer), filterer.mime);
      }
    }

    // Start here

    // log(doc, pgparam);
    // pgparam = mph.page.getPage(doc.location.origin)
    const selectors = [
      '[id="network-bar"]',
      '[id="popsByTrafficJunky"]'
    ];
    for(const s of [...qsA('style', doc)]) {
      if(mph.isEmpty(s.innerHTML)) continue;
      const txt = s.innerHTML;
      if(txt.match(/\.(\w|\d)+ iframe/gi)) {
        s.remove();
      };
    };
    for(const s of selectors) {
      if(qs(s, doc)) {
        qs(s, doc).remove();
      };
    };

    // End here

    // https://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript/10162353#10162353
    const doctypeStr =
      doc.doctype instanceof Object ? xmlSerializer.serializeToString(doc.doctype) + '\n' : '';

    // https://github.com/gorhill/uBlock/issues/3391
    let encodedStream = textEncoder.encode(doctypeStr + doc.documentElement.outerHTML);
    if (charsetUsed !== 'utf-8') {
      encodedStream = textEncode.encode(charsetUsed, encodedStream);
    }

    streamClose(filterer, encodedStream);
  };
  const onStreamError = function () {
    filterers.delete(this);
  };
  const fullURL = new URL(fctxt.url);
  const request = {
    stream: undefined,
    tabId: fctxt.tabId,
    url: fctxt.url,
    hostname: fullURL.hostname,
    domain: fullURL.hostname,
    entity: fullURL.hostname,
    selectors: undefined,
    buffer: null,
    mime: 'text/html',
    charset: undefined
  };
  const stream = (request.stream = webext.webRequest.filterResponseData(extras.requestId));
  stream.ondata = onStreamData;
  stream.onstop = onStreamStop;
  stream.onerror = onStreamError;
  filterers.set(stream, request);
  return true;
};

const onBeforeRequest = (details) => {
  const requestURL = details.url;
  if (details.tabId > 0) {
    if (requestURL.match(/ads\W\D/g)) {
      return { cancel: true };
    }
    for (let b of block.final) {
      const teststr = new RegExp(`https://\\w+.${b}`, 'gi');
      if (requestURL.match(teststr)) {
        return { cancel: true };
      }
    }
  }

  if (details.type === 'stylesheet' || details.type === 'image') {
    return { cancel: false };
  }
  return { cancel: false };
};

const headerIndexFromName = function (headerName, headers) {
  let i = headers.length;
  while (i--) {
    if (headers[i].name.toLowerCase() === headerName) {
      return i;
    }
  }
  return -1;
};

const headerValueFromName = function (headerName, headers) {
  const i = headerIndexFromName(headerName, headers);
  return i !== -1 ? headers[i].value : '';
};
const reMediaContentTypes = /^(?:audio|image|video)\//;

// https://github.com/uBlockOrigin/uBlock-issues/issues/610

const normalizeBehindTheSceneResponseHeaders = function (details) {
  if (details.type !== 'xmlhttprequest') {
    return false;
  }
  const headers = details.responseHeaders;
  if (Array.isArray(headers) === false) {
    return false;
  }
  const contentType = headerValueFromName('content-type', headers);
  if (contentType === '') {
    return false;
  }
  if (reMediaContentTypes.test(contentType) === false) {
    return false;
  }
  if (contentType.startsWith('image')) {
    details.type = 'image';
  } else {
    details.type = 'media';
  }
  return true;
};

// eslint-disable-next-line no-unused-vars
const onHeadersReceived = (details) => {
  if (details.tabId < 0 && normalizeBehindTheSceneResponseHeaders(details) === false) {
    return;
  }
  const { responseHeaders } = details;
  if (Array.isArray(responseHeaders) === false) {
    return;
  }
  if (details.type === 'main_frame' || details.type === 'sub_frame') {
    filterDocument(details, details);
  }
  return { cancel: false };
};

const webRequest = {
  onBeforeRequest,
  start: (() => {
    block.final = block.mini;
    // block.final = cfg.adblock.match(/full/gi) ? block.full : block.mini;
    // if(cfg.adblock.match(/off/gi)) {
    //   webext.webRequest.onBeforeRequest.removeListener(traffic);
    // };
    return () => {
      webext.webRequest.onBeforeRequest.addListener(
        onBeforeRequest,
        {
          urls: ['http://*/*', 'https://*/*']
        },
        ['blocking']
      );
      if(typeof webext.webRequest.filterResponseData === 'function') {
        webext.webRequest.onHeadersReceived.addListener(
          onHeadersReceived,
          {
            urls: ['http://*/*', 'https://*/*']
          },
          ['blocking', 'responseHeaders']
        );
      };

      // const portMessage = (root = {}) => {
      //   let cfg = root.cfg;
      //   block.final = cfg.adblock.match(/full/gi) ? block.full : block.mini;
      //   if(cfg.adblock.match(/off/gi)) {
      //     webext.webRequest.onBeforeRequest.removeListener(onBeforeRequest);
      //   };
      // };
      // mph.hermes.send('init', {
      //   what: 'setup'
      // }).then((response) => {
      //   portMessage(response);
      // });
    };
  })()
};

export default webRequest;
