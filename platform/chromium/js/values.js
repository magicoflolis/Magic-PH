"use strict";
import "../libs/jquery.js";
let $ = window.$,
    debug = "[Magic PH] ",
    cfg = {};
cfg.blurimg = false;
cfg.thumbnails = true;
cfg.comments = false;
cfg.autoscroll = true;
cfg.topbutton = true;
cfg.altplayers = false;

let check = {
        home: $(".frontListingWrapper").length,
        video: $("#player").length,
        cv: $(".gridWrapper").length,
        new: $("#headerSearchWrapperFree").length,
        gay: $(".container.gayLayout").length,
        lo: $(".logged-out").length,
        premium: $(".premiumUser").length,
        gif: $("#gifWrap").length,
        user: $("#profileContent").length,
        model: $(".tipping_modals_container").length,
        pstar: $(".pornstar_container").length,
    },
    m = {
        Logo: "/recommended",
        Home: "/",
        Video: "/video?o=tr&hd=1",
        Category: "/categories?o=al",
        Pornstar: "/pornstars?performerType=pornstar",
        Community: "/user/discover",
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
    },
    o = {
        Logo: '.logoWrapper > a[href="/"]',
        Home: '.home > a[href="/"]',
        Video: '.videos > a[href="/video"]',
        Category: '.categories > a[href="/categories"]',
        Pornstar: '.pornstar > a[href="/pornstars"]',
        Community: '.community > a[href^="/community"]',
        Photo: '.photos > a[href^="/albums"]',
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
if (check.new || check.Premium) {
    $(o.Logo).attr("href", m.Logo);
    $(o.Home).attr("href", m.Home);
    $(o.Video).attr("href", m.Video);
    $(o.Category).attr("href", m.Category);
    $(o.Pornstar).attr("href", m.Pornstar);
    $(o.Community).attr("href", m.Community);
    $(o.Photo).attr("href", m.Photo);
    $(o.Premium).attr("href", m.Premium);
    $(o.Gift).attr("href", m.Gift);
}
if (check.gay) {
    $(o.GLogo).attr("href", m.GLogo);
    $(o.GHome).attr("href", m.GHome);
    $(o.GVideo).attr("href", m.GVideo);
    $(o.GCategory).attr("href", m.GCategory);
    $(o.GPornstar).attr("href", m.GPornstar);
    $(o.GCommunity).attr("href", m.GCommunity);
    $(o.GPhoto).attr("href", m.GPhoto);
    $(o.Gift).attr("href", m.Gift);
    $(o.GPremium).attr("href", m.GPremium);
}
if (check.video) {
    $(o.Home).attr("href", "/recommended");
}

if (localStorage.getItem("magicran") == "0") {
    localStorage.setItem("blurimg", cfg.blurimg);
    localStorage.setItem("magicthumb", cfg.thumbnails);
    localStorage.setItem("comments", cfg.comments);
    localStorage.setItem("autoscroll", cfg.autoscroll);
    localStorage.setItem("topbutton", cfg.topbutton);
    localStorage.setItem("altplayers", cfg.altplayers);
    localStorage.setItem("magicran", "1");
}

localStorage.setItem("blurimg", cfg.blurimg);
localStorage.setItem("magicthumb", cfg.thumbnails);
localStorage.setItem("comments", cfg.comments);
localStorage.setItem("autoscroll", cfg.autoscroll);
localStorage.setItem("topbutton", cfg.topbutton);
localStorage.setItem("altplayers", cfg.altplayers);

export { $, debug, cfg, check };
