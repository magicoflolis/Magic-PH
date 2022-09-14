/* eslint-env node */
import { readFileSync, writeFile } from 'fs';
import watch from 'node-watch';
const log = (...msg) => console.log(`[NodeJS] DBG ${[...msg]} ${performance.now()}ms`),
delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
nano = (template, data) => {
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split('.'),
    v = data[keys.shift()];
    for(let i in keys.length) v = v[keys[i]];
    return typeof v !== 'undefined' && v !== null ? v : '';
  });
},
p = {
  dev: './dist/magicph.dev.user.js',
  pub: './dist/magicph.user.js',
},
js_env = process.env.JS_ENV === 'development',
jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
buildUserJS = (evt, name) => {
  let header = readFileSync('./src/header.js').toString(),
  mphCSS = readFileSync('../tests/compiled/downloader.css').toString(),
  code = readFileSync('./src/main.js').toString(),
  renderOut = (outFile, jshead) => {
    let ujs = nano(header, {
      jshead: jshead,
      mphCSS: mphCSS,
      debugToggle: js_env ? true : false,
      code: code,
    });
    writeFile(outFile, ujs, (err) => {
      return (err) ? log(err) : log(`Build-path: ${outFile}`);
    });
  },
  time = +new Date(),
  jshead_common = `// ==UserScript==
// @name         ${js_env ? `[Dev] ${jsonData.userJS.name}` : jsonData.userJS.name}
// @description  ${jsonData.description}
// @author       ${jsonData.author}
// @version      ${js_env ? time : jsonData.version}
// @icon         ${jsonData.userJS.icon}
// @downloadURL  ${jsonData.userJS.url}
// @updateURL    ${jsonData.userJS.url}
// @supportURL   ${jsonData.userJS.bugs}
// @namespace    ${jsonData.userJS.homepage}
// @homepageURL  ${jsonData.userJS.homepage}
// @license      ${jsonData.license}
// @connect      *
// @match        https://*.pornhub.com/view_video.php?viewkey=*
// @match        https://*.pornhubpremium.com/view_video.php?viewkey=*
// @match        https://*.youporn.com/watch/*
// @match        https://*.youpornpremium.com/watch/*
// @match        https://*.youporngay.com/watch/*
// @match        https://*.redtube.com/*
// @match        https://*.redtubepremium.com/*
// @match        https://*.tube8.com/porn-video/*
// @match        https://*.thumbzilla.com/video/*
// @match        https://onlyfans.com/*
// @grant        unsafeWindow
// @noframes
// @compatible   Chrome
// @compatible   Firefox
// @compatible   Opera
// @run-at       document-end
// ==/UserScript==`;
  if(js_env){
    // Development version
    renderOut(p.dev, jshead_common);
  } else {
    // Release version
    renderOut(p.pub, jshead_common);
  }
},
watcher = watch(['./src/','../tests/compiled/'], { delay: 2500, filter: /\.js$/ });

log(`ENV: ${process.env.JS_ENV}`);

watcher.on('change', buildUserJS);

watcher.on('error', (e) => {
  log('ERROR',e);
  watcher.close();
  delay(5000).then(() => {buildUserJS()});
});

watcher.on('ready', buildUserJS);

// @run-at       document-idle