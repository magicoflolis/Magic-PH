// ==UserScript==
// @version      5.0.0
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
// @match     https://91porn.com/view_video.php?*
// @match     https://hqporner.com/hdporn/*
// @match     https://spankbang.com/*/video/*
// @match     https://*.porntrex.com/video/*/*
// @match     https://*.analdin.com/*
// @match     https://sxyprn.com/post/*
// @match     https://www.porn00.org/video/*
// @match     https://www.eporner.com/video-*/*
// @match     https://www.youjizz.com/videos/*.html
// @noframes
// @run-at     document-start
// ==/UserScript==