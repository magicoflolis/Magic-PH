// console.clear();
import { $, debug, check } from "./values.js";
console.log(debug + "Loading...");
const PH = {};
let scrollnumber = 110;
let s = {
    Target: ".headerSearchWrapper",
    //Vid: '#player',
    FixVideoThumb: 0,
    Header: 1,
};
let c = {
    vPg: $("#vpContentContainer"),
};
(PH.Coms = $("#cmtWrapper")),
    (PH.Find = () => {
        if (check.home) {
            console.log(debug + "Detected Homepage");
            if (check.Premium) {
                console.log(debug + " User Premium");
                let t1 = ".feed_title > a".first().text();
                let t2 = t1.replace(/\s+/g, "");
                // eslint-disable-next-line no-unused-vars
                let sub = "subscriptions";
                $.trim(t2);
                $('a[href^="/users/"]').attr(
                    "href",
                    "/users/" + t2 + "/videos/favorites"
                );
                PH.phome();
            }
        }
        if (check.video) {
            let q = "mhp1138_quality.mhp1138_optionsList > li:nth-child(1)";
            scrollnumber = 400;
            $(".show-more-btn").addClass("bottom");
            $(q).attr("class", "mhp1138_active");
            PH.vpmod();
        }
        if (check.cv) {
            PH.catjunk();
        }
        if (check.user) {
            $(".profileClass").attr(
                "style",
                "width:97vw !important; height:inherit !important; margin:10px !important; padding:0 !important;"
            );
            $(".profileShareBtn").remove();
            $(".inboxButton").remove();
        }
        if (check.model) {
            // $('.amateurModel').attr('style','width:97vw !important; height:inherit !important;');
            // //$('.mainSection').attr('style','width:95vw !important; height:inherit !important;');
            // $('#profileContent').attr('style','width:95vw !important; height:inherit !important;');
        }
        if (check.pstar) {
            console.log(debug + "Path check");
            $(".pornstar_container").attr(
                "style",
                "width:inherit !important; height:inherit !important; margin:10px !important; padding:0 !important;"
            );
            // $('.sectionWrapper').attr("style","width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
        }
        if (check.gif) {
            $("#gifModalLink").click();
            $(".gifColumnRight").remove();
            $(".gifWebMWrapper").attr(
                "style",
                "width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;"
            );
            $("#gifWebmPlayer").attr(
                "style",
                "width:95vw !important; height:95vh !important; margin:0 !important; padding:0 !important;"
            );
            if (localStorage.getItem("comments") == "false") {
                PH.Coms.hide();
            } else {
                PH.Coms.show();
                PH.Coms.attr("class", "video-info-row showLess");
                PH.Coms.attr("style", "display: none; width: 30vw !important;");
            }
            if (check.lo) {
                $("#favoriteGifButton").remove();
                $("#shareGifButton").remove();
            }
        }
    }),
    (PH.clrVideo = () => {
        let g = ".tab-menu-wrapper-cell:nth-child(2)";
        console.log(debug + "Detected Video Page");
        if (check.lo) {
            console.log(debug + "User logged out");
            $(".video-info-row:nth-of-type(2)").remove();
            $(".buttonBase").remove();
            $(".votes-fav-wrap").remove();
            $('[data-tab="download-tab"]').remove();
            $('[data-tab="add-to-tab"]').remove();
        }
        if (check.Premium) {
            console.log(debug + "User Premium");
            c.vUV.appendTo('[data-mxp="Underplayer"]');
            c.vRV.children().appendTo("#relatedVideosCenter");
            PH.Coms.appendTo('[data-mxp="Underplayer"]');
            g.remove();
            $(".premium-detailed-underplayer-info").attr(
                "style",
                "width:85vw !important;"
            );
        } else {
            console.log(debug + "User not Premium");
            $(".feedSideBar > section:nth-child(1)").remove();
            c.vUV.appendTo(".video-detailed-info");
            c.vRV.children().appendTo("#relatedVideosCenter");
            PH.Coms.appendTo(".video-detailed-info");
        }
        // if (lIn.length) {
        // 	console.log('[Magic PH] User is logged in');
        // }
        if (localStorage.getItem("comments") == "false") {
            PH.Coms.hide();
        } else {
            PH.Coms.show()
                .attr("class", "video-info-row showLess")
                .attr("style", "display: none; width: 30vw !important;");
        }
    }),
    (PH.catjunk = () => {
        if (check.new || check.Premium) {
            $(
                "li.cat_pic:nth-of-type(86) > .category-wrapper > .js-mxp"
            ).remove();
            $("li.cat_pic:nth-of-type(86) > .category-wrapper > h5").remove();
            $(
                "li:nth-of-type(92) > .checkHomepage > .js-mxp.sidebarIndent"
            ).remove();
        }
        if (check.gay) {
            $("#categoriesGay").prependTo(".nf-categories-sidebar");
        }
        $("#categoriesStraight").prependTo(".nf-categories-sidebar");
        $('a[href="/video?o=tr"]').attr("href", "/video?o=tr&hd=1");
        $('a[href="/channels"]').remove();
        $(".sidebar_wrapper:nth-of-type(7)").remove();
        $(".section_bar_sidebar").remove();
        $(".active.sidebarIndent").remove();
        $(".section_bar_sidebar:nth-of-type(7)").prependTo(
            "nf-categories-sidebar"
        );
    }),
    (PH.vpmod = () => {
        $(".relatedVideos")
            .attr("id", "vb")
            .attr("class", "video-info-row showLess");
        $("#vb").appendTo(".video-actions-tabs");
        $(".videos-list")
            .attr("id", "vr")
            .attr("class", "video-info-row showLess");
        $("#vr").appendTo(".video-actions-tabs");
        if (localStorage.getItem("altplayers") == "true") {
            $("#player").attr("style", "display:none;");
            PH.clrVideo();
        }
        $("#player").attr("class", "mainPlayerDiv wide");
    }),
    (PH.vpimg = () => {
        let i = $("img.thumb");
        let pic =
            "https://di.phprcdn.com/videos/202002/10/283357802/original/(m=eafTGgaaaa)(mh=a4Si8CrK7o2h8zr9)1.jpg";
        i.attr("src", pic)
            .attr("data-thumb_url", pic)
            .attr("data-src", pic)
            .attr("data-mediumthumb", pic)
            .attr("data-path", pic)
            .attr("style", "")
            .attr("data-fancybox", "");
    }),
    (PH.phome = () => {
        $(".feed_wrapper").prependTo(".container");
        $("#subscriptionVideosSlider").prependTo(".container");
        $(".container").prepend("#topPicksSlider");
        $("#popularPornstarsSlider").remove();
        $(".sectionCarousel.sectionWrapper").remove();
        $("sectionWrapperPremium:nth-of-type(7)").remove();
    });

