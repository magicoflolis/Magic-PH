'use strict';
import './block-traffic.js';
import Config from './config.js';
import { mph } from './api.js';
const win = self ?? window;
win.MPH = Config;
let brws = (typeof browser=='undefined'?chrome:browser),
ogTitle = 'Magic PH',
messenger,
post = (msg ={}) => messenger.postMessage(msg);
function connected(p) {
  messenger = p;
  messenger.postMessage({cfg: Config.cachedLocalStorage});
  messenger.onMessage.addListener((r) => {
    mph.log('Background Script: received message from content script',r);
    if(r.delete) {
      Config.local.handler.deleteProperty(r.delete);
    };
    if(r.save) {
      mph.log('Background Script: saving...',r.save);
      if(r.params) {
        Config.local.handler.set(r.save,r.params);
        mph.log('Background Script: ',r.save,r.params);
      } else {
        Config.local.handler.set(r.save,Config.cachedLocalStorage[r.save]);
        mph.log('Background Script: ',Config.cachedLocalStorage[r.save]);
      };
    };
    if(r.download) {
      ogTitle = r.download.dlTitle;
      let q_err = '[Error] Not Found',q_240,q_480,q_720,q_1080,q_1440,q_2160,q_best,
      DownloadVideo = async (url,title = 'MagicPH') => {
        try {
          mph.info('Attempting to download...');
          let response;
          if(r.download.credentials) {
            response = await mph.fetchURL(url,'GET','basic', {
              credentials: r.download.credentials ?? 'include',
            })
          } else {
            response = await mph.fetchURL(url,'GET','basic')
          };
          let invalid_chars = {'\\': '＼', '\\/': '／', '\\|': '｜', '<': '＜', '>': '＞', ':': '：', '*': '＊', '?': '？', '"': '＂', '🔞': '', '#': ''},
          reader = response.body.getReader(),
          contentLength = +response.headers.get('Content-Length'),
          receivedLength = 0,
          content = '',
          chunks = [];
          content = title.replace(/[\\\\/\\|<>\\*\\?:#']/g, v => invalid_chars[v]);
          mph.info('Downloading...');
          // eslint-disable-next-line no-constant-condition
          while(true) {
            const {done, value} = await reader.read();
            if(done) {
              break;
            };
            receivedLength += value.length;
            let percentComplete = (receivedLength / contentLength) * 100;
            chunks.push(value);
            post({dlProgress: percentComplete.toFixed(2), dlTitle: ogTitle ?? 'MagicPH'});
            console.groupCollapsed('[%cMagicPH%c] %cProgress', 'color: rgb(255,153,0);', '', 'color: rgb(175, 24, 32);',`${percentComplete.toFixed(2)}%`);
            mph.table({DownloadProgress: `${percentComplete.toFixed(2)}%`, VideoTitle: content});
            console.groupEnd();
          };
          let Uint8Chunks = new Uint8Array(receivedLength), position = 0;
          for (let chunk of chunks) {
            Uint8Chunks.set(chunk, position);
            position += chunk.length;
          };
          let result = new Blob([Uint8Chunks], {type: 'video/mp4'}),
          dlBtn = mph.make('a','mph_Downloader');
          dlBtn.href = win.URL.createObjectURL(result);
          dlBtn.download = `${content}.mp4`;
          dlBtn.click();
          win.URL.revokeObjectURL(dlBtn.href);
          post({dlDone: 'Download Complete!', dlTitle: ogTitle ?? 'MagicPH'});
          mph.table({
            PageTitle: ogTitle ?? 'MagicPH',
            VideoTitle: content,
          });
          mph.table({
            VideoQualities: {
              q_240,
              q_480,
              q_720,
              q_1080,
              q_1440,
              q_2160,
              q_best,
            },
          });
          dlBtn.remove();
        } catch (e) {
          mph.err(e);
          post({dlDone: e, dlTitle: ogTitle ?? 'MagicPH'});
        }
      };
      try {
      for(let file of r.download.mediaFiles) {
        if(file.includes('onlyfans')) {
          DownloadVideo(file,r.download.title);
          break;
        };
        if(file.includes('get_media?s=') || file.includes('media/mp4?s=') || file.includes('youporn') || file.includes('tube8')) {
          mph.fetchURL(file,'GET','json').then((links) => {
            for(let item of links) {
              let q = item.quality.toLocaleString();
              (q.match(/240/gi)) ? (q_240 = item.videoUrl) :
              (q.match(/480/gi)) ? (q_480 = item.videoUrl) :
              (q.match(/720/gi)) ? (q_720 = item.videoUrl) :
              (q.match(/1080/gi)) ? (q_1080 = item.videoUrl) :
              (q.match(/1440/gi)) ? (q_1440 = item.videoUrl) :
              (q.match(/2160/gi)) ? (q_2160 = item.videoUrl) : q_err;
              q_best = q_2160 ?? q_1440 ?? q_1080 ?? q_720 ?? q_480 ?? q_240 ?? item.videoUrl;
            };
            if(!q_240 || q_240 === '') {q_240 = q_err};
            if(!q_480 || q_480 === '') {q_480 = q_err};
            if(!q_720 || q_720 === '') {q_720 = q_err};
            if(!q_1080 || q_1080 === '') {q_1080 = q_err};
            if(!q_1440 || q_1440 === '') {q_1440 = q_err};
            if(!q_2160 || q_2160 === '') {q_2160 = q_err};
            if(!q_best || q_best === '') {q_best = q_1080 || q_720};
            DownloadVideo(q_best,r.download.title);
          }).catch((e) => {
            mph.err(e);
            post({dlDone: e, dlTitle: ogTitle ?? 'MagicPH'});
          });
        } else {
          throw new Error(`Unable to locate video media file(s) [mediaFiles: ${r.download.mediaFiles}]`);
        };
      };
      } catch (e) {
        mph.err(e);
        post({dlDone: e, dlTitle: ogTitle ?? 'MagicPH'});
      }
    };
  });
};
/**
* [handleMessage description]
* @param  request      The message itself. This is a JSON-ifiable object.
* @param  sender       A runtime.MessageSender object representing the sender of the message.
* @param  sendResponse A function to call, at most once, to send a response to the message. The function takes a single argument, which may be any JSON-ifiable object. This argument is passed back to the message sender.
*/
// eslint-disable-next-line no-unused-vars
function handleMessage(request, sender, sendResponse) {
  mph.log('Background Script: handleMessage',sender);
  if(!sender.url.includes('options.html')) {
   return Promise.resolve({
     value: Config.cachedLocalStorage[request.name]
   });
  } else {
   Config.local.handler.set(request.name,request.value);
   return Promise.resolve({
    name: request.name,
    value: request.value
   });
  }
 };
brws.runtime.onConnect.addListener(connected);
brws.runtime.onMessage.addListener(handleMessage);
// function handleMessage(request, sender, sendResponse) {
//   mph.log('Background Script: handleMessage',sender);
//   mph.log(request, sender);
//   if(Config.cachedLocalStorage[request.name]) {
//    return Promise.resolve({
//      value: Config.cachedLocalStorage[request.name]
//    });
//   };
//   if(sender.url.includes('options.html')) {
//    Config.local.handler.set(request.name,request.value);
//    return Promise.resolve({
//     name: request.name,
//     value: request.value
//    });
//   };
//  };