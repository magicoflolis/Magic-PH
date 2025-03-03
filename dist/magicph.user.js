// ==UserScript==
// @version      4.1.0
// @name         MagicPH
// @description  A video downloader for various adult websites.
// @author       Magic <magicoflolis@tuta.io>
// @supportURL   https://github.com/magicoflolis/Magic-PH/issues
// @namespace    https://github.com/magicoflolis/Magic-PH
// @homepageURL  https://github.com/magicoflolis/Magic-PH
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADGCAYAAAC5F+58AAANOklEQVR4nO2dL4zcRhuHX3woAYGfHClSSElA6aqRCqpKAVHIgpKAkoBakT6VVK10svRFCskBkxYFGBSeDMpWCigwvC5d6dMBU0uLjKfA8WlvY88fe2besec30sPu1u/OvI89/zxLNF6eE9EVEd0Q0ZGIBABglCN1rnwkopdkUJ4R0XUAXwCAJXNDRI9JUV4TnmYA2OQtjZS3AQQHwBr5QrrHhCcbAC55RiflUwABAbBmbulzeRlAMADEwGuibhqTOxAAYuCaqJu+5A4EgBg4EnV9S+5AAIiBIwUQBAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMcEeAAAxwR4AADHBHgAAMeH/oofDQZiWPM8nXy/Pc+PrHQ4H7oZZLKr2jbxuw2uQoVJV1eTrVVUF4QJq38jrNrwGGSpN00y+Xtu2EC6g9o28bsNrkLGy2WyMr7XdbiddK/KkcNq+kddteA0yVoqiML5WURSTrhV5Ujht38jrNrwGGSv7/d74Wvv9ftK1Ik8Kp+0bed2G1yBjpW1b42tNGb8hKdy2b+R1G16DyMp2u9W+Tpqmk68TeVIAd/i/6BzhyrLUvk5ZlhAOhIb/i6qEa5rGigiy68iuAeGAQ/xfVKePLxNC9zoy2TDOAEz4v6hOsst2h2RZprxGlmWj/19VlVPh0jQVZVmKw+Eg6roe/Py2be++Z1EURmNTXbIsG/yuTdOI/X4viqIQSZJwJ6AxSZKIPM9H27Gv291uJ/I8D+07+r+oTrLL9j/udjvlNXa73ej/53luXbgkSURZlpNnRftrpmk6u36zLFN2mfvStq0oy/JeUqrqxkb7Tvlem81m0jY9Ibqb7JSNE9EIJ9shUte18hpjTxYhuplOm0mx3W61E1ynTN03miTJ5HXHuq7vnrIhCjdnAqwvbdvO2gS/auGI5Gtosm5CkiTSSreZFNvtdtZTbayYSpckifQmo1PattW6GfkULkmSWbPaQ0WnhxSlcLK7texOJRu/9btVbCRFkiRWn2znxWQr21zZ+tK2rfKzfAln4yYyVhifdOEKJ9sHKXsCyPr5fRLbSArZONFG0X1DwnUc58WXcFPHa7qFaUwXrnCynSKyZJQ9dXTHKaqk2Gw28tYU3bhoaJasn8XU6YqqZi914hCie3IVRXEvydI0nZTUPoST9VJOS1VV9yaakiQRWZZpPRmZln7CFY5ofC1NiOE7lCoBbSWFahBf17VyOlrn1SHVEoiOMKpYTMehPoRTddXbtlXO6OrUjY1Z4VUJJ/vboTGObDlB93PP/3ZKQuh2V1SzirKtbLLJob40TaO1DmXy3qBr4XSOxNAVRdVOc04SWKVwsifJ0Os6srvaafLauAunaSqyLBNlWYrdbne3Q8akEVVPSplwNhNTJ5a+uBZOdRMyqV9VHU15A2V1wp2KJBvHDVWWrGt0mnyqRvXVv58jnOo7mB5LoTsenNu+qrpVFZ2dRj19L+BwOIjD4SDKshRlWYo0TTm6k4IYLqhskPMkk5XTSQVVt8gk0V0L12+7Uo2dZMKpuktT1pt0Jhvmtq+sbnVeqeLIWYv4v6ipcLIkOP1b2TLCeSP7FK6fOev3V5oUmXCqYvIk0K0XIdwKx30j9ED4wsnWmU4bQNbFOr/bu2zY7XYriqIQ+/1+9sL4mHA63b8pXSadM2Dmti+E84ypcKo1mf7vZN2z87u97YbdbDZit9tZ33kyJpxO12vKLnkbXbo5wqn+l3lbVhzCqaa/syxTJsp58tkSLkkSpzsi5gg3pW1CF87kjf9ACV84IvkEwW63kwo09HaBDeFsvyUwVCCcXn0siGUIJ3uK1HUt/cyhdZu5ws3ZuFzXtdjtdncTKbKCLqVefSyIZQg35Qc5+jK0M3yucCbdyLqu79Z+TLu2YwmmszNkiZMmERx9sQzhdBdlh8rQNqs5wunEMvQm9RBzFr5VZcqygM6bB3PbV1a3qutDuAlM7TZMedFzbLfFHOF0ngK6Z5TMEW6NC9+q+mDYimWb5Qg35fiAsX13c4RTxW+y1091R5cJp+rWLnFrl84Y0vQ9tqqq7k5qq6pKlGUp8jwXaZpyvBO3HOGm/DDH2FvTLoUzGdjP+Szbm5d1x6UuhSNSd5VN39ZW9QSm/EhMFMJN+empsa5dCMLpPFF8vZ5jMinlWjibm7JdPDGjEY7IbBwn6++7FE43IXT2VarktfECqukMsGvhdOLRfSqpYtE5AS5q4Uw2/8p+3mqOcDpjSdk4zuQ4O9XEh+64q2kakef5vbt5lmWTxsWuhSNSdwOFUHctdTZiMxwmtCzhTM4nlN0FXc9SCtEJf/76kOlhsTrJaePMRpPiQzjdM00Oh4PIsuzuCd6/maFzY57zM9arEk4mislPUMkmDFTSyJIiSRInZ1EOFd0uj63j5LiXBU5xfWoXXkDVrAjdIvsMlbhzDxEyKSp5dSY9bJzhWNe11pPFl3Auz6Vk3CK2POF0uguqRp0rHNH8p0p/9LZqLU53nDHnlOKqqkSSJOx7KX1Ix3Bw0LKF09l+pLqD2RBuTjI0TXM3vlM9VUx/29xknNg0zb0tYKEJd/qd5hb8tsBIUQmn0+1RfYYN4aYk+NgeS9X/m64V9T/pNPTWeV3Xoqqqwb2WqnrR2VrlagPy1F/Pads27l/PWSNJkoweq9AneIC/VfYFSzjiQPX7cP02rv4VqMDqnD0AEBBLEG7hsAcAAkIlnOl4EnwBewBgIv14qz/ktD9qoiiKyQedqsZIK3jjmhv2AMBEdDcBmCwrqCZvmBaL1wR7AGAiOm8L9E9Anc9S7atcwcufIcAeAJiB7jrg+Z7DnjRNRVEUWpuFmReM1wJ7AGAGcw5XMi2BrGMtHfYAwExc7Tc8LZgssQZ7AGAmLjf5CoGupGXYAwAWmLNxWVbwZLMOewDAIrovX8pKYHsP1wZ7AMABm81G5Hl+95t0Mgn7o+LLspx0eCwwgj0AAGKCPQAAYoI9AABigj0AAGKCPQAAYoI9AABiwt2HP7gg8fZbEtdvSNz8SkL8AUB43L7rcvTyxYKFe/4UkoHlcfNrl7uLEu75UxLHK/7KA2AqDqWz+4EPLvBkA8vneLUQ4d5+y19ZANjA0ZjO7gdev+GvKABscP1mAcLdvuOvKABs4KhbafcDuSsJAJtAOAA8AuEA8AiEA8AjEA4Aj0A4ADwC4QDwCIQDwCMQDgCPQDgAPALhPPP+ld36efKIxHdfdbz5hsTvP5D45ze38f398/x6+O6r+Npe/AHhvGNbuDG+Tkj89ZOb+CDcdCCcZ3wJ17P9mkTzwW58EG46EM4zvoUj6p52utJBOLdAOM9wCNdLZys+CDcdCOcZLuGISPzyvZ34INx0IJxnOIUjIvH//0E4CBdRpdtK6H9+6/7u/atuaUC3Pt984yc+FRAOwnnBVUK/+UavPh9e8MR3DoSDcF5wmdC60sk+H8K5BcJ5xmVCNx+6J5jq83//gSe+UyAchPOC64T+5Xv1579/xRdfD4SDcF5wndB//gjhQgbCecZ1Qv/9M4QLGQjnGTzhOiAchPOC64TWmamEcHxAOM+EMEv554888Z0C4SCcF0JYh5Nt7+LeerbmtodwKxGu+aAv25NH8+ODcBBuMdgQrvnQ/c1fP3XrbjrdyB7ZojeEg3DsFcQhnCuePFK/iArhINyq4ExonTNOIByEWxVcCa3z8imEg3DsFbQG4XRlg3AQjr2Clizcwwvzo/KwDucWCOcZH8I9vOiuY3I8nkl8EG46EM4zNoV7eHH/1OX3r+bLAOHcAuE84yuhQ48PwkG4VSV06PFBOAi3qoQOPT4IB+FWldChxwfhINyqEjr0+CAchFtVQoceH4SDcKtK6NDjg3AQblUJHXp8EA7CrSqhQ48PwkG4VSV06PFBOAi3qoQOPT4IB+FWldChxwfhINyqEjr0+CAchFtVQoceH4SDcKtK6NDjg3AQblUJHXp8EA7CAeAcCAeARyAcAB6BcAB4BMIB4BEIB4BHIBwAHoFwAHgEwgHgEQgHgEcgHAAegXAAeCR44W7f8VcSADY4Xi1AuI+v+SsKABt8+u8ChLt8wV9RANjg8sUChHtwgW4lWD6377pcDl44IhLPn/JXGABzePnMiWxuhCMi8ew/eNKB5XG8ciqbO+F6Ll90g8/jFX9lAjDE8arL0csXzrqR/oQDANyDPQAAYoI9AABigj0AAGKCPQAAYoI9AABigj0AAGKCPQAAYoI9AABigj0AAGKCjgEEAUAs0E0AQQAQA7dERB8DCASAGLgmInoZQCAAxMBL+lzQrQTALTdE9IA+l8cBBATAWjkS0XM6K28DCAyANXJJIwXSAWCPI3VO3XUlh8ozwpgOgLncUOeSdnlN3ZLBbQDBAxA6R+pc+USdO4NPtX8BK0q/Y5IfURcAAAAASUVORK5CYII=
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
// @grant     GM_info
// @grant     GM_openInTab
// @grant     GM_xmlhttpRequest
// @grant     GM.addElement
// @grant     GM.info
// @grant     GM.openInTab
// @grant     GM.xmlHttpRequest
// @match     https://*.pornhub.com/*
// @match     https://*.pornhubpremium.com/*
// @match     https://*.youporn.com/*
// @match     https://*.youporngay.com/*
// @match     https://*.redtube.com/*
// @match     https://*.tube8.com/*
// @match     https://*.thumbzilla.com/*
// @match     https://onlyfans.com/*
// @match     https://xhamster.com/*
// @match     https://*.xnxx.com/*
// @match     https://*.xvideos.com/*
// @match     https://beeg.com/*
// @match     https://91porn.com/view_video.php?*
// @match     https://hqporner.com/hdporn/*
// @match     https://spankbang.com/*/video/*
// @match     https://*.porntrex.com/video/*/*
// @match     https://*.analdin.com/*
// @match     https://sxyprn.com/post/*
// @noframes
// @run-at     document-start
// ==/UserScript==
(() => {
'use strict';
const Limit_Downloads = false; // Will apply to OnlyFans only

/******************************************************************************/
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
if (inIframe()) {
  return;
}
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
/******************************************************************************/

/**
 * To compile this CSS `pnpm run build:Sass`
 * @desc Link to uncompiled Cascading Style Sheet
 * @link https://github.com/magicoflolis/Magic-PH/tree/master/src/sass
 */
const mainCSS = `:root {
  --mph-site-color: hsl(36, 100%, 50%);
  --mph-hover-color: hsl(36, 100%, 35%);
  --mph-background-color: hsl(0, 0%, 0%);
  --mph-controls-bg-color: hsla(0, 0%, 0%, 0.5);
  --mph-border-color: hsl(36, 100%, 50%);
  --mph-text-color: hsl(210, 12%, 97%);
  --mph-root-bg: hsla(0, 0%, 0%, 0.9);
  --mph-header-bg: hsla(0, 0%, 0%, 0);
}

.hidden {
  display: none !important;
  z-index: -1 !important;
}

main-userjs {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  word-break: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}
main-userjs.expanded {
  height: 100% !important;
  bottom: 0rem !important;
}
main-userjs:not(.webext-page) {
  height: 492px;
  position: fixed;
}
main-userjs:not(.webext-page):not(.expanded) {
  margin-left: 1rem;
  margin-right: 1rem;
  right: 1rem;
  bottom: 1rem;
}
main-userjs:not(.webext-page):not(.expanded).auto-height {
  height: auto;
}
main-userjs:not(.hidden) {
  z-index: 100000000000000000 !important;
  display: flex !important;
  flex-direction: column !important;
}
main-userjs mph-toolbar {
  order: 0;
  padding: 0.5em;
  display: flex;
  place-content: space-between;
}
main-userjs mph-toolbar mph-tabs {
  overflow: hidden;
  order: 0;
}
main-userjs mph-toolbar mph-column {
  flex-flow: row nowrap;
  order: 999999999999;
}
main-userjs mph-toolbar > * {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
main-userjs mph-tabs {
  display: flex;
  gap: 0.5em;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: var(--mph-header-bg, hsla(0, 0%, 0%, 0));
  flex-flow: row wrap;
}
main-userjs mph-tabs mph-tab {
  margin: 0.25em;
  padding: 0.25em;
  min-width: 150px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  place-content: space-between;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  gap: 0.25em;
}
main-userjs mph-tabs mph-tab.active {
  background-color: var(--mph-background-color, hsl(0, 0%, 0%));
}
main-userjs mph-tabs mph-tab:not(.active):hover {
  background-color: var(--mph-background-color, hsl(0, 0%, 0%));
}
main-userjs mph-tabs mph-tab mph-host {
  float: left;
  overflow: auto;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}
main-userjs mph-tabs mph-tab mph-elem {
  float: right;
}
main-userjs mph-tabs mph-addtab {
  order: 999999999999;
  margin: 0.25em;
  font-size: 20px;
  padding: 0px 0.25em;
}
main-userjs mph-tabs mph-addtab:hover {
  background-color: var(--mph-background-color, hsl(0, 0%, 0%));
}
main-userjs input {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  background: hsla(0, 0%, 0%, 0);
  color: var(--mph-text-color, hsl(210, 12%, 97%));
}
main-userjs input:not([type=checkbox]) {
  border: transparent;
  outline: none !important;
}
@media screen and (max-height: 720px) {
  main-userjs:not(.webext-page) {
    height: 100% !important;
    bottom: 0rem !important;
    right: 0rem !important;
    margin: 0rem !important;
  }
}

.mgp_download {
  color: var(--mph-text-color, hsl(210, 12%, 97%));
}

.mph_progressContainer {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: auto;
  color: var(--mph-site-color, hsl(36, 100%, 50%));
  background-color: var(--mph-background-color, hsl(0, 0%, 0%));
  border: 1px solid var(--mph-border-color, hsl(36, 100%, 50%));
  margin: 0 3px;
  border-radius: 1000px;
  padding: 14px 16px;
  position: fixed;
  display: none;
  top: 10em;
  left: 0.5em;
  z-index: 50000;
  font-size: 14px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 20px;
  text-align: center;
}
.mph_progressContainer .mph_progress {
  font-size: 16px;
  font-weight: 700;
  margin: auto;
  color: currentcolor !important;
}

.mgp_download .magicph-icon {
  height: 1.25em;
}

.mgp_videoStarted.mgp_hideControls .mgp_download {
  display: none;
}

.mgp_contextMenu > .mgp_content > .mgp_download {
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.2) !important;
}

ul.mgp_switches > .mgp_download {
  display: grid !important;
}
ul.mgp_switches > .mgp_download .magicph-icon {
  display: block;
  font-size: 25px;
  min-height: 36px;
  left: 50%;
  padding-bottom: 5px;
  position: relative;
  top: 0px;
  transform: translate(-50%, 0%);
}

.xp-context-menu .mgp_download {
  color: hsl(0, 0%, 63%);
  cursor: pointer;
  font-family: ArialMT, sans-serif;
  font-size: 14px;
  line-height: 2.14;
  padding: 0 20px;
}
.xp-context-menu .mgp_download:hover {
  background: hsl(0, 0%, 26%);
  color: hsl(0, 0%, 100%);
}

.mgp_controls > .mgp_download {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-min-content;
  height: -moz-min-content;
  height: min-content;
  cursor: pointer;
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 80%;
  right: 0;
  z-index: 150;
  border-radius: 5px;
  background-color: hsla(0, 0%, 0%, 0.7);
  padding: 8px 10px;
}

mph-root,
.mph_of_root {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 10px;
}

mph-root {
  color: var(--mph-text-color, hsl(210, 12%, 97%));
  background: var(--mph-root-bg, hsla(0, 0%, 0%, 0.9));
  border: 1px solid hsla(211, 12%, 59%, 0.25);
}
mph-root .mph_list_header {
  order: 0;
  display: flex;
  background: var(--mph-header-bg, hsla(0, 0%, 0%, 0));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  place-content: space-between;
  height: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.5em 0.5em 0 0.5em;
  font-size: 1.6rem;
}
mph-root .mph_list_header .mgp_title {
  order: 0;
  cursor: default !important;
  float: left !important;
}
mph-root .mph_list_header mph-close {
  order: 99999;
  cursor: pointer !important;
  float: right !important;
  border: 0 !important;
}
mph-root .mph_of_header {
  gap: 1em;
  justify-content: center;
  display: flex;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
mph-root mph-a:not(.self-container) {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
mph-root mph-a svg {
  fill: currentColor;
  width: 12px;
  height: 12px;
  background: transparent;
}
mph-root mph-a > img {
  cursor: pointer;
  max-width: 25rem;
  max-height: 15rem;
  display: block;
  margin: auto;
}
mph-root mph-list {
  order: 1;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-x: hidden;
}
mph-root mph-list.mph-list {
  padding: 0px;
  flex-flow: column nowrap;
  gap: 0.5em;
}
mph-root mph-list.mph-list .mph-item {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  justify-content: space-evenly;
}
mph-root mph-list.mph-list .mph-item label > input {
  outline: 0 none;
  background: transparent;
  border: 0;
  -webkit-user-select: all !important;
  -moz-user-select: all !important;
  -ms-user-select: all !important;
  user-select: all !important;
}
mph-root mph-list.mph-list .mph-item mph-page {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  justify-content: center;
  display: grid;
  overflow-y: auto;
}
mph-root mph-list.mph_of_list {
  height: 100%;
  flex-flow: row wrap;
  gap: 1em;
  margin: auto;
  touch-action: auto;
  padding: 0.5em;
}
mph-root mph-list.mph_of_list.mph_mobile {
  flex-flow: row wrap;
  justify-content: center;
}
mph-root mph-list.mph_of_list .wrap {
  display: flex;
  flex-flow: column wrap;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  border: 1px solid rgba(138, 150, 163, 0.25);
  border-radius: 10px;
  background-color: var(--overlay-color, rgba(0, 0, 0, 0.6));
  padding: 0.5em;
  gap: 0.5em;
  margin: auto;
}
mph-root mph-list.mph_of_list .wrap mph-a {
  order: 1;
}
mph-root mph-list.mph_of_list .wrap mph-title {
  order: 2;
}
mph-root mph-list.mph_of_list .wrap mph-title > mph-a,
mph-root mph-list.mph_of_list .wrap mph-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--mph-text-color, hsl(210, 12%, 97%));
  word-break: break-word;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serif;
  outline-style: none;
  text-decoration: none;
  text-align: center;
}
mph-root mph-list.mph_of_list .wrap mph-title > mph-a:hover,
mph-root mph-list.mph_of_list .wrap mph-title:hover {
  text-decoration: underline;
}
mph-root mph-list.mph_of_list .wrap .btn-container {
  order: 0;
  display: flex;
  gap: 0.5em;
  justify-content: center;
}
mph-root mph-list.mph_of_list .wrap video {
  order: 3;
  width: 10em;
  height: 10em;
}
mph-root mph-list.mph_of_list .wrap .more-info {
  order: 99999;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  text-align: center;
  border-radius: 10px;
  color: var(--mph-site-color, hsl(36, 100%, 50%));
  border: 1px solid var(--mph-border-color, hsl(36, 100%, 50%));
  padding: 0 0.5em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: hsla(211, 12%, 59%, 0.05);
}
mph-root mph-list mph-a {
  -webkit-text-decoration: 0;
  text-decoration: 0;
  color: var(--mph-site-color, var(--mph-text-color, hsl(36, 100%, 50%)));
}
mph-root mph-list mph-a:hover {
  color: var(--mph-hover-color, hsl(36, 100%, 50%));
  -webkit-text-decoration: 0;
  text-decoration: 0;
}
mph-root > video {
  order: 2;
  padding: 1em;
}

mph-btn {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  text-align: center;
  border-radius: 10px;
}
mph-btn:not(.of_btn) {
  color: var(--mph-text-color, hsl(210, 12%, 97%));
  background-color: var(--overlay-color, rgba(0, 0, 0, 0.6));
  border: 1px solid rgba(138, 150, 163, 0.25);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 0.1em 0.5em;
}
mph-btn.of_btn {
  color: var(--mph-site-color, hsl(36, 100%, 50%));
  border: 1px solid var(--mph-border-color, hsl(36, 100%, 50%));
  padding: 0 0.5em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: var(--mph-background-color, hsl(0, 0%, 0%));
}
mph-btn.of_btn[data-command=toggle-list] {
  background-color: var(--bg-color, hsl(240, 4%, 9%));
}
mph-btn svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
  background: transparent;
}

mph-controls {
  display: flex;
  margin: auto;
  position: fixed;
  background-color: transparent;
  border: transparent;
  color: inherit;
  justify-content: center;
  gap: 1em;
  padding: 0.3em 0.5em;
  z-index: 50000;
  box-sizing: border-box;
  font: 16px/1.3334 Roboto, sans-serif;
}
mph-controls:not(.mph_mobile) {
  bottom: 1em;
  right: 1em;
}
mph-controls.mph_mobile {
  top: 1em;
  left: 1em;
}
mph-controls .mph_overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  will-change: opacity;
  transition: none;
  background: hsl(0, 0%, 0%);
  opacity: 0.4;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  border: 1px solid hsla(211, 12%, 59%, 0.25);
  border-radius: 10px;
  z-index: -1;
}
`;
/**
* Link to uncompressed locales + compiler
* @link https://github.com/magicoflolis/Magic-PH/tree/master/src/_locales
* @link https://github.com/magicoflolis/Magic-PH/blob/master/tools/languageLoader.js
*/
const translations = {
 "en": {
  "newTab": "New Tab",
  "copy": "Copy",
  "no_license": "N/A",
  "close": "Close",
  "download": "Download",
  "remove": "Remove"
 }
};
// #region Console Logs
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cMagicPH%c] %cDBG',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cMagicPH%c] %cERROR',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  const a = typeof alert !== 'undefined' && alert;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex && a) {
      a(`[Magic Userscript+] (${ex.cause}) ${ex.message}`);
    }
  }
};
const info = (...msg) => {
  console.info(
    '[%cMagicPH%c] %cINF',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};

const log = (...msg) => {
  console.log(
    '[%cMagicPH%c] %cLOG',
    'color: rgb(255,153,0);',
    '',
    'color: rgb(255, 212, 0);',
    ...msg
  );
};
// #endregion

/**
 * https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/global-this.js
 * @returns {typeof globalThis}
 */
function globalWin() {
  const check = function (it) {
    return it && it.Math === Math && it;
  };
  return (
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof this == 'object' && this) ||
    (function () {
      return this;
    })() ||
    Function('return this')()
  );
}

