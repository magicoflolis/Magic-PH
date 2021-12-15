/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/general.js":
/*!***********************!*\
  !*** ./js/general.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ael": () => (/* binding */ ael),
/* harmony export */   "locate": () => (/* binding */ locate),
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "check": () => (/* binding */ check),
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "userInfo": () => (/* binding */ userInfo),
/* harmony export */   "scrollnumber": () => (/* binding */ scrollnumber)
/* harmony export */ });
/* harmony import */ var _web_accessible_resources_jquery_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web_accessible_resources/jquery.min.js */ "./web_accessible_resources/jquery.min.js");
/* harmony import */ var _web_accessible_resources_jquery_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_web_accessible_resources_jquery_min_js__WEBPACK_IMPORTED_MODULE_0__);

window.$ = window.jQuery = (_web_accessible_resources_jquery_min_js__WEBPACK_IMPORTED_MODULE_0___default());

var qs = element => {
  return document.querySelector(element);
},
    ael = function ael() {
  var elm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var event = arguments.length > 1 ? arguments[1] : undefined;
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  return elm.addEventListener(event, callback);
},

/**
 * Can create various elements.
 */
create = (element, type, name) => {
  var el = document.createElement(element);
  type ? el.type = type : false;
  name ? el.className = name : false;
  return el;
},
    locate = document.location.href,
    check = {
  community: document.location.pathname == "/user/discover" ? true : false,
  channel: $("#channelsProfile").length,
  cv: $(".gridWrapper").length,
  home: document.location.pathname == "/" ? true : false,
  gay: /gay/.test(locate),
  gif: $("#gifWrap").length,
  lo: $("body.logged-out").length,
  model: $("div.amateurModel").length,
  new: $("#headerSearchWrapperFree").length,
  premium: $(".premiumUser").length,
  pstar: $(".claimed").length,
  user: $("#profileContent").length,
  video: /view_video.php/.test(locate),
  //recommended: $("div#recommendations").length
  recommended: /recommended/.test(locate)
};

var config = {
  altplayers: "none",
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: false,
  sidebar: false,
  seektime: 4,
  headerOrder: ["home", "videos", "categories", "pornstars", "gifs", "recommended", "custom"],
  headerLinks: {
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community: "/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    Gift: "/premium",
    GPremium: "/gay/premium",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr"
  }
},
    scrollnumber = /view_video.php/.test(locate) ? 400 : 101,
    userInfo = function userInfo() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
  var uName = $("div.usernameWrap > a"),
      mod = $("a.usernameLink"),
      vid = $("span.usernameBadgesWrapper > a"),
      val = $("div.usernameWrap > a");
  url == "model" ? val = mod : url == "video" ? val = vid : val = uName;

  for (var i = 0; i < val.attr("href").length; i++) {
    val.eq(i).attr("href", "".concat(val.eq(i).attr("href"), "/videos"));
  }
};



/***/ }),

/***/ "./js/logger.js":
/*!**********************!*\
  !*** ./js/logger.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var t = performance.now(),
    log = (message, alert) => {
  console.groupCollapsed("[MagicPH] Time: ".concat(t, "ms ").concat(alert === "err" ? "ERROR" : ""));
  return console.log(message), console.trace(message), console.groupEnd();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);

/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ph_player": () => (/* binding */ ph_player)
/* harmony export */ });
/* harmony import */ var _web_accessible_resources_plyr_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web_accessible_resources/plyr.min.js */ "./web_accessible_resources/plyr.min.js");
/* harmony import */ var _web_accessible_resources_plyr_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_web_accessible_resources_plyr_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general */ "./js/general.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


 // window.media_5 or media_0
// MGP.destroyPlayer()
// Add "&?mgp_debug=true" in URL to enable debugging.

var quality_error = "[Error] Not Found",
    quality_240p = quality_error,
    quality_480p = quality_error,
    quality_720p = quality_error,
    quality_1080p = quality_error,
    quality_1440p = quality_error,
    quality_2160p = quality_error,
    quality_best = quality_error,
    video = $(".mainPlayerDiv").attr('data-video-id'),
    pid = "playerDiv_".concat(video),
    flashvarsId = "flashvars_".concat(video),
    getMediaUrl = quality_error,
    ph_player = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    // let vurl = window.location.toString();
    // document.location.search != `${document.location.search}&t=3` ? (window.location = vurl.replace(document.location.search, `${document.location.search}&t=3`)) : false
    for (var i = 0; i < window[flashvarsId].mediaDefinitions.length; i++) {
      window[flashvarsId].mediaDefinitions[i].format === "mp4" ? getMediaUrl = window[flashvarsId].mediaDefinitions[i].videoUrl : false;
    }

    ;
    yield getVideoUrl(getMediaUrl).then(r => {
      for (var _i = 0; _i < r.length; _i++) {
        var item = r[_i];
        item.quality == '240' ? (quality_240p = item.videoUrl, quality_best = item.videoUrl) : item.quality == '480' ? (quality_480p = item.videoUrl, quality_best = item.videoUrl) : item.quality == '720' ? (quality_720p = item.videoUrl, quality_best = item.videoUrl) : item.quality == '1080' ? (quality_1080p = item.videoUrl, quality_best = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":1080}')) : item.quality == '1440' ? (quality_1440p = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":1440}')) : item.quality == '2160' ? (quality_2160p = item.videoUrl, localStorage.setItem("mgp_player", '{"quality":2160}')) : false;
      }

      ;
    });
    var button = "<div class=\"mgp_download\">Video Quality(s)</div>",
        layout = "\n  <div class=\"mgp_downloadInfo\">\n    <div class=\"mgp_copyCloseDiv\">\n      <div class=\"mgp_title\">Video Quality(s)</div>\n      <div class=\"mgp_hideMenu\" title=\"Close\">\xD7</div>\n    </div>\n    <ul>\n    <li><span>Best:</span><input type=\"url\" size=\"70\" id=\"urlAreaBest\" readonly value=\"".concat(quality_best, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlAreaBest')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>240p:</span><input type=\"url\" size=\"70\" id=\"urlArea1\" readonly value=\"").concat(quality_240p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea1')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>480p:</span><input type=\"url\" size=\"70\" id=\"urlArea2\" readonly value=\"").concat(quality_480p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea2')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>720p:</span><input type=\"url\" size=\"70\" id=\"urlArea3\" readonly value=\"").concat(quality_720p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea3')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>1080p:</span><input type=\"url\" size=\"70\" id=\"urlArea4\" readonly value=\"").concat(quality_1080p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea4')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>1440p:</span><input type=\"url\" size=\"70\" id=\"urlArea5\" readonly value=\"").concat(quality_1440p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea5')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    <li><span>2160p:</span><input type=\"url\" size=\"70\" id=\"urlArea6\" readonly value=\"").concat(quality_2160p, "\"></input><a class=\"suggestToggleAlt\" onclick=\"copyUrl('urlArea6')\" title=\"Copy\"><div class=\"mgp_btn mgp_icon mgp_icon-copy\"></div></a></li>\n    </ul>\n  </div>\n  <script>\n  function copyUrl(id) {\n    let urlbox = document.getElementById(id);\n    try {\n      navigator.clipboard.writeText(urlbox.value);\n      urlbox.style.color = '#f90';\n    } catch (err) {\n      urlbox.style.color = 'rgb(221, 67, 67)';\n      console.log(\"[MagicPH] \" + err);\n      urlbox.select();\n      document.execCommand(\"Copy\");\n    }\n  }\n  </script>");
    $(button).prependTo("div.mgp_contextMenu > div.mgp_content");
    $(layout).appendTo(".playerFlvContainer");
    (0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)((0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".mgp_download"), "click", () => {
      return $('.mgp_contextMenu').addClass('mgp_hidden'), $('.mgp_downloadInfo').addClass('mgp_active');
    });
    (0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)((0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".mgp_hideMenu"), "click", () => {
      return $('.mgp_downloadInfo').removeClass('mgp_active');
    });

    function getVideoUrl(link) {
      return new Promise(resolve => {
        $.ajax({
          type: "GET",
          url: link,
          success: data => {
            resolve(data);
          }
        });
      });
    }

    ;

    var altplayer = () => {
      var options = {
        enabled: true,
        disableContextMenu: true,
        controls: ['restart', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'download', 'fullscreen'],
        clickToPlay: true,
        blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
        quality: {
          default: 576,
          options: [2160, 1440, 1080, 720, 576, 480, 360, 240]
        },
        settings: ['quality', 'speed', 'loop'],
        autopause: true,
        autoplay: false,
        seekTime: 3,
        hideControls: true,
        keyboard: {
          focused: true,
          global: true
        },
        tooltips: {
          controls: true,
          seek: true
        },
        displayDuration: true,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: false,
          container: null
        },
        storage: {
          enabled: true,
          key: 'plyr'
        }
      },
          pframe = "<div id=\"playerframe\" class=\"altframe bigp\">\n  <video id=\"altplayer\" class=\"biga\" controls></video>\n  </div>";
      window.MGP.players[pid].mute();
      window.MGP.players[pid].pause();
      $(pframe).prependTo($("div.video-wrapper").eq(0));
      new (_web_accessible_resources_plyr_min_js__WEBPACK_IMPORTED_MODULE_0___default())(document.getElementById("altplayer"), options);
      (0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)(document.getElementById("altplayer"), "ready", event => {
        var player = event.detail.plyr;
        player.source = {
          type: 'video',
          sources: [{
            src: document.querySelector("#urlAreaBest").value,
            type: 'video/mp4',
            size: 576
          }, {
            src: document.querySelector("#urlArea1").value,
            type: 'video/mp4',
            size: 240
          }, {
            src: document.querySelector("#urlArea2").value,
            type: 'video/mp4',
            size: 480
          }, {
            src: document.querySelector("#urlArea3").value,
            type: 'video/mp4',
            size: 720
          }, {
            src: document.querySelector("#urlArea4").value,
            type: 'video/mp4',
            size: 1080
          }, {
            src: document.querySelector("#urlArea5").value,
            type: 'video/mp4',
            size: 1440
          }, {
            src: document.querySelector("#urlArea6").value,
            type: 'video/mp4',
            size: 2160
          }],
          poster: document.querySelector('img#videoElementPoster').src,
          previewThumbnails: {
            src: document.querySelector('img.mgp_image').src
          }
        };
        $('head > script[src="cdn1d-static-shared.phncdn.com/html5player/videoPlayer/es6player/6.1.6/desktop-player-adaptive-hls.min.js"]').remove();
        MGP.destroyPlayer(MGP.getPlayerIds());
        $(".mainPlayerDiv").empty().remove();
        player.on('loadeddata', () => {
          player.currentTime = $(".mainPlayerDiv").attr("magicph-seek");
          player.play(); // player.volume = 1;
        }); // $("video-element").remove();
        // player.volume = 0;
      });
    };

    if (document.readyState === "complete") {
      $(".video-wrapper > div.mainPlayerDiv.ap").length ? altplayer() : (yield new Promise(resolve => setTimeout(resolve, 1000)), window.MGP.players[pid].seek($(".mainPlayerDiv").attr("magicph-seek")));
    }

    ;
  });

  return function ph_player() {
    return _ref.apply(this, arguments);
  };
}();



/***/ }),

