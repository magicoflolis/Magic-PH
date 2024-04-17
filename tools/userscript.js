import { URL } from 'node:url';
import fs from 'node:fs';
import dotenv from 'dotenv';
import watch from 'node-watch';
import { loadLanguages } from './languageLoader.js';

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
  const testAccess = await fs.promises.access(
    filePath,
    fs.promises.constants.R_OK | fs.promises.constants.W_OK
  );
  if (isNull(testAccess)) {
    const data = await fs.promises.readFile(filePath, encoding);
    return data.toString(encoding);
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`
  };
};
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
const writeUserJS = async (destinationFilePath, data) => {
  return await fs.promises.writeFile(destinationFilePath, data);
};
const toDate = () => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3
  }).format(new Date());
};
const initUserJS = async () => {
  /** @type { dotenv.DotenvConfigOutput } */
  let result = {};
  try {
    const jsonData = await fileToJSON('./package.json');
    if (!jsonData.userJS) {
      throw new Error('Missing "userJS" key in package.json');
    }
    const userJS = jsonData.userJS;
    const { build } = userJS;

    result = dotenv.config({
      path: isEmpty(process.env.JS_ENV) ? build.paths.dev.env : build.paths.public.env
    });
    if (result.error) {
      throw result.error;
    }
    if (isNull(result.parsed.JS_ENV)) {
      dotenv.populate(
        result.parsed,
        {
          JS_ENV: 'development'
        },
        { override: true, debug: true }
      );
    }
    const env = result.parsed;
    const js_env = env.JS_ENV === 'development';
    const dp = js_env ? 'dev' : 'public';
    const nano = (template, data) => {
      return template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
        const keys = key.split('.');
        let v = data[keys.shift()];
        for (const i in keys.length) v = v[keys[i]];
        return isEmpty(v) ? '' : v;
      });
    };
    const buildUserJS = async () => {
      try {
        const lngList = await loadLanguages(new URL('../src/_locales', import.meta.url));
        const transformLanguages = () => {
          const resp = {};
          for (const obj of lngList) {
            for (const [k, v] of Object.entries(obj)) {
              const o = {};
              for (const [key, value] of Object.entries(v)) {
                if (key.startsWith('ext')) {
                  continue;
                }
                if (/userjs_(name|description)/i.test(key)) {
                  continue;
                }
                if (isEmpty(value.message)) {
                  continue;
                }
                o[key] = value.message;
              }
              resp[k] = o;
            }
          }
          return JSON.stringify(resp);
        };
        const compileLanguage = (type = 'userjs_name') => {
          const resp = [];
          for (const obj of lngList) {
            for (const [k, v] of Object.entries(obj)) {
              if (v[type]) {
                if (isEmpty(v[type].message)) {
                  continue;
                }
                if (k.startsWith('en')) {
                  continue;
                }
                const t = type.toLowerCase().replace('userjs_', '');
                if (type === 'userjs_name') {
                  resp.push(
                    `// @${t}:${k.replace('_', '-')}      ${js_env ? '[Dev] ' : ''}${v[type].message}`
                  );
                } else {
                  resp.push(`// @${t}:${k.replace('_', '-')}      ${v[type].message}`);
                }
              }
            }
          }
          return resp;
        };
        const compileMetadata = () => {
          const metaData = [];
          for (const [key, value] of Object.entries(userJS.metadata)) {
            if (Array.isArray(value)) {
              for (const v of value) {
                metaData.push(`// @${key}     ${v}`);
              }
            } else if (isObj(value)) {
              for (const [k, v] of Object.entries(value)) {
                metaData.push(`// @${key}     ${k} ${v}`);
              }
            } else if (typeof value === 'boolean') {
              if (value === true) {
                metaData.push(`// @${key}`);
              }
            } else {
              metaData.push(`// @${key}     ${value}`);
            }
          }
          return metaData.join('\n');
        };
        /**
         * @template { import('../package.json') } J
         * @template { string } S
         * @param { S[] } arr
         * @returns { J["userJS"][S] }
         */
        const getData = (arr = []) => {
          try {
            if (!isObj(jsonData)) {
              return 'ERROR "jsonData" IS NOT A JSON OBJECT';
            }
            const resp = [];
            for (const str of arr) {
              const getParam = () => {
                if (str in build.paths[dp] && build.paths[dp][str]) {
                  return build.paths[dp][str];
                } else if ('userJS' in jsonData && jsonData.userJS[str]) {
                  return jsonData.userJS[str];
                }
                return jsonData[str] ?? null;
              };
              const param = getParam();
              if (!param) {
                continue;
              }
              if (str === 'name') {
                resp.push(
                  `// @${str}         ${js_env ? '[Dev] ' : ''}${param}`,
                  ...compileLanguage('userjs_name')
                );
              } else if (str === 'description') {
                resp.push(`// @${str}  ${param}`, ...compileLanguage('userjs_description'));
              } else if (str === 'author') {
                resp.push(`// @${str}       ${param}`);
              } else if (str === 'icon') {
                const buff = new Buffer.from(fs.readFileSync(param));
                const base64data = buff.toString('base64');
                if (param.endsWith('.png')) {
                  resp.push(`// @${str}         data:image/png;base64,${base64data}`);
                } else if (param.endsWith('.svg')) {
                  resp.push(`// @${str}         data:image/svg+xml;base64,${base64data}`);
                }
              } else if (str === 'url') {
                resp.push(`// @downloadURL  ${param}`, `// @updateURL    ${param}`);
              } else if (str === 'version') {
                resp.push(`// @${str}      ${js_env ? +new Date() : param}`);
              } else if (str === 'homepage') {
                resp.push(`// @namespace    ${param}`, `// @homepageURL  ${param}`);
              } else if (str === 'bugs') {
                resp.push(`// @supportURL   ${param}`);
              } else if (str === 'license') {
                resp.push(`// @${str}      ${param}`);
              } else {
                resp.push(param);
              }
            }
            return resp.join('\n');
          } catch (ex) {
            err(ex);
          }
        };
        const userJSHeader = `// ==UserScript==\n${getData(['name', 'description', 'author', 'icon', 'version', 'url', 'homepage', 'bugs', 'license'])}\n${compileMetadata()}\n// ==/UserScript==`;
        const headerFile = await canAccess(build.source.head);
        const mainFile = await canAccess(build.source.body);
        const nanoCFG = {
          metadata: userJSHeader,
          languageList: transformLanguages(),
          code: mainFile
        };
        for (const [k, v] of Object.entries(build.source.extras)) {
          const extraFile = await canAccess(v);
          if (typeof extraFile === 'string') {
            nanoCFG[k] = extraFile;
          }
        }
        const outFile = `${build.paths[dp].dir}/${build.paths[dp].fileName}.user.js`;
        await writeUserJS(outFile, nano(headerFile, nanoCFG));
        log('UserJS Build:', {
          path: outFile,
          time: toDate()
        });
        if (!js_env) {
          const metaFile = await canAccess(build.source.metadata);
          const outMeta = `${build.paths[dp].dir}/${build.paths[dp].fileName}.meta.user.js`;
          await writeUserJS(outMeta, nano(metaFile, { metadata: userJSHeader }));
          log('UserJS Metadata:', {
            path: outMeta,
            time: toDate()
          });
        }
      } catch (ex) {
        err(ex);
      }
    };
    const watcher = watch(build.watchDirs, {
      recursive: true,
      delay: 2000,
      filter: /\.(js|[s]css)$/
    });
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

initUserJS();