/** @type { import("../typings/UserJS.d.ts").safeSelf } */
function safeSelf() {
  if (userjs.safeSelf) {
    return userjs.safeSelf;
  }
  const g = globalWin();
  const safe = {
    XMLHttpRequest: g.XMLHttpRequest,
    createElement: g.document.createElement.bind(g.document),
    createElementNS: g.document.createElementNS.bind(g.document),
    createTextNode: g.document.createTextNode.bind(g.document),
    navigator: g.navigator
  };
  userjs.safeSelf = safe;
  return userjs.safeSelf;
}

let currentUserId;
let tsSrc;
let vueRouter = [];

const getUAData = () => {
  if (userjs.isMobile !== undefined) {
    return userjs.isMobile;
  }
  try {
    const { navigator } = safeSelf();
    if (navigator) {
      const { userAgent, userAgentData } = navigator;
      const { platform, mobile } = userAgentData ? Object(userAgentData) : {};
      userjs.isMobile =
        /Mobile|Tablet/.test(userAgent ? String(userAgent) : '') ||
        Boolean(mobile) ||
        /Android|Apple/.test(platform ? String(platform) : '');
    } else {
      userjs.isMobile = false;
    }
  } catch (ex) {
    userjs.isMobile = false;
    ex.cause = 'getUAData';
    err(ex);
  }
  return userjs.isMobile;
};
const isMobile = getUAData();
const BLANK_PAGE = 'about:blank';
const isGM = typeof GM !== 'undefined';
const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

// #region i18n
class i18nHandler {
  constructor() {
    if (userjs.pool !== undefined) {
      return this;
    }
    userjs.pool = new Map();
    for (const [k, v] of Object.entries(translations)) {
      if (!userjs.pool.has(k)) userjs.pool.set(k, v);
    }
  }
  /**
   * @param {string | Date | number} str
   */
  toDate(str = '') {
    const { navigator } = safeSelf();
    return new Intl.DateTimeFormat(navigator.language).format(
      typeof str === 'string' ? new Date(str) : str
    );
  }
  /**
   * @param {number | bigint} number
   */
  toNumber(number) {
    const { navigator } = safeSelf();
    return new Intl.NumberFormat(navigator.language).format(number);
  }
  /**
   * @type { import("../typings/UserJS.d.ts").i18n$ }
   */
  i18n$(key) {
    const { navigator } = safeSelf();
    const current = navigator.language.split('-')[0] ?? 'en';
    return userjs.pool.get(current)?.[key] ?? 'Invalid Key';
  }
}
const language = new i18nHandler();
const { i18n$ } = language;
// #endregion
// #region Utilities
/**
 * @type { import("../typings/types.d.ts").qs }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * @type { import("../typings/types.d.ts").qsA }
 */
const qsA = (selectors, root) => {
  try {
    return (root || document).querySelectorAll(selectors);
  } catch (ex) {
    err(ex);
  }
  return [];
};
/**
 * @type { import("../typings/types.d.ts").query }
 */