/***/ "./web_accessible_resources/jquery.min.js":
/*!************************************************!*\
  !*** ./web_accessible_resources/jquery.min.js ***!
  \************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";

   true && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";

  var t = [],
      r = Object.getPrototypeOf,
      s = t.slice,
      g = t.flat ? function (e) {
    return t.flat.call(e);
  } : function (e) {
    return t.concat.apply([], e);
  },
      u = t.push,
      i = t.indexOf,
      n = {},
      o = n.toString,
      v = n.hasOwnProperty,
      a = v.toString,
      l = a.call(Object),
      y = {},
      m = function m(e) {
    return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
  },
      x = function x(e) {
    return null != e && e === e.window;
  },
      E = C.document,
      c = {
    type: !0,
    src: !0,
    nonce: !0,
    noModule: !0
  };

  function b(e, t, n) {
    var r,
        i,
        o = (n = n || E).createElement("script");
    if (o.text = e, t) for (r in c) {
      (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
    }
    n.head.appendChild(o).parentNode.removeChild(o);
  }

  function w(e) {
    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e;
  }

  var f = "3.6.0",
      S = function S(e, t) {
    return new S.fn.init(e, t);
  };

  function p(e) {
    var t = !!e && "length" in e && e.length,
        n = w(e);
    return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }

  S.fn = S.prototype = {
    jquery: f,
    constructor: S,
    length: 0,
    toArray: function toArray() {
      return s.call(this);
    },
    get: function get(e) {
      return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function pushStack(e) {
      var t = S.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function each(e) {
      return S.each(this, e);
    },
    map: function map(n) {
      return this.pushStack(S.map(this, function (e, t) {
        return n.call(e, t, e);
      }));
    },
    slice: function slice() {
      return this.pushStack(s.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(S.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(S.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: t.sort,
    splice: t.splice
  }, S.extend = S.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;

    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
      }
    }

    return a;
  }, S.extend({
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(e) {
      var t, n;
      return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l);
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    globalEval: function globalEval(e, t, n) {
      b(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function each(e, t) {
      var n,
          r = 0;

      if (p(e)) {
        for (n = e.length; r < n; r++) {
          if (!1 === t.call(e[r], r, e[r])) break;
        }
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }

      return e;
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      return null == t ? -1 : i.call(t, e, n);
    },
    merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
        e[i++] = t[r];
      }

      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) {
        !t(e[i], i) !== a && r.push(e[i]);
      }

      return r;
    },
    map: function map(e, t, n) {
      var r,
          i,
          o = 0,
          a = [];
      if (p(e)) for (r = e.length; o < r; o++) {
        null != (i = t(e[o], o, n)) && a.push(i);
      } else for (o in e) {
        null != (i = t(e[o], o, n)) && a.push(i);
      }
      return g(a);
    },
    guid: 1,
    support: y
  }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    n["[object " + t + "]"] = t.toLowerCase();
  });

  var d = function (n) {
    var e,
        d,
        b,
        o,
        i,
        h,
        f,
        g,
        w,
        u,
        l,
        T,
        C,
        a,
        E,
        v,
        s,
        c,
        y,
        S = "sizzle" + 1 * new Date(),
        p = n.document,
        k = 0,
        r = 0,
        m = ue(),
        x = ue(),
        A = ue(),
        N = ue(),
        j = function j(e, t) {
      return e === t && (l = !0), 0;
    },
        D = {}.hasOwnProperty,
        t = [],
        q = t.pop,
        L = t.push,
        H = t.push,
        O = t.slice,
        P = function P(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
        F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
        B = new RegExp(M + "+", "g"),
        $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        _ = new RegExp("^" + M + "*," + M + "*"),
        z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        U = new RegExp(M + "|>"),
        X = new RegExp(F),
        V = new RegExp("^" + I + "$"),
        G = {
      ID: new RegExp("^#(" + I + ")"),
      CLASS: new RegExp("^\\.(" + I + ")"),
      TAG: new RegExp("^(" + I + "|[*])"),
      ATTR: new RegExp("^" + W),
      PSEUDO: new RegExp("^" + F),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + R + ")$", "i"),
      needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
    },
        Y = /HTML$/i,
        Q = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
        ne = function ne(e, t) {
      var n = "0x" + e.slice(1) - 65536;
      return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
    },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function ie(e, t) {
      return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        oe = function oe() {
      T();
    },
        ae = be(function (e) {
      return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length ? function (e, t) {
          L.apply(e, O.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;

          while (e[n++] = t[r++]) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function se(t, e, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = e && e.ownerDocument,
          p = e ? e.nodeType : 9;
      if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;

      if (!r && (T(e), e = e || C, E)) {
        if (11 !== p && (u = Z.exec(t))) if (i = u[1]) {
          if (9 === p) {
            if (!(a = e.getElementById(i))) return n;
            if (a.id === i) return n.push(a), n;
          } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n;
        } else {
          if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
          if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n;
        }

        if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
          if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
            (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;

            while (o--) {
              l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
            }

            c = l.join(",");
          }

          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            N(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }

      return g(t.replace($, "$1"), e, n, r);
    }

    function ue() {
      var r = [];
      return function e(t, n) {
        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
      };
    }

    function le(e) {
      return e[S] = !0, e;
    }

    function ce(e) {
      var t = C.createElement("fieldset");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function fe(e, t) {
      var n = e.split("|"),
          r = n.length;

      while (r--) {
        b.attrHandle[n[r]] = t;
      }
    }

    function pe(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }

    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }

    function ge(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }

    function ve(a) {
      return le(function (o) {
        return o = +o, le(function (e, t) {
          var n,
              r = a([], e.length, o),
              i = r.length;

          while (i--) {
            e[n = r[i]] && (e[n] = !(t[n] = e[n]));
          }
        });
      });
    }

    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }

    for (e in d = se.support = {}, i = se.isXML = function (e) {
      var t = e && e.namespaceURI,
          n = e && (e.ownerDocument || e).documentElement;
      return !Y.test(t || n && n.nodeName || "HTML");
    }, T = se.setDocument = function (e) {
      var t,
          n,
          r = e ? e.ownerDocument || e : p;
      return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function (e) {
        return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
      }), d.attributes = ce(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), d.getElementsByTagName = ce(function (e) {
        return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length;
      }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) {
        return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length;
      }), d.getById ? (b.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (b.filter.ID = function (e) {
        var n = e.replace(te, ne);
        return function (e) {
          var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return t && t.value === n;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n,
              r,
              i,
              o = t.getElementById(e);

          if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            i = t.getElementsByName(e), r = 0;

            while (o = i[r++]) {
              if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            }
          }

          return [];
        }
      }), b.find.TAG = d.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);

        if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }

          return r;
        }

        return o;
      }, b.find.CLASS = d.getElementsByClassName && function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e);
      }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) {
        var t;
        a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
      }), ce(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var t = C.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
      })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) {
        d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F);
      }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }
        return !1;
      }, j = t ? function (e, t) {
        if (e === t) return l = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1);
      } : function (e, t) {
        if (e === t) return l = !0, 0;
        var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];
        if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
        if (i === o) return pe(e, t);
        n = e;

        while (n = n.parentNode) {
          a.unshift(n);
        }

        n = t;

        while (n = n.parentNode) {
          s.unshift(n);
        }

        while (a[r] === s[r]) {
          r++;
        }

        return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0;
      }), C;
    }, se.matches = function (e, t) {
      return se(e, null, null, t);
    }, se.matchesSelector = function (e, t) {
      if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
        var n = c.call(e, t);
        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (e) {
        N(t, !0);
      }
      return 0 < se(t, C, null, [e]).length;
    }, se.contains = function (e, t) {
      return (e.ownerDocument || e) != C && T(e), y(e, t);
    }, se.attr = function (e, t) {
      (e.ownerDocument || e) != C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
          r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }, se.escape = function (e) {
      return (e + "").replace(re, ie);
    }, se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, se.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;

      if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(j), l) {
        while (t = e[i++]) {
          t === e[i] && (r = n.push(i));
        }

        while (r--) {
          e.splice(n[r], 1);
        }
      }

      return u = null, e;
    }, o = se.getText = function (e) {
      var t,
          n = "",
          r = 0,
          i = e.nodeType;

      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += o(e);
          }
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else while (t = e[r++]) {
        n += o(t);
      }

      return n;
    }, (b = se.selectors = {
      cacheLength: 50,
      createPseudo: le,
      match: G,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = m[e + " "];
          return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(n, r, i) {
          return function (e) {
            var t = se.attr(e, n);
            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
          };
        },
        CHILD: function CHILD(h, e, t, g, v) {
          var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
          return 1 === g && 0 === v ? function (e) {
            return !!e.parentNode;
          } : function (e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l = y !== m ? "nextSibling" : "previousSibling",
                c = e.parentNode,
                f = x && e.nodeName.toLowerCase(),
                p = !n && !x,
                d = !1;

            if (c) {
              if (y) {
                while (l) {
                  a = e;

                  while (a = a[l]) {
                    if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                  }

                  u = l = "only" === h && !u && "nextSibling";
                }

                return !0;
              }

              if (u = [m ? c.firstChild : c.lastChild], m && p) {
                d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];

                while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                  if (1 === a.nodeType && ++d && a === e) {
                    i[h] = [k, s, d];
                    break;
                  }
                }
              } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
              }

              return (d -= v) === g || d % g == 0 && 0 <= d / g;
            }
          };
        },
        PSEUDO: function PSEUDO(e, o) {
          var t,
              a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
          return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) {
            var n,
                r = a(e, o),
                i = r.length;

            while (i--) {
              e[n = P(e, r[i])] = !(t[n] = r[i]);
            }
          }) : function (e) {
            return a(e, 0, t);
          }) : a;
        }
      },
      pseudos: {
        not: le(function (e) {
          var r = [],
              i = [],
              s = f(e.replace($, "$1"));
          return s[S] ? le(function (e, t, n, r) {
            var i,
                o = s(e, null, r, []),
                a = e.length;

            while (a--) {
              (i = o[a]) && (e[a] = !(t[a] = i));
            }
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
          };
        }),
        has: le(function (t) {
          return function (e) {
            return 0 < se(t, e).length;
          };
        }),
        contains: le(function (t) {
          return t = t.replace(te, ne), function (e) {
            return -1 < (e.textContent || o(e)).indexOf(t);
          };
        }),
        lang: le(function (n) {
          return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) {
            var t;

            do {
              if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);

            return !1;
          };
        }),
        target: function target(e) {
          var t = n.location && n.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function root(e) {
          return e === a;
        },
        focus: function focus(e) {
          return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !b.pseudos.empty(e);
        },
        header: function header(e) {
          return J.test(e.nodeName);
        },
        input: function input(e) {
          return Q.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: ve(function () {
          return [0];
        }),
        last: ve(function (e, t) {
          return [t - 1];
        }),
        eq: ve(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: ve(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: ve(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) {
            e.push(r);
          }

          return e;
        }),
        gt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }

          return e;
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      b.pseudos[e] = de(e);
    }

    for (e in {
      submit: !0,
      reset: !0
    }) {
      b.pseudos[e] = he(e);
    }

    function me() {}

    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }

      return r;
    }

    function be(s, e, t) {
      var u = e.dir,
          l = e.next,
          c = l || u,
          f = t && "parentNode" === c,
          p = r++;
      return e.first ? function (e, t, n) {
        while (e = e[u]) {
          if (1 === e.nodeType || f) return s(e, t, n);
        }

        return !1;
      } : function (e, t, n) {
        var r,
            i,
            o,
            a = [k, p];

        if (n) {
          while (e = e[u]) {
            if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
          }
        } else while (e = e[u]) {
          if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;else {
            if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
            if ((i[c] = a)[2] = s(e, t, n)) return !0;
          }
        }

        return !1;
      };
    }

    function we(i) {
      return 1 < i.length ? function (e, t, n) {
        var r = i.length;

        while (r--) {
          if (!i[r](e, t, n)) return !1;
        }

        return !0;
      } : i[0];
    }

    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }

      return a;
    }

    function Ce(d, h, g, v, y, e) {
      return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function (e, t, n, r) {
        var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c = e || function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            se(e, t[r], n);
          }

          return n;
        }(h || "*", n.nodeType ? [n] : n, []),
            f = !d || !e && h ? c : Te(c, s, d, n, r),
            p = g ? y || (e ? d : l || v) ? [] : t : f;

        if (g && g(f, p, n, r), v) {
          i = Te(p, u), v(i, [], n, r), o = i.length;

          while (o--) {
            (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
        }

        if (e) {
          if (y || d) {
            if (y) {
              i = [], o = p.length;

              while (o--) {
                (a = p[o]) && i.push(f[o] = a);
              }

              y(null, p = [], i, r);
            }

            o = p.length;

            while (o--) {
              (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a));
            }
          }
        } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p);
      });
    }

    function Ee(e) {
      for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) {
        return e === i;
      }, a, !0), l = be(function (e) {
        return -1 < P(i, e);
      }, a, !0), c = [function (e, t, n) {
        var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
        return i = null, r;
      }]; s < r; s++) {
        if (t = b.relative[e[s].type]) c = [be(we(c), t)];else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
            for (n = ++s; n < r; n++) {
              if (b.relative[e[n].type]) break;
            }

            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
              value: " " === e[s - 2].type ? "*" : ""
            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e));
          }

          c.push(t);
        }
      }

      return we(c);
    }

    return me.prototype = b.filters = b.pseudos, b.setFilters = new me(), h = se.tokenize = function (e, t) {
      var n,
          r,
          i,
          o,
          a,
          s,
          u,
          l = x[e + " "];
      if (l) return t ? 0 : l.slice(0);
      a = e, s = [], u = b.preFilter;

      while (a) {
        for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace($, " ")
        }), a = a.slice(n.length)), b.filter) {
          !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
            value: n,
            type: o,
            matches: r
          }), a = a.slice(n.length));
        }

        if (!n) break;
      }

      return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
    }, f = se.compile = function (e, t) {
      var n,
          v,
          y,
          m,
          x,
          r,
          i = [],
          o = [],
          a = A[e + " "];

      if (!a) {
        t || (t = h(e)), n = t.length;

        while (n--) {
          (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
        }

        (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function r(e, t, n, _r, i) {
          var o,
              a,
              s,
              u = 0,
              l = "0",
              c = e && [],
              f = [],
              p = w,
              d = e || x && b.find.TAG("*", i),
              h = k += null == p ? 1 : Math.random() || .1,
              g = d.length;

          for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
            if (x && o) {
              a = 0, t || o.ownerDocument == C || (T(o), n = !E);

              while (s = v[a++]) {
                if (s(o, t || C, n)) {
                  _r.push(o);

                  break;
                }
              }

              i && (k = h);
            }

            m && ((o = !s && o) && u--, e && c.push(o));
          }

          if (u += l, m && l !== u) {
            a = 0;

            while (s = y[a++]) {
              s(c, f, t, n);
            }

            if (e) {
              if (0 < u) while (l--) {
                c[l] || f[l] || (f[l] = q.call(_r));
              }
              f = Te(f);
            }

            H.apply(_r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(_r);
          }

          return i && (k = h, w = p), c;
        }, m ? le(r) : r))).selector = e;
      }

      return a;
    }, g = se.select = function (e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l = "function" == typeof e && e,
          c = !r && h(e = l.selector || e);

      if (n = n || [], 1 === c.length) {
        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length);
        }

        i = G.needsContext.test(e) ? 0 : o.length;

        while (i--) {
          if (a = o[i], b.relative[s = a.type]) break;

          if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
            if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
            break;
          }
        }
      }

      return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
    }, d.sortStable = S.split("").sort(j).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) {
      return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
    }), ce(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || fe("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), d.attributes && ce(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || fe("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ce(function (e) {
      return null == e.getAttribute("disabled");
    }) || fe(R, function (e, t, n) {
      var r;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), se;
  }(C);

  S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;

  var h = function h(e, t, n) {
    var r = [],
        i = void 0 !== n;

    while ((e = e[t]) && 9 !== e.nodeType) {
      if (1 === e.nodeType) {
        if (i && S(e).is(n)) break;
        r.push(e);
      }
    }

    return r;
  },
      T = function T(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      k = S.expr.match.needsContext;

  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }

  var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function j(e, n, r) {
    return m(n) ? S.grep(e, function (e, t) {
      return !!n.call(e, t, e) !== r;
    }) : n.nodeType ? S.grep(e, function (e) {
      return e === n !== r;
    }) : "string" != typeof n ? S.grep(e, function (e) {
      return -1 < i.call(n, e) !== r;
    }) : S.filter(n, e, r);
  }

  S.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, S.fn.extend({
    find: function find(e) {
      var t,
          n,
          r = this.length,
          i = this;
      if ("string" != typeof e) return this.pushStack(S(e).filter(function () {
        for (t = 0; t < r; t++) {
          if (S.contains(i[t], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), t = 0; t < r; t++) {
        S.find(e, i[t], n);
      }

      return 1 < r ? S.uniqueSort(n) : n;
    },
    filter: function filter(e) {
      return this.pushStack(j(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(j(this, e || [], !0));
    },
    is: function is(e) {
      return !!j(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length;
    }
  });
  var D,
      q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (S.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;

    if (n = n || D, "string" == typeof e) {
      if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (r[1]) {
        if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t)) for (r in t) {
          m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        }
        return this;
      }

      return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }

    return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
  }).prototype = S.fn, D = S(E);
  var L = /^(?:parents|prev(?:Until|All))/,
      H = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function O(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {
      ;
    }

    return e;
  }

  S.fn.extend({
    has: function has(e) {
      var t = S(e, this),
          n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (S.contains(this, t[e])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          a = "string" != typeof e && S(e);
      if (!k.test(e)) for (; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
            o.push(n);
            break;
          }
        }
      }
      return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), S.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return h(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return h(e, "parentNode", n);
    },
    next: function next(e) {
      return O(e, "nextSibling");
    },
    prev: function prev(e) {
      return O(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return h(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return h(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return h(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return h(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return T((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return T(e.firstChild);
    },
    contents: function contents(e) {
      return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
    }
  }, function (r, i) {
    S.fn[r] = function (e, t) {
      var n = S.map(this, i, e);
      return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n);
    };
  });
  var P = /[^\x20\t\r\n\f]+/g;

  function R(e) {
    return e;
  }

  function M(e) {
    throw e;
  }

  function I(e, t, n, r) {
    var i;

    try {
      e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }

  S.Callbacks = function (r) {
    var e, n;
    r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function (e, t) {
      n[t] = !0;
    }), n) : S.extend({}, r);

    var i,
        t,
        o,
        a,
        s = [],
        u = [],
        l = -1,
        c = function c() {
      for (a = a || r.once, o = i = !0; u.length; l = -1) {
        t = u.shift();

        while (++l < s.length) {
          !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1);
        }
      }

      r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
    },
        f = {
      add: function add() {
        return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
          S.each(e, function (e, t) {
            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t);
          });
        }(arguments), t && !i && c()), this;
      },
      remove: function remove() {
        return S.each(arguments, function (e, t) {
          var n;

          while (-1 < (n = S.inArray(t, s, n))) {
            s.splice(n, 1), n <= l && l--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? -1 < S.inArray(e, s) : 0 < s.length;
      },
      empty: function empty() {
        return s && (s = []), this;
      },
      disable: function disable() {
        return a = u = [], s = t = "", this;
      },
      disabled: function disabled() {
        return !s;
      },
      lock: function lock() {
        return a = u = [], t || i || (s = t = ""), this;
      },
      locked: function locked() {
        return !!a;
      },
      fireWith: function fireWith(e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this;
      },
      fire: function fire() {
        return f.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!o;
      }
    };

    return f;
  }, S.extend({
    Deferred: function Deferred(e) {
      var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          a = {
        state: function state() {
          return i;
        },
        always: function always() {
          return s.done(arguments).fail(arguments), this;
        },
        "catch": function _catch(e) {
          return a.then(null, e);
        },
        pipe: function pipe() {
          var i = arguments;
          return S.Deferred(function (r) {
            S.each(o, function (e, t) {
              var n = m(i[t[4]]) && i[t[4]];
              s[t[1]](function () {
                var e = n && n.apply(this, arguments);
                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
              });
            }), i = null;
          }).promise();
        },
        then: function then(t, n, r) {
          var u = 0;

          function l(i, o, a, s) {
            return function () {
              var n = this,
                  r = arguments,
                  e = function e() {
                var e, t;

                if (!(i < u)) {
                  if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                  t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r));
                }
              },
                  t = s ? e : function () {
                try {
                  e();
                } catch (e) {
                  S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r));
                }
              };

              i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t));
            };
          }

          return S.Deferred(function (e) {
            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M));
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? S.extend(e, a) : a;
        }
      },
          s = {};
      return S.each(o, function (e, t) {
        var n = t[2],
            r = t[5];
        a[t[1]] = n.add, r && n.add(function () {
          i = r;
        }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
          return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
        }, s[t[0] + "With"] = n.fireWith;
      }), a.promise(s), e && e.call(s, s), s;
    },
    when: function when(e) {
      var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = S.Deferred(),
          a = function a(t) {
        return function (e) {
          r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i);
        };
      };

      if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();

      while (t--) {
        I(i[t], a(t), o.reject);
      }

      return o.promise();
    }
  });
  var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  S.Deferred.exceptionHook = function (e, t) {
    C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }, S.readyException = function (e) {
    C.setTimeout(function () {
      throw e;
    });
  };
  var F = S.Deferred();

  function B() {
    E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready();
  }

  S.fn.ready = function (e) {
    return F.then(e)["catch"](function (e) {
      S.readyException(e);
    }), this;
  }, S.extend({
    isReady: !1,
    readyWait: 1,
    ready: function ready(e) {
      (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S]);
    }
  }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));

  var $ = function $(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;
    if ("object" === w(n)) for (s in i = !0, n) {
      $(e, t, s, n[s], !0, o, a);
    } else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(S(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      _ = /^-ms-/,
      z = /-([a-z])/g;

  function U(e, t) {
    return t.toUpperCase();
  }

  function X(e) {
    return e.replace(_, "ms-").replace(z, U);
  }

  var V = function V(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };

  function G() {
    this.expando = S.expando + G.uid++;
  }

  G.uid = 1, G.prototype = {
    cache: function cache(e) {
      var t = e[this.expando];
      return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function set(e, t, n) {
      var r,
          i = this.cache(e);
      if ("string" == typeof t) i[X(t)] = n;else for (r in t) {
        i[X(r)] = t[r];
      }
      return i;
    },
    get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)];
    },
    access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function remove(e, t) {
      var n,
          r = e[this.expando];

      if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;

          while (n--) {
            delete r[t[n]];
          }
        }

        (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function hasData(e) {
      var t = e[this.expando];
      return void 0 !== t && !S.isEmptyObject(t);
    }
  };
  var Y = new G(),
      Q = new G(),
      J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      K = /[A-Z]/g;

  function Z(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i);
      } catch (e) {}

      Q.set(e, t, n);
    } else n = void 0;
    return n;
  }

  S.extend({
    hasData: function hasData(e) {
      return Q.hasData(e) || Y.hasData(e);
    },
    data: function data(e, t, n) {
      return Q.access(e, t, n);
    },
    removeData: function removeData(e, t) {
      Q.remove(e, t);
    },
    _data: function _data(e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function _removeData(e, t) {
      Y.remove(e, t);
    }
  }), S.fn.extend({
    data: function data(n, e) {
      var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;

      if (void 0 === n) {
        if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
          t = a.length;

          while (t--) {
            a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
          }

          Y.set(o, "hasDataAttrs", !0);
        }

        return i;
      }

      return "object" == typeof n ? this.each(function () {
        Q.set(this, n);
      }) : $(this, function (e) {
        var t;
        if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
        this.each(function () {
          Q.set(this, n, e);
        });
      }, null, e, 1 < arguments.length, null, !0);
    },
    removeData: function removeData(e) {
      return this.each(function () {
        Q.remove(this, e);
      });
    }
  }), S.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = S.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = S._queueHooks(e, t);

      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        S.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return Y.get(e, n) || Y.access(e, n, {
        empty: S.Callbacks("once memory").add(function () {
          Y.remove(e, [t + "queue", n]);
        })
      });
    }
  }), S.fn.extend({
    queue: function queue(t, n) {
      var e = 2;
      return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function () {
        var e = S.queue(this, t, n);
        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        S.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          r = 1,
          i = S.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };

      "string" != typeof e && (t = e, e = void 0), e = e || "fx";

      while (a--) {
        (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }

      return s(), i.promise(t);
    }
  });

  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      re = E.documentElement,
      ie = function ie(e) {
    return S.contains(e.ownerDocument, e);
  },
      oe = {
    composed: !0
  };

  re.getRootNode && (ie = function ie(e) {
    return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
  });

  var ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display");
  };

  function se(e, t, n, r) {
    var i,
        o,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return S.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
        c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));

    if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;

      while (a--) {
        S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      }

      c *= 2, S.style(e, t, c + l), n = n || [];
    }

    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }

  var ue = {};

  function le(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) {
      (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
    }

    for (c = 0; c < f; c++) {
      null != l[c] && (e[c].style.display = l[c]);
    }

    return e;
  }

  S.fn.extend({
    show: function show() {
      return le(this, !0);
    },
    hide: function hide() {
      return le(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? S(this).show() : S(this).hide();
      });
    }
  });
  var ce,
      fe,
      pe = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      he = /^$|^module$|\/(?:java|ecma)script/i;
  ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function ve(e, t) {
    var n;
    return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n;
  }

  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
    }
  }

  ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
  var me = /<|&#?\w+;/;

  function xe(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
      if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
        a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];

        while (c--) {
          a = a.lastChild;
        }

        S.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
      } else p.push(t.createTextNode(o));
    }

    f.textContent = "", d = 0;

    while (o = p[d++]) {
      if (r && -1 < S.inArray(o, r)) i && i.push(o);else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
        c = 0;

        while (o = a[c++]) {
          he.test(o.type || "") && n.push(o);
        }
      }
    }

    return f;
  }

  var be = /^([^.]*)(?:\.(.+)|)/;

  function we() {
    return !0;
  }

  function Te() {
    return !1;
  }

  function Ce(e, t) {
    return e === function () {
      try {
        return E.activeElement;
      } catch (e) {}
    }() == ("focus" === t);
  }

  function Ee(e, t, n, r, i, o) {
    var a, s;

    if ("object" == typeof t) {
      for (s in "string" != typeof n && (r = r || n, n = void 0), t) {
        Ee(e, s, n, r, t[s], o);
      }

      return e;
    }

    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te;else if (!i) return e;
    return 1 === o && (a = i, (i = function i(e) {
      return S().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = S.guid++)), e.each(function () {
      S.event.add(this, t, i, r, n);
    });
  }

  function Se(e, i, o) {
    o ? (Y.set(e, i, !1), S.event.add(e, i, {
      namespace: !1,
      handler: function handler(e) {
        var t,
            n,
            r = Y.get(this, i);

        if (1 & e.isTrigger && this[i]) {
          if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation();else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value;
        } else r.length && (Y.set(this, i, {
          value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
        }), e.stopImmediatePropagation());
      }
    })) : void 0 === Y.get(e, i) && S.event.add(e, i, we);
  }

  S.event = {
    global: {},
    add: function add(t, e, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.get(t);

      if (V(t)) {
        n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) {
          return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
        }), l = (e = (e || "").match(P) || [""]).length;

        while (l--) {
          d = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
            type: d,
            origType: g,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && S.expr.match.needsContext.test(i),
            namespace: h.join(".")
          }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0);
        }
      }
    },
    remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.hasData(e) && Y.get(e);

      if (v && (u = v.events)) {
        l = (t = (t || "").match(P) || [""]).length;

        while (l--) {
          if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
            f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;

            while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }

            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d]);
          } else for (d in u) {
            S.event.remove(e, d + t[l], n, r, !0);
          }
        }

        S.isEmptyObject(u) && Y.remove(e, "handle events");
      }
    },
    dispatch: function dispatch(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s = new Array(arguments.length),
          u = S.event.fix(e),
          l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
          c = S.event.special[u.type] || {};

      for (s[0] = u, t = 1; t < arguments.length; t++) {
        s[t] = arguments[t];
      }

      if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
        a = S.event.handlers.call(this, u, l), t = 0;

        while ((i = a[t++]) && !u.isPropagationStopped()) {
          u.currentTarget = i.elem, n = 0;

          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) {
            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
          }
        }

        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a,
          s = [],
          u = t.delegateCount,
          l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
          for (o = [], a = {}, n = 0; n < u; n++) {
            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
          }

          o.length && s.push({
            elem: l,
            handlers: o
          });
        }
      }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function addProp(t, e) {
      Object.defineProperty(S.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        },
        set: function set(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function fix(e) {
      return e[S.expando] ? e : new S.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function setup(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click", we), !1;
        },
        trigger: function trigger(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0;
        },
        _default: function _default(e) {
          var t = e.target;
          return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, S.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, S.Event = function (e, t) {
    if (!(this instanceof S.Event)) return new S.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
  }, S.Event.prototype = {
    constructor: S.Event,
    isDefaultPrevented: Te,
    isPropagationStopped: Te,
    isImmediatePropagationStopped: Te,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, S.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    "char": !0,
    code: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: !0
  }, S.event.addProp), S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    S.event.special[e] = {
      setup: function setup() {
        return Se(this, e, Ce), !1;
      },
      trigger: function trigger() {
        return Se(this, e), !0;
      },
      _default: function _default() {
        return !0;
      },
      delegateType: t
    };
  }), S.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, i) {
    S.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function handle(e) {
        var t,
            n = e.relatedTarget,
            r = e.handleObj;
        return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t;
      }
    };
  }), S.fn.extend({
    on: function on(e, t, n, r) {
      return Ee(this, e, t, n, r);
    },
    one: function one(e, t, n, r) {
      return Ee(this, e, t, n, r, 1);
    },
    off: function off(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;

      if ("object" == typeof e) {
        for (i in e) {
          this.off(i, t, e[i]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each(function () {
        S.event.remove(this, e, n, t);
      });
    }
  });
  var ke = /<script|<style|<link/i,
      Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function je(e, t) {
    return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e;
  }

  function De(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }

  function qe(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }

  function Le(e, t) {
    var n, r, i, o, a, s;

    if (1 === t.nodeType) {
      if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) {
        for (n = 0, r = s[i].length; n < r; n++) {
          S.event.add(t, i, s[i][n]);
        }
      }
      Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a));
    }
  }

  function He(n, r, i, o) {
    r = g(r);
    var e,
        t,
        a,
        s,
        u,
        l,
        c = 0,
        f = n.length,
        p = f - 1,
        d = r[0],
        h = m(d);
    if (h || 1 < f && "string" == typeof d && !y.checkClone && Ae.test(d)) return n.each(function (e) {
      var t = n.eq(e);
      h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o);
    });

    if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
      for (s = (a = S.map(ve(e, "script"), De)).length; c < f; c++) {
        u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
      }

      if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++) {
        u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
          nonce: u.nonce || u.getAttribute("nonce")
        }, l) : b(u.textContent.replace(Ne, ""), u, l));
      }
    }

    return n;
  }

  function Oe(e, t, n) {
    for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    }

    return e;
  }

  S.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e;
    },
    clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = e.cloneNode(!0),
          f = ie(e);
      if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) {
        s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
      }
      if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) {
        Le(o[r], a[r]);
      } else Le(e, c);
      return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c;
    },
    cleanData: function cleanData(e) {
      for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (V(n)) {
          if (t = n[Y.expando]) {
            if (t.events) for (r in t.events) {
              i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
            }
            n[Y.expando] = void 0;
          }

          n[Q.expando] && (n[Q.expando] = void 0);
        }
      }
    }
  }), S.fn.extend({
    detach: function detach(e) {
      return Oe(this, e, !0);
    },
    remove: function remove(e) {
      return Oe(this, e);
    },
    text: function text(e) {
      return $(this, function (e) {
        return void 0 === e ? S.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function append() {
      return He(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e);
      });
    },
    prepend: function prepend() {
      return He(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = je(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return He(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return He(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return S.clone(this, e, t);
      });
    },
    html: function html(e) {
      return $(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;

        if ("string" == typeof e && !ke.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = S.htmlPrefilter(e);

          try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var n = [];
      return He(this, arguments, function (e) {
        var t = this.parentNode;
        S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this));
      }, n);
    }
  }), S.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, a) {
    S.fn[e] = function (e) {
      for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) {
        t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
      }

      return this.pushStack(n);
    };
  });

  var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Re = function Re(e) {
    var t = e.ownerDocument.defaultView;
    return t && t.opener || (t = C), t.getComputedStyle(e);
  },
      Me = function Me(e, t, n) {
    var r,
        i,
        o = {};

    for (i in t) {
      o[i] = e.style[i], e.style[i] = t[i];
    }

    for (i in r = n.call(e), t) {
      e.style[i] = o[i];
    }

    return r;
  },
      Ie = new RegExp(ne.join("|"), "i");

  function We(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Pe.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
  }

  function Fe(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  !function () {
    function e() {
      if (l) {
        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
        var e = C.getComputedStyle(l);
        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null;
      }
    }

    function t(e) {
      return Math.round(parseFloat(e));
    }

    var n,
        r,
        i,
        o,
        a,
        s,
        u = E.createElement("div"),
        l = E.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
      boxSizingReliable: function boxSizingReliable() {
        return e(), r;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        return e(), o;
      },
      pixelPosition: function pixelPosition() {
        return e(), n;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return e(), s;
      },
      scrollboxSize: function scrollboxSize() {
        return e(), i;
      },
      reliableTrDimensions: function reliableTrDimensions() {
        var e, t, n, r;
        return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, re.removeChild(e)), a;
      }
    }));
  }();
  var Be = ["Webkit", "Moz", "ms"],
      $e = E.createElement("div").style,
      _e = {};

  function ze(e) {
    var t = S.cssProps[e] || _e[e];
    return t || (e in $e ? e : _e[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1),
          n = Be.length;

      while (n--) {
        if ((e = Be[n] + t) in $e) return e;
      }
    }(e) || e);
  }

  var Ue = /^(none|table(?!-c[ea]).+)/,
      Xe = /^--/,
      Ve = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Ge = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function Ye(e, t, n) {
    var r = te.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }

  function Qe(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        u = 0;
    if (n === (r ? "border" : "content")) return 0;

    for (; a < 4; a += 2) {
      "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
    }

    return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u;
  }

  function Je(e, t, n) {
    var r = Re(e),
        i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
        o = i,
        a = We(e, t, r),
        s = "offset" + t[0].toUpperCase() + t.slice(1);

    if (Pe.test(a)) {
      if (!n) return a;
      a = "auto";
    }

    return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Qe(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
  }

  function Ke(e, t, n, r, i) {
    return new Ke.prototype.init(e, t, n, r, i);
  }

  S.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = We(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = X(t),
            u = Xe.test(t),
            l = e.style;
        if (u || (t = ze(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    },
    css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = X(t);
      return Xe.test(t) || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    }
  }), S.each(["height", "width"], function (e, u) {
    S.cssHooks[u] = {
      get: function get(e, t, n) {
        if (t) return !Ue.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Me(e, Ve, function () {
          return Je(e, u, n);
        });
      },
      set: function set(e, t, n) {
        var r,
            i = Re(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
            s = n ? Qe(e, u, n, a, i) : 0;
        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Qe(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Ye(0, t, s);
      }
    };
  }), S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), S.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (i, o) {
    S.cssHooks[i + o] = {
      expand: function expand(e) {
        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) {
          n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
        }

        return n;
      }
    }, "margin" !== i && (S.cssHooks[i + o].set = Ye);
  }), S.fn.extend({
    css: function css(e, t) {
      return $(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;

        if (Array.isArray(t)) {
          for (r = Re(e), i = t.length; a < i; a++) {
            o[t[a]] = S.css(e, t[a], !1, r);
          }

          return o;
        }

        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((S.Tween = Ke).prototype = {
    constructor: Ke,
    init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = Ke.propHooks[this.prop];
      return e && e.get ? e.get(this) : Ke.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = Ke.propHooks[this.prop];
      return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this;
    }
  }).init.prototype = Ke.prototype, (Ke.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = Ke.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, S.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, S.fx = Ke.prototype.init, S.fx.step = {};
  var Ze,
      et,
      tt,
      nt,
      rt = /^(?:toggle|show|hide)$/,
      it = /queueHooks$/;

  function ot() {
    et && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(ot) : C.setTimeout(ot, S.fx.interval), S.fx.tick());
  }

  function at() {
    return C.setTimeout(function () {
      Ze = void 0;
    }), Ze = Date.now();
  }

  function st(e, t) {
    var n,
        r = 0,
        i = {
      height: e
    };

    for (t = t ? 1 : 0; r < 4; r += 2 - t) {
      i["margin" + (n = ne[r])] = i["padding" + n] = e;
    }

    return t && (i.opacity = i.width = e), i;
  }

  function ut(e, t, n) {
    for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }

  function lt(o, e, t) {
    var n,
        a,
        r = 0,
        i = lt.prefilters.length,
        s = S.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (a) return !1;

      for (var e = Ze || at(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) {
        l.tweens[r].run(n);
      }

      return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1);
    },
        l = s.promise({
      elem: o,
      props: S.extend({}, e),
      opts: S.extend(!0, {
        specialEasing: {},
        easing: S.easing._default
      }, t),
      originalProperties: e,
      originalOptions: t,
      startTime: Ze || at(),
      duration: t.duration,
      tweens: [],
      createTween: function createTween(e, t) {
        var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
        return l.tweens.push(n), n;
      },
      stop: function stop(e) {
        var t = 0,
            n = e ? l.tweens.length : 0;
        if (a) return this;

        for (a = !0; t < n; t++) {
          l.tweens[t].run(1);
        }

        return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this;
      }
    }),
        c = l.props;

    for (!function (e, t) {
      var n, r, i, o, a;

      for (n in e) {
        if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && ("expand" in a)) for (n in o = a.expand(o), delete e[r], o) {
          (n in e) || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
      }
    }(c, l.opts.specialEasing); r < i; r++) {
      if (n = lt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
    }

    return S.map(c, ut, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
      elem: o,
      anim: l,
      queue: l.opts.queue
    })), l;
  }

  S.Animation = S.extend(lt, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return se(n.elem, e, te.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      m(e) ? (t = e, e = ["*"]) : e = e.match(P);

      for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], lt.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && ae(e),
          v = Y.get(e, "fxshow");

      for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, p.always(function () {
        p.always(function () {
          a.unqueued--, S.queue(e, "fx").length || a.empty.fire();
        });
      })), t) {
        if (i = t[r], rt.test(i)) {
          if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
            if ("show" !== i || !v || void 0 === v[r]) continue;
            g = !0;
          }

          d[r] = v && v[r] || S.style(e, r);
        }
      }

      if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1, d) {
        u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
          display: l
        }), o && (v.hidden = !g), g && le([e], !0), p.done(function () {
          for (r in g || le([e]), Y.remove(e, "fxshow"), d) {
            S.style(e, r, d[r]);
          }
        })), u = ut(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? lt.prefilters.unshift(e) : lt.prefilters.push(e);
    }
  }), S.speed = function (e, t, n) {
    var r = e && "object" == typeof e ? S.extend({}, e) : {
      complete: n || !n && t || m(e) && e,
      duration: e,
      easing: n && t || t && !m(t) && t
    };
    return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
    }, r;
  }, S.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(ae).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function animate(t, e, n, r) {
      var i = S.isEmptyObject(t),
          o = S.speed(e, n, r),
          a = function a() {
        var e = lt(this, S.extend({}, t), o);
        (i || Y.get(this, "finish")) && e.stop(!0);
      };

      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function stop(i, e, o) {
      var a = function a(e) {
        var t = e.stop;
        delete e.stop, t(o);
      };

      return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () {
        var e = !0,
            t = null != i && i + "queueHooks",
            n = S.timers,
            r = Y.get(this);
        if (t) r[t] && r[t].stop && a(r[t]);else for (t in r) {
          r[t] && r[t].stop && it.test(t) && a(r[t]);
        }

        for (t = n.length; t--;) {
          n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
        }

        !e && o || S.dequeue(this, i);
      });
    },
    finish: function finish(a) {
      return !1 !== a && (a = a || "fx"), this.each(function () {
        var e,
            t = Y.get(this),
            n = t[a + "queue"],
            r = t[a + "queueHooks"],
            i = S.timers,
            o = n ? n.length : 0;

        for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) {
          i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
        }

        for (e = 0; e < o; e++) {
          n[e] && n[e].finish && n[e].finish.call(this);
        }

        delete t.finish;
      });
    }
  }), S.each(["toggle", "show", "hide"], function (e, r) {
    var i = S.fn[r];

    S.fn[r] = function (e, t, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(st(r, !0), e, t, n);
    };
  }), S.each({
    slideDown: st("show"),
    slideUp: st("hide"),
    slideToggle: st("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, r) {
    S.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n);
    };
  }), S.timers = [], S.fx.tick = function () {
    var e,
        t = 0,
        n = S.timers;

    for (Ze = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }

    n.length || S.fx.stop(), Ze = void 0;
  }, S.fx.timer = function (e) {
    S.timers.push(e), S.fx.start();
  }, S.fx.interval = 13, S.fx.start = function () {
    et || (et = !0, ot());
  }, S.fx.stop = function () {
    et = null;
  }, S.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, S.fn.delay = function (r, e) {
    return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
      var n = C.setTimeout(e, r);

      t.stop = function () {
        C.clearTimeout(n);
      };
    });
  }, tt = E.createElement("input"), nt = E.createElement("select").appendChild(E.createElement("option")), tt.type = "checkbox", y.checkOn = "" !== tt.value, y.optSelected = nt.selected, (tt = E.createElement("input")).value = "t", tt.type = "radio", y.radioValue = "t" === tt.value;
  var ct,
      ft = S.expr.attrHandle;
  S.fn.extend({
    attr: function attr(e, t) {
      return $(this, S.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        S.removeAttr(this, e);
      });
    }
  }), S.extend({
    attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!y.radioValue && "radio" === t && A(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          r = 0,
          i = t && t.match(P);
      if (i && 1 === e.nodeType) while (n = i[r++]) {
        e.removeAttribute(n);
      }
    }
  }), ct = {
    set: function set(e, t, n) {
      return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var a = ft[t] || S.find.attr;

    ft[t] = function (e, t, n) {
      var r,
          i,
          o = t.toLowerCase();
      return n || (i = ft[o], ft[o] = r, r = null != a(e, t, n) ? o : null, ft[o] = i), r;
    };
  });
  var pt = /^(?:input|select|textarea|button)$/i,
      dt = /^(?:a|area)$/i;

  function ht(e) {
    return (e.match(P) || []).join(" ");
  }

  function gt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }

  function vt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [];
  }

  S.fn.extend({
    prop: function prop(e, t) {
      return $(this, S.prop, e, t, 1 < arguments.length);
    },
    removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[S.propFix[e] || e];
      });
    }
  }), S.extend({
    prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = S.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), y.optSelected || (S.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    S.propFix[this.toLowerCase()] = this;
  }), S.fn.extend({
    addClass: function addClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).addClass(t.call(this, e, gt(this)));
      });
      if ((e = vt(t)).length) while (n = this[u++]) {
        if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }

          i !== (s = ht(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).removeClass(t.call(this, e, gt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ((e = vt(t)).length) while (n = this[u++]) {
        if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            while (-1 < r.indexOf(" " + o + " ")) {
              r = r.replace(" " + o + " ", " ");
            }
          }

          i !== (s = ht(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(i, t) {
      var o = typeof i,
          a = "string" === o || Array.isArray(i);
      return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) {
        S(this).toggleClass(i.call(this, e, gt(this), t), t);
      }) : this.each(function () {
        var e, t, n, r;

        if (a) {
          t = 0, n = S(this), r = vt(i);

          while (e = r[t++]) {
            n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
          }
        } else void 0 !== i && "boolean" !== o || ((e = gt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;
      t = " " + e + " ";

      while (n = this[r++]) {
        if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0;
      }

      return !1;
    }
  });
  var yt = /\r/g;
  S.fn.extend({
    val: function val(n) {
      var r,
          e,
          i,
          t = this[0];
      return arguments.length ? (i = m(n), this.each(function (e) {
        var t;
        1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function (e) {
          return null == e ? "" : e + "";
        })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
      })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0;
    }
  }), S.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = S.find.attr(e, "value");
          return null != t ? t : ht(S.text(e));
        }
      },
      select: {
        get: function get(e) {
          var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;

          for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
              if (t = S(n).val(), a) return t;
              s.push(t);
            }
          }

          return s;
        },
        set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = S.makeArray(t),
              a = i.length;

          while (a--) {
            ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
          }

          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), S.each(["radio", "checkbox"], function () {
    S.valHooks[this] = {
      set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t);
      }
    }, y.checkOn || (S.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), y.focusin = "onfocusin" in C;

  var mt = /^(?:focusinfocus|focusoutblur)$/,
      xt = function xt(e) {
    e.stopPropagation();
  };

  S.extend(S.event, {
    trigger: function trigger(e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p = [n || E],
          d = v.call(e, "type") ? e.type : e,
          h = v.call(e, "namespace") ? e.namespace.split(".") : [];

      if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
        if (!r && !c.noBubble && !x(n)) {
          for (s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) {
            p.push(o), a = o;
          }

          a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C);
        }

        i = 0;

        while ((o = p[i++]) && !e.isPropagationStopped()) {
          f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
        }

        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, xt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, xt), S.event.triggered = void 0, a && (n[u] = a)), e.result;
      }
    },
    simulate: function simulate(e, t, n) {
      var r = S.extend(new S.Event(), n, {
        type: e,
        isSimulated: !0
      });
      S.event.trigger(r, null, t);
    }
  }), S.fn.extend({
    trigger: function trigger(e, t) {
      return this.each(function () {
        S.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return S.event.trigger(e, t, n, !0);
    }
  }), y.focusin || S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (n, r) {
    var i = function i(e) {
      S.event.simulate(r, e.target, S.event.fix(e));
    };

    S.event.special[r] = {
      setup: function setup() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r);
        t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
      },
      teardown: function teardown() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r) - 1;
        t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r));
      }
    };
  });
  var bt = C.location,
      wt = {
    guid: Date.now()
  },
      Tt = /\?/;

  S.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e) return null;

    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {}

    return n = t && t.getElementsByTagName("parsererror")[0], t && !n || S.error("Invalid XML: " + (n ? S.map(n.childNodes, function (e) {
      return e.textContent;
    }).join("\n") : e)), t;
  };

  var Ct = /\[\]$/,
      Et = /\r?\n/g,
      St = /^(?:submit|button|image|reset|file)$/i,
      kt = /^(?:input|select|textarea|keygen)/i;

  function At(n, e, r, i) {
    var t;
    if (Array.isArray(e)) S.each(e, function (e, t) {
      r || Ct.test(n) ? i(n, t) : At(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i);
    });else if (r || "object" !== w(e)) i(n, e);else for (t in e) {
      At(n + "[" + t + "]", e[t], r, i);
    }
  }

  S.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      var n = m(t) ? t() : t;
      r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      At(n, e[n], t, i);
    }
    return r.join("&");
  }, S.fn.extend({
    serialize: function serialize() {
      return S.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = S.prop(this, "elements");
        return e ? S.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e));
      }).map(function (e, t) {
        var n = S(this).val();
        return null == n ? null : Array.isArray(n) ? S.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(Et, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(Et, "\r\n")
        };
      }).get();
    }
  });
  var Nt = /%20/g,
      jt = /#.*$/,
      Dt = /([?&])_=[^&]*/,
      qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Lt = /^(?:GET|HEAD)$/,
      Ht = /^\/\//,
      Ot = {},
      Pt = {},
      Rt = "*/".concat("*"),
      Mt = E.createElement("a");

  function It(o) {
    return function (e, t) {
      "string" != typeof e && (t = e, e = "*");
      var n,
          r = 0,
          i = e.toLowerCase().match(P) || [];
      if (m(t)) while (n = i[r++]) {
        "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
      }
    };
  }

  function Wt(t, i, o, a) {
    var s = {},
        u = t === Pt;

    function l(e) {
      var r;
      return s[e] = !0, S.each(t[e] || [], function (e, t) {
        var n = t(i, o, a);
        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1);
      }), r;
    }

    return l(i.dataTypes[0]) || !s["*"] && l("*");
  }

  function Ft(e, t) {
    var n,
        r,
        i = S.ajaxSettings.flatOptions || {};

    for (n in t) {
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }

    return r && S.extend(!0, e, r), e;
  }

  Mt.href = bt.href, S.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: bt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Rt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": S.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e);
    },
    ajaxPrefilter: It(Ot),
    ajaxTransport: It(Pt),
    ajax: function ajax(e, t) {
      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = S.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
          x = S.Deferred(),
          b = S.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (h) {
            if (!n) {
              n = {};

              while (t = qt.exec(p)) {
                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
              }
            }

            t = n[e.toLowerCase() + " "];
          }

          return null == t ? null : t.join(", ");
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return h ? p : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return null == h && (v.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (h) T.always(e[T.status]);else for (t in e) {
            w[t] = [w[t], e[t]];
          }
          return this;
        },
        abort: function abort(e) {
          var t = e || u;
          return c && c.abort(t), l(0, t), this;
        }
      };

      if (x.promise(T), v.url = ((e || v.url || bt.href) + "").replace(Ht, bt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
        r = E.createElement("a");

        try {
          r.href = v.url, r.href = r.href, v.crossDomain = Mt.protocol + "//" + Mt.host != r.protocol + "//" + r.host;
        } catch (e) {
          v.crossDomain = !0;
        }
      }

      if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Wt(Ot, v, t, T), h) return T;

      for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Lt.test(v.type), f = v.url.replace(jt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Nt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Tt.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Dt, "$1"), o = (Tt.test(f) ? "&" : "?") + "_=" + wt.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : v.accepts["*"]), v.headers) {
        T.setRequestHeader(i, v.headers[i]);
      }

      if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();

      if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Wt(Pt, v, t, T)) {
        if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
        v.async && 0 < v.timeout && (d = C.setTimeout(function () {
          T.abort("timeout");
        }, v.timeout));

        try {
          h = !1, c.send(a, l);
        } catch (e) {
          if (h) throw e;
          l(-1, e);
        }
      } else l(-1, "No Transport");

      function l(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = t;
        h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
          var r,
              i,
              o,
              a,
              s = e.contents,
              u = e.dataTypes;

          while ("*" === u[0]) {
            u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (r) for (i in s) {
            if (s[i] && s[i].test(r)) {
              u.unshift(i);
              break;
            }
          }
          if (u[0] in n) o = u[0];else {
            for (i in n) {
              if (!u[0] || e.converters[i + " " + u[0]]) {
                o = i;
                break;
              }

              a || (a = i);
            }

            o = o || a;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && S.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function () {}), s = function (e, t, n, r) {
          var i,
              o,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
          }
          o = c.shift();

          while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
              if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                  !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + u + " to " + o
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(e, t, n) {
      return S.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return S.get(e, void 0, t, "script");
    }
  }), S.each(["get", "post"], function (e, i) {
    S[i] = function (e, t, n, r) {
      return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, S.isPlainObject(e) && e));
    };
  }), S.ajaxPrefilter(function (e) {
    var t;

    for (t in e.headers) {
      "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
    }
  }), S._evalUrl = function (e, t, n) {
    return S.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(e) {
        S.globalEval(e, t, n);
      }
    });
  }, S.fn.extend({
    wrapAll: function wrapAll(e) {
      var t;
      return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;

        while (e.firstElementChild) {
          e = e.firstElementChild;
        }

        return e;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(n) {
      return m(n) ? this.each(function (e) {
        S(this).wrapInner(n.call(this, e));
      }) : this.each(function () {
        var e = S(this),
            t = e.contents();
        t.length ? t.wrapAll(n) : e.append(n);
      });
    },
    wrap: function wrap(t) {
      var n = m(t);
      return this.each(function (e) {
        S(this).wrapAll(n ? t.call(this, e) : t);
      });
    },
    unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        S(this).replaceWith(this.childNodes);
      }), this;
    }
  }), S.expr.pseudos.hidden = function (e) {
    return !S.expr.pseudos.visible(e);
  }, S.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, S.ajaxSettings.xhr = function () {
    try {
      return new C.XMLHttpRequest();
    } catch (e) {}
  };
  var Bt = {
    0: 200,
    1223: 204
  },
      $t = S.ajaxSettings.xhr();
  y.cors = !!$t && "withCredentials" in $t, y.ajax = $t = !!$t, S.ajaxTransport(function (i) {
    var _o, a;

    if (y.cors || $t && !i.crossDomain) return {
      send: function send(e, t) {
        var n,
            r = i.xhr();
        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) {
          r[n] = i.xhrFields[n];
        }

        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) {
          r.setRequestHeader(n, e[n]);
        }

        _o = function o(e) {
          return function () {
            _o && (_o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Bt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
              binary: r.response
            } : {
              text: r.responseText
            }, r.getAllResponseHeaders()));
          };
        }, r.onload = _o(), a = r.onerror = r.ontimeout = _o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
          4 === r.readyState && C.setTimeout(function () {
            _o && a();
          });
        }, _o = _o("abort");

        try {
          r.send(i.hasContent && i.data || null);
        } catch (e) {
          if (_o) throw e;
        }
      },
      abort: function abort() {
        _o && _o();
      }
    };
  }), S.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), S.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return S.globalEval(e), e;
      }
    }
  }), S.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), S.ajaxTransport("script", function (n) {
    var r, _i;

    if (n.crossDomain || n.scriptAttrs) return {
      send: function send(e, t) {
        r = S("<script>").attr(n.scriptAttrs || {}).prop({
          charset: n.scriptCharset,
          src: n.url
        }).on("load error", _i = function i(e) {
          r.remove(), _i = null, e && t("error" === e.type ? 404 : 200, e.type);
        }), E.head.appendChild(r[0]);
      },
      abort: function abort() {
        _i && _i();
      }
    };
  });

  var _t,
      zt = [],
      Ut = /(=)\?(?=&|$)|\?\?/;

  S.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = zt.pop() || S.expando + "_" + wt.guid++;
      return this[e] = !0, e;
    }
  }), S.ajaxPrefilter("json jsonp", function (e, t, n) {
    var r,
        i,
        o,
        a = !1 !== e.jsonp && (Ut.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(e.data) && "data");
    if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ut, "$1" + r) : !1 !== e.jsonp && (e.url += (Tt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
      return o || S.error(r + " was not called"), o[0];
    }, e.dataTypes[0] = "json", i = C[r], C[r] = function () {
      o = arguments;
    }, n.always(function () {
      void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, zt.push(r)), o && m(i) && i(o[0]), o = i = void 0;
    }), "script";
  }), y.createHTMLDocument = ((_t = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === _t.childNodes.length), S.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
    var r, i, o;
  }, S.fn.load = function (e, t, n) {
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
    return -1 < s && (r = ht(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && S.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, S.expr.pseudos.animated = function (t) {
    return S.grep(S.timers, function (e) {
      return t === e.elem;
    }).length;
  }, S.offset = {
    setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l = S.css(e, "position"),
          c = S(e),
          f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f);
    }
  }, S.fn.extend({
    offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        S.offset.setOffset(this, t, e);
      });
      var e,
          n,
          r = this[0];
      return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
        top: e.top + n.pageYOffset,
        left: e.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            r = this[0],
            i = {
          top: 0,
          left: 0
        };
        if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;

          while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) {
            e = e.parentNode;
          }

          e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - i.top - S.css(r, "marginTop", !0),
          left: t.left - i.left - S.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent;

        while (e && "static" === S.css(e, "position")) {
          e = e.offsetParent;
        }

        return e || re;
      });
    }
  }), S.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, i) {
    var o = "pageYOffset" === i;

    S.fn[t] = function (e) {
      return $(this, function (e, t, n) {
        var r;
        if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
      }, t, e, arguments.length);
    };
  }), S.each(["top", "left"], function (e, n) {
    S.cssHooks[n] = Fe(y.pixelPosition, function (e, t) {
      if (t) return t = We(e, n), Pe.test(t) ? S(e).position()[n] + "px" : t;
    });
  }), S.each({
    Height: "height",
    Width: "width"
  }, function (a, s) {
    S.each({
      padding: "inner" + a,
      content: s,
      "": "outer" + a
    }, function (r, o) {
      S.fn[o] = function (e, t) {
        var n = arguments.length && (r || "boolean" != typeof e),
            i = r || (!0 === e || !0 === t ? "margin" : "border");
        return $(this, function (e, t, n) {
          var r;
          return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
        }, s, n ? e : void 0, n);
      };
    });
  }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    S.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), S.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
    S.fn[n] = function (e, t) {
      return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
    };
  });
  var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  S.proxy = function (e, t) {
    var n, r, i;
    if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function i() {
      return e.apply(t || this, r.concat(s.call(arguments)));
    }).guid = e.guid = e.guid || S.guid++, i;
  }, S.holdReady = function (e) {
    e ? S.readyWait++ : S.ready(!0);
  }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function (e) {
    var t = S.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, S.trim = function (e) {
    return null == e ? "" : (e + "").replace(Xt, "");
  },  true && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return S;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  var Vt = C.jQuery,
      Gt = C.$;
  return S.noConflict = function (e) {
    return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S;
  }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
});

