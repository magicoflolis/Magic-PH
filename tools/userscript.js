/* eslint-disable */
import {
  access,
  constants,
  readFile,
  writeFile
} from 'node:fs/promises';
import dotenv from 'dotenv';
import watch from 'node-watch';

/** @type { dotenv.DotenvConfigOutput } */
let result = {};

/** Source Directories */
const sDir = {
  head: './src/UserJS/header.js',
  body: './src/UserJS/main.js',
  /**
   * FORMAT
   * `name`: `file location`
   */
  extras: {
    'downloadCSS': './build/css/downloader.css',
  },
};
/** Watch Directories */
const wDir = ['./src/UserJS', './src/Common/sass'];
const buildPaths = {
  name: 'magicph',
  dev: {
    env: './src/UserJS/.env',
    dir: './test-server',
  },
  public: {
    env: './dist/UserJS/.env',
    dir: './dist/UserJS',
  },
};
const userJS = {
  /** `//@compatible Web Browser` */
  compatible: ['chrome', 'firefox', 'edge', 'opera', 'safari'],
  /** `//@connect URL` */
  connect: [],
  /** `//@exclude-match URL` */
  'exclude-match': [],
  /** `//@grant GM Permission` */
  grant: [
    'eval',
    // 'window.close',
    'GM.openInTab',
    'GM.setClipboard',
    'GM.xmlHttpRequest',
    'unsafeWindow'
  ],
  /** `//@match URL` */
  match: [
    // 'https://*.pornhub.com/view_video.php?viewkey=*',
    // 'https://*.pornhubpremium.com/view_video.php?viewkey=*',
    'https://*.pornhub.com/*',
    'https://*.pornhubpremium.com/*',
    'https://*.youporn.com/watch/*',
    'https://*.youpornpremium.com/watch/*',
    'https://*.youporngay.com/watch/*',
    'https://*.redtube.com/*',
    'https://*.redtubepremium.com/*',
    'https://*.tube8.com/porn-video/*',
    'https://*.thumbzilla.com/video/*',
    'https://onlyfans.com/*',
    'https://xhamster.com/videos/*'
  ],
  /** `//@noframes` */
  noframes: true,
  /** `//@resource Name URL` */
  resource: {},
  /** `//@run-at execute` */
  'run-at': 'document-start',
};
const log = (...msg) => {
  console.log('[LOG]', ...msg);
};
const err = (...msg) => {
  console.error('[ERROR]', ...msg);
};
/**
 * Object is typeof `object` / JSON Object
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isObj = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Object');
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (isObj(obj) && Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * Object is Empty
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
const canAccess = async (filePath, encoding = 'utf-8') => {
  const testAccess = await access(filePath, constants.R_OK | constants.W_OK);
  if (isNull(testAccess)) {
    const data = await readFile(filePath, encoding);
    return data.toString(encoding);
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`,
  };
};
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
const watcher = watch(wDir, {
  recursive: true,
  delay: 2000,
  filter: /\.(js|[s]css)$/,
});
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3,
};
const initUserJS = async (env) => {
  try {
    const jsonData = await fileToJSON('./package.json', 'utf-8');
    /** Build Paths */
    const p = {
      dev: `${buildPaths.dev.dir}/${buildPaths.name}.dev.user.js`,
      pub: `${buildPaths.public.dir}/${buildPaths.name}.user.js`,
    };
    const nano = (template, data) => {
      return template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
        const keys = key.split('.');
        let v = data[keys.shift()];
        for (const i in keys.length) v = v[keys[i]];
        return isEmpty(v) ? '' : v;
      });
    };
    const js_env = env.JS_ENV === 'development';
    const outFile = js_env ? p.dev : p.pub;
    const compileMetadata = () => {
      const resp = [];
      for (const [key, value] of Object.entries(userJS)) {
        if (Array.isArray(value)) {
          for (const v of value) {
            resp.push(`// @${key}     ${v}`);
          }
        } else if (isObj(value)) {
          for (const [k, v] of Object.entries(value)) {
            resp.push(`// @${key}     ${k} ${v}`);
          }
        } else if (typeof value === 'boolean') {
          if (value === true) {
            resp.push(`// @${key}`);
          }
        } else {
          resp.push(`// @${key}     ${value}`);
        }
      }
      return resp.join('\n');
    };
    const buildUserJS = async () => {
      try {
        const userJSHeader = `// ==UserScript==\n// @name         ${
          js_env ? `[Dev] ${jsonData.userJS.name}` : jsonData.userJS.name
        }
// @description  ${jsonData.description}
// @author       ${jsonData.author}
// @version      ${js_env ? +new Date() : jsonData.userJS.version}
// @icon         ${jsonData.userJS.icon}
// @downloadURL  ${
          js_env
            ? `https://localhost:8080/${buildPaths.name}.dev.user.js`
            : jsonData.userJS.url
        }
// @updateURL    ${
          js_env
            ? `https://localhost:8080/${buildPaths.name}.dev.user.js`
            : jsonData.userJS.url
        }
// @namespace    ${jsonData.userJS.homepage}
// @homepageURL  ${jsonData.userJS.homepage}
// @supportURL   ${jsonData.userJS.bugs}
// @license      ${jsonData.license}
${compileMetadata()}
// ==/UserScript==`;

        const headerFile = await canAccess(sDir.head);
        const mainFile = await canAccess(sDir.body);
        const nanoCFG = {
          jshead: userJSHeader,
          code: mainFile,
        };
        for (const [k, v] of Object.entries(sDir.extras)) {
          const extraFile = await canAccess(v);
          if (typeof extraFile === 'string') {
            nanoCFG[k] = extraFile;
          }
        }
        const wfConfig = nano(headerFile, nanoCFG);

        await writeFile(outFile, wfConfig);
        log('Build:', {
          path: outFile,
          time: new Intl.DateTimeFormat('default', dateOptions).format(
            new Date()
          ),
        });
      } catch (ex) {
        err(ex);
      }
    };
    //#region Start Process
    log(`Node ENV: ${env.JS_ENV}`);

    if (js_env) {
      watcher.on('change', buildUserJS);
      watcher.on('error', (ex) => {
        err(ex);
        watcher.close();
      });
      watcher.on('ready', buildUserJS);
      return;
    }
    await buildUserJS();
    process.exit(0);
    //#endregion
  } catch (ex) {
    err(ex);
  }
};

try {
  result = isEmpty(process.env.JS_ENV)
    ? dotenv.config({ path: buildPaths.dev.env })
    : dotenv.config({ path: buildPaths.public.env });
  if (result.error) {
    throw result.error;
  }
  if (isNull(result.parsed.JS_ENV)) {
    dotenv.populate(
      result.parsed,
      {
        JS_ENV: 'development',
      },
      { override: true, debug: true }
    );
  }
  initUserJS(result.parsed);
} catch (ex) {
  err(ex);
}