const query = async (selector, root) => {
  try {
    while (isNull((root || document).querySelector(selector))) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return root;
};
/**
 * @type { import("../typings/types.d.ts").objToStr }
 */
const objToStr = (obj) => Object.prototype.toString.call(obj);
/**
 * @type { import("../typings/types.d.ts").strToURL }
 */
const strToURL = (str) => {
  const WIN_LOCATION = window.location ?? BLANK_PAGE;
  try {
    str = str ?? WIN_LOCATION;
    return objToStr(str).includes('URL') ? str : new URL(str);
  } catch (ex) {
    ex.cause = 'strToURL';
    this.showError(ex);
  }
  return WIN_LOCATION;
};
/**
 * @type { import("../typings/types.d.ts").isRegExp }
 */
const isRegExp = (obj) => {
  const s = objToStr(obj);
  return s.includes('RegExp');
};
/**
 * @type { import("../typings/types.d.ts").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("../typings/types.d.ts").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("../typings/types.d.ts").isFN }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("../typings/types.d.ts").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/types.d.ts").isBlank }
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
 * @type { import("../typings/types.d.ts").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @type { import("../typings/types.d.ts").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true, root) => {
  if (Object.is(target, null) || Object.is(target, undefined)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from((root || document).querySelectorAll(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
      if (isMobile && type === 'click') {
        elem.addEventListener('touchstart', listener, options);
        continue;
      }
      elem.addEventListener(type, listener, options);
    }
  } catch (ex) {
    err(ex);
  }
};
/**
 * @type { import("../typings/types.d.ts").formAttrs }
 */
const formAttrs = (elem, attr = {}) => {
  if (!elem) {
    return elem;
  }
  for (const key in attr) {
    if (typeof attr[key] === 'object') {
      formAttrs(elem[key], attr[key]);
    } else if (isFN(attr[key])) {
      if (/^on/.test(key)) {
        elem[key] = attr[key];
        continue;
      }
      ael(elem, key, attr[key]);
    } else if (key === 'class') {
      elem.className = attr[key];
    } else {
      elem[key] = attr[key];
    }
  }
  return elem;
};
/**
 * @type { import("../typings/types.d.ts").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    const { createElement } = safeSelf();
    el = createElement(tagName);
    if (!isEmpty(cname)) {
      if (typeof cname === 'string') {
        el.className = cname;
      } else if (isObj(cname)) {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (typeof attrs === 'string') {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
    ex.cause = 'make';
    err(ex);
  }
  return el;
};

/**
 * @type { import("../typings/UserJS.d.ts").getGMInfo }
 */
const getGMInfo = () => {
  if (isGM) {
    if (isObj(GM.info)) {
      return GM.info;
    } else if (isObj(GM_info)) {
      return GM_info;
    }
  }
  return {
    script: {
      icon: '',
      name: 'MagicPH',
      namespace: 'https://github.com/magicoflolis/MagicPH',
      updateURL: 'https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.user.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/Magic-PH/issues'
    }
  };
};
const $info = getGMInfo();
/**
 * @type { import("../typings/UserJS.d.ts").loadCSS }
 */
const loadCSS = (css, name = 'CSS') => {
  try {
    if (typeof name !== 'string') {
      throw new Error('"name" must be a typeof "string"', { cause: 'loadCSS' });
    }
    const parent = document.documentElement || document.head || document.body;
    if (qs(`style[data-role="${name}"]`, parent)) {
      return qs(`style[data-role="${name}"]`, parent);
    }
    if (typeof css !== 'string') {
      throw new Error('"css" must be a typeof "string"', { cause: 'loadCSS' });
    }
    if (isBlank(css)) {
      throw new Error(`"${name}" contains empty CSS string`, { cause: 'loadCSS' });
    }
    if (isGM) {
      let sty;
      if (isFN(GM.addElement)) {
        sty = GM.addElement(parent, 'style', {
          textContent: css
        });
      } else if (isFN(GM_addElement)) {
        sty = GM_addElement(parent, 'style', {
          textContent: css
        });
      }
      if (isElem(sty)) {
        sty.dataset.insertedBy = $info.script.name;
        sty.dataset.role = name;
        return sty;
      }
    }
    const sty = make('style', {
      textContent: css,
      dataset: {
        insertedBy: $info.script.name,
        role: name
      }
    });
    parent.appendChild(sty);
    return sty;
  } catch (ex) {
    err(ex);
  }
};
const delay = (timeout = 5000) => new Promise((resolve) => setTimeout(resolve, timeout));
/**
 * @type { import("../typings/UserJS.d.ts").observe }
 */
const observe = (element, listener, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(listener);
  observer.observe(element, options);
  listener.call(element, [], observer);
  return observer;
};
const smToArr = (m) => {
  let arr = [];
  if (objToStr(m).includes('Map')) {
    for (const [k, v] of m) {
      arr.push([k, v]);
    }
  } else if (objToStr(m).includes('Set')) {
    arr.push(...[...m]);
  } else if (Array.isArray(m)) {
    arr = m;
  } else {
    arr = normalizeTarget(m);
  }
  return arr;
};
const fancyTimeFormat = (duration) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
};
// #endregion

// #region Classes
/**
 * @type { import("../typings/types.d.ts").dom }
 */
const dom = {
  attr(target, attr, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr);
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  },
  prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
    }
  },
  text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  },
  remove(target) {
    return normalizeTarget(target).some((elem) => elem.remove());
  },
  cl: {
    add(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.add(...token));
    },
    remove(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.remove(...token));
    },
    toggle(target, token, force) {
      let r;
      for (const elem of normalizeTarget(target)) {
        r = elem.classList.toggle(token, force);
      }
      return r;
    },
    has(target, token) {
      return normalizeTarget(target).some((elem) => elem.classList.contains(token));
    }
  }
};

// const urlContainer = make('mph-url');
// const urlBar = make('input', 'mph-url-bar', {
//   autocomplete: 'off',
//   spellcheck: false,
//   type: 'text',
//   placeholder: 'Placeholder text'
// });

// #region Handle Page
class HandlePage {
  constructor(url) {
    this.remove = this.remove.bind(this);
    this.hosts = {
      // 'about:blank': {
      //   domains: [],
      //   ...HandlePage.domainDefaults
      // },
      pornhub: {
        domains: ['pornhub.com', 'pornhubpremium.com']
      },
      youporn: {
        domains: ['youporn.com', 'youporngay.com']
      },
      redtube: {
        domains: ['redtube.com']
      },
      tube8: {
        domains: ['tube8.com']
      },
      thumbzilla: {
        domains: ['thumbzilla.com']
      },
      onlyfans: {
        domains: ['onlyfans.com']
      },
      xhamster: {
        domains: ['xhamster.com']
      },
      xnxx: {
        domains: ['xnxx.com']
      },
      xvideos: {
        domains: ['xvideos.com']
      },
      beeg: {
        domains: ['beeg.com']
      },
      '91porn': {
        domains: ['91porn.com']
      },
      hqporner: {
        domains: ['hqporner.com']
      },
      spankbang: {
        domains: ['spankbang.com']
      },
      porntrex: {
        domains: ['porntrex.com']
      },
      analdin: {
        domains: ['analdin.com']
      },
      porn00: {
        domains: ['porn00.org']
      },
      sxyprn: {
        domains: ['sxyprn.com']
      }
    };
    this.videoData = {};
    this.cache = {
      domain: 'blank'
    };
    this.current = url;
    this.theme = undefined;
    if (isEmpty(url) || !isNull(this.theme)) {
      this.theme = this.themeHandler().load();
    }
    this.supported = isFN(make('main-userjs').attachShadow);
    this.frame = make('main-userjs', 'hidden', {
      dataset: {
        insertedBy: $info.script.name,
        role: 'primary-container'
      }
    });
    this.injected = false;

    window.addEventListener('beforeunload', this.remove);
  }
  /**
   * @param { function(): * } callback
   * @param { Document } doc
   */
  inject(callback, doc) {
    if (!doc) {
      return;
    }
    try {
      if (this.injected || !isNull(qs('main-userjs'))) {
        return;
      }
      info({ Site: this.webpage.origin, isMobile, validDomain: this.cache.validDomain });

      if (isMobile) {
        dom.cl.add([this.frame, mphControls, dul], 'mph_mobile');
        // Prevents being redirected to "Continue to video"
        if (this.host.includes('pornhub')) {
          const makeCookie = (name, value, options = {}) => {
            try {
              Object.assign(options, {
                path: '/'
              });
              if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
              }
              let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
              for (const key in options) {
                updatedCookie += `; ${key}`;
                const optionValue = options[key];
                if (optionValue !== true) {
                  updatedCookie += `=${optionValue}`;
                }
              }
              document.cookie = updatedCookie;
              info('[makeCookie] New cookie value:', updatedCookie);
              return updatedCookie;
            } catch (ex) {
              err(ex);
            }
            return '';
          };
          makeCookie('views', '0', { domain: `.${this.host}` });
          // If we are on `/interstitial?viewkey=`
          if (isFN(win.clearModalCookie) && this.webpage.searchParams.has('viewkey')) {
            const videoURL = `${this.webpage.origin}/view_video.php?viewkey=${this.webpage.searchParams.get('viewkey')}`;
            info(`Redirecting to "${videoURL}"`);
            window.location.href = videoURL;
            return;
          }
        }
      }
      if (isNull(loadCSS(mainCSS, 'primary-stylesheet'))) {
        throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
      }
      if (isEmpty(this.frame)) {
        throw new Error('Failed to initialize script!', { cause: 'inject' });
      }
      const overlay = make('mph-elem', 'mph_overlay');
      const header = make('mph-elem', 'mph_list_header');
      const closeVQ = make('mph-elem', 'mgp_title', {
        innerHTML: $info.script.name
      });
      const closeHM = make('mph-close', '', {
        innerHTML: '🗙',
        dataset: {
          command: 'close'
        }
      });
      const listToggle = make('mph-btn', 'of_btn', {
        title: 'Hide/show list',
        textContent: 'Show List ',
        dataset: {
          command: 'toggle-list'
        }
      });
      const listCounter = make('mph-count', '', {
        textContent: '(0)'
      });
      listToggle.append(listCounter);
      header.append(closeVQ, closeHM);
      dContainer.append(header, tab.el.head, dul);
      this.frame.append(dContainer);
      mphControls.append(overlay);
      if (/onlyfans/.test(this.current.root)) {
        const ofsHeader = make('mph-elem', 'mph_of_header');
        ofsHeader.append(ofscopy, ofsdwn);
        header.append(ofsHeader);
        ofscopy.append(copyCounter);
        ofsdwn.append(dwnCounter);
      }
      mphControls.append(listToggle);
      progressFrame.append(progressElem);
      doc.documentElement.append(this.frame, progressFrame, mphControls);
      this.injected = true;
      if (isFN(callback)) {
        callback.call(this, doc);
      }
    } catch (ex) {
      err(ex);
      this.remove();
    }
  }
  themeHandler() {
    return {
      background: null,
      border: null,
      'controls-background': null,
      color: null,
      header: null,
      hover: null,
      root: null,
      get() {
        return this.color !== null ? this.color : this.find();
      },
      find() {
        const p = this.current ? this.current.root : window.location.host;
        if (/tube8/.test(p)) {
          this.color = 'hsl(201, 64%, 40%)';
          this.hover = 'hsl(201, 64%, 25%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/thumbzilla/.test(p)) {
          this.color = 'hsl(168, 75%, 42%)';
          this.hover = 'hsl(168, 75%, 27%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/redtube/.test(p)) {
          this.color = 'hsl(357, 76%, 39%)';
          this.hover = 'hsl(357, 76%, 24%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/youporn/.test(p)) {
          this.color = 'hsl(345, 80%, 63%)';
          this.hover = 'hsl(345, 80%, 48%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        } else if (/onlyfans/.test(p)) {
          this.color = 'var(--text-color, var(--mph-text-color, hsl(210, 12%, 97%)))';
          this.hover = 'var(--swiper-theme-color, hsl(196, 100%, 32%))';
          this.background = 'rgba(138,150,163,.12)';
          this['controls-background'] =
            'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))';
          this.border = this.background;
          this.root = 'var(--overlay-color, var(--mph-controls-bg-color, hsla(0, 0%, 0%, 0.5)))';
          this.header = this.root;
        } else if (/xhamster/.test(p)) {
          this.color = 'var(--color-white-origin, #fff)';
          this.hover = '#d42025';
          this.background = 'var(--color-accent-red, #e34449)';
          this.border = this.background;
        } else {
          this.color = 'hsl(36, 100%, 50%)';
          this.hover = 'hsl(36, 100%, 35%)';
          this.background = 'hsl(0, 0%, 0%)';
          this.border = this.color;
        }
        return this.color;
      },
      load() {
        const root = qs(':root');
        if (!root) {
          err('"root" not found');
          return this;
        }
        if (!this.color) {
          this.get();
        }
        root.style.setProperty('--mph-site-color', this.color);
        if (this.hover) {
          root.style.setProperty('--mph-hover-color', this.hover);
        }
        if (this.background) {
          root.style.setProperty('--mph-background-color', this.background);
        }
        if (this.border) {
          root.style.setProperty('--mph-border-color', this.border);
        }
        if (this.root) {
          root.style.setProperty('--mph-root-bg', this.root);
        }
        if (this.header) {
          root.style.setProperty('--mph-header-bg', this.header);
        }
        return this;
      }
    };
  }
  static domainDefaults = {
    validDomain: false,
    validPath: false,
    pathType: 'Unknown'
  };
  static videoDefaults = {
    title: 'MagicPH',
    mediaFiles: [],
    playerId: 0
  };
  /**
   * @type { import("../typings/types.d.ts").HandlePage['current'] }
   */
  get current() {
    return this.cache;
  }
  set current(url) {
    const urlObj = strToURL(url || window.location);
    const { host } = urlObj;
    this.webpage = urlObj;
    this.host = this.getHost(host);
    /** @type { string } */
    const d = host.split('.').at(-2);
    const root = this.hosts[d] ? d : 'blank';
    const hostDom = {
      ...HandlePage.domainDefaults,
      ...(this.hosts[d] ?? {})
    };
    const routes = new Map();
    if (this.hosts[d]) {
      const findIn = (reg, type = 'domains') => {
        return hostDom[type].find(
          (h) => (isRegExp(reg) && reg.test(h)) || (typeof reg === 'string' && reg.includes(h))
        );
      };
      if (findIn(/pornhub|tube8|youporn|thumbzilla|redtube/)) {
        if (findIn(/pornhub/)) {
          routes.set('GIF', /^\/gif\/\d+(?:\/(?=$))?$/i);
          routes.set('Shorties', /^\/shorties(?:\/(?=$))?$/i);
        }
        if (findIn(/redtube/)) {
          routes.set('Video', /\/[\d]+/g);
        } else {
          routes.set('Video', /(video|watch)+|\/[\d]+\//g);
        }
      }
      for (const [k, v] of routes) {
        if (isRegExp(v) && v.test(urlObj.pathname)) {
          hostDom.validPath = true;
          hostDom.pathType = k;
          break;
        } else if (typeof v === 'string' && v.includes(urlObj.pathname)) {
          hostDom.validPath = true;
          hostDom.pathType = k;
          break;
        }
      }
      // if (/onlyfans/.test(root)) {
      //   hostDom.validPath = true;
      //   hostDom.pathType = urlObj.pathname;
      // }
      if (!hostDom.validPath) {
        hostDom.pathType = 'Unknown';
      }
      if (findIn(urlObj.host, 'domains')) {
        hostDom.validDomain = true;
      } else {
        hostDom.validDomain = false;
      }
    }
    this.cache = {
      webpage: this.webpage,
      host: this.host,
      root,
      routes,
      ...hostDom
    };
  }
  get Video() {
    return this.videoData;
  }
  set Video(obj = {}) {
    this.videoData = {
      ...this.videoData,
      ...obj
    };
  }
  /**
   * @template { string } S
   * @param { S } str
   * @returns { S }
   */
  getHost(str = '') {
    return str.split('.').splice(-2).join('.');
  }
  refresh() {
    dom.cl.add(qsA('mph-list', dul), 'hidden');
  }
  updateCounters(num, ...hosts) {
    for (const h of hosts) {
      dom.text(qsA(`mph-count[data-host="${h}"]`), ` (${num ?? 0})`);
    }
    dom.text(qsA('mph-count:not([data-host])'), `(${num ?? 0})`);
  }
  remove() {
    if (this.frame) {
      this.frame.remove();
    }
  }
}
const HP = new HandlePage();
// #endregion
class Timeout {
  constructor() {
    this.ids = [];
  }
  /**
   * Set the Delay and reason for timeout
   * @param { number } localDelay - Delay in ms
   * @param { string } reason - Reason for timeout
   * @returns { Promise<void> } Promise Function
   */
  set = (localDelay, reason) =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        Object.is(reason, null) || Object.is(reason, undefined) ? resolve() : reject(reason);
        this.clear(id);
      }, localDelay);
      this.ids.push(id);
    });
  wrap = (promise, localDelay, reason) => Promise.race([promise, this.set(localDelay, reason)]);
  clear = (...ids) => {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
  };
}
// #endregion

