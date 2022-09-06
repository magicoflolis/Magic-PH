/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-env node */
// import { transformFileSync } from "@swc/core";
import { readFileSync, writeFile } from "fs";
import watch from 'node-watch';
const log = (...message) => {
  console.log('[%cNodeJS%c] %cDBG', 'color: rgb(0, 186, 124);', '', 'color: rgb(255, 212, 0);', `${[...message]} ${performance.now()}ms`)
},
delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
},
nano = (template, data) => {
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split("."),
    v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
},
p = {
  dev: "./dist/magicph.dev.user.js",
  pub: "./dist/magicph.user.js",
},
js_env = process.env.JS_ENV === 'development',
debugToggle = js_env ? true : false,
jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
watcher = watch('./src/main.js', { recursive: true }, (evt, name) => {
let header = readFileSync("./src/header.js").toString(),
mphCSS = readFileSync("../tests/compiled/downloader.css").toString(),
code = readFileSync("./src/main.js").toString(),
// code = transformFileSync("./src/main.js").code,
renderOut = (outFile, jshead) => {
  let ujs = nano(header, {
    jshead: jshead,
    mphCSS: mphCSS,
    debugToggle: debugToggle,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? log(err) : log(`Build-path: ${outFile}`);
  });
},
time = +new Date(),
jshead_common = `// ==UserScript==
// @name         ${js_env ? `[Dev] ${jsonData.productName}` : jsonData.productName}
// @description  ${jsonData.description}
// @author       ${jsonData.author}
// @version      ${js_env ? time : jsonData.version}
// @icon         https://github.com/magicoflolis/Magic-PH/raw/master/assets/magicph_logo.png
// @downloadURL  https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @updateURL    https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues/new
// @namespace    ${jsonData.homepage}
// @homepageURL  ${jsonData.homepage}
// @license      GPL-3.0
// @match        *://*.pornhub.com/view_video.php?viewkey=*
// @match        *://*.pornhubpremium.com/view_video.php?viewkey=*
// @match        *://*.youporn.com/watch/*
// @match        *://*.youpornpremium.com/watch/*
// @match        *://*.youporngay.com/watch/*
// @match        *://*.youporngaypremium.com/watch/*
// @match        *://*.redtube.com/*
// @match        *://*.redtubepremium.com/*
// @match        *://*.tube8.com/porn-video/*
// @match        *://*.tube8premium.com/porn-video/*
// @match        *://*.thumbzilla.com/video/*
// @match        *://*.thumbzillapremium.com/video/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM.xmlhttpRequest
// @grant        GM.setClipboard
// @run-at       document-idle
// @connect      *
// @noframes
// @compatible   Chrome
// @compatible   Firefox
// ==/UserScript==`;
if(js_env){
  // Development version
  renderOut(p.dev, jshead_common);
} else {
  // Release version
  renderOut(p.pub, jshead_common);
}
});

log(`ENV: ${process.env.JS_ENV}`);

watcher.on('error', (err) => {
  log(err);
  watcher.close();
  delay(5000).then(() => watcher);
});

// @run-at       document-idle