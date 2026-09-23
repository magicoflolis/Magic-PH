// @ts-check
'use strict';

import * as fs from 'node:fs';
import path from 'node:path';
import Watchpack from 'watchpack';
import minimist from 'minimist';
import { loadLanguages } from '@userjs/i18n';
import { compile } from 'sass-embedded';

/**
 * @typedef { import('../typings/index.d.ts').UserJS } CFG
 */

const replaceTemplate = /\[\[(.*?)\]\]/g;
const metadataTemplate = process.env.METADATA_TEMPLATE || '[[metadata]]';

const log = (/** @type {unknown[]} */ ...msg) => console.log('[LOG]', ...msg);
const err = (/** @type {unknown[]} */ ...msg) => console.error('[ERROR]', ...msg);
/**
 * Transform parameter into string
 * @template O
 * @param {O} obj
 * @returns {string}
 */
function objToStr(obj) {
  try {
    return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)?.[1] || '';
  } catch {
    return '';
  }
}
/**
 * Parameter is `JSON Object`
 * @template O
 * @param {O} obj
 * @returns {obj is (Record<PropertyKey, unknown> | Record<keyof O, O>)}
 */
const isObj = (obj) => /Object/.test(objToStr(obj));
/**
 * @template T
 * @template {Record<string, boolean>} A
 * @param {T} target
 * @param {A} args
 * @returns {T extends (null | undefined) ? [] : T extends readonly unknown[] ? T : A extends { entries: true; } ? T extends Record<infer K, infer V> ? Array<[K extends string ? K : string, V]> : Array<[string, unknown]> : A extends { keys: true; } ? T extends Record<infer K, unknown> ? Array<K extends string ? K : string> : T extends Set<unknown> | Map<infer K, unknown> ? K[] : string[] : A extends {  values: true; } ? T extends Record<string, infer V> ? V[] : T extends Set<infer V> | Map<unknown, infer V> ? V[] : unknown[] : T extends Iterable<infer U> ? U[] : unknown[]}
 */
function toArray(target, args) {
  if (target == null) return /** @type {any} */ ([]);
  if (Array.isArray(target)) return /** @type {any} */ (target);
  const opts = Object.assign({}, args);
  const method = /** @type {"entries" | "keys" | "values" | undefined} */ (
    ['entries', 'keys', 'values'].find((key) => key in opts || opts[key])
  );
  if (typeof target === 'string') {
    return /** @type {any} */ (method === 'keys' ? [...target] : [target]);
  }
  if (method != null) {
    const s = objToStr(target);
    if (/Object/.test(s)) {
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof Object>} */
      const _method = method;
      if (Object[_method]) {
        return /** @type {any} */ (Array.from(Object[_method](/** @type {object} */ (target))));
      }
    } else if (/Set|Map/.test(s)) {
      /** @type {Set<unknown> | Map<unknown, unknown>} */
      const _target = /** @type {any} */ (target);
      /** @type {Extract<"entries" | "keys" | "values", keyof typeof _target>} */
      const _method = method;
      if (_target[_method]) {
        return /** @type {any} */ (Array.from(_target[_method]()));
      }
    }
  }
  return /** @type {any} */ (Array.from(/** @type {any} */ (target)));
}
/**
 * Parameter is `null` or `undefined`
 * @template O
 * @param {O} obj
 * @returns {obj is (null | undefined)}
 */
const isNull = (obj) => Object.is(obj, null) || Object.is(obj, undefined);
/**
 * Parameter is an empty `Array`, `JSON Object`, `Map`, `Set`, or `String`
 * @template O
 * @param {O} obj
 */
const isBlank = (obj) => {
  return typeof obj === 'string'
    ? Object.is(obj.replaceAll('\0', '').trim(), '')
    : Object.is(toArray(obj, { keys: true }).length, 0);
};
// /**
//  * Parameter is an empty `Array`, `JSON Object`, `Map`, `Set`, or `String`
//  * @template O
//  * @param {O} obj
//  */
// const isBlank = (obj) => {
//   return (
//     (typeof obj === 'string' && Object.is(obj.replaceAll('\0', '').trim(), '')) ||
//     ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
//     (Array.isArray(obj) && Object.is(obj.length, 0)) ||
//     (isObj(obj) && Object.is(Object.keys(obj).length, 0))
//   );
// };
/**
 * Parameter is Empty
 * @template O
 * @param {O} obj
 */
const isEmpty = (obj) => isNull(obj) || isBlank(obj);
/**
 * @template T
 * @template D
 * @param {T} template
 * @param {Record<PropertyKey, unknown> | Record<keyof D, D>} data
 * @returns {T | string}
 */