//#region Icon SVGs
const iconSVG = {
  close: {
    viewBox: '0 0 384 512',
    html: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>'
  },
  copy: {
    viewBox: '0 0 448 512',
    html: '<path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>'
  },
  download: {
    viewBox: '0 0 384 512',
    html: '<path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>'
  },
  open: {
    viewBox: '0 0 512 512',
    html: '<path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/>'
  },
  mobileDownload:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mgp_icon magicph-icon" aria-hidden="true"><g class="download"><path d="M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ></path></g></svg>',
  remove:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="magicph-icon" aria-hidden="true"><g><path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/></g></svg>',
  video: {
    viewBox: '0 0 576 512',
    html: '<path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>'
  },
  load(type, container) {
    const { createElementNS } = safeSelf();
    const svgElem = createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
      svgElem.classList.add('magicph-icon');
    }
    try {
      if (typeof iconSVG[type].html === 'string') {
        svgElem.innerHTML = iconSVG[type].html;
        dom.attr(svgElem, 'id', `mph_${type ?? 'Unknown'}`);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ex) {
      /* empty */
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
//#endregion
const saveAs = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = make('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
};
const arrayConcat = (inputArray) => {
  const totalLength = inputArray.reduce((prev, cur) => prev + cur.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const e of inputArray) {
    result.set(e, offset);
    offset += e.length;
  }
  return result;
};
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data, useFetch = false) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    data = Object.assign({}, data);
    method = this.bscStr(method, false);
    responseType = this.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    if (isGM && !useFetch) {
      if (params.credentials) {
        Object.assign(params, {
          anonymous: false
        });
        if (Object.is(params.credentials, 'omit')) {
          Object.assign(params, {
            anonymous: true
          });
        }
        delete params.credentials;
      }
    } else if (params.onprogress) {
      delete params.onprogress;
    }
    return new Promise((resolve, reject) => {
      if (isGM && !useFetch) {
        Network.xmlRequest({
          url,
          responseType,
          ...params,
          onerror: (r_1) => {
            reject(new Error(`${r_1.status} ${url}`));
          },
          onload: (r_1) => {
            if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
            if (responseType.match(/basic/)) resolve(r_1);
            resolve(r_1.response);
          }
        });
      } else {
        fetch(url, params)
          .then((response_1) => {
            if (!response_1.ok) reject(response_1);
            const check = (str_2 = 'text') => {
              return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
            };
            if (responseType.match(/buffer/)) {
              resolve(check('arrayBuffer'));
            } else if (responseType.match(/json/)) {
              resolve(check('json'));
            } else if (responseType.match(/text/)) {
              resolve(check('text'));
            } else if (responseType.match(/blob/)) {
              resolve(check('blob'));
            } else if (responseType.match(/formdata/)) {
              resolve(check('formData'));
            } else if (responseType.match(/clone/)) {
              resolve(check('clone'));
            } else if (responseType.match(/document/)) {
              const respTxt = check('text');
              const domParser = new DOMParser();
              if (respTxt instanceof Promise) {
                respTxt.then((txt) => {
                  const doc = domParser.parseFromString(txt, 'text/html');
                  resolve(doc);
                });
              } else {
                const doc = domParser.parseFromString(respTxt, 'text/html');
                resolve(doc);
              }
            } else {
              resolve(response_1);
            }
          })
          .catch(reject);
      }
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  async xmlRequest(details) {
    if (isGM) {
      if (isFN(GM.xmlHttpRequest)) {
        return GM.xmlHttpRequest(details);
      } else if (isFN(GM_xmlhttpRequest)) {
        return GM_xmlhttpRequest(details);
      }
    }
    return await new Promise((resolve, reject) => {
      const { XMLHttpRequest } = safeSelf();
      const req = new XMLHttpRequest();
      let method = 'GET';
      let url = BLANK_PAGE;
      let body;
      for (const [key, value] of Object.entries(details)) {
        if (key === 'onload') {
          req.addEventListener('load', () => {
            if (isFN(value)) {
              value(req);
            }
            resolve(req);
          });
        } else if (key === 'onerror') {
          req.addEventListener('error', (evt) => {
            if (isFN(value)) {
              value(evt);
            }
            reject(evt);
          });
        } else if (key === 'onabort') {
          req.addEventListener('abort', (evt) => {
            if (isFN(value)) {
              value(evt);
            }
            reject(evt);
          });
        } else if (key === 'onprogress') {
          req.addEventListener('progress', value);
        } else if (key === 'responseType') {
          if (value === 'buffer') {
            req.responseType = 'arraybuffer';
          } else {
            req.responseType = value;
          }
        } else if (key === 'method') {
          method = value;
        } else if (key === 'url') {
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
  },
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  },
  prog(evt) {
    return Object.is(evt.total, 0)
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  async stream(url = '', filename, data = {}) {
    try {
      const chunks = [];
      const response = await Network.req(url, 'GET', 'basic', data, true).catch(err);
      if (!response) {
        return new Uint8Array();
      }
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      for await (const chunk of Network.streamAsyncIterable(response.body)) {
        receivedLength += chunk.length;
        chunks.push(chunk);
        if (filename) {
          const percentComplete = Network.prog({
            loaded: receivedLength,
            total: contentLength
          });
          msg(`[MagicPH] (${percentComplete}) Downloading "${filename}" using "Fetch API"`);
        }
      }
      const Uint8Chunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        Uint8Chunks.set(chunk, position);
        position += chunk.length;
      }
      return Uint8Chunks;
    } catch (ex) {
      err(ex);
    }
    return null;
  },
  async download(details = {}) {
    return await new Promise((resolve) => {
      Network.stream(details.url, details.name).then((Uint8Chunks) => {
        const blob = new Blob([Uint8Chunks], {
          type: 'application/octet-stream'
        });
        saveAs(blob, details.name);
        resolve(details.name);
      });
    });
  },
  /**
   * @param { ReadableStream<Uint8Array> } stream
   */
  async *streamAsyncIterable(stream) {
    const reader = stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }
};
/**
 * @type { import("../typings/UserJS.d.ts").openTab }
 */
const openTab = (url) => {
  if (isGM) {
    if (isFN(GM.openInTab)) {
      return GM.openInTab(url);
    } else if (isFN(GM_openInTab)) {
      return GM_openInTab(url, {
        active: true,
        insert: true
      });
    }
  }
  return window.open(url, '_blank');
};

const ofUsers = {};
const videoCache = new Map();
const hostCache = new Map();

const dul = make('mph-list');

class Tabs {
  constructor() {
    this.Tab = new Map();
    this.blank = 'about:blank';
    this.protocal = 'mph:';
    this.protoReg = new RegExp(`${this.protocal}(.+)`);
    this.el = {
      add: make('mph-addtab', '', {
        textContent: '+',
        dataset: {
          command: 'new-tab'
        }
      }),
      head: make('mph-tabs')
    };
    this.el.head.append(this.el.add);
  }
  hasTab(...params) {
    for (const p of params) {
      if (!this.Tab.has(p)) {
        return false;
      }
      const content = normalizeTarget(this.Tab.get(p)).filter((t) => p === t.dataset.host);
      if (isBlank(content)) {
        return false;
      }
    }
    return true;
  }
  storeTab(host) {
    const h = host ?? this.blank;
    if (!this.Tab.has(h)) {
      this.Tab.set(h, new Set());
    }
    return this.Tab.get(h);
  }
  cache(host, ...tabs) {
    const h = host ?? this.blank;
    const tabCache = this.storeTab(h);
    for (const t of normalizeTarget(tabs)) {
      if (tabCache.has(t)) {
        continue;
      }
      tabCache.add(t);
    }
    this.Tab.set(h, tabCache);
    return tabCache;
  }
  intFN(host) {
    if (!host.startsWith(this.protocal)) {
      return;
    }
    // const type = host.match(this.protoReg)[1];
    // if (type === 'settings') {
    //   dom.cl.remove([cfgpage, exBtn], 'hidden');
    //   dom.cl.add(table, 'hidden');
    //   if (!container.supported) {
    //     dom.attr(container.frame, 'style', 'height: 100%;');
    //   }
    // }
  }
  active(tab, build = true) {
    for (const t of normalizeTarget(tab, false)) {
      dom.cl.remove(qsA('mph-tab', this.el.head), 'active');
      const tabContent = qsA('mph-list', dul);
      dom.cl.add(tabContent, 'hidden');
      dom.cl.add(t, 'active');
      if (!build) {
        continue;
      }
      const host = t.dataset.host ?? this.blank;
      if (host !== this.blank) {
        const title = tab.dataset.title;
        const content = normalizeTarget(tabContent).filter(
          (t) => host === t.dataset.host || title === t.dataset.host
        );
        dom.cl.remove(content, 'hidden');
      }
      if (host === this.blank) {
        HP.refresh();
      } else if (host.startsWith(this.protocal)) {
        this.intFN(host);
      }
    }
  }
  /** @param { HTMLElement } tab */
  close(tab) {
    for (const t of normalizeTarget(tab, false)) {
      const host = t.dataset.host;
      if (hostCache.has(host)) {
        hostCache.delete(host);
      }
      if (dom.cl.has(t, 'active')) {
        HP.refresh();
      }
      const sibling = t.previousElementSibling ?? t.nextElementSibling;
      if (sibling) {
        if (sibling.dataset.command !== 'new-tab') {
          this.active(sibling);
        }
      }
      if (this.Tab.has(host)) {
        this.Tab.delete(host);
      }
      t.remove();
    }
  }
  // active(tab) {
  //   dom.cl.remove(qsA('mph-tab', ntHead), 'active');
  //   const tabContent = qsA('mph-list', dul);
  //   dom.cl.add(tabContent, 'hidden');
  //   dom.cl.add(tab, 'active');

  //   const host = tab.dataset.host ?? this.blank;
  //   if (host !== this.blank) {
  //     const title = tab.dataset.title;
  //     const content = normalizeTarget(tabContent).filter(
  //       (t) => host === t.dataset.host || title === t.dataset.host
  //     );
  //     dom.cl.remove(content, 'hidden');
  //   }
  //   if (host === this.blank) {
  //     HP.refresh();
  //   } else if (host.startsWith(this.protocal)) {
  //     this.intFN(host);
  //   }
  // }
  // /** @param { Element } tab */
  // close(tab) {
  //   const host = tab.dataset.host;
  //   if (hostCache.has(host)) {
  //     hostCache.delete(host);
  //   }
  //   const sibling = tab.previousElementSibling ?? tab.nextElementSibling;
  //   if (sibling) {
  //     if (sibling.dataset.command !== 'new-tab') {
  //       this.active(sibling);
  //     }
  //   }
  //   if (this.Tab.has(host)) {
  //     const tabSet = this.Tab.get(host);
  //     if (tabSet.has(tab)) {
  //       tabSet.delete(tab);
  //     }
  //   }
  //   tab.remove();
  // }
  create(host = undefined, text) {
    if (typeof host === 'string') {
      if (host.startsWith(this.protocal) && this.hasTab(host)) {
        this.active(this.Tab.get(host));
        return;
      }
      const content = normalizeTarget(this.storeTab(host)).filter((t) => host === t.dataset.host);
      if (!isEmpty(content)) {
        return;
      }
    }
    const tab = make('mph-tab', '', {
      dataset: {
        command: 'switch-tab',
        title: text
      },
      style: `order: ${this.el.head.childElementCount};`
    });
    const tabClose = make('mph-elem', '', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    // const tabHost = make('mujs-host');
    // tab.append(tabHost, tabClose);
    // this.el.head.append(tab);
    // this.active(tab, false);
    // this.cache(host, tab);
    // if (isNull(host)) {
    //   HP.refresh();
    //   urlBar.placeholder = i18n$('newTab');
    //   tab.dataset.host = this.blank;
    //   tabHost.title = i18n$('newTab');
    //   tabHost.textContent = i18n$('newTab');
    // } else if (host.startsWith(this.protocal)) {
    //   const type = host.match(this.protoReg)[1];
    //   tab.dataset.host = host || HP.host;
    //   tabHost.title = type || tab.dataset.host;
    //   tabHost.textContent = tabHost.title;
    //   this.intFN(host);
    // } else {
    //   tab.dataset.host = host || HP.host;
    //   tabHost.title = host || HP.host;
    //   tabHost.textContent = tabHost.title;
    // }
    // return tab;

    const tabBox = make('mph-host');
    tab.append(tabBox, tabClose);

    this.el.head.append(tab);
    this.active(tab, false);
    this.cache(host, tab);

    // dom.cl.remove(qsA('mph-tab', ntHead), 'active');
    // dom.cl.add(qsA('mph-list', dul), 'hidden');
    // dom.cl.add(tab, 'active');

    if (isNull(host)) {
      tab.dataset.host = 'about:blank';
      tabBox.title = i18n$('newTab');
      const siteLoader = async (val) => {
        const value = {
          type: '',
          txt: val,
          url: ''
        };
        let qualities = [];
        const loadMedia = async (str = '') => {
          const s = str.replaceAll('\\', '');
          const media = new mphMedia(s);
          qualities = await media.autoStart(s);
          if (!isEmpty(qualities)) {
            tab.dataset.host = media.title;
            tabBox.title = media.title;
            tabBox.textContent = media.title;
            const count = make('mph-count', '', {
              textContent: ' (0)',
              dataset: {
                host: media.title ?? 'about:blank'
              }
            });
            tabBox.append(count);
            makeContainer(qualities, {
              ts: tsSrc,
              title: media.title
            });
          }
        };
        // if (val.startsWith('mph:')) {
        //   this.close(tab);
        //   if (this.Tab.has(val)) {
        //     this.active(this.Tab.get(val));
        //   } else {
        //     this.make(val);
        //   }
        //   return null;
        // } else if (val === '*') {
        //   tab.dataset.host = val;
        //   tabBox.title = '<All Sites>';
        //   tabBox.textContent = '<All Sites>';
        // }
        if (val.startsWith('http')) {
          const url = strToURL(val);
          if (objToStr(url).includes('URL')) {
            value.url = url;
            if (/onlyfans/.test(HP.current.root) && !/onlyfans/.test(url.host)) {
              throw new Error('Please navigate to "onlyfans.com"');
            }
            await loadMedia(value.url.href);
          }
        } else if (/^\/video-\w+\/[\w-.]+(?:\/(?=$))?$/i.test(val)) {
          if (/xnxx/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.xnxx.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/videos\/[a-z0-9._-]+(?:\/(?=$))?$/i.test(val)) {
          if (/xhamster/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://xhamster.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/watch\/\d+\/[\w-]+(?:\/(?=$))?$/i.test(val)) {
          if (/youporn/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.youporn.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/video\/\w+\/[\w-]+(?:\/(?=$))?$/i.test(val)) {
          if (/thumbzilla/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.thumbzilla.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/porn-video\/\d{8}(?:\/(?=$))?$/i.test(val)) {
          if (/tube8/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.tube8.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/(\d{8})?$/i.test(val)) {
          if (/redtube/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.redtube.com${val}`;
          }
          await loadMedia(value.url);
        } else if (/^\/(view_video\.php\?viewkey=\w+)?$/i.test(val)) {
          if (/pornhub/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}${val}`;
          } else {
            value.url = `https://www.pornhub.com${val}`;
          }
          await loadMedia(value.url);
        } else if (
          /onlyfans/.test(HP.current.root) &&
          /^\/((?:[a-z0-9][a-z0-9._-]+))(?:\/(?=$))?$/i.test(val)
        ) {
          value.url = `https://onlyfans.com${val}/videos`;
          await loadMedia(value.url);
        } else if (
          /onlyfans/.test(HP.current.root) &&
          /^\/((?:[a-z0-9][a-z0-9._-]+))\/((?:media|photos|videos|audios|likes|streams|upcoming-streams))(?:\/(?=$))?$/i.test(
            val
          )
        ) {
          value.url = `https://onlyfans.com${val}`;
          await loadMedia(value.url);
        } else if (/\w{13,15}/.test(val)) {
          value.txt = val.match(/\w{13,15}/)[0];
          if (/pornhub/.test(HP.current.root)) {
            value.url = `${HP.webpage.origin}/view_video.php?viewkey=${value.txt}`;
          } else {
            value.url = `https://www.pornhub.com/view_video.php?viewkey=${value.txt}`;
          }
          await loadMedia(value.url);
        }
        // else {
        //   value.txt = HP.getHost(val);
        //   newHost = value.txt;
        //   tab.dataset.host = value.txt;
        //   tabBox.title = value.txt;
        //   tabBox.textContent = value.txt;
        // }
        if (!isEmpty(qualities)) {
          this.cache(value.txt, tab);
        }
        return qualities;
      };
      const siteSearcher = make('input', 'mph-searcher', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('newTab'),
        onchange(evt) {
          evt.preventDefault();
          siteLoader(evt.target.value).then((h) => {
            if (isEmpty(h)) {
              tabBox.title = 'An error occured';
              tabBox.textContent = 'An error occured';
              return;
            }
            siteSearcher.remove();
          });
        }
      });
      tabBox.append(siteSearcher);
      return tab;
    }
    let tabHost;
    let tabTitle;
    let tabText;
    if (typeof host === 'string' && host.startsWith('mph:')) {
      const type = host.match(/mph:(.+)/)[1];
      tabHost = host || HP.host;
      tabTitle = text || type || tabHost;
      tabText = text || tabTitle;
      this.intFN(host);
    } else {
      tabHost = host || HP.host;
      tabTitle = text || host || dom.attr(qs('meta[property="og:title"]'), 'content') || HP.host;
      tabText = text || tabTitle;
    }
    tab.dataset.host = tabHost;
    tabBox.title = tabTitle;
    tabBox.textContent = tabText;
    const count = make('mph-count', '', {
      textContent: ' (0)',
      dataset: {
        host: tabHost ?? 'about:blank'
      }
    });
    tabBox.append(count);
    return tab;
  }
}
const tab = new Tabs();
const progressElem = make('h1', 'mph_progress');
const progressFrame = make('mph-elem', 'mph_progressContainer');
// const frame = make('main-userjs', 'hidden', {
//   dataset: {
//     insertedBy: 'magic-ph',
//     role: 'primary-container'
//   }
// });
const dContainer = make('mph-root', '', {
  async onclick(evt) {
    try {
      /** @type { HTMLElement } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const dataset = target.dataset;
      const cmd = dataset.command;
      if (cmd.startsWith('of-')) {
        if (cmd === 'of-copy') {
          const d = target.parentElement.parentElement.dataset;
          const vid = getOFQuality(d);
          if (!vid) {
            return;
          }
          await writeClipboard(vid.src);
          msg('[MagicPH] Copied URL to Clipboard', 2500);
        } else if (cmd === 'of-download') {
          const d = target.parentElement.parentElement.dataset;
          const vid = getOFQuality(d);
          if (!vid) {
            return;
          }
          const Uint8Chunks = await Network.stream(vid.src, `${cleanURL(vid.title)}.mp4`);
          const blob = new Blob([Uint8Chunks], {
            type: 'application/octet-stream'
          });
          saveAs(blob, `${cleanURL(vid.title)}.mp4`);
          msg('[MagicPH] Downloads complete!', 2500);
        } else if (cmd === 'of-remove') {
          const d = target.parentElement.parentElement.dataset;
          if (!videoCache.has(d.host)) {
            return;
          }
          msg(`[MagicPH] Deleted Video Id: ${d.host}`, 2500);
          videoCache.delete(d.host);
          target.parentElement.parentElement.remove();
        } else if (cmd === 'remove-all') {
          videoCache.clear();
          dom.remove(qsA('.mph_of_list > .wrap'));
        } else if (cmd === 'of-copy-all') {
          const arr = [];
          for (const v of videoCache.values()) {
            for (const vid of v) {
              if (vid.quality === 'original') {
                arr.push(vid.src);
              }
            }
          }
          await writeClipboard(arr.join('\n'));
          msg('[MagicPH] Copied URLs to Clipboard', 2500);
        } else if (cmd === 'of-download-all') {
          for (const vid of videoCache.values()) {
            const params = {
              name: `${cleanURL(vid.title)}.mp4`,
              url: vid.src
            };
            if (Limit_Downloads || videoCache.size > 16 || isMobile) {
              await Network.download(params);
            } else {
              Network.download(params);
            }
            dom.remove(qs(`.mph_of_list > .wrap[data-title="${vid.title}"]`));
            videoCache.delete(vid.title);
          }
        } else if (cmd === 'of-open-tab' && dataset.webpage) {
          vueRouter.push(dataset.webpage);
          return;
        }
        ofsdwn.innerHTML = `Download (${videoCache.size})`;
        ofscopy.innerHTML = `${i18n$('copy')} (${videoCache.size})`;
        ofsRm.innerHTML = `Remove (${videoCache.size})`;
        return;
      }
      if (cmd === 'open-tab' && dataset.webpage) {
        openTab(dataset.webpage);
      } else if (cmd === 'new-tab') {
        tab.create();
      } else if (cmd === 'switch-tab') {
        tab.active(target);
      } else if (cmd === 'close-tab' && target.parentElement) {
        tab.close(target.parentElement);
      } else if (cmd === 'close') {
        dom.cl.remove(mphControls, 'hidden');
        dom.remove(qsA('video', HP.frame));
        dom.cl.remove(HP.frame, 'expanded');
        dom.cl.add(HP.frame, 'hidden');
      } else if (cmd === 'copy' && dataset.webpage) {
        await writeClipboard(dataset.webpage);
        const inp = qs('input', target.parentElement);
        msg('[MagicPH] Copied URL to Clipboard', 2500);
        if (HP.host.includes('xhamster')) {
          inp.style.color = HP.theme.background;
        } else {
          inp.style.color = HP.theme.get();
        }
        await delay(2500);
        dom.attr(inp, 'style', '');
      } else if (cmd === 'download-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        const vid = videoCache.get(dataset.webpage);
        const t = cleanURL(vid.title);
        if (vid.isStr) {
          await Network.download(
            {
              name: `${t}.mp4`,
              url: dataset.webpage,
              hermes: vid.data
            },
            true
          );
          msg('[MagicPH] Download complete', 2500);
        } else {
          const a = make('a');
          a.href = dataset.webpage;
          a.download = `${t}.ts`;
          a.click();
          a.remove();
        }
      } else if (cmd === 'preview-video' && dataset.webpage && videoCache.has(dataset.webpage)) {
        let pageArea = qs('mph-page', target.parentElement);
        if (!pageArea) {
          pageArea = make('mph-page');
          target.parentElement.append(pageArea);
          if (HP.supported) {
            const shadow = pageArea.attachShadow({ mode: 'closed' });
            const videoElem = make('video', '', {
              preload: 'auto'
              // style: 'max-width: 720px; max-height: 720px;'
            });
            dom.attr(videoElem, 'controls', '');
            dom.attr(videoElem, 'disablepictureinpicture', '');
            const src = make('source', '', {
              src: dataset.webpage,
              type: 'video/mp4'
            });
            videoElem.append(src);
            shadow.append(videoElem);
            dom.cl.add(HP.frame, 'expanded');
          }
          return;
        }
        if (!dom.cl.has(pageArea, 'hidden')) {
          dom.cl.add(pageArea, 'hidden');
          dom.cl.remove(HP.frame, 'expanded');
          return;
        }
        dom.cl.remove(pageArea, 'hidden');
        dom.cl.add(HP.frame, 'expanded');
      } else if (cmd === 'load-ts' && dataset.webpage && videoCache.has(dataset.webpage)) {
        const vid = videoCache.get(dataset.webpage);
        const hc = hostCache.get(vid.title);
        const h = new mphHLS(dataset.webpage, hc.hermes, target);
        const q = await h.start();
        if (!isEmpty(q)) {
          h.msg();
          if (hc.rows.has('loadTS')) {
            hc.rows.delete('loadTS');
          }
          makeContainer(q, {
            rows: ['title', 'download'],
            $el: target
          });
        }
      }
    } catch (ex) {
      err(ex);
    }
  }
});
const msg = async (text, time) => {
  const notice = progressFrame ?? qs('.mph_progressContainer');
  if (!notice) {
    return;
  }
  const noticeElem = progressElem ?? qs('.mph_progress');
  if (!noticeElem) {
    return;
  }
  const timeout = new Timeout();

  if (!isNull(text) && !isNull(time)) {
    noticeElem.innerHTML = text;
    notice.setAttribute('style', 'display: block;');
    await timeout.set(time);
    notice.setAttribute('style', '');
    return timeout.clear(...timeout.ids);
  }

  if (typeof text === 'number' && !Number.isNaN(text)) {
    await timeout.set(text);
    notice.setAttribute('style', '');
  } else if (!isNull(text)) {
    noticeElem.innerHTML = text;
    notice.setAttribute('style', 'display: block;');
  }
  if (!isNull(time)) {
    if (isBlank(notice.style.display)) {
      notice.setAttribute('style', 'display: block;');
    }
    await timeout.set(time);
    notice.setAttribute('style', '');
  }
  return timeout.clear(...timeout.ids);
};
const getOFQuality = (d, quality = 'original') => {
  if (!videoCache.has(d.host)) {
    return null;
  }
  for (const vid of videoCache.get(d.host)) {
    if (vid.title !== d.title) {
      continue;
    }
    if (vid.quality === quality) {
      return vid;
    }
  }
  return videoCache.get(d.host)[0];
};
const mphControls = make('mph-controls', '', {
  async click(evt) {
    const target = evt.target;
    if (!target.dataset) {
      return;
    }
    if (!target.dataset.command) {
      return;
    }
    const cmd = target.dataset.command;
    if (cmd === 'of-copy') {
      const vid = getOFQuality();
      if (!vid) {
        return;
      }
      await writeClipboard(vid.src);
      msg('[MagicPH] Copied URL to Clipboard', 2500);
    } else if (cmd === 'of-download') {
      const vid = getOFQuality();
      if (!vid) {
        return;
      }
      await Network.download({
        name: `${cleanURL(vid.title)}.mp4`,
        url: vid.src
      });
      msg('[MagicPH] Downloads complete!', 2500);
    } else if (cmd === 'toggle-list') {
      if (dom.cl.has(mphControls, 'hidden')) {
        dom.cl.remove(mphControls, 'hidden');
        dom.cl.add(HP.frame, 'hidden');
        return;
      }
      dom.cl.remove(HP.frame, 'hidden');
      dom.cl.add(mphControls, 'hidden');
    }
  }
});
const dwnCounter = make('mph-count', '', {
  innerHTML: '(0)'
});
const copyCounter = make('mph-count', '', {
  innerHTML: '(0)'
});
const addToWrapper = () => {
  if (videoCache.size === 0) {
    return;
  }
  for (const [userId, userVideos] of videoCache) {
    const mphList =
      qs(`mph-list > mph-list[data-host="${userId}"]`) ??
      make('mph-list', 'mph_of_list', {
        dataset: {
          host: userId
        }
      });
    const hc = hostCache.get(userId);
    tab.create(userId);
    for (const v of userVideos) {
      if (qsA(`[data-title="${v.title}"]`, mphList).length !== 0) {
        continue;
      }

      const $el = make('mph-elem', 'wrap', {
        dataset: {
          title: v.title,
          host: userId
        }
      });
      const imgC = make('mph-a', 'self-container', {
        dataset: {
          command: 'open-tab',
          webpage: v.src
        }
      });
      const btns = make('mph-elem', 'btn-container');
      const cpBtn = make('mph-btn', 'of_btn', {
        title: i18n$('copy'),
        innerHTML: i18n$('copy'),
        dataset: {
          command: 'of-copy'
        }
      });
      const downBtn = make('mph-btn', 'of_btn', {
        title: i18n$('download'),
        innerHTML: i18n$('download'),
        dataset: {
          command: 'of-download'
        }
      });
      const rmBtn = make('mph-btn', 'of_btn', {
        title: i18n$('remove'),
        innerHTML: i18n$('remove'),
        dataset: {
          command: 'of-remove'
        }
      });
      const img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = v.poster;
      img.onload = () => {
        imgC.append(img);
      };
      const sp = make('mph-title');
      const fTitle = make('mph-a', '', {
        dataset: {
          command: 'of-open-tab',
          webpage: v.original
        },
        title: v.text,
        innerHTML: v.title
      });
      btns.prepend(cpBtn, downBtn, rmBtn);
      sp.append(fTitle);
      $el.append(btns, imgC, sp);
      if (v.duration || v.frame) {
        const moreInfo = make('mph-elem', 'more-info');
        if (v.duration) {
          const duration = make('mph-elem', '', {
            textContent: v.duration
          });
          moreInfo.append(duration);
        }
        if (v.frame) {
          const frame = make('mph-elem', '', {
            textContent: v.frame
          });
          moreInfo.append(frame);
        }
        $el.append(moreInfo);
      }
      if (!mphList.contains($el)) {
        mphList.append($el);
        hc.$elems.push($el);
      }
    }
    hostCache.set(userId, hc);
    dul.append(mphList);
    HP.updateCounters(userVideos.length, userId);
  }
};
const ofsdwn = make('mph-btn', 'of_btn', {
  title: 'Download available videos',
  textContent: 'Download ',
  dataset: {
    command: 'of-download-all'
  }
});
const ofscopy = make('mph-btn', 'of_btn', {
  title: 'Copy all available videos to clipboard',
  textContent: `${i18n$('copy')} `,
  dataset: {
    command: 'of-copy-all'
  }
});
const ofsRm = make('mph-btn', 'of_btn', {
  title: 'Remove all available videos',
  innerHTML: 'Remove All',
  dataset: {
    command: 'of-remove-all'
  }
});
const vidQuality = make('div', 'mgp_download mgp_optionSelector', {
  innerHTML: $info.script.name,
  onclick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dom.cl.remove(HP.frame, 'hidden');
    if (isMobile) {
      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || HP.host.includes('youporn')) {
        dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
        return;
      }
      if (qs('.mgp_optionsMenu')) {
        dom.cl.remove('.mgp_optionsMenu', ['mgp_visible', 'mgp_level2']);
      }
      return;
    }
    dom.cl.add('.mgp_contextMenu', 'mgp_hidden');
  }
});
const writeClipboard = async (txt) => {
  try {
    await navigator.clipboard.writeText(txt);
  } catch (ex) {
    err(`[Clipboard] Failed to copy: ${ex}`);
    if (isGM) {
      if (isFN(GM.setClipboard)) {
        return GM.setClipboard(txt);
      } else if (isFN(GM_setClipboard)) {
        return GM_setClipboard(txt);
      }
    }
  }
};
const cleanURL = (str = '') => {
  const invalid_chars = {
    '\\': '＼',
    '\\/': '／',
    '\\|': '｜',
    '<': '＜',
    '>': '＞',
    ':': '：',
    '*': '＊',
    '?': '？',
    '"': '＂',
    '🔞': '',
    '#': ''
  };
  return str.replace(/[\\\\/\\|<>\\*\\?:#']/g, (v) => invalid_chars[v]);
};
const sortVideos = (ma, mb) => {
  const a = +(/\d+(?=P|p\.)/.exec(ma) ?? ['0', '0'])[0];
  const b = +(/\d+(?=P|p\.)/.exec(mb) ?? ['0', '0'])[0];
  return b - a;
};
class mphHLS {
  constructor(url = 'about:blank', data = {}, $el) {
    this.url = url;
    this.baseURL = new URL(this.url);
    this.base = this.baseURL.origin + this.baseURL.pathname.replace(/\/(hls|master).m3u8/, '');
    this.data = data;
    this.$el = $el;
    this.blobQualities = [];
    this.resolutions = [];
  }

  msg(text = '') {
    if (!this.$el) {
      return;
    }
    dom.prop(this.$el, 'innerHTML', text);
  }

  static fixURL(str = '') {
    return str.replace(/m3u8\/\//g, 'm3u8/');
  }

  updateBase(str = '') {
    this.baseURL = new URL(str);
    this.base = this.baseURL.origin + this.baseURL.pathname.replace(/\/(hls|master).m3u8/, '');
    return this.base;
  }

  async build(arr = []) {
    const hlsRes = await this.req(this.url).catch(err);
    if (!hlsRes) {
      return [];
    }
    const getFromTxt = (txt) => {
      const resp = [];
      for (const line of txt.split('\n')) {
        // log('line', line);
        if (line.startsWith('http')) {
          resp.push(line);
        } else if (line.match(/(hls|index)-.*?\.m3u8/g)) {
          resp.push(line);
        } else if (line.match(/d+\.mp4\.m3u8/g)) {
          resp.push(line);
        } else if (line.match(/\d+p\.h264\.mp4\.m3u8/g)) {
          resp.push(line);
        }
      }
      return resp;
    };
    if (hlsRes.startsWith('[{') && hlsRes.endsWith('}]')) {
      const j = JSON.parse(hlsRes);
      for (const e of j) {
        if (e.format !== 'hls') {
          continue;
        }
        if (e.defaultQuality) {
          this.updateBase(e.videoUrl);
          const vRes = await this.req(e.videoUrl).catch(err);
          arr.push(...getFromTxt(vRes));
          break;
        }
      }
    } else {
      arr.push(...getFromTxt(hlsRes));
    }
    if (arr.length === 0) {
      err('Could not build');
      return arr;
    }
    return arr.sort((ma, mb) => {
      const a = +(/(\d+)p/.exec(ma) ?? ['0', '0'])[1];
      const b = +(/(\d+)p/.exec(mb) ?? ['0', '0'])[1];
      return b - a;
    });
  }

  trimStr(str = '') {
    return str.match(/[\w-]+\.\w{2,4}/) ? str.match(/[\w-]+\.\w{2,4}/)[0] : str;
  }

  async mergeRecords(res, frags = []) {
    const fragRecords = [];
    let frag;
    for (const f of frags) {
      this.msg(`[MagicPH] Merging segments for "${this.trimStr(res)}" (${this.trimStr(f)})`);
      const s = f.includes('http') ? f : `${this.base}/${f}`;
      if (/xhamster/.test(HP.current.root)) {
        frag = await this.stream(s).catch(err);
      } else {
        frag = await Network.stream(s, null, this.data).catch(err);
      }
      if (frag === null) {
        break;
      }
      fragRecords.push(frag);
    }
    return fragRecords;
  }

  async toBlob() {
    try {
      for (const res of this.resolutions) {
        this.msg(`[MagicPH] Building cache for "${this.trimStr(res)}"`);
        const u = res.startsWith('http') ? res : `${this.base}/${res}`;
        const reqUrl = /xhamster/.test(HP.current.root) ? this.baseURL.origin + res : u;
        const hlsVid = await this.req(reqUrl).catch(err);
        let frags = [];
        if (!hlsVid) {
          break;
        }
        for (const line of hlsVid.split('\n')) {
          if (line.match(/seg[\w-]+\.\w{2,4}/)) {
            frags.push(line);
          } else if (line.startsWith('http')) {
            frags.push(line);
          } else if (line.match(/hls-.*?\.ts/g)) {
            frags.push(line);
          } else if (line.match(/seg-.*?\.m4s/g)) {
            frags.push(line);
          } else if (line.match(/seg-.*?\.ts/g)) {
            frags.push(line);
          }
        }
        if (/xhamster/.test(HP.current.root)) {
          frags = frags.map((f) => {
            if (f.startsWith('/')) {
              return this.baseURL.origin + f;
            }
            return f;
          });
        }
        const fragRecords = await this.mergeRecords(res, frags);
        if (fragRecords === null) {
          return;
        }
        const blob = new Blob([arrayConcat(fragRecords)], {
          type: 'application/octet-stream'
        });
        this.blobQualities.push(blob);
        break; // We only want the highest quality
      }
    } catch (ex) {
      err(ex);
    }
    return this.blobQualities;
  }

  async start() {
    try {
      info('[MagicPH] Creating cache using "Fetch API"');
      this.msg('[MagicPH] Creating cache using "Fetch API"');
      msg('[MagicPH] Creating cache using "Fetch API"', 2500);
      this.resolutions = await this.build();
      if (isBlank(this.resolutions)) {
        this.msg('[MagicPH] Failed to cache, "resolutions" returned 0');
        msg('[MagicPH] Failed to cache, "resolutions" returned 0', 2500);
        return [];
      }
      const q = await this.toBlob();
      this.msg('[MagicPH] Cache complete!');
      msg('[MagicPH] Cache complete!', 2500);
      return q;
    } catch (ex) {
      err(ex);
      this.msg('[MagicPH] Error occured while creating cache');
      msg('[MagicPH] Error occured while creating cache', 2500);
    }
    return [];
  }

  req(str, data) {
    return Network.req(str, 'GET', 'text', data ?? this.data);
  }

  async stream(url = '') {
    try {
      const s = await Network.req(mphHLS.fixURL(url), 'GET', 'blob');
      const ab = await s.arrayBuffer();
      return new Uint8Array(ab);
    } catch (ex) {
      err(ex);
    }
    return null;
  }
}
class mphMedia {
  constructor(url, webpage) {
    if (HP.webpage !== url) {
      HP.current = url || HP.webpage.href || window.location;
    }
    this.webpage = webpage || HP.webpage.href;
    this.mediaFiles = new Set();
    this.playerId = undefined;
    this.title = 'MagicPH';
  }

  async fetchQualities(mFiles = []) {
    try {
      mFiles = smToArr(mFiles);
      return await new Promise((resolve, reject) => {
        const testURL = mFiles;
        const mf = mFiles.filter((file) => {
          if (
            /get_media\?s=/.test(file) ||
            /media\/mp4\?s=/.test(file) ||
            /youporn|tube8/gi.test(file)
          ) {
            return true;
          }
          return false;
        });
        if (isBlank(mf)) {
          resolve(mFiles);
        }
        mFiles = [];
        Network.req(mf)
          .then((fQualites) => {
            for (const item of fQualites) {
              if (isEmpty(item.videoUrl) || Array.isArray(item.quality)) continue;
              if (/\.mp4[.?]/g.test(item.videoUrl)) {
                mFiles.push(item.videoUrl);
              }
            }
            mFiles = mFiles.sort(sortVideos);
            if (testURL[0].match(/thumbzilla/g)) {
              mFiles.push(testURL[0]);
            }
            resolve(mFiles);
          })
          .catch(reject);
      });
    } catch (ex) {
      err(ex);
      return mFiles;
    }
  }

  async mediaFinder(url, doc = document) {
    let resp;
    try {
      const handleDoc = async (htmlDocument) => {
        /** @type {HTMLElement} */
        const selected = htmlDocument.documentElement;
        if (/xhamster/.test(url)) {
          for (const s of selected.getElementsByTagName('script')) {
            if (isEmpty(s.innerHTML)) continue;
            if (s.getAttribute('id') !== 'initials-script') continue;
            const txt = s.innerHTML.toString();
            const hlsReg = /"h264":\[{"url":"(.*?)"/.exec(txt);
            if (hlsReg) {
              tsSrc = hlsReg[1].replaceAll('\\', '');
            }
            const srcReg = /"mp4":{(.*?)}/.exec(txt);
            if (!srcReg) {
              continue;
            }
            const q = srcReg[1].match(/https:.*?p.h264.mp4/g);
            if (!q) {
              continue;
            }
            const titleReg = /"titleLocalized":"(.*?)"/.exec(txt);
            if (titleReg) {
              this.title = titleReg[1];
            }
            for (const src of q) {
              this.mediaFiles.add(src.replaceAll('\\', ''));
            }
          }
          return this.mediaFiles;
        }
        for (const s of selected.getElementsByTagName('script')) {
          const txt = s.innerHTML;
          const vtReg = /"video_title":"(.*?)",/.exec(txt);
          if (vtReg) {
            if (!Object.is(vtReg[1], this.title)) {
              this.title = vtReg[1];
            }
          }
          const embedIdReg = /{"embedId":(\d+)},/.exec(txt);
          if (embedIdReg) {
            if (!Object.is(embedIdReg[1], this.playerId)) {
              this.playerId = embedIdReg[1];
            }
          }
          const siteMedia = [
            /(https:[\\/]+\D+4\?s=)+(\w|\d)+/g.test(txt),
            /https:[\\/\w.]+tube8[\\/_.?=\w\d]+media[\\/_.?=\w\d]+/gi.test(txt),
            /https:[\\/\w.]+thumbzilla[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi.test(txt),
            /media_[\d]=+[\w\d\\*/+\s]+;/g.test(txt),
            /https:[\\/\w.]+pornhub[\\/_.?=\w\d]+media[\\/_.?=\w\d&]+/gi.test(txt),
            /mediaDefinition: (\[.*?\]),/g.test(txt)
          ];
          if (isEmpty(siteMedia.filter((m) => m))) continue;
          const reg = /"format":"mp4",("remote":true,)?"videoUrl":"(.*?)"/.exec(txt);
          if (!reg) {
            continue;
          }
          const t = reg[2].replaceAll('\\', '');
          let mediaTxt = t;
          if (mediaTxt.startsWith('/')) {
            const u = new URL(url);
            mediaTxt = u.origin + t;
          }
          const resp = await Network.req(mediaTxt.replaceAll('\\', ''));
          for (const v of resp.map((i) => i.videoUrl)) {
            if (this.mediaFiles.has(v)) {
              continue;
            }
            this.mediaFiles.add(v);
          }
          break;
        }
        if (this.mediaFiles.size === 0) {
          const txt = selected.innerHTML.toString();
          const vtReg = /video_title: '(.*?)'/.exec(txt);
          if (vtReg) {
            if (!Object.is(vtReg[1], this.title)) {
              this.title = vtReg[1];
            }
          }
          if (!/porntrex/.test(url)) {
            const vUrlReg = txt.match(/video_alt_url: '(.*?)'/g);
            if (vUrlReg) {
              for (const r of vUrlReg) {
                const v = /video_alt_url: '(.*?)'/.exec(r);
                if (!v) {
                  continue;
                }
                const f = v[1].replaceAll('function/0/', '');
                if (this.mediaFiles.has(f)) {
                  continue;
                }
                this.mediaFiles.add(f);
              }
            }
          }
          const ptReg = txt.match(/video_alt_url\d+: '(.*?)'/g);
          if (ptReg) {
            for (const r of ptReg) {
              const v = /video_alt_url\d+: '(.*?)'/.exec(r);
              if (!v) {
                continue;
              }
              const f = v[1].replaceAll('function/0/', '');
              if (this.mediaFiles.has(f)) {
                continue;
              }
              this.mediaFiles.add(f);
            }
          }
          const vReg = /(\w+)\.replaceAll\("\w+",(\w+)\+"pubs\/"\+(\w+)\+"\/"\)/.exec(txt);
          if (vReg) {
            const v = new RegExp(`${vReg[1]}="(<video.+</video>)"`).exec(txt);
            if (v) {
              let a, b, c;
              a = b = c = '';
              a = v[1];
              for (const e of [vReg[2], vReg[3]]) {
                const r = new RegExp(`${e}="(.*?)"`);
                const eReg = r.exec(txt);
                if (!eReg) {
                  continue;
                }
                if (isBlank(b)) {
                  b = eReg[1];
                } else if (isBlank(c)) {
                  c = eReg[1];
                }
              }
              const final = a.replaceAll('nrpuv', b + 'pubs/' + c + '/').replaceAll('\\"', '"');
              const elem = make('mph-fake');
              elem.innerHTML = final;
              for (const source of elem.firstElementChild.childNodes) {
                if (this.mediaFiles.has(source.src)) {
                  continue;
                }
                this.mediaFiles.add(source.src);
              }
              elem.remove();
            }
          }
        }
        return this.mediaFiles;
      };
      if (Object.is(url, window.location.href)) {
        resp = handleDoc(doc);
      } else {
        resp = handleDoc(await Network.req(url, 'GET', 'document'));
      }
      await resp;
    } catch (ex) {
      err(ex);
    }
    return resp;
  }

  async fetchVideo(url) {
    url = url ?? this.webpage.href;
    const mFiles = await this.mediaFinder(url);
    for (const m of mFiles) {
      if (this.mediaFiles.has(m)) {
        continue;
      }
      this.mediaFiles.add(m);
    }
    if (this.mediaFiles.size === 1) {
      const arr = await this.fetchQualities(this.mediaFiles);
      return arr.sort(sortVideos);
    }
    return this.mediaFiles;
  }

  async autoStart(url) {
    try {
      this.cleanup();
      const q = await this.fetchVideo(url || this.webpage);
      this.mediaFiles = smToArr(q).sort(sortVideos);
    } catch (ex) {
      err(ex);
    } finally {
      this.cacheToDom();
    }
    return this.mediaFiles;
  }

  cleanup() {
    if (isEmpty(HP.videoData)) {
      return;
    }
    this.cacheToDom();

    this.mediaFiles.clear();
    this.playerId = undefined;
    this.title = 'MagicPH';
  }

  cacheToDom() {
    if (isEmpty(HP.videoData)) {
      return;
    }
    if (isEmpty(this.playerId)) {
      return;
    }
    const obj = {
      [this.playerId]: {
        mediaFiles: [...this.mediaFiles],
        playerId: this.playerId,
        title: this.title
      }
    };
    HP.videoData = {
      ...HP.videoData,
      ...obj
    };
    return HP.Video;
  }
}
const makeContainer = (q = [], data = {}) => {
  if (isEmpty(q)) {
    info('Empty quality list', q);
    return;
  }
  const d = {
    host: HP.webpage.host,
    hermes: {},
    ...data
  };
  log(d);
  const def = {
    mediaFiles: q,
    cache: [],
    rows: new Set(),
    $elems: [],
    hermes: d.hermes
  };
  const vt = d.title ?? getVidTitle() ?? HP.Video.title ?? document.title ?? 'MagicPH';
  if (!tab.hasTab(HP.webpage.host)) {
    tab.create(HP.webpage.host, vt);
  }
  if (hostCache.has(vt)) {
    const hc = hostCache.get(vt);
    hc.mediaFiles.push(...q);
    hostCache.set(vt, hc);
  } else if (vt && !hostCache.has(vt)) {
    hostCache.set(vt, def);
  }
  info('Video Qualities', q);
  const hc = hostCache.get(vt) ?? {};
  const mphList = make('mph-list', 'mph-list', {
    dataset: {
      host: vt
    }
  });
  const setRows = (parentElem, val, rows = ['source', 'copy', 'download', 'open', 'preview']) => {
    if (hc.ts || d.ts) {
      rows.push('loadTS');
    }
    const elem = {
      copy: make('mph-a', '', {
        title: i18n$('copy'),
        innerHTML: `${iconSVG.load('copy')} ${i18n$('copy')}`,
        dataset: {
          command: 'copy',
          webpage: val
        }
      }),
      download: make('mph-a', '', {
        title: i18n$('download'),
        innerHTML: `${iconSVG.load('download')} ${i18n$('download')}`,
        ...(d.download ?? {
          dataset: {
            command: 'download-video',
            webpage: val
          }
        })
      }),
      loadTS: make('mph-a', 'mph-item', {
        title: 'Get qualities from .TS file',
        innerHTML: 'Get from HLS stream',
        dataset: {
          command: 'load-ts',
          webpage: val
        }
      }),
      open: make('mph-a', '', {
        title: 'Open in new Tab',
        innerHTML: `${iconSVG.load('open')} Open`,
        dataset: {
          command: 'open-tab',
          webpage: val
        }
      }),
      preview: make('mph-a', '', {
        title: 'Preview',
        innerHTML: `${iconSVG.load('video')} Preview`,
        dataset: {
          command: 'preview-video',
          webpage: val
        }
      }),
      source: make('label'),
      title: make('mph-elem', '', {
        title: vt,
        innerHTML: vt
      })
    };
    const inp = make('input', 'mphURL', {
      value: val,
      type: 'url',
      size: '70'
    });
    dom.attr(inp, 'readonly', '');
    elem.source.append(inp);
    for (const r of rows) {
      if (!elem[r]) {
        continue;
      }
      if (r === 'loadTS' && parentElem.parentElement) {
        if (qs('[data-command="load-ts"]', parentElem.parentElement)) {
          continue;
        }
        parentElem.parentElement.prepend(elem[r]);
      } else {
        parentElem.append(elem[r]);
      }
    }
  };
  const rows = hc.rows ?? def.rows;
  if (isEmpty(d.rows)) {
    for (const r of ['source', 'copy', 'download', 'open', 'preview']) {
      if (rows.has(r)) {
        continue;
      }
      rows.add(r);
    }
  } else {
    for (const r of d.rows) {
      if (rows.has(r)) {
        continue;
      }
      rows.add(r);
    }
  }
  for (const v of q) {
    if (videoCache.has(v)) {
      continue;
    }
    const isStr = typeof v === 'string';
    const val = isStr ? v : URL.createObjectURL(v);
    const $el = d.$el ?? make('mph-elem', 'mph-item');
    videoCache.set(val, { title: vt, d, isStr, $el });
    if (!mphList.contains($el)) {
      mphList.append($el);
      hc.$elems.push($el);
    }
    if (isEmpty(d.rows)) {
      setRows($el, val);
    } else {
      setRows($el, val, d.rows);
    }
    Object.assign(hc, {
      title: vt,
      data: d,
      isStr,
      rows
    });
    hc.cache.push(val);
    hostCache.set(vt, hc);
  }
  dul.append(mphList);
  HP.updateCounters(q.length, vt, d.host);
};
const getVidTitle = (pgUrl) => {
  const cVid = HP.Video;
  try {
    if (!isEmpty(pgUrl)) {
      HP.current = pgUrl;
    }
    const root = HP.current.root;
    if (/pornhub/.test(root)) {
      if (win.playerObjList) {
        const playerObjList = win.playerObjList;
        const embedId = playerObjList[Object.keys(playerObjList)[0]].flashvars.embedId;
        const flashvars = win[`flashvars_${embedId}`];
        cVid.title = flashvars.video_title ?? win.VIDEO_SHOW?.videoTitleOriginal;
        if (!isBlank(flashvars.mediaDefinitions)) {
          const md = flashvars.mediaDefinitions[0];
          if (md) {
            tsSrc = md.videoUrl;
          }
        }
      } else if (win.MGP) {
        const MGP = win.MGP;
        cVid.title = MGP.players[Object.keys(MGP.players)].settings().mainRoll.title;
      } else {
        cVid.title = win.VIDEO_SHOW?.videoTitleOriginal;
      }
    } else if (/redtube|youporn|tube8/.test(root)) {
      const video_player_setup = win.page_params.video_player_setup;
      const playervars = /redtube/.test(root)
        ? video_player_setup[Object.keys(video_player_setup)[0]].playervars
        : video_player_setup.playervars;
      cVid.title = playervars.video_title;
      for (const m of playervars.mediaDefinitions) {
        if (m.format !== 'hls') {
          continue;
        }
        tsSrc = m.videoUrl.startsWith('/') ? HP.webpage.origin + m.videoUrl : m.videoUrl;
        break;
      }
    } else if (/thumbzilla/.test(root)) {
      const video_vars = win.video_vars;
      cVid.title = video_vars.video_title;
      for (const e of video_vars.mediaDefinitions) {
        if (e.format !== 'hls') {
          continue;
        }
        if (e.defaultQuality) {
          tsSrc = e.videoUrl;
          break;
        }
      }
    }
  } catch (ex) {
    err(ex);
  }
  return cVid.title;
};
const geekVideos = async (doc = document, pgUrl) => {
  try {
    const loc = isEmpty(pgUrl) ? HP.webpage : strToURL(pgUrl);
    const media = new mphMedia(loc);
    const qualities = await media.autoStart();
    if (isEmpty(qualities)) {
      info('Empty quality list', qualities);
      return;
    }
    const vt = media.title ?? getVidTitle(pgUrl) ?? doc.title;
    makeContainer(qualities, {
      ts: tsSrc,
      title: vt
    });
    await query('.mgp_container');
    let injInto = doc.documentElement;
    if (isMobile) {
      dom.cl.add(vidQuality, 'mgp_selector');
      if (qs('div.mgp_controls > div.mgp_qualitiesMenu') || /youporn/.test(loc.host)) {
        info('Detected tablet...');
        const vidFrame = await query('div.mgp_options');
        if (!vidFrame.contains(vidQuality)) {
          vidFrame.append(vidQuality);
        }
        dom.cl.add(vidQuality, 'mgp_optionsBtn');
        dom.prop(vidQuality, 'innerHTML', iconSVG.mobileDownload);
        return;
      }
      const injVid = qs('ul.mgp_switches') || qs('ul.mgp_optionsSwitches');
      if (!injInto.contains(vidQuality)) {
        injVid.prepend(vidQuality);
        info('Detected mobile...');
        dom.prop(
          vidQuality,
          'innerHTML',
          `${iconSVG.mobileDownload}<div class="mgp_value">Quality(s)</div>`
        );
        const cfgHeader = qs('.mgp_subPage') ? qs('.mgp_subPage').firstElementChild : null;
        ael(qs('.mgp_options > .mgp_optionsBtn'), 'click', () => {
          dom.prop(cfgHeader, 'innerHTML', 'Settings');
          dom.cl.remove(qs('.mgp_optionsMenu'), 'mgp_level2');
        });
        ael(cfgHeader, 'click', () => {
          dom.prop(cfgHeader, 'innerHTML', 'Settings');
          dom.cl.remove(qs('.mgp_optionsMenu'), 'mgp_level2');
        });
        return;
      }
    }
    if (qs('.mgp_contextMenu .mgp_content')) {
      injInto = qs('.mgp_contextMenu .mgp_content');
    } else if (qs('.mgp_contextMenu .mgp_contextContent')) {
      injInto = qs('.mgp_contextMenu .mgp_contextContent');
    }
    if (!injInto.contains(vidQuality)) {
      info('Detected desktop...');
      injInto.prepend(vidQuality);
    }
  } catch (ex) {
    err(ex);
  }
};
const geekGifs = async (doc = document) => {
  const qualities = [];
  try {
    let vt;
    for (const s of doc.getElementsByTagName('script')) {
      if (isEmpty(s.innerHTML)) continue;
      if (s.getAttribute('type') !== 'application/ld+json') continue;
      const txt = s.innerHTML.toString();
      const j = JSON.parse(txt);
      if (isEmpty(vt) && j.name) {
        vt = j.name;
      }
      if (j.contentUrl) {
        qualities.push(j.contentUrl);
      } else if (j.thumbnailUrl) {
        qualities.push(j.thumbnailUrl);
      }
    }
    if (isEmpty(qualities)) {
      info('Empty quality list', qualities);
      return;
    }
    makeContainer(qualities, {
      rows: ['source', 'copy', 'download', 'open'],
      title: vt
    });
    let injInto = doc.documentElement;
    if (qs('[id="js-gifWebMWrapper"]')) {
      injInto = qs('[id="js-gifWebMWrapper"]').parentElement;
    }
    injInto.prepend(vidQuality);
  } catch (ex) {
    err(ex);
  }
};
const geekShorts = async (doc = document) => {
  try {
    const cache = [];
    let currentPage = 1;
    let direction = '';
    if (HP.host.includes('pornhub')) {
      const requestToken = qs('.slider-container').dataset.token;
      const makeData = async (JSON_SHORTIES) => {
        for (const s of normalizeTarget(JSON_SHORTIES)) {
          const media = s.mediaDefinitions.filter((i) => i.format === 'mp4');
          const q = await Network.req(media[0].videoUrl);
          if (!Array.isArray(q)) {
            continue;
          }
          const qualities = q
            .map((i) => i.videoUrl)
            .filter((i) => !cache.includes(i))
            .sort(sortVideos);
          if (isEmpty(qualities)) {
            continue;
          }
          cache.push(...qualities);
          makeContainer(qualities, {
            title: s.videoTitle,
            rows: ['title', 'source', 'copy', 'download', 'open']
          });
        }
      };
      const loadPage = async (page = 1) => {
        let JSON_SHORTIES = win.JSON_SHORTIES ?? [];
        if (page > 1) {
          const sURL =
            '/shorties/get?' +
            new URLSearchParams({
              token: requestToken,
              page
            });
          JSON_SHORTIES = await Network.req(sURL);
        }
        await makeData(JSON_SHORTIES);
      };
      let t = window.scrollY;
      window.addEventListener('scroll', async () => {
        const { scrollTop: e, scrollHeight: h, clientHeight: a } = doc.documentElement;
        if (h - 5 <= e + a) {
          currentPage += 1;
          if (direction === 'next') {
            await loadPage(currentPage);
          }
        }
        if (t < window.scrollY) {
          direction = 'next';
        } else {
          direction = 'previous';
        }
        t = window.scrollY;
      });
      await loadPage(currentPage);
    }
    let injInto = doc.documentElement;
    if (qs('.wrapper > .container')) {
      injInto = qs('.wrapper > .container');
    }
    injInto.prepend(vidQuality);
  } catch (ex) {
    err(ex);
  }
};
const triggerHls = async (id) => {
  msg('[MagicPH] Compiling hls video...', 1500);
  if (!id) {
    if (!qs('meta[name="twitter:image"]')) {
      return;
    }
    const ma = qs('meta[name="twitter:image"]').content.match(/\/(\d+)\//);
    id = ma ? ma[1] : location.pathname.replace(/\/-0/, '');
  }
  const { file } = await Network.req(`https://store.externulls.com/facts/file/${id}`);
  const { hls_resources } = file;
  const fl_cdn = hls_resources[Object.keys(hls_resources)[0]];
  const hls = new mphHLS(`https://video.externulls.com/${fl_cdn}`);
  const frags = await hls.build();
  const m = await hls.mergeRecords(fl_cdn, frags);
  const blob = new Blob([arrayConcat(m)], {
    type: 'application/octet-stream'
  });
  makeContainer([blob], {
    rows: ['title', 'download'],
    title: file.data[0].cd_value
  });
  const injInto = qs('.XContentViewer__details__actions');
  if (injInto) {
    injInto.append(vidQuality);
  }
};
// #region Site Director
const mainUserJS = async (doc = document) => {
  try {
    const { current } = HP;
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    /**
     * @template { Function } F
     * @param { (this: F, node: Node) => * } callback
     */
    const watch = (callback) => {
      observe(doc, (mutations) => {
        try {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType !== 1) {
                continue;
              }
              if (ignoreTags.has(node.localName)) {
                continue;
              }
              if (node.parentElement === null) {
                continue;
              }
              if (!(node instanceof HTMLElement)) {
                continue;
              }
              callback(node);
            }
          }
        } catch (ex) {
          err(ex);
        }
      });
    };
    if (/onlyfans/.test(current.root)) {
      const app = await query('[id="app"]');
      while (isNull(app.__vue__)) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      const appVue = app.__vue__;
      const videoPosts = new Set();
      const ofMedia = new Set();
      /**
       * @param { any[] } postArr
       */
      const filterPosts = (postArr) => {
        const media = postArr.filter((i) => {
          if (isNull(i)) {
            return false;
          }
          if (
            normalizeTarget(i?.media).filter((m) => m.type === 'video' && (m.src || m.full))
              .length === 0
          ) {
            return false;
          }
          return true;
        });
        if (media.length === 0) {
          return;
        }
        const mediaObj = media.map((i) => {
          const obj = {
            ...i,
            media: normalizeTarget(i.media)
              .filter((m) => m.type === 'video')
              .map((m) => {
                return { ...m };
              })
          };
          if (obj.chatId && ofUsers[obj.chatId]) {
            obj.userData = ofUsers[obj.chatId];
          } else if (obj.fromUser && ofUsers[obj.fromUser]) {
            obj.userData = ofUsers[obj.fromUser];
          } else if (obj.withUser && ofUsers[obj.withUser]) {
            obj.userData = ofUsers[obj.withUser];
          } else if (obj.author && ofUsers[obj.author]) {
            obj.userData = ofUsers[obj.author];
          }
          return obj;
        });
        for (const p of mediaObj) {
          if (videoPosts.has(p.id)) {
            continue;
          }
          videoPosts.add(p.id);
          if (!p.userData?.name) {
            continue;
          }
          const userData = p.userData;
          if (!videoCache.has(userData.name)) {
            videoCache.set(userData.name, []);
          }
          const vid = videoCache.get(userData.name) || [];
          if (vid.filter((v) => v.id === p.id).length !== 0) {
            continue;
          }
          if (!hostCache.has(userData.name)) {
            hostCache.set(userData.name, {
              mediaFiles: [],
              cache: [],
              $elems: []
            });
          }
          for (const m of normalizeTarget(p.media)) {
            const videoId = `${m.id}`;
            const createVideo = () => {
              const vidObj = {
                poster: m.thumb,
                quality: 'original',
                src: m.full,
                title: videoId,
                userId: userData.id,
                username: userData.name,
                name: userData.name,
                user: userData,
                duration: m.source.duration ? fancyTimeFormat(m.source.duration) : null,
                frame: m.source.width ? ` (${m.source.width}x${m.source.height})` : null,
                original:
                  p.responseType === 'post'
                    ? `/${p.id}/${userData.username}`
                    : p.responseType === 'message'
                      ? `/my/chats/chat/${userData.id}/`
                      : `/${p.id}`,
                text: p.text ?? null,
                raw: p
              };
              if (vidObj.src) {
                vidObj.src = m.full;
                if (ofMedia.has(vidObj)) {
                  return null;
                }
                ofMedia.add(vidObj);
                vid.push(vidObj);
                if (vidObj?.userId) {
                  for (const e of qsA(`mph-count[data-host="${vidObj.userId}"]`)) {
                    dom.text(e.parentElement, vidObj.userId);
                  }
                }
              } else if (m.videoSources) {
                for (const [k, v] of Object.entries(m.videoSources)) {
                  if (isNull(v)) {
                    continue;
                  }
                  vidObj.quality = k;
                  vidObj.src = v;
                  if (ofMedia.has(vidObj)) {
                    return null;
                  }
                  ofMedia.add(vidObj);
                  vid.push(vidObj);
                }
              }
              return vidObj;
            };
            const video = createVideo();
            if (isNull(video)) {
              continue;
            }
          }
          if (vid.length !== 0) {
            videoCache.set(userData.name, vid);
          }
        }
        dbg('toGrab', { videoCache, ofMedia, hostCache });
        addToWrapper();
      };
      appVue.$store.watch((a) => {
        // dbg(a.router.route.to);
        const userId = a.router.route.to.params?.userId ?? 'onlyfans';
        if (userId !== currentUserId) {
          currentUserId = userId;
        }
        if (a.users?.items) {
          for (const c of Object.values(a.users.items)) {
            if (!hostCache.has(c.name)) {
              hostCache.set(c.name, {
                mediaFiles: [],
                cache: [],
                $elems: []
              });
            }
            if (ofUsers[c.id]) {
              continue;
            }
            ofUsers[c.id] = c;
          }
        }
        const toGrab = [];
        if (a.posts?.items) {
          toGrab.push(...Object.values(a.posts?.items));
        }
        if (a.chats?.messages) {
          const messages = a.chats.messages;
          if (a.chats?.items) {
            for (const c of Object.values(a.chats.items)) {
              for (const m of c.messages) {
                if (!messages[m]) {
                  continue;
                }
                toGrab.push(messages[m]);
              }
            }
          }
          toGrab.push(...Object.values(messages));
        }
        if (toGrab.length !== 0) {
          filterPosts(toGrab);
        }
      });
      vueRouter = appVue._routerRoot['$options'].router.history;
    } else if (/porntrex|analdin|porn00/.test(current.root)) {
      if (/analdin/.test(current.root)) {
        watch(async (node) => {
          if (node.tagName === 'VIDEO') {
            const media = new mphMedia(window.location.href);
            const qualities = await media.autoStart();
            const vt = media.title ?? doc.title;
            makeContainer(qualities, {
              ts: tsSrc,
              title: vt
            });
          }
        });
      }
      const media = new mphMedia(HP.webpage);
      const qualities = await media.autoStart();
      const vt = media.title ?? doc.title;
      makeContainer(qualities, {
        ts: tsSrc,
        title: vt
      });
    } else if (/spankbang/.test(current.root)) {
      const q = [];
      for (const e of qsA('video > source')) {
        if (typeof e.src === 'string') {
          q.push(e.src);
        }
      }
      makeContainer(q, {
        ts: tsSrc,
        title: cleanURL(doc.title)
      });
    } else if (/91porn/.test(current.root)) {
      const s = qs('source', qs('video'));
      if (!s) {
        return;
      }
      if (typeof s.src === 'string') {
        makeContainer([s.src], {
          title: cleanURL(doc.title)
        });
      }
    } else if (/hqporner/.test(current.root)) {
      const elem = qs('.videoWrapper > iframe');
      const media = new mphMedia(elem.src);
      const qualities = await media.autoStart();
      const vt = media.title ?? doc.title;
      makeContainer(qualities, {
        ts: tsSrc,
        title: vt
      });
    } else if (/xnxx|xvideos/.test(current.root)) {
      while (isNull(win.html5player)) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      if (!win.Hls.isSupported()) {
        return;
      }
      const html5player = win.html5player;
      const hls = html5player.hlsobj;
      const h = new mphHLS(hls.url);
      const q = await h.start();
      makeContainer(q, {
        rows: ['title', 'download'],
        ts: tsSrc,
        title: cleanURL(html5player.video_title ?? doc.title)
      });
      const injInto = /xvideos/.test(HP.current.root) ? qs('div.tabs') : qs('div.video-title');
      if (injInto) {
        injInto.append(vidQuality);
      }
    } else if (/xhamster/.test(current.root)) {
      const media = new mphMedia(HP.webpage.href);
      const qualities = await media.autoStart(HP.webpage.href);
      const vt = media.title ?? doc.title;
      makeContainer(qualities, {
        hermes: {
          credentials: 'omit',
          referrer: `${HP.webpage.protocol}//${HP.host}`
        },
        ts: tsSrc,
        title: vt
      });
      const menu = qs(isMobile ? '.xplayer-menu-mobile-bottom-left' : '.xp-context-menu');
      if (menu) {
        menu.prepend(vidQuality);
      }
    } else if (current.pathType === 'Video') {
      await geekVideos(doc);
    } else if (current.pathType === 'GIF') {
      await geekGifs(doc);
    } else if (current.pathType === 'Shorties') {
      await geekShorts(doc);
    } else if (/beeg/.test(current.root)) {
      watch((node) => {
        if (node.localName === 'div' && dom.cl.has(node, 'x-player__video')) {
          const p = node.parentElement.parentElement;
          if (qs('img[src]', p)) {
            const ma = qs('img[src]', p).src.match(/\/(\d+)\//);
            if (ma) {
              triggerHls(ma[1]);
              return;
            }
          }
          triggerHls(location.pathname.replace(/\/-0/, ''));
        }
      });
    } else if (/sxyprn/.test(current.root)) {
      log(HP.current);
      while (qs('#player_el').src === window.location.href) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      makeContainer([qs('#player_el').src], {
        rows: ['source', 'copy', 'open', 'preview'],
        ts: tsSrc,
        title: dom.text(qs('.post_text')),
        host: location.hostname
      });
    }
    if (!/onlyfans/.test(current.root)) {
      tab.create(HP.webpage.host);
    }
  } catch (ex) {
    err(ex);
  }
};
// #endregion
/**
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (isFN(onDomReady)) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};
loadDOM((doc) => {
  if (window.location === null) {
    err('"window.location" is null, reload the webpage or use a different one');
    return;
  }
  if (doc === null) {
    err('"doc" is null, reload the webpage or use a different one');
    return;
  }
  HP.inject(mainUserJS, doc);
});

})();
