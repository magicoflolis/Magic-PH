// ==UserScript==
// @name         MagicPH
// @description  A video downloader for various adult websites.
// @author       Magic <magicoflolis@tuta.io>
// @icon         data:image/png;base64,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
// @version      4.0.0
// @downloadURL  https://github.com/magicoflolis/Magic-PH/raw/master/dist/UserJS/magicph.user.js
// @updateURL    https://github.com/magicoflolis/Magic-PH/raw/master/dist/UserJS/magicph.meta.js
// @namespace    https://github.com/magicoflolis/Magic-PH
// @homepageURL  https://github.com/magicoflolis/Magic-PH
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues/new
// @license      MIT
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @grant     unsafeWindow
// @grant     GM_info
// @grant     GM_openInTab
// @grant     GM_setClipboard
// @grant     GM_xmlhttpRequest
// @grant     GM.info
// @grant     GM.openInTab
// @grant     GM.setClipboard
// @grant     GM.xmlHttpRequest
// @match     https://*.pornhub.com/*
// @match     https://*.pornhubpremium.com/*
// @match     https://*.youporn.com/*
// @match     https://*.youpornpremium.com/*
// @match     https://*.youporngay.com/*
// @match     https://*.redtube.com/*
// @match     https://*.redtubepremium.com/*
// @match     https://*.tube8.com/*
// @match     https://*.thumbzilla.com/*
// @match     https://onlyfans.com/*
// @match     https://xhamster.com/*
// @match     https://*.xnxx.com/*
// @match     https://*.xvideos.com/*
// @match     https://beeg.com/*
// @noframes
// @run-at     document-start
// ==/UserScript==