/***/ }),

/***/ "./web_accessible_resources/plyr.min.js":
/*!**********************************************!*\
  !*** ./web_accessible_resources/plyr.min.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _excluded = ["premium", "referrerPolicy"];

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); _groups.set(_this, groups || _groups.get(re)); return _setPrototypeOf(_this, BabelRegExp.prototype); } _inherits(BabelRegExp, RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; if (typeof args[args.length - 1] !== "object") { args = [].slice.call(args); args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

"object" == typeof navigator && function (e, t) {
   true ? module.exports = t() : 0;
}(this, function () {
  "use strict";

  function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function t(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
    }
  }

  function i(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function s(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function n(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(Object(n), !0).forEach(function (t) {
        i(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  var a = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };

  function l(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }

  var o = function o(e) {
    return null != e ? e.constructor : null;
  },
      r = function r(e, t) {
    return !!(e && t && e instanceof t);
  },
      c = function c(e) {
    return null == e;
  },
      h = function h(e) {
    return o(e) === Object;
  },
      u = function u(e) {
    return o(e) === String;
  },
      d = function d(e) {
    return Array.isArray(e);
  },
      m = function m(e) {
    return r(e, NodeList);
  },
      p = u,
      g = d,
      f = m,
      b = function b(e) {
    return r(e, Element);
  },
      y = function y(e) {
    return r(e, Event);
  },
      v = function v(e) {
    return c(e) || (u(e) || d(e) || m(e)) && !e.length || h(e) && !Object.keys(e).length;
  };

  function w(e, t) {
    if (1 > t) {
      var i = function (e) {
        var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
      }(t);

      return parseFloat(e.toFixed(i));
    }

    return Math.round(e / t) * t;
  }

  var T = function () {
    function e(t, i) {
      (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      })(this, e), b(t) ? this.element = t : p(t) && (this.element = document.querySelector(t)), b(this.element) && v(this.element.rangeTouch) && (this.config = n({}, a, {}, i), this.init());
    }

    return function (e, i, s) {
      i && t(e.prototype, i), s && t(e, s);
    }(e, [{
      key: "init",
      value: function value() {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function value() {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function value(e) {
        var t = this,
            i = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[i](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function value(t) {
        if (!e.enabled || !y(t)) return null;
        var i,
            s = t.target,
            n = t.changedTouches[0],
            a = parseFloat(s.getAttribute("min")) || 0,
            l = parseFloat(s.getAttribute("max")) || 100,
            o = parseFloat(s.getAttribute("step")) || 1,
            r = s.getBoundingClientRect(),
            c = 100 / r.width * (this.config.thumbWidth / 2) / 100;
        return 0 > (i = 100 / r.width * (n.clientX - r.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + w(i / 100 * (l - a), o);
      }
    }, {
      key: "set",
      value: function value(t) {
        e.enabled && y(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) {
          if (e && t) {
            var i = new Event(t, {
              bubbles: !0
            });
            e.dispatchEvent(i);
          }
        }(t.target, "touchend" === t.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function value(t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            s = null;
        if (v(t) || p(t) ? s = Array.from(document.querySelectorAll(p(t) ? t : 'input[type="range"]')) : b(t) ? s = [t] : f(t) ? s = Array.from(t) : g(t) && (s = t.filter(b)), v(s)) return null;
        var o = n({}, a, {}, i);

        if (p(t) && o.watch) {
          var r = new MutationObserver(function (i) {
            Array.from(i).forEach(function (i) {
              Array.from(i.addedNodes).forEach(function (i) {
                b(i) && l(i, t) && new e(i, o);
              });
            });
          });
          r.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        }

        return s.map(function (t) {
          return new e(t, i);
        });
      }
    }, {
      key: "enabled",
      get: function get() {
        return "ontouchstart" in document.documentElement;
      }
    }]), e;
  }();

  var k = e => null != e ? e.constructor : null,
      C = (e, t) => Boolean(e && t && e instanceof t),
      A = e => null == e,
      S = e => k(e) === Object,
      E = e => k(e) === String,
      P = e => k(e) === Function,
      N = e => Array.isArray(e),
      x = e => C(e, NodeList),
      M = e => A(e) || (E(e) || N(e) || x(e)) && !e.length || S(e) && !Object.keys(e).length;

  var I = A,
      L = S,
      $ = e => k(e) === Number && !Number.isNaN(e),
      _ = E,
      O = e => k(e) === Boolean,
      j = P,
      q = N,
      D = x,
      H = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
      F = e => C(e, Event),
      R = e => C(e, KeyboardEvent),
      V = e => C(e, TextTrack) || !A(e) && E(e.kind),
      B = e => C(e, Promise) && P(e.then),
      U = e => {
    if (C(e, window.URL)) return !0;
    if (!E(e)) return !1;
    var t = e;
    e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));

    try {
      return !M(new URL(t).hostname);
    } catch (e) {
      return !1;
    }
  },
      W = M;

  var z = (() => {
    var e = document.createElement("span"),
        t = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    },
        i = Object.keys(t).find(t => void 0 !== e.style[t]);
    return !!_(i) && t[i];
  })();

  function K(e, t) {
    setTimeout(() => {
      try {
        e.hidden = !0, e.offsetHeight, e.hidden = !1;
      } catch (e) {}
    }, t);
  }

  var Y = {
    isIE: Boolean(window.document.documentMode),
    isEdge: window.navigator.userAgent.includes("Edge"),
    isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
    isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
    isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
  };

  function Q(e, t) {
    return t.split(".").reduce((e, t) => e && e[t], e);
  }

  function X() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      t[_key - 1] = arguments[_key];
    }

    if (!t.length) return e;
    var i = t.shift();
    return L(i) ? (Object.keys(i).forEach(t => {
      L(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
        [t]: {}
      }), X(e[t], i[t])) : Object.assign(e, {
        [t]: i[t]
      });
    }), X(e, ...t)) : e;
  }

  function J(e, t) {
    var i = e.length ? e : [e];
    Array.from(i).reverse().forEach((e, i) => {
      var s = i > 0 ? t.cloneNode(!0) : t,
          n = e.parentNode,
          a = e.nextSibling;
      s.appendChild(e), a ? n.insertBefore(s, a) : n.appendChild(s);
    });
  }

  function G(e, t) {
    H(e) && !W(t) && Object.entries(t).filter(_ref => {
      var [, e] = _ref;
      return !I(e);
    }).forEach(_ref2 => {
      var [t, i] = _ref2;
      return e.setAttribute(t, i);
    });
  }

  function Z(e, t, i) {
    var s = document.createElement(e);
    return L(t) && G(s, t), _(i) && (s.innerText = i), s;
  }

  function ee(e, t, i, s) {
    H(t) && t.appendChild(Z(e, i, s));
  }

  function te(e) {
    D(e) || q(e) ? Array.from(e).forEach(te) : H(e) && H(e.parentNode) && e.parentNode.removeChild(e);
  }

  function ie(e) {
    if (!H(e)) return;
    var {
      length: t
    } = e.childNodes;

    for (; t > 0;) {
      e.removeChild(e.lastChild), t -= 1;
    }
  }

  function se(e, t) {
    return H(t) && H(t.parentNode) && H(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }

  function ne(e, t) {
    if (!_(e) || W(e)) return {};
    var i = {},
        s = X({}, t);
    return e.split(",").forEach(e => {
      var t = e.trim(),
          n = t.replace(".", ""),
          a = t.replace(/[[\]]/g, "").split("="),
          [l] = a,
          o = a.length > 1 ? a[1].replace(/["']/g, "") : "";

      switch (t.charAt(0)) {
        case ".":
          _(s.class) ? i.class = "".concat(s.class, " ").concat(n) : i.class = n;
          break;

        case "#":
          i.id = t.replace("#", "");
          break;

        case "[":
          i[l] = o;
      }
    }), X(s, i);
  }

  function ae(e, t) {
    if (!H(e)) return;
    var i = t;
    O(i) || (i = !e.hidden), e.hidden = i;
  }

  function le(e, t, i) {
    if (D(e)) return Array.from(e).map(e => le(e, t, i));

    if (H(e)) {
      var _s = "toggle";
      return void 0 !== i && (_s = i ? "add" : "remove"), e.classList[_s](t), e.classList.contains(t);
    }

    return !1;
  }

  function oe(e, t) {
    return H(e) && e.classList.contains(t);
  }

  function re(e, t) {
    var {
      prototype: i
    } = Element;
    return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }).call(e, t);
  }

  function ce(e) {
    return this.elements.container.querySelectorAll(e);
  }

  function he(e) {
    return this.elements.container.querySelector(e);
  }

  function ue() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    H(e) && (e.focus({
      preventScroll: !0
    }), t && le(e, this.config.classNames.tabFocus));
  }

  var de = {
    "audio/ogg": "vorbis",
    "audio/wav": "1",
    "video/webm": "vp8, vorbis",
    "video/mp4": "avc1.42E01E, mp4a.40.2",
    "video/ogg": "theora"
  },
      me = {
    audio: "canPlayType" in document.createElement("audio"),
    video: "canPlayType" in document.createElement("video"),

    check(e, t, i) {
      var s = Y.isIPhone && i && me.playsinline,
          n = me[e] || "html5" !== t;
      return {
        api: n,
        ui: n && me.rangeInput && ("video" !== e || !Y.isIPhone || s)
      };
    },

    pip: !(Y.isIPhone || !j(Z("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Z("video").disablePictureInPicture)),
    airplay: j(window.WebKitPlaybackTargetAvailabilityEvent),
    playsinline: "playsInline" in document.createElement("video"),

    mime(e) {
      if (W(e)) return !1;
      var [t] = e.split("/");
      var i = e;
      if (!this.isHTML5 || t !== this.type) return !1;
      Object.keys(de).includes(i) && (i += "; codecs=\"".concat(de[e], "\""));

      try {
        return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
      } catch (e) {
        return !1;
      }
    },

    textTracks: "textTracks" in document.createElement("video"),
    rangeInput: (() => {
      var e = document.createElement("input");
      return e.type = "range", "range" === e.type;
    })(),
    touch: "ontouchstart" in document.documentElement,
    transitions: !1 !== z,
    reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
  },
      pe = (() => {
    var e = !1;

    try {
      var _t = Object.defineProperty({}, "passive", {
        get: () => (e = !0, null)
      });

      window.addEventListener("test", null, _t), window.removeEventListener("test", null, _t);
    } catch (e) {}

    return e;
  })();

  function ge(e, t, i) {
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
    var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
    if (!e || !("addEventListener" in e) || W(t) || !j(i)) return;
    var l = t.split(" ");
    var o = a;
    pe && (o = {
      passive: n,
      capture: a
    }), l.forEach(t => {
      this && this.eventListeners && s && this.eventListeners.push({
        element: e,
        type: t,
        callback: i,
        options: o
      }), e[s ? "addEventListener" : "removeEventListener"](t, i, o);
    });
  }

  function fe(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !0, s, n);
  }

  function be(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !1, s, n);
  }

  function ye(e) {
    var _this = this;

    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

    var a = function a() {
      for (var _len2 = arguments.length, l = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        l[_key2] = arguments[_key2];
      }

      be(e, t, a, s, n), i.apply(_this, l);
    };

    ge.call(this, e, t, a, !0, s, n);
  }

  function ve(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!H(e) || W(t)) return;
    var n = new CustomEvent(t, {
      bubbles: i,
      detail: _objectSpread(_objectSpread({}, s), {}, {
        plyr: this
      })
    });
    e.dispatchEvent(n);
  }

  function we() {
    this && this.eventListeners && (this.eventListeners.forEach(e => {
      var {
        element: t,
        type: i,
        callback: s,
        options: n
      } = e;
      t.removeEventListener(i, s, n);
    }), this.eventListeners = []);
  }

  function Te() {
    return new Promise(e => this.ready ? setTimeout(e, 0) : fe.call(this, this.elements.container, "ready", e)).then(() => {});
  }

  function ke(e) {
    B(e) && e.then(null, () => {});
  }

  function Ce(e) {
    return q(e) ? e.filter((t, i) => e.indexOf(t) === i) : e;
  }

  function Ae(e, t) {
    return q(e) && e.length ? e.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e) : null;
  }

  function Se(e) {
    return !(!window || !window.CSS) && window.CSS.supports(e);
  }

  var Ee = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((e, _ref3) => {
    var [t, i] = _ref3;
    return _objectSpread(_objectSpread({}, e), {}, {
      [t / i]: [t, i]
    });
  }, {});

  function Pe(e) {
    if (!(q(e) || _(e) && e.includes(":"))) return !1;
    return (q(e) ? e : e.split(":")).map(Number).every($);
  }

  function Ne(e) {
    if (!q(e) || !e.every($)) return null;

    var [t, i] = e,
        s = (e, t) => 0 === t ? e : s(t, e % t),
        n = s(t, i);

    return [t / n, i / n];
  }

  function xe(e) {
    var t = e => Pe(e) ? e.split(":").map(Number) : null;

    var i = t(e);

    if (null === i && (i = t(this.config.ratio)), null === i && !W(this.embed) && q(this.embed.ratio) && ({
      ratio: i
    } = this.embed), null === i && this.isHTML5) {
      var {
        videoWidth: _e2,
        videoHeight: _t2
      } = this.media;
      i = [_e2, _t2];
    }

    return Ne(i);
  }

  function Me(e) {
    if (!this.isVideo) return {};
    var {
      wrapper: t
    } = this.elements,
        i = xe.call(this, e);
    if (!q(i)) return {};
    var [s, n] = Ne(i),
        a = 100 / s * n;

    if (Se("aspect-ratio: ".concat(s, "/").concat(n)) ? t.style.aspectRatio = "".concat(s, "/").concat(n) : t.style.paddingBottom = "".concat(a, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
      var _e3 = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
          _i = (_e3 - a) / (_e3 / 50);

      this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(_i, "%)");
    } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);

    return {
      padding: a,
      ratio: i
    };
  }

  function Ie(e, t) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .05;
    var s = e / t,
        n = Ae(Object.keys(Ee), s);
    return Math.abs(n - s) <= i ? Ee[n] : [e, t];
  }

  var Le = {
    getSources() {
      if (!this.isHTML5) return [];
      return Array.from(this.media.querySelectorAll("source")).filter(e => {
        var t = e.getAttribute("type");
        return !!W(t) || me.mime.call(this, t);
      });
    },

    getQualityOptions() {
      return this.config.quality.forced ? this.config.quality.options : Le.getSources.call(this).map(e => Number(e.getAttribute("size"))).filter(Boolean);
    },

    setup() {
      if (!this.isHTML5) return;
      var e = this;
      e.options.speed = e.config.speed.options, W(this.config.ratio) || Me.call(e), Object.defineProperty(e.media, "quality", {
        get() {
          var t = Le.getSources.call(e).find(t => t.getAttribute("src") === e.source);
          return t && Number(t.getAttribute("size"));
        },

        set(t) {
          if (e.quality !== t) {
            if (e.config.quality.forced && j(e.config.quality.onChange)) e.config.quality.onChange(t);else {
              var _i2 = Le.getSources.call(e).find(e => Number(e.getAttribute("size")) === t);

              if (!_i2) return;
              var {
                currentTime: _s2,
                paused: _n,
                preload: _a,
                readyState: _l,
                playbackRate: _o
              } = e.media;
              e.media.src = _i2.getAttribute("src"), ("none" !== _a || _l) && (e.once("loadedmetadata", () => {
                e.speed = _o, e.currentTime = _s2, _n || ke(e.play());
              }), e.media.load());
            }
            ve.call(e, e.media, "qualitychange", !1, {
              quality: t
            });
          }
        }

      });
    },

    cancelRequests() {
      this.isHTML5 && (te(Le.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    }

  };

  function $e(e) {
    for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      t[_key3 - 1] = arguments[_key3];
    }

    return W(e) ? e : e.toString().replace(/{(\d+)}/g, (e, i) => t[i].toString());
  }

  var _e = function _e() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
  },
      Oe = function Oe() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return e.toString().replace(/\w\S*/g, e => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase());
  };

  function je() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = e.toString();
    return t = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = e.toString();
      return t = _e(t, "-", " "), t = _e(t, "_", " "), t = Oe(t), _e(t, " ", "");
    }(t), t.charAt(0).toLowerCase() + t.slice(1);
  }

  function qe(e) {
    var t = document.createElement("div");
    return t.appendChild(e), t.innerHTML;
  }

  var De = {
    pip: "PIP",
    airplay: "AirPlay",
    html5: "HTML5",
    vimeo: "Vimeo",
    youtube: "YouTube"
  },
      He = {
    get() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (W(e) || W(t)) return "";
      var i = Q(t.i18n, e);
      if (W(i)) return Object.keys(De).includes(e) ? De[e] : "";
      var s = {
        "{seektime}": t.seekTime,
        "{title}": t.title
      };
      return Object.entries(s).forEach(_ref4 => {
        var [e, t] = _ref4;
        i = _e(i, e, t);
      }), i;
    }

  };

  class Fe {
    constructor(t) {
      e(this, "get", e => {
        if (!Fe.supported || !this.enabled) return null;
        var t = window.localStorage.getItem(this.key);
        if (W(t)) return null;
        var i = JSON.parse(t);
        return _(e) && e.length ? i[e] : i;
      }), e(this, "set", e => {
        if (!Fe.supported || !this.enabled) return;
        if (!L(e)) return;
        var t = this.get();
        W(t) && (t = {}), X(t, e);

        try {
          window.localStorage.setItem(this.key, JSON.stringify(t));
        } catch (e) {}
      }), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
    }

    static get supported() {
      try {
        if (!("localStorage" in window)) return !1;
        var _e4 = "___test";
        return window.localStorage.setItem(_e4, _e4), window.localStorage.removeItem(_e4), !0;
      } catch (e) {
        return !1;
      }
    }

  }

  function Re(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "text";
    return new Promise((i, s) => {
      try {
        var _s3 = new XMLHttpRequest();

        if (!("withCredentials" in _s3)) return;
        _s3.addEventListener("load", () => {
          if ("text" === t) try {
            i(JSON.parse(_s3.responseText));
          } catch (e) {
            i(_s3.responseText);
          } else i(_s3.response);
        }), _s3.addEventListener("error", () => {
          throw new Error(_s3.status);
        }), _s3.open("GET", e, !0), _s3.responseType = t, _s3.send();
      } catch (e) {
        s(e);
      }
    });
  }

  function Ve(e, t) {
    if (!_(e)) return;

    var i = _(t);

    var s = !1;

    var n = () => null !== document.getElementById(t),
        a = (e, t) => {
      e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e);
    };

    if (!i || !n()) {
      var _n2 = Fe.supported,
          _l2 = document.createElement("div");

      if (_l2.setAttribute("hidden", ""), i && _l2.setAttribute("id", t), _n2) {
        var _e5 = window.localStorage.getItem("cache-".concat(t));

        if (s = null !== _e5, s) {
          var _t3 = JSON.parse(_e5);

          a(_l2, _t3.content);
        }
      }

      Re(e).then(e => {
        if (!W(e)) {
          if (_n2) try {
            window.localStorage.setItem("cache-".concat(t), JSON.stringify({
              content: e
            }));
          } catch (e) {}
          a(_l2, e);
        }
      }).catch(() => {});
    }
  }

  var Be = e => Math.trunc(e / 60 / 60 % 60, 10);

  function Ue() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    if (!$(e)) return Ue(void 0, t, i);

    var s = e => "0".concat(e).slice(-2);

    var n = Be(e);
    var a = (l = e, Math.trunc(l / 60 % 60, 10));
    var l;

    var o = (e => Math.trunc(e % 60, 10))(e);

    return n = t || n > 0 ? "".concat(n, ":") : "", "".concat(i && e > 0 ? "-" : "").concat(n).concat(s(a), ":").concat(s(o));
  }

  var We = {
    getIconUrl() {
      var e = new URL(this.config.iconUrl, window.location),
          t = window.location.host ? window.location.host : window.top.location.host,
          i = e.host !== t || Y.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors: i
      };
    },

    findElements() {
      try {
        return this.elements.controls = he.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
          play: ce.call(this, this.config.selectors.buttons.play),
          pause: he.call(this, this.config.selectors.buttons.pause),
          restart: he.call(this, this.config.selectors.buttons.restart),
          rewind: he.call(this, this.config.selectors.buttons.rewind),
          fastForward: he.call(this, this.config.selectors.buttons.fastForward),
          mute: he.call(this, this.config.selectors.buttons.mute),
          pip: he.call(this, this.config.selectors.buttons.pip),
          airplay: he.call(this, this.config.selectors.buttons.airplay),
          settings: he.call(this, this.config.selectors.buttons.settings),
          captions: he.call(this, this.config.selectors.buttons.captions),
          fullscreen: he.call(this, this.config.selectors.buttons.fullscreen)
        }, this.elements.progress = he.call(this, this.config.selectors.progress), this.elements.inputs = {
          seek: he.call(this, this.config.selectors.inputs.seek),
          volume: he.call(this, this.config.selectors.inputs.volume)
        }, this.elements.display = {
          buffer: he.call(this, this.config.selectors.display.buffer),
          currentTime: he.call(this, this.config.selectors.display.currentTime),
          duration: he.call(this, this.config.selectors.display.duration)
        }, H(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    },

    createIcon(e, t) {
      var i = "http://www.w3.org/2000/svg",
          s = We.getIconUrl.call(this),
          n = "".concat(s.cors ? "" : s.url, "#").concat(this.config.iconPrefix),
          a = document.createElementNS(i, "svg");
      G(a, X(t, {
        "aria-hidden": "true",
        focusable: "false"
      }));
      var l = document.createElementNS(i, "use"),
          o = "".concat(n, "-").concat(e);
      return "href" in l && l.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(l), a;
    },

    createLabel(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i = He.get(e, this.config);
      return Z("span", _objectSpread(_objectSpread({}, t), {}, {
        class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
      }), i);
    },

    createBadge(e) {
      if (W(e)) return null;
      var t = Z("span", {
        class: this.config.classNames.menu.value
      });
      return t.appendChild(Z("span", {
        class: this.config.classNames.menu.badge
      }, e)), t;
    },

    createButton(e, t) {
      var i = X({}, t);
      var s = je(e);
      var n = {
        element: "button",
        toggle: !1,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };

      switch (["element", "icon", "label"].forEach(e => {
        Object.keys(i).includes(e) && (n[e] = i[e], delete i[e]);
      }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(e => e === this.config.classNames.control) || X(i, {
        class: "".concat(i.class, " ").concat(this.config.classNames.control)
      }) : i.class = this.config.classNames.control, e) {
        case "play":
          n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
          break;

        case "mute":
          n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
          break;

        case "captions":
          n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
          break;

        case "fullscreen":
          n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
          break;

        case "play-large":
          i.class += " ".concat(this.config.classNames.control, "--overlaid"), s = "play", n.label = "play", n.icon = "play";
          break;

        default:
          W(n.label) && (n.label = s), W(n.icon) && (n.icon = e);
      }

      var a = Z(n.element);
      return n.toggle ? (a.appendChild(We.createIcon.call(this, n.iconPressed, {
        class: "icon--pressed"
      })), a.appendChild(We.createIcon.call(this, n.icon, {
        class: "icon--not-pressed"
      })), a.appendChild(We.createLabel.call(this, n.labelPressed, {
        class: "label--pressed"
      })), a.appendChild(We.createLabel.call(this, n.label, {
        class: "label--not-pressed"
      }))) : (a.appendChild(We.createIcon.call(this, n.icon)), a.appendChild(We.createLabel.call(this, n.label))), X(i, ne(this.config.selectors.buttons[s], i)), G(a, i), "play" === s ? (q(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(a)) : this.elements.buttons[s] = a, a;
    },

    createRange(e, t) {
      var i = Z("input", X(ne(this.config.selectors.inputs[e]), {
        type: "range",
        min: 0,
        max: 100,
        step: .01,
        value: 0,
        autocomplete: "off",
        role: "slider",
        "aria-label": He.get(e, this.config),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0
      }, t));
      return this.elements.inputs[e] = i, We.updateRangeFill.call(this, i), T.setup(i), i;
    },

    createProgress(e, t) {
      var i = Z("progress", X(ne(this.config.selectors.display[e]), {
        min: 0,
        max: 100,
        value: 0,
        role: "progressbar",
        "aria-hidden": !0
      }, t));

      if ("volume" !== e) {
        i.appendChild(Z("span", null, "0"));

        var _t4 = {
          played: "played",
          buffer: "buffered"
        }[e],
            _s4 = _t4 ? He.get(_t4, this.config) : "";

        i.innerText = "% ".concat(_s4.toLowerCase());
      }

      return this.elements.display[e] = i, i;
    },

    createTime(e, t) {
      var i = ne(this.config.selectors.display[e], t),
          s = Z("div", X(i, {
        class: "".concat(i.class ? i.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
        "aria-label": He.get(e, this.config)
      }), "00:00");
      return this.elements.display[e] = s, s;
    },

    bindMenuItemShortcuts(e, t) {
      fe.call(this, e, "keydown keyup", i => {
        if (![32, 38, 39, 40].includes(i.which)) return;
        if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
        var s = re(e, '[role="menuitemradio"]');
        if (!s && [32, 39].includes(i.which)) We.showMenuPanel.call(this, t, !0);else {
          var _t5;

          32 !== i.which && (40 === i.which || s && 39 === i.which ? (_t5 = e.nextElementSibling, H(_t5) || (_t5 = e.parentNode.firstElementChild)) : (_t5 = e.previousElementSibling, H(_t5) || (_t5 = e.parentNode.lastElementChild)), ue.call(this, _t5, !0));
        }
      }, !1), fe.call(this, e, "keyup", e => {
        13 === e.which && We.focusFirstMenuItem.call(this, null, !0);
      });
    },

    createMenuItem(_ref5) {
      var {
        value: e,
        list: t,
        type: i,
        title: s,
        badge: n = null,
        checked: a = !1
      } = _ref5;
      var l = ne(this.config.selectors.inputs[i]),
          o = Z("button", X(l, {
        type: "button",
        role: "menuitemradio",
        class: "".concat(this.config.classNames.control, " ").concat(l.class ? l.class : "").trim(),
        "aria-checked": a,
        value: e
      })),
          r = Z("span");
      r.innerHTML = s, H(n) && r.appendChild(n), o.appendChild(r), Object.defineProperty(o, "checked", {
        enumerable: !0,
        get: () => "true" === o.getAttribute("aria-checked"),

        set(e) {
          e && Array.from(o.parentNode.children).filter(e => re(e, '[role="menuitemradio"]')).forEach(e => e.setAttribute("aria-checked", "false")), o.setAttribute("aria-checked", e ? "true" : "false");
        }

      }), this.listeners.bind(o, "click keyup", t => {
        if (!R(t) || 32 === t.which) {
          switch (t.preventDefault(), t.stopPropagation(), o.checked = !0, i) {
            case "language":
              this.currentTrack = Number(e);
              break;

            case "quality":
              this.quality = e;
              break;

            case "speed":
              this.speed = parseFloat(e);
          }

          We.showMenuPanel.call(this, "home", R(t));
        }
      }, i, !1), We.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
    },

    formatTime() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (!$(e)) return e;
      return Ue(e, Be(this.duration) > 0, t);
    },

    updateTimeDisplay() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      H(e) && $(t) && (e.innerText = We.formatTime(t, i));
    },

    updateVolume() {
      this.supported.ui && (H(this.elements.inputs.volume) && We.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), H(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    },

    setRange(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      H(e) && (e.value = t, We.updateRangeFill.call(this, e));
    },

    updateProgress(e) {
      if (!this.supported.ui || !F(e)) return;
      var t = 0;

      var i = (e, t) => {
        var i = $(t) ? t : 0,
            s = H(e) ? e : this.elements.display.buffer;

        if (H(s)) {
          s.value = i;
          var _e6 = s.getElementsByTagName("span")[0];
          H(_e6) && (_e6.childNodes[0].nodeValue = i);
        }
      };

      if (e) switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN(s) || Number.isNaN(n) ? 0 : (s / n * 100).toFixed(2), "timeupdate" === e.type && We.setRange.call(this, this.elements.inputs.seek, t);
          break;

        case "playing":
        case "progress":
          i(this.elements.display.buffer, 100 * this.buffered);
      }
      var s, n;
    },

    updateRangeFill(e) {
      var t = F(e) ? e.target : e;

      if (H(t) && "range" === t.getAttribute("type")) {
        if (re(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);

          var _e7 = We.formatTime(this.currentTime),
              _i3 = We.formatTime(this.duration),
              _s5 = He.get("seekLabel", this.config);

          t.setAttribute("aria-valuetext", _s5.replace("{currentTime}", _e7).replace("{duration}", _i3));
        } else if (re(t, this.config.selectors.inputs.volume)) {
          var _e8 = 100 * t.value;

          t.setAttribute("aria-valuenow", _e8), t.setAttribute("aria-valuetext", "".concat(_e8.toFixed(1), "%"));
        } else t.setAttribute("aria-valuenow", t.value);

        Y.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
      }
    },

    updateSeekTooltip(e) {
      if (!this.config.tooltips.seek || !H(this.elements.inputs.seek) || !H(this.elements.display.seekTooltip) || 0 === this.duration) return;

      var t = "".concat(this.config.classNames.tooltip, "--visible"),
          i = e => le(this.elements.display.seekTooltip, t, e);

      if (this.touch) return void i(!1);
      var s = 0;
      var n = this.elements.progress.getBoundingClientRect();
      if (F(e)) s = 100 / n.width * (e.pageX - n.left);else {
        if (!oe(this.elements.display.seekTooltip, t)) return;
        s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
      }
      s < 0 ? s = 0 : s > 100 && (s = 100), We.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = "".concat(s, "%"), F(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type);
    },

    timeUpdate(e) {
      var t = !H(this.elements.display.duration) && this.config.invertTime;
      We.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || We.updateProgress.call(this, e);
    },

    durationUpdate() {
      if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
      if (this.duration >= 2 ** 32) return ae(this.elements.display.currentTime, !0), void ae(this.elements.progress, !0);
      H(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
      var e = H(this.elements.display.duration);
      !e && this.config.displayDuration && this.paused && We.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && We.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), We.updateSeekTooltip.call(this);
    },

    toggleMenuButton(e, t) {
      ae(this.elements.settings.buttons[e], !t);
    },

    updateSetting(e, t, i) {
      var s = this.elements.settings.panels[e];
      var n = null,
          a = t;
      if ("captions" === e) n = this.currentTrack;else {
        if (n = W(i) ? this[e] : i, W(n) && (n = this.config[e].default), !W(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn("Unsupported value of '".concat(n, "' for ").concat(e));
        if (!this.config[e].options.includes(n)) return void this.debug.warn("Disabled value of '".concat(n, "' for ").concat(e));
      }
      if (H(a) || (a = s && s.querySelector('[role="menu"]')), !H(a)) return;
      this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = We.getLabel.call(this, e, n);
      var l = a && a.querySelector("[value=\"".concat(n, "\"]"));
      H(l) && (l.checked = !0);
    },

    getLabel(e, t) {
      switch (e) {
        case "speed":
          return 1 === t ? He.get("normal", this.config) : "".concat(t, "&times;");

        case "quality":
          if ($(t)) {
            var _e9 = He.get("qualityLabel.".concat(t), this.config);

            return _e9.length ? _e9 : "".concat(t, "p");
          }

          return Oe(t);

        case "captions":
          return Ye.getLabel.call(this);

        default:
          return null;
      }
    },

    setQualityMenu(e) {
      if (!H(this.elements.settings.panels.quality)) return;
      var t = "quality",
          i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
      q(e) && (this.options.quality = Ce(e).filter(e => this.config.quality.options.includes(e)));
      var s = !W(this.options.quality) && this.options.quality.length > 1;
      if (We.toggleMenuButton.call(this, t, s), ie(i), We.checkMenu.call(this), !s) return;

      var n = e => {
        var t = He.get("qualityBadge.".concat(e), this.config);
        return t.length ? We.createBadge.call(this, t) : null;
      };

      this.options.quality.sort((e, t) => {
        var i = this.config.quality.options;
        return i.indexOf(e) > i.indexOf(t) ? 1 : -1;
      }).forEach(e => {
        We.createMenuItem.call(this, {
          value: e,
          list: i,
          type: t,
          title: We.getLabel.call(this, "quality", e),
          badge: n(e)
        });
      }), We.updateSetting.call(this, t, i);
    },

    setCaptionsMenu() {
      if (!H(this.elements.settings.panels.captions)) return;
      var e = "captions",
          t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
          i = Ye.getTracks.call(this),
          s = Boolean(i.length);
      if (We.toggleMenuButton.call(this, e, s), ie(t), We.checkMenu.call(this), !s) return;
      var n = i.map((e, i) => ({
        value: i,
        checked: this.captions.toggled && this.currentTrack === i,
        title: Ye.getLabel.call(this, e),
        badge: e.language && We.createBadge.call(this, e.language.toUpperCase()),
        list: t,
        type: "language"
      }));
      n.unshift({
        value: -1,
        checked: !this.captions.toggled,
        title: He.get("disabled", this.config),
        list: t,
        type: "language"
      }), n.forEach(We.createMenuItem.bind(this)), We.updateSetting.call(this, e, t);
    },

    setSpeedMenu() {
      if (!H(this.elements.settings.panels.speed)) return;
      var e = "speed",
          t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
      this.options.speed = this.options.speed.filter(e => e >= this.minimumSpeed && e <= this.maximumSpeed);
      var i = !W(this.options.speed) && this.options.speed.length > 1;
      We.toggleMenuButton.call(this, e, i), ie(t), We.checkMenu.call(this), i && (this.options.speed.forEach(i => {
        We.createMenuItem.call(this, {
          value: i,
          list: t,
          type: e,
          title: We.getLabel.call(this, "speed", i)
        });
      }), We.updateSetting.call(this, e, t));
    },

    checkMenu() {
      var {
        buttons: e
      } = this.elements.settings,
          t = !W(e) && Object.values(e).some(e => !e.hidden);
      ae(this.elements.settings.menu, !t);
    },

    focusFirstMenuItem(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (this.elements.settings.popup.hidden) return;
      var i = e;
      H(i) || (i = Object.values(this.elements.settings.panels).find(e => !e.hidden));
      var s = i.querySelector('[role^="menuitem"]');
      ue.call(this, s, t);
    },

    toggleMenu(e) {
      var {
        popup: t
      } = this.elements.settings,
          i = this.elements.buttons.settings;
      if (!H(t) || !H(i)) return;
      var {
        hidden: s
      } = t;
      var n = s;
      if (O(e)) n = e;else if (R(e) && 27 === e.which) n = !1;else if (F(e)) {
        var _s6 = j(e.composedPath) ? e.composedPath()[0] : e.target,
            _a2 = t.contains(_s6);

        if (_a2 || !_a2 && e.target !== i && n) return;
      }
      i.setAttribute("aria-expanded", n), ae(t, !n), le(this.elements.container, this.config.classNames.menu.open, n), n && R(e) ? We.focusFirstMenuItem.call(this, null, !0) : n || s || ue.call(this, i, R(e));
    },

    getMenuSize(e) {
      var t = e.cloneNode(!0);
      t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
      var i = t.scrollWidth,
          s = t.scrollHeight;
      return te(t), {
        width: i,
        height: s
      };
    },

    showMenuPanel() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(e));
      if (!H(i)) return;
      var s = i.parentNode,
          n = Array.from(s.children).find(e => !e.hidden);

      if (me.transitions && !me.reducedMotion) {
        s.style.width = "".concat(n.scrollWidth, "px"), s.style.height = "".concat(n.scrollHeight, "px");

        var _e10 = We.getMenuSize.call(this, i),
            _t6 = e => {
          e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", be.call(this, s, z, _t6));
        };

        fe.call(this, s, z, _t6), s.style.width = "".concat(_e10.width, "px"), s.style.height = "".concat(_e10.height, "px");
      }

      ae(n, !0), ae(i, !1), We.focusFirstMenuItem.call(this, i, t);
    },

    setDownloadUrl() {
      var e = this.elements.buttons.download;
      H(e) && e.setAttribute("href", this.download);
    },

    create(e) {
      var {
        bindMenuItemShortcuts: t,
        createButton: i,
        createProgress: s,
        createRange: n,
        createTime: a,
        setQualityMenu: l,
        setSpeedMenu: o,
        showMenuPanel: r
      } = We;
      this.elements.controls = null, q(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
      var c = Z("div", ne(this.config.selectors.controls.wrapper));
      this.elements.controls = c;
      var h = {
        class: "plyr__controls__item"
      };
      return Ce(q(this.config.controls) ? this.config.controls : []).forEach(l => {
        if ("restart" === l && c.appendChild(i.call(this, "restart", h)), "rewind" === l && c.appendChild(i.call(this, "rewind", h)), "play" === l && c.appendChild(i.call(this, "play", h)), "fast-forward" === l && c.appendChild(i.call(this, "fast-forward", h)), "progress" === l) {
          var _t7 = Z("div", {
            class: "".concat(h.class, " plyr__progress__container")
          }),
              _i4 = Z("div", ne(this.config.selectors.progress));

          if (_i4.appendChild(n.call(this, "seek", {
            id: "plyr-seek-".concat(e.id)
          })), _i4.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
            var _e11 = Z("span", {
              class: this.config.classNames.tooltip
            }, "00:00");

            _i4.appendChild(_e11), this.elements.display.seekTooltip = _e11;
          }

          this.elements.progress = _i4, _t7.appendChild(this.elements.progress), c.appendChild(_t7);
        }

        if ("current-time" === l && c.appendChild(a.call(this, "currentTime", h)), "duration" === l && c.appendChild(a.call(this, "duration", h)), "mute" === l || "volume" === l) {
          var {
            volume: _t8
          } = this.elements;

          if (H(_t8) && c.contains(_t8) || (_t8 = Z("div", X({}, h, {
            class: "".concat(h.class, " plyr__volume").trim()
          })), this.elements.volume = _t8, c.appendChild(_t8)), "mute" === l && _t8.appendChild(i.call(this, "mute")), "volume" === l && !Y.isIos) {
            var _i5 = {
              max: 1,
              step: .05,
              value: this.config.volume
            };

            _t8.appendChild(n.call(this, "volume", X(_i5, {
              id: "plyr-volume-".concat(e.id)
            })));
          }
        }

        if ("captions" === l && c.appendChild(i.call(this, "captions", h)), "settings" === l && !W(this.config.settings)) {
          var _s7 = Z("div", X({}, h, {
            class: "".concat(h.class, " plyr__menu").trim(),
            hidden: ""
          }));

          _s7.appendChild(i.call(this, "settings", {
            "aria-haspopup": !0,
            "aria-controls": "plyr-settings-".concat(e.id),
            "aria-expanded": !1
          }));

          var _n3 = Z("div", {
            class: "plyr__menu__container",
            id: "plyr-settings-".concat(e.id),
            hidden: ""
          }),
              _a3 = Z("div"),
              _l3 = Z("div", {
            id: "plyr-settings-".concat(e.id, "-home")
          }),
              _o2 = Z("div", {
            role: "menu"
          });

          _l3.appendChild(_o2), _a3.appendChild(_l3), this.elements.settings.panels.home = _l3, this.config.settings.forEach(i => {
            var s = Z("button", X(ne(this.config.selectors.buttons.settings), {
              type: "button",
              class: "".concat(this.config.classNames.control, " ").concat(this.config.classNames.control, "--forward"),
              role: "menuitem",
              "aria-haspopup": !0,
              hidden: ""
            }));
            t.call(this, s, i), fe.call(this, s, "click", () => {
              r.call(this, i, !1);
            });
            var n = Z("span", null, He.get(i, this.config)),
                l = Z("span", {
              class: this.config.classNames.menu.value
            });
            l.innerHTML = e[i], n.appendChild(l), s.appendChild(n), _o2.appendChild(s);
            var c = Z("div", {
              id: "plyr-settings-".concat(e.id, "-").concat(i),
              hidden: ""
            }),
                h = Z("button", {
              type: "button",
              class: "".concat(this.config.classNames.control, " ").concat(this.config.classNames.control, "--back")
            });
            h.appendChild(Z("span", {
              "aria-hidden": !0
            }, He.get(i, this.config))), h.appendChild(Z("span", {
              class: this.config.classNames.hidden
            }, He.get("menuBack", this.config))), fe.call(this, c, "keydown", e => {
              37 === e.which && (e.preventDefault(), e.stopPropagation(), r.call(this, "home", !0));
            }, !1), fe.call(this, h, "click", () => {
              r.call(this, "home", !1);
            }), c.appendChild(h), c.appendChild(Z("div", {
              role: "menu"
            })), _a3.appendChild(c), this.elements.settings.buttons[i] = s, this.elements.settings.panels[i] = c;
          }), _n3.appendChild(_a3), _s7.appendChild(_n3), c.appendChild(_s7), this.elements.settings.popup = _n3, this.elements.settings.menu = _s7;
        }

        if ("pip" === l && me.pip && c.appendChild(i.call(this, "pip", h)), "airplay" === l && me.airplay && c.appendChild(i.call(this, "airplay", h)), "download" === l) {
          var _e12 = X({}, h, {
            element: "a",
            href: this.download,
            target: "_blank"
          });

          this.isHTML5 && (_e12.download = "");
          var {
            download: _t9
          } = this.config.urls;
          !U(_t9) && this.isEmbed && X(_e12, {
            icon: "logo-".concat(this.provider),
            label: this.provider
          }), c.appendChild(i.call(this, "download", _e12));
        }

        "fullscreen" === l && c.appendChild(i.call(this, "fullscreen", h));
      }), this.isHTML5 && l.call(this, Le.getQualityOptions.call(this)), o.call(this), c;
    },

    inject() {
      if (this.config.loadSprite) {
        var _e13 = We.getIconUrl.call(this);

        _e13.cors && Ve(_e13.url, "sprite-plyr");
      }

      this.id = Math.floor(1e4 * Math.random());
      var e = null;
      this.elements.controls = null;
      var t = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      };
      var i = !0;
      j(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), H(this.config.controls) || _(this.config.controls) ? e = this.config.controls : (e = We.create.call(this, {
        id: this.id,
        seektime: this.config.seekTime,
        speed: this.speed,
        quality: this.quality,
        captions: Ye.getLabel.call(this)
      }), i = !1);
      var s;
      i && _(this.config.controls) && (e = (e => {
        var i = e;
        return Object.entries(t).forEach(_ref6 => {
          var [e, t] = _ref6;
          i = _e(i, "{".concat(e, "}"), t);
        }), i;
      })(e)), _(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), H(s) || (s = this.elements.container);

      if (s[H(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), H(this.elements.controls) || We.findElements.call(this), !W(this.elements.buttons)) {
        var _e14 = e => {
          var t = this.config.classNames.controlPressed;
          Object.defineProperty(e, "pressed", {
            enumerable: !0,
            get: () => oe(e, t),

            set() {
              var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
              le(e, t, i);
            }

          });
        };

        Object.values(this.elements.buttons).filter(Boolean).forEach(t => {
          q(t) || D(t) ? Array.from(t).filter(Boolean).forEach(_e14) : _e14(t);
        });
      }

      if (Y.isEdge && K(s), this.config.tooltips.controls) {
        var {
          classNames: _e15,
          selectors: _t10
        } = this.config,
            _i6 = "".concat(_t10.controls.wrapper, " ").concat(_t10.labels, " .").concat(_e15.hidden),
            _s8 = ce.call(this, _i6);

        Array.from(_s8).forEach(e => {
          le(e, this.config.classNames.hidden, !1), le(e, this.config.classNames.tooltip, !0);
        });
      }
    }

  };

  function ze(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    var i = e;

    if (t) {
      var _e16 = document.createElement("a");

      _e16.href = i, i = _e16.href;
    }

    try {
      return new URL(i);
    } catch (e) {
      return null;
    }
  }

  function Ke(e) {
    var t = new URLSearchParams();
    return L(e) && Object.entries(e).forEach(_ref7 => {
      var [e, i] = _ref7;
      t.set(e, i);
    }), t;
  }

  var Ye = {
    setup() {
      if (!this.supported.ui) return;
      if (!this.isVideo || this.isYouTube || this.isHTML5 && !me.textTracks) return void (q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this));
      var e, t;

      if (H(this.elements.captions) || (this.elements.captions = Z("div", ne(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, H(e) && H(t) && t.parentNode.insertBefore(e, t.nextSibling)), Y.isIE && window.URL) {
        var _e17 = this.media.querySelectorAll("track");

        Array.from(_e17).forEach(e => {
          var t = e.getAttribute("src"),
              i = ze(t);
          null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Re(t, "blob").then(t => {
            e.setAttribute("src", window.URL.createObjectURL(t));
          }).catch(() => {
            te(e);
          });
        });
      }

      var i = Ce((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(e => e.split("-")[0]));
      var s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
      "auto" === s && ([s] = i);
      var n = this.storage.get("captions");

      if (O(n) || ({
        active: n
      } = this.config.captions), Object.assign(this.captions, {
        toggled: !1,
        active: n,
        language: s,
        languages: i
      }), this.isHTML5) {
        var _e18 = this.config.captions.update ? "addtrack removetrack" : "removetrack";

        fe.call(this, this.media.textTracks, _e18, Ye.update.bind(this));
      }

      setTimeout(Ye.update.bind(this), 0);
    },

    update() {
      var e = Ye.getTracks.call(this, !0),
          {
        active: t,
        language: i,
        meta: s,
        currentTrackNode: n
      } = this.captions,
          a = Boolean(e.find(e => e.language === i));
      this.isHTML5 && this.isVideo && e.filter(e => !s.get(e)).forEach(e => {
        this.debug.log("Track added", e), s.set(e, {
          default: "showing" === e.mode
        }), "showing" === e.mode && (e.mode = "hidden"), fe.call(this, e, "cuechange", () => Ye.updateCues.call(this));
      }), (a && this.language !== i || !e.includes(n)) && (Ye.setLanguage.call(this, i), Ye.toggle.call(this, t && a)), this.elements && le(this.elements.container, this.config.classNames.captions.enabled, !W(e)), q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this);
    },

    toggle(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!this.supported.ui) return;
      var {
        toggled: i
      } = this.captions,
          s = this.config.classNames.captions.active,
          n = I(e) ? !i : e;

      if (n !== i) {
        if (t || (this.captions.active = n, this.storage.set({
          captions: n
        })), !this.language && n && !t) {
          var _e19 = Ye.getTracks.call(this),
              _t11 = Ye.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);

          return this.captions.language = _t11.language, void Ye.set.call(this, _e19.indexOf(_t11));
        }

        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), le(this.elements.container, s, n), this.captions.toggled = n, We.updateSetting.call(this, "captions"), ve.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
      }

      setTimeout(() => {
        n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden");
      });
    },

    set(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var i = Ye.getTracks.call(this);
      if (-1 !== e) {
        if ($(e)) {
          if (e in i) {
            if (this.captions.currentTrack !== e) {
              this.captions.currentTrack = e;
              var _s9 = i[e],
                  {
                language: _n4
              } = _s9 || {};
              this.captions.currentTrackNode = _s9, We.updateSetting.call(this, "captions"), t || (this.captions.language = _n4, this.storage.set({
                language: _n4
              })), this.isVimeo && this.embed.enableTextTrack(_n4), ve.call(this, this.media, "languagechange");
            }

            Ye.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Ye.updateCues.call(this);
          } else this.debug.warn("Track not found", e);
        } else this.debug.warn("Invalid caption argument", e);
      } else Ye.toggle.call(this, !1, t);
    },

    setLanguage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!_(e)) return void this.debug.warn("Invalid language argument", e);
      var i = e.toLowerCase();
      this.captions.language = i;
      var s = Ye.getTracks.call(this),
          n = Ye.findTrack.call(this, [i]);
      Ye.set.call(this, s.indexOf(n), t);
    },

    getTracks() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      return Array.from((this.media || {}).textTracks || []).filter(t => !this.isHTML5 || e || this.captions.meta.has(t)).filter(e => ["captions", "subtitles"].includes(e.kind));
    },

    findTrack(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;

      var i = Ye.getTracks.call(this),
          s = e => Number((this.captions.meta.get(e) || {}).default),
          n = Array.from(i).sort((e, t) => s(t) - s(e));

      var a;
      return e.every(e => (a = n.find(t => t.language === e), !a)), a || (t ? n[0] : void 0);
    },

    getCurrentTrack() {
      return Ye.getTracks.call(this)[this.currentTrack];
    },

    getLabel(e) {
      var t = e;
      return !V(t) && me.textTracks && this.captions.toggled && (t = Ye.getCurrentTrack.call(this)), V(t) ? W(t.label) ? W(t.language) ? He.get("enabled", this.config) : e.language.toUpperCase() : t.label : He.get("disabled", this.config);
    },

    updateCues(e) {
      if (!this.supported.ui) return;
      if (!H(this.elements.captions)) return void this.debug.warn("No captions element to render to");
      if (!I(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
      var t = e;

      if (!t) {
        var _e20 = Ye.getCurrentTrack.call(this);

        t = Array.from((_e20 || {}).activeCues || []).map(e => e.getCueAsHTML()).map(qe);
      }

      var i = t.map(e => e.trim()).join("\n");

      if (i !== this.elements.captions.innerHTML) {
        ie(this.elements.captions);

        var _e21 = Z("span", ne(this.config.selectors.caption));

        _e21.innerHTML = i, this.elements.captions.appendChild(_e21), ve.call(this, this.media, "cuechange");
      }
    }

  },
      Qe = {
    enabled: !0,
    title: "",
    debug: !1,
    autoplay: !1,
    autopause: !0,
    playsinline: !0,
    seekTime: 10,
    volume: 1,
    muted: !1,
    duration: null,
    displayDuration: !0,
    invertTime: !0,
    toggleInvert: !0,
    ratio: null,
    clickToPlay: !0,
    hideControls: !0,
    resetOnEnd: !1,
    disableContextMenu: !0,
    loadSprite: !0,
    iconPrefix: "plyr",
    iconUrl: "https://cdn.plyr.io/3.6.9/plyr.svg",
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      forced: !1,
      onChange: null
    },
    loop: {
      active: !1
    },
    speed: {
      selected: 1,
      options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
    },
    keyboard: {
      focused: !0,
      global: !1
    },
    tooltips: {
      controls: !1,
      seek: !0
    },
    captions: {
      active: !1,
      language: "auto",
      update: !1
    },
    fullscreen: {
      enabled: !0,
      fallback: !0,
      iosNative: !1
    },
    storage: {
      enabled: !0,
      key: "plyr"
    },
    controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
    settings: ["captions", "quality", "speed"],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      pip: "PIP",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
      start: "Start",
      end: "End",
      all: "All",
      reset: "Reset",
      disabled: "Disabled",
      enabled: "Enabled",
      advertisement: "Ad",
      qualityBadge: {
        2160: "4K",
        1440: "HD",
        1080: "HD",
        720: "HD",
        576: "SD",
        480: "SD"
      }
    },
    urls: {
      download: null,
      vimeo: {
        sdk: "https://player.vimeo.com/api/player.js",
        iframe: "https://player.vimeo.com/video/{0}?{1}",
        api: "https://vimeo.com/api/oembed.json?url={0}"
      },
      youtube: {
        sdk: "https://www.youtube.com/iframe_api",
        api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
      },
      googleIMA: {
        sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
      }
    },
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      fastForward: null,
      mute: null,
      volume: null,
      captions: null,
      download: null,
      fullscreen: null,
      pip: null,
      airplay: null,
      speed: null,
      quality: null,
      loop: null,
      language: null
    },
    events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
    selectors: {
      editable: "input, textarea, select, [contenteditable]",
      container: ".plyr",
      controls: {
        container: null,
        wrapper: ".plyr__controls"
      },
      labels: "[data-plyr]",
      buttons: {
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        fastForward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        download: '[data-plyr="download"]',
        fullscreen: '[data-plyr="fullscreen"]',
        pip: '[data-plyr="pip"]',
        airplay: '[data-plyr="airplay"]',
        settings: '[data-plyr="settings"]',
        loop: '[data-plyr="loop"]'
      },
      inputs: {
        seek: '[data-plyr="seek"]',
        volume: '[data-plyr="volume"]',
        speed: '[data-plyr="speed"]',
        language: '[data-plyr="language"]',
        quality: '[data-plyr="quality"]'
      },
      display: {
        currentTime: ".plyr__time--current",
        duration: ".plyr__time--duration",
        buffer: ".plyr__progress__buffer",
        loop: ".plyr__progress__loop",
        volume: ".plyr__volume--display"
      },
      progress: ".plyr__progress",
      captions: ".plyr__captions",
      caption: ".plyr__caption"
    },
    classNames: {
      type: "plyr--{0}",
      provider: "plyr--{0}",
      video: "plyr__video-wrapper",
      embed: "plyr__video-embed",
      videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
      embedContainer: "plyr__video-embed__container",
      poster: "plyr__poster",
      posterEnabled: "plyr__poster-enabled",
      ads: "plyr__ads",
      control: "plyr__control",
      controlPressed: "plyr__control--pressed",
      playing: "plyr--playing",
      paused: "plyr--paused",
      stopped: "plyr--stopped",
      loading: "plyr--loading",
      hover: "plyr--hover",
      tooltip: "plyr__tooltip",
      cues: "plyr__cues",
      hidden: "plyr__sr-only",
      hideControls: "plyr--hide-controls",
      isIos: "plyr--is-ios",
      isTouch: "plyr--is-touch",
      uiSupported: "plyr--full-ui",
      noTransition: "plyr--no-transition",
      display: {
        time: "plyr__time"
      },
      menu: {
        value: "plyr__menu__value",
        badge: "plyr__badge",
        open: "plyr--menu-open"
      },
      captions: {
        enabled: "plyr--captions-enabled",
        active: "plyr--captions-active"
      },
      fullscreen: {
        enabled: "plyr--fullscreen-enabled",
        fallback: "plyr--fullscreen-fallback"
      },
      pip: {
        supported: "plyr--pip-supported",
        active: "plyr--pip-active"
      },
      airplay: {
        supported: "plyr--airplay-supported",
        active: "plyr--airplay-active"
      },
      tabFocus: "plyr__tab-focus",
      previewThumbnails: {
        thumbContainer: "plyr__preview-thumb",
        thumbContainerShown: "plyr__preview-thumb--is-shown",
        imageContainer: "plyr__preview-thumb__image-container",
        timeContainer: "plyr__preview-thumb__time-container",
        scrubbingContainer: "plyr__preview-scrubbing",
        scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
      }
    },
    attributes: {
      embed: {
        provider: "data-plyr-provider",
        id: "data-plyr-embed-id",
        hash: "data-plyr-embed-hash"
      }
    },
    ads: {
      enabled: !1,
      publisherId: "",
      tagUrl: ""
    },
    previewThumbnails: {
      enabled: !1,
      src: ""
    },
    vimeo: {
      byline: !1,
      portrait: !1,
      title: !1,
      speed: !0,
      transparent: !1,
      customControls: !0,
      referrerPolicy: null,
      premium: !1
    },
    youtube: {
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      customControls: !0,
      noCookie: !1
    }
  },
      Xe = "picture-in-picture",
      Je = "inline",
      Ge = {
    html5: "html5",
    youtube: "youtube",
    vimeo: "vimeo"
  },
      Ze = "audio",
      et = "video";

  var tt = () => {};

  class it {
    constructor() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
    }

    get log() {
      return this.enabled ? Function.prototype.bind.call(console.log, console) : tt;
    }

    get warn() {
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : tt;
    }

    get error() {
      return this.enabled ? Function.prototype.bind.call(console.error, console) : tt;
    }

  }

  class st {
    constructor(t) {
      var _this2 = this;

      e(this, "onChange", () => {
        if (!this.enabled) return;
        var e = this.player.elements.buttons.fullscreen;
        H(e) && (e.pressed = this.active);
        var t = this.target === this.player.media ? this.target : this.player.elements.container;
        ve.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0);
      }), e(this, "toggleFallback", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

        if (e ? _this2.scrollPosition = {
          x: window.scrollX || 0,
          y: window.scrollY || 0
        } : window.scrollTo(_this2.scrollPosition.x, _this2.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", le(_this2.target, _this2.player.config.classNames.fullscreen.fallback, e), Y.isIos) {
          var _t12 = document.head.querySelector('meta[name="viewport"]');

          var _i7 = "viewport-fit=cover";
          _t12 || (_t12 = document.createElement("meta"), _t12.setAttribute("name", "viewport"));

          var _s10 = _(_t12.content) && _t12.content.includes(_i7);

          e ? (_this2.cleanupViewport = !_s10, _s10 || (_t12.content += ",".concat(_i7))) : _this2.cleanupViewport && (_t12.content = _t12.content.split(",").filter(e => e.trim() !== _i7).join(","));
        }

        _this2.onChange();
      }), e(this, "trapFocus", e => {
        if (Y.isIos || !this.active || "Tab" !== e.key || 9 !== e.keyCode) return;
        var t = document.activeElement,
            i = ce.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
            [s] = i,
            n = i[i.length - 1];
        t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault());
      }), e(this, "update", () => {
        if (this.enabled) {
          var _e22;

          _e22 = this.forceFallback ? "Fallback (forced)" : st.native ? "Native" : "Fallback", this.player.debug.log("".concat(_e22, " fullscreen enabled"));
        } else this.player.debug.log("Fullscreen not supported and fallback disabled");

        le(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
      }), e(this, "enter", () => {
        this.enabled && (Y.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !st.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? W(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({
          navigationUI: "hide"
        }));
      }), e(this, "exit", () => {
        if (this.enabled) if (Y.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), ke(this.player.play());else if (!st.native || this.forceFallback) this.toggleFallback(!1);else if (this.prefix) {
          if (!W(this.prefix)) {
            var _e23 = "moz" === this.prefix ? "Cancel" : "Exit";

            document["".concat(this.prefix).concat(_e23).concat(this.property)]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      }), e(this, "toggle", () => {
        this.active ? this.exit() : this.enter();
      }), this.player = t, this.prefix = st.prefix, this.property = st.property, this.scrollPosition = {
        x: 0,
        y: 0
      }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) {
        var {
          prototype: i
        } = Element;
        return (i.closest || function () {
          var e = this;

          do {
            if (re.matches(e, t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);

          return null;
        }).call(e, t);
      }(this.player.elements.container, t.config.fullscreen.container), fe.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), () => {
        this.onChange();
      }), fe.call(this.player, this.player.elements.container, "dblclick", e => {
        H(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen");
      }), fe.call(this, this.player.elements.container, "keydown", e => this.trapFocus(e)), this.update();
    }

    static get native() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }

    get usingNative() {
      return st.native && !this.forceFallback;
    }

    static get prefix() {
      if (j(document.exitFullscreen)) return "";
      var e = "";
      return ["webkit", "moz", "ms"].some(t => !(!j(document["".concat(t, "ExitFullscreen")]) && !j(document["".concat(t, "CancelFullScreen")])) && (e = t, !0)), e;
    }

    static get property() {
      return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
    }

    get enabled() {
      return (st.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
    }

    get active() {
      if (!this.enabled) return !1;
      if (!st.native || this.forceFallback) return oe(this.target, this.player.config.classNames.fullscreen.fallback);
      var e = this.prefix ? this.target.getRootNode()["".concat(this.prefix).concat(this.property, "Element")] : this.target.getRootNode().fullscreenElement;
      return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
    }

    get target() {
      return Y.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
    }

  }

  function nt(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return new Promise((i, s) => {
      var n = new Image(),
          a = () => {
        delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
      };

      Object.assign(n, {
        onload: a,
        onerror: a,
        src: e
      });
    });
  }

  var at = {
    addStyleHook() {
      le(this.elements.container, this.config.selectors.container.replace(".", ""), !0), le(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },

    toggleNativeControls() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    },

    build() {
      if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void at.toggleNativeControls.call(this, !0);
      H(this.elements.controls) || (We.inject.call(this), this.listeners.controls()), at.toggleNativeControls.call(this), this.isHTML5 && Ye.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, We.updateVolume.call(this), We.timeUpdate.call(this), We.durationUpdate.call(this), at.checkPlaying.call(this), le(this.elements.container, this.config.classNames.pip.supported, me.pip && this.isHTML5 && this.isVideo), le(this.elements.container, this.config.classNames.airplay.supported, me.airplay && this.isHTML5), le(this.elements.container, this.config.classNames.isIos, Y.isIos), le(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(() => {
        ve.call(this, this.media, "ready");
      }, 0), at.setTitle.call(this), this.poster && at.setPoster.call(this, this.poster, !1).catch(() => {}), this.config.duration && We.durationUpdate.call(this);
    },

    setTitle() {
      var e = He.get("play", this.config);

      if (_(this.config.title) && !W(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(t => {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        var _e24 = he.call(this, "iframe");

        if (!H(_e24)) return;

        var _t13 = W(this.config.title) ? "video" : this.config.title,
            _i8 = He.get("frameTitle", this.config);

        _e24.setAttribute("title", _i8.replace("{title}", _t13));
      }
    },

    togglePoster(e) {
      le(this.elements.container, this.config.classNames.posterEnabled, e);
    },

    setPoster(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), Te.call(this).then(() => nt(e)).catch(t => {
        throw e === this.poster && at.togglePoster.call(this, !1), t;
      }).then(() => {
        if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(() => (Object.assign(this.elements.poster.style, {
        backgroundImage: "url('".concat(e, "')"),
        backgroundSize: ""
      }), at.togglePoster.call(this, !0), e)));
    },

    checkPlaying(e) {
      le(this.elements.container, this.config.classNames.playing, this.playing), le(this.elements.container, this.config.classNames.paused, this.paused), le(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(e => {
        Object.assign(e, {
          pressed: this.playing
        }), e.setAttribute("aria-label", He.get(this.playing ? "pause" : "play", this.config));
      }), F(e) && "timeupdate" === e.type || at.toggleControls.call(this);
    },

    checkLoading(e) {
      this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
        le(this.elements.container, this.config.classNames.loading, this.loading), at.toggleControls.call(this);
      }, this.loading ? 250 : 0);
    },

    toggleControls(e) {
      var {
        controls: t
      } = this.elements;

      if (t && this.config.hideControls) {
        var _i9 = this.touch && this.lastSeekTime + 2e3 > Date.now();

        this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || _i9));
      }
    },

    migrateStyles() {
      Object.values(_objectSpread({}, this.media.style)).filter(e => !W(e) && _(e) && e.startsWith("--plyr")).forEach(e => {
        this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e);
      }), W(this.media.style) && this.media.removeAttribute("style");
    }

  };

  class lt {
    constructor(t) {
      var _this3 = this;

      e(this, "firstTouch", () => {
        var {
          player: e
        } = this,
            {
          elements: t
        } = e;
        e.touch = !0, le(t.container, e.config.classNames.isTouch, !0);
      }), e(this, "setTabFocus", e => {
        var {
          player: t
        } = this,
            {
          elements: i
        } = t;
        if (clearTimeout(this.focusTimer), "keydown" === e.type && 9 !== e.which) return;
        "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
        var s = e.timeStamp - this.lastKeyDown <= 20;
        ("focus" !== e.type || s) && ((() => {
          var e = t.config.classNames.tabFocus;
          le(ce.call(t, ".".concat(e)), e, !1);
        })(), "focusout" !== e.type && (this.focusTimer = setTimeout(() => {
          var e = document.activeElement;
          i.container.contains(e) && le(document.activeElement, t.config.classNames.tabFocus, !0);
        }, 10)));
      }), e(this, "global", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        var {
          player: t
        } = _this3;
        t.config.keyboard.global && ge.call(t, window, "keydown keyup", _this3.handleKey, e, !1), ge.call(t, document.body, "click", _this3.toggleMenu, e), ye.call(t, document.body, "touchstart", _this3.firstTouch), ge.call(t, document.body, "keydown focus blur focusout", _this3.setTabFocus, e, !1, !0);
      }), e(this, "container", () => {
        var {
          player: e
        } = this,
            {
          config: t,
          elements: i,
          timers: s
        } = e;
        !t.keyboard.global && t.keyboard.focused && fe.call(e, i.container, "keydown keyup", this.handleKey, !1), fe.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", t => {
          var {
            controls: n
          } = i;
          n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
          var a = 0;
          ["touchstart", "touchmove", "mousemove"].includes(t.type) && (at.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => at.toggleControls.call(e, !1), a);
        });

        var n = () => {
          if (!e.isVimeo || e.config.vimeo.premium) return;
          var t = i.wrapper,
              {
            active: s
          } = e.fullscreen,
              [n, a] = xe.call(e),
              l = Se("aspect-ratio: ".concat(n, " / ").concat(a));
          if (!s) return void (l ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));
          var [o, r] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)],
              c = o / r > n / a;
          l ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? r / a * n + "px" : null, t.style.margin = c ? "0 auto" : null);
        },
            a = () => {
          clearTimeout(s.resized), s.resized = setTimeout(n, 50);
        };

        fe.call(e, i.container, "enterfullscreen exitfullscreen", t => {
          var {
            target: s
          } = e.fullscreen;
          if (s !== i.container) return;
          if (!e.isEmbed && W(e.config.ratio)) return;
          n();
          ("enterfullscreen" === t.type ? fe : be).call(e, window, "resize", a);
        });
      }), e(this, "media", () => {
        var {
          player: e
        } = this,
            {
          elements: t
        } = e;

        if (fe.call(e, e.media, "timeupdate seeking seeked", t => We.timeUpdate.call(e, t)), fe.call(e, e.media, "durationchange loadeddata loadedmetadata", t => We.durationUpdate.call(e, t)), fe.call(e, e.media, "ended", () => {
          e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause());
        }), fe.call(e, e.media, "progress playing seeking seeked", t => We.updateProgress.call(e, t)), fe.call(e, e.media, "volumechange", t => We.updateVolume.call(e, t)), fe.call(e, e.media, "playing play pause ended emptied timeupdate", t => at.checkPlaying.call(e, t)), fe.call(e, e.media, "waiting canplay seeked playing", t => at.checkLoading.call(e, t)), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
          var _i10 = he.call(e, ".".concat(e.config.classNames.video));

          if (!H(_i10)) return;
          fe.call(e, t.container, "click", s => {
            ([t.container, _i10].includes(s.target) || _i10.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (this.proxy(s, e.restart, "restart"), this.proxy(s, () => {
              ke(e.play());
            }, "play")) : this.proxy(s, () => {
              ke(e.togglePlay());
            }, "play")));
          });
        }

        e.supported.ui && e.config.disableContextMenu && fe.call(e, t.wrapper, "contextmenu", e => {
          e.preventDefault();
        }, !1), fe.call(e, e.media, "volumechange", () => {
          e.storage.set({
            volume: e.volume,
            muted: e.muted
          });
        }), fe.call(e, e.media, "ratechange", () => {
          We.updateSetting.call(e, "speed"), e.storage.set({
            speed: e.speed
          });
        }), fe.call(e, e.media, "qualitychange", t => {
          We.updateSetting.call(e, "quality", null, t.detail.quality);
        }), fe.call(e, e.media, "ready qualitychange", () => {
          We.setDownloadUrl.call(e);
        });
        var i = e.config.events.concat(["keyup", "keydown"]).join(" ");
        fe.call(e, e.media, i, i => {
          var {
            detail: s = {}
          } = i;
          "error" === i.type && (s = e.media.error), ve.call(e, t.container, i.type, !0, s);
        });
      }), e(this, "proxy", (e, t, i) => {
        var {
          player: s
        } = this,
            n = s.config.listeners[i];
        var a = !0;
        j(n) && (a = n.call(s, e)), !1 !== a && j(t) && t.call(s, e);
      }), e(this, "bind", function (e, t, i, s) {
        var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
        var {
          player: a
        } = _this3,
            l = a.config.listeners[s],
            o = j(l);
        fe.call(a, e, t, e => _this3.proxy(e, i, s), n && !o);
      }), e(this, "controls", () => {
        var {
          player: e
        } = this,
            {
          elements: t
        } = e,
            i = Y.isIE ? "change" : "input";

        if (t.buttons.play && Array.from(t.buttons.play).forEach(t => {
          this.bind(t, "click", () => {
            ke(e.togglePlay());
          }, "play");
        }), this.bind(t.buttons.restart, "click", e.restart, "restart"), this.bind(t.buttons.rewind, "click", () => {
          e.lastSeekTime = Date.now(), e.rewind();
        }, "rewind"), this.bind(t.buttons.fastForward, "click", () => {
          e.lastSeekTime = Date.now(), e.forward();
        }, "fastForward"), this.bind(t.buttons.mute, "click", () => {
          e.muted = !e.muted;
        }, "mute"), this.bind(t.buttons.captions, "click", () => e.toggleCaptions()), this.bind(t.buttons.download, "click", () => {
          ve.call(e, e.media, "download");
        }, "download"), this.bind(t.buttons.fullscreen, "click", () => {
          e.fullscreen.toggle();
        }, "fullscreen"), this.bind(t.buttons.pip, "click", () => {
          e.pip = "toggle";
        }, "pip"), this.bind(t.buttons.airplay, "click", e.airplay, "airplay"), this.bind(t.buttons.settings, "click", t => {
          t.stopPropagation(), t.preventDefault(), We.toggleMenu.call(e, t);
        }, null, !1), this.bind(t.buttons.settings, "keyup", t => {
          var i = t.which;
          [13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), We.toggleMenu.call(e, t)) : We.focusFirstMenuItem.call(e, null, !0));
        }, null, !1), this.bind(t.settings.menu, "keydown", t => {
          27 === t.which && We.toggleMenu.call(e, t);
        }), this.bind(t.inputs.seek, "mousedown mousemove", e => {
          var i = t.progress.getBoundingClientRect(),
              s = 100 / i.width * (e.pageX - i.left);
          e.currentTarget.setAttribute("seek-value", s);
        }), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", t => {
          var i = t.currentTarget,
              s = t.keyCode ? t.keyCode : t.which,
              n = "play-on-seeked";
          if (R(t) && 39 !== s && 37 !== s) return;
          e.lastSeekTime = Date.now();
          var a = i.hasAttribute(n),
              l = ["mouseup", "touchend", "keyup"].includes(t.type);
          a && l ? (i.removeAttribute(n), ke(e.play())) : !l && e.playing && (i.setAttribute(n, ""), e.pause());
        }), Y.isIos) {
          var _t14 = ce.call(e, 'input[type="range"]');

          Array.from(_t14).forEach(e => this.bind(e, i, e => K(e.target)));
        }

        this.bind(t.inputs.seek, i, t => {
          var i = t.currentTarget;
          var s = i.getAttribute("seek-value");
          W(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration;
        }, "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", t => We.updateSeekTooltip.call(e, t)), this.bind(t.progress, "mousemove touchmove", t => {
          var {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startMove(t);
        }), this.bind(t.progress, "mouseleave touchend click", () => {
          var {
            previewThumbnails: t
          } = e;
          t && t.loaded && t.endMove(!1, !0);
        }), this.bind(t.progress, "mousedown touchstart", t => {
          var {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startScrubbing(t);
        }), this.bind(t.progress, "mouseup touchend", t => {
          var {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.endScrubbing(t);
        }), Y.isWebkit && Array.from(ce.call(e, 'input[type="range"]')).forEach(t => {
          this.bind(t, "input", t => We.updateRangeFill.call(e, t.target));
        }), e.config.toggleInvert && !H(t.display.duration) && this.bind(t.display.currentTime, "click", () => {
          0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, We.timeUpdate.call(e));
        }), this.bind(t.inputs.volume, i, t => {
          e.volume = t.target.value;
        }, "volume"), this.bind(t.controls, "mouseenter mouseleave", i => {
          t.controls.hover = !e.touch && "mouseenter" === i.type;
        }), t.fullscreen && Array.from(t.fullscreen.children).filter(e => !e.contains(t.container)).forEach(i => {
          this.bind(i, "mouseenter mouseleave", i => {
            t.controls && (t.controls.hover = !e.touch && "mouseenter" === i.type);
          });
        }), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", e => {
          t.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), this.bind(t.controls, "focusin", () => {
          var {
            config: i,
            timers: s
          } = e;
          le(t.controls, i.classNames.noTransition, !0), at.toggleControls.call(e, !0), setTimeout(() => {
            le(t.controls, i.classNames.noTransition, !1);
          }, 0);
          var n = this.touch ? 3e3 : 4e3;
          clearTimeout(s.controls), s.controls = setTimeout(() => at.toggleControls.call(e, !1), n);
        }), this.bind(t.inputs.volume, "wheel", t => {
          var i = t.webkitDirectionInvertedFromDevice,
              [s, n] = [t.deltaX, -t.deltaY].map(e => i ? -e : e),
              a = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
          e.increaseVolume(a / 50);
          var {
            volume: l
          } = e.media;
          (1 === a && l < 1 || -1 === a && l > 0) && t.preventDefault();
        }, "volume", !1);
      }), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }

    handleKey(e) {
      var {
        player: t
      } = this,
          {
        elements: i
      } = t,
          s = e.keyCode ? e.keyCode : e.which,
          n = "keydown" === e.type,
          a = n && s === this.lastKey;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!$(s)) return;

      if (n) {
        var _n5 = document.activeElement;

        if (H(_n5)) {
          var {
            editable: _s11
          } = t.config.selectors,
              {
            seek: _a4
          } = i.inputs;
          if (_n5 !== _a4 && re(_n5, _s11)) return;
          if (32 === e.which && re(_n5, 'button, [role^="menuitem"]')) return;
        }

        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            a || (t.currentTime = t.duration / 10 * (s - 48));
            break;

          case 32:
          case 75:
            a || ke(t.togglePlay());
            break;

          case 38:
            t.increaseVolume(.1);
            break;

          case 40:
            t.decreaseVolume(.1);
            break;

          case 77:
            a || (t.muted = !t.muted);
            break;

          case 39:
            t.forward();
            break;

          case 37:
            t.rewind();
            break;

          case 70:
            t.fullscreen.toggle();
            break;

          case 67:
            a || t.toggleCaptions();
            break;

          case 76:
            t.loop = !t.loop;
        }

        27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
      } else this.lastKey = null;
    }

    toggleMenu(e) {
      We.toggleMenu.call(this.player, e);
    }

  }

  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self && self;

  var ot = function (e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }(function (e, t) {
    e.exports = function () {
      var e = function e() {},
          t = {},
          i = {},
          s = {};

      function n(e, t) {
        e = e.push ? e : [e];
        var n,
            a,
            l,
            o = [],
            r = e.length,
            c = r;

        for (n = function n(e, i) {
          i.length && o.push(e), --c || t(o);
        }; r--;) {
          a = e[r], (l = i[a]) ? n(a, l) : (s[a] = s[a] || []).push(n);
        }
      }

      function a(e, t) {
        if (e) {
          var n = s[e];
          if (i[e] = t, n) for (; n.length;) {
            n[0](e, t), n.splice(0, 1);
          }
        }
      }

      function l(t, i) {
        t.call && (t = {
          success: t
        }), i.length ? (t.error || e)(i) : (t.success || e)(t);
      }

      function o(t, i, s, n) {
        var a,
            l,
            r = document,
            c = s.async,
            h = (s.numRetries || 0) + 1,
            u = s.before || e,
            d = t.replace(/[\?|#].*$/, ""),
            m = t.replace(/^(css|img)!/, "");
        n = n || 0, /(^css!|\.css$)/.test(d) ? ((l = r.createElement("link")).rel = "stylesheet", l.href = m, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (l = r.createElement("img")).src = m : ((l = r.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function (e) {
          var r = e.type[0];
          if (a) try {
            l.sheet.cssText.length || (r = "e");
          } catch (e) {
            18 != e.code && (r = "e");
          }

          if ("e" == r) {
            if ((n += 1) < h) return o(t, i, s, n);
          } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";

          i(t, r, e.defaultPrevented);
        }, !1 !== u(t, l) && r.head.appendChild(l);
      }

      function r(e, t, i) {
        var s,
            n,
            a = (e = e.push ? e : [e]).length,
            l = a,
            r = [];

        for (s = function s(e, i, _s12) {
          if ("e" == i && r.push(e), "b" == i) {
            if (!_s12) return;
            r.push(e);
          }

          --a || t(r);
        }, n = 0; n < l; n++) {
          o(e[n], s, i);
        }
      }

      function c(e, i, s) {
        var n, o;

        if (i && i.trim && (n = i), o = (n ? s : i) || {}, n) {
          if (n in t) throw "LoadJS";
          t[n] = !0;
        }

        function c(t, i) {
          r(e, function (e) {
            l(o, e), t && l({
              success: t,
              error: i
            }, e), a(n, e);
          }, o);
        }

        if (o.returnPromise) return new Promise(c);
        c();
      }

      return c.ready = function (e, t) {
        return n(e, function (e) {
          l(t, e);
        }), c;
      }, c.done = function (e) {
        a(e, []);
      }, c.reset = function () {
        t = {}, i = {}, s = {};
      }, c.isDefined = function (e) {
        return e in t;
      }, c;
    }();
  });

  function rt(e) {
    return new Promise((t, i) => {
      ot(e, {
        success: t,
        error: i
      });
    });
  }

  function ct(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  var ht = {
    setup() {
      var e = this;
      le(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Me.call(e), L(window.Vimeo) ? ht.ready.call(e) : rt(e.config.urls.vimeo.sdk).then(() => {
        ht.ready.call(e);
      }).catch(t => {
        e.debug.warn("Vimeo SDK (player.js) failed to load", t);
      });
    },

    ready() {
      var e = this,
          t = e.config.vimeo,
          {
        premium: i,
        referrerPolicy: s
      } = t,
          n = _objectWithoutProperties(t, _excluded);

      var a = e.media.getAttribute("src"),
          l = "";
      W(a) ? (a = e.media.getAttribute(e.config.attributes.embed.id), l = e.media.getAttribute(e.config.attributes.embed.hash)) : l = function (e) {
        var t = e.match( /*#__PURE__*/_wrapRegExp(/^.*(?:vimeo.com\/|video\/)(?:[0-9]+)(?:\?.*&*h=|\/)+([,0-9a-f]+)/, {
          hash: 1
        }));
        return t ? t.groups.hash : null;
      }(a);
      var o = l ? {
        h: l
      } : {};
      i && Object.assign(n, {
        controls: !1,
        sidedock: !1
      });
      var r = Ke(_objectSpread(_objectSpread({
        loop: e.config.loop.active,
        autoplay: e.autoplay,
        muted: e.muted,
        gesture: "media",
        playsinline: !this.config.fullscreen.iosNative
      }, o), n)),
          c = W(h = a) ? null : $(Number(h)) ? h : h.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : h;
      var h;
      var u = Z("iframe"),
          d = $e(e.config.urls.vimeo.iframe, c, r);
      if (u.setAttribute("src", d), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(s) || u.setAttribute("referrerPolicy", s), i || !t.customControls) u.setAttribute("data-poster", e.poster), e.media = se(u, e.media);else {
        var _t15 = Z("div", {
          class: e.config.classNames.embedContainer,
          "data-poster": e.poster
        });

        _t15.appendChild(u), e.media = se(_t15, e.media);
      }
      t.customControls || Re($e(e.config.urls.vimeo.api, d)).then(t => {
        !W(t) && t.thumbnail_url && at.setPoster.call(e, t.thumbnail_url).catch(() => {});
      }), e.embed = new window.Vimeo.Player(u, {
        autopause: e.config.autopause,
        muted: e.muted
      }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (ct.call(e, !0), e.embed.play()), e.media.pause = () => (ct.call(e, !1), e.embed.pause()), e.media.stop = () => {
        e.pause(), e.currentTime = 0;
      };
      var {
        currentTime: m
      } = e.media;
      Object.defineProperty(e.media, "currentTime", {
        get: () => m,

        set(t) {
          var {
            embed: i,
            media: s,
            paused: n,
            volume: a
          } = e,
              l = n && !i.hasPlayed;
          s.seeking = !0, ve.call(e, s, "seeking"), Promise.resolve(l && i.setVolume(0)).then(() => i.setCurrentTime(t)).then(() => l && i.pause()).then(() => l && i.setVolume(a)).catch(() => {});
        }

      });
      var p = e.config.speed.selected;
      Object.defineProperty(e.media, "playbackRate", {
        get: () => p,

        set(t) {
          e.embed.setPlaybackRate(t).then(() => {
            p = t, ve.call(e, e.media, "ratechange");
          }).catch(() => {
            e.options.speed = [1];
          });
        }

      });
      var {
        volume: g
      } = e.config;
      Object.defineProperty(e.media, "volume", {
        get: () => g,

        set(t) {
          e.embed.setVolume(t).then(() => {
            g = t, ve.call(e, e.media, "volumechange");
          });
        }

      });
      var {
        muted: f
      } = e.config;
      Object.defineProperty(e.media, "muted", {
        get: () => f,

        set(t) {
          var i = !!O(t) && t;
          e.embed.setVolume(i ? 0 : e.config.volume).then(() => {
            f = i, ve.call(e, e.media, "volumechange");
          });
        }

      });
      var b,
          {
        loop: y
      } = e.config;
      Object.defineProperty(e.media, "loop", {
        get: () => y,

        set(t) {
          var i = O(t) ? t : e.config.loop.active;
          e.embed.setLoop(i).then(() => {
            y = i;
          });
        }

      }), e.embed.getVideoUrl().then(t => {
        b = t, We.setDownloadUrl.call(e);
      }).catch(e => {
        this.debug.warn(e);
      }), Object.defineProperty(e.media, "currentSrc", {
        get: () => b
      }), Object.defineProperty(e.media, "ended", {
        get: () => e.currentTime === e.duration
      }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(t => {
        var [i, s] = t;
        e.embed.ratio = Ie(i, s), Me.call(this);
      }), e.embed.setAutopause(e.config.autopause).then(t => {
        e.config.autopause = t;
      }), e.embed.getVideoTitle().then(t => {
        e.config.title = t, at.setTitle.call(this);
      }), e.embed.getCurrentTime().then(t => {
        m = t, ve.call(e, e.media, "timeupdate");
      }), e.embed.getDuration().then(t => {
        e.media.duration = t, ve.call(e, e.media, "durationchange");
      }), e.embed.getTextTracks().then(t => {
        e.media.textTracks = t, Ye.setup.call(e);
      }), e.embed.on("cuechange", _ref8 => {
        var {
          cues: t = []
        } = _ref8;
        var i = t.map(e => function (e) {
          var t = document.createDocumentFragment(),
              i = document.createElement("div");
          return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
        }(e.text));
        Ye.updateCues.call(e, i);
      }), e.embed.on("loaded", () => {
        if (e.embed.getPaused().then(t => {
          ct.call(e, !t), t || ve.call(e, e.media, "playing");
        }), H(e.embed.element) && e.supported.ui) {
          e.embed.element.setAttribute("tabindex", -1);
        }
      }), e.embed.on("bufferstart", () => {
        ve.call(e, e.media, "waiting");
      }), e.embed.on("bufferend", () => {
        ve.call(e, e.media, "playing");
      }), e.embed.on("play", () => {
        ct.call(e, !0), ve.call(e, e.media, "playing");
      }), e.embed.on("pause", () => {
        ct.call(e, !1);
      }), e.embed.on("timeupdate", t => {
        e.media.seeking = !1, m = t.seconds, ve.call(e, e.media, "timeupdate");
      }), e.embed.on("progress", t => {
        e.media.buffered = t.percent, ve.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && ve.call(e, e.media, "canplaythrough"), e.embed.getDuration().then(t => {
          t !== e.media.duration && (e.media.duration = t, ve.call(e, e.media, "durationchange"));
        });
      }), e.embed.on("seeked", () => {
        e.media.seeking = !1, ve.call(e, e.media, "seeked");
      }), e.embed.on("ended", () => {
        e.media.paused = !0, ve.call(e, e.media, "ended");
      }), e.embed.on("error", t => {
        e.media.error = t, ve.call(e, e.media, "error");
      }), t.customControls && setTimeout(() => at.build.call(e), 0);
    }

  };

  function ut(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  function dt(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
  }

  var mt = {
    setup() {
      if (le(this.elements.wrapper, this.config.classNames.embed, !0), L(window.YT) && j(window.YT.Player)) mt.ready.call(this);else {
        var _e25 = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          j(_e25) && _e25(), mt.ready.call(this);
        }, rt(this.config.urls.youtube.sdk).catch(e => {
          this.debug.warn("YouTube API failed to load", e);
        });
      }
    },

    getTitle(e) {
      Re($e(this.config.urls.youtube.api, e)).then(e => {
        if (L(e)) {
          var {
            title: _t16,
            height: _i11,
            width: _s13
          } = e;
          this.config.title = _t16, at.setTitle.call(this), this.embed.ratio = Ie(_s13, _i11);
        }

        Me.call(this);
      }).catch(() => {
        Me.call(this);
      });
    },

    ready() {
      var e = this,
          t = e.config.youtube,
          i = e.media && e.media.getAttribute("id");
      if (!W(i) && i.startsWith("youtube-")) return;
      var s = e.media.getAttribute("src");
      W(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
      var n = W(a = s) ? null : a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : a;
      var a;
      var l = Z("div", {
        id: "".concat(e.provider, "-").concat(Math.floor(1e4 * Math.random())),
        "data-poster": t.customControls ? e.poster : void 0
      });

      if (e.media = se(l, e.media), t.customControls) {
        var _t17 = e => "https://i.ytimg.com/vi/".concat(n, "/").concat(e, "default.jpg");

        nt(_t17("maxres"), 121).catch(() => nt(_t17("sd"), 121)).catch(() => nt(_t17("hq"))).then(t => at.setPoster.call(e, t.src)).then(t => {
          t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
        }).catch(() => {});
      }

      e.embed = new window.YT.Player(e.media, {
        videoId: n,
        host: dt(t),
        playerVars: X({}, {
          autoplay: e.config.autoplay ? 1 : 0,
          hl: e.config.hl,
          controls: e.supported.ui && t.customControls ? 0 : 1,
          disablekb: 1,
          playsinline: e.config.fullscreen.iosNative ? 0 : 1,
          cc_load_policy: e.captions.active ? 1 : 0,
          cc_lang_pref: e.config.captions.language,
          widget_referrer: window ? window.location.href : null
        }, t),
        events: {
          onError(t) {
            if (!e.media.error) {
              var _i12 = t.data,
                  _s14 = {
                2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                101: "The owner of the requested video does not allow it to be played in embedded players.",
                150: "The owner of the requested video does not allow it to be played in embedded players."
              }[_i12] || "An unknown error occured";

              e.media.error = {
                code: _i12,
                message: _s14
              }, ve.call(e, e.media, "error");
            }
          },

          onPlaybackRateChange(t) {
            var i = t.target;
            e.media.playbackRate = i.getPlaybackRate(), ve.call(e, e.media, "ratechange");
          },

          onReady(i) {
            if (j(e.media.play)) return;
            var s = i.target;
            mt.getTitle.call(e, n), e.media.play = () => {
              ut.call(e, !0), s.playVideo();
            }, e.media.pause = () => {
              ut.call(e, !1), s.pauseVideo();
            }, e.media.stop = () => {
              s.stopVideo();
            }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
              get: () => Number(s.getCurrentTime()),

              set(t) {
                e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call(e, e.media, "seeking"), s.seekTo(t);
              }

            }), Object.defineProperty(e.media, "playbackRate", {
              get: () => s.getPlaybackRate(),

              set(e) {
                s.setPlaybackRate(e);
              }

            });
            var {
              volume: a
            } = e.config;
            Object.defineProperty(e.media, "volume", {
              get: () => a,

              set(t) {
                a = t, s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }

            });
            var {
              muted: l
            } = e.config;
            Object.defineProperty(e.media, "muted", {
              get: () => l,

              set(t) {
                var i = O(t) ? t : l;
                l = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }

            }), Object.defineProperty(e.media, "currentSrc", {
              get: () => s.getVideoUrl()
            }), Object.defineProperty(e.media, "ended", {
              get: () => e.currentTime === e.duration
            });
            var o = s.getAvailablePlaybackRates();
            e.options.speed = o.filter(t => e.config.speed.options.includes(t)), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), ve.call(e, e.media, "timeupdate"), ve.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(() => {
              e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ve.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ve.call(e, e.media, "canplaythrough"));
            }, 200), t.customControls && setTimeout(() => at.build.call(e), 50);
          },

          onStateChange(i) {
            var s = i.target;
            clearInterval(e.timers.playing);

            switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, ve.call(e, e.media, "seeked")), i.data) {
              case -1:
                ve.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), ve.call(e, e.media, "progress");
                break;

              case 0:
                ut.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : ve.call(e, e.media, "ended");
                break;

              case 1:
                t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (ut.call(e, !0), ve.call(e, e.media, "playing"), e.timers.playing = setInterval(() => {
                  ve.call(e, e.media, "timeupdate");
                }, 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), ve.call(e, e.media, "durationchange")));
                break;

              case 2:
                e.muted || e.embed.unMute(), ut.call(e, !1);
                break;

              case 3:
                ve.call(e, e.media, "waiting");
            }

            ve.call(e, e.elements.container, "statechange", !1, {
              code: i.data
            });
          }

        }
      });
    }

  },
      pt = {
    setup() {
      this.media ? (le(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), le(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && le(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Z("div", {
        class: this.config.classNames.video
      }), J(this.media, this.elements.wrapper), this.elements.poster = Z("div", {
        class: this.config.classNames.poster
      }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Le.setup.call(this) : this.isYouTube ? mt.setup.call(this) : this.isVimeo && ht.setup.call(this)) : this.debug.warn("No media element found!");
    }

  };

  class gt {
    constructor(t) {
      var _this4 = this;

      e(this, "load", () => {
        this.enabled && (L(window.google) && L(window.google.ima) ? this.ready() : rt(this.player.config.urls.googleIMA.sdk).then(() => {
          this.ready();
        }).catch(() => {
          this.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      }), e(this, "ready", () => {
        var e;
        this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
          this.clearSafetyTimer("onAdsManagerLoaded()");
        }), this.listeners(), this.setupIMA();
      }), e(this, "setupIMA", () => {
        this.elements.container = Z("div", {
          class: this.player.config.classNames.ads
        }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e => this.onAdsManagerLoaded(e), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e), !1), this.requestAds();
      }), e(this, "requestAds", () => {
        var {
          container: e
        } = this.player.elements;

        try {
          var _t18 = new google.ima.AdsRequest();

          _t18.adTagUrl = this.tagUrl, _t18.linearAdSlotWidth = e.offsetWidth, _t18.linearAdSlotHeight = e.offsetHeight, _t18.nonLinearAdSlotWidth = e.offsetWidth, _t18.nonLinearAdSlotHeight = e.offsetHeight, _t18.forceNonLinearFullSlot = !1, _t18.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(_t18);
        } catch (e) {
          this.onAdError(e);
        }
      }), e(this, "pollCountdown", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        if (!e) return clearInterval(_this4.countdownTimer), void _this4.elements.container.removeAttribute("data-badge-text");
        _this4.countdownTimer = setInterval(() => {
          var e = Ue(Math.max(_this4.manager.getRemainingTime(), 0)),
              t = "".concat(He.get("advertisement", _this4.player.config), " - ").concat(e);

          _this4.elements.container.setAttribute("data-badge-text", t);
        }, 100);
      }), e(this, "onAdsManagerLoaded", e => {
        if (!this.enabled) return;
        var t = new google.ima.AdsRenderingSettings();
        t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e)), Object.keys(google.ima.AdEvent.Type).forEach(e => {
          this.manager.addEventListener(google.ima.AdEvent.Type[e], e => this.onAdEvent(e));
        }), this.trigger("loaded");
      }), e(this, "addCuePoints", () => {
        W(this.cuePoints) || this.cuePoints.forEach(e => {
          if (0 !== e && -1 !== e && e < this.player.duration) {
            var _t19 = this.player.elements.progress;

            if (H(_t19)) {
              var _i13 = 100 / this.player.duration * e,
                  _s15 = Z("span", {
                class: this.player.config.classNames.cues
              });

              _s15.style.left = "".concat(_i13.toString(), "%"), _t19.appendChild(_s15);
            }
          }
        });
      }), e(this, "onAdEvent", e => {
        var {
          container: t
        } = this.player.elements,
            i = e.getAd(),
            s = e.getAdData();

        switch ((e => {
          ve.call(this.player, this.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()));
        })(e.type), e.type) {
          case google.ima.AdEvent.Type.LOADED:
            this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
            break;

          case google.ima.AdEvent.Type.STARTED:
            this.manager.setVolume(this.player.volume);
            break;

          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            this.player.ended ? this.loadAds() : this.loader.contentComplete();
            break;

          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            this.pauseContent();
            break;

          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            this.pollCountdown(), this.resumeContent();
            break;

          case google.ima.AdEvent.Type.LOG:
            s.adError && this.player.debug.warn("Non-fatal ad error: ".concat(s.adError.getMessage()));
        }
      }), e(this, "onAdError", e => {
        this.cancel(), this.player.debug.warn("Ads error", e);
      }), e(this, "listeners", () => {
        var {
          container: e
        } = this.player.elements;
        var t;
        this.player.on("canplay", () => {
          this.addCuePoints();
        }), this.player.on("ended", () => {
          this.loader.contentComplete();
        }), this.player.on("timeupdate", () => {
          t = this.player.currentTime;
        }), this.player.on("seeked", () => {
          var e = this.player.currentTime;
          W(this.cuePoints) || this.cuePoints.forEach((i, s) => {
            t < i && i < e && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1));
          });
        }), window.addEventListener("resize", () => {
          this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      }), e(this, "play", () => {
        var {
          container: e
        } = this.player.elements;
        this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
          this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();

          try {
            this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0;
          } catch (e) {
            this.onAdError(e);
          }
        }).catch(() => {});
      }), e(this, "resumeContent", () => {
        this.elements.container.style.zIndex = "", this.playing = !1, ke(this.player.media.play());
      }), e(this, "pauseContent", () => {
        this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
      }), e(this, "cancel", () => {
        this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
      }), e(this, "loadAds", () => {
        this.managerPromise.then(() => {
          this.manager && this.manager.destroy(), this.managerPromise = new Promise(e => {
            this.on("loaded", e), this.player.debug.log(this.manager);
          }), this.initialized = !1, this.requestAds();
        }).catch(() => {});
      }), e(this, "trigger", function (e) {
        for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          t[_key4 - 1] = arguments[_key4];
        }

        var i = _this4.events[e];
        q(i) && i.forEach(e => {
          j(e) && e.apply(_this4, t);
        });
      }), e(this, "on", (e, t) => (q(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this)), e(this, "startSafetyTimer", (e, t) => {
        this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(() => {
          this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
        }, e);
      }), e(this, "clearSafetyTimer", e => {
        I(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null);
      }), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
        container: null,
        displayContainer: null
      }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e, t) => {
        this.on("loaded", e), this.on("error", t);
      }), this.load();
    }

    get enabled() {
      var {
        config: e
      } = this;
      return this.player.isHTML5 && this.player.isVideo && e.enabled && (!W(e.publisherId) || U(e.tagUrl));
    }

    get tagUrl() {
      var {
        config: e
      } = this;
      if (U(e.tagUrl)) return e.tagUrl;
      return "https://go.aniview.com/api/adserver6/vast/?".concat(Ke({
        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
        AV_CHANNELID: "5a0458dc28a06145e4519d21",
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: e.publisherId
      }));
    }

  }

  var ft = e => {
    var t = [];
    return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(e => {
      var i = {};
      e.split(/\r\n|\n|\r/).forEach(e => {
        if ($(i.startTime)) {
          if (!W(e.trim()) && W(i.text)) {
            var _t20 = e.trim().split("#xywh=");

            [i.text] = _t20, _t20[1] && ([i.x, i.y, i.w, i.h] = _t20[1].split(","));
          }
        } else {
          var _t21 = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);

          _t21 && (i.startTime = 60 * Number(_t21[1] || 0) * 60 + 60 * Number(_t21[2]) + Number(_t21[3]) + Number("0.".concat(_t21[4])), i.endTime = 60 * Number(_t21[6] || 0) * 60 + 60 * Number(_t21[7]) + Number(_t21[8]) + Number("0.".concat(_t21[9])));
        }
      }), i.text && t.push(i);
    }), t;
  },
      bt = (e, t) => {
    var i = {};
    return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
  };

  class yt {
    constructor(t) {
      var _this5 = this;

      e(this, "load", () => {
        this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
          this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0);
        });
      }), e(this, "getThumbnails", () => new Promise(e => {
        var {
          src: t
        } = this.player.config.previewThumbnails;
        if (W(t)) throw new Error("Missing previewThumbnails.src config attribute");

        var i = () => {
          this.thumbnails.sort((e, t) => e.height - t.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e();
        };

        if (j(t)) t(e => {
          this.thumbnails = e, i();
        });else {
          var _e26 = (_(t) ? [t] : t).map(e => this.getThumbnail(e));

          Promise.all(_e26).then(i);
        }
      })), e(this, "getThumbnail", e => new Promise(t => {
        Re(e).then(i => {
          var s = {
            frames: ft(i),
            height: null,
            urlPrefix: ""
          };
          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
          var n = new Image();
          n.onload = () => {
            s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t();
          }, n.src = s.urlPrefix + s.frames[0].text;
        });
      })), e(this, "startMove", e => {
        if (this.loaded && F(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
          if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
            var _t22 = this.player.elements.progress.getBoundingClientRect(),
                _i14 = 100 / _t22.width * (e.pageX - _t22.left);

            this.seekTime = this.player.media.duration * (_i14 / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ue(this.seekTime);
          }
          this.showImageAtCurrentTime();
        }
      }), e(this, "endMove", () => {
        this.toggleThumbContainer(!1, !0);
      }), e(this, "startScrubbing", e => {
        (I(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
      }), e(this, "endScrubbing", () => {
        this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : ye.call(this.player, this.player.media, "timeupdate", () => {
          this.mouseDown || this.toggleScrubbingContainer(!1);
        });
      }), e(this, "listeners", () => {
        this.player.on("play", () => {
          this.toggleThumbContainer(!1, !0);
        }), this.player.on("seeked", () => {
          this.toggleThumbContainer(!1);
        }), this.player.on("timeupdate", () => {
          this.lastTime = this.player.media.currentTime;
        });
      }), e(this, "render", () => {
        this.elements.thumb.container = Z("div", {
          class: this.player.config.classNames.previewThumbnails.thumbContainer
        }), this.elements.thumb.imageContainer = Z("div", {
          class: this.player.config.classNames.previewThumbnails.imageContainer
        }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
        var e = Z("div", {
          class: this.player.config.classNames.previewThumbnails.timeContainer
        });
        this.elements.thumb.time = Z("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), H(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = Z("div", {
          class: this.player.config.classNames.previewThumbnails.scrubbingContainer
        }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      }), e(this, "destroy", () => {
        this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
      }), e(this, "showImageAtCurrentTime", () => {
        this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
        var e = this.thumbnails[0].frames.findIndex(e => this.seekTime >= e.startTime && this.seekTime <= e.endTime),
            t = e >= 0;
        var i = 0;
        this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t, s) => {
          this.loadedImages.includes(t.frames[e].text) && (i = s);
        }), e !== this.showingThumb && (this.showingThumb = e, this.loadImage(i)));
      }), e(this, "loadImage", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var t = _this5.showingThumb,
            i = _this5.thumbnails[e],
            {
          urlPrefix: s
        } = i,
            n = i.frames[t],
            a = i.frames[t].text,
            l = s + a;
        if (_this5.currentImageElement && _this5.currentImageElement.dataset.filename === a) _this5.showImage(_this5.currentImageElement, n, e, t, a, !1), _this5.currentImageElement.dataset.index = t, _this5.removeOldImages(_this5.currentImageElement);else {
          _this5.loadingImage && _this5.usingSprites && (_this5.loadingImage.onload = null);

          var _i15 = new Image();

          _i15.src = l, _i15.dataset.index = t, _i15.dataset.filename = a, _this5.showingThumbFilename = a, _this5.player.debug.log("Loading image: ".concat(l)), _i15.onload = () => _this5.showImage(_i15, n, e, t, a, !0), _this5.loadingImage = _i15, _this5.removeOldImages(_i15);
        }
      }), e(this, "showImage", function (e, t, i, s, n) {
        var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !0;
        _this5.player.debug.log("Showing thumb: ".concat(n, ". num: ").concat(s, ". qual: ").concat(i, ". newimg: ").concat(a)), _this5.setImageSizeAndOffset(e, t), a && (_this5.currentImageContainer.appendChild(e), _this5.currentImageElement = e, _this5.loadedImages.includes(n) || _this5.loadedImages.push(n)), _this5.preloadNearby(s, !0).then(_this5.preloadNearby(s, !1)).then(_this5.getHigherQuality(i, e, t, n));
      }), e(this, "removeOldImages", e => {
        Array.from(this.currentImageContainer.children).forEach(t => {
          if ("img" !== t.tagName.toLowerCase()) return;
          var i = this.usingSprites ? 500 : 1e3;

          if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
            t.dataset.deleting = !0;
            var {
              currentImageContainer: _e27
            } = this;
            setTimeout(() => {
              _e27.removeChild(t), this.player.debug.log("Removing thumb: ".concat(t.dataset.filename));
            }, i);
          }
        });
      }), e(this, "preloadNearby", function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        return new Promise(i => {
          setTimeout(() => {
            var s = _this5.thumbnails[0].frames[e].text;

            if (_this5.showingThumbFilename === s) {
              var _n6;

              _n6 = t ? _this5.thumbnails[0].frames.slice(e) : _this5.thumbnails[0].frames.slice(0, e).reverse();

              var _a5 = !1;

              _n6.forEach(e => {
                var t = e.text;

                if (t !== s && !_this5.loadedImages.includes(t)) {
                  _a5 = !0, _this5.player.debug.log("Preloading thumb filename: ".concat(t));

                  var {
                    urlPrefix: _e28
                  } = _this5.thumbnails[0],
                      _s16 = _e28 + t,
                      _n7 = new Image();

                  _n7.src = _s16, _n7.onload = () => {
                    _this5.player.debug.log("Preloaded thumb filename: ".concat(t)), _this5.loadedImages.includes(t) || _this5.loadedImages.push(t), i();
                  };
                }
              }), _a5 || i();
            }
          }, 300);
        });
      }), e(this, "getHigherQuality", (e, t, i, s) => {
        if (e < this.thumbnails.length - 1) {
          var _n8 = t.naturalHeight;
          this.usingSprites && (_n8 = i.h), _n8 < this.thumbContainerHeight && setTimeout(() => {
            this.showingThumbFilename === s && (this.player.debug.log("Showing higher quality thumb for: ".concat(s)), this.loadImage(e + 1));
          }, 300);
        }
      }), e(this, "toggleThumbContainer", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var i = _this5.player.config.classNames.previewThumbnails.thumbContainerShown;
        _this5.elements.thumb.container.classList.toggle(i, e), !e && t && (_this5.showingThumb = null, _this5.showingThumbFilename = null);
      }), e(this, "toggleScrubbingContainer", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var t = _this5.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        _this5.elements.scrubbing.container.classList.toggle(t, e), e || (_this5.showingThumb = null, _this5.showingThumbFilename = null);
      }), e(this, "determineContainerAutoSizing", () => {
        (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0);
      }), e(this, "setThumbContainerSizeAndPos", () => {
        if (this.sizeSpecifiedInCSS) {
          if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
            var _e29 = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);

            this.elements.thumb.imageContainer.style.width = "".concat(_e29, "px");
          } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
            var _e30 = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);

            this.elements.thumb.imageContainer.style.height = "".concat(_e30, "px");
          }
        } else {
          var _e31 = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);

          this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(_e31, "px");
        }

        this.setThumbContainerPos();
      }), e(this, "setThumbContainerPos", () => {
        var e = this.player.elements.progress.getBoundingClientRect(),
            t = this.player.elements.container.getBoundingClientRect(),
            {
          container: i
        } = this.elements.thumb,
            s = t.left - e.left + 10,
            n = t.right - e.left - i.clientWidth - 10;
        var a = this.mousePosX - e.left - i.clientWidth / 2;
        a < s && (a = s), a > n && (a = n), i.style.left = "".concat(a, "px");
      }), e(this, "setScrubbingContainerSize", () => {
        var {
          width: e,
          height: t
        } = bt(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        this.elements.scrubbing.container.style.width = "".concat(e, "px"), this.elements.scrubbing.container.style.height = "".concat(t, "px");
      }), e(this, "setImageSizeAndOffset", (e, t) => {
        if (!this.usingSprites) return;
        var i = this.thumbContainerHeight / t.h;
        e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = "-".concat(t.x * i, "px"), e.style.top = "-".concat(t.y * i, "px");
      }), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
        thumb: {},
        scrubbing: {}
      }, this.load();
    }

    get enabled() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }

    get currentImageContainer() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }

    get usingSprites() {
      return Object.keys(this.thumbnails[0].frames[0]).includes("w");
    }

    get thumbAspectRatio() {
      return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
    }

    get thumbContainerHeight() {
      if (this.mouseDown) {
        var {
          height: _e32
        } = bt(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        return _e32;
      }

      return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }

    get currentImageElement() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    }

    set currentImageElement(e) {
      this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
    }

  }

  var vt = {
    insertElements(e, t) {
      _(t) ? ee(e, this.media, {
        src: t
      }) : q(t) && t.forEach(t => {
        ee(e, this.media, t);
      });
    },

    change(e) {
      Q(e, "sources.length") ? (Le.cancelRequests.call(this), this.destroy.call(this, () => {
        this.options.quality = [], te(this.media), this.media = null, H(this.elements.container) && this.elements.container.removeAttribute("class");
        var {
          sources: t,
          type: i
        } = e,
            [{
          provider: s = Ge.html5,
          src: n
        }] = t,
            a = "html5" === s ? i : "div",
            l = "html5" === s ? {} : {
          src: n
        };
        Object.assign(this, {
          provider: s,
          type: i,
          supported: me.check(i, s, this.config.playsinline),
          media: Z(a, l)
        }), this.elements.container.appendChild(this.media), O(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), W(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), at.addStyleHook.call(this), this.isHTML5 && vt.insertElements.call(this, "source", t), this.config.title = e.title, pt.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && vt.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.isHTML5 && this.media.load(), W(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))), this.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    }

  };

  class wt {
    constructor(t, i) {
      var _this6 = this;

      if (e(this, "play", () => j(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => ke(this.media.play())), this.media.play()) : null), e(this, "pause", () => this.playing && j(this.media.pause) ? this.media.pause() : null), e(this, "togglePlay", e => (O(e) ? e : !this.playing) ? this.play() : this.pause()), e(this, "stop", () => {
        this.isHTML5 ? (this.pause(), this.restart()) : j(this.media.stop) && this.media.stop();
      }), e(this, "restart", () => {
        this.currentTime = 0;
      }), e(this, "rewind", e => {
        this.currentTime -= $(e) ? e : this.config.seekTime;
      }), e(this, "forward", e => {
        this.currentTime += $(e) ? e : this.config.seekTime;
      }), e(this, "increaseVolume", e => {
        var t = this.media.muted ? 0 : this.volume;
        this.volume = t + ($(e) ? e : 0);
      }), e(this, "decreaseVolume", e => {
        this.increaseVolume(-e);
      }), e(this, "airplay", () => {
        me.airplay && this.media.webkitShowPlaybackTargetPicker();
      }), e(this, "toggleControls", e => {
        if (this.supported.ui && !this.isAudio) {
          var _t23 = oe(this.elements.container, this.config.classNames.hideControls),
              _i16 = void 0 === e ? void 0 : !e,
              _s17 = le(this.elements.container, this.config.classNames.hideControls, _i16);

          if (_s17 && q(this.config.controls) && this.config.controls.includes("settings") && !W(this.config.settings) && We.toggleMenu.call(this, !1), _s17 !== _t23) {
            var _e33 = _s17 ? "controlshidden" : "controlsshown";

            ve.call(this, this.media, _e33);
          }

          return !_s17;
        }

        return !1;
      }), e(this, "on", (e, t) => {
        fe.call(this, this.elements.container, e, t);
      }), e(this, "once", (e, t) => {
        ye.call(this, this.elements.container, e, t);
      }), e(this, "off", (e, t) => {
        be(this.elements.container, e, t);
      }), e(this, "destroy", function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        if (!_this6.ready) return;

        var i = () => {
          document.body.style.overflow = "", _this6.embed = null, t ? (Object.keys(_this6.elements).length && (te(_this6.elements.buttons.play), te(_this6.elements.captions), te(_this6.elements.controls), te(_this6.elements.wrapper), _this6.elements.buttons.play = null, _this6.elements.captions = null, _this6.elements.controls = null, _this6.elements.wrapper = null), j(e) && e()) : (we.call(_this6), Le.cancelRequests.call(_this6), se(_this6.elements.original, _this6.elements.container), ve.call(_this6, _this6.elements.original, "destroyed", !0), j(e) && e.call(_this6.elements.original), _this6.ready = !1, setTimeout(() => {
            _this6.elements = null, _this6.media = null;
          }, 200));
        };

        _this6.stop(), clearTimeout(_this6.timers.loading), clearTimeout(_this6.timers.controls), clearTimeout(_this6.timers.resized), _this6.isHTML5 ? (at.toggleNativeControls.call(_this6, !0), i()) : _this6.isYouTube ? (clearInterval(_this6.timers.buffering), clearInterval(_this6.timers.playing), null !== _this6.embed && j(_this6.embed.destroy) && _this6.embed.destroy(), i()) : _this6.isVimeo && (null !== _this6.embed && _this6.embed.unload().then(i), setTimeout(i, 200));
      }), e(this, "supports", e => me.mime.call(this, e)), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = me.touch, this.media = t, _(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || D(this.media) || q(this.media)) && (this.media = this.media[0]), this.config = X({}, Qe, wt.defaults, i || {}, (() => {
        try {
          return JSON.parse(this.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      })()), this.elements = {
        container: null,
        fullscreen: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: {
          popup: null,
          menu: null,
          panels: {},
          buttons: {}
        }
      }, this.captions = {
        active: null,
        currentTrack: -1,
        meta: new WeakMap()
      }, this.fullscreen = {
        active: !1
      }, this.options = {
        speed: [],
        quality: []
      }, this.debug = new it(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", me), I(this.media) || !H(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
      if (this.media.plyr) return void this.debug.warn("Target already setup");
      if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
      if (!me.check().api) return void this.debug.error("Setup failed: no support");
      var s = this.media.cloneNode(!0);
      s.autoplay = !1, this.elements.original = s;
      var n = this.media.tagName.toLowerCase();
      var a = null,
          l = null;

      switch (n) {
        case "div":
          if (a = this.media.querySelector("iframe"), H(a)) {
            if (l = ze(a.getAttribute("src")), this.provider = function (e) {
              return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Ge.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Ge.vimeo : null;
            }(l.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length) {
              var _e34 = ["1", "true"];
              _e34.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), _e34.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = _e34.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
            }
          } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

          if (W(this.provider) || !Object.values(Ge).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
          this.type = et;
          break;

        case "video":
        case "audio":
          this.type = n, this.provider = Ge.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
          break;

        default:
          return void this.debug.error("Setup failed: unsupported type");
      }

      this.supported = me.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new lt(this), this.storage = new Fe(this), this.media.plyr = this, H(this.elements.container) || (this.elements.container = Z("div", {
        tabindex: 0
      }), J(this.media, this.elements.container)), at.migrateStyles.call(this), at.addStyleHook.call(this), pt.setup.call(this), this.config.debug && fe.call(this, this.elements.container, this.config.events.join(" "), e => {
        this.debug.log("event: ".concat(e.type));
      }), this.fullscreen = new st(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new gt(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => ke(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))) : this.debug.error("Setup failed: no support");
    }

    get isHTML5() {
      return this.provider === Ge.html5;
    }

    get isEmbed() {
      return this.isYouTube || this.isVimeo;
    }

    get isYouTube() {
      return this.provider === Ge.youtube;
    }

    get isVimeo() {
      return this.provider === Ge.vimeo;
    }

    get isVideo() {
      return this.type === et;
    }

    get isAudio() {
      return this.type === Ze;
    }

    get playing() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }

    get paused() {
      return Boolean(this.media.paused);
    }

    get stopped() {
      return Boolean(this.paused && 0 === this.currentTime);
    }

    get ended() {
      return Boolean(this.media.ended);
    }

    set currentTime(e) {
      if (!this.duration) return;
      var t = $(e) && e > 0;
      this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
    }

    get currentTime() {
      return Number(this.media.currentTime);
    }

    get buffered() {
      var {
        buffered: e
      } = this.media;
      return $(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
    }

    get seeking() {
      return Boolean(this.media.seeking);
    }

    get duration() {
      var e = parseFloat(this.config.duration),
          t = (this.media || {}).duration,
          i = $(t) && t !== 1 / 0 ? t : 0;
      return e || i;
    }

    set volume(e) {
      var t = e;
      _(t) && (t = Number(t)), $(t) || (t = this.storage.get("volume")), $(t) || ({
        volume: t
      } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !W(e) && this.muted && t > 0 && (this.muted = !1);
    }

    get volume() {
      return Number(this.media.volume);
    }

    set muted(e) {
      var t = e;
      O(t) || (t = this.storage.get("muted")), O(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
    }

    get muted() {
      return Boolean(this.media.muted);
    }

    get hasAudio() {
      return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }

    set speed(e) {
      var t = null;
      $(e) && (t = e), $(t) || (t = this.storage.get("speed")), $(t) || (t = this.config.speed.selected);
      var {
        minimumSpeed: i,
        maximumSpeed: s
      } = this;
      t = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
        return Math.min(Math.max(e, t), i);
      }(t, i, s), this.config.speed.selected = t, setTimeout(() => {
        this.media && (this.media.playbackRate = t);
      }, 0);
    }

    get speed() {
      return Number(this.media.playbackRate);
    }

    get minimumSpeed() {
      return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625;
    }

    get maximumSpeed() {
      return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16;
    }

    set quality(e) {
      var t = this.config.quality,
          i = this.options.quality;
      if (!i.length) return;
      var s = [!W(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find($),
          n = !0;

      if (!i.includes(s)) {
        var _e35 = Ae(i, s);

        this.debug.warn("Unsupported quality option: ".concat(s, ", using ").concat(_e35, " instead")), s = _e35, n = !1;
      }

      t.selected = s, this.media.quality = s, n && this.storage.set({
        quality: s
      });
    }

    get quality() {
      return this.media.quality;
    }

    set loop(e) {
      var t = O(e) ? e : this.config.loop.active;
      this.config.loop.active = t, this.media.loop = t;
    }

    get loop() {
      return Boolean(this.media.loop);
    }

    set source(e) {
      vt.change.call(this, e);
    }

    get source() {
      return this.media.currentSrc;
    }

    get download() {
      var {
        download: e
      } = this.config.urls;
      return U(e) ? e : this.source;
    }

    set download(e) {
      U(e) && (this.config.urls.download = e, We.setDownloadUrl.call(this));
    }

    set poster(e) {
      this.isVideo ? at.setPoster.call(this, e, !1).catch(() => {}) : this.debug.warn("Poster can only be set for video");
    }

    get poster() {
      return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
    }

    get ratio() {
      if (!this.isVideo) return null;
      var e = Ne(xe.call(this));
      return q(e) ? e.join(":") : e;
    }

    set ratio(e) {
      this.isVideo ? _(e) && Pe(e) ? (this.config.ratio = Ne(e), Me.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video");
    }

    set autoplay(e) {
      var t = O(e) ? e : this.config.autoplay;
      this.config.autoplay = t;
    }

    get autoplay() {
      return Boolean(this.config.autoplay);
    }

    toggleCaptions(e) {
      Ye.toggle.call(this, e, !1);
    }

    set currentTrack(e) {
      Ye.set.call(this, e, !1), Ye.setup();
    }

    get currentTrack() {
      var {
        toggled: e,
        currentTrack: t
      } = this.captions;
      return e ? t : -1;
    }

    set language(e) {
      Ye.setLanguage.call(this, e, !1);
    }

    get language() {
      return (Ye.getCurrentTrack.call(this) || {}).language;
    }

    set pip(e) {
      if (!me.pip) return;
      var t = O(e) ? e : !this.pip;
      j(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Xe : Je), j(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
    }

    get pip() {
      return me.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Xe : null;
    }

    setPreviewThumbnails(e) {
      this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this));
    }

    static supported(e, t, i) {
      return me.check(e, t, i);
    }

    static loadSprite(e, t) {
      return Ve(e, t);
    }

    static setup(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i = null;
      return _(e) ? i = Array.from(document.querySelectorAll(e)) : D(e) ? i = Array.from(e) : q(e) && (i = e.filter(H)), W(i) ? null : i.map(e => new wt(e, t));
    }

  }

  var Tt;
  return wt.defaults = (Tt = Qe, JSON.parse(JSON.stringify(Tt))), wt;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./js/magicph.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./js/logger.js");
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general */ "./js/general.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./js/player.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



 // import hInit from "./header";
// log("Loading inline script...");

var pginput = $("<div class=\"pjump\"><input id=\"pageInput\" type=\"number\" name=\"pageJump\" placeholder=\"Jump to page\" value=\"\"></div>");
_general__WEBPACK_IMPORTED_MODULE_1__.check.channel ? (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Channel page") : false;
_general__WEBPACK_IMPORTED_MODULE_1__.check.home ? ((0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Homepage page"), $(pginput).prependTo(".container > .pagination3"), $("#recommended-category-videos").prependTo(".frontListingWrapper"), $("#recommended-videos").prependTo(".frontListingWrapper")) : false; //window.PH_Storage.getItem("watchedVideoIds") // stored videos
//window.PH_Storage.saveItem("watchedVideoStorage")

if (_general__WEBPACK_IMPORTED_MODULE_1__.check.video) {
  (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Video page");
  $("html").attr("style", "scrollbar-color: #4646463d #000 !important;");
  localStorage.setItem("mgp_player", '{"quality":1080}');
  (0,_player__WEBPACK_IMPORTED_MODULE_2__.ph_player)();
  (0,_general__WEBPACK_IMPORTED_MODULE_1__.userInfo)("video");
  $('[data-entrycode="VidPg-premVid-videoPage"]').parent().parent().remove();
  $(".mainPlayerDiv").addClass("bigp");
  $(".relatedVideos").addClass("mph1 video-info-row showLess allRelatedVideos");
  $(".show-more-btn").addClass("bottom");
  $(".mph1").appendTo(".video-actions-tabs");
  $(".videos-list").addClass("mph2 video-info-row showLess");
  $(".mph2").appendTo(".mph1");
  $("#cmtWrapper").addClass("mph3 video-info-row showLess");
  (0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".js-relatedRecommended").append((0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".mph3"));
  $(".mph2 > .user-playlist").attr("id", "relatedVideosCenter");
  $("ul.mgp_quality.mgp_optionsList").find(".mgp_active").removeClass("mgp_active").find("li").eq(0).addClass("mgp_active");
  (0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)((0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".mgp_options"), "click", () => {
    if (!$("div.mgp_optionsMenu.mgp_visible.mgp_level2").length) {
      $("div.mgp_header").text("Quality");
      $("div.mgp_optionsMenu").addClass("mgp_visible mgp_level2").find(".mgp_background").addClass("mgp_animated").attr("style", "width: 110px; height: 194px;");
      $("ul.mgp_quality.mgp_optionsList").attr("style", "display:block;");
    } else {
      $("div.mgp_optionsMenu").removeClass("mgp_visible mgp_level2").find(".mgp_background").removeClass("mgp_animated").attr("style", "width: 165px; height: 136px;");
      $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
    }
  });
  (0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)((0,_general__WEBPACK_IMPORTED_MODULE_1__.qs)(".mgp_clickHandler"), "click", () => {
    $("div.mgp_optionsMenu").removeClass("mgp_visible mgp_level2").find(".mgp_background").removeClass("mgp_animated").attr("style", "width: 165px; height: 136px;");
    $("ul.mgp_quality.mgp_optionsList").attr("style", "display:none;");
  });
  $("div.mgp_header").on("click", function () {
    $("div.mgp_optionsMenu.mgp_visible.mgp_level2").removeClass("mgp_level2").find(".mgp_background").attr("style", "width: 165px; height: 136px;");
  });
}

;
_general__WEBPACK_IMPORTED_MODULE_1__.check.cv ? (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Categories") : false;
_general__WEBPACK_IMPORTED_MODULE_1__.check.user ? (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("User Profile") : false;

if (_general__WEBPACK_IMPORTED_MODULE_1__.check.model) {
  (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Model");
  (0,_general__WEBPACK_IMPORTED_MODULE_1__.userInfo)("model");
} // check.community
//   ? (log(`Community`),
//     check.lo
//       ? ($(".userWidgetbuttons").remove(), $("#communityMenuWrap").remove())
//       : false)
//   : false;


_general__WEBPACK_IMPORTED_MODULE_1__.check.pstar ? (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Pornstar") : false;

if (_general__WEBPACK_IMPORTED_MODULE_1__.check.gif) {
  (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Gifs");
  _general__WEBPACK_IMPORTED_MODULE_1__.check.lo ? $(".float-right").remove() : false;
}

/recommended/.test(_general__WEBPACK_IMPORTED_MODULE_1__.locate) ? (_general__WEBPACK_IMPORTED_MODULE_1__.check.lo ? $('a[href="/recommended/rate"]').addClass("rm") : false, $(pginput).prependTo(".recommendedVideosContainer > .pagination3")) : false;
(0,_general__WEBPACK_IMPORTED_MODULE_1__.userInfo)();

if (_general__WEBPACK_IMPORTED_MODULE_1__.check.lo) {
  (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])("Logged out");
  window.disablePlaylistPlusButon = true;
}

pginput.on("change", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (e) {
    e.preventDefault();
    var v = e.target.value,
        link = "".concat(document.location.origin).concat(_general__WEBPACK_IMPORTED_MODULE_1__.check.recommended ? "?page=" : "/video?page=").concat(v);
    (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])(link); //document.open(link,"popup");

    yield new Promise(() => {
      try {
        fetch(link).then(res => res.text()).then(text => {
          var parser = new DOMParser(),
              htmlDocument = parser.parseFromString(text, "text/html"),
              selected = htmlDocument.documentElement,
              section = selected.querySelector("body");
          $("body").html(section);
        });
      } catch (error) {
        (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])(error, "err");
      }
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
(0,_general__WEBPACK_IMPORTED_MODULE_1__.ael)(document, "scroll", () => {
  var search = $(".headerSearchWrapper"),
      pgnav = $(".pagination3 > ul").eq(1),
      pgInput = $(".pagination3 > .pjump").eq(1),
      mph1 = $(".mph1"),
      mph2 = $(".mph2"),
      smol = $(".mainPlayerDiv"); // sma = $("#vb"),
  // smb = $("#vr"),

  return $(window).scrollTop() > _general__WEBPACK_IMPORTED_MODULE_1__.scrollnumber ? ($(".magicTop").addClass("top"), search.addClass("sticky"), pgnav.addClass("top"), pgInput.addClass("top"), mph1.attr("style", "display: block;"), mph2.attr("style", "display: block;") //smol.removeClass("bigp"),
  //smol.addClass("smolp")
  ) : ($(".magicTop").removeClass("top"), search.removeClass("sticky"), pgnav.removeClass("top"), pgInput.removeClass("top"), mph1.attr("style", "display: none;"), mph2.attr("style", "display: none;") //smol.addClass("bigp"),
  //smol.removeClass("smolp")
  );
});
})();

/******/ })()
;
//# sourceMappingURL=magicph.js.map