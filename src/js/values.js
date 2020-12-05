import { $, coms, cfg, check, ls, mran, m, o } from './core.js'

$('head > title').text('MagicPH')
// DEFAULTS
cfg.altplayers = false;
cfg.autoscroll = true;
// cfg.blurimg = false;
cfg.blurimg = true;
cfg.comments = false;
cfg.fasttravel = true;
cfg.thumbnails = true;
cfg.topbutton = true;

ls.setup = () => {
    localStorage.setItem("altplayers", cfg.altplayers);
    localStorage.setItem("autoscroll", cfg.autoscroll);
    localStorage.setItem("blurimg", cfg.blurimg);
    localStorage.setItem("comments", cfg.comments);
    localStorage.setItem("magicran", 1);
    localStorage.setItem("magicthumb", cfg.thumbnails);
    localStorage.setItem("topbutton", cfg.topbutton);
    window.location.reload();
}
ls.begin = () => {
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
    if(localStorage.getItem("autoscroll") == "true") {
        $("html, body").animate({ scrollTop: 100 }, 800);
    }
    if(localStorage.getItem("blurimg") == "true") {
        $(".js-mxp > img").attr("id", "blur");
        $("img.thumb").attr("id", "blur");
        $(".title").hide();
    }
    if (localStorage.getItem("comments") == "false") {
        coms.hide();
    } else {
        coms.addClass('video-info-row showLess');
    }
    if(localStorage.getItem("topbutton") == "false") {
        $('#magicTop').addClass('rm')
    }
}

if (mran == undefined || mran == null) {
    ls.setup();
} else {
    ls.begin();
}

// function testmagic() {
//     let b = (mran == undefined || mran == null) ? c : d,
//     c = () => {
//         localStorage.setItem("blurimg", cfg.blurimg);
//     localStorage.setItem("magicthumb", cfg.thumbnails);
//     localStorage.setItem("comments", cfg.comments);
//     localStorage.setItem("autoscroll", cfg.autoscroll);
//     localStorage.setItem("topbutton", cfg.topbutton);
//     localStorage.setItem("altplayers", cfg.altplayers);
//     localStorage.setItem("magicran", "1");
//     },
//     d = () => {
//         localStorage.setItem("blurimg", cfg.blurimg);
//     localStorage.setItem("magicthumb", cfg.thumbnails);
//     localStorage.setItem("comments", cfg.comments);
//     localStorage.setItem("autoscroll", cfg.autoscroll);
//     localStorage.setItem("topbutton", cfg.topbutton);
//     localStorage.setItem("altplayers", cfg.altplayers);
//     };
//     return b
// }