const nano = (template, data) => {
  if (typeof template === 'string') {
    return template.replace(replaceTemplate, (_, p1) => {
      // @ts-expect-error n/a
      return (p1 in data && data[p1]) || '';
    });
  }
  return '';
};
// for (const i in keys.length) v = v[keys[i]];
// const nano = (template, data) => {
//   if (typeof template === 'string') {
//     return template.replace(replaceTemplate, (_match, key) => {
//       const keys = key.split('.');
//       let v = data[keys.shift()];
//       for (const i in keys.length) v = v[keys[i]];
//       return isEmpty(v) ? '' : v;
//     });
//   }
//   return '';
// };
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {BufferEncoding} encoding
 */
const canAccess = async (filePath, encoding = 'utf-8') => {
  const testAccess = await fs.promises.access(
    filePath,
    fs.promises.constants.R_OK | fs.promises.constants.W_OK
  );
  if (isNull(testAccess)) {
    const data = await fs.promises.readFile(filePath, { encoding });
    return data.toString();
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`
  };
};
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {BufferEncoding} encoding
 */
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (typeof testAccess !== 'string') {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
/**
 * @template {string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView>} D
 * @param {import('node:fs').PathLike} destinationFilePath
 * @param {D} data
 */
const writeUserJS = async (destinationFilePath, data) => {
  // The output directory does not exist on a fresh clone
  await fs.promises.mkdir(path.dirname(String(destinationFilePath)), { recursive: true });
  return await fs.promises.writeFile(destinationFilePath, data);
};
const toTime = () => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3
  }).format(new Date());
};
/**
 * @type { Map<string, any> }
 */
const dataMap = new Map();
/**
 * @param {unknown[]} a
 * @param {unknown[]} b
 */
const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
/**
 * @template {string} K
 * @template V
 * @param {K} key
 * @param {...V} values
 */
const addTo = (key, ...values) => {
  if (values.length === 0) {
    return '';
  }
  if (dataMap.has(key)) {
    if (compareArrays(dataMap.get(key), values)) {
      return dataMap.get(key);
    }
  }
  dataMap.set(key, values);
  return dataMap.get(key);
};

async function build() {
  try {
    const getEnv = () => {
      const argv = minimist(process.argv.slice(2));
      if (argv.JS_ROOT && argv.JS_ENV) {
        return {
          JS_ROOT: argv.JS_ROOT,
          JS_ENV: argv.JS_ENV,
          JS_i18n: `${argv.JS_ROOT}src/_locales`
        };
      }
      return process.env;
    };
    const { JS_ENV, JS_i18n } = getEnv();
    const jsonRecords = await Promise.all([
      // fileToJSON('./package.json').then(({ userJS }) => {
      //   return userJS ?? {};
      // }),
      fileToJSON('./UserJS.json')
        .then((userJS) => {
          return userJS ?? {};
        })
        .catch(() => {
          return {};
        })
    ]);
    if (isEmpty(jsonRecords))
      throw new Error('"UserJS.json" not found + no "userJS" key in package.json');
    /**
     * @type { CFG }
     */
    // @ts-expect-error n/a
    const userJS = {};
    for (const r of jsonRecords) Object.assign(userJS, r);
    const isDev = isEmpty(JS_ENV) || JS_ENV === 'development';
    const buildUserJS = async () => {
      try {
        const i18n = userJS.build.paths.i18n;
        const i18nList = await loadLanguages(new URL(i18n.dir ?? JS_i18n, import.meta.url));
        const compileLanguage = (type = 'userjs_name') => {
          const resp = [];
          for (const [key, obj] of i18nList.entries()) {
            const value = obj[type];
            if (!value || isEmpty(value) || key.startsWith(i18n.default)) {
              continue;
            }
            const t = type.toLowerCase().replace('userjs_', '');
            if (type === 'userjs_name') {
              resp.push(`// @${t}:${key.replace('_', '-')}      ${isDev ? '[Dev] ' : ''}${value}`);
            } else {
              resp.push(`// @${t}:${key.replace('_', '-')}      ${value}`);
            }
          }
          return resp;
        };
        const compileData = () => {
          if (isDev && !isEmpty(dataMap)) {
            addTo('version', `// @version      ${+new Date()}`);
            return `// ==UserScript==\n${[...dataMap.values()].flat().join('\n')}\n// ==/UserScript==`;
          }
          for (const [k, v] of Object.entries(userJS)) {
            if (k === 'metadata') {
              const metaData = [];
              for (const [key, value] of Object.entries(v)) {
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
              addTo('metaData', metaData.join('\n'));
            }
            if (typeof v !== 'string') {
              continue;
            }
            if (k === 'name') {
              addTo(
                k,
                `// @${k}         ${isDev ? '[Dev] ' : ''}${v}`,
                ...compileLanguage('userjs_name')
              );
            } else if (k === 'description') {
              addTo(k, `// @${k}  ${v}`, ...compileLanguage('userjs_description'));
            } else if (k === 'author') {
              addTo(k, `// @${k}       ${v}`);
            } else if (k === 'icon') {
              if (v.startsWith('.') || v.startsWith('/')) {
                const buff = Buffer.from(fs.readFileSync(v));
                const base64data = buff.toString('base64');
                if (v.endsWith('.png')) {
                  addTo(k, `// @${k}         data:image/png;base64,${base64data}`);
                } else if (v.endsWith('.svg')) {
                  addTo(k, `// @${k}         data:image/svg+xml;base64,${base64data}`);
                }
              } else {
                addTo(k, `// @${k}         ${v}`);
              }
            } else if (k === 'downloadURL') {
              addTo(k, `// @downloadURL  ${v}`);
            } else if (k === 'updateURL') {
              addTo(k, `// @updateURL    ${v}`);
            } else if (k === 'url_source') {
              addTo(k, `// @url_source    ${v}`);
            } else if (k === 'url') {
              addTo(k, `// @downloadURL  ${v}`, `// @updateURL    ${v}`);
            } else if (k === 'version') {
              addTo(k, `// @${k}      ${isDev ? +new Date() : v}`);
            } else if (k === 'homepage') {
              addTo(k, `// @namespace    ${v}`, `// @homepageURL  ${v}`);
            } else if (k === 'bugs') {
              addTo(k, `// @supportURL   ${v}`);
            } else if (k === 'license') {
              addTo(k, `// @${k}      ${v}`);
            } else {
              addTo(k, v);
            }
          }
          return `// ==UserScript==\n${[...dataMap.values()].flat().join('\n')}\n// ==/UserScript==`;
        };
        const cfg = {
          nano: {
            /** @type {Record<PropertyKey, string> | string} */
            languageList: {},
            metadata: compileData()
          },
          path: {
            fileName: 'main-userjs',
            dir: './dist'
          },
          file: '',
          meta: '',
          metaPath: ''
        };
        for (const [k, v] of Object.entries(userJS.build.source)) {
          const str = v instanceof URL ? v.toString() : v;
          if (/\.s[ac]ss$/i.test(str)) {
            // @ts-expect-error n/a
            cfg.nano[k] = compile(str, {
              sourceMap: false,
              style: isDev ? 'expanded' : 'compressed'
            }).css;
            continue;
          }
          const f = await canAccess(v);
          if (typeof f !== 'string') continue;
          if (k === 'metadata') {
            cfg.meta = f;
          } else {
            // @ts-expect-error n/a
            cfg.nano[k] = f;
          }
        }
        if (!isEmpty(i18nList)) {
          for (const [k, obj] of i18nList.entries()) {
            const o = {};
            for (const [key, value] of Object.entries(obj)) {
              if (isEmpty(value) || /^ext[A-Z_]|^userjs_(name|description)/.test(key)) {
                continue;
              }
              // @ts-expect-error n/a
              o[key] = value;
            }
            // @ts-expect-error n/a
            cfg.nano.languageList[k] = o;
          }
        }
        for (const [k, v] of Object.entries(userJS.build.paths)) {
          if (isEmpty(v)) continue;
          if (isDev && /dev/i.test(k)) {
            for (const [key, value] of Object.entries(v)) {
              // @ts-expect-error n/a
              cfg.path[key] = value;
            }
          } else {
            // @ts-expect-error n/a
            cfg.path[k] = v;
          }
        }
        cfg.file = `${cfg.path.dir}/${cfg.path.fileName}.user.js`;
        cfg.metaPath = `${cfg.path.dir}/${cfg.path.fileName}.meta.js`;
        cfg.nano.languageList = JSON.stringify(cfg.nano.languageList, null, ' ');

        await writeUserJS(cfg.file, nano(cfg.meta, cfg.nano));
        log('UserJS File:', {
          path: cfg.file,
          time: toTime()
        });
        if (!isDev) {
          await writeUserJS(
            cfg.metaPath,
            nano(metadataTemplate, {
              metadata: cfg.nano.metadata
            })
          );
          log('UserJS Metadata:', {
            path: cfg.metaPath,
            time: toTime()
          });
        }
      } catch (ex) {
        err(ex);
      }
    };
    log(`Node ENV: ${JS_ENV}`);
    await buildUserJS();
    if (isDev) {
      const wp = new Watchpack();
      let changed = new Set();
      wp.watch({ files: userJS.build.watch.files, directories: userJS.build.watch.directories });
      // if (isEmpty(userJS.build.watch.files)) {
      //   wp.watch(userJS.build.watch.dirs);
      // } else {
      //   wp.watch(userJS.build.watch.files, userJS.build.watch.dirs);
      // }
      wp.on('change', (changedFile, mtime) => {
        if (mtime === null) {
          changed.delete(changedFile);
        } else {
          changed.add(changedFile);
        }
      });
      wp.on('aggregated', async () => {
        // Filter out files that start with a dot from detected changes
        // (as they are hidden files or temp files created by an editor).
        const changes = Array.from(changed).filter((filePath) => {
          return !path.basename(filePath).startsWith('.');
        });
        changed = new Set();

        if (changes.length === 0) {
          return;
        }

        await buildUserJS();
      });
    } else {
      process.exit(0);
    }
  } catch (ex) {
    err(ex);
  }
}

export { build };
export default build;
