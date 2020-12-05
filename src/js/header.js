import '../libs/jquery.js';
let $ = window.$
export let check = {
    home: $(".frontListingWrapper").length,
    video: $('#player').length,
    cv: $('.gridWrapper').length,
    new: $("#headerSearchWrapperFree").length,
    gay: $(".container.gayLayout").length,
    lo: $(".logged-out").length,
    premium: $(".premiumUser").length,
    gif: $('#gifWrap').length,
    user: $('#profileContent').length,
    model: $('.tipping_modals_container').length,
    pstar: $('.pornstar_container').length,
};
let m = {
    Logo: "/recommended",
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community:"/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    GPremium: "/gay/premium",
    Gift: "/premium",
    GLogo: "/gay/recommended",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr",
};
let o = {
    Logo:'.logoWrapper > a[href="/"]',
    Home:'.home > a[href="/"]',
    Video:'.videos > a[href="/video"]',
    Category:'.categories > a[href="/categories"]',
    Pornstar:'.pornstar > a[href="/pornstars"]',
    Community:'.community > a[href^="/community"]',
    Photo:'.photos > a[href^="/albums"]',
    Premium: '.premium > a[href="/premium"]',
    Gift: '#giftingEntry[href="/gift?type=GiftCard-Purchase"]',
    GLogo: '.logoWrapper > a[href="/gayporn"]',
    GHome: '.home > a[href="/"]',
    GVideo: '.videos > a[href="/gayporn"]',
    GCategory: '.categories > a[href="/gay/categories"]',
    GPornstar: '.pornstar > a[href="/gay/pornstars"]',
    GCommunity: '.community > a[href^="/community?section=gay"]',
    GPhoto: '.photos > a[href^="/albums/gay"]',
    GPremium: '.premium > a[href="/gay/premium"]',
};
let page = {
    Nset: function (){
        $(o.Logo).attr('href', m.Logo);
        $(o.Home).attr('href', m.Home);
        $(o.Video).attr('href', m.Video);
        $(o.Category).attr('href', m.Category);
        $(o.Pornstar).attr('href', m.Pornstar);
        $(o.Community).attr('href', m.Community);
        $(o.Photo).attr('href', m.Photo);
        $(o.Premium).attr('href', m.Premium);
        $(o.Gift).attr('href', m.Gift);
    },
    Gset: function (){
        $(o.GLogo).attr('href', m.GLogo);
        $(o.GHome).attr('href', m.GHome);
        $(o.GVideo).attr('href', m.GVideo);
        $(o.GCategory).attr('href', m.GCategory);
        $(o.GPornstar).attr('href', m.GPornstar);
        $(o.GCommunity).attr('href', m.GCommunity);
        $(o.GPhoto).attr('href', m.GPhoto);
        $(o.Gift).attr('href', m.Gift);
        $(o.GPremium).attr('href', m.GPremium);
    },
};
if (check.new || check.Premium) {
    page.Nset();
}
if (check.gay) {
    page.Gset();
}


// $('#hd-rightColVideoPage').remove();
        // PH.Downloader();
// let s2 = ('<div id="mcover"></div>');
// let host = document.location.hostname;
// let path = document.location.pathname;
// var search = window.location.search;
// var n = search.replace('?viewkey=','');
// let lS = window.localStorage;
// let pf = $('[src^="data:image/gif;base64"]');


