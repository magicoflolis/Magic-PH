let cfg = {
    blur: false,
    thumbnails: true,
    comments: false,
    autoscroll: true,
    topbutton: true,
    altplayers: false,
};
if (localStorage.getItem("magicran") == 0) {
    localStorage.setItem("blurimg", false);
    localStorage.setItem("thumbnails", true);
    localStorage.setItem("comments", false);
    localStorage.setItem("autoscroll", true);
    localStorage.setItem("topbutton", true);
    localStorage.setItem("altplayers", false);
    localStorage.setItem("magicran", 1);
}
// cfg.blur = window.localStorage.getItem("blurimg");
// cfg.thumbnails = window.localStorage.getItem("thumbnails");
// cfg.comments = window.localStorage.getItem("comments");
// cfg.autoscroll = window.localStorage.getItem("autoscroll");
// cfg.topbutton = window.localStorage.getItem("topbutton");
// cfg.altplayers = window.localStorage.getItem("altplayers");
// if(p == "magic") {
//     document.querySelector(".Blur").onclick = (e) => {
//         e.preventDefault();
//         cfg.blur = true;
//         console.log(cfg.blur)
//     }
// }

// cfg.blur = window.localStorage.getItem("blurimg");
// cfg.thumbnails = window.localStorage.getItem("thumbnails");
// cfg.comments = window.localStorage.getItem("comments");
// cfg.autoscroll = window.localStorage.getItem("autoscroll");
// cfg.topbutton = window.localStorage.getItem("topbutton");
// cfg.altplayers = window.localStorage.getItem("altplayers");

// let cfg = {
//     blur: false,
//     thumbnails: true,
//     comments: false,
//     autoscroll: true,
//     topbutton: true,
//     altplayers: false,
// };

// $(".Blur").click(() => {
//     chrome.storage.sync.set({
//         blur: true,
//     },
//         function () {
//             console.log(debug + blur);
//         }
//     );
// });
// $(".save").click(() => {
//     chrome.storage.sync.set({
//         blur: false,
//         thumbnails: true,
//         comments: false,
//         autoscroll: true,
//         topbutton: true,
//         altplayers: false,
//     },
//         function () {
//             console.log(debug + "Saved");
//         }
//     );
// });
// chrome.storage.sync.set({
//     blur: false,
//     thumbnails: true,
//     comments: false,
//     autoscroll: true,
//     topbutton: true,
//     altplayers: false,
// }, function() {
//     console.log(debug + 'Saved');
//   });
//   chrome.storage.sync.get(['blur'], function(result) {
//     cfg.blur = result.blur;
//     console.log('Value currently is ' + cfg.blur);
//   });
