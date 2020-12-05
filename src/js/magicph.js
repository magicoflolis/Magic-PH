// console.clear();
import { $, coms, debug, PH, check, code, iframe, catlist, mNav, s, c} from './core.js'
import './values.js'
console.log(`${debug} Loading...`);
let scrollnumber = 110,
sn = $('.sidenav'),
magicN = $('#magicNav');
    (PH.Find = () => {
        if(check.channel) {
            console.log(`${debug} Channel`);
        }
        if(check.home) {
            console.log(`${debug} Detected Homepage`);
            if (check.Premium) {
                console.log(`${debug} User Premium`);
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
            $('#recommended-category-videos').prependTo('.frontListingWrapper');
            $('#recommended-videos').prependTo('.frontListingWrapper');
            // $('div.sectionWrapper:nth-of-type(3)').appendTo('.frontListingWrapper');
        }
        if(check.video) {
            console.log(`${debug} Video Page`);
            let q = "mhp1138_quality.mhp1138_optionsList > li:nth-child(1)";
            scrollnumber = 400;
            $(".show-more-btn").addClass("bottom");
            $(q).attr("class", "mhp1138_active");
            PH.vpmod();
        }
        if(check.cv) {
            console.log(`${debug} Categories`);
            PH.catjunk();
        }
        if(check.user) {
            console.log(`${debug} User`);
            // $(".profileClass").attr(
            //     "style",
            //     "width:97vw !important; height:inherit !important; margin:10px !important; padding:0 !important;"
            // );
            // $(".profileShareBtn").remove();
            // $(".inboxButton").remove();
        }
        if(check.model) {
            console.log(`${debug} Model`);
            // $('.amateurModel').attr('style','width:97vw !important; height:inherit !important;');
            // //$('.mainSection').attr('style','width:95vw !important; height:inherit !important;');
            // $('#profileContent').attr('style','width:95vw !important; height:inherit !important;');
        }
        if(check.pstar) {
            console.log(`${debug} Pornstar`);
            // $(".pornstar_container").attr(
            //     "style",
            //     "width:inherit !important; height:inherit !important; margin:10px !important; padding:0 !important;"
            // );
            // $('.sectionWrapper').attr("style","width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
        }
        if(check.gif) {
            console.log(`${debug} Gifs`);
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
            if(check.lo) {
                $("#favoriteGifButton").remove();
                $("#shareGifButton").remove();
            }
        }
    }),
    (PH.clrVideo = () => {
        let g = ".tab-menu-wrapper-cell:nth-child(2)";
        console.log(`${debug} Detected Video Page`);
        if (check.lo) {
            console.log(`${debug} User logged out`);
            $(".video-info-row:nth-of-type(2)").remove();
            $(".buttonBase").remove();
            $(".votes-fav-wrap").remove();
            $('[data-tab="download-tab"]').remove();
            $('[data-tab="add-to-tab"]').remove();
        }
        if (check.Premium) {
            console.log(`${debug} User Premium`);
            c.vUV.appendTo('[data-mxp="Underplayer"]');
            c.vRV.children().appendTo('#relatedVideosCenter');
            coms.appendTo('[data-mxp="Underplayer"]');
            g.remove();
            $(".premium-detailed-underplayer-info").attr(
                "style",
                "width:85vw !important;"
            );
        } else {
            console.log(`${debug} User not Premium`);
            $(".feedSideBar > section:nth-child(1)").remove();
            c.vUV.appendTo('.video-detailed-info');
            c.vRV.children().appendTo('#relatedVideosCenter');
            coms.appendTo('.video-detailed-info');
        }
        // if (lIn.length) {
        // 	console.log(`${debug} User is logged in`);
        // }
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
        $("#vr").appendTo("#vb");
        // if (localStorage.getItem("altplayers") == "true") {
        //     $("#player").attr("style", "display:none;");
        //     PH.clrVideo();
        // }
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

$(window).scroll(() => {
    let sticky = $(s.Target),
        scroll = $(window).scrollTop();
    if (scroll >= scrollnumber) {
        $("#magicTop").show();
        sticky.addClass("sticky");
        $(".pagination3 > ul").addClass("fixed");
    } else {
        $("#magicTop").hide();
        sticky.removeClass("sticky");
        $(".pagination3 > ul").removeClass("fixed");
    }
});

iframe.setAttribute("id", "myframe");

// Opens Sidebar
$('.logo > .logoWrapper > a').click((e) => {
    e.preventDefault();
    $('.sidenav').show();
});

// Restores original
$(".container").click(() => {
    $("#myframe").remove();
    $(".sidenav > div").remove();
    sn.attr("style", "width: 250px");
    magicN.show();
    sn.hide();
});

$(".sidenav > a.cat").click(() => {
    sn.attr("style", "width: 300px");
    magicN.hide();
    catlist.innerHTML = code;
    mNav.appendChild(catlist);
    sn.show();
});
$(".sidenav > a.rec").click(() => {
    sn.attr("style", "width: 75vw");
    magicN.hide();
    iframe.src = "/recommended";
    iframe.setAttribute("style", "width: 75vw");
    mNav.appendChild(iframe);
    sn.show();
});
$(".sidenav > a.tas").click(() => {
    sn.attr("style", "width: 50vw");
    magicN.hide();
    iframe.src = "/recommended/taste";
    iframe.setAttribute("style", "width: 50vw");
    mNav.appendChild(iframe);
    sn.show();
});

PH.Find();

iframe.onload = () => {
    let x = document.getElementById("myframe"),
        y = x.contentDocument ? x.contentDocument : x.contentWindow.document,
        iHeader = y.getElementById("header"),
        irST = y.querySelector(".sectionWrapper > .sectionTitle"),
        irRM = y.querySelector(".sectionWrapper > .recommendationsMessages"),
        itTI = y.querySelector(".taste-instruction"),
        itST = y.querySelector(".sectionTitle");
    iHeader.setAttribute("style", "display: none !important;");
    y.body.setAttribute("style", "overflow-x: hidden !important;");
    if (y.location.pathname == "/recommended") {
        y.querySelector(".recommendedVideosContainer").setAttribute("style", "width: 90vw !important");
        irRM.setAttribute("style", "display: none !important;");
        irST.setAttribute("style", "display: none !important;");
    }
    if (y.location.pathname == "/recommended/taste") {
        itTI.setAttribute("style", "display: none !important;");
        itST.setAttribute("style", "display: none !important;");
    }
};


console.log(`${debug} Loading Complete!`);