function magicscroll() {
    $("html, body").animate({ scrollTop: 100 }, 800);
}

if (localStorage.getItem("topbutton") == "true") {
    $("#btnMenuList").click((f) => {
        f.preventDefault();
        return magicscroll();
    });
    $(window).scroll(() => {
        let sticky = $(s.Target),
            scroll = $(window).scrollTop();
        if (scroll >= scrollnumber) {
            sticky.addClass("sticky fixed");
            $("#btnMenuList").addClass("sticky fixed");
            $("#btnMenuList").show();
        } else {
            sticky.attr("style", "width:100%");
            sticky.removeClass("sticky fixed");
            $("#btnMenuList").hide();
        }
    });
}

if (localStorage.getItem("blurimg") == "true") {
    $(".js-mxp > img").attr("id", "blur");
    $("img.thumb").attr("id", "blur");
    $(".title").hide();
}

if (localStorage.getItem("magicthumb") == "false") {
    PH.vpimg();
}

$(".logoWrapper > a:nth-child(1)").click((e) => {
    e.preventDefault();
    $(".sidenav").show();
});

$(".container").click(() => {
    $(".sidenav").hide();
});

PH.Find();

if (localStorage.getItem("autoscroll") == "true") {
    magicscroll();
}

console.log(debug + "Loading Complete!");