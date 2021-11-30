/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./js/options.js ***!
  \***********************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQU1BLElBQUksR0FBRyxPQUFPQyxPQUFQLElBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsT0FBdEQ7QUFDQUQsSUFBSSxDQUFDRyxPQUFMLENBQWFDLEtBQWIsQ0FBbUJDLEdBQW5CLENBQXdCQyxZQUFELElBQWtCO0FBQUE7O0FBQ3RDQyxFQUFBQSxLQUFLLDRCQUNKQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsa0JBQXZCLENBREkseUVBRUpDLE9BQU8sQ0FBQ0MsR0FBUixnQ0FBb0NDLE1BQXBDLEVBRkYsRUFHR0MsTUFBTTtBQUNMQyxJQUFBQSxVQUFVLEVBQUUsTUFEUDtBQUVMQyxJQUFBQSxVQUFVLEVBQUUsSUFGUDtBQUdMQyxJQUFBQSxPQUFPLEVBQUUsS0FISjtBQUlMQyxJQUFBQSxRQUFRLEVBQUUsS0FKTDtBQUtMQyxJQUFBQSxTQUFTLEVBQUUsS0FMTjtBQU1MQyxJQUFBQSxPQUFPLEVBQUUsS0FOSjtBQU9MQyxJQUFBQSxXQUFXLEVBQUUsQ0FDWCxNQURXLEVBRVgsUUFGVyxFQUdYLFlBSFcsRUFJWCxXQUpXLEVBS1gsTUFMVyxFQU1YLGFBTlcsRUFPWCxRQVBXLENBUFI7QUFnQkxDLElBQUFBLFdBQVcsRUFBRTtBQUNYQyxNQUFBQSxJQUFJLEVBQUUsR0FESztBQUVYQyxNQUFBQSxLQUFLLEVBQUUsa0JBRkk7QUFHWEMsTUFBQUEsUUFBUSxFQUFFLGtCQUhDO0FBSVhDLE1BQUFBLFFBQVEsRUFBRSxtQ0FKQztBQUtYQyxNQUFBQSxTQUFTLEVBQUUsZ0JBTEE7QUFNWEMsTUFBQUEsS0FBSyxFQUFFLE9BTkk7QUFPWEMsTUFBQUEsT0FBTyxFQUFFLFVBUEU7QUFRWEMsTUFBQUEsSUFBSSxFQUFFLFVBUks7QUFTWEMsTUFBQUEsUUFBUSxFQUFFLGNBVEM7QUFVWEMsTUFBQUEsS0FBSyxFQUFFLE1BVkk7QUFXWEMsTUFBQUEsTUFBTSxFQUFFLHNCQVhHO0FBWVhDLE1BQUFBLFNBQVMsRUFBRSxzQkFaQTtBQWFYQyxNQUFBQSxTQUFTLEVBQUUsdUNBYkE7QUFjWEMsTUFBQUEsVUFBVSxFQUFFLG9CQWREO0FBZVhDLE1BQUFBLE1BQU0sRUFBRTtBQWZHO0FBaEJSLEtBaUNGOUIsWUFqQ0UsQ0FIVDs7QUFzQ0EsT0FBSyxJQUFJK0IsSUFBVCxJQUFpQnhCLE1BQWpCLEVBQXlCO0FBQ3ZCd0IsSUFBQUEsSUFBSSxJQUFJOUIsS0FBSyxDQUFDK0IsUUFBZCxHQUNJL0IsS0FBSyxDQUFDK0IsUUFBTixDQUFlRCxJQUFmLEVBQXFCRSxJQUFyQixJQUE2QixVQUE3QixHQUNHaEMsS0FBSyxDQUFDK0IsUUFBTixDQUFlRCxJQUFmLEVBQXFCRyxPQUFyQixHQUErQjNCLE1BQU0sQ0FBQ3dCLElBQUQsQ0FEeEMsR0FFRzlCLEtBQUssQ0FBQytCLFFBQU4sQ0FBZUQsSUFBZixFQUFxQkksS0FBckIsR0FBNkI1QixNQUFNLENBQUN3QixJQUFELENBSDFDLEdBSUksS0FKSjtBQUtEOztBQUVEOUIsRUFBQUEsS0FBSyxDQUFDbUMsZ0JBQU4sQ0FBdUIsUUFBdkIsRUFBa0NDLENBQUQsSUFBTztBQUN0QyxRQUFJQyxHQUFHO0FBQUc7QUFBaUNELElBQUFBLENBQUMsQ0FBQy9CLE1BQTdDO0FBQ0FnQyxJQUFBQSxHQUFHLENBQUNMLElBQUosSUFBWSxVQUFaLEdBQ0sxQixNQUFNLENBQUMrQixHQUFHLENBQUNDLElBQUwsQ0FBTixHQUFtQkQsR0FBRyxDQUFDSixPQUQ1QixHQUVLM0IsTUFBTSxDQUFDK0IsR0FBRyxDQUFDQyxJQUFMLENBQU4sR0FBbUJELEdBQUcsQ0FBQ0gsS0FGNUI7QUFHQXpDLElBQUFBLElBQUksQ0FBQ0csT0FBTCxDQUFhQyxLQUFiLENBQW1CMEMsR0FBbkIsQ0FBdUJqQyxNQUF2QjtBQUNELEdBTkQ7QUFPRCxDQXRERCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvb3B0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBicndzID0gdHlwZW9mIGJyb3dzZXIgPT0gXCJ1bmRlZmluZWRcIiA/IGNocm9tZSA6IGJyb3dzZXI7XHJcbmJyd3Muc3RvcmFnZS5sb2NhbC5nZXQoKHN0b3JlZENvbmZpZykgPT4ge1xyXG4gICgkZm9ybSA9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybS5tYWdpY3BoX2NmZ1wiKSA/P1xyXG4gICAgY29uc29sZS5sb2coYFtNYWdpY1BIXSBjYW4ndCBmaW5kICR7dGFyZ2V0fWApKSxcclxuICAgIChjb25maWcgPSB7XHJcbiAgICAgIGFsdHBsYXllcnM6IFwibm9uZVwiLFxyXG4gICAgICBhdXRvc2Nyb2xsOiB0cnVlLFxyXG4gICAgICBibHVyaW1nOiBmYWxzZSxcclxuICAgICAgY29tbWVudHM6IGZhbHNlLFxyXG4gICAgICB0b3BidXR0b246IGZhbHNlLFxyXG4gICAgICBzaWRlYmFyOiBmYWxzZSxcclxuICAgICAgaGVhZGVyT3JkZXI6IFtcclxuICAgICAgICBcImhvbWVcIixcclxuICAgICAgICBcInZpZGVvc1wiLFxyXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiLFxyXG4gICAgICAgIFwicG9ybnN0YXJzXCIsXHJcbiAgICAgICAgXCJnaWZzXCIsXHJcbiAgICAgICAgXCJyZWNvbW1lbmRlZFwiLFxyXG4gICAgICAgIFwiY3VzdG9tXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIGhlYWRlckxpbmtzOiB7XHJcbiAgICAgICAgSG9tZTogXCIvXCIsXHJcbiAgICAgICAgVmlkZW86IFwiL3ZpZGVvP289dHImaGQ9MVwiLFxyXG4gICAgICAgIENhdGVnb3J5OiBcIi9jYXRlZ29yaWVzP289YWxcIixcclxuICAgICAgICBQb3Juc3RhcjogXCIvcG9ybnN0YXJzP3BlcmZvcm1lclR5cGU9cG9ybnN0YXJcIixcclxuICAgICAgICBDb21tdW5pdHk6IFwiL3VzZXIvZGlzY292ZXJcIixcclxuICAgICAgICBQaG90bzogXCIvZ2lmc1wiLFxyXG4gICAgICAgIFByZW1pdW06IFwiL3ByZW1pdW1cIixcclxuICAgICAgICBHaWZ0OiBcIi9wcmVtaXVtXCIsXHJcbiAgICAgICAgR1ByZW1pdW06IFwiL2dheS9wcmVtaXVtXCIsXHJcbiAgICAgICAgR0hvbWU6IFwiL2dheVwiLFxyXG4gICAgICAgIEdWaWRlbzogXCIvZ2F5L3ZpZGVvP289dHImaGQ9MVwiLFxyXG4gICAgICAgIEdDYXRlZ29yeTogXCIvZ2F5L2NhdGVnb3JpZXM/bz1hbFwiLFxyXG4gICAgICAgIEdQb3Juc3RhcjogXCIvZ2F5L3Bvcm5zdGFycz9wZXJmb3JtZXJUeXBlPXBvcm5zdGFyXCIsXHJcbiAgICAgICAgR0NvbW11bml0eTogXCIvdXNlci9kaXNjb3Zlci9nYXlcIixcclxuICAgICAgICBHUGhvdG86IFwiL2dheS9naWZzP289dHJcIixcclxuICAgICAgfSxcclxuICAgICAgLi4uc3RvcmVkQ29uZmlnLFxyXG4gICAgfSk7XHJcbiAgZm9yIChsZXQgcHJvcCBpbiBjb25maWcpIHtcclxuICAgIHByb3AgaW4gJGZvcm0uZWxlbWVudHNcclxuICAgICAgPyAkZm9ybS5lbGVtZW50c1twcm9wXS50eXBlID09IFwiY2hlY2tib3hcIlxyXG4gICAgICAgID8gKCRmb3JtLmVsZW1lbnRzW3Byb3BdLmNoZWNrZWQgPSBjb25maWdbcHJvcF0pXHJcbiAgICAgICAgOiAoJGZvcm0uZWxlbWVudHNbcHJvcF0udmFsdWUgPSBjb25maWdbcHJvcF0pXHJcbiAgICAgIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICAkZm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICBsZXQgJGVsID0gLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqLyAoZS50YXJnZXQpO1xyXG4gICAgJGVsLnR5cGUgPT0gXCJjaGVja2JveFwiXHJcbiAgICAgID8gKGNvbmZpZ1skZWwubmFtZV0gPSAkZWwuY2hlY2tlZClcclxuICAgICAgOiAoY29uZmlnWyRlbC5uYW1lXSA9ICRlbC52YWx1ZSk7XHJcbiAgICBicndzLnN0b3JhZ2UubG9jYWwuc2V0KGNvbmZpZyk7XHJcbiAgfSk7XHJcbn0pOyJdLCJuYW1lcyI6WyJicndzIiwiYnJvd3NlciIsImNocm9tZSIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsInN0b3JlZENvbmZpZyIsIiRmb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsImNvbmZpZyIsImFsdHBsYXllcnMiLCJhdXRvc2Nyb2xsIiwiYmx1cmltZyIsImNvbW1lbnRzIiwidG9wYnV0dG9uIiwic2lkZWJhciIsImhlYWRlck9yZGVyIiwiaGVhZGVyTGlua3MiLCJIb21lIiwiVmlkZW8iLCJDYXRlZ29yeSIsIlBvcm5zdGFyIiwiQ29tbXVuaXR5IiwiUGhvdG8iLCJQcmVtaXVtIiwiR2lmdCIsIkdQcmVtaXVtIiwiR0hvbWUiLCJHVmlkZW8iLCJHQ2F0ZWdvcnkiLCJHUG9ybnN0YXIiLCJHQ29tbXVuaXR5IiwiR1Bob3RvIiwicHJvcCIsImVsZW1lbnRzIiwidHlwZSIsImNoZWNrZWQiLCJ2YWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiJGVsIiwibmFtZSIsInNldCJdLCJzb3VyY2VSb290IjoiIn0=