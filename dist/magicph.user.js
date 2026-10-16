// ==UserScript==
// @version      5.1.1
// @name         MagicPH
// @description  A video downloader for various adult websites.
// @author       Magic <magicoflolis@tuta.io>
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues
// @namespace    https://github.com/magicoflolis/Magic-PH
// @homepageURL  https://github.com/magicoflolis/Magic-PH
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATHSURBVHhe7ZdPSD1VFMdHJSqohRCiLlJqFbZxET9QMCQEg5+JKIqLkEQRJFEoUFpU8CtNgkISsvzxUzMRdOHGnSAILgRx7cLCFomolCLmv9TbnDvn3rlz3/eNT1H7Pa8HPryZzzlz3rvnvbmOHscTH+EYT31kfOCDClygzQcmXAJKl4DSJaB0CShdAkqXgNIloHQJKF0CSpeAUjMyMiLM6OzsjOQLCgo4E8T6+nokf5Osra3xuwiYvyZQauwBbG5uRvJLS0ucCeLeD4DCzNtxmwO4JaDUoAFkZmbqvB1oAE1NTaKrq0u0t7eL4uLihDxBPdva2iQofxlZWVnyWnqfyspKWJMEKDXmAM7OzuRrfn6+ztthDqCiooJtNI6OjnQN0dDQwJkwioqK+Cj8xSW7BRYXF9lGw6yJAUqNOYC+vj75urOzI3Ozs7PyfGpqSr5SmANQcXBwIGpqasTq6iobIXJzc2VNRkYGmyDq6upkvRmqHxpAR0cHGyH3I/oVqNjd3dV1MUCpMQdgfljKHR4eyuPS0lL5SmEOYGZmRlxcXOhzQkVPT488HxgYYBP9xk5PT9nGD0DFysqKdubnUS4GKDXmAOhcRbLjZJtgb2+v2Nvb4yohuru7pVdxcnISqR8eHuZMuIi4AajzawClJtkAWlpa+Cj5AEpKSsT5+TlnomEPYH9/X19H1NfXc+Y5G8Dy8jKfBUHfKnkVaA+g26C/vz/i7AEcHx/r6wiqV6HcczEAe8ceHR2VXoUawPz8PJvoh1OhBqA2Rnuv2Nrakp5CubgB0H2vHEHXDw0NyX3L9AAoNfYACDNspwYwNzfHJqwpLCxkE26CeXl5bIT8wOSqq6vZBKGujxsA/YlWrrW1lW1YFwOUmusOwK5TQd80xcTEhK7b3t6WzgzzVlN1aAA5OTlsEoN6qLoYoNRMTk5yu/BNacdWoZwK+ukpNz09zTYIGubY2BifhdfatXR71NbW8llYt7GxwSZ6bXl5OdswFhYWIjUxQPm/Mzg4yEuJLvYWgPLOaG5u5mUK0djYqD09xakw628BKO8M+icoLsrKyuB1NwiUd0p2djYvNxpVVVWw/oaB0iWgdAkoxTuv+3/afrofPCrEa2SgFOLnxEbpDFojA6X/XJrYJJ1Ba2SghE3SGbRGBkrYJJ1Ba2SghE1S5dMKT3z2fpSeSk+MN3vilGqM2+vwh7DmH//Y7EN8+TjIdb2XmLsKaI0MlLBJqqB+Jh+Xh7V/fx/6v76L9iFeeTHM27mroHoAoIRNUgX1sxHDQe29HsBbuYb3f/ab34a50jcC784ArNybrwXnDwNwZQD//uiJDx+FufZ3A28O4DJUr+uA+jFQwiapgvrZoE3wMuz3uQqoHwMlbJIqqJ/i5Rc8cfY0rDUHcEDPB+NRXn0pzJvvcVVUDwCUsEmqqB5v5/vnvzK0oGc+1v8Yzm2CNg8DeBhAWP8wgPsygN+/8sT615748xucNznznw+olqBjO/9Hb5D77Uli7iqgNTJQwibpDFojAyVsks6gNTJQwibpDFojAyVsks6gNTJQimOwIaUrJ/7TJ1ojA6Xk88ee+OWj9OYLfw1obQZQugSULgGlS0DpEl6dJVziEx8Zz3xQwX1m3PM87z81jlb1rqWyAwAAAABJRU5ErkJggg==
// @downloadURL  https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.user.js
// @updateURL    https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.meta.js
// @license      MIT
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @connect     *
// @grant     GM_addElement
// @grant     GM_getValue
// @grant     GM_info
// @grant     GM_openInTab
// @grant     GM_registerMenuCommand
// @grant     GM_setClipboard
// @grant     GM_setValue
// @grant     GM_xmlhttpRequest
// @grant     GM.addElement
// @grant     GM.getValue
// @grant     GM.info
// @grant     GM.openInTab
// @grant     GM.registerMenuCommand
// @grant     GM.setClipboard
// @grant     GM.setValue
// @grant     GM.xmlHttpRequest
// @match     https://*.pornhub.com/*
// @match     https://*.pornhubpremium.com/*
// @match     https://*.youporn.com/*
// @match     https://*.youporngay.com/*
// @match     https://*.redtube.com/*
// @match     https://*.tube8.com/*
// @match     https://*.thumbzilla.com/*
// @match     https://onlyfans.com/*
// @match     https://*.xhamster.com/*
// @match     https://*.xnxx.com/*
// @match     https://*.xvideos.com/*
// @match     https://91porn.com/*
// @match     https://91porna.com/*
// @match     https://hqporner.com/*
// @match     https://spankbang.com/*
// @match     https://*.porntrex.com/*
// @match     https://*.analdin.com/*
// @match     https://sxyprn.com/*
// @match     https://www.porn00.org/*
// @match     https://www.eporner.com/*
// @match     https://www.youjizz.com/*
// @match     https://beeg.com/*
// @match     https://jable.tv/*
// @match     https://fs1.app/*
// @match     https://missav.ai/*
// @match     https://missav.com/*
// @match     https://missav.ws/*
// @noframes
// @run-at     document-start
// ==/UserScript==
(() => {
'use strict';
/******************************************************************************/

this.MagicJS ||= {};
if (this.MagicJS.userjs === true) return;
this.MagicJS.userjs = true;

if (typeof window === 'undefined') {
  return;
}

// The interface is only useful in the top frame
const inIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();
if (inIframe) return;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [source code](https://github.com/gorhill/uBlock/blob/68962453ff6eec7ff109615a738beb8699b9844a/platform/common/vapi.js#L35)
 */
if (
  !(
    ((document instanceof Document || document instanceof XMLDocument) && document.createElement('div') instanceof HTMLDivElement) &&
    /^text\/html|^application\/(xhtml|xml)/.test(document.contentType || '') === true
  )
) {
  console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', `MIME type is not a document, got "${document.contentType || ''}"`);
  return;
}

/** [i18n directory](https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales) */
const translations = {
 "en": {
  "userjs_autoinject": "Show the button on page load",
  "userjs_fullscreen": "Open maximized",
  "newTab": "New Tab",
  "newtab_hint": "Type or paste a video URL or ID in the address bar and press Enter.",
  "empty": "No videos found on this page.",
  "search_placeholder": "Filter videos",
  "search_settings": "Settings",
  "copy": "Copy",
  "copy_all": "Copy the URL of every video",
  "close": "Close",
  "download": "Download",
  "download_all": "Download every video",
  "remove": "Remove",
  "remove_all": "Remove every video",
  "open": "Open",
  "min": "Minimize",
  "max": "Maximize",
  "issue": "New issue",
  "settings": "Settings",
  "save": "Save",
  "reset": "Reset",
  "general": "General",
  "theme": "Theme",
  "import_export": "Import / Export",
  "import_config": "Import config",
  "export_config": "Export config",
  "clear_tab_cache": "Delete the videos of a tab when it is closed",
  "limit_downloads": "Download one video at a time",
  "auto_hls": "Build HLS videos automatically",
  "native_player": "Prefer native video player",
  "concurrency": "Simultaneous downloads",
  "dtime": "Time before the button fades",
  "hls_load": "Get from HLS stream",
  "free": "Free",
  "prev": "Previous",
  "next": "Next",
  "drm_notice": "DRM protected: there is nothing to play or download.",
  "position": "Button position",
  "auto": "Automatic",
  "video": "video",
  "videos": "videos",
  "photo": "photo",
  "photos": "photos",
  "gif": "GIF",
  "gifs": "GIFs",
  "audio": "audio",
  "audios": "audios",
  "message": "Message",
  "free_preview": "Free preview",
  "play_error": "The browser cannot play this video. Download it instead."
 }
};
/** [source code](https://github.com/magicoflolis/Magic-PH/tree/master/src/sass/_main.scss) */
const main_css = `mph-root{font-family:var(--mph-font-family, Arial, Helvetica, sans-serif);text-rendering:optimizeLegibility;word-break:normal;font-size:14px;line-height:1.35;color:var(--mph-text-color, hsl(210, 12%, 97%));text-align:start}mph-root,mph-root *{box-sizing:border-box}mph-root *{scrollbar-color:var(--mph-site-color, hsl(36, 100%, 50%)) hsl(224,14%,15%);scrollbar-width:thin}mph-root,mph-main,mph-toolbar,mph-header,mph-body,mph-list,mph-post,mph-tile,mph-viewer,mph-config,mph-section,mph-url,mph-empty,mph-elem,mu-js,tab-content,tab-host{display:block}.hidden{display:none !important}mph-column,mph-row,tab-root,.mph-sty-flex{display:flex}mph-column,mph-row{gap:.5em}.mph-icon{width:1em;height:1em;fill:currentcolor;flex:none;vertical-align:-0.125em}mph-a,mph-btn,tab-add,tab-close{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}mph-a,mph-btn{display:inline-flex;align-items:center;justify-content:center;gap:.3em;padding:.3em .7em;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:6px;background:var(--mph-background-color, hsl(0, 0%, 0%));color:var(--mph-site-color, hsl(36, 100%, 50%));font-weight:500;text-decoration:none;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}mph-a:hover,mph-a:focus-visible,mph-btn:hover,mph-btn:focus-visible{background:var(--mph-hover-color, hsl(36, 100%, 35%));color:var(--mph-text-color, hsl(210, 12%, 97%));outline:none}mph-a:focus-visible,mph-btn:focus-visible{box-shadow:0 0 0 2px var(--mph-site-color, hsl(36, 100%, 50%))}mph-a[data-busy],mph-btn[data-busy]{opacity:.6;pointer-events:none}mph-a[disabled],mph-btn[disabled]{opacity:.5;pointer-events:none}mph-frame{position:fixed;z-index:2147483647;bottom:var(--mph-position-bottom, 1rem);right:var(--mph-position-right, 1rem);top:var(--mph-position-top, auto);left:var(--mph-position-left, auto);display:flex;align-items:center;gap:.4em;padding:.55em .9em;border:2px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:1000px;background:var(--mph-background-color, hsl(0, 0%, 0%));color:var(--mph-site-color, hsl(36, 100%, 50%));font-size:16px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:opacity .25s ease}mph-frame:hover,mph-frame:focus-visible{background:var(--mph-hover-color, hsl(36, 100%, 35%));color:var(--mph-text-color, hsl(210, 12%, 97%));outline:none}mph-frame .mph-icon{width:1.3em;height:1.3em}count-frame{display:inline-block;min-width:1em;text-align:center;font-weight:700}mph-toast{display:none;position:fixed;z-index:100000000000000000;top:1em;left:50%;max-width:min(90vw,40em);padding:.6em 1.1em;transform:translateX(-50%);border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:1000px;background:var(--mph-background-color, hsl(0, 0%, 0%));color:var(--mph-site-color, hsl(36, 100%, 50%));font-weight:600;text-align:center;overflow-wrap:anywhere;pointer-events:none}mph-toast.show{display:block}mph-main{position:fixed;z-index:2147483647;right:1rem;bottom:1rem;width:min(780px,100vw - 2rem);height:min(492px,100vh - 2rem);flex-direction:column;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:16px;background:var(--mph-root-bg, hsla(0, 0%, 6%, 0.97));color:var(--mph-text-color, hsl(210, 12%, 97%));overflow:hidden}mph-main:not(.hidden){display:flex}mph-main.expanded{right:0;bottom:0;left:0;width:100%;height:100%;border-radius:0}@media screen and (max-width: 800px){mph-main{left:0;right:0;bottom:0;width:100%;height:min(72vh,100%);border-radius:16px 16px 0 0;padding-bottom:env(safe-area-inset-bottom, 0px)}mph-main.expanded{height:100%;border-radius:0}}@media screen and (max-height: 500px){mph-main{height:100%}}mph-root[data-side=left] mph-main:not(.expanded){right:auto;left:1rem}mph-toolbar{display:flex;justify-content:space-between;gap:.5em;padding:.5em;flex:none}mph-toolbar .btn-handles{order:999;flex:none}mph-toolbar tab-root{flex:1;min-width:0;order:0;flex-flow:row nowrap;gap:.5em;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:2px}mph-toolbar tab-root::-webkit-scrollbar{display:none;width:0;height:0}tab-content{display:flex;justify-content:space-between;gap:.5em;padding:.25em .5em;min-width:8em;max-width:min(16em,100% - 2.5em);flex:none;border:1px solid rgba(0,0,0,0);border-radius:4px;cursor:pointer;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}tab-content.active,tab-content:hover{background:hsla(0,0%,100%,.06);border-color:var(--mph-border-color, hsl(36, 100%, 50%))}tab-content tab-host{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}tab-content tab-close{flex:none;opacity:.7}tab-content tab-close:hover{opacity:1;color:var(--mph-site-color, hsl(36, 100%, 50%))}tab-add{position:-webkit-sticky;position:sticky;right:0;flex:none;background:var(--mph-root-bg, hsla(0, 0%, 6%, 0.97));order:999999;padding:0 .4em;font-size:20px;line-height:1.2;border-radius:4px}tab-add:hover{background:hsla(0,0%,100%,.06)}mph-header{display:flex;flex:none;align-items:center;gap:.5em;padding:.5em;background:var(--mph-header-bg, hsla(0, 0%, 0%, 0.35));border-top:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-bottom:1px solid var(--mph-border-color, hsl(36, 100%, 50%));flex-wrap:wrap}mph-header mph-url{flex:1 1 10em;min-width:0}mph-header .of-actions{flex:none}mph-column.btn-handles{align-items:center}.btn-handles mph-btn{padding:.3em .5em}input{font:inherit;color:var(--mph-text-color, hsl(210, 12%, 97%));background:rgba(0,0,0,.35);border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:6px;padding:.3em .6em;outline:none}input:focus{box-shadow:0 0 0 2px var(--mph-site-color, hsl(36, 100%, 50%))}input[type=checkbox]{display:none}.mph-url-bar{width:100%}mph-body{flex:1;min-height:0;overflow:auto;padding:.5em}mph-empty{padding:2em 1em;text-align:center;opacity:.8}.mph-footer{flex:none;flex-direction:column;max-height:25%;overflow:auto;padding:0 .5em}.mph-footer .error{display:block;margin:.25em 0;padding:.4em .6em;border-radius:6px;background:rgb(112.2,0,0);white-space:pre-wrap;overflow-wrap:anywhere;cursor:pointer}.mph-feed{display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 21em), 1fr));align-items:start;gap:.75em}.mph-feed.hidden{display:none}mph-post{display:flex;flex-direction:column;gap:.6em;justify-self:center;width:100%;max-width:34em;padding:.75em;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:14px;background:hsla(0,0%,100%,.06)}.post-head{align-items:center;gap:.75em}.post-head>mph-a{flex:none}.avatar{display:flex;flex:none;align-items:center;justify-content:center;width:2.6em;height:2.6em;overflow:hidden;border-radius:50%;background:var(--mph-accent, var(--mph-site-color, hsl(196, 100%, 47%)));color:#fff;font-weight:700}.avatar img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.avatar .mph-icon{width:1.2em;height:1.2em}.post-who{flex:1;min-width:0}.post-name{font-weight:700;overflow-wrap:anywhere}mph-post[data-variant=video]{max-width:60em}mph-post[data-variant=video] .post-name{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2}.post-handle{font-weight:400;opacity:.7}.post-meta{font-size:12px;opacity:.75}.post-meta:empty{display:none}.pill{flex:none;padding:.15em .75em;border-radius:1000px;background:var(--mph-accent, var(--mph-site-color, hsl(196, 100%, 47%)));color:#fff;font-weight:700}.pill.free{background:hsl(140,55%,33%)}.pill.muted{background:hsla(0,0%,100%,.06);color:var(--mph-text-color, hsl(210, 12%, 97%));font-weight:500}.post-text{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:4;white-space:pre-wrap;overflow-wrap:anywhere}.post-media{display:grid;grid-template-columns:repeat(2, 1fr);grid-gap:.5rem;overflow:hidden;border-radius:10px}.post-media mph-tile{aspect-ratio:16/9}.post-media[data-count="1"]{grid-template-columns:1fr}mph-post[data-variant=post] .post-media mph-tile{aspect-ratio:1}mph-post[data-variant=post] .post-media[data-count="1"] mph-tile{aspect-ratio:16/9}mph-post[data-variant=post] .post-media[data-count="2"]{grid-template-columns:1fr 1fr}mph-post[data-variant=post] .post-media[data-count="3"]{grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr}mph-post[data-variant=post] .post-media[data-count="3"] mph-tile:first-child{grid-row:span 2;aspect-ratio:auto}mph-tile{position:relative;overflow:hidden;background:hsl(0,0%,12%);min-height:5rem}mph-tile[data-command]{cursor:pointer}mph-tile[data-busy]{opacity:.7;pointer-events:none}mph-tile>img,mph-tile>video,mph-tile>.thumb-none{position:absolute;inset:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}mph-tile>video,mph-tile>.thumb-none{pointer-events:none}mph-tile>.thumb-none{display:flex;align-items:center;justify-content:center;opacity:.5}mph-tile>.thumb-none .mph-icon{width:2em;height:2em}mph-tile[data-type=video][data-command]::after{content:"";position:absolute;top:50%;left:50%;width:0;height:0;transform:translate(-35%, -50%);border-style:solid;border-width:.6em 0 .6em 1em;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) hsla(0,0%,100%,.9);-webkit-filter:drop-shadow(0 0 4px hsla(0, 0%, 0%, 0.6));filter:drop-shadow(0 0 4px hsla(0, 0%, 0%, 0.6));pointer-events:none}mph-tile .badge{position:absolute;bottom:.4em;left:.4em;z-index:1;display:flex;align-items:center;gap:.25em;padding:.1em .55em;border-radius:1000px;background:rgba(0,0,0,.7);color:#fff;font-size:12px;font-weight:600}mph-tile .badge.drm{background:hsl(0,80%,35%)}mph-tile .badge.top{top:.4em;bottom:auto}mph-tile .tile-actions{position:absolute;top:.35em;right:.35em;z-index:1;display:flex;gap:.25em;opacity:0;transition:opacity .15s ease}mph-tile:hover .tile-actions,mph-tile:focus-within .tile-actions{opacity:1}mph-tile .tile-btn{padding:.3em;border-color:rgba(0,0,0,0);background:rgba(0,0,0,.7);color:#fff}mph-viewer{position:fixed;z-index:2147483647;inset:0;display:flex;flex-direction:column;background:rgba(0,0,0,.94);color:#fff}mph-viewer.hidden{display:none !important}.viewer-bar{flex:none;align-items:center;padding:calc(.5em + env(safe-area-inset-top, 0px)) calc(.75em + env(safe-area-inset-right, 0px)) .5em calc(.75em + env(safe-area-inset-left, 0px))}.viewer-count{flex:none;opacity:.8}.viewer-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.viewer-wrap{position:relative;display:flex;flex:1;min-height:0}.viewer-stage{display:flex;flex:1;align-items:center;justify-content:center;min-width:0;padding:.25em}.viewer-stage video-player,.viewer-stage img,.viewer-stage video{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.viewer-stage audio{width:min(90%,32em)}.viewer-msg{max-width:28em;padding:1em;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:12px;text-align:center}.viewer-strip{display:flex;flex:none;gap:4px;overflow-x:auto;padding:.5em .5em calc(.5em + env(safe-area-inset-bottom, 0px));scrollbar-width:none;-ms-overflow-style:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.viewer-strip::-webkit-scrollbar{display:none;width:0;height:0}.viewer-strip.hidden{display:none}.viewer-strip .thumb{flex:none;width:56px;height:56px;border-radius:6px;opacity:.6;color:#fff;text-align:center;line-height:56px}.viewer-strip .thumb:first-child{margin-left:auto}.viewer-strip .thumb:last-child{margin-right:auto}.viewer-strip .thumb.active{opacity:1;outline:2px solid var(--mph-accent, var(--mph-site-color, hsl(196, 100%, 47%)))}.viewer-strip .thumb-label{position:absolute;right:0;bottom:0;left:0;background:rgba(0,0,0,.7);font-size:11px;line-height:1.6}mph-root[data-mobile] mph-a,mph-root[data-mobile] mph-btn{min-height:40px}mph-root[data-mobile] input,mph-root[data-mobile] select{font-size:16px}mph-root[data-mobile] mph-tile .tile-actions{opacity:1}mph-root[data-mobile] .btn-handles mph-btn{min-width:40px}select{font:inherit;color:var(--mph-text-color, hsl(210, 12%, 97%));background:rgba(0,0,0,.35);border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:6px;padding:.3em .6em}mph-config{display:flex;flex-direction:column;gap:.5em}mph-config.hidden{display:none}mph-section{display:flex;flex-direction:column;gap:.25em;padding:.5em;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:8px}mph-section>label{font-size:16px;font-weight:600;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}mph-section.collapsed>*:not(:first-child){display:none}.sub-section{display:flex;align-items:center;justify-content:space-between;gap:1em;padding:.2em .25em;overflow-wrap:anywhere}.sub-section input:not([type=checkbox]){width:14em;max-width:50%}mph-btn.sub-section{align-self:anchor-center}.mph-inlab{position:relative;flex:none;width:38px}.mph-inlab input[type=checkbox]{display:none}.mph-inlab input[type=checkbox]:checked+label{background:var(--mph-site-color, hsl(36, 100%, 50%))}.mph-inlab input[type=checkbox]:checked+label::before{right:0}.mph-inlab label{display:block;overflow:hidden;height:16px;padding:0;border:1px solid var(--mph-border-color, hsl(36, 100%, 50%));border-radius:20px;cursor:pointer}.mph-inlab label::before{content:"";display:block;position:absolute;top:0;right:20px;width:20px;height:20px;margin:-2px;border-radius:20px;background:var(--mph-text-color, hsl(210, 12%, 97%))}.mph-sty-flex{justify-content:space-evenly;flex-wrap:wrap;gap:.5em;padding:.5em 0}.mph-sty-flex mph-btn{padding:.4em 1.5em}.about mph-a{border-color:rgba(0,0,0,0);background:rgba(0,0,0,0);text-decoration:underline}.mph-invalid{border-color:red !important;box-shadow:0 0 0 2px red}@property --media-slider-fill{syntax:"<percentage>";inherits:true;initial-value:0%}@property --media-slider-buffer{syntax:"<percentage>";inherits:true;initial-value:0%}video-player,live-video-player,media-i18n,media-dialog,media-alert-dialog,media-error-dialog,media-controls{display:contents}media-container video,media-container [slot=poster]{width:100%;height:100%;display:block}media-container video::-webkit-media-text-track-container{z-index:1;scale:.98;translate:0 var(--media-caption-track-y, 0);-webkit-transition:translate var(--media-caption-track-duration, 0) ease-out;transition:translate var(--media-caption-track-duration, 0) ease-out;transition-delay:var(--media-caption-track-delay, 0);font-family:inherit}`;
/******************************************************************************/
/**
 * A tile: a quality of a video, a media of a video post
 * @typedef { import("../typings/types.d.ts").MediaItem & { el: Tile; } } MediaItem
 */

/**
 * A video found on a page, the input of `Library.addVideo`
 * @typedef { import("../typings/types.d.ts").VideoData } VideoData
 */

/**
 * The elements of a card
 * @typedef { import("../typings/types.d.ts").PostEntry & { el: Post; } } PostEntry
 */

/**
 * @typedef { import("../typings/types.d.ts").PostMedia } PostMedia
 */

/**
 * @typedef { import("../typings/types.d.ts").PostCard } PostCard
 */

/**
 * A tab
 * @typedef { import("../typings/types.d.ts").MediaGroup & { pane: List; } } MediaGroup
 */

/**
 * Events for `Toolbar`
 * @typedef { { "active": (tab: HTMLElement, build: boolean) => void; "close": (tab: HTMLElement) => void; "internal": (host: string | undefined, hostname: string) => void; } } tabEvents
 */

/**
 * Information about a supported website / page.
 * @typedef { import("../typings/types.d.ts").SiteInfo } SiteInfo
 */

/**
 * @typedef { import("../typings/types.d.ts").MPHConfig } MPHConfig
 */

//#region Console
/**
 * Prefixed `console` wrapper.
 *
 * Errors are also forwarded to {@link con.onError} (bound by the UI) so they can be shown to the user.
 */
class con extends null {
  static #title = '[%cMagic PH%c]';
  static #color = 'color: rgb(255,153,0);';
  /** @type {((...msg: unknown[]) => void) | null} */
  static onError = null;
  /**
   * @param {unknown[]} msg
   */
  static dbg(...msg) {
    const dt = new Date();
    console.debug(
      `${con.#title} %cDBG`,
      con.#color,
      '',
      'color: rgb(255, 212, 0);',
      `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
      ...msg
    );
  }
  /**
   * @param {unknown[]} msg
   */
  static err(...msg) {
    console.error(`${con.#title} %cERROR`, con.#color, '', 'color: rgb(249, 24, 128);', ...msg);
    try {
      if (typeof con.onError === 'function') con.onError(...msg);
    } catch {
      /* empty */
    }
  }
  /**
   * @param {unknown[]} msg
   */
  static info(...msg) {
    console.info(`${con.#title} %cINF`, con.#color, '', 'color: rgb(0, 186, 124);', ...msg);
  }
  /**
   * @param {unknown[]} msg
   */
  static log(...msg) {
    console.log(`${con.#title} %cLOG`, con.#color, '', 'color: rgb(219, 160, 73);', ...msg);
  }
}
//#endregion

//#region Placeholders
/**
 * @type {() => void}
 */
const BLANK_FN = function () {};
/**
 * @type {"about:blank"}
 */
const BLANK_PAGE = 'about:blank';
//#endregion
//#region Page
class Page extends null {
  /** @type {?URL} */
  static #url = null;
  /**
   * Location object of the window.
   * @returns {Location}
   */
  static get location() {
    return window.location;
  }
  /**
   * Location of the window.
   * @returns {URL}
   */
  static get url() {
    /** For some reason `window.location.href` isn't always the same as `location.href` */
    if (Page.#url == null) Page.#url = Page.toURL(Page.location.href);
    return Page.#url;
  }
  /**
   * @param {string | URL} url - A string or any other object with a {@link https://developer.mozilla.org/docs/Glossary/Stringifier Stringifier} that represents an absolute URL or a relative reference to a base URL.
   * @param {string | URL} [base] - A string representing the base URL to use in cases where `url` is a relative reference. If not specified, it defaults to `undefined`. Consider `location.origin`.
   * @returns {URL}
   */
  static toURL(url, base = Page.location.href) {
    if (base) {
      return new URL(url, base);
    }
    return new URL(url);
  }
  /**
   * @template {string[][] | Record<string, string> | string | URLSearchParams} I
   * @param {I} [init]
   * @returns {URLSearchParams}
   */
  static toSearchParams(init) {
    try {
      return new URLSearchParams(init);
    } catch {
      return new URLSearchParams(BLANK_PAGE);
    }
  }
}
const { url, toURL } = Page;
//#endregion
//#region Config
/**
 * User configuration, populated by {@link init}
 * @type { MPHConfig }
 */
let cfg;

/**
 * @type { MPHConfig }
 */
const DEFAULT_CONFIG = {
  autoinject: true,
  autoexpand: false,
  clearTabCache: true,
  limitDownloads: false,
  autoHLS: false,
  nativePlayer: false,
  position: 'auto',
  concurrency: 4,
  time: 10000,
  theme: {
    'mph-site-color': '',
    'mph-hover-color': '',
    'mph-background-color': '',
    'mph-border-color': '',
    'mph-text-color': '',
    'mph-root-bg': '',
    'mph-header-bg': '',
    'mph-font-family': '',
    'mph-position-top': '',
    'mph-position-bottom': '',
    'mph-position-left': '',
    'mph-position-right': ''
  }
};
/**
 * Keeps only known keys with the expected type, protects against corrupted storage / bad imports.
 * @template I
 * @template T
 * @param {I} input
 * @param {T} [defaults]
 * @returns {Partial<I> | Record<PropertyKey, unknown>}
 */
const sanitizeConfig = (input, defaults = DEFAULT_CONFIG) => {
  const out = {};
  if (isObj(input)) {
    for (const [key, def] of Object.entries(defaults)) {
      if (!(key in input)) continue;
      const value = input[key];
      if (isObj(def)) {
        out[key] = sanitizeConfig(value, def);
      } else if (typeof def === 'number') {
        if (typeof value === 'number' && Number.isFinite(value)) out[key] = value;
      } else if (typeof value === typeof def) {
        out[key] = value;
      }
    }
  }

  return out;
};
//#endregion
//#region Utilities
/**
 * @param {function} cb
 */
const defer = (cb) =>
  queueMicrotask(() => {
    try {
      cb();
    } catch (ex) {
      con.err(ex);
    }
  });
/**
 * @template {string} S
 * @param {S} str
 */
const getHostname = (str) => {
  if (typeof str === 'string') {
    return str
      .replace(/^www\./, '')
      .split('.')
      .splice(-2)
      .join('.')
      .replace(/\/|https:/g, '');
  }
  return '';
};
/**
 * Object to `[object *]`; tag: `[object RegExp]` gives `'RegExp'`
 * @template O
 * @param {O} obj
 * @returns {string}
 */
function objToStr(obj) {
  try {
    return Object.prototype.toString.call(obj).slice(8, -1);
  } catch {
    return '';
  }
}
/**
 * Parameter is `RegExp`
 * @template O
 * @param {O} obj
 * @returns {obj is RegExp}
 */
const isRegExp = (obj) => /RegExp/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Element | Node)}
 */
const isElem = (obj) => /Document|Element|HTML/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is Function}
 */
const isFN = (obj) => /Function/.test(objToStr(obj));
/**
 * @template O
 * @param {O} obj
 * @returns {obj is (Document | HTMLElement | Window)}
 */
const isHTML = (obj) => /Document|Element|HTML|Window/.test(objToStr(obj));
/**
 * Parameter is `JSON Object`
 * @template O
 * @param {O} obj
 * @returns { obj is Object ? obj : obj is (Record<PropertyKey, unknown> | Record<keyof O, O>) }
 */
const isObj = (obj) => /Object/.test(objToStr(obj));
/**
 * @type { typeof import("../typings/types.d.ts").toArray }
 */
function toArray(target, args, root) {
  /** Check if target is `null` or `undefined`, highest priority */
  if (target == null) return /** @type {any} */ ([]);
  const opts = Object.assign({}, args);
  /** Check if target is already an array, priority */
  if (Array.isArray(target)) {
    return /** @type {any} */ (target);
  }
  /** Check if target is a {@link Window} or {@link Document}, priority */
  if (target instanceof Window || target instanceof Document) return /** @type {[T]} */ ([target]);
  /** Check if target is any type of Element, priority */
  if (isHTML(target)) return /** @type {T[]} */ (Array.of(target));
  const method = /** @type {"entries" | "keys" | "values" | undefined} */ (
    ['entries', 'keys', 'values'].find((key) => key in opts || opts[key])
  );
  if (typeof target === 'string') {
    if (root instanceof Element || root instanceof Document) {
      return /** @type {Element[]} */ ([...root.querySelectorAll(target)]);
    } else if (method === 'keys' && typeof root === 'string') {
      return /** @type {string[]} */ (target.split(root));
    }
    return method === 'keys' ? /** @type {T[]} */ ([...target]) : /** @type {[T]} */ ([target]);
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
/**
 * Parameter is Empty
 * @template O
 * @param {O} obj
 */
const isEmpty = (obj) => isNull(obj) || isBlank(obj);
/**
 * @template O
 * @param {O} object
 * @returns {O}
 */
const copyObject = (object) => {
  try {
    return JSON.parse(JSON.stringify(object));
  } catch {
    return object;
  }
};
/**
 * Message of an unknown thrown value.
 * @param {unknown} ex
 */
const errMsg = (ex) => (ex instanceof Error ? ex.message : String(ex));
//#endregion
//#region i18n
class Language extends null {
  static #map = new Map(Object.entries(translations));
  /**
   * Returns the translation of `key`, falls back to English and finally to `key` itself.
   * @type { typeof import("../typings/UserJS.d.ts").i18n$ }
   */
  static i18n$(key) {
    try {
      const m = Language.#map;
      const current = m.get(Language.current);
      if (isObj(current) && key in current) return current[key];
      const en = m.get('en');
      if (isObj(en) && key in en) return en[key];
    } catch (e) {
      con.err(e);
    }
    return key;
  }
  /**
   * Best matching locale, `zh-TW` matches `zh_TW`, then `zh`, then `en`.
   */
  static get current() {
    const lang = String(navigator.language || 'en');
    const full = lang.replace('-', '_');
    const m = Language.#map;
    if (m.has(full)) return full;
    return lang.split('-').find((l) => m.has(l)) || 'en';
  }
}
const { i18n$ } = Language;
//#endregion
//#region More Utilities
/**
 * Userscript manager API wrapper.
 *
 * Supports both `GM.*` (Promise based) and legacy `GM_*` handles, falls back to plain web APIs when
 * running outside of a userscript manager (bookmarklet, console).
 */
class $GM extends null {
  static get isGM() {
    return typeof GM !== 'undefined';
  }
  /**
   * @returns {VMScriptGMInfoObject | Partial<VMScriptGMInfoObject>}
   */
  static get info() {
    if ($GM.isGM && isObj(GM.info)) return GM.info;
    if (typeof GM_info !== 'undefined' && isObj(GM_info)) return GM_info;
    return {
      script: {
        icon: '',
        name: 'Magic PH',
        namespace: 'https://github.com/magicoflolis/Magic-PH',
        updateURL: 'https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.user.js',
        version: 'Bookmarklet',
        bugs: 'https://github.com/magicoflolis/Magic-PH/issues'
      },
      version: 'Bookmarklet'
    };
  }
  static addElement() {
    /** @type { typeof GM_addElement } */
    const _ =
      ($GM.isGM && isFN(GM.addElement) && GM.addElement) ||
      (typeof GM_addElement !== 'undefined' && isFN(GM_addElement) && GM_addElement) ||
      BLANK_FN;
    return _(...arguments);
  }
  /**
   * @param {string} link
   */
  static openInTab(link) {
    try {
      if ($GM.isGM && isFN(GM.openInTab)) {
        return GM.openInTab(link, { active: true, insert: true });
      }
      if (typeof GM_openInTab !== 'undefined' && isFN(GM_openInTab)) {
        return GM_openInTab(link, { active: true, insert: true });
      }
    } catch (ex) {
      con.err(ex);
    }
    return window.open(link, '_blank', 'noopener,noreferrer');
  }
  static async setValue() {
    /** @type { typeof GM.setValue | typeof GM_setValue } */
    const _ =
      ($GM.isGM && isFN(GM.setValue) && GM.setValue) ||
      (typeof GM_setValue !== 'undefined' && isFN(GM_setValue) && GM_setValue) ||
      BLANK_FN;
    _(...arguments);
  }
  /**
   * @template D
   * @param {string} key
   * @param {D} [def]
   * @returns {Promise<D | undefined>}
   */
  static async getValue(key, def) {
    if ($GM.isGM && isFN(GM.getValue)) return GM.getValue(key, def);
    if (typeof GM_getValue !== 'undefined' && isFN(GM_getValue)) return GM_getValue(key, def);
    return def;
  }
  /**
   * @param {string} text
   * @param {() => void} command
   */
  static registerMenuCommand(text, command) {
    try {
      if ($GM.isGM && isFN(GM.registerMenuCommand)) {
        return GM.registerMenuCommand(text, command);
      }
      if (typeof GM_registerMenuCommand !== 'undefined' && isFN(GM_registerMenuCommand)) {
        return GM_registerMenuCommand(text, command);
      }
    } catch (ex) {
      con.err(ex);
    }
    return undefined;
  }
  /**
   * @param {string} text
   * @param {string} [type]
   * @returns {Promise<boolean>}
   */
  static async setClipboard(text, type = 'text') {
    try {
      if ($GM.isGM && isFN(GM.setClipboard)) {
        GM.setClipboard(text, type);
        return true;
      }
      if (typeof GM_setClipboard !== 'undefined' && isFN(GM_setClipboard)) {
        GM_setClipboard(text, type);
        return true;
      }
    } catch (ex) {
      con.err(ex);
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
  static async xmlHttpRequest() {
    const _ =
      ($GM.isGM && isFN(GM.xmlHttpRequest) && GM.xmlHttpRequest) ||
      (typeof GM_xmlhttpRequest !== 'undefined' && isFN(GM_xmlhttpRequest) && GM_xmlhttpRequest) ||
      /**
       * @template {string | Blob | ArrayBuffer | Document | object} T
       * @param {VMScriptGMXHRDetails<T>} details
       */
      function (details) {
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          let method = 'GET';
          let url = BLANK_PAGE;
          let body;
          for (const [key, value] of toArray(details, { entries: true })) {
            if (isFN(value)) {
              const [, k] = /^on(\w+)/g.exec(key) || [];
              if (k) {
                if (/progress/i.test(k)) {
                  req.addEventListener(k, value);
                } else {
                  req.addEventListener(k, (evt) => {
                    value(evt);
                    if (/error|abort/.test(k)) {
                      reject(evt);
                    } else {
                      resolve(evt);
                    }
                  });
                }
              }
            } else if (typeof value === 'string') {
              if (key === 'responseType') {
                req.responseType = /buffer/i.test(value) ? 'arraybuffer' : value;
              } else if (key === 'method') {
                method = value;
              } else if (key === 'url') {
                url = value;
              }
            } else if (value instanceof URL) {
              url = value;
            } else if (key === 'body') {
              body = value;
            }
          }
          req.open(method, url);
          if (isEmpty(req.responseType)) {
            req.responseType = 'text';
          }
          if (body) {
            req.send(body);
          } else {
            req.send();
          }
        });
      };
    return /** @type { typeof GM.xmlHttpRequest } */ (_(...arguments));
  }
}
const isMobile = (() => {
  const { userAgent = '', userAgentData = {} } = navigator;
  const { platform = '', mobile = false } = Object(userAgentData);
  return (
    /Mobile|Tablet/.test(String(userAgent)) ||
    Boolean(mobile) ||
    /Android|Apple/.test(String(platform))
  );
})();
/**
 * @type { import("../typings/types.d.ts").groupBy }
 */
const groupBy = (items, keySelector) => {
  if ('groupBy' in Object) return Object.groupBy(items, keySelector);
  /** [Object.groupBy polyfill](https://gist.github.com/gtrabanco/7c97bd41aa74af974fa935bfb5044b6e) */
  return items.reduce((acc = {}, ...args) => {
    const key = keySelector(...args);
    acc[key] ??= [];
    acc[key].push(args[0]);
    return acc;
  }, {});
};
/**
 * @type { import("../typings/types.d.ts").qs }
 */
const qs = (selector, root = document) => root.querySelector(selector);
/**
 * @type { import("../typings/types.d.ts").qsA }
 */
const qsA = (selectors, root = document) => root.querySelectorAll(selectors);
/**
 * @param {HTMLElement} elem - HTMLElement
 * @param {unknown} str - Class string(s)
 */
function addClass(elem, str) {
  /** @type {string[]} */
  const arr = (Array.isArray(str) ? str : typeof str === 'string' ? str.split(' ') : []).filter(
    (s) => typeof s === 'string' && !isBlank(s)
  );
  if (!isBlank(arr)) elem.classList.add(...arr);
}
/**
 * @template {HTMLElement} E
 * @param {?E} elem
 * @param {Record<keyof E, E>} attr
 */
function formAttrs(elem, attr) {
  if (elem != null && isObj(attr)) {
    for (const [key, value] of Object.entries(attr)) {
      if (value == null) {
        continue;
      } else if (isObj(value)) {
        formAttrs(elem[key], value);
      } else if (isFN(value)) {
        if (/^on/.test(key)) {
          elem[key] = value;
        } else {
          elem.addEventListener(key, value);
        }
      } else if (/^class/i.test(key)) {
        addClass(elem, value);
      } else if (typeof value === 'number' && Number.isFinite(value)) {
        elem[key] = value;
      } else if (
        elem.tagName === 'A' &&
        typeof value === 'string' &&
        /^(download|type)/i.test(key)
      ) {
        elem.setAttribute(key, value);
      } else {
        elem[key] = value;
      }
    }
  }
  return elem;
}
/**
 * @type { typeof import("../typings/types.d.ts").make }
 */
const make = (tagName, ...attributes) => {
  /** @type {Element} */
  const el = document.createElement(tagName);
  for (let i = 0; i < attributes.length; i++) {
    const _attr = attributes[i];
    if (i === 0) {
      addClass(el, _attr);
    } else if (i === 1 && typeof _attr === 'string' && !isEmpty(_attr)) {
      el.textContent = _attr;
      continue;
    }
    formAttrs(el, _attr);
  }
  return el;
};
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options) => {
  const opts = typeof options === 'object' && options !== null ? options : { capture: !!options };
  for (const elem of toArray(el).filter(isHTML)) {
    elem.addEventListener(type, listener, opts);
  }
};
/**
 * Polls `fn` until it returns a truthy value.
 *
 * Never rejects and never spins forever, resolves `null` once `timeout` (ms) is exceeded.
 * Timer based on purpose, `requestAnimationFrame` is paused in background tabs.
 * @template T
 * @param {() => T} fn
 * @param {number} [timeout] - `0` waits forever
 * @param {number} [interval]
 * @returns {Promise<T | null>}
 */
const waitFor = (fn, timeout = 30000, interval = 100) =>
  new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      let value;
      try {
        value = fn();
      } catch {
        value = null;
      }
      if (value) {
        resolve(value);
      } else if (timeout > 0 && Date.now() - start >= timeout) {
        resolve(null);
      } else {
        setTimeout(tick, interval);
      }
    };
    tick();
  });
/**
 * Waits for `selector` to exist.
 * @param {string} selector
 * @param {ParentNode} [root]
 * @param {number} [timeout] - ms, `0` waits forever
 * @returns {Promise<Element | null>}
 */
const query = (selector, root = document, timeout = 60000) =>
  new Promise((resolve) => {
    const found = root.querySelector(selector);
    if (found) return resolve(found);
    let timer;
    const mo = new MutationObserver(() => {
      const el = root.querySelector(selector);
      if (!el) return;
      mo.disconnect();
      clearTimeout(timer);
      resolve(el);
    });
    mo.observe(root?.documentElement ?? root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class']
    });
    if (timeout > 0) {
      timer = setTimeout(() => {
        mo.disconnect();
        resolve(null);
      }, timeout);
    }
  });
/**
 * @param {number} duration - Seconds
 * @returns {string} `1:01`, `4:03:59`, `123:03:59`
 */
const fancyTimeFormat = (duration) => {
  const total = Math.max(0, Math.floor(Number(duration) || 0));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return `${hrs > 0 ? `${hrs}:${mins < 10 ? '0' : ''}` : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
/**
 * Seconds of a duration: `754`, `"754"`, `"12:34"` or an ISO 8601 duration (`"PT12M34S"`).
 * @param {unknown} value
 * @returns {number} `0` when unknown
 */
const toSeconds = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  const str = String(value ?? '').trim();
  if (/^\d+(?:\.\d+)?$/.test(str)) return Math.floor(Number(str));
  if (/^\d+(?::\d+){1,2}$/.test(str)) {
    return str.split(':').reduce((total, part) => total * 60 + Number(part), 0);
  }
  const [, d = 0, h = 0, m = 0, sec = 0] =
    /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i.exec(str) ?? [];
  return Math.floor(Number(d) * 86400 + Number(h) * 3600 + Number(m) * 60 + Number(sec));
};
/**
 * Makes `str` safe to use as a filename on Windows / macOS / Linux.
 * @param {unknown} str
 * @param {string} [fallback]
 */
const sanitizeFilename = (str, fallback = 'MagicPH') => {
  /** @type {Record<string, string>} */
  const invalid = {
    '\\': '＼',
    '/': '／',
    '|': '｜',
    '<': '＜',
    '>': '＞',
    ':': '：',
    '*': '＊',
    '?': '？',
    '"': '＂',
    '#': '',
    '🔞': ''
  };
  const name = String(str ?? '')
    .replace(/[\\/|<>:*?"#]|🔞/g, (v) => invalid[v] ?? '')
    .replace(/\p{Cc}/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s.]+|[\s.]+$/g, '')
    .slice(0, 150)
    .trim();
  return name || fallback;
};
/**
 * Trusted Types policy owned by this script, `null` if unsupported or refused by the page's CSP.
 *
 * A private policy is used instead of installing a pass-through `default` policy on the website.
 */
const ttPolicy = (() => {
  const policy = {
    /**
     * @template {string} T
     * @param {T} s
     */
    createHTML: (s) => s
  };
  try {
    if (typeof window.trustedTypes !== 'undefined') {
      return window.trustedTypes.createPolicy('magicph', policy);
    }
  } catch {
    /* CSP `trusted-types` does not allow the policy name */
  }
  return policy;
})();
/**
 * Parses an HTML string into an inert document (no scripts run, no resources load).
 * @param {string} html
 * @returns {Document}
 */
const parseHTML = (html) => {
  const str = String(html);
  return new DOMParser().parseFromString(
    /** @type {string} */ (ttPolicy.createHTML(str)),
    'text/html'
  );
};
/**
 * Plain text of an HTML fragment.
 * @param {unknown} html
 */
const htmlToText = (html) => {
  try {
    return (parseHTML(String(html ?? '')).body.textContent ?? '').replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
};
/**
 * Saves `blob` to disk.
 * @param {Blob} blob
 * @param {string} filename
 */
const saveAs = (blob, filename) => {
  if (!blob) return;
  const href = URL.createObjectURL(blob);
  const a = make('a', {
    href,
    download: filename,
    rel: 'noopener',
    style: 'display: none;'
  });
  (document.body || document.documentElement).append(a);
  a.click();
  a.remove();
  // Revoking immediately can cancel the download (Firefox)
  setTimeout(() => URL.revokeObjectURL(href), 60000);
};
/**
 * Runs `worker` for every item with at most `limit` in flight, result order is preserved.
 * @template T, R
 * @param {T[]} items
 * @param {number} limit
 * @param {(item: T, index: number) => Promise<R>} worker
 * @returns {Promise<R[]>}
 */
const runPool = async (items, limit, worker) => {
  /** @type {R[]} */
  const results = new Array(items.length);
  let next = 0;
  const lane = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  };
  const lanes = Math.max(1, Math.min(Math.floor(limit) || 1, items.length));
  await Promise.all(Array.from({ length: lanes }, lane));
  return results;
};
/**
 * Resolution of a video url: `720p.mp4`, `720P_4000K_1.mp4`, `720p.h264.mp4`, `720.mp4`.
 * The query is ignored, signed urls contain random characters.
 * @param {string} src
 */
const resolutionOf = (src) => {
  const path = src.split('?')[0];
  return +(
    /(\d{3,4})p(?=[._]|$)/i.exec(path.split('/').pop() ?? '')?.[1] ??
    /\d+(?=P|p\.)/.exec(path)?.[0] ??
    /\/(\d{3,4})\.(?:mp4|webm)$/.exec(path)?.[1] ??
    0
  );
};
/**
 * Sorts `hlsByQuality` best-first into a playlist array, only when its best quality actually beats
 * `files`' best (or there are no files) -- otherwise HLS adds nothing worth offering.
 * @param {Array<string | { src: string }>} files
 * @param {Map<number, string>} hlsByQuality
 * @returns {{ ts: string[]; preferHLS: boolean }}
 */
const pickHLS = (files, hlsByQuality) => {
  if (!Array.isArray(files)) {
    files = Array.from(files);
  }
  if (!(hlsByQuality instanceof Map) || !hlsByQuality.size) return { ts: [], preferHLS: false };
  const bestFile = Math.max(
    0,
    ...files.map((f) =>
      typeof f === 'string' ? resolutionOf(f) : parseInt(f.label, 10) || resolutionOf(f.src)
    )
  );
  const bestHls = Math.max(...hlsByQuality.keys());
  if (bestHls <= bestFile && files.length) return { ts: [], preferHLS: false };
  const ts = Array.from(hlsByQuality)
    .sort((a, b) => b[1] - a[1])
    .map((i) => i[1]);
  return { ts, preferHLS: true };
};
/**
 * First balanced `{...}` or `[...]` of `txt` (from `from`), `window.initials={...};` -> object.
 * @param {string} txt
 * @param {number} [from]
 * @returns {unknown}
 */
const extractJSON = (txt, from = 0) => {
  const start = txt.slice(from).search(/[{[]/) + from;
  let depth = 0;
  let quoted = false;
  for (let i = start; i >= from && i < txt.length; i++) {
    const c = txt[i];
    if (quoted) {
      if (c === '\\') i++;
      else if (c === '"') quoted = false;
    } else if (c === '"') {
      quoted = true;
    } else if (c === '{' || c === '[') {
      depth++;
    } else if ((c === '}' || c === ']') && --depth === 0) {
      return JSON.parse(txt.slice(start, i + 1));
    }
  }
  throw new SyntaxError('No JSON found');
};
/**
 * Absolute address of `ref`.
 * @param {string} ref
 * @param {string | URL} base
 * @returns {string} Empty when `ref` is not an address
 */
const absURL = (ref, base) => {
  try {
    return ref ? toURL(ref, base).href : '';
  } catch {
    return '';
  }
};
/**
 * JSON-LD objects of a page.
 * @param {Document} doc
 * @returns {Array<Record<string, unknown>>}
 */
const ldNodes = (doc) => {
  /** @type {Array<Record<string, unknown>>} */
  const nodes = [];
  for (const node of qsA('script[type="application/ld+json"]', doc)) {
    try {
      const json = JSON.parse(node.textContent ?? '');
      nodes.push(...[].concat(json?.['@graph'] ?? json).filter(isObj));
    } catch {
      /* not JSON */
    }
  }
  return nodes;
};
/**
 * Title, thumbnail and duration a page announces to search engines and social networks (JSON-LD, Open Graph).
 * @param {Document} doc
 * @param {string | URL} base - Address of the page, thumbnails may be relative
 * @returns {{ title?: string; poster?: string; duration: number }}
 */
const readMeta = (doc, base) => {
  /** @param {string} selector */
  const meta = (selector) => qs(selector, doc)?.getAttribute('content')?.trim() || undefined;
  const video = ldNodes(doc).find((n) => /VideoObject/.test(String([].concat(n['@type']))));
  const thumb = [].concat(video?.thumbnailUrl ?? []).find((t) => typeof t === 'string' || t?.url);
  const poster =
    (typeof thumb === 'string' ? thumb : thumb?.url) ||
    meta('meta[property="og:image"]') ||
    meta('meta[name="twitter:image"]') ||
    qs('link[rel="image_src"]', doc)?.getAttribute('href');
  return {
    title:
      (video?.name && htmlToText(video.name)) || meta('meta[property="og:title"]') || undefined,
    poster: poster ? absURL(poster, base) || undefined : undefined,
    duration: toSeconds(
      video?.duration ||
        meta('meta[property="og:video:duration"]') ||
        meta('meta[property="video:duration"]') ||
        meta('meta[property="og:duration"]') ||
        meta('meta[itemprop="duration"]')
    )
  };
};
//#endregion
//#region DOM helpers
class dom extends null {
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @returns {E[]}
   */
  static HTML(target) {
    return toArray(target).filter(isHTML);
  }
  /**
   * @template {HTMLElement} E
   * @template V
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   * @param {keyof E} prop
   * @param {V} [value=undefined]
   */
  static prop(target, prop, value = undefined) {
    const t = dom.HTML(target);
    if (value == null) {
      return t.find((elem) => elem[prop]);
    }
    for (const elem of t) {
      elem[prop] = value;
    }
  }
  /**
   * @template {HTMLElement} E
   * @param {E | E[] | Set<E> | NodeListOf<E>} target
   */
  static remove(target) {
    for (const elem of dom.HTML(target)) elem.remove();
    return dom;
  }
  static get cl() {
    return {
      /**
       * @template {HTMLElement} E
       * @template {string} T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      add(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        for (const elem of dom.HTML(target)) elem.classList.add(..._token);
        return dom.cl;
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T | T[]} token
       */
      remove(target, token) {
        /** @type {string[]} */
        const _token = toArray(token, { keys: true }, ' ');
        for (const elem of dom.HTML(target)) elem.classList.remove(..._token);
        return dom.cl;
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       * @param {boolean} [force]
       */
      toggle(target, token, force) {
        let r;
        for (const elem of dom.HTML(target)) {
          r = elem.classList.toggle(String(token), force);
        }
        return r;
      },
      /**
       * @template {HTMLElement} E
       * @template T
       * @param {E | E[] | Set<E> | NodeListOf<E>} target
       * @param {T} token
       */
      has(target, token) {
        return dom.HTML(target).some((elem) => elem.classList.contains(String(token)));
      }
    };
  }
}
class Timeout {
  /**
   * @type {number[]}
   */
  ids = [];
  /**
   * @param {number} delay
   * @returns {Promise<void>}
   */
  set(delay) {
    return new Promise((resolve) => {
      /** @type {number} */
      const id = setTimeout(() => {
        this.clear(id);
        resolve();
      }, delay);
      this.ids.push(id);
    });
  }
  /**
   * @param {...number} ids
   */
  clear(...ids) {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
    return this;
  }
  /**
   * Clears every pending timeout.
   */
  clearAll() {
    return this.clear(...this.ids);
  }
}
//#region Icon SVGs
/**
 * Icons are described as data and built with `createElementNS`, no HTML parsing (`innerHTML`)
 * is involved, so they work on pages that enforce Trusted Types.
 */
class IconSVG extends null {
  static NS = 'http://www.w3.org/2000/svg';
  /**
   * @type { { [key: string]: { viewBox: string; fill?: string; stroke?: string; nodes: [string, Record<string, string>][] } } }
   */
  static type = {
    _: {
      viewBox: '0 0 0 0',
      nodes: []
    },
    close: {
      viewBox: '0 0 384 512',
      nodes: [
        [
          'path',
          {
            d: 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
          }
        ]
      ]
    },
    collapse: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z'
          }
        ]
      ]
    },
    download: {
      viewBox: '0 0 384 512',
      nodes: [
        [
          'path',
          {
            d: 'M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z'
          }
        ]
      ]
    },
    expand: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z'
          }
        ]
      ]
    },
    gear: {
      viewBox: '0 0 512 512',
      nodes: [
        [
          'path',
          {
            d: 'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z'
          }
        ]
      ]
    },
    minus: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z'
          }
        ]
      ]
    },
    copy: {
      viewBox: '0 0 448 512',
      nodes: [
        [
          'path',
          {
            d: 'M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z'
          }
        ]
      ]
    },
    open: {
      viewBox: '0 0 512 512',
      nodes: [
        [
          'path',
          {
            d: 'M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z'
          }
        ]
      ]
    },
    video: {
      viewBox: '0 0 576 512',
      nodes: [
        [
          'path',
          {
            d: 'M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z'
          }
        ]
      ]
    },
    remove: {
      viewBox: '0 0 16 16',
      nodes: [
        [
          'path',
          {
            d: 'M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z'
          }
        ]
      ]
    }
  };
  /**
   * @param {keyof typeof IconSVG["type"]} key
   * @param {HTMLElement} [container] - Element to append to
   * @returns {SVGSVGElement}
   */
  static load(key, container) {
    if (!(key in IconSVG.type)) {
      key = '_';
    }
    const sel = IconSVG.type[key];
    const svgElem = document.createElementNS(IconSVG.NS, 'svg');
    svgElem.setAttribute('viewBox', sel.viewBox);
    svgElem.setAttribute('aria-hidden', 'true');
    svgElem.setAttribute('class', 'mph-icon magicph-icon');
    svgElem.dataset.icon = String(key);
    if (sel.fill) svgElem.setAttribute('fill', sel.fill);
    if (sel.stroke) svgElem.setAttribute('stroke', sel.stroke);
    for (const [tag, attrs] of sel.nodes) {
      const node = document.createElementNS(IconSVG.NS, tag);
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
      svgElem.append(node);
    }
    if (container) container.append(svgElem);
    return svgElem;
  }
}
//#endregion
/**
 * `localStorage` wrapper, only used when no userscript manager is available.
 *
 * Every access is guarded, `localStorage` throws on sandboxed frames / blocked cookies.
 */
class jsStorage extends null {
  static prefix = 'MPH';
  /**
   * @returns {Storage | null}
   */
  static get #store() {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
  /**
   * @param {string} key
   */
  static getItem(key) {
    try {
      return jsStorage.#store?.getItem(`${jsStorage.prefix}-${key}`) ?? null;
    } catch {
      return null;
    }
  }
  /**
   * @param {string} key
   * @param {string} value
   */
  static setItem(key, value) {
    try {
      jsStorage.#store?.setItem(`${jsStorage.prefix}-${key}`, value);
    } catch (ex) {
      con.err(ex);
    }
    return jsStorage;
  }
  /**
   * @param {string} key
   * @param {unknown} v
   */
  static async setValue(key, v) {
    if (v !== undefined) {
      const str = typeof v === 'string' ? v : JSON.stringify(v);
      if ($GM.isGM) {
        await $GM.setValue(key, str);
      } else {
        jsStorage.setItem(key, str);
      }
    }
    return jsStorage;
  }
  /**
   * @template D
   * @param {string} key
   * @param {D} def
   * @returns {Promise<D>}
   */
  static async getValue(key, def) {
    try {
      const _def = Object.assign({}, def);
      /**
       * @param {unknown} s
       */
      const parse = (s) => {
        if (typeof s === 'string') {
          try {
            const p = JSON.parse(s);
            if (isObj(p) && !isEmpty(p)) return p;
          } catch {
            /* empty */
          }
        } else if (isObj(s) && !isEmpty(s)) {
          return s;
        }
        return _def;
      };
      const store = $GM.isGM
        ? await $GM.getValue(key, JSON.stringify(_def))
        : jsStorage.getItem(key);
      return /** @type {D} */ (parse(store));
    } catch (ex) {
      con.err(ex);
      return def;
    }
  }
}
//#endregion
//#region Network
class Network extends null {
  static sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  /**
   * @template {string | Request | URL} R
   * @template {string | object | Document | ArrayBuffer | Blob} T
   * @param {R} requestURL
   * @param {string} method
   * @param {VMScriptResponseType} responseType
   * @param {VMScriptGMXHRDetails<T> | RequestInit} data
   * @param {boolean} useFetch
   * @returns {Promise<T>}
   */
  static req(requestURL, method = 'GET', responseType = 'json', data, useFetch = false) {
    const params = Object.assign({}, data);
    if (typeof method === 'string') {
      params.method = method.toUpperCase().replaceAll(/\W/g, '');
    }
    if (typeof responseType === 'string') {
      responseType = responseType.toLowerCase().replaceAll(/\W/g, '');
    }
    if (params.credentials && $GM.isGM && !useFetch) {
      params.anonymous = Object.is(params.credentials, 'omit');
      delete params.credentials;
    } else if (params.onprogress) {
      delete params.onprogress;
    }
    return new Promise((resolve, reject) => {
      if (useFetch) {
        const _request =
          requestURL instanceof Request ? requestURL : new Request(requestURL, params);
        fetch(_request)
          .then((resp) => {
            if (resp.ok) {
              if (/array|buffer/i.test(responseType)) {
                resolve(resp.arrayBuffer());
              } else if (/json/i.test(responseType)) {
                resolve(resp.json());
              } else if (/text/i.test(responseType)) {
                resolve(resp.text());
              } else if (/blob/i.test(responseType)) {
                resolve(resp.blob());
              } else if (/form|data/i.test(responseType)) {
                resolve(resp.formData());
              } else if (/clone|copy/i.test(responseType)) {
                resolve(resp.clone());
              } else if (/document/i.test(responseType)) {
                const responseText = resp.text();
                const domParser = new DOMParser();
                if (responseText instanceof Promise) {
                  responseText.then((txt) => {
                    const doc = domParser.parseFromString(txt, 'text/html');
                    resolve(doc);
                  });
                } else {
                  const doc = domParser.parseFromString(responseText, 'text/html');
                  resolve(doc);
                }
              } else {
                resolve(resp);
              }
            } else {
              reject(resp);
            }
          })
          .catch(reject);
      } else {
        const fallback = () =>
          Network.req(requestURL, method, responseType, data, true).then(resolve, reject);
        /** @type {VMScriptGMXHRDetails<typeof responseType>} */
        const DETAILS = {
          url: requestURL,
          responseType,
          ...params,
          onerror() {
            fallback();
          },
          onload(r_1) {
            if (r_1.status !== 200) {
              fallback();
            } else if (/basic/i.test(responseType)) {
              resolve(r_1);
            } else {
              resolve(r_1.response);
            }
          }
        };
        $GM.xmlHttpRequest(DETAILS);
      }
    });
  }
  /**
   * @param {number} bytes
   * @param {number} [decimals]
   * @returns {string}
   */
  static format(bytes, decimals = 2) {
    if (Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes <= 0) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), this.sizes.length - 1);
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  }
  /**
   * @param { { loaded: number; total: number; } } evt
   */
  static prog(evt) {
    return !evt.total
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  }
  /**
   *
   * @param {string | URL} pageURL
   * @param {VMScriptGMXHRDetails<Document> | RequestInit} [data]
   * @param {boolean} [useFetch]
   * @returns {Promise<Document>}
   */
  static async doc(pageURL, data, useFetch) {
    return await Network.req(pageURL, 'GET', 'document', data, useFetch);
  }
  /**
   *
   * @param {string | URL} chunkURL
   * @param {VMScriptGMXHRDetails<Response> | RequestInit} [data]
   * @param {(evt: { loaded: number; total: number; }) => void} onProgress
   * @returns {Promise<{ chunks: Uint8Array[]; size: number }>}
   */
  static async fetchChunks(chunkURL, data, onProgress) {
    /** @type {Response} */
    const resp = await Network.req(chunkURL, 'GET', 'basic', { timeout: 0, ...data }, true);
    const total = Number(resp.headers.get('Content-Length')) || 0;
    if (!resp.body || !isFN(resp.body.getReader)) {
      const buf = new Uint8Array(await resp.arrayBuffer());
      if (isFN(onProgress)) onProgress({ loaded: buf.length, total: buf.length });
      return { chunks: [buf], size: buf.length };
    }
    /** @type {Uint8Array[]} */
    const chunks = [];
    let loaded = 0;
    const reader = resp.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (isFN(onProgress)) onProgress({ loaded, total });
      }
    } finally {
      reader.releaseLock();
    }
    return { chunks, size: loaded };
  }
  /**
   *
   * @param {string | URL} blobURL
   * @param {Record<string, unknown>} [data]
   * @param {(evt: { loaded: number; total: number; }) => void} [onprogress]
   * @returns {Promise<Blob>}
   */
  static gmBlob(blobURL, data, onprogress) {
    return new Promise((resolve, reject) => {
      /**
       * @param {string | number} status
       */
      const fail = (status) =>
        reject(new Error(`status: ${status} finalURL: ${blobURL}`, { cause: 'Network.gmBlob' }));
      $GM.xmlHttpRequest({
        url: blobURL,
        method: 'GET',
        responseType: 'blob',
        anonymous: Object.is(data?.credentials, 'omit'),
        headers: data?.referrer ? { Referer: data.referrer } : undefined,
        onprogress,
        onload(r) {
          if (r.status >= 200 && r.status < 300 && r.response) {
            resolve(r.response);
          } else {
            fail(r.status);
          }
        },
        onerror: (r) => fail(r?.status ?? 0),
        ontimeout: () => fail('timeout'),
        onabort: () => fail('aborted')
      });
    });
  }
}
//#endregion

//#region Custom Elements
/**
 * Base for custom elements.
 */
class Base extends HTMLElement {
  _mph_ = {};
  constructor() {
    super();
  }
  connectedMoveCallback() {}
}

class MainUserJS extends Base {
  _mph_ = {
    injected: false
  };
  constructor() {
    super();
    if (!isFN(this.attachShadow)) {
      throw new Error('Failed to initialize: "attachShadow not supported"', {
        cause: 'MainUserJS'
      });
    }
    const shadow = this.attachShadow({ mode: 'closed' });

    // Keep page level shortcuts / popunders from reacting to input inside the interface
    for (const type of [
      'click',
      'mousedown',
      'mouseup',
      'pointerdown',
      'pointerup',
      'touchstart',
      'touchend',
      'keydown',
      'keyup',
      'keypress',
      'contextmenu',
      'wheel',
      'scroll'
    ]) {
      this.addEventListener(type, (evt) => evt.stopPropagation());
    }

    /**
     * Inserts a stylesheet.
     * @param {string} css
     * @param {string} role - Name of the stylesheet
     * @param {ParentNode & Node} parent
     * @returns {?HTMLStyleElement}
     */
    const loadCSS = (css, role, parent) => {
      try {
        if (typeof css !== 'string' || isBlank(css)) {
          throw new Error(`"${role}" contains an empty CSS string`, { cause: 'loadCSS' });
        }
        /** @type {?HTMLStyleElement} */
        let sty = null;
        if ($GM.isGM) {
          sty = $GM.addElement(parent, 'style', { textContent: css });
        }
        if (!(sty instanceof HTMLStyleElement)) {
          sty = make('style', { textContent: css });
          parent.append(sty);
        }
        sty.dataset.insertedBy = $GM.info.script.name;
        sty.dataset.role = role;
        return sty;
      } catch (ex) {
        con.err(ex);
      }
      return null;
    };
    loadCSS(main_css, 'primary-stylesheet', shadow);

    /** @type {Root} */
    const root = make('mph-root', {
      dataset: isMobile ? { mobile: '' } : {}
    });
    shadow.append(root);
    this._mph_.root = root;
    defer(() => {
      this.dataset.insertedBy = $GM.info.script.name;
      this.dataset.role = 'primary-container';
    });
  }
  get injected() {
    return this._mph_.injected;
  }
  connectedCallback() {
    this._mph_.injected = true;
  }
  disconnectedCallback() {
    this._mph_.injected = false;
  }
}

/**
 * Resolves which supported website a URL belongs to, provides the site palette and page globals.
 */
class Root extends Base {
  /**
   * Supported websites, key is the "root" name used by the site handlers.
   * @type {Record<string, { domains: string[] }>}
   */
  static HOST = {
    pornhub: { domains: ['pornhub.com', 'pornhubpremium.com'] },
    youporn: { domains: ['youporn.com', 'youporngay.com'] },
    redtube: { domains: ['redtube.com'] },
    tube8: { domains: ['tube8.com'] },
    thumbzilla: { domains: ['thumbzilla.com'] },
    onlyfans: { domains: ['onlyfans.com'] },
    xhamster: { domains: ['xhamster.com'] },
    xnxx: { domains: ['xnxx.com'] },
    xvideos: { domains: ['xvideos.com'] },
    '91porn': { domains: ['91porn.com'] },
    '91porna': { domains: ['91porna.com'] },
    hqporner: { domains: ['hqporner.com'] },
    spankbang: { domains: ['spankbang.com'] },
    porntrex: { domains: ['porntrex.com'] },
    analdin: { domains: ['analdin.com'] },
    porn00: { domains: ['porn00.org'] },
    sxyprn: { domains: ['sxyprn.com'] },
    eporner: { domains: ['eporner.com'] },
    youjizz: { domains: ['youjizz.com'] },
    beeg: { domains: ['beeg.com'] },
    jable: { domains: ['jable.tv', 'fs1.app'] },
    missav: { domains: ['missav.ai', 'missav.ws', 'missav.com'] }
  };
  /**
   * Resolves `input` without touching any state.
   * @template {string | URL | Location} I
   * @param {I} [input]
   * @returns {Omit<SiteInfo, "router">}
   */
  static resolve(input = Page.location.href) {
    try {
      const webpage = toURL(input);
      const host = getHostname(webpage.hostname);
      const root =
        Object.keys(Root.HOST).find((k) => Root.HOST[k].domains.includes(host)) ?? 'blank';
      /** @type {Map<string, RegExp | string>} */
      const routes = new Map([
        ['Homepage', '/'],
        ['Video', /view_video\.php/]
      ]);
      if (/pornhub|tube8|youporn|thumbzilla|redtube/.test(root)) {
        if (root === 'youporn') {
          routes.set('GayHomepage', /^\/gay/);
        }
        if (root === 'pornhub') {
          routes.set('GayHomepage', /^\/gayporn/);
          routes.set('TransHomepage', /^\/transgender/);
          routes.set('LesbianHomepage', /^\/lesbian/);
          routes.set('GIF', /^\/gif\/\d+(?:\/(?=$))?$/);
          routes.set('Shorties', /^\/shorties(?:\/(?=$))?$/);
        } else {
          routes.set('Video', root === 'redtube' ? /\/[\d]+/ : /(video|watch)+|\/[\d]+\//);
        }
      }
      if (/jable|porn00|eporner|xvideos|xhamster|analdin/.test(root)) {
        routes.set('Video', /^\/video(s|-.*|\.)?\//);
      }
      if (root === 'porntrex') {
        routes.set('Video', /^\/video\/.*\/.*/);
      }
      if (root === 'sxyprn') {
        routes.set('Video', /^\/post\//);
      }
      if (root === 'hqporner') {
        routes.set('Video', /^\/hdporn\//);
      }
      if (root === 'xnxx') {
        routes.set('TodaysHomepage', /^\/todays-selection/);
        routes.set('SearchHomepage', /^\/search\//);
      }
      if (root === 'youjizz') {
        routes.set('Video', /^\/videos\/.+\.html/);
      }
      if (root === 'spankbang') {
        routes.set('Video', /\/\w+\/video\//);
      }
      if (root === 'missav') {
        routes.set('Video', /\/\w+\/\w+(\/[\w-]+)?/);
      }
      if (root === '91porna') {
        routes.set('Video', /\/comic\/index\/detail/);
      }
      const path =
        [...routes].find(([, reg]) =>
          isRegExp(reg) ? reg.test(webpage.pathname) : reg === webpage.pathname
        )?.[0] ?? 'Unknown';
      return { webpage, host, root, path };
    } catch {
      return { webpage: new URL(BLANK_PAGE), host: 'blank', root: 'blank', path: 'Unknown' };
    }
  }
  /**
   * Site palette, applied as CSS variables.
   * @param {string} root
   * @returns {Record<string, string>}
   */
  static palette(root) {
    if (/tube8/.test(root)) {
      return {
        'mph-site-color': 'hsl(201, 64%, 40%)',
        'mph-hover-color': 'hsl(201, 64%, 25%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(201, 64%, 40%)'
      };
    } else if (/thumbzilla/.test(root)) {
      return {
        'mph-site-color': 'hsl(168, 75%, 42%)',
        'mph-hover-color': 'hsl(168, 75%, 27%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(168, 75%, 42%)'
      };
    } else if (/redtube/.test(root)) {
      return {
        'mph-site-color': 'hsl(357, 76%, 39%)',
        'mph-hover-color': 'hsl(357, 76%, 24%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(357, 76%, 39%)'
      };
    } else if (/youporn/.test(root)) {
      return {
        'mph-site-color': 'hsl(345, 80%, 63%)',
        'mph-hover-color': 'hsl(345, 80%, 48%)',
        'mph-background-color': 'hsl(0, 0%, 0%)',
        'mph-border-color': 'hsl(345, 80%, 63%)'
      };
    } else if (/onlyfans/.test(root)) {
      return {
        'mph-site-color': 'var(--text-color, var(--mph-text-color, hsl(210, 12%, 97%)))',
        'mph-hover-color': 'var(--swiper-theme-color, hsl(196, 100%, 32%))',
        'mph-background-color': 'rgba(138,150,163,.12)',
        'mph-border-color': 'rgba(138,150,163,.12)',
        'mph-accent': 'hsl(196, 100%, 47%)',
        'mph-root-bg': 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))',
        'mph-header-bg': 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))'
      };
    } else if (/xhamster/.test(root)) {
      return {
        'mph-site-color': 'var(--color-white-origin, #fff)',
        'mph-hover-color': '#d42025',
        'mph-background-color': 'var(--color-accent-red, #e34449)',
        'mph-border-color': 'var(--color-accent-red, #e34449)'
      };
    }
    return {
      'mph-site-color': 'hsl(36, 100%, 50%)',
      'mph-hover-color': 'hsl(36, 100%, 35%)',
      'mph-background-color': 'hsl(0, 0%, 0%)',
      'mph-border-color': 'hsl(36, 100%, 50%)'
    };
  }
  /**
   * Where the floating button sits, as `--mph-position-*` values.
   * @param {string} [corner] - `auto` (website default), `top-left`, `top-right`, `bottom-left` or `bottom-right`
   * @param {string} [root] - Website
   * @param {boolean} [mobile]
   * @returns {Record<string, string>}
   */
  static placement(corner = 'auto', root = 'default', mobile = isMobile) {
    /**
     * Default spot of the floating button, `[corner, distance from the edge in rem]`.
     *
     * Keeps it clear of what websites pin to their corners: bottom navigation bars on phones,
     * "live cams" / chat popups on desktop.
     * @type {Record<string, { desktop: [string, number]; mobile: [string, number] }>}
     */
    const SPOTS = {
      default: { desktop: ['bottom-right', 1], mobile: ['bottom-right', 4.5] },
      onlyfans: { desktop: ['bottom-right', 1], mobile: ['bottom-right', 5] },
      xhamster: { desktop: ['bottom-left', 1], mobile: ['bottom-right', 4.5] }
    };
    const spot = (SPOTS[root] ?? SPOTS.default)[mobile ? 'mobile' : 'desktop'];
    const [where, lift] = /^(top|bottom)-(left|right)$/.test(corner) ? [corner, 1] : spot;
    const [vertical, horizontal] = where.split('-');
    const safe = (/** @type {string} */ edge) => `env(safe-area-inset-${edge}, 0px)`;
    /** @param {string} edge @param {number} rem */
    const at = (edge, rem) => `calc(${rem}rem + ${safe(edge)})`;
    return {
      'mph-position-top': vertical === 'top' ? at('top', lift) : 'auto',
      'mph-position-bottom': vertical === 'bottom' ? at('bottom', lift) : 'auto',
      'mph-position-left': horizontal === 'left' ? at('left', 1) : 'auto',
      'mph-position-right': horizontal === 'right' ? at('right', 1) : 'auto'
    };
  }
  constructor() {
    super();

    this.current = url;
  }
  /**
   * @returns {SiteInfo}
   */
  get current() {
    return this._mph_;
  }
  /**
   * @template {string | URL | Location} I
   * @param {I} [input]
   */
  set current(input) {
    try {
      this._mph_ = Root.resolve(input);
    } catch {
      this._mph_ = {};
    }
  }
  get webpage() {
    return this.current.webpage ?? null;
  }
  get host() {
    return this.current.host ?? null;
  }
  get path() {
    return this.current.path ?? null;
  }
  get root() {
    return this.current.root ?? null;
  }
  get router() {
    return this.current.router ?? null;
  }
  /**
   * @param {{ push: (path: string) => unknown } | null} pageRouter
   */
  set router(pageRouter) {
    if (isNull(pageRouter)) {
      this.current.router = null;
    } else {
      this.current.router = pageRouter;
    }
  }
  get palette() {
    return Root.palette(this.current.root);
  }
  /**
   * Requests the page, resolves every video quality.
   * @returns {Promise<VideoData>}
   */
  async find(input) {
    if (input) {
      this.current = input;
    }
    if (this.webpage == null) {
      throw new Error('"webpage" is null', { cause: 'Root:find()' });
    }
    const { root: R, webpage: U, path: P } = this;
    // mydaddy.cc (hqporner's player iframe) rejects the request made through the userscript
    // manager's own networking, a plain `fetch` with no cookies attached goes through instead
    const doc = await (U.href.includes('mydaddy.cc')
      ? Network.doc(U, { credentials: 'omit' }, true)
      : Network.doc(U));
    const meta = readMeta(doc, U);
    /** @type {Set<string>} */
    const files = new Set();
    /** @type {Set<string>} */
    const ts = new Set();
    let title = '';
    let poster = meta.poster;
    let duration = meta.duration;
    let preferHLS = false;
    /** File labelled by the site itself, wins over a label guessed from its address */
    const labelled = new Map();
    if (P === 'GIF') {
      const nodes = ldNodes(doc).filter((n) => n.contentUrl || n.thumbnailUrl);
      return {
        title: nodes[0]?.name ?? doc.title,
        poster: nodes[0]?.contentUrl ? absURL(String(nodes[0].thumbnailUrl ?? ''), U) : undefined,
        files: nodes.map((n) => absURL(String(n.contentUrl ?? n.thumbnailUrl), U)).filter(Boolean)
      };
    } else if (R === 'hqporner') {
      /** @type {?HTMLIFrameElement} */
      const iframe = qs('.videoWrapper > iframe', doc);
      if (iframe && !isEmpty(iframe.src)) {
        return await this.find(iframe.src);
      }
    } else if (R === 'xhamster') {
      /**
       * Video sources of an xHamster page.
       * @template {import("../typings/types.d.ts").xInitials} I
       * @param {Partial<I>} initials - `window.initials`
       * @returns {{ title: string; files: Set<string>; hls: Set<string> }} `hls` lists master playlists, best choice first
       */
      const xhSources = (initials) => {
        /**
         * The ciphertext is either the whole url or the first segment of its path.
         * @param {unknown} str
         * @returns {string | null} `null` when it is not a stream url (or the algorithm is unknown)
         */
        const xhDecipherURL = (str) => {
          /**
           * xHamster hides the urls of its streams. `ciphertext = [algorithm, seed (int32, little endian), data...]`,
           * every byte of `data` is XORed with the next byte of a pseudo random sequence.
           *
           * Algorithms are the ones of the website player, see also the `xhamster` extractor of yt-dlp.
           * @type {Record<number, (state: { s: number }) => number>}
           */
          const XH_ALGORITHMS = {
            1: (st) => (st.s = (Math.imul(st.s, 1664525) + 1013904223) | 0),
            2: (st) => {
              let s = st.s;
              s ^= s << 13;
              s ^= s >>> 17;
              s ^= s << 5;
              return (st.s = s | 0);
            },
            3: (st) => {
              let s = (st.s = (st.s + 0x9e3779b9) | 0);
              s ^= s >>> 16;
              s = Math.imul(s, 0x85ebca77);
              s ^= s >>> 13;
              s = Math.imul(s, 0xc2b2ae3d);
              return s ^ (s >>> 16);
            },
            4: (st) => {
              let s = (st.s = (st.s + 0x6d2b79f5) | 0);
              s = (s << 7) | (s >>> 25);
              s = (s + 0x9e3779b9) | 0;
              s ^= s >>> 11;
              return Math.imul(s, 0x27d4eb2d);
            },
            5: (st) => {
              let s = st.s;
              s ^= s << 7;
              s ^= s >>> 9;
              s ^= s << 8;
              return (st.s = (s + 0xa5a5a5a5) | 0);
            },
            6: (st) => {
              const s = (st.s = (Math.imul(st.s, 0x2c9277b5) + 0xac564b05) | 0);
              return (s ^ (s >>> 18)) >>> ((s >>> 27) & 31);
            },
            7: (st) => {
              const s = (st.s = (st.s + 0x9e3779b9) | 0);
              let e = s ^ (s << 5);
              e = Math.imul(e, 0x7feb352d);
              e ^= e >>> 15;
              return Math.imul(e, 0x846ca68b);
            }
          };
          /**
           * @param {string} hex
           * @returns {string | null} `null` for unknown algorithms
           */
          const xhDecipherHex = (hex) => {
            const b = hex.match(/../g)?.map((x) => parseInt(x, 16)) ?? [];
            const next = XH_ALGORITHMS[b[0]];
            if (!next) return null;
            const st = { s: b[1] | (b[2] << 8) | (b[3] << 16) | (b[4] << 24) | 0 };
            let out = '';
            for (let i = 5; i < b.length; i++) out += String.fromCharCode(b[i] ^ (next(st) & 0xff));
            return out;
          };
          if (typeof str !== 'string') return null;
          const hexRE = /^[0-9a-f]{12,}$/i;
          let out = null;
          if (hexRE.test(str)) {
            out = xhDecipherHex(str);
          } else {
            try {
              const u = toURL(str);
              const [, hex, rest] = /^\/([0-9a-f]{12,})([/,].+)$/i.exec(u.pathname) ?? [];
              const path = hex && xhDecipherHex(hex);
              if (path) out = `${u.origin}/${path}${rest}${u.search}`;
            } catch {
              /* not a url */
            }
          }
          return out && /^https?:\/\//.test(out) ? out : null;
        };
        const sources = initials?.xplayerSettings?.sources;
        /** @type {Set<string>} */
        const _files = new Set();
        /** @type {Map<string, string>} */
        const _hls = new Map();
        /**
         * @template { import("../typings/types.d.ts").VideoSource } H
         * @param {string} codec
         * @param {H} entry
         */
        const add = (codec, entry) => {
          for (const k of Object.keys(entry)) {
            if (k === 'url' || k === 'fallback') {
              const u = xhDecipherURL(entry[k]);
              if (!u) continue;
              if (/\.m3u8(?:$|\?)/.test(u)) {
                _hls.set(codec, u);
              } else if (!_files.has(u)) {
                _files.add(u);
              }
            }
          }
        };
        /**
         * h264 plays everywhere, av1 is the last resort
         */
        const h264Sort = ([a], [b]) => Number(a !== 'h264') - Number(b !== 'h264');
        if (isNull(sources)) {
          return {
            title,
            files: _files,
            hls: new Set()
          };
        }
        for (const [codec, entry] of toArray(sources.hls, { entries: true }).sort(h264Sort))
          add(codec, entry);
        for (const [codec, list] of toArray(sources.standard, { entries: true }).sort(h264Sort)) {
          for (const entry of list) add(codec, entry);
        }
        poster = String(initials?.videoModel?.thumbURL ?? poster);
        return {
          title: String(initials?.videoModel?.title ?? title),
          files: _files,
          hls: new Set(
            toArray(_hls)
              .sort(h264Sort)
              .map(([, u]) => u)
          )
        };
      };
      const found = xhSources(
        extractJSON(doc.getElementById('initials-script')?.textContent ?? '')
      );
      if (!Object.is(found.title.trim(), title.trim())) {
        title = found.title;
      }
      preferHLS = true;
      for (const f of found.files) {
        files.add(f);
      }
      for (const h of found.hls) {
        ts.add(h);
      }
    } else if (/\.(xnxx|xvideos)\./.test(U.href)) {
      const txt = Array.from(doc.scripts, (e) => e.textContent ?? '').find((t) =>
        t.includes('html5player.setVideo')
      );
      /** @param {string} name */
      const setup = (name) =>
        new RegExp(`html5player\\.${name}\\('((?:[^'\\\\]|\\\\.)*)'\\)`).exec(txt ?? '')?.[1];
      const hls = setup('setVideoHLS');
      return {
        title: meta.title || htmlToText(setup('setVideoTitle')) || document.title,
        poster: meta.poster ?? setup('setThumbUrl'),
        duration: meta.duration,
        // The file name tells the quality (`mp4_sd.mp4`), Low and High are often the same file
        files: [setup('setVideoUrlHigh'), setup('setVideoUrlLow')].map((src = '') => ({
          src,
          label: /\/mp4_(\w+)\.mp4/.exec(src)?.[1].toUpperCase() ?? ''
        })),
        // The direct file is capped to one (low) quality, HLS carries the higher ones
        ts: hls ? [hls] : [],
        preferHLS: true
      };
    } else if (R === 'youjizz') {
      // `dataEncodings` lists every quality twice: a direct file and its single-bitrate HLS
      // equivalent, plus one "Auto" adaptive playlist bundling a few of those qualities together
      const txt = Array.from(doc.scripts, (e) => e.textContent ?? '').find((t) =>
        t.includes('dataEncodings')
      );
      /** @type {{ quality?: string; filename?: string }[]} */
      let entries = [];
      try {
        entries = extractJSON(txt ?? '', (txt ?? '').indexOf('dataEncodings'));
      } catch (ex) {
        con.err(ex);
      }
      /** @type {{ src: string; label: string }[]} */
      const files = [];
      /** @type {Map<number, string>} */
      const hlsByQuality = new Map();
      for (const e of entries) {
        const src = absURL(String(e.filename ?? ''), U);
        const quality = parseInt(String(e.quality), 10) || 0;
        if (!src || !quality) continue;
        if (/\.m3u8/.test(src)) hlsByQuality.set(quality, src);
        else files.push({ src, label: `${quality}p` });
      }
      return {
        title: meta.title || document.title,
        poster: meta.poster,
        duration: meta.duration,
        files,
        ...pickHLS(files, hlsByQuality)
      };
    } else if (R === 'spankbang') {
      /**
       * Every quality SpankBang lists in the player setup.
       * @param {Document} page
       */
      const spankBangFiles = (page) => {
        for (const script of page.scripts) {
          const [, raw] = /stream_data\s*=\s*(\{.*?\});/s.exec(script.textContent ?? '') ?? [];
          if (!raw) continue;
          try {
            /** @type {Record<string, string[]>} */
            const data = JSON.parse(raw.replaceAll("'", '"'));
            return {
              files: Object.entries(data)
                .filter(([quality, list]) => /^(?:\d+p|4k)$/.test(quality) && list[0])
                .map(([quality, list]) => ({
                  src: list[0],
                  label: quality === '4k' ? '2160p' : quality
                })),
              ts: toArray(data.m3u8).slice(0, 1)
            };
          } catch (ex) {
            con.err(ex);
          }
        }
        return { files: [], ts: [] };
      };
      let { files, ts } = spankBangFiles(doc);
      if (isEmpty(files)) {
        // The setup was not found, what the player shows
        await waitFor(() => qs('video > source'), 10000);
        files = Array.from(qsA('video > source'), ({ src = '' }) => ({
          src,
          label: ''
        }));
      }
      // The named qualities top out below 1080p on some accounts, its one HLS playlist is
      // adaptive and often reaches higher, but we can't read its ceiling without building it
      const bestFile = Math.max(0, ...files.map((f) => parseInt(f.label, 10) || 0));
      return {
        title: meta.title || document.title,
        poster: meta.poster,
        duration: meta.duration,
        files,
        ts,
        preferHLS: bestFile < 1080
      };
    } else if (R === 'missav') {
      /**
       * Source of a script packed with `eval(function(p,a,c,k,e,d){...})`, read without running it.
       * @param {string} txt
       * @returns {string} `txt` unchanged when nothing is packed
       */
      const unpackJS = (txt) => {
        const [, p = '', a = '', c = '', k = ''] =
          /\}\('((?:[^'\\]|\\.)*)',\s*(\d+),\s*(\d+),\s*'((?:[^'\\]|\\.)*)'\.split\('\|'\)/.exec(
            txt
          ) ?? [];
        if (!p) return txt;
        const radix = Number(a);
        const words = k.split('|');
        /** @param {number} n @returns {string} */
        const encode = (n) =>
          (n < radix ? '' : encode(Math.floor(n / radix))) +
          (n % radix > 35 ? String.fromCharCode((n % radix) + 29) : (n % radix).toString(36));
        /** @type {Map<string, string>} */
        const dict = new Map();
        for (let i = Number(c); i--;) dict.set(encode(i), words[i] || encode(i));
        return p.replace(/\\(['\\])/g, '$1').replace(/\b\w+\b/g, (w) => dict.get(w) ?? w);
      };
      // A packed script sets `source` (adaptive), `source1280` (1080p) and `source842` (720p)
      /** @param {Document} page */
      const sources = (page) => {
        for (const script of page.scripts) {
          const txt = script.textContent ?? '';
          if (!txt.includes('eval(function(p,a,c,k,e,d)') || !txt.includes('m3u8')) continue;
          const setup = unpackJS(txt);
          return ['source', 'source1280', 'source842']
            .map((key) => new RegExp(`\\b${key}\\s*=\\s*'([^']+\\.m3u8[^']*)'`).exec(setup)?.[1])
            .filter((u) => typeof u === 'string');
        }
        return [];
      };
      // Cloudflare can answer the request with a challenge, the open page has the same script
      const found = sources(doc).length ? doc : document;
      const _meta = readMeta(found, U);
      return {
        title: _meta.title || document.title,
        poster: _meta.poster,
        duration: _meta.duration,
        ts: sources(found)
      };
    } else if (R === '91porn') {
      const txt = Array.from(doc.scripts, (e) => e.textContent ?? '').join('\n');
      const [, encoded = ''] = /strencode2\("([^"]+)"\)/.exec(txt) ?? [];
      const src = qs('source', parseHTML(decodeURIComponent(encoded)))?.getAttribute('src');
      return {
        title: doc.title
          .replace(/\s+/g, ' ')
          .replace(/\s*-\s*91porn\s*$/i, '')
          .trim(),
        poster: absURL(qs('video', doc)?.getAttribute('poster') ?? '', U) || undefined,
        duration: toSeconds(/const videoDuration = ([\d.]+)/.exec(txt)?.[1]),
        files: src ? [src] : []
      };
    } else if (R === '91porna') {
      const decoder = (src) => {
        if (!src) {
          const s = [...doc.scripts].find((x) =>
            x.textContent.includes('eval(function(p,a,c,k,e,d)')
          );
          if (!s) throw new Error('Packed script not found on this page');
          src = s.textContent;
        }
        const m = src.match(/\}\('([\s\S]*)',\s*(\d+),\s*(\d+),\s*'([\s\S]*?)'\.split\('\|'\)/);
        if (!m) throw new Error('Not a p,a,c,k,e,d blob');
        const payload = m[1].replace(/\\(.)/g, '$1'); // undo \' and \\ escapes
        const radix = +m[2],
          count = +m[3],
          words = m[4].split('|');
        const enc = (c) =>
          (c < radix ? '' : enc(Math.floor(c / radix))) +
          ((c = c % radix) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
        const dict = {};
        for (let i = 0; i < count; i++) dict[enc(i)] = words[i] || enc(i);
        const code = payload.replace(/\b\w+\b/g, (w) => (w in dict ? dict[w] : w));
        const grab = (re, s = code) => (s.match(re) || ['', ''])[1];
        return { grab, code, src };
      };
      const decodeVideo = () => {
        const d = decoder();
        const poster = d.grab(/url\('([^']+)'\)/);
        const img = decodeURIComponent(d.grab(/\?img=([^&"]+)/));
        const ads = d.grab(/&amp;ads=([^&"]*)/);
        const u = d.grab(/&u="\+encodeURIComponent\("([^"]*)"\)/);
        const h = d.grab(/&h="\+encodeURIComponent\("([^"]*)"\)/);
        const bucket = +d.grab(/\/(\d+)\)\+/) || 2100; // time bucket size (s)
        const t = Math.floor(Date.now() / 1000 / bucket);
        const path = d.grab(/src=\\"([^?]+)\?/) || '/index/detail_play';
        const qs =
          'img=' +
          encodeURIComponent(img) +
          '&ads=' +
          ads +
          '&u=' +
          encodeURIComponent(u) +
          '&h=' +
          encodeURIComponent(h) +
          '&t=' +
          t;
        const base = this.webpage.origin;
        const [exp, rand, uid, md5] = (new URL(poster).searchParams.get('auth_key') || '').split(
          '-'
        );
        return {
          poster,
          posterAuth: { expires: new Date(exp * 1000).toISOString(), rand, uid, md5 },
          params: { img, ads, u, h, t, bucketSeconds: bucket },
          scriptUrl: base + path + '?' + qs
        };
      };
      const decodePlaylist = (src) => {
        const d = decoder(src);
        const url = d.grab(/\burl:'([^']+)'/);
        const poster = d.grab(/\bposter:'([^']+)'/);
        if (!url) throw new Error('No playlist URL in unpacked code');
        const hevc = d.grab(/_dx_hevc_url\s*=\s*"([^"]*)"/, d.src);
        const auth = (u) => {
          if (!u) return null;
          const p = new URL(u);
          const [exp, rand, uid, md5] = (p.searchParams.get('auth_key') || '').split('-');
          const expires = new Date(exp * 1000);
          return {
            expires: expires.toISOString(),
            expired: expires < new Date(),
            minutesLeft: Math.round((expires - Date.now()) / 60000),
            rand,
            uid,
            md5
          };
        };
        const q = new URL(url).searchParams;

        return {
          playlist: url,
          hevc: hevc || null,
          poster,
          videoHash: d.grab(/\/([0-9a-f]{32})\.m3u8/, url),
          via: { via: q.get('via'), via_bm: q.get('via_bm'), v: q.get('v'), time: q.get('time') },
          playlistAuth: auth(url),
          posterAuth: auth(poster)
        };
      };
      const decoded = decodeVideo();
      const obj = decodePlaylist(await Network.req(decoded.scriptUrl, 'GET', 'text'));
      poster = decoded.poster || obj.poster || meta.poster;
      return {
        title: meta.title || doc.title.trim() || document.title,
        poster,
        duration: meta.duration,
        ts: [obj.playlist]
      };
    } else if (R === 'jable') {
      const obj = {};
      const txt = Array.from(doc.scripts, (e) => e.textContent ?? '').join('\n');
      const [, hlsUrl = ''] = /hlsUrl = '([^']+)'/.exec(txt) ?? [];
      if (!isEmpty(hlsUrl)) {
        obj.ts = [hlsUrl];
      }
      for (const m of qsA('meta[property^="og:"]', doc)) {
        if (m) {
          const content = m.getAttribute('content')?.trim() ?? '';
          if (content.startsWith('http')) {
            obj.poster = content;
          } else {
            obj.title = content;
          }
        }
      }
      return obj;
    } else if (R === 'eporner') {
      const txt = Array.from(doc.scripts, (e) => e.textContent ?? '').join('\n');
      const arr = Array.from(
        txt.matchAll(/EP\.video\.player\.(poster|vid|hash) = '(.*)'/g),
        ([, a, b]) => [a, b]
      );
      const obj = {};
      for (const [k, v] of arr) {
        obj[k] = v;
      }
      const vidUrl = toURL(`/xhr/video/${obj.vid}`, this.webpage);
      const sp = vidUrl.searchParams;
      const toHash = (r) => {
        return (
          !(!r || 32 !== r.length) &&
          parseInt(r.substring(0, 8), 16).toString(36) +
            parseInt(r.substring(8, 16), 16).toString(36) +
            parseInt(r.substring(16, 24), 16).toString(36) +
            parseInt(r.substring(24, 32), 16).toString(36)
        );
      };
      sp.append('hash', toHash(obj.hash));
      sp.append('domain', this.webpage.hostname);
      sp.append('pixelRatio', 0);
      sp.append('playerHeight', 0);
      sp.append('fallback', false);
      sp.append('embed', false);
      sp.append('supportedFormats', ['hls', 'dash', 'h265', 'vp9', 'av1', 'mp4']);
      sp.append('_', new Date().getTime());
      const req = await Network.req(vidUrl, 'GET', 'json', { credentials: 'include' });
      const ts = req?.sources?.hls?.auto?.src;
      const files = req?.sources?.mp4;
      return {
        title: meta.title || document.title,
        poster,
        duration: meta.duration,
        files: files ? [files] : undefined,
        ts: ts ? [ts] : undefined
      };
    } else {
      /**
       * @param {string} str - Contents of a JSON string (without quotes)
       */
      const unescapeJSON = (str) => {
        try {
          return JSON.parse(`"${str}"`);
        } catch {
          return str;
        }
      };
      // Pornhub and its siblings: the player setup lists the streams, some of them are addresses
      // that resolve (`"remote":true`) to the per-quality files instead of being one directly
      for (const script of doc.getElementsByTagName('script')) {
        const txt = script.textContent ?? '';
        const at = txt.indexOf('"mediaDefinitions"');
        if (at < 0) continue;
        const [, name = ''] = /"video_title":"(.*?)",/.exec(txt) ?? [];
        if (!isEmpty(name)) title = unescapeJSON(name);
        /** @type {Array<{ format?: string; videoUrl?: string; remote?: boolean }>} */
        let defs;
        try {
          defs = extractJSON(txt, at);
        } catch (ex) {
          con.err(ex);
          continue;
        }
        /**
         * Best quality found per format, only kept when it beats the files found directly
         * @type {Map<number, string>}
         */
        const hlsByQuality = new Map();
        for (const d of toArray(defs)) {
          if (d?.format !== 'mp4' && d?.format !== 'hls') continue;
          const u = absURL(String(d.videoUrl ?? ''), U);
          if (!u) continue;
          if (d.remote) {
            try {
              /** @type {Array<{ format?: string; videoUrl?: string; quality?: unknown }>} */
              const list = await Network.req(u);
              for (const q of toArray(list)) {
                const qu = absURL(String(q?.videoUrl ?? ''), U);
                if (!qu || Array.isArray(q.quality)) continue;
                const quality = parseInt(String(q.quality), 10) || 0;
                if (q.format === 'hls' || /\.m3u8/.test(qu)) hlsByQuality.set(quality, qu);
                else if (/\.mp4[.?]/.test(qu)) files.add(qu);
              }
            } catch (ex) {
              con.err(ex);
            }
          } else if (d.format === 'hls') {
            ts.add(u);
          } else if (/\.mp4/.test(u)) {
            files.add(u);
          }
        }
        const picked = pickHLS(files, hlsByQuality);
        if (picked.preferHLS) {
          preferHLS = true;
          for (const u of picked.ts) ts.add(u);
        }
        if (files.size || ts.size) break;
      }
      if (files.size === 0) {
        const txt = doc.documentElement.innerHTML;
        // `do_pl()`-style embed (hqporner's player iframe): the video markup is a JS string
        // built inline with escaped quotes, quality sits on each source's `title`. The string
        // isn't valid HTML on its own (it's inline in a `<script>`, sometimes duplicated across
        // an if/else), so its `<source>` tags are read directly rather than through parseHTML
        const clean = txt.replace(/\\(["'])/g, '$1');
        /** @param {string} tag @param {string} name */
        const attr = (tag, name) => new RegExp(`${name}=["']([^"']*)["']`).exec(tag)?.[1];
        const sources = toArray(clean.matchAll(/<source\b([^>]*)>/gi)).filter(
          ([, attrs]) => /\bsrc=/.test(attrs) && /\btitle=/.test(attrs)
        );
        if (sources.length && /id=["']flvv["']/.test(clean)) {
          const videoTag = /<video\b[^>]*\bid=["']flvv["'][^>]*>/i.exec(clean)?.[0] ?? '';
          const [, min = 0, sec = 0] =
            /duration is (\d+)min (\d+)sec/i.exec(
              qs('meta[name="description"]')?.getAttribute('content') ?? ''
            ) ?? [];
          poster = absURL(attr(videoTag, 'poster') ?? '', U) || poster;
          duration = Number(min) * 60 + Number(sec);
          title =
            document.title.replace(/\s*-\s*HQporner\.com$/i, '') || qs('h1')?.textContent?.trim();
          for (const [, attrs] of sources) {
            const src = absURL(attr(attrs, 'src') ?? '', U);
            if (!src) continue;
            files.add(src);
            const label = attr(attrs, 'title');
            if (label) labelled.set(src, label);
          }
        } else {
          // KVS players (porntrex, analdin, ...)
          /** @param {RegExp} reg */
          const addAlt = (reg) => {
            for (const r of txt.match(new RegExp(reg.source, 'g')) ?? []) {
              const [, alt = ''] = reg.exec(r) ?? [];
              if (!isEmpty(alt)) files.add(alt.replaceAll('function/0/', ''));
            }
          };
          title = /video_title: '(.*?)'/.exec(txt)?.[1] || title;
          if (!/porntrex/.test(U.href)) addAlt(/video_alt_url: '(.*?)'/);
          addAlt(/video_alt_url\d+: '(.*?)'/);
          const [, A, B, C] =
            /(\w+)\.replaceAll\("\w+",(\w+)\+"pubs\/"\+(\w+)\+"\/"\)/.exec(txt) ?? [];
          const [, videoHTML] = (A && new RegExp(`${A}="(<video.+</video>)"`).exec(txt)) || [];
          if (videoHTML) {
            const [b = '', c = ''] = [B, C].map(
              (e) => new RegExp(`${e}="(.*?)"`).exec(txt)?.[1] ?? ''
            );
            const html = parseHTML(
              videoHTML.replaceAll('nrpuv', `${b}pubs/${c}/`).replaceAll('\\"', '"')
            );
            poster = absURL(qs('video', html)?.getAttribute('poster') ?? '', U) || poster;
            for (const source of qsA('source', html)) {
              const src = absURL(source.getAttribute('src') ?? '', U);
              if (src) files.add(src);
            }
          }
        }
      }
    }
    /**
     * Sorts video urls by resolution, highest first.
     * @param {string} ma
     * @param {string} mb
     */
    const sortVideos = (ma, mb) => resolutionOf(mb) - resolutionOf(ma);
    return {
      page: U.href,
      title: title || meta.title || doc.title,
      poster,
      duration,
      preferHLS,
      files: toArray(files)
        .sort(sortVideos)
        .map((src) => (labelled.has(src) ? { src, label: labelled.get(src) } : src)),
      ts: toArray(ts)
    };
  }
  /**
   * @param {string} path
   * @returns {boolean}
   */
  navigate(path) {
    try {
      if (!this.router || isEmpty(path)) return false;
      const result = this.router.push(path);
      // Vue Router rejects duplicate navigations, not an error
      if (result instanceof Promise) result.catch(BLANK_FN);
      if (typeof container !== 'undefined') {
        container.hidePanel();
      }
      return true;
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
  /**
   * Mobile websites redirect to "Continue to video" (interstitial), skip it.
   * @returns {boolean} `true` when the page is being redirected
   */
  mobileFix() {
    if (!isMobile || this.root !== 'pornhub') return false;
    try {
      document.cookie = `views=0; path=/; domain=.${this.host}`;
      const { webpage } = this;
      if (webpage.pathname.startsWith('/interstitial') && webpage.searchParams.has('viewkey')) {
        const videoURL = `${webpage.origin}/view_video.php?viewkey=${encodeURIComponent(webpage.searchParams.get('viewkey') ?? '')}`;
        con.info(`Redirecting to "${videoURL}"`);
        window.location.href = videoURL;
        return true;
      }
    } catch (ex) {
      con.err(ex);
    }
    return false;
  }
}

class Post extends Base {
  constructor() {
    super();
  }
  /**
   * @param {string} key
   * @param {PostCard} post
   * @param {MediaGroup} group
   */
  render(key, post, group) {
    this.dataset.post = key;
    const grid = make('mph-elem', 'post-media');
    this.append(grid);
    this._mph_ = { grid };
    const { meta } = this._renderHead(post);
    group.pane.append(this);
    return { key, post, el: this, grid, meta, ids: new Set() };
  }
  /**
   * Refreshes the header of the card (name, pills, text) with newer data, its tiles are kept.
   * @param {PostEntry} entry
   * @param {PostCard} post
   */
  update(entry, post) {
    const { meta } = this._renderHead(post);
    entry.post = post;
    entry.meta = meta;
    return entry;
  }
  /**
   * Builds (or rebuilds) everything above the tiles.
   * @param {PostCard} post
   */
  _renderHead(post) {
    const { user } = post;
    const avatar = make('mph-elem', 'avatar');
    this._mph_.head?.remove();
    this._mph_.text?.remove();
    this.dataset.variant = post.variant;
    this.dataset.search = `${user.name} ${post.text ?? ''}`.toLowerCase();
    if (post.variant === 'video') IconSVG.load('video', avatar);
    else avatar.textContent = (user.name || '?').slice(0, 1).toUpperCase();
    if (user.avatar) {
      const img = make('img', { src: user.avatar, alt: '', decoding: 'async' });
      img.addEventListener('load', () => avatar.replaceChildren(img), { once: true });
    }
    const who = make('mph-elem', 'post-who');
    const name = make('mph-elem', 'post-name', { textContent: user.name });
    if (user.username) {
      name.append(make('span', 'post-handle', { textContent: ` @${user.username}` }));
    }
    const meta = make('mph-elem', 'post-meta');
    who.append(name, meta);
    const head = make('mph-row', 'post-head');
    head.append(avatar, who);
    if (post.isMessage) {
      head.append(make('mph-elem', 'pill muted', { textContent: i18n$('message') }));
    }
    if (post.isFree) {
      head.append(make('mph-elem', 'pill free', { textContent: i18n$('free') }));
    } else if (post.price) {
      head.append(make('mph-elem', 'pill', { textContent: `$${post.price}` }));
    }
    if (post.original) {
      head.append(MainBody.action('open', 'of-open', i18n$('open'), { webpage: post.original }));
    }
    const text = post.text
      ? make('mph-elem', 'post-text', { textContent: post.text, title: post.text })
      : undefined;
    const { grid } = this._mph_;
    grid.before(...[head, text].filter(Boolean));
    Object.assign(this._mph_, { post, avatar, grid, head, meta, who, name, text });
    return this._mph_;
  }
}

/**
 * Holds every video found on the page, owns the elements that display them.
 *
 * Everything is a card in the feed of a tab (the layout of an OnlyFans post):
 *
 * - `post`: an OnlyFans post, every tile is a media of the post
 * - `video`: a video, every tile is a quality of it (or the HLS stream when that is all there is)
 */
class List extends Base {
  /**
   * @type { { body: MainBody } }
   */
  _mph_ = {
    body: {}
  };
  constructor() {
    super();
  }
  disconnectedCallback() {
    if (this.body) {
      const id = this.dataset.host;
      for (const item of this.items) {
        item.el.remove();
        if (item.blob) URL.revokeObjectURL(item.src);
        if (this.group) {
          for (const i of this.group.items) {
            const entry = this.body.posts.get(item.post);
            if (entry) {
              entry.ids.delete(i);
              if (entry.ids.size === 0) {
                entry.el.remove();
                this.body.posts.delete(entry.key);
              } else {
                this.body._updatePost(entry);
              }
            }
            this.body.items.delete(i);
            this.body.updateCounts();
          }
        }
      }
      this.body.groups.delete(id);
      this.body.updateCounts();
    }
  }
  get body() {
    return this._mph_.body;
  }
  set body(obj) {
    this._mph_.body = obj;
  }
  get group() {
    return this.body.groups.get(this.dataset.host);
  }
  /**
   * @returns {MediaItem[]}
   */
  get items() {
    return [...this.group.items].map((i) => this.body.items.get(i)).filter((i) => !isEmpty(i));
  }
  /**
   * @returns {PostEntry[]}
   */
  get posts() {
    return this.items.map((i) => this.body.posts.get(i.post)).filter((i) => !isEmpty(i));
  }
}

class MainBody extends Base {
  /**
   * @type { { groups: Map<string, MediaGroup>; items: Map<string, MediaItem>; posts: Map<string, PostEntry>; } }
   */
  _mph_ = {
    groups: new Map(),
    items: new Map(),
    posts: new Map()
  };
  constructor() {
    super();
  }
  connectedCallback() {
    con.log(this._mph_);
  }
  /**
   * File extension of a media url.
   * @param {string} src
   * @param {string} [def]
   */
  static extFromURL(src, def = 'mp4') {
    try {
      const [, ext = ''] =
        /\.(mp4|webm|m4v|mov|ts|m4s|gif|webp|jpe?g|png|avif|mp3|m4a)$/i.exec(toURL(src).pathname) ??
        [];
      return ext ? ext.toLowerCase() : def;
    } catch {
      return def;
    }
  }
  get groups() {
    return this._mph_.groups;
  }
  get items() {
    return this._mph_.items;
  }
  get posts() {
    return this._mph_.posts;
  }
  /**
   * Replaces the HLS tile by the video that was built from it.
   * @param {MediaItem} item - The HLS tile
   * @param {Blob} blob
   * @param {string} ext
   */
  addBlob(item, blob, ext) {
    const entry = this.posts.get(item.post);
    const group = this.groups.get(item.group);
    if (!entry || !group) return;
    this._addItem(entry, group, `${item.post}:${ext}`, {
      id: ext,
      type: 'video',
      label: ext.toUpperCase(),
      name: item.title,
      src: URL.createObjectURL(blob),
      blob,
      ext,
      poster: item.poster,
      thumb: item.thumb,
      duration: item.duration,
      data: item.data
    });
    this.removeItem(item.id);
    this._done();
  }
  /**
   * Adds a video: one card, one tile per quality, or a single tile for the HLS stream when
   * there is nothing else.
   * @param {VideoData} video
   * @param {boolean} [options] - `update`: refresh the card when it already exists
   * @returns {boolean} `false` when the page has no video
   */
  addVideo(video, update = false) {
    if (typeof container === 'undefined') return false;
    video.postData ??= {};
    const page = toURL(video.page ?? container.root.webpage);
    const title = String(isEmpty(video.title) ? document.title || 'MagicPH' : video.title);
    const shared = {
      viewerOnly: video.viewerOnly === true,
      poster: video.poster,
      data: video.hermes ?? {}
    };
    const files = MainBody.qualities(video.files);
    /** @type {PostMedia[]} */
    const media = files.map(({ src, label }) => ({
      ...shared,
      id: label,
      label,
      src,
      type: /^(?:gif|webp|jpe?g|png|avif)$/.test(MainBody.extFromURL(src, '')) ? 'photo' : 'video',
      name: title
    }));
    const stream = toArray(video.ts);
    if (
      (stream.length && (media.length === 0 || video.preferHLS)) ||
      stream.find((i) => i.includes('xhcdn.com'))
    ) {
      media.push({
        ...shared,
        id: 'hls',
        label: 'HLS',
        type: 'video',
        stream: [...new Set(stream)],
        name: title
      });
    }
    if (Array.isArray(video.photos)) {
      media.push(...video.photos);
    }
    if (media.length === 0) {
      con.info('No video found:', page.href);
      return false;
    }
    const id = video.id ?? page.href;
    const groupKey = video.groupKey ?? title;
    // Fetched data rarely knows the creator, an existing card keeps its own
    const keepUser = update && this.posts.has(`${groupKey}:${id}`);
    const postObj = {
      id,
      variant: 'video',
      groupKey,
      groupTitle: video.groupTitle ?? title,
      user:
        video.user ??
        (keepUser ? undefined : { name: title, avatar: `${page.origin}/favicon.ico` }),
      meta: [
        getHostname(page.hostname),
        video.duration ? fancyTimeFormat(video.duration) : ''
      ].filter(Boolean),
      media,
      ...video.postData
    };
    const added = this.addPost(postObj, update);
    const hls = added.find((i) => i.stream);
    if (hls && cfg.autoHLS) container.loadHLS(hls.id).catch((ex) => con.err(ex));
    return true;
  }
  /**
   * Adds a card and its media, media that is already in the card is skipped.
   *
   * With `update`, an existing card takes the newer data instead: its header is refreshed, tiles
   * whose source changed are replaced, tiles the new data no longer lists are removed (e.g. the
   * placeholder of a `viewerOnly` card). Videos built from an HLS stream are always kept.
   * @param {PostCard} post
   * @param {boolean} [options]
   * @returns {MediaItem[]} The tiles that were added
   */
  addPost(post, update = false) {
    if (typeof container === 'undefined') return [];
    if (update) {
      const existing = this.posts.get(`${post.groupKey}:${post.id}`);
      if (existing) return this._updatePostData(existing, post);
    }
    container.init();
    const video = post.variant === 'video';
    const activate = video || container.toolbar._active === null;
    /** @type {MediaGroup} */
    const group = this.groups.getOrInsertComputed(post.groupKey, (key) => {
      /** @type {List} */
      const pane = make('mph-list', 'mph-feed hidden', { dataset: { host: key } });
      pane.body = this;
      this.append(pane);
      return {
        key,
        id: post.id,
        title: post.groupTitle ?? key,
        counted: !video,
        items: new Set(),
        pane,
        tab: null
      };
    });
    if (!group.tab || !group.tab.isConnected) {
      group.tab = container.toolbar.create(post.groupKey, group.title, activate);
    }
    /**
     * @param {string} key
     * @param {PostCard} post
     * @param {MediaGroup} group
     */
    const renderPost = (key, post, group) => {
      /** @type {Post} */
      const el = make('mph-post');
      const entry = el.render(key, post, group);
      this.posts.set(key, entry);
      return entry;
    };
    /** @type {MediaItem[]} */
    const added = [];
    const key = `${group.key}:${post.id}`;
    let entry = this.posts.get(key);
    for (const m of post.media) {
      const id = `${key}:${m.id}`;
      if (this.items.has(id) || !(m.src || m.stream || m.drm)) continue;
      entry ??= renderPost(key, post, group);
      added.push(this._addItem(entry, group, id, m));
    }
    if (entry) this._updatePost(entry);
    this._done();
    return added;
  }
  /**
   * @param {PostEntry} entry
   * @param {MediaGroup} group
   * @param {string} id
   * @param {PostMedia} m
   */
  _addItem(entry, group, id, m) {
    /** @type {Tile} */
    const tile = make('mph-tile');
    const item = tile.addItem(entry, group, id, m);
    this.items.set(id, item);
    return item;
  }
  /**
   * Merges newer data into an existing card, see {@link MainBody.addPost}.
   * @param {PostEntry} entry
   * @param {PostCard} post
   * @returns {MediaItem[]} The tiles that were added or replaced
   */
  _updatePostData(entry, post) {
    const group = this.groups.get(post.groupKey);
    if (!group) return [];
    const prev = entry.post;
    /** @type {PostCard} */
    const merged = { ...prev };
    for (const [k, v] of Object.entries(post)) {
      // The variant decides what the card offers, it stays the one it was created with
      if (v === undefined || k === 'variant' || k === 'user') continue;
      merged[k] = v;
    }
    merged.user = {
      ...prev.user,
      ...Object.fromEntries(Object.entries(post.user ?? {}).filter(([, v]) => !isEmpty(v)))
    };
    entry.el.update(entry, merged);
    /** @type {MediaItem[]} */
    const added = [];
    /** Ids the new data lists */
    const fresh = new Set();
    // Once a video is built from its stream, the stream is not offered again
    const built = entry.ids.values().some((id) => this.items.get(id)?.blob);
    for (const m of post.media) {
      if (!(m.src || m.stream || m.drm) || (m.stream && built)) continue;
      const id = `${entry.key}:${m.id}`;
      fresh.add(id);
      const old = this.items.get(id);
      if (old) {
        // Built videos and streams that are being built are left alone
        if (old.blob || old.el.dataset.busy || MainBody.sameSource(old, m)) continue;
        old.el.remove();
      }
      // Same id: keeps its place in the card and in the tab
      added.push(this._addItem(entry, group, id, m));
    }
    if (fresh.size) {
      for (const id of toArray(entry.ids)) {
        const old = this.items.get(id);
        if (!old || fresh.has(id) || old.blob || old.el.dataset.busy) continue;
        this.removeItem(id);
      }
    }
    this._layoutGrid(entry);
    this._updatePost(entry);
    this._done();
    return added;
  }
  /**
   * Re-applies the tile layout of a card: the first 4 tiles, plus the HLS ones.
   * @param {PostEntry} entry
   */
  _layoutGrid(entry) {
    /** @type {HTMLElement[]} */
    const tiles = [];
    for (const id of entry.ids) {
      const item = this.items.get(id);
      if (item && (tiles.length < 4 || item.label === 'HLS')) tiles.push(item.el);
    }
    entry.grid.replaceChildren(...tiles);
  }
  /**
   * The tile already shows this media, replacing it would change nothing.
   * @param {MediaItem} item
   * @param {PostMedia} m
   */
  static sameSource(item, m) {
    return (
      item.src === (m.src ?? '') &&
      String(item.stream ?? '') === String(m.stream ?? '') &&
      !!item.drm === !!m.drm &&
      item.label === m.label &&
      item.poster === m.poster &&
      item.thumb === m.thumb &&
      !!item.el._mph_.m?.viewerOnly === !!m.viewerOnly
    );
  }
  regroupMedia() {
    /** @type {Map<string, MediaItem[]>} */
    const m = new Map();
    const groups = groupBy(toArray(this.items, { values: true }), (i) => {
      return i.type === 'video' && !isEmpty(i.src) ? i.group : '_';
    });
    for (const [k, v] of Object.entries(groups)) {
      if (v && !m.has(k)) {
        m.set(k, v);
      }
    }
    return m;
  }
  _done() {
    if (typeof container === 'undefined') return;
    this.updateCounts();
    if (cfg.autoinject) container.inject();
  }
  /**
   * @param {string} id
   */
  removeItem(id) {
    const item = this.items.get(id);
    if (!item) return false;
    item.el.remove();
    if (item.blob) URL.revokeObjectURL(item.src);
    this.groups.get(item.group)?.items.delete(id);
    this.items.delete(id);
    const entry = this.posts.get(item.post);
    if (entry) {
      entry.ids.delete(id);
      if (entry.ids.size === 0) {
        entry.el.remove();
        this.posts.delete(entry.key);
      } else {
        this._updatePost(entry);
      }
    }
    this.updateCounts();
    return true;
  }
  /**
   * @param {string} postKey
   */
  removePost(postKey) {
    for (const id of toArray(this.posts.get(postKey)?.ids ?? [])) this.removeItem(id);
  }
  /**
   * Removes a group and everything it holds, does not touch the tab.
   * @param {string} key
   */
  removeGroup(key) {
    const group = this.groups.get(key);
    if (group) group.pane.remove();
  }
  get feed() {
    return toArray(this.items, { values: true }).filter(
      (i) => this.posts.get(i.post)?.post.variant === 'post'
    );
  }
  get media() {
    return this.feed.filter((i) => i.src);
  }
  get count() {
    return this.posts.size;
  }
  /**
   * Refreshes every counter.
   */
  updateCounts() {
    if (this._countsQueued) return;
    this._countsQueued = true;
    defer(() => {
      this._countsQueued = false;
      for (const group of this.groups.values()) {
        const tabHost = group.tab?.firstElementChild;
        if (tabHost) {
          tabHost.setAttribute('title', group.title);
          tabHost.textContent = group.counted
            ? `${group.title} (${group.items.size})`
            : group.title;
        }
      }
      container.updateCounters();
    });
  }
  /**
   * Frees every object url, empties the library.
   */
  clear() {
    for (const key of toArray(this.groups, { keys: true })) this.removeGroup(key);
  }
  /**
   * One entry per quality, highest first. A file without a quality in its url is named after its format.
   * @param {Array<string | { src: string; label?: string }>} [files]
   * @returns {Array<{ src: string; label: string }>}
   */
  static qualities(files) {
    /** @type {Map<string, string>} */
    const seen = new Map();
    /** @type {string[]} */
    const other = [];
    for (const file of toArray(files)) {
      const { src, label = '' } = typeof file === 'string' ? { src: file } : file;
      if (!src) continue;
      const q = label || (resolutionOf(src) ? `${resolutionOf(src)}p` : '');
      if (!q) other.push(src);
      else if (!seen.has(q)) seen.set(q, src);
    }
    const out = Array.from(seen, ([label, src]) => ({ src, label })).sort(
      (a, b) => (parseInt(b.label, 10) || 0) - (parseInt(a.label, 10) || 0)
    );
    for (const src of other) {
      if (out.some((o) => o.src === src)) continue;
      const ext = MainBody.extFromURL(src).toUpperCase();
      let label = ext;
      for (let n = 2; out.some((o) => o.label === label); n++) label = `${ext} ${n}`;
      out.push({ src, label });
    }
    return out;
  }
  /**
   * Playing it in the viewer works: nothing is offered that would only fail.
   * @param {MediaItem} item
   */
  static playable(item) {
    /**
     * Can the browser play `mime`?
     * @param {string} mime
     */
    const canPlay = (mime) => {
      if (typeof mime === 'string') {
        return !isEmpty(make('video').canPlayType(mime));
      }
      return false;
    };
    if (isObj(item)) {
      if (typeof item.src === 'string' && item.src.startsWith('blob:')) return true;
      if (item.stream) return canPlay('application/vnd.apple.mpegurl');
      if (!item.src) return false;
      return item.type === 'photo' || !item.blob || canPlay(item.blob.type || 'video/mp4');
    }
    return false;
  }
  /**
   * Icon-only action button for a tile.
   * @param {string} icon
   * @param {string} command
   * @param {string} text
   * @param {Record<string, string>} [dataset]
   */
  static tileBtn(icon, command, text, dataset = {}) {
    const btn = make('mph-btn', 'tile-btn', {
      title: text,
      role: 'button',
      tabIndex: 0,
      dataset: { command, ...dataset }
    });
    IconSVG.load(icon, btn);
    return btn;
  }
  /**
   * @param {string} icon
   * @param {string} command
   * @param {string} text
   * @param {Record<string, string>} [dataset]
   */
  static action(icon, command, text, dataset = {}) {
    const a = make('mph-a', {
      title: text,
      role: 'button',
      tabIndex: 0,
      dataset: { command, ...dataset }
    });
    IconSVG.load(icon, a);
    a.append(document.createTextNode(` ${text}`));
    return a;
  }
  /**
   * Line under the name, counts and layout of the media, buttons that would do nothing are hidden.
   * @param {PostEntry} entry
   */
  _updatePost(entry) {
    const { post } = entry;
    /** @type {string[]} */
    let line;
    if (post.variant === 'video') {
      line = post.meta ?? [];
    } else {
      /** @type {Record<string, number>} */
      const counts = {};
      for (const id of entry.ids) {
        const type = this.items.get(id)?.type ?? 'video';
        counts[type] = (counts[type] ?? 0) + 1;
      }
      let date = '';
      try {
        if (post.date) {
          date = new Intl.DateTimeFormat(navigator.language, { dateStyle: 'medium' }).format(
            new Date(post.date)
          );
        }
      } catch {
        /* invalid date */
      }
      line = [
        date,
        ...Object.entries(counts).map(([type, n]) => `${n} ${i18n$(n === 1 ? type : `${type}s`)}`)
      ];
    }
    entry.meta.textContent = line.filter(Boolean).join(' \u00b7 ');
    entry.grid.dataset.count = String(entry.ids.size);
    const downloadable = toArray(entry.ids).some((id) => this.items.get(id)?.src);
    for (const btn of qsA('[data-command="post-download"], [data-command="post-copy"]', entry.el)) {
      btn.classList.toggle('hidden', !downloadable);
    }
  }
  /**
   * Thumbnail of a media: its preview image, or the media itself (photo, first frame of a video).
   *
   * Appended right away, a lazy image outside of the document never loads.
   * @param {MediaItem} item
   * @returns {HTMLImageElement | HTMLVideoElement | HTMLElement}
   */
  static thumbnail(item) {
    const none = () => {
      const el = make('mph-elem', 'thumb-none');
      IconSVG.load('video', el);
      return el;
    };
    const fallback = () => {
      if (!item.src || (item.blob && !MainBody.playable(item))) return none();
      if (item.type === 'photo') {
        return make('img', {
          src: item.src,
          alt: '',
          loading: 'lazy',
          decoding: 'async',
          draggable: 'false'
        });
      }
      const video = make('video', {
        src: `${item.src}#t=0.1`,
        preload: 'metadata',
        muted: true,
        playsInline: true,
        disablePictureInPicture: true
      });
      video.addEventListener('error', () => video.replaceWith(none()), { once: true });
      return video;
    };
    const src = item.thumb ?? item.poster;
    if (!src) return fallback();
    const img = make('img', {
      src,
      alt: '',
      loading: 'lazy',
      decoding: 'async',
      draggable: 'false'
    });
    img.addEventListener('error', () => img.replaceWith(fallback()), { once: true });
    return img;
  }
  *[Symbol.iterator]() {
    const arr = Array.from(this._mph_.groups.values());
    for (const group of arr) {
      yield group.pane;
    }
  }
}

class ConfigElement extends Base {
  /**
   * @type { { built: boolean; rows: { key: string; elem: HTMLInputElement; type: string; }[]; file?: HTMLInputElement } }
   */
  _mph_ = {
    built: false,
    rows: []
  };
  constructor() {
    super();
  }
  get built() {
    return this._mph_.built;
  }
  set built(bol) {
    this._mph_.built = bol;
  }
  get rows() {
    return this._mph_.rows;
  }
  get fileElement() {
    if (this._mph_.file) {
      return this._mph_.file;
    }
    this._mph_.file = make('input', 'hidden', { type: 'file', accept: '.json,application/json' });
    return this._mph_.file;
  }
  set fileElement(bol) {
    this._mph_.file = bol;
  }
  /**
   * Builds the settings page.
   */
  build() {
    if (typeof container === 'undefined') return;
    if (this.built) return;
    this.built = true;
    const savebtn = make('mph-btn', 'save', {
      textContent: i18n$('save'),
      role: 'button',
      tabIndex: 0,
      dataset: { command: 'save' },
      disabled: false
    });
    const resetbtn = make('mph-btn', 'reset', {
      textContent: i18n$('reset'),
      role: 'button',
      tabIndex: 0,
      dataset: { command: 'reset' }
    });
    const cbtn = make('mu-js', 'mph-sty-flex');
    cbtn.append(resetbtn, savebtn);
    /**
     * @param {string} name
     * @param {string} text
     * @param {boolean} [open]
     */
    const makesection = (name, text, open = false) => {
      const sec = make('mph-section', open ? '' : 'collapsed', {
        dataset: { command: 'section', name }
      });
      const lb = make('label');
      lb.append(make('mu-js', { textContent: text }));
      sec.append(lb);
      this.append(sec);
      return sec;
    };
    const sections = {
      general: makesection('general', i18n$('general'), true),
      theme: makesection('theme', i18n$('theme')),
      exp: makesection('exp', i18n$('import_export'))
    };
    /**
     * @param {HTMLElement} sec
     * @param {string} label
     * @param {string} key - Dotted path in the config
     * @param {"checkbox" | "number" | "text" | "select"} type
     * @param {Record<string, unknown>} [attrs]
     */
    const makeRow = (sec, label, key, type, attrs = {}) => {
      const [group, sub] = key.split('.');
      const get = () => (sub ? cfg[group][sub] : cfg[group]);
      /** @param {unknown} v */
      const set = (v) => {
        if (sub) {
          cfg[group][sub] = v;
        } else {
          cfg[group] = v;
        }
      };
      const lb = make('label', 'sub-section', { dataset: { config: key } });
      lb.append(make('mu-js', { textContent: label }));
      const { options, ...rest } = attrs;
      const inp = /** @type {HTMLInputElement} */ (
        type === 'select'
          ? make('select', { className: 'mph-select' })
          : make('input', { type, ...rest })
      );
      if (type === 'select') {
        for (const value of options)
          inp.append(make('option', { value, textContent: i18n$(value) }));
        inp.value = String(get());
        lb.append(inp);
        ael(inp, 'change', () => {
          set(inp.value);
          container.setTheme();
        });
      } else if (type === 'checkbox') {
        const inlab = make('mu-js', 'mph-inlab');
        inlab.append(inp, make('label', { onclick: () => inp.click() }));
        lb.append(inlab);
        inp.checked = !!get();
        ael(inp, 'change', () => {
          set(inp.checked);
          if (key === 'autoexpand') container.setExpanded(inp.checked);
        });
      } else {
        lb.append(inp);
        inp.value = String(get() ?? '');
        if (type === 'number') {
          ael(inp, 'input', () => {
            if (inp.validity.valid && !isEmpty(inp.value)) {
              dom.cl.remove(inp, 'mph-invalid');
              dom.prop(savebtn, 'disabled', false);
              set(parseFloat(inp.value));
            } else {
              dom.cl.add(inp, 'mph-invalid');
              dom.prop(savebtn, 'disabled', true);
            }
          });
        } else {
          inp.placeholder = getComputedStyle(container.frame)
            .getPropertyValue(`--${sub ?? key}`)
            .trim();
          ael(inp, 'change', () => {
            set(inp.value.trim());
            container.setTheme();
          });
        }
      }
      sec.append(lb);
      this.rows.push({ key, elem: inp, type });
      return lb;
    };
    if ($GM.isGM) makeRow(sections.general, i18n$('userjs_autoinject'), 'autoinject', 'checkbox');
    makeRow(sections.general, i18n$('userjs_fullscreen'), 'autoexpand', 'checkbox');
    makeRow(sections.general, i18n$('clear_tab_cache'), 'clearTabCache', 'checkbox');
    makeRow(sections.general, i18n$('position'), 'position', 'select', {
      options: ['auto', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
    });
    makeRow(sections.general, i18n$('limit_downloads'), 'limitDownloads', 'checkbox');
    makeRow(sections.general, i18n$('auto_hls'), 'autoHLS', 'checkbox');
    makeRow(sections.general, i18n$('native_player'), 'nativePlayer', 'checkbox');
    makeRow(sections.general, i18n$('concurrency'), 'concurrency', 'number', {
      min: 1,
      max: 16,
      step: 1
    });
    makeRow(sections.general, `${i18n$('dtime')} (ms)`, 'time', 'number', { min: 0, step: 500 });
    for (const k of Object.keys(DEFAULT_CONFIG.theme)) {
      makeRow(sections.theme, k, `theme.${k}`, 'text', { spellcheck: false });
    }
    for (const type of ['import', 'export']) {
      sections.exp.append(
        make('mph-btn', `mph-${type} sub-section`, {
          textContent: i18n$(`${type}_config`),
          role: 'button',
          tabIndex: 0,
          dataset: { command: `${type}-config` }
        })
      );
    }
    ael(this.fileElement, 'change', async () => {
      try {
        const file = this.fileElement.files?.[0];
        if (!file) return;
        const imported = sanitizeConfig(JSON.parse(await file.text()));
        cfg = { ...cfg, ...imported, theme: { ...cfg.theme, ...(imported.theme ?? {}) } };
        this.reload();
        msg('Config imported, press save to keep it', 4000);
      } catch (ex) {
        container.showError(new Error(`Failed to import config: ${errMsg(ex)}`, { cause: ex }));
      } finally {
        this.fileElement.value = '';
      }
    });
    sections.exp.append(this.fileElement);
    const about = make('mu-js', 'mph-sty-flex about');
    const { script } = $GM.info;
    for (const [text, webpage] of [
      [
        `GitHub (v${script.version})`,
        script.namespace ?? 'https://github.com/magicoflolis/Magic-PH'
      ],
      [i18n$('issue'), script.bugs ?? 'https://github.com/magicoflolis/Magic-PH/issues']
    ]) {
      about.append(
        make('mph-a', {
          textContent: text,
          role: 'button',
          tabIndex: 0,
          dataset: { command: 'open-tab', webpage }
        })
      );
    }
    this.append(cbtn, about);
  }
  /**
   * Refreshes the settings page after `cfg` was replaced.
   */
  reload() {
    if (!this.built) return;
    if (typeof container === 'undefined') return;
    for (const row of this.rows) {
      const value = row.key.split('.').reduce((o, k) => o?.[k], cfg);
      if (row.type === 'checkbox') {
        row.elem.checked = !!value;
      } else {
        row.elem.value = value ?? '';
      }
    }
    return container.setTheme();
  }
}

class Tile extends Base {
  _mph_ = {
    /** @type {MediaItem} */
    item: {}
  };
  constructor() {
    super();
  }
  /**
   * A thumbnail: opens the viewer, or builds the video when the browser cannot play the HLS stream.
   * Tiles that cannot do anything have no buttons.
   * @param {MediaItem} item
   * @param {PostEntry} entry
   */
  render(item, entry) {
    const playable = MainBody.playable(item);
    const command = playable ? 'view-media' : !isEmpty(item.stream) ? 'load-ts' : '';
    this.title = item.drm ? i18n$('drm_notice') : item.title;
    this.dataset.id = item.id;
    this.dataset.type = item.type;
    if (command) {
      Object.assign(this.dataset, { command });
      this.setAttribute('role', 'button');
      this.tabIndex = 0;
    }
    this.append(MainBody.thumbnail(item));
    if (item.preview) {
      this.append(make('mph-elem', 'badge top', { textContent: i18n$('free_preview') }));
    }
    const badge = make('mph-elem', 'badge');
    if (item.drm) {
      badge.textContent = 'DRM';
      badge.classList.add('drm');
    } else if (item.label) {
      badge.textContent = item.label;
    } else if (item.type === 'video') {
      IconSVG.load('video', badge);
      if (item.duration) badge.append(document.createTextNode(` ${item.duration}`));
    } else if (item.type !== 'photo') {
      badge.textContent = item.type.toUpperCase();
    }
    if (badge.hasChildNodes()) this.append(badge);
    const actions = make('mph-elem', 'tile-actions');
    if (item.stream && !playable) {
      actions.append(MainBody.tileBtn('download', 'load-ts', i18n$('hls_load'), { id: item.id }));
    } else if (item.src) {
      actions.append(
        MainBody.tileBtn('download', 'download-video', i18n$('download'), { id: item.id })
      );
    }
    if (item.src && !item.blob) {
      actions.append(MainBody.tileBtn('copy', 'copy', i18n$('copy'), { id: item.id }));
    }
    if (entry.post.variant === 'post') {
      actions.append(MainBody.tileBtn('remove', 'of-remove', i18n$('remove'), { id: item.id }));
    }
    if (actions.hasChildNodes()) this.append(actions);
  }
  /**
   * @param {MediaItem} [item]
   * @param {number} i
   */
  renderViewer(item, i) {
    if (!item) return;
    const src = item.thumb ?? item.poster;
    if (src) {
      const img = make('img', { src, alt: '' });
      img.setAttribute('draggable', 'false');
      this.append(img);
    } else if (!item.label) this.textContent = String(i + 1);
    if (item.label) this.append(make('mph-elem', 'thumb-label', { textContent: item.label }));
    this._mph_ = item;
  }
  /**
   * @param {PostEntry} entry
   * @param {MediaGroup} group
   * @param {string} id
   * @param {PostMedia} m
   */
  addItem(entry, group, id, m) {
    /** @type {MediaItem} */
    const item = {
      id,
      src: m.src ?? '',
      title: m.name ?? `${entry.post.user.username || entry.post.user.name}-${m.id}`,
      group: group.key,
      post: entry.key,
      type: m.type,
      label: m.label,
      blob: m.blob,
      stream: m.stream,
      drm: m.drm,
      data: m.data ?? {},
      ext: m.ext ?? MainBody.extFromURL(m.src ?? '', m.type === 'photo' ? 'jpg' : 'mp4'),
      poster: m.poster,
      thumb: m.thumb,
      duration: m.duration,
      preview: m.preview,
      el: this
    };
    this._mph_.item = item;
    this._mph_.entry = entry;
    this._mph_.group = group;
    this._mph_.id = id;
    this._mph_.m = m;
    this.render(item, entry);
    if (entry.grid) {
      if (entry.grid.childElementCount < 4 || m.label === 'HLS') entry.grid.append(this);
    }
    entry.ids.add(id);
    group.items.add(id);
    return item;
  }
}

/**
 * Tab strip. Every tab is identified by `dataset.host`.
 *
 * - `about:blank` is the "new tab", it accepts a URL / video id
 * - `mujs:<name>` are internal pages, e.g. `mujs:settings`
 * - anything else is a group of videos
 */
class Toolbar extends Base {
  /**
   * @type { { events: Set<{ type: keyof tabEvents; listener: tabEvents[keyof tabEvents];}>; pool: Set<HTMLElement>; protocal: "mujs:"; protoReg: RegExp | undefined; el: { add?: HTMLElement; head?: HTMLElement; [key: string]: HTMLElement; }; } }
   */
  _mph_ = {
    events: new Set(),
    pool: new Set(),
    protocal: 'mujs:',
    protoReg: undefined,
    el: {
      add: undefined,
      head: undefined
    }
  };
  constructor() {
    super();
    defer(() => {
      this.root.append(this.newTab);
      ael(
        this.root,
        'wheel',
        (e) => {
          const r = this.root;
          if (e.deltaX !== 0 || r.scrollWidth <= r.clientWidth) return;
          e.preventDefault();
          r.scrollLeft += e.deltaY;
        },
        { passive: false }
      );
      this.append(this.root);
    });
  }
  get protoReg() {
    if (this._mph_.protoReg) return this._mph_.protoReg;
    this._mph_.protoReg = new RegExp(`${this._mph_.protocal}(.+)`, 'i');
    return this._mph_.protoReg;
  }
  get newTab() {
    if (this._mph_.el.add) return this._mph_.el.add;
    this._mph_.el.add = make('tab-add', {
      textContent: '+',
      title: i18n$('newTab'),
      dataset: {
        command: 'new-tab'
      }
    });
    return this._mph_.el.add;
  }
  get root() {
    if (this._mph_.el.head) return this._mph_.el.head;
    this._mph_.el.head = make('tab-root');
    return this._mph_.el.head;
  }
  get pool() {
    try {
      return toArray(this._mph_.pool).filter((e) => !isNull(e));
    } catch {
      return [];
    }
  }
  get _active() {
    try {
      return this.pool.find(({ classList }) => classList.contains('active')) || null;
    } catch {
      return null;
    }
  }
  isBlank(tab = this._active) {
    if (isElem(tab)) {
      return tab.dataset.host === BLANK_PAGE;
    }
    return true;
  }
  /**
   * @template H
   * @param {H} hostname
   */
  getTab(hostname) {
    try {
      const host = this.validate(hostname);
      return this.pool.find(({ dataset }) => dataset.host === host) || null;
    } catch {
      return null;
    }
  }
  /**
   * @template H
   * @param {H} hostname
   */
  validate(hostname) {
    if (typeof hostname === 'string') {
      return hostname;
    } else if (hostname instanceof URL || hostname instanceof Location) {
      return hostname.toString();
    }
    return '';
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {tabEvents[K]} listener
   */
  addListener(type, listener) {
    this._mph_.events.add({ type, listener });
  }
  /**
   * @template {keyof tabEvents} K
   * @param {K} type
   * @param {...unknown} args
   */
  _dispatch(type, ...args) {
    for (const evt of [...this._mph_.events].filter((event) => event.type === type)) {
      try {
        if (isFN(evt.listener)) {
          /** @type {Function} */ (evt.listener).call(this, ...args);
        }
      } catch (ex) {
        con.err(ex);
      }
    }
  }
  /**
   * Handles internal protocols
   * @template H
   * @param {H} hostname
   */
  intFN(hostname) {
    const h = this.validate(hostname);
    const [, host] = this.protoReg.exec(h) || [];
    this._dispatch('internal', host, h);
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   * @param {boolean} [build]
   */
  active(tab, build = true) {
    if (isElem(tab)) {
      if (!this._mph_.pool.has(tab)) {
        this._mph_.pool.add(tab);
      }
      this._dispatch('active', tab, build);
    }
  }
  /**
   * @template {HTMLElement} T
   * @param {T} tab
   */
  close(tab) {
    if (isElem(tab)) {
      this._mph_.pool.delete(tab);
      this._dispatch('close', tab);
      tab.remove();
    }
  }
  /**
   * @param {string} [hostname] - `undefined` creates a "new tab"
   * @param {string} [title] - Label of the tab
   * @param {boolean} [activate] - Switch to the tab
   */
  create(hostname = undefined, title = undefined, activate = true) {
    if (typeof hostname === 'string') {
      const createdTab = this.getTab(hostname);
      if (createdTab) {
        if (activate) this.active(createdTab);
        return createdTab;
      }
    }
    const tab = make('tab-content', {
      dataset: {
        command: 'switch-tab'
      },
      style: `order: ${this.root.childElementCount};`
    });
    const tabClose = make('tab-close', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabHost = make('tab-host');
    tab.append(tabHost, tabClose);
    const [, host] = this.protoReg.exec(hostname ?? '') ?? [];
    if (isNull(hostname)) {
      tab.dataset.host = BLANK_PAGE;
      tabHost.title = tabHost.textContent = i18n$('newTab');
    } else if (host) {
      tab.dataset.host = hostname;
      tabHost.title = tabHost.textContent = i18n$(host);
    } else {
      tab.dataset.host = hostname;
      tabHost.title = tabHost.textContent = title ?? hostname;
    }
    this.root.append(tab);
    this._mph_.pool.add(tab);
    if (activate) this.active(tab, true);
    return tab;
  }
}

/**
 * Every custom element of this UserJS, defined once through `defineElement`
 */
const customElementMap = new Map([
  ['mph-userjs', MainUserJS],
  ['mph-root', Root],
  ['mph-post', Post],
  ['mph-list', List],
  ['mph-body', MainBody],
  ['mph-config', ConfigElement],
  ['mph-toolbar', Toolbar],
  ['mph-tile', Tile]
]);
for (const [name, constructor] of customElementMap.entries()) {
  try {
    window.customElements.define(name, constructor);
  } catch (e) {
    con.err(e);
  }
}
//#endregion
//#region Media
/**
 * HTTP Live Streaming, merges the segments of a playlist into a single file.
 */
class mphHLS {
  /**
   * @param {string[]} playlists - URLs of the (master) playlist, mirrors are tried in order
   * @param {Record<string, unknown>} [data] - Request options
   * @param {?HTMLElement} [$el] - Element that displays the progress
   * @param {string} [root] - Website "root" name
   */
  constructor(playlists, data = {}, $el = null, root = container.root.root) {
    this.urls = playlists;
    this.data = data;
    this.$el = $el;
    /** File extension of the merged file */
    this.ext = 'ts';
    /** Use the userscript manager for segments, `fetch` is usually blocked by CORS */
    this.viaGM = /xhamster/.test(root);
  }
  /**
   * Resolves a playlist entry against the playlist that lists it.
   * @param {string} ref
   * @param {string} from
   */
  resolve(ref, from) {
    return toURL(ref, from).href.replace(/m3u8\/\//g, 'm3u8/');
  }
  /**
   * @param {string} playlistURL
   * @returns {Promise<string>}
   */
  async req(playlistURL, responseType = 'text') {
    return await Network.req(playlistURL, 'GET', responseType, this.data);
  }
  /**
   * Reads a playlist: every line that is not a tag is a URI (RFC 8216), of a variant in a master playlist
   * or of a segment in a media playlist.
   * @param {string} text
   */
  static parse(text) {
    /** @type {{ uri: string; height: number; bandwidth: number }[]} */
    const variants = [];
    /** @type {string[]} */
    const segments = [];
    let map;
    let encrypted = false;
    let info = '';
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (line.startsWith('#EXT-X-STREAM-INF:')) {
        info = line;
      } else if (line.startsWith('#EXT-X-MAP:')) {
        map = /URI="([^"]+)"/.exec(line)?.[1];
      } else if (line.startsWith('#EXT-X-KEY:')) {
        encrypted ||= !/METHOD=NONE/i.test(line);
      } else if (line && !line.startsWith('#')) {
        if (info) {
          variants.push({
            uri: line,
            height: +(/RESOLUTION=\d+x(\d+)/.exec(info)?.[1] ?? /(\d+)p/.exec(line)?.[1] ?? 0),
            bandwidth: +(/BANDWIDTH=(\d+)/.exec(info)?.[1] ?? 0)
          });
          info = '';
        } else {
          segments.push(line);
        }
      }
    }
    variants.sort((a, b) => b.height - a.height || b.bandwidth - a.bandwidth);
    return { variants, segments, map, encrypted };
  }
  /**
   * Downloads a single segment, retries on failure.
   * @param {string} segmentURL
   * @returns {Promise<BlobPart[]>}
   */
  async segment(segmentURL) {
    /** @type {unknown} */
    let last;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (!this.viaGM) {
          try {
            return (await Network.fetchChunks(segmentURL, this.data)).chunks;
          } catch (ex) {
            if (!$GM.isGM) throw ex;
            this.viaGM = true;
          }
        }
        return [await Network.gmBlob(segmentURL, this.data)];
      } catch (ex) {
        last = ex;
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
    throw last;
  }
  /**
   * Merges a media playlist into a single file, throws when a single segment fails.
   * @param {ReturnType<typeof mphHLS.parse>} playlist
   * @param {string} playlistURL
   */
  async merge(playlist, playlistURL) {
    if (isEmpty(playlist.segments)) throw new Error('No segments found', { cause: 'mphHLS.merge' });
    /** @type {BlobPart[]} */
    const parts = [];
    if (playlist.map) {
      // fMP4: the initialization segment comes first
      this.ext = 'mp4';
      parts.push(...(await this.segment(this.resolve(playlist.map, playlistURL))));
    }
    const name = playlistURL.split(/[/?]/).filter(Boolean).pop() ?? playlistURL;
    const frags = playlist.segments.map((s) => this.resolve(s, playlistURL));
    const limit = cfg?.limitDownloads || isMobile ? 1 : Math.max(1, Number(cfg?.concurrency) || 4);
    let done = 0;
    if (playlist.encrypted) {
      const encryptedHls = async (m3u8Url) => {
        // parse segment URLs (absolute or relative)
        const base = toURL(m3u8Url);
        const text = (await this.req(base)).trim();
        // parse key + IV
        const keyLine = text.match(/#EXT-X-KEY:([^\n]+)/)[1];
        const keyUri = keyLine.match(/URI="([^"]+)"/)[1];
        const ivHex = keyLine.match(/IV=0x([0-9a-fA-F]+)/)[1];
        const iv = new Uint8Array(ivHex.match(/../g).map((b) => parseInt(b, 16)));
        const segs = text
          .split('\n')
          .filter((l) => l && !l.startsWith('#'))
          .map((l) => toURL(l.trim(), base).href);

        /**
         * Get key
         * @type {ArrayBuffer}
         */
        const keyBuf = await this.req(
          keyUri.includes('//') ? keyUri : toURL(keyUri, base),
          'arraybuffer'
        );
        const cryptoKey = await crypto.subtle.importKey('raw', keyBuf, { name: 'AES-CBC' }, false, [
          'decrypt'
        ]);

        const parts = [];
        for (const url of segs) {
          /**
           * @type {ArrayBuffer}
           */
          const enc = await this.req(url, 'arraybuffer');
          const dec = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, enc);
          parts.push(new Uint8Array(dec));
          done++;
          msg(`Merging decrypted segments for "${name}" (${done}/${frags.length})`);
        }
        const total = parts.reduce((n, p) => n + p.length, 0);
        const out = new Uint8Array(total);
        let off = 0;
        for (const p of parts) {
          out.set(p, off);
          off += p.length;
        }
        return new Blob([out], { type: 'video/mp2t' });
      };
      return await encryptedHls(playlistURL).catch(con.err);
    }
    const chunks = await runPool(frags, limit, async (f) => {
      const part = await this.segment(f);
      done++;
      if (this.$el) this.$el.textContent = `${done}/${frags.length}`;
      msg(`Merging segments for "${name}" (${done}/${frags.length})`);
      return part;
    });
    parts.push(...chunks.flat());
    return new Blob(parts, { type: this.ext === 'mp4' ? 'video/mp4' : 'video/mp2t' });
  }
  /**
   * Builds the best quality that works, the next one is tried when a quality fails.
   * @returns {Promise<?Blob>} `null` on failure
   */
  async start() {
    msg('Creating cache using "Fetch API"', 2500);
    /** @type {unknown} */
    let last = new Error('No playlist', { cause: 'mphHLS.start' });
    for (const url of this.urls) {
      try {
        return await this.build(url);
      } catch (ex) {
        last = ex;
        con.err(ex);
      }
    }
    msg(`Error occured while creating cache: ${errMsg(last)}`, 4000);
    return null;
  }
  /**
   * Builds the best quality of a playlist that works, the next one is tried when a quality fails.
   * @param {string} url
   * @returns {Promise<Blob>}
   */
  async build(url) {
    let base = url;
    let text = (await this.req(base)).trim();
    if (text.startsWith('[{')) {
      // Pornhub lists the playlists as JSON
      const hls = JSON.parse(text).find((e) => e.format === 'hls' && e.defaultQuality);
      base = hls?.videoUrl;
      text = (await this.req(base)).trim();
    }
    const master = mphHLS.parse(text);
    let last = new Error('No qualities found', { cause: 'mphHLS.build' });
    for (const uri of master.variants.length ? master.variants.map((v) => v.uri) : [null]) {
      try {
        const playlistURL = uri ? this.resolve(uri, base) : base;
        const playlist = uri ? mphHLS.parse((await this.req(playlistURL)).trim()) : master;
        msg(`Building cache for "${playlistURL.split(/[/?]/).filter(Boolean).pop()}"`);
        const blob = await this.merge(playlist, playlistURL);
        msg('Cache complete!', 2500);
        return blob;
      } catch (ex) {
        last = ex;
        con.err(ex);
      }
    }
    throw last;
  }
}
//#endregion
//#region Container
class Container {
  /** @type {?MainUserJS} */
  #frame = null;
  /** @type {?Root} */
  #root = null;
  /** @type {Set<string>} */
  #errors = new Set();
  /** Frame is fully visible */
  opacityMax = '1';
  /** Frame is idle */
  opacityMin = '0.4';
  elementsReady = false;
  /** @type {?HTMLElement} */
  viewer = null;
  viewerIndex = 0;
  /** @type {string[]} */
  viewerList = [];
  timeouts = {
    frame: new Timeout(),
    toast: new Timeout()
  };
  constructor() {
    this.webpage = url;
    this.host = getHostname(url.hostname);
    con.onError = (...msg) => this.showError(...msg);
    window.addEventListener('pagehide', this, false);
  }
  /**
   * The element inserted into the page.
   * @returns {MainUserJS}
   */
  get frame() {
    if (this.#frame) return this.#frame;
    this.#createFrame();
    return this.#frame;
  }
  /**
   * Root of the interface, lives inside the shadow tree.
   * @returns {Root}
   */
  get root() {
    if (this.#root) return this.#root;
    this.#createFrame();
    return this.#root;
  }
  #createFrame() {
    this.#frame = make('mph-userjs');
    this.#root = this.#frame._mph_.root;
  }
  /**
   * Builds the interface, safe to call multiple times.
   */
  init() {
    if (this.elementsReady) return true;
    try {
      //#region Elements
      this.toastElem = make('mph-toast');
      this.mainframe = make('mph-frame', 'mainframe', {
        title: 'Magic PH',
        style: `opacity: ${this.opacityMax};`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'toggle-list' }
      });
      this.mainbtn = make('count-frame', 'mainbtn', { textContent: '0' });
      IconSVG.load('download', this.mainframe);
      this.mainframe.append(this.mainbtn);
      this.urlBar = make('input', 'mph-url-bar', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('search_placeholder')
      });
      this.footer = make('mph-row', 'mph-footer');
      /** @type {Toolbar} */
      this.toolbar = make('mph-toolbar');
      this.header = make('mph-header');
      /** @type {MainBody} */
      this.library = make('mph-body');
      this.main = make('mph-main', 'hidden');
      this.urlContainer = make('mph-url');
      this.btnHandles = make('mph-column', 'btn-handles');
      /** @type {ConfigElement} */
      this.cfgpage = make('mph-config', 'hidden');
      this.emptyElem = make('mph-empty', { textContent: i18n$('empty') });
      /**
       * @param {string} cls
       * @param {string} title
       * @param {string} command
       * @param {string} icon
       * @param {Record<string, string>} [dataset]
       */
      const button = (cls, title, command, icon, dataset = {}) => {
        const btn = make('mph-btn', cls, {
          title,
          role: 'button',
          tabIndex: 0,
          dataset: { command, ...dataset }
        });
        IconSVG.load(icon, btn);
        return btn;
      };
      this.btnHide = button('hide-list', i18n$('min'), 'hide-list', 'minus');
      this.btnfullscreen = button('fullscreen', i18n$('max'), 'fullscreen', 'expand');
      this.closebtn = button('close', i18n$('close'), 'close', 'close');
      this.btncfg = button('settings', i18n$('settings'), 'settings', 'gear');
      this.ofHeader = make('mph-row', 'of-actions hidden');
      this.ofdwn = make('mph-btn', 'of_btn', {
        title: i18n$('download_all'),
        textContent: `${i18n$('download')} (0)`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'of-download-all' }
      });
      this.ofrm = make('mph-btn', 'of_btn', {
        title: i18n$('remove_all'),
        textContent: `${i18n$('remove')} (0)`,
        role: 'button',
        tabIndex: 0,
        dataset: { command: 'of-remove-all' }
      });
      this.ofHeader.append(this.ofdwn, this.ofrm);
      //#endregion
      // Always in the toolbar, next to the tabs, on every screen size
      this.btnHandles.append(this.btncfg, this.btnHide, this.btnfullscreen, this.closebtn);
      this.toolbar.append(this.btnHandles);
      this.urlContainer.append(this.urlBar);
      this.header.append(this.urlContainer, this.ofHeader);
      this.library.append(this.emptyElem, this.cfgpage);
      this.main.append(this.toolbar, this.header, this.library, this.footer);
      this.root.append(this.toastElem, this.mainframe, this.main);
      this.#bindTabs();
      this.#bindEvents();
      this.setTheme();
      this.elementsReady = true;
    } catch (ex) {
      con.err(ex);
      this.elementsReady = false;
    }
    return this.elementsReady;
  }
  #bindTabs() {
    if (!this.library || !this.toolbar) return;
    const { library: L, toolbar: T } = this;
    T.addListener('active', (tab) => {
      const host = tab.dataset.host ?? BLANK_PAGE;
      dom.cl.remove(T.pool, 'active').add(tab, 'active');
      tab.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
      dom.cl.add([this.cfgpage, this.emptyElem, ...Array.from(L)], 'hidden');
      this.urlBar.value = '';
      this.applyFilter('');
      if (host === BLANK_PAGE) {
        this.urlBar.placeholder = i18n$('newTab');
        this.emptyElem.textContent = i18n$('newtab_hint');
        dom.cl.remove(this.emptyElem, 'hidden');
        this.urlBar.focus?.({ preventScroll: true });
      } else if (host.startsWith(T._mph_.protocal)) {
        T.intFN(host);
      } else {
        this.urlBar.placeholder = i18n$('search_placeholder');
        dom.cl.remove(L.groups.get(host)?.pane ?? [], 'hidden');
      }
    });
    T.addListener('internal', (host) => {
      if (host === 'settings') {
        this.cfgpage.build();
        this.urlBar.placeholder = i18n$('search_settings');
        dom.cl.remove(this.cfgpage, 'hidden');
      }
    });
    T.addListener('close', (tab) => {
      const host = tab.dataset.host ?? BLANK_PAGE;
      const group = L.groups.get(host);
      if (group) {
        if (cfg.clearTabCache) {
          L.removeGroup(host);
        } else {
          group.tab = null;
        }
      }
      if (tab.classList.contains('active')) {
        const sibling = /** @type {?HTMLElement} */ (
          [tab.nextElementSibling, tab.previousElementSibling].find(
            (e) => e?.localName === 'tab-content'
          )
        );
        if (sibling) {
          T.active(sibling);
        } else {
          dom.cl.add(Array.from(L), 'hidden');
          this.emptyElem.textContent = L.items.size ? i18n$('newtab_hint') : i18n$('empty');
          dom.cl.remove(this.emptyElem, 'hidden');
        }
      }
      L.updateCounts();
    });
  }
  #bindEvents() {
    const { root, mainframe } = this;
    ael(root, 'click', (evt) => {
      this.handleClick(/** @type {MouseEvent} */ (evt)).catch((ex) => this.showError(ex));
    });
    ael(root, 'auxclick', (evt) => {
      // Middle click closes a tab
      if (evt.button !== 1) return;
      const tab = evt.target?.closest?.('tab-content');
      if (tab) {
        evt.preventDefault();
        this.toolbar.close(tab);
      }
    });
    ael(root, 'keydown', (e) => {
      const target = e.target;
      if (this.viewerOpen) {
        if (e.key === 'Escape') this.closeViewer();
        else if (e.key === 'ArrowLeft') this.showMedia(this.viewerIndex - 1);
        else if (e.key === 'ArrowRight') this.showMedia(this.viewerIndex + 1);
        else return;
        e.preventDefault();
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && target?.closest?.('[data-command]')) {
        if (!/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
          e.preventDefault();
          target.click();
        }
      } else if (e.key === 'Escape' && !dom.cl.has(this.main, 'hidden')) {
        this.hidePanel();
      }
    });
    if (!isMobile) {
      ael(mainframe, 'mouseenter', () => {
        this.timeouts.frame.clearAll();
        mainframe.style.opacity = this.opacityMax;
      });
      ael(mainframe, 'mouseleave', () => this.fade());
    }
    ael(this.urlBar, 'input', () => {
      if (this.toolbar.isBlank()) return;
      this.applyFilter(this.urlBar.value);
    });
    ael(this.urlBar, 'change', () => {
      if (!this.toolbar.isBlank()) return;
      const tab = this.toolbar._active;
      const value = this.urlBar.value.trim();
      if (isEmpty(value)) return;
      const target = Container.resolveInput(value);
      if (!target) throw new Error(`Unsupported URL or id: "${value}"`, { cause: 'loadFromInput' });
      if (target.path) {
        if (!this.root.navigate(target.path)) {
          throw new Error('Please navigate to "onlyfans.com"', { cause: 'loadFromInput' });
        }
        this.toolbar.close(tab);
        return;
      }
      if (target.url.includes('onlyfans')) {
        if (!this.root.router) {
          throw new Error('Please navigate to "onlyfans.com"', { cause: 'loadFromInput' });
        }
        this.toolbar.close(tab);
        return;
      }
      this.root.current = target.url;
      runSite()
        .catch((ex) => this.showError(ex))
        .finally(() => this.toolbar.close(tab));
    });
  }
  /**
   * Hides every row that does not contain `text`.
   * @param {string} text
   */
  applyFilter(text) {
    if (typeof text === 'string') {
      const needle = text.trim().toLowerCase();
      for (const { el } of this.library.posts.values()) {
        if (!el) continue;
        const hit = isEmpty(needle) || (el.dataset.search ?? '').includes(needle);
        el.classList.toggle('hidden', !hit);
      }
    }
  }
  /**
   * @param {Event} event
   */
  handleEvent(event) {
    if (event.type === 'pagehide' && !(/** @type {PageTransitionEvent} */ (event).persisted)) {
      this.library.clear();
    }
  }
  /**
   * Adds the interface to the page.
   */
  inject() {
    if (!this.init()) return;
    if (this.frame.injected) return;
    const parent = document.documentElement;
    if (parent && !parent.contains(this.frame)) parent.append(this.frame);
    if (cfg.autoexpand) this.setExpanded(true);
    this.fade();
  }
  /**
   * Removes the interface and frees every video.
   */
  remove() {
    this.library.clear();
    this.timeouts.frame.clearAll();
    this.timeouts.toast.clearAll();
    dom.remove(this.#frame);
    return this;
  }
  /**
   * Applies the site palette + the theme of the user.
   */
  setTheme() {
    const { style } = this.frame;
    const base = { ...this.root.palette, ...Root.placement(cfg?.position, this.root.root) };
    for (const [k, v] of Object.entries(base)) style.setProperty(`--${k}`, v);
    // The panel opens on the side of the button
    this.root.dataset.side = base['mph-position-left'] === 'auto' ? 'right' : 'left';
    for (const [k, v] of Object.entries(cfg?.theme ?? {})) {
      if (typeof v === 'string' && !isEmpty(v)) {
        style.setProperty(`--${k}`, v);
      } else if (!(k in base)) {
        style.removeProperty(`--${k}`);
      }
    }
    return this;
  }
  /**
   * @param {boolean} [expanded]
   */
  setExpanded(expanded) {
    const { btnfullscreen, main } = this;
    const on = expanded ?? !dom.cl.has(main, 'expanded');
    dom.cl[on ? 'add' : 'remove']([btnfullscreen, main], 'expanded');
    btnfullscreen.textContent = '';
    IconSVG.load(on ? 'collapse' : 'expand', btnfullscreen);
    return on;
  }
  showPanel() {
    this.inject();
    dom.cl.remove(this.main, 'hidden').add(this.mainframe, 'hidden');
    if (cfg.autoexpand) this.setExpanded(true);
    return this;
  }
  hidePanel() {
    dom.cl.add(this.main, 'hidden').remove(this.mainframe, 'hidden');
    this.fade();
    return this;
  }
  /**
   * Fades the floating button after `cfg.time` ms, `0` keeps it visible.
   * @param {number} [time]
   */
  async fade(time = cfg?.time) {
    const { frame } = this.timeouts;
    frame.clearAll();
    this.mainframe.style.opacity = this.opacityMax;
    if (typeof time !== 'number' || !(time > 0)) return;
    await frame.set(time);
    this.mainframe.style.opacity = this.opacityMin;
  }
  /**
   * Notice in the top corner of the page.
   * @param {string | number} [text] - `undefined` hides the notice
   * @param {number} [time] - Hide after `time` ms, defaults to 10 seconds of inactivity
   */
  async toast(text, time) {
    const { toast } = this.timeouts;
    toast.clearAll();
    if (text === undefined || (typeof text === 'number' && time === undefined)) {
      if (typeof text === 'number') await toast.set(text);
      this.toastElem?.classList.remove('show');
      return this;
    }
    if (!this.init()) return this;
    this.inject();
    this.toastElem.textContent = String(text);
    this.toastElem.classList.add('show');
    await toast.set(time ?? 10000);
    this.toastElem.classList.remove('show');
    return this;
  }
  /**
   * Displays errors in the footer, every message is only displayed once.
   * @param {...unknown} ex
   */
  showError(...ex) {
    if (!this.elementsReady) return this;
    let str = '';
    for (const e of ex) {
      if (e instanceof Error) {
        str += `${e.message}${'cause' in e && e.cause ? ` Caused by: "${e.cause}"` : ''}\n`;
      } else if (isObj(e)) {
        try {
          str += JSON.stringify(e) + '\n';
        } catch {
          /* empty */
        }
      } else if (typeof e === 'string') {
        str += `${e}\n`;
      }
    }
    str = str.trim();
    if (isEmpty(str) || this.#errors.has(str)) return this;
    this.#errors.add(str);
    const error = make('mu-js', 'error', {
      title: i18n$('close'),
      onclick: () => {
        error.remove();
        this.#errors.delete(str);
      }
    });
    error.append(document.createTextNode(str));
    this.footer.append(error);
    this.toast(str.split('\n')[0], 5000).catch(BLANK_FN);
    return this;
  }
  /**
   * Refreshes the button, the bulk actions of OnlyFans (only when there is something to act on) and the empty page.
   */
  updateCounters() {
    if (!this.elementsReady) return;
    const active = this.toolbar._active;
    const { library } = this;
    const media = active
      ? toArray(library.posts.keys()).filter((k) => k.includes(active.dataset.host ?? '')).length
      : library.groups.size;
    this.mainbtn.textContent = String(library.count);
    this.ofdwn.textContent = `${i18n$('download')} (${media})`;
    this.ofrm.textContent = `${i18n$('remove')} (${media})`;
    this.ofHeader.classList.toggle('hidden', media === 0);
    this.ofdwn.classList.toggle('hidden', media === 0);
    if (active === null) {
      this.emptyElem.textContent = library.groups.size ? i18n$('newtab_hint') : i18n$('empty');
    }
  }
  //#region Commands
  /**
   * @param {MouseEvent} evt
   */
  async handleClick(evt) {
    if (!evt.target) return;
    /** @type {?HTMLElement} */
    const target = evt.target.closest('[data-command]');
    if (!target) return;
    const { dataset } = target;
    const cmd = dataset.command ?? '';
    const item = dataset.id ? this.library.items.get(dataset.id) : undefined;
    const { toolbar: T, library: L } = this;
    switch (cmd) {
      case 'toggle-list':
        this.showPanel();
        break;
      case 'hide-list':
        this.hidePanel();
        break;
      case 'close':
        this.closeViewer();
        this.setExpanded(false);
        this.hidePanel();
        break;
      case 'fullscreen':
        this.setExpanded();
        break;
      case 'settings':
        T.create('mujs:settings');
        break;
      case 'open-tab':
        if (dataset.webpage) $GM.openInTab(dataset.webpage);
        break;
      case 'new-tab':
        T.create();
        break;
      case 'switch-tab':
        T.active(target);
        break;
      case 'close-tab':
        if (target.parentElement) T.close(target.parentElement);
        break;
      case 'section': {
        target.classList.toggle('collapsed');
        break;
      }
      case 'save':
        if (!dom.prop(target, 'disabled')) await this.save();
        break;
      case 'reset':
        cfg = copyObject(DEFAULT_CONFIG);
        this.cfgpage.reload();
        break;
      case 'export-config':
        saveAs(
          new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' }),
          'magicph-config.json'
        );
        break;
      case 'import-config':
        this.cfgpage.fileElement.click();
        break;
      case 'copy':
        if (item) await this.copyItem(item);
        break;
      case 'download-video':
        if (item) await this.downloadItem(item);
        break;
      case 'load-ts':
        await this.loadHLS(dataset.id ?? '');
        break;
      case 'view-media':
        if (item) await this.viewMedia(item);
        break;
      case 'viewer-close':
        this.closeViewer();
        break;
      case 'viewer-prev':
        this.showMedia(this.viewerIndex - 1);
        break;
      case 'viewer-next':
        this.showMedia(this.viewerIndex + 1);
        break;
      case 'viewer-goto':
        this.showMedia(Number(dataset.index));
        break;
      case 'post-download': {
        await this.downloadAll(L.media.filter((i) => i.post === dataset.post));
        break;
      }
      case 'post-copy': {
        const urls = L.media.filter((i) => i.post === dataset.post).map((i) => i.src);
        if (urls.length && (await $GM.setClipboard(urls.join('\n'))))
          msg('Copied URLs to Clipboard', 2500);
        break;
      }
      case 'post-remove':
        L.removePost(dataset.post ?? '');
        break;
      case 'of-remove':
        if (item && L.removeItem(item.id)) {
          msg(`Deleted Video Id: ${item.title}`, 2500);
        }
        break;
      case 'of-open':
        if (dataset.webpage && !this.root.navigate(dataset.webpage)) {
          $GM.openInTab(toURL(dataset.webpage, Page.location.origin).href);
        }
        break;
      case 'of-copy-all': {
        const urls = L.media.map((i) => i.src);
        if (urls.length && (await $GM.setClipboard(urls.join('\n')))) {
          msg('Copied URLs to Clipboard', 2500);
        }
        break;
      }
      case 'of-download-all':
        await this.downloadAll();
        break;
      case 'of-remove-all':
        for (const g of toArray(L.posts, { keys: true })) L.removePost(g);
        break;
      default:
        break;
    }
  }
  /**
   * Opens a tile in the viewer.
   *
   * A `viewerOnly` tile only knows the page of its video: the page is fetched first and the card is
   * updated with what it holds (qualities, HLS, poster, title...), then the viewer opens on it.
   * @param {MediaItem} item
   */
  async viewMedia(item) {
    const { el } = item;
    if (!el?._mph_?.m?.viewerOnly) {
      this.openViewer(item.id);
      return;
    }
    // A click while the page is being fetched would fetch it twice
    if (el.dataset.fetching) return;
    el.dataset.fetching = 'true';
    const { library: L, root: R } = this;
    const { post } = el._mph_.entry;
    msg(`Loading from source: "${item.src}"`, 2500);
    try {
      // `find(input)` replaces the site context of the page (router included), it only reads it
      // before its first `await`, so it is given back right away: other clicks and the viewer keep
      // the page's own context, even while several tiles are loading
      R._mph_ = R.current;
      const data = await R.find(item.src);
      const updated = L.addVideo(
        {
          ...data,
          id: post.id,
          groupKey: post.groupKey,
          groupTitle: post.groupTitle
        },
        true
      );
      if (!updated) throw new Error('Nothing playable was found on the page');
      const entry = L.posts.get(item.post);
      const first = entry?.ids.values().find((id) => MainBody.playable(L.items.get(id)));
      if (first) this.openViewer(first);
    } catch (ex) {
      this.showError(new Error(`Failed to load "${item.src}": ${errMsg(ex)}`, { cause: ex }));
    } finally {
      // The tile is gone when the update replaced it, it may still be there when it failed
      delete el.dataset.fetching;
    }
  }
  /**
   * @param {MediaItem} item
   */
  async copyItem(item) {
    const copied = await $GM.setClipboard(item.src);
    msg(copied ? 'Copied URL to Clipboard' : 'Failed to copy to Clipboard', 2500);
  }
  /**
   * @param {MediaItem} item
   */
  async downloadItem(item) {
    if (!item.src) {
      throw new Error('There is nothing to download', { cause: 'downloadItem' });
    }
    const name = `${sanitizeFilename(item.title)}.${item.ext}`;
    if (item.blob) {
      saveAs(item.blob, name);
      msg('Download complete', 2500);
    } else {
      /**
       * Progress reporter for a transfer, updates the notice at most 4 times per second.
       * @returns {(evt: { loaded: number; total: number }) => void}
       */
      const progressNotice = () => {
        let last = 0;
        return (evt) => {
          const now = Date.now();
          if (now - last < 250 && evt.loaded !== evt.total) return;
          last = now;
          msg(`(${Network.prog(evt)}) Downloading "${name}" using "Fetch API"`);
        };
      };
      try {
        const getBlob = async () => {
          try {
            const { chunks } = await Network.fetchChunks(item.src, item.data, progressNotice());
            return new Blob(chunks, { type: 'application/octet-stream' });
          } catch (ex) {
            // Most commonly CORS, a userscript manager request is not bound by it
            if (!$GM.isGM) throw ex;
            con.info('Fetch failed, retrying with "xmlHttpRequest":', errMsg(ex));
            return Network.gmBlob(item.src, item.data, progressNotice()).catch(con.err);
          }
        };
        const blob = await getBlob();
        if (blob) saveAs(blob, name);
        item.blob = blob;
        msg('Download complete', 2500);
      } catch (ex) {
        msg(`Failed to download "${name}"`, 4000);
        throw new Error(`Failed to download "${name}": ${errMsg(ex)}`, { cause: ex });
      }
    }
  }
  /**
   * Downloads every OnlyFans media (or the given ones), the downloaded media is removed.
   * @param {MediaItem[]} [cards]
   */
  async downloadAll(cards = this.library.media) {
    if (isEmpty(cards)) return;
    const limit =
      cfg.limitDownloads || cards.length > 16 || isMobile ? 1 : Math.max(1, cfg.concurrency);
    await runPool(cards, limit, async (item) => {
      try {
        await this.downloadItem(item);
        this.library.removeItem(item.id);
      } catch (ex) {
        this.showError(ex);
      }
    });
    msg('Downloads complete!', 2500);
  }
  /**
   * Builds the video from the HLS playlist of a tile, the tile is replaced by the video.
   * @param {string} id
   */
  async loadHLS(id) {
    const item = this.library.items.get(id);
    if (!item?.stream || item.el.dataset.busy) return;
    item.el.dataset.busy = 'true';
    const badge = qs('.badge:not(.top)', item.el);
    const label = badge?.textContent ?? '';
    const hls = new mphHLS(item.stream, item.data, badge, this.root.root);
    const blob = await hls.start();
    if (blob) {
      if (this.viewerOpen) this.closeViewer();
      this.library.addBlob(item, blob, hls.ext);
    } else {
      delete item.el.dataset.busy;
      if (badge) badge.textContent = label;
    }
  }
  /**
   * @param {string} value
   * @returns {?{ url?: string; path?: string }}
   */
  static resolveInput(value) {
    const val = value.trim();
    const { root, webpage } = this.root;
    /**
     * @param {string} pathname
     */
    const ofArr = (pathname) => {
      const arr = [
        /^(?:\/(?=$))?$/i,
        /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/((?:c\d+)))?(?:\/(?=$))?$/i,
        /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/((?:c\d+)))?\/((?:media|photos|videos|audios|likes|streams|upcoming-streams))(?:\/(?=$))?$/i
      ];
      return arr.map((r) => pathname.match(r)).filter(Boolean);
    };
    if (val.startsWith('http')) {
      try {
        const u = toURL(val);
        if (root === 'onlyfans' && isEmpty(ofArr(u.pathname))) {
          return null;
        } else {
          return { url: u.href };
        }
      } catch {
        return null;
      }
    }
    /** @type {Array<[RegExp, string, string]>} */
    const routes = [
      [/^\/video-\w+\/[\w-.]+(?:\/(?=$))?$/i, 'xnxx', 'https://www.xnxx.com'],
      [/^\/videos\/[a-z0-9._-]+(?:\/(?=$))?$/i, 'xhamster', 'https://xhamster.com'],
      [/^\/watch\/\d+\/[\w-]+(?:\/(?=$))?$/i, 'youporn', 'https://www.youporn.com'],
      [/^\/video\/\w+\/[\w-]+(?:\/(?=$))?$/i, 'thumbzilla', 'https://www.thumbzilla.com'],
      [/^\/porn-video\/\d{8}(?:\/(?=$))?$/i, 'tube8', 'https://www.tube8.com'],
      [/^\/(\d{8})?$/i, 'redtube', 'https://www.redtube.com'],
      [/^\/(view_video\.php\?viewkey=\w+)?$/i, 'pornhub', 'https://www.pornhub.com']
    ];
    for (const [reg, name, fallback] of routes) {
      if (reg.test(val)) return { url: `${root === name ? webpage.origin : fallback}${val}` };
    }
    if (!isEmpty(ofArr(val))) {
      return { path: val.replace(/\/$/, '') };
    }
    const [id] = /\w{13,15}/.exec(val) ?? [];
    if (id) {
      return {
        url: `${root === 'pornhub' ? webpage.origin : 'https://www.pornhub.com'}/view_video.php?viewkey=${id}`
      };
    }
    return null;
  }
  //#endregion
  //#region Viewer
  get viewerOpen() {
    return !!this.viewer && !dom.cl.has(this.viewer, 'hidden');
  }
  /**
   * Full screen viewer for what can be played of a card: the media of a post, the qualities of a video.
   * @param {string} id
   */
  openViewer(id) {
    const item = this.library.items.get(id);
    if (!item) return;
    const entry = this.library.posts.get(item.post);
    this.viewerList = toArray(entry?.ids ?? [id]).filter((key) =>
      MainBody.playable(this.library.items.get(key))
    );
    if (!this.viewer) this.#buildViewer();
    this.strip.textContent = '';
    this.viewerList.forEach((key, i) => {
      const item = this.library.items.get(key);
      /** @type {Tile} */
      const tile = make('mph-tile', 'thumb', {
        dataset: { command: 'viewer-goto', index: String(i) }
      });
      tile.renderViewer(item, i);
      this.strip.append(tile);
    });
    dom.cl.remove(this.viewer, 'hidden');
    this.showMedia(this.viewerList.indexOf(id));
  }
  closeViewer() {
    if (!this.viewer) return;
    if (this.stage) this.stage.textContent = '';
    dom.cl.add(this.viewer, 'hidden');
  }
  /**
   * @param {number} index
   */
  showMedia(index) {
    const n = this.viewerList.length;
    if (!n) return;
    this.viewerIndex = (index + n) % n;
    const item = this.library.items.get(this.viewerList[this.viewerIndex]);
    if (!item) return this.closeViewer();
    const siteRoot = this.root.current.root;
    const src = item.src || item.stream?.[0];
    /** @type {HTMLImageElement | HTMLAudioElement | HTMLVideoElement} */
    let el;
    const error = () => {
      this.stage.textContent = '';
      this.stage.append(make('mph-elem', 'viewer-msg', { textContent: i18n$('play_error') }));
    };
    /**
     * @type {?HTMLVideoElement}
     */
    const vidElem = qs('video', this.stage);
    if (vidElem && /video/.test(item.type) && vidElem.dataset.type !== 'gif') {
      vidElem.textContent = '';
      if (this.stage) dom.remove(qs('.viewer-msg', this.stage));
      const source = make('source', {
        src,
        type: `${item.type}/${item.ext}`,
        dataset: {
          label: item.label
        },
        error
      });
      vidElem.append(source);
      vidElem.load();
      el = vidElem;
    } else {
      this.stage.textContent = '';
    }
    if (!el) {
      if (item.type === 'photo') {
        el = make('img', { src, alt: '', draggable: 'false', dataset: { type: item.type } });
      } else if (item.type === 'audio') {
        el = make('audio', { src, controls: true, autoplay: true, dataset: { type: item.type } });
      } else {
        /** @type {?HTMLVideoElement} */
        let vid;
        const gif = item.type === 'gif';
        if (cfg.nativePlayer || /xnxx|sxyprn|xvideos|porntrex/.test(siteRoot)) {
          vid = make('video', {
            src: gif ? src : undefined,
            preload: 'auto',
            poster: item.poster ?? item.thumb,
            controls: !gif,
            loop: gif,
            muted: gif,
            autoplay: true,
            disablePictureInPicture: true,
            playsInline: true,
            dataset: {
              type: item.type
            }
          });
          el = vid;
        } else {
          const vp = make('video-player');
          const vs = make('video-skin', {
            style: 'display: block; width: 100%; height: 100%; aspect-ratio: 16 / 9;'
          });
          vp.append(vs);
          const special = toArray(this.library.items.values()).at(-1);
          if (special && !isEmpty(special.stream)) {
            vid = make('mux-video', {
              src: special.stream[0],
              preload: 'auto',
              poster: item.poster ?? item.thumb,
              loop: gif,
              muted: gif,
              autoplay: true,
              disablePictureInPicture: true,
              playsInline: true,
              dataset: {
                type: item.type
              },
              source: {
                src: special.stream[0],
                minAutoResolution: item.label
              }
            });
            if (vid.source)
              vid.source.playback ??= {
                minAutoResolution: item.label
              };
          } else {
            vid = make('video', {
              src: gif ? src : undefined,
              preload: 'auto',
              poster: item.poster ?? item.thumb,
              loop: gif,
              muted: gif,
              autoplay: true,
              disablePictureInPicture: true,
              playsInline: true,
              dataset: {
                type: item.type
              }
            });
          }
          vs.append(vid);
          el = vp;
        }
        if (!gif) {
          const source = make('source', {
            src,
            type: `${item.type}/${item.ext}`,
            dataset: {
              label: item.label,
              type: item.type
            },
            error
          });
          vid.append(source);
        }

        const vidMsg = make('mph-elem', 'viewer-msg', {
          textContent: 'Loading your video...'
        });
        ael(vid, 'emptied', () => {
          this.stage.append(vidMsg);
          vid.setAttribute('style', 'display: none;');
        });
        ael(vid, 'loadeddata', () => {
          vidMsg.remove();
          vid.setAttribute('style', '');
        });
        ael(vid, 'loadstart', () => {
          this.stage.append(vidMsg);
          vid.setAttribute('style', 'display: none;');
        });
      }
      ael(el, 'error', error, { once: true });
      this.stage.append(el);
    }
    this.viewerCount.textContent = `${this.viewerIndex + 1} / ${n}`;
    this.viewerTitle.textContent = `${this.library.posts.get(item.post)?.post.text ?? item.title} (${item.label})`;
    Object.assign(this.viewerDownload.dataset, {
      id: item.id,
      command: item.stream ? 'load-ts' : 'download-video'
    });
    this.viewerCopy.dataset.id = item.id;
    this.viewerLink.dataset.webpage = item.src;
    const remote = Boolean(item.src) && !item.blob;
    this.viewerDownload.classList.toggle('hidden', !item.src && !item.stream);
    this.viewerCopy.classList.toggle('hidden', !remote);
    // A website that checks where the request comes from refuses a new tab
    this.viewerLink.classList.toggle('hidden', !remote || Boolean(item.data.referrer));
    dom.cl.toggle(this.strip, 'hidden', n === 1);
    dom.cl.remove(qsA('mph-tile', this.strip), 'active');
    const activeElem = qs(`mph-tile[data-index="${this.viewerIndex}"]`, this.strip);
    dom.cl.add(activeElem, 'active');
    if (activeElem) {
      activeElem.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  }
  #buildViewer() {
    /**
     * @param {string} cls
     * @param {string} command
     * @param {string} text
     * @param {string} [icon]
     */
    const button = (cls, command, text, icon) => {
      const btn = make('mph-btn', cls, {
        title: text,
        role: 'button',
        tabIndex: 0,
        dataset: { command }
      });
      if (icon) IconSVG.load(/** @type {unknown} */ (icon), btn);
      else btn.textContent = text;
      return btn;
    };
    this.viewerCount = make('mph-elem', 'viewer-count');
    this.viewerTitle = make('mph-elem', 'viewer-title');
    this.viewerLink = button('', 'open-tab', i18n$('open'), 'open');
    this.viewerDownload = button('', 'download-video', i18n$('download'), 'download');
    this.viewerCopy = button('', 'copy', i18n$('copy'), 'copy');
    const bar = make('mph-row', 'viewer-bar');
    bar.append(
      this.viewerCount,
      this.viewerTitle,
      this.viewerLink,
      this.viewerDownload,
      this.viewerCopy,
      button('', 'viewer-close', i18n$('close'), 'close')
    );
    this.stage = make('mph-elem', 'viewer-stage');
    const stageWrap = make('mph-elem', 'viewer-wrap');
    /**
     * @param {HTMLElement} target
     */
    const stageCB = (target, args) => {
      /** @type { HTMLVideoElement } */
      const video = target.closest('[data-type="video"]');
      /** @type { HTMLImageElement } */
      const img = target.closest('[data-type="photo"]');
      /** @type { HTMLAudioElement } */
      const audio = target.closest('[data-type="audio"]');
      /** @type { HTMLVideoElement } */
      const gif = target.closest('[data-type="gif"]');
      if (img || gif || (audio && audio.paused === true) || (video && video.paused === true)) {
        if (this.library.items.size > 1) this.showMedia(args);
      }
    };
    let x = 0;
    let y = 0;
    ael(
      stageWrap,
      'touchstart',
      (evt) => {
        x = evt.changedTouches[0].clientX;
      },
      { passive: true }
    );
    ael(
      stageWrap,
      'touchend',
      (evt) => {
        evt.preventDefault();
        const dx = evt.changedTouches[0].clientX - x;
        if (Math.abs(dx) > 60) {
          const target = evt.target;
          if (!target) return;
          stageCB(target, this.viewerIndex + (dx < 0 ? 1 : -1));
        }
      },
      { passive: true }
    );
    stageWrap.append(this.stage);
    this.strip = make('mph-elem', 'viewer-strip');
    this.viewer = make('mph-viewer', 'hidden', {
      // Click on the backdrop closes, swipe changes the media
      click: (evt) => {
        const target = evt.target;
        if (target === bar || target === this.strip || target === this.stage) this.closeViewer();
      }
    });
    /**
     * @param {WheelEvent} evt
     */
    const wheelFn = (evt) => {
      evt.preventDefault();
      const direction = evt.deltaY * -0.01;
      y = direction < 0 ? 1 : -1;
      const target = evt.target;
      if (!target) return;
      stageCB(target, this.viewerIndex + y);
    };
    ael(this.viewer, 'wheel', wheelFn);
    this.viewer.append(bar, stageWrap, this.strip);
    this.root.append(this.viewer);
  }
  //#endregion
  //#region Settings
  async save() {
    const config = copyObject(cfg);
    /**
     * @param {Record<string, unknown>} conf
     * @param {Record<string, unknown>} def
     */
    const strip = (conf, def) => {
      for (const [key, value] of Object.entries(conf)) {
        if (!(key in def)) {
          delete conf[key];
        } else if (isObj(value) && isObj(def[key])) {
          strip(value, def[key]);
          if (isEmpty(value)) delete conf[key];
        } else if (Object.is(value, def[key])) {
          delete conf[key];
        }
      }
    };
    strip(config, DEFAULT_CONFIG);
    await jsStorage.setValue('Config', isEmpty(config) ? '{}' : config);
    con.info('Saved config:', { config, cfg });
    this.setTheme();
    msg('Settings saved', 2500);
    return cfg;
  }
  //#endregion
}
const container = new Container();
/**
 * Notice in the top corner of the page.
 * @param {string | number} [text]
 * @param {number} [time] - ms
 */
const msg = (text, time) => container.toast(text, time).catch(BLANK_FN);
//#endregion
//#region Site Director
/**
 * Runs the handler of the current website.
 * @param {string} [input]
 */
const runSite = async (input) => {
  const { library: L, root: R } = container;
  if (!isEmpty(input)) {
    R.current = input;
  }
  const { root, path } = R.current;
  const getUsername = (str) => {
    return (str ?? root)
      .split('/')
      .filter((i) => !isBlank(i))
      .at(-1);
  };
  /**
   * @template {Partial<VideoData>} O
   * @param {O} obj
   * @param {number} i
   * @returns {O}
   */
  const toLibrary = (obj, i) => {
    const n = `${root}-${i ?? obj?.id ?? 0}`;
    const data = {
      id: n,
      groupKey: root,
      groupTitle: root,
      user: {
        name: n,
        username: n
      },
      viewerOnly: true,
      ...obj
    };
    L.addVideo(data);
    return data;
  };

  con.log(root, path);

  if (root === 'sxyprn') {
    // The address of the video is set by the scripts of the page
    const player = await waitFor(() => {
      /** @type {?HTMLVideoElement} */
      const el = qs('#player_el');
      return el?.src && el.src !== window.location.href ? el : null;
    }, 30000);
    if (!player) return;
    const title = (qs('.post_text')?.textContent ?? '').trim();
    L.addVideo({
      title: isEmpty(title) ? document.title : title.slice(0, 150),
      poster: player.poster,
      files: [player.src]
    });
  } else if (root === 'beeg') {
    // `__vue__` is only reliable once the content of the page is rendered
    await query('main.v-main');
    const app = await query('[id="app"]');
    if (!app) return;
    const appVue = await waitFor(() => app.__vue_app__, 120000, 250);
    if (!appVue) {
      con.err('Beeg: unable to find the Vue instance');
      return;
    }
    R.router = app.__vue_app__?.config?.globalProperties?.$router ?? null;
    const pathname = R.webpage.pathname;
    /** @type {Partial<VideoData>} */
    const fallback = {
      groupKey: 'beeg',
      groupTitle: 'beeg',
      files: [],
      preferHLS: true,
      postData: {},
      user: {
        name: 'MagicPH'
      }
    };
    /**
     * @param {Record<string, unknown>} obj
     */
    const getVideo = (obj) => {
      if (!isObj(obj)) return;
      const { fc_facts, file } = obj;
      /** @type {VideoData} */
      const videoData = {
        id: `${file.id}`,
        photos: [],
        ...fallback
      };
      if (Array.isArray(fc_facts)) {
        for (const fact of fc_facts) {
          if (Array.isArray(fact.fc_thumbs)) {
            for (const thumb of fact.fc_thumbs) {
              videoData.photos.push({
                id: `${fact.id ?? videoData.id}:${thumb}`,
                src: `https://thumbs.externulls.com/videos/${file.id}/${thumb}.webp`,
                thumb: `https://thumbs.externulls.com/videos/${file.id}/${thumb}.webp`,
                type: 'photo'
              });
            }
          }
        }
        videoData.poster = videoData.photos.at(-1).src;
        videoData.date = fc_facts.at(-1).fc_created;
      }
      if (Array.isArray(obj.tags)) {
        const person = obj.tags.find((o) => o.is_owner === true);
        if (person) {
          const thumb = person.thumbs.at(-1);
          if (thumb && thumb.id) {
            const crop = thumb.crops.at(-1);
            if (crop && crop.id) {
              videoData.user = {
                name: person.tg_name ?? 'MagicPH',
                username: person.tg_slug,
                avatar: `https://thumbs.externulls.com/photos/${thumb.id}/to.webp?crop_id=${crop.id}&size_new=320x320`
              };
            }
          }
          // videoData.groupKey = String(person.id);
          // videoData.groupTitle = person.tg_name ?? person.tg_slug ?? 'MagicPH';
        }
      }
      if ('hls_resources' in file) {
        videoData.title = `${file.data[0]?.cd_value}`;
        videoData.duration = file.fl_duration;
        videoData.ts = [`https://video.beeg.com/${file.hls_resources.fl_cdn_multi}`];
        videoData.postData.original = `/-0${file.id}`;
        videoData.postData.text = `${file.data[0]?.cd_value}`;
        videoData.postData.variant = 'post';
        videoData.photos = videoData.photos.filter((p) => p.src !== videoData.poster);
        L.addVideo(videoData);
      }
    };
    if (pathname === '/') {
      const homepage = await Network.req(
        'https://store.externulls.com/tag/videos/index?limit=48&offset=0'
      );
      if (Array.isArray(homepage)) {
        for (const o of homepage) {
          getVideo(o);
        }
      }
    } else if (pathname.includes('/-0')) {
      const videoId = pathname.replace(/^\/-0/, '');
      getVideo(await Network.req(`https://store.externulls.com/facts/file/${videoId}`));
    } else if (
      !/^\/(auth|tmp-*|contributor|account|saved|reacted|clipped|following|contact|copyright|2257|creators|terms|privacy|takedown|ip-holder|claim)/.test(
        pathname
      )
    ) {
      const slug = pathname.replace('/', '');
      const primTag = await Network.req(`https://store.externulls.com/tag?slug=${slug}`);
      if (isObj(primTag)) {
        const thumb = primTag.thumbs.at(-1);
        if (thumb && thumb.id) {
          const crop = thumb.crops.at(-1);
          if (crop && crop.id) {
            fallback.user = {
              name: primTag.tg_name ?? 'MagicPH',
              username: primTag.tg_slug,
              avatar: `https://thumbs.externulls.com/photos/${thumb.id}/to.webp?crop_id=${crop.id}&size_new=320x320`
            };
          }
        }
      }
      const tagPage = await Network.req(
        `https://store.externulls.com/tag/videos/${slug}?limit=100&offset=0`
      );
      if (Array.isArray(tagPage)) {
        for (const o of tagPage) {
          getVideo(o);
        }
      }
    }
  } else if (root === 'onlyfans') {
    // `__vue__` is only reliable once the content of the page is rendered
    await query('main[id="content"]');
    const app = await query('[id="app"]');
    if (!app) return;
    const appVue = await waitFor(() => app.__vue__, 120000, 250);
    if (!appVue) {
      con.err('OnlyFans: unable to find the Vue instance');
      return;
    }
    R.router = appVue._routerRoot?.$options?.router ?? appVue.$router ?? null;
    /**
     * Media of an OnlyFans post, the API changed its shape over time: `full` / `thumb` / `source` used to be
     * on the media itself, they are in `files` now.
     * @param {Record<string, unknown>} m
     * @returns {?PostMedia}
     */
    const ofMedia = (m) => {
      if (!m || m.canView === false || m.hasError || m.isReady === false) return null;
      const f = m.files ?? {};
      /** @param {unknown} v */
      const url = (v) => {
        const u = typeof v === 'string' ? v : v?.url;
        return typeof u === 'string' && u ? u : undefined;
      };
      const type = /^(video|photo|gif|audio)$/.test(m.type) ? m.type : 'video';
      const preview = url(f.preview) ?? url(m.preview);
      const thumb = url(f.thumb) ?? url(m.thumb) ?? url(f.squarePreview) ?? url(m.squarePreview);
      // The original, otherwise the highest quality
      const [best] = Object.entries(m.videoSources ?? {})
        .map(([quality, v]) => [parseInt(quality, 10) || 0, url(v)])
        .filter(([, u]) => u)
        .sort(([a], [b]) => Number(b) - Number(a));
      let src =
        url(m.full) ??
        url(f.full) ??
        url(m.src) ??
        (type === 'photo' ? preview : undefined) ??
        best?.[1];
      // A protected video has nothing to play or download, only its preview image
      const drm = !src && Boolean(url(f.drm?.manifest?.hls));
      if (!src && !drm) return null;
      if (f.drm && 'manifest' in f.drm) {
        const type = 'dash';
        const u = toURL(f.drm.manifest[type]);
        u.pathname = u.pathname.replace(/\.mpd/, '_source.mp4');
        const sp = u.searchParams;
        for (const [k, v] of Object.entries(f.drm.signature[type])) {
          if (k.includes('Policy')) {
            sp.append('Policy', v);
          } else if (k.includes('Signature')) {
            sp.append('Signature', v);
          } else if (k.includes('Key-Pair-Id')) {
            sp.append('Key-Pair-Id', v);
          }
        }
        src = u.toString();
      }
      const duration = m.duration ?? m.source?.duration;
      return {
        id: String(m.id),
        type,
        src,
        drm,
        preview: !isEmpty(preview),
        poster: preview ?? thumb,
        thumb: thumb ?? preview,
        duration: duration ? fancyTimeFormat(duration) : undefined
      };
    };
    /** Post id + number of media, a post is read again when its media change @type {Set<string>} */
    const seen = new Set();
    /** @type {Map<string, Record<string, unknown>>} */
    const users = new Map();
    /** `author` / `fromUser` are either an id or a user object @param {unknown} v */
    const userOf = (v) => users.get(String(isObj(v) ? v.id : v));
    /**
     * @param {unknown[]} posts
     */
    const filterPosts = (posts) => {
      for (const p of posts) {
        if (!isObj(p) || !Array.isArray(p.media) || p.isMediaReady === false) continue;
        const sig = `${p.id}:${p.media.length}`;
        if (seen.has(sig)) continue;
        const user =
          userOf(p.author) ?? userOf(p.fromUser) ?? userOf(p.withUser) ?? userOf(p.chatId);
        // The post is retried once its user is known
        if (!user?.name) continue;
        seen.add(sig);
        const previews = new Set(toArray(p.previews).map(String));
        const media = p.media
          .map(ofMedia)
          .filter((m) => m !== null)
          .map((m) => ({ ...m, preview: previews.has(m.id) }));
        if (isEmpty(media)) continue;
        L.addPost({
          id: String(p.id),
          variant: 'post',
          groupKey: String(user.id),
          groupTitle: user.name,
          user: { name: user.name, username: user.username, avatar: user.avatar },
          date: p.postedAt ?? p.createdAt,
          price: p.price,
          isFree: p.isFree,
          isMessage: p.responseType === 'message' || 'fromUser' in p,
          text: htmlToText(p.text),
          original:
            p.responseType === 'message' || 'fromUser' in p
              ? `/my/chats/chat/${user.id}/?firstId=${p.id}`
              : `/${p.id}/${user.username}`,
          media
        });
      }
    };
    appVue.$store.watch((/** @type {Record<string, unknown>} */ a) => {
      try {
        for (const u of Object.values(a.users?.items ?? {})) {
          if (isObj(u) && u.id != null) users.set(String(u.id), u);
        }
        /** @type {unknown[]} */
        const toGrab = [
          ...Object.values(a.posts?.items ?? {}),
          ...Object.values(a.chats?.items ?? {}),
          ...Object.values(a.chats?.messages ?? {})
        ];
        filterPosts(toGrab);
      } catch (ex) {
        con.dbg('OnlyFans store:', errMsg(ex));
      }
      return undefined;
    });
  }

  if (path.includes('Video')) {
    L.addVideo(await R.find());
  } else if (path === 'GIF') {
    const page = R.webpage;
    const doc = await Network.doc(page);
    const nodes = ldNodes(doc).filter((n) => n.contentUrl || n.thumbnailUrl);
    L.addVideo({
      title: nodes[0]?.name ?? doc.title,
      poster: nodes[0]?.contentUrl ? absURL(String(nodes[0].thumbnailUrl ?? ''), page) : undefined,
      files: nodes.map((n) => absURL(String(n.contentUrl ?? n.thumbnailUrl), page)).filter(Boolean)
    });
  } else if (path === 'Shorties') {
    const doc = await Network.doc(R.webpage);
    const token = qs('.slider-container', doc)?.dataset.token;
    /** @type {Set<string>} */
    const seen = new Set();
    let page = 1;
    let busy = false;
    let lastY = window.scrollY;
    /**
     * @param {Array<Record<string, unknown>>} shorties
     */
    const makeData = async (shorties) => {
      for (const s of toArray(shorties)) {
        try {
          const [def] = toArray(s.mediaDefinitions).filter((m) => m.format === 'mp4');
          if (!def) continue;
          /** @type {Array<{ videoUrl: string }>} */
          const list = await Network.req(absURL(def.videoUrl, R.webpage));
          const files = toArray(list)
            .map((v) => v.videoUrl)
            .filter((v) => /\.mp4[.?]/.test(v) && !seen.has(v));
          for (const v of files) seen.add(v);
          L.addVideo({
            id: String(s.videoId ?? s.id ?? def.videoUrl),
            title: s.videoTitle,
            poster: s.thumb ?? s.thumbnail ?? s.imageUrl ?? s.image_url,
            files
          });
        } catch (ex) {
          con.err(ex);
        }
      }
    };
    for (const script of doc.scripts) {
      const txt = script.textContent ?? '';
      const at = txt.search(/JSON_SHORTIES\s*=/);
      if (at < 0) continue;
      try {
        await makeData(extractJSON(txt, txt.indexOf('=', at)));
      } catch (ex) {
        con.err(ex);
      }
      break;
    }
    window.addEventListener(
      'scroll',
      async () => {
        const y = window.scrollY;
        const down = y > lastY;
        lastY = y;
        if (busy || !down || !token) return;
        if (window.innerHeight + y < document.body.scrollHeight - 200) return;
        busy = true;
        try {
          page++;
          const params = Page.toSearchParams({ page: String(page), token });
          const next = await Network.req(toURL(`/shorties/get?${params}`, R.webpage.origin));
          await makeData(next);
        } catch (ex) {
          con.err(ex);
        } finally {
          busy = false;
        }
      },
      { passive: true }
    );
  } else if (root === '91porna') {
    const arr = toArray(qsA('.video-item'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const img = qs('.poster > img', li);
      const vid = qs('a[href^="/comic/index/detail?video_key="]', li)?.href;
      const title = img?.alt ?? qs('div > a > div', li)?.textContent?.trim();
      const poster = img?.dataset?.src ?? img?.src;
      if (isEmpty(vid) || isEmpty(poster)) continue;
      toLibrary(
        {
          files: [vid],
          title,
          poster,
          postData: {
            original: vid,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === '91porn') {
    const arr = toArray(qsA(`a[href^="https://${R.host}/view_video.php?viewkey="]`));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const title = qs('.video-title', li)?.textContent?.trim();
      const overlay = qs('.thumb-overlay', li);
      const poster = qs('img', overlay)?.src;
      toLibrary(
        {
          id: overlay?.id,
          files: [li.href],
          title,
          poster,
          postData: {
            original: li.href,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === 'hqporner') {
    const arr = toArray(qsA('section.box.feature'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const img = qs('img', li);
      const vid = qs('a[href]', li)?.href;
      const title = img?.alt ?? qs('.meta-data-title > a', li)?.textContent?.trim();
      const poster = img?.src;
      if (isEmpty(vid) || isEmpty(poster)) continue;
      toLibrary(
        {
          files: [vid],
          title,
          poster,
          postData: {
            original: vid,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === 'jable') {
    const arr = toArray(qsA('.video-img-box'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const img = qs('img', li);
      const vid = qs('a[href]', li)?.href;
      const title = img?.alt ?? qs('.title > a', li)?.textContent?.trim();
      const poster = img?.dataset?.src ?? img?.src;
      if (isEmpty(vid) || isEmpty(poster)) continue;
      toLibrary(
        {
          files: [vid],
          title,
          poster,
          postData: {
            original: vid,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === 'eporner') {
    const arr = toArray(qsA('[data-id][data-vp]'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const img = qs('img', li);
      const vid = qs('a[href^="/video-"]', li)?.href;
      const title = img?.alt ?? qs('.mbtit > a', li)?.textContent?.trim();
      const poster = img?.dataset?.src ?? img?.src;
      if (isEmpty(vid) || isEmpty(poster)) continue;
      toLibrary(
        {
          files: [vid],
          title,
          poster,
          postData: {
            original: vid,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === 'youjizz') {
    const arr = toArray(qsA('[data-videoid]'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const vid = qs('a[data-video-id]', li)?.href;
      const title = qs('.video-title > a', li)?.textContent?.trim();
      const poster = qs('.frame-wrapper img', li)?.dataset?.original;
      if (isEmpty(vid)) continue;
      toLibrary(
        {
          id: `${li.dataset.videoid}`,
          files: [vid],
          title,
          poster,
          postData: {
            original: vid,
            text: title,
            variant: 'post'
          }
        },
        i
      );
    }
  } else if (root === 'pornhub') {
    const arr = toArray(qsA('ul[id] > li[id]'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const dataset = li.dataset;
      if (dataset.videoVkey) {
        const userElem = qs('.usernameWrap > a', li);
        const userName = isEmpty(userElem?.title?.trim())
          ? userElem?.textContent?.trim()
          : userElem?.title?.trim();
        const title = (qs('.title', li)?.title ?? qs('.title', li)?.textContent ?? root).trim();
        toLibrary(
          {
            id: `${dataset.id}`,
            groupKey: dataset.eventLabel?.trim() ?? root,
            groupTitle: dataset.eventLabel?.trim() ?? root,
            files: [`/view_video.php?viewkey=${dataset.videoVkey}`],
            title,
            poster: qs('img', li).src,
            postData: {
              original: `/view_video.php?viewkey=${dataset.videoVkey}`,
              text: title,
              variant: 'post'
            },
            user: {
              name: userName ?? root,
              username: getUsername(userElem?.href)
            }
          },
          i
        );
      }
    }
  } else if (root === 'thumbzilla') {
    const arr = toArray(qsA('[data-video-id]'));
    for (let i = 0; i < arr.length; i++) {
      const li = arr[i];
      const dataset = li.dataset;
      if (dataset.videoId) {
        const a = qs('a[href]:not(.author-title-text)', li)?.href;
        if (isEmpty(a)) continue;
        const userElem = qs('a.author-title-text', li);
        const title = li.ariaLabel;
        const p = qs('.thumb-image', li);
        toLibrary(
          {
            id: `${dataset.videoId}`,
            files: [a],
            title,
            poster: p?.dataset?.src ?? p?.src,
            postData: {
              original: a,
              text: title,
              variant: 'post'
            },
            user: {
              name: userElem?.textContent?.trim() ?? root,
              username: getUsername(userElem?.href)
            }
          },
          i
        );
      }
    }
  } else if (root === 'youporn') {
    const vidInfo = toURL(R.webpage.href);
    vidInfo.pathname = '/getVideoInfo';
    const sp = vidInfo.searchParams;
    for (const article of qsA('article.video-box')) {
      const dataset = article.dataset;
      if (dataset) {
        sp.append('videos[]', dataset.videoId);
      }
    }
    const req = await Network.req(vidInfo);
    if (Array.isArray(req)) {
      for (let i = 0; i < req.length; i++) {
        const o = req[i];
        toLibrary(
          {
            id: `${o.id}`,
            files: [o.link],
            postData: {
              original: o.link,
              text: o.title,
              variant: 'post'
            },
            duration: o.duration,
            title: o.title,
            poster: isMobile ? o.thumbMobile : o.thumbPC,
            user: {
              name: o.uploaderName,
              username: getUsername(o.uploaderUrl)
            }
          },
          i
        );
      }
    }
  } else if (root === 'redtube') {
    for (const li of qsA('ul.videos_grid > li[id]')) {
      const title = qs('.tm_video_title', li)?.textContent?.trim();
      const poster = (qs('.video_thumb_image > source', li)?.dataset?.srcset ?? '')
        .split(/ |,/g)
        .filter((i) => i.startsWith('http'))
        .at(-1);
      toLibrary({
        id: `${li.dataset.videoId}`,
        files: [`/${li.dataset.videoId}`],
        title,
        poster,
        postData: {
          original: `/${li.dataset.videoId}`,
          text: title,
          variant: 'post'
        },
        user: {
          name: li.dataset.uploaderName,
          username: getUsername(qs('.author-title-text ', li)?.href)
        }
      });
    }
  } else if (root === 'xhamster') {
    for (const elem of qsA('.thumb-list > [data-video-id]')) {
      const a = qs('.thumb-image-container', elem);
      if (a && a.href) {
        const userName = qs('.video-uploader__name', elem);
        const avatar = qs('.video-uploader-logo', elem)?.dataset?.backgroundImage;
        toLibrary({
          id: `${elem.dataset.videoId}`,
          title: a.ariaLabel.trim(),
          files: [a.href],
          postData: {
            original: a.href,
            text: a.ariaLabel.trim(),
            variant: 'post'
          },
          user: {
            name: userName?.textContent?.trim() ?? root,
            username: getUsername(userName?.href),
            avatar
          },
          poster: qs('.thumb-image-container__image', elem)?.src
        });
      }
    }
  } else if (root === 'spankbang') {
    for (const li of qsA('[data-id]')) {
      const poster = qs('img[x-ref]', li)?.src;
      const thumbUnder = qs('a[href]', li);
      if (!(thumbUnder?.href ?? '').includes('/video/')) continue;
      toLibrary({
        id: `${li.dataset.id}`,
        title: poster?.alt,
        files: [thumbUnder?.href],
        postData: {
          original: thumbUnder?.href,
          text: poster?.alt,
          variant: 'post'
        },
        poster
      });
    }
  } else if (/^(xnxx|xvideos)$/.test(root)) {
    for (const li of qsA('div[data-id]')) {
      const p = qs('img[data-videoid]', li);
      const poster = p?.dataset?.src ?? p?.src;
      const thumbUnder = qs('.thumb-under > p > a', li);
      const uploader = qs('.uploader > a', li) ?? qs('.thumb-under .metadata a', li);
      if (isEmpty(thumbUnder?.href)) continue;
      toLibrary({
        id: `${li.dataset.id}`,
        title: thumbUnder?.title,
        files: [thumbUnder?.href],
        postData: {
          original: thumbUnder?.href,
          text: thumbUnder?.title,
          variant: 'post'
        },
        user: {
          name: uploader?.textContent?.trim() ?? root,
          username: getUsername(uploader?.href)
        },
        poster
      });
    }
  }
  //else if (/^(porntrex|analdin|porn00|xhamster)$/.test(root)) {
  // porntrex: .video-list
  // /**
  //  * Request options (`fetch` style) required to download media of `root`.
  //  * @param {string} root
  //  * @returns {Record<string, unknown>}
  //  */
  // const requestOptions = (root) => {
  //   if (/xhamster/.test(root)) {
  //     return { credentials: 'omit', referrer: `${R.webpage.protocol}//${R.host}/` };
  //   }
  //   return {};
  // };
  // L.addVideo({ ...(await R.find()), hermes: requestOptions(root) });
  //}
};
//#endregion
//#region Init
/**
 * Runs `onDomReady` once the DOM is available.
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (typeof onDomReady === 'function') {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      defer(() => onDomReady(document));
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};
async function init() {
  const defaults = copyObject(DEFAULT_CONFIG);
  const stored = sanitizeConfig(await jsStorage.getValue('Config', DEFAULT_CONFIG));
  cfg = { ...defaults, ...stored, theme: { ...defaults.theme, ...(stored.theme ?? {}) } };
  con.dbg('Config:', cfg);
  loadDOM((doc) => {
    if (doc == null || window.location === null) {
      con.err('The document is not available, reload the webpage or use a different one');
      return;
    }
    for (const src of [
      'https://cdn.jsdelivr.net/npm/@videojs/cdn@10.0.1/video.js',
      'https://cdn.jsdelivr.net/npm/@videojs/cdn@10.0.1/media/mux-video.js'
    ]) {
      const script = make('script', { src, type: 'module' });
      if (doc.head) doc.head.append(script);
    }
    if (container.root.mobileFix()) return;
    $GM.registerMenuCommand(i18n$('open'), () => container.showPanel());
    $GM.registerMenuCommand(i18n$('close'), () => container.remove());
    if (cfg.autoinject) container.inject();
    runSite().catch(con.err);
    /**
     * Websites that change the video without reloading the page.
     */
    const SPA_ROOTS = new Set(['sxyprn', 'beeg', 'analdin']);
    /**
     * Runs the site handler again whenever the address of a single page application changes.
     */
    const watchNavigation = () => {
      let last = Page.location.href;
      let busy = false;
      con.dbg(`Watching this site: ${last}`);
      setInterval(async () => {
        if (busy || Page.location.href === last) return;
        last = Page.location.href;
        busy = true;
        try {
          await runSite(last);
        } catch (ex) {
          con.err(ex);
        } finally {
          busy = false;
        }
      }, 1000);
    };
    if (SPA_ROOTS.has(container.root.root)) watchNavigation();
  });
}
init().catch(con.err);
//#endregion

/******************************************************************************/
})();