// Downloader: function () {
//     if (ad_player_id) {
//         console.log("PORNHUB Downloader : Found video ID:" + ad_player_id);
//         let v = window["flashvars_" + ad_player_id];
//         console.log(
//             "PORNHUB Downloader : Try to find variable named 'flashvars_" +
//                 ad_player_id +
//                 "'"
//         );
//         let j = Object.values(v);
//         j.forEach(function (entry) {
//             var box = document.querySelector(".tab-menu-wrapper-row");
//             if (entry.length >= 20) {
//                 var c = entry.indexOf(".mp4");
//                 if (c != "-1") {
//                     var f = false;
//                     if (entry.indexOf("2160P") != "-1") f = "2160P";
//                     else if (entry.indexOf("1440P") != "-1") f = "1440P";
//                     else if (entry.indexOf("1080P") != "-1") f = "1080P";
//                     else if (entry.indexOf("720P") != "-1") f = "720P";
//                     else if (entry.indexOf("480P") != "-1") f = "480P";
//                     else if (entry.indexOf("240P") != "-1") f = "240P";
//                     else f = false;
//                     if (f !== false)
//                         box.innerHTML +=
//                             '<div class="tab-menu-wrapper-cell"><video class="player" controls data-plyr-config={ "autoplay": false } style="width:97vw; height:97vh;" data-tab="download-tab" target="_blank" src="' +
//                             entry +
//                             '" data-title="' +
//                             f +
//                             '"><i class="main-sprite-dark-2"></i><span>In ' +
//                             f +
//                             "</span></video></div>";
//                 }
//             }
//         });
//     }
//     PH.playerQuality();
// },
// playerQuality: function () {
//     console.log(debug + "Setting Player Quality");
//     if ('[data-title="2160P"]'.length) {
//         $('[data-title="2160P"]').attr("data-tab", "quality");
//     } else if ('[data-title="1440P"]'.length) {
//         $('[data-title="1440P"]').attr("data-tab", "quality");
//     } else if ('[data-title="1080P"]'.length) {
//         $('[data-title="1080P"]').attr("data-tab", "quality");
//     } else if ('[data-title="720P"]'.length) {
//         $('[data-title="720P"]').attr("data-tab", "quality");
//     } else if ('[data-title="480P"]'.length) {
//         $('[data-title="480P"]').attr("data-tab", "quality");
//     } else if ('[data-title="240P"]'.length) {
//         $('[data-title="240P"]').attr("data-tab", "quality");
//     }
//     $("head > script:nth-child(119)").remove();
//     $("#player").remove();
//     $('[data-tab="download-tab"]').remove();
//     $('[data-tab="quality"]').prependTo(".video-wrapper");
//     let nplayer = '[data-tab="quality"]';
//     nplayer.attr("controls", "");
//     // eslint-disable-next-line no-unused-vars
//     const player = new Plyr('[data-tab="quality"]', {
//         enabled: "true",
//         disableContextMenu: "false",
//         controls: [
//             "play-large", // The large play button in the center
//             "restart", // Restart playback
//             "rewind", // Rewind by the seek time (default 10 seconds)
//             "play", // Play/pause playback
//             "fast-forward", // Fast forward by the seek time (default 10 seconds)
//             "progress", // The progress bar and scrubber for playback and buffering
//             "current-time", // The current time of playback
//             "duration", // The full duration of the media
//             "mute", // Toggle mute
//             "volume", // Volume control
//             "captions", // Toggle captions
//             "settings", // Settings menu
//             "pip", // Picture-in-picture (currently Safari only)
//             "airplay", // Airplay (currently Safari only)
//             "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
//             "fullscreen", // Toggle fullscreen
//         ],
//         clickToPlay: "false",
//         // blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
//         quality: {
//             default: 2160,
//             options: [2160, 1440, 1080, 720, 576, 480, 360, 240],
//         },
//         settings: ["quality", "speed", "loop"],
//         autopause: "true",
//         autoplay: "true",
//         hideControls: "true",
//         keyboard: {
//             focused: true,
//             global: false,
//         },
//         tooltips: {
//             controls: false,
//             seek: true,
//         },
//         displayDuration: "true",
//         fullscreen: {
//             enabled: true,
//             fallback: true,
//             iosNative: false,
//             container: null,
//         },
//         storage: {
//             enabled: true,
//             key: "plyr",
//         },
//         previewThumbnails: {
//             enabled: true,
//             src:
//                 "https://dw.phncdn.com/videos/201911/19/262795372/180P_225K_262795372.webm?ttl=1590202466&rs=1200&hash=002f3983e99c3777ac6bff5e787c0dd9",
//         },
//     });
// },