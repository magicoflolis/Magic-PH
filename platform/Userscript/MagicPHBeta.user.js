// ==UserScript==
// @run-at       document-start
// @name         Magic's PornHub AIO Beta
// @namespace    https://github.com/magicoflolis
// @version		 2020.03.26
// @author       Magic Of Lolis
// @description  AIO tweaks for PornHub and PornHub Premium
// @homepage	 https://twitter.com/for_lollipops
// @homepageURL  https://twitter.com/for_lollipops
// @supportURL	 https://github.com/magicoflolis/Magic-PH/issues
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/MagicPHBeta.user.js
// @installURL   https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/MagicPHBeta.user.js
// @setupURL     https://raw.githubusercontent.com/magicoflolis/Magic-PH/MagicPHBeta.user.js
// @updateURL    https://raw.githubusercontent.com/magicoflolis/Magic-PH/MagicPHBeta.user.js
// @match        *://*.pornhubpremium.com/*
// @match        *://*.pornhub.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(function () {
    "use strict";
    console.clear();
    var debug = {
        h: '[Magic PH] ',
    };
    var he = $('<meta http-equiv="Access-Control-Allow-Origin" content="*" />');
    pol = $('<script src="https://polyfill.io/v3/polyfill.js?features=default%2Ces6"></script>');
    //v1 = $('<script src="https://cdn.plyr.io/3.6.2/plyr.js"></script>');
    v1 = $('<link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />');
    v2 = $('<script src="https://cdn.plyr.io/3.6.2/plyr.polyfilled.js"></script>');
    $("head")
        .append(pol)
        .append(v1)
        .append(v2)
        .append(he);
    // $("body")
    // .append(v2);
    var s = {
        Target: '.headerSearchWrapper',
        //Vid: '#player',
        Comments: 0,
        FixVideoThumb: 0,
        Header: 1, //WIP
    };
    var s1 = $('<input value="Top" type="button" id="btnMenuList" style="position:fixed !important; top:97%; left:45%; width:5vw; height: 2vh; margin:0; padding:0; background-color:black" />');
    var host = window.location.hostname;
    var path = window.location.pathname;
    var search = window.location.search;
    var n = search.replace('?viewkey=', '');
    var lS = window.localStorage;
    var pf = $('[src^="data:image/gif;base64"]');
    var m = {
        Logo: "/",
        Home: "/",
        Video: "/video?o=tr&hd=1",
        Category: "/categories?o=al",
        Pornstar: "/pornstars?performerType=pornstar",
        Community: "/user/discover",
        Photo: "/gifs",
        Premium: "/premium",
        GPremium: "/gay/premium",
        Gift: "/premium",
        GLogo: "/gayporn",
        GHome: "/",
        GVideo: "/gay/video?o=tr&hd=1",
        GCategory: "/gay/categories?o=al",
        GPornstar: "/gay/pornstars?performerType=pornstar",
        GCommunity: "/user/discover/gay",
        GPhoto: "/gay/gifs?o=tr",
    };
    var o = {
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
    var c = {
        img: $('img.thumb'),
        pic: 'https://di.phprcdn.com/videos/202002/10/283357802/original/(m=eafTGgaaaa)(mh=a4Si8CrK7o2h8zr9)1.jpg',
        vPg: $('#vpContentContainer'),
        vUV: $('#hd-leftColVideoPage > div:nth-child(2)'),
        vRV: $('#relateRecommendedItems'),
        Coms: $('#cmtWrapper'),
    };
    var check = {
        home: $(".frontListingWrapper").length,
        video: $('#vpContentContainer').length,
        cv: $('.gridWrapper').length,
        new: $("#headerSearchWrapperFree").length,
        gay: $(".container.gayLayout").length,
        lo: $(".logged-out").length,
        premium: $(".premiumUser").length,
        gif: $('#gifWrap').length,
        user: $('#profileContent').length,
        model: $('.tipping_modals_container').length,
    };
    var page = {
        Nset: function () {
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
        Gset: function () {
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
        junk: function () {
            $('.headerSearchWrapper').prepend(s1);
            $('#btnMenuList').hide();
            $("body").attr("style", "width:100% !important; height:100% !important; margin:0 !important; padding:0 !important;");
            $(".container").attr("style", "width:inherit !important; height:inherit !important; margin:10px !important; padding:0 !important;");
            //$('.clearfix').remove();
            $('.networkBar').remove();
            $('#pornportal-wrapper').remove();
            $('.livesex').remove();
            $('.realsex').remove();
            $('a[data-mxptext="Live Cams"]').remove();
            $('a[href*="javascript:signinbox"]').remove();
            $('a[href*="/upload"]').remove();
            $('a[data-entrycode="DiscoverPremium"]').remove();
            $('.trendingWrapper').remove();
            $('.popularFilterPornstar').remove();
            $('.popularSearches').remove();
            $('.popularSearchIcon').remove();
            $('#menuItem3 > div > div > div > p').remove();
            $('#headerUpgradePremiumBtn');
            $('li.omega:nth-child(11)');
            $('.modalWrapper').remove();
            $('button.tooltipTrig.open-playlist-link.playlist-trigger').remove();
            $('#welcome').remove();
            $('.footerContentWrapper').remove();
            $('.removeAdLink').remove();
            if (check.new || check.Premium) {
                page.Nset();
            }
            if (check.gay) {
                page.Gset();
            }
            PH.Find();
        },
        catjunk: function () {
            $('.gridWrapper').attr("style", "width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
            $('.firstPage').attr("style", "left:20% !important;");
            if (check.new || check.Premium) {
                $('li.cat_pic:nth-of-type(86) > .category-wrapper > .js-mxp').remove();
                $('li.cat_pic:nth-of-type(86) > .category-wrapper > h5').remove();
                $('li:nth-of-type(92) > .checkHomepage > .js-mxp.sidebarIndent').remove();
                $('#categoriesStraight').prependTo('.nf-categories-sidebar');
            }
            if (check.gay) {
                $('#categoriesGay').prependTo('.nf-categories-sidebar');
            }
            $('a[href="/video?o=tr"]').attr('href', '/video?o=tr&hd=1');
            $('a[href="/channels"]').remove();
            $('.sidebar_wrapper:nth-of-type(7)').remove();
            $('.section_bar_sidebar').remove();
            $('ul > li:nth-child(1) > span').remove();
            $('ul > li:nth-child(2) > span').remove();
            $('.active.sidebarIndent').remove();
            $('.section_bar_sidebar:nth-of-type(7)').prependTo('nf-categories-sidebar');
        },
        vpjunk: function () {
            $('[href^="javascript:void(0)"]').remove();
            $('.abovePlayer').remove();
            $('.subscribers-count').remove();
            $('.fanclub-info-pop').remove();
            $('.js-paidDownload').remove();
            $('#under-player-playlists').remove();
            $('.alpha.videoBox.videoblock.js-pop.pcVideoListItem').remove();
            $('#p2vVideosVPage').remove();
            $('.favorites-message').remove();
            $('.streamatesModelsContainer').remove();
            $('.active.fanclub-info-pop').remove();
            $('#hd-rightColVideoPage').remove();
            $('.section-relateds').remove();
            $('#under-player-comments').remove();
            $('[data-tab="jump-to-tab"]').remove();
        },
        vpmod: function () {
            $('#player').attr("style", "display:none;");
            //c.vPg.attr('style', 'display:unset !important;');
            var n = $('.pcVideoListItem');
            $.each(n, function (i) {
                n.attr('style', 'display:flex;');
                n.attr('class', 'pcVideoListItem js-pop videoblock videoBox');
            });
            $.each(pf, function (i) {
                pf.attr('src', c.pic);
            });
            $('.video-actions-menu').prependTo('.video-actions-container');
            $('#main-container').attr("style", "width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
            $('.video-wrapper').attr("style", "width:97vw !important; height:inherit !important; margin:0 !important; padding:0 !important;");
            $('.video-detailed-info').attr('style', 'width:inherit !important;');
            $('#relatedVideosCenter').attr('style', 'display:grid;');
            c.vUV
                .attr('class', 'video-info-row showLess')
                .attr('style', 'display:none;');
            c.vRV
                .attr('class', 'video-info-row showLess')
                .attr('style', 'display:none;');
            PH.clrVideo();
        },
        vpimg: function () {
            c.img
                .attr('src', c.pic)
                .attr('data-thumb_url', c.pic)
                .attr('data-thumb_url', c.pic)
                .attr('data-src', c.pic)
                .attr('data-mediumthumb', c.pic)
                .attr('data-path', c.pic)
                .attr('style', 'width:50vw !important;height:50vh !important;');
            c.img.attr('data-fancybox', '');
        },
        phome: function () {
            $('.feed_wrapper').prependTo('.container');
            $('#subscriptionVideosSlider').prependTo('.container');
            $('.container').prepend('#topPicksSlider');
            $('#trendingChannelsSlider').remove();
            $('.featuredNetwork > .sectionWrapperPremium').remove();
            $('.featuredChannel').remove();
            $('#popularPornstarsSlider').remove();
            $('.sectionCarousel.sectionWrapper').remove();
            $('sectionWrapperPremium:nth-of-type(7)').remove();
        },
    };
    PH = {
        Find: function () {
            if (check.home) {
                PH.HomePage();
            }
            if (check.video) {
                page.vpmod();
            }
            if (check.cv) {
                page.catjunk();
            }
            if (check.user) {
                $('.profileClass').attr('style', 'width:97vw !important; height:inherit !important; margin:10px !important; padding:0 !important;');
                $('.profileShareBtn').remove();
                $('.inboxButton').remove();
            }
            if (check.model) {
                // $('.amateurModel').attr('style','width:97vw !important; height:inherit !important;');
                // //$('.mainSection').attr('style','width:95vw !important; height:inherit !important;');
                // $('#profileContent').attr('style','width:95vw !important; height:inherit !important;');
            }
            if (path == '/pornstars') {
                $('.pornstar_container').attr("style", "width:inherit !important; height:inherit !important; margin:10px !important; padding:0 !important;");
                // $('.sectionWrapper').attr("style","width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
            }
            if (check.gif) {
                $('#gifModalLink').click();
                $('.gifColumnRight').remove();
                $('.gifWebMWrapper').attr("style", "width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
                $('#gifWebmPlayer').attr("style", "width:95vw !important; height:95vh !important; margin:0 !important; padding:0 !important;");
                if (s.Comments == 0) {
                    c.Coms.hide();
                } else {
                    c.Coms.show();
                    c.Coms.attr('class', 'video-info-row showLess');
                    c.Coms.attr('style', 'display: none; width: 30vw !important;');
                }
                if (check.lo) {
                    $('#favoriteGifButton').remove();
                    $('#shareGifButton').remove();
                }
            }
        },
        clrVideo: function () {
            console.log(debug.h + 'Detected Video Page');
            var g = $('.tab-menu-wrapper-cell:nth-child(2)');
            page.vpjunk();
            if (check.lo) {
                console.log(debug.h + 'User logged out');
                $('.video-info-row:nth-of-type(2)').remove()
                $('.buttonBase').remove();
                $('.votes-fav-wrap').remove();
                $('[data-tab="download-tab"]').remove();
                $('[data-tab="add-to-tab"]').remove();
            }
            if (check.Premium) {
                console.log(debug.h + 'User Premium');
                c.vUV.appendTo('[data-mxp="Underplayer"]');
                c.vRV.children().appendTo('#relatedVideosCenter');
                c.Coms.appendTo('[data-mxp="Underplayer"]');
                g.remove();
                $('.premium-detailed-underplayer-info').attr('style', 'width:85vw !important;');
            } else {
                console.log(debug.h + 'User not Premium');
                $('.feedSideBar > section:nth-child(1)').remove();
                c.vUV.appendTo('.video-detailed-info');
                c.vRV.children().appendTo('#relatedVideosCenter');
                c.Coms.appendTo('.video-detailed-info');
            }
            // if (lIn.length) {
            // 	console.log('[Magic PH] User is logged in');
            // }
            if (s.Comments == 0) {
                c.Coms.hide();
            } else {
                c.Coms
                    .show()
                    .attr('class', 'video-info-row showLess')
                    .attr('style', 'display: none; width: 30vw !important;');
            }
            if (s.FixVideoThumb == 1) {
                page.vpimg();
            }
            PH.Downloader();
            //$('#player').ready(PH.Downloader());
        },
        Downloader: function () {
            if (ad_player_id) {
                console.log('PORNHUB Downloader : Found video ID:' + ad_player_id);
                var v = window['flashvars_' + ad_player_id];
                console.log(
                    "PORNHUB Downloader : Try to find variable named 'flashvars_" +
                    ad_player_id +
                    "'"
                );
                var j = Object.values(v);
                j.forEach(function (entry) {
                    var box = document.querySelector('.tab-menu-wrapper-row');
                    if (entry.length >= 20) {
                        var c = entry.indexOf('.mp4');
                        if (c != '-1') {
                            var f = false;
                            if (entry.indexOf('2160P') != '-1') f = '2160P';
                            else if (entry.indexOf('1440P') != '-1') f = '1440P';
                            else if (entry.indexOf('1080P') != '-1') f = '1080P';
                            else if (entry.indexOf('720P') != '-1') f = '720P';
                            else if (entry.indexOf('480P') != '-1') f = '480P';
                            else if (entry.indexOf('240P') != '-1') f = '240P';
                            else f = false;
                            if (f !== false)
                                box.innerHTML +=
                                '<div class="tab-menu-wrapper-cell"><video class="player" controls data-plyr-config={ "autoplay": false } style="width:97vw; height:97vh;" data-tab="download-tab" target="_blank" src="' +
                                entry +
                                '" data-title="' +
                                f +
                                '"><i class="main-sprite-dark-2"></i><span>In ' +
                                f +
                                '</span></video></div>';
                        }
                    }
                });
            }
            PH.playerQuality();
        },
        playerQuality: function () {
            console.log(debug.h + 'Setting Player Quality');
            if ($('[data-title="2160P"]').length) {
                $('[data-title="2160P"]').attr('data-tab', 'quality');
            } else if ($('[data-title="1440P"]').length) {
                $('[data-title="1440P"]').attr('data-tab', 'quality');
            } else if ($('[data-title="1080P"]').length) {
                $('[data-title="1080P"]').attr('data-tab', 'quality');
            } else if ($('[data-title="720P"]').length) {
                $('[data-title="720P"]').attr('data-tab', 'quality');
            } else if ($('[data-title="480P"]').length) {
                $('[data-title="480P"]').attr('data-tab', 'quality');
            } else if ($('[data-title="240P"]').length) {
                $('[data-title="240P"]').attr('data-tab', 'quality');
            }
            $('head > script:nth-child(119)').remove();
            $('#player').remove();
            $('[data-tab="download-tab"]').remove();
            $('[data-tab="quality"]').prependTo('.video-wrapper');
            var nplayer = $('[data-tab="quality"]');
            nplayer.attr('controls', '');
            const player = new Plyr('[data-tab="quality"]', {
                enabled: 'true',
                disableContextMenu: 'false',
                controls: [
                    'play-large', // The large play button in the center
                    'restart', // Restart playback
                    'rewind', // Rewind by the seek time (default 10 seconds)
                    'play', // Play/pause playback
                    'fast-forward', // Fast forward by the seek time (default 10 seconds)
                    'progress', // The progress bar and scrubber for playback and buffering
                    'current-time', // The current time of playback
                    'duration', // The full duration of the media
                    'mute', // Toggle mute
                    'volume', // Volume control
                    'captions', // Toggle captions
                    'settings', // Settings menu
                    'pip', // Picture-in-picture (currently Safari only)
                    'airplay', // Airplay (currently Safari only)
                    'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
                    'fullscreen', // Toggle fullscreen
                ],
                clickToPlay: 'false',
                blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
                quality: {
                    default: 2160,
                    options: [2160, 1440, 1080, 720, 576, 480, 360, 240]
                },
                settings: ['quality', 'speed', 'loop'],
                autopause: 'true',
                autoplay: 'true',
                hideControls: 'true',
                keyboard: {
                    focused: true,
                    global: false
                },
                tooltips: {
                    controls: false,
                    seek: true
                },
                displayDuration: 'true',
                fullscreen: {
                    enabled: true,
                    fallback: true,
                    iosNative: false,
                    container: null
                },
                storage: {
                    enabled: true,
                    key: 'plyr'
                },
                previewThumbnails: {
                    enabled: true,
                    src: 'https://dw.phncdn.com/videos/201911/19/262795372/180P_225K_262795372.webm?ttl=1590202466&rs=1200&hash=002f3983e99c3777ac6bff5e787c0dd9'
                }
            });
        },
        HomePage: function () {
            console.log(debug.h + 'Detected Homepage');
            var front = $('.frontListingWrapper');
            front.attr("style", "width:95vw !important; height:inherit !important; margin:10px !important; padding:0 !important;");
            $('.firstPage').attr("style", "left:20% !important;");
            $('#mostRecentVideosSection').remove();
            $('.sectionWrapper:nth-child(5) > .sectionTitle').remove();
            if (check.Premium) {
                console.log(debug.h + ' User Premium');
                var t1 = $('.feed_title > a').first().text();
                var t2 = t1.replace(/\s+/g, '');
                var sub = 'subscriptions';
                $.trim(t2);
                $('a[href^="/users/"]').attr(
                    'href',
                    '/users/' + t2 + '/videos/favorites'
                );
                page.phome();
            }
            if (s.Header == 0) {
                $('body').prepend(s1);
                $('#header').toggle();
                $('#btnMenuList').on('click', function () {
                    $('#header').toggle();
                });
            }
        }
    };
    console.log(debug.h + 'Loading...');
    page.junk();
    $('#btnMenuList').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 100
        }, 800);
    });
    if (check.video) {
        $('.show-more-btn').addClass("bottom");
        $(window).scroll(function () {
            var sticky = $(s.Target),
                scroll = $(window).scrollTop();
            if (scroll >= 400) {
                sticky.attr('style', 'left: 0; top: 0; margin: 0px; padding: 0px; width:99vw;');
                sticky.addClass('sticky fixed');
                $('#btnMenuList').addClass('sticky fixed');
                $('.fixed').css({
                    "position": "fixed !important;",
                    "top": "0;",
                    "left": "0;",
                    "width": "95vw;"
                });
                $('#btnMenuList').show();
            } else {
                sticky.attr('style', 'width:100%');
                sticky.removeClass('sticky fixed');
                $('#btnMenuList').hide();
            }
        });
    } else {
        $(window).scroll(function () {
            var sticky = $(s.Target),
                scroll = $(window).scrollTop();
            if (scroll >= 100) {
                sticky.attr('style', 'left: 0; top: 0; margin: 0px; padding: 0px; width:99vw;');
                sticky.addClass('sticky fixed');
                $('#btnMenuList').addClass('sticky fixed');
                $('.fixed').css({
                    "position": "fixed !important;",
                    "top": "0;",
                    "left": "0;",
                    "width": "95vw;"
                });
                $('#btnMenuList').show();
            } else {
                sticky.attr('style', 'width:100%');
                sticky.removeClass('sticky fixed');
                $('#btnMenuList').hide();
            }
        });
    }
    $('html, body').animate({
        scrollTop: 100
    }, 800);
    console.log(debug.h + 'Loading Complete!');
});