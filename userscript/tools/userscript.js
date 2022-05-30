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
jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
watcher = watch('./src/main.js', { recursive: true }, (evt, name) => {
let header = readFileSync("./src/header.js").toString(),
mphCSS = readFileSync("../dist/css/downloader.css").toString(),
code = readFileSync("./src/main.js").toString(),
// code = transformFileSync("./src/main.js").code,
renderOut = (outFile, jshead) => {
  let ujs = nano(header, {
    jshead: jshead,
    mphCSS: mphCSS,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? log(err) : log(`Build-path: ${outFile}`);
  });
},
time = +new Date(),
jshead_common = `// @author       ${jsonData.author}
// @icon         https://github.com/magicoflolis/Magic-PH/raw/master/assets/magicph_logo.png
// @downloadURL  https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @updateURL    https://github.com/magicoflolis/Magic-PH/releases/latest/download/magicph.user.js
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues/new
// @namespace    ${jsonData.homepage}
// @homepageURL  ${jsonData.homepage}
// @license      GPL-3.0
// @include      *pornhub.com/view_video.php?viewkey=*
// @include      *pornhubpremium.com/view_video.php?viewkey=*
// @include      *youporn.com/watch/*
// @include      *youpornpremium.com/watch/*
// @include      *youporngay.com/watch/*
// @include      *youporngaypremium.com/watch/*
// @include      *redtube.com/*
// @include      *redtubepremium.com/*
// @include      *tube8.com/porn-video/*
// @include      *tube8premium.com/porn-video/*
// @include      *thumbzilla.com/video/*
// @include      *thumbzillapremium.com/video/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-idle
// @compatible   Chrome
// @compatible   Firefox
// ==/UserScript==`,
jshead_prod = `// ==UserScript==
// @name         ${jsonData.productName}
// @description  Best downloader for any PH Network site.
// @version      ${jsonData.version}
${jshead_common}`,
jshead_dev = `// ==UserScript==
// @name         [Dev] ${jsonData.productName}
// @description  Best downloader for any PH Network site.
// @version      ${time}
${jshead_common}`;
if(js_env){
  // Development version
  renderOut(p.dev, jshead_dev);
} else {
  // Release version
  renderOut(p.pub, jshead_prod);
}
});

log(`ENV: ${process.env.JS_ENV}`);

watcher.on('error', (err) => {
  log(err);
  watcher.close();
  delay(5000).then(() => watcher);
});