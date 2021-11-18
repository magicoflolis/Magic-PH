/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./options.js ***!
  \********************/
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var brws = typeof browser == "undefined" ? chrome : browser;
brws.storage.local.get(storedConfig => {
  var _document$querySelect;

  $form = (_document$querySelect = document.querySelector("form.magicph_cfg")) !== null && _document$querySelect !== void 0 ? _document$querySelect : console.log("[MagicPH] can't find ".concat(target)), config = _objectSpread({
    altplayers: "none",
    autoscroll: true,
    blurimg: false,
    comments: false,
    topbutton: false,
    sidebar: false,
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
    },
    headerOrder: ["home", "videos", "categories", "pornstar", "realsex", "photos", "customize"]
  }, storedConfig);

  for (var prop in config) {
    prop in $form.elements ? $form.elements[prop].type == "checkbox" ? $form.elements[prop].checked = config[prop] : $form.elements[prop].value = config[prop] : false;
  }

  $form.addEventListener("change", e => {
    var $el =
    /** @type {HTMLInputElement} */
    e.target;
    $el.type == "checkbox" ? config[$el.name] = $el.checked : config[$el.name] = $el.value;
    brws.storage.local.set(config);
  });
});
/******/ })()
;
//# sourceMappingURL=options.js.map