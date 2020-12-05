// ==UserScript==
// @run-at	 	 document-start
// @version      2.125
// @name         Magic PH
// @author       Magic Of Lolis <magicoflolis@gmail.com> https://magicoflolis.github.io/Arnoodle
// @description  AIO tweaks for PornHub and PornHub Premium
// @homepage	 https://magicoflolis.github.io/Arnoodle
// @homepageURL  https://magicoflolis.github.io/Arnoodle
// @downloadURL  https://github.com/magicoflolis/Arnoodle/raw/master/MagicPH.user.js
// @updateURL  	 https://github.com/magicoflolis/Arnoodle/raw/master/MagicPH.user.js
// @supportURL   https://github.com/magicoflolis/Arnoodle/issues
// @include      *://*.pornhubpremium.com/*
// @include      *://*.pornhub.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

//$('').remove();
// TEST VIDEOS
// https://www.pornhub.com/view_video.php?viewkey=ph5e7ebbda1db25 (PH)
// https://www.pornhub.com/view_video.php?viewkey=ph5e446fc72d689 (PH Gay)
// https://www.pornhubpremium.com/view_video.php?viewkey=ph5e785154405b7 (PHP)
// https://www.pornhubpremium.com/view_video.php?viewkey=ph5e446fc72d689 (PHP Gay)
// .mhp1138_icon-size-large.mhp1138_icon.mhp1138_normal.mhp1138_btn

$(function () {
	// ---SETTINGS PAGE---
	var hideComments = 1; // Comment section
	var clearWatched = 0; // [WIP]Clears watched videos from browser
	// --URLs can be any url within site--
	var PHLogoURL = '/'; // Site logo
	var homeURL = '/';
	var videoURL = '/video?o=tr&t=t&hd=1';
	var premiumURL = '/premium'; // PREMIUM SITE ONLY
	var giftURL = '/premium'; // PREMIUM SITE ONLY
	var categoryURL = '/categories?o=al';
	var pornstarURL = '/pornstars?performerType=pornstar';
	var communityURL = '/user/discover/popular_verified_members';
	var photoURL = '/gifs';
	// GP = Gay Porn
	var GPLogoURL = '/gayporn'; // Site logo
	var GPhomeURL = '/';
	var GPvideoURL = '/gay/video?o=tr&t=t&hd=1';
	var GPpremiumURL = '/gay/premium'; // PREMIUM SITE ONLY
	var GPcategoryURL = '/gay/categories?o=al';
	var GPpornstarURL = '/gay/pornstars?performerType=pornstar';
	var GPcommunityURL = '/user/discover/gay';
	var GPphotoURL = '/gay/gifs?o=tr';
	// ---END SETTINGS PAGE---
	var nUser = $('#headerSearchWrapperFree');
	var pUser = $('.premiumUser');
	var lOut = $('.logged-out');
	var GP = $('.container.gayLayout');
	var vPage = $('#vpContentContainer');
	var vUV = $('#hd-leftColVideoPage > div:nth-child(2)');
	var vRV = $('#relateRecommendedItems');
	var pComments = $('#cmtWrapper');
	var rect = document.querySelector('.container  ').getBoundingClientRect();
	// var url = window.location.href
	var host = window.location.hostname;
	var path = window.location.pathname;
	var lS = localStorage;
	console.clear();
	console.log('[Magic PH] Loading...');
	// /albums /albums/female-straight-uncategorized?o=tr&t=t
	//$('.headerBtnsWrapper').remove();
	$('.networkBar').remove();
	$('#pornportal-wrapper').remove();
	$('a[data-entrycode="DiscoverPremium"]').remove();
	$('.greyButton').remove();
	$('.livesex').remove();
	$('.realsex').remove();
	$('.trendingWrapper').remove();
	$('.popularFilterPornstar').remove();
	$('.popularSearches').remove();
	$('.popularSearchIcon').remove();
	$('#headerUpgradePremiumBtn').remove();
	$('#welcome').remove();
	$('li.omega:nth-child(11)').remove(); // Upload link in header
	$('.modalWrapper').remove();
	$('a[href*="javascript:signinbox"]').remove();
	$('button.tooltipTrig.open-playlist-link.playlist-trigger').remove();
	$('.footerContentWrapper').remove();
	$('ul.headerSubMenu > li.omega').prependTo('ul.headerSubMenu');
	// ---HEADER---
	if (GP.length) {
		console.log('[Magic PH] Detected GayPorn');
		$('.logoWrapper > a[href="/gayporn"]').attr('href', GPLogoURL);
		$('.home > a[href="/"]').attr('href', GPhomeURL);
		$('.videos > a[href="/gayporn"]').attr('href', GPvideoURL);
		$('.premium > a[href="/premium"]').attr('href', GPpremiumURL); // PREMIUM ONLY
		$('.categories > a[href="/gay/categories"]').attr('href', GPcategoryURL);
		//$('li.omega > a[class="js-mixpanel"]').attr('href', GPcategoryURL);
		$('.pornstar > a[href="/gay/pornstars"]').attr('href', GPpornstarURL);
		$('.community > a[href^="/community?section=gay"]').attr(
			'href',
			GPcommunityURL
		);
		$('.photos > a[href^="/albums/gay"]').attr('href', GPphotoURL);
	} else {
		$('.logoWrapper > a[href="/"]').attr('href', PHLogoURL);
		$('.home > a[href="/"]').attr('href', homeURL);
		$('.videos > a[href="/video"]').attr('href', videoURL);
		$('.categories > a[href="/categories"]').attr('href', categoryURL);
		$('.pornstar > a[href="/pornstars"]').attr('href', pornstarURL);
		$('.community > a[href^="/community"]').attr('href', communityURL);
		$('.photos > a[href^="/albums"]').attr('href', photoURL);
	}
	if (pUser.length) {
		$('.premium > a[href="/premium"]').attr('href', premiumURL); // PREMIUM ONLY
		$('#giftingEntry[href="/gift?type=GiftCard-Purchase"]').attr(
			'href',
			giftURL
		); // PREMIUM ONLY
	}
	// ---END HEADER---
	if (vPage.length) {
		console.log('[Magic PH] Detected Video Page');
		vPage.attr('style', 'display: unset !important;');
		var n = $('.pcVideoListItem');
		$.each(n, function (i) {
			n.attr('style','display: flex;');
			n.attr('class','pcVideoListItem js-pop videoblock videoBox');
		})
		var p = $('.thumb');
		$.each(p, function (i) {
			//p.attr('style','width: 500px !important; height 500px !important;');
			p.attr('src','https://github.com/magicoflolis/Arnoodle/blob/Beta/vidtemplate.jpg');
		})
		//$('#relateRecommendedItems').attr('class','video-info-row showLess')
		$('.abovePlayer').remove();
		$('.fanclub-info-pop').remove();
		$('.js-paidDownload').remove();
		$('#under-player-playlists').remove();
		$('.alpha.videoBox.videoblock.js-pop.pcVideoListItem').remove();
		$('#p2vVideosVPage').remove();
		$('.favorites-message').remove();
		$('.streamatesModelsContainer').remove();
		$('.active.fanclub-info-pop').remove();
		$('h1.title').prependTo('.active.about-tab.video-action-tab');
		$('.video-actions-menu').prependTo('.video-actions-container');
		$('#player').attr('style', 'width: 95vw !important;');
		$('.show-more-btn').prependTo('.userButtons');
		//style="width 50vw !important;"
		$('#hd-leftColVideoPage').attr(
			'style',
			'width: inherit !important;  position: unset !important; margin-left: -250px !important;'
		);
		$('.video-wrapper').attr(
			'style',
			'width: 80vw !important;  position: unset !important;'
		);
		//$('.video-actions-menu').attr('style', 'width: inherit !important;');
		$('.video-actions-container').attr('style', 'width: 95vw !important;');
		$('.video-detailed-info').attr('style', 'width: inherit !important;');
		$('#relatedVideosCenter').attr('style', 'display: grid;');
		vUV.attr('class', 'video-info-row showLess');
		vUV.attr('style', 'display: none;');
		vRV.attr('class', 'video-info-row showLess');
		vRV.attr('style', 'display: none;');
		if (hideComments == 1) {
			pComments.hide();
		} else {
			pComments.show();
			pComments.attr('class', 'video-info-row showLess');
			pComments.attr('style', 'display: none; width: 30vw !important;');
		}
		if (pUser.length) {
			console.log('[Magic PH] User Premium');
			vUV.appendTo('[data-mxp="Underplayer"]');
			vRV.appendTo('[data-mxp="Underplayer"]');
			pComments.appendTo('[data-mxp="Underplayer"]');
			lS.setItem('mhp1138_player', '{"quality":"1440"}');
			lS.setItem('player_quality', '{"quality":"1440"}');
			lS.setItem('mhp1138_player', '{"quality":"2160"}');
			lS.setItem('player_quality', '{"quality":"2160"}');
			PHDownloader()
		} else {
			console.log('[Magic PH] User not Premium');
			//$('.communityMenuTop').remove();
			$('.feedSideBar > section:nth-child(1)').remove();
			vUV.appendTo('.video-detailed-info');
			//vRV.appendTo('#relatedVideosCenter');
			vRV.children().appendTo('#relatedVideosCenter')
			pComments.appendTo('.video-detailed-info');
			// if (lIn.length) {
			// 	console.log('[Magic PH] User is logged in');
			// }
			if (lOut.length) {
				console.log('[Magic PH] User logged out');
				$('.buttonBase').hide();
				$('.subscribers-count').hide();
				$('.votes-fav-wrap').hide();
				//$('#votes-fav-wrap').remove();
				$('.tab-menu-wrapper-cell:nth-child(2)').remove();
				$('.tab-menu-wrapper-cell:nth-child(2)').remove();
				$('.tab-menu-wrapper-cell:nth-child(2)').remove();
			}
			$('#hd-rightColVideoPage').remove();
			lS.setItem('mhp1138_player', '{"quality":"720"}');
			lS.setItem('player_quality', '{"quality":"720"}');
			lS.setItem('mhp1138_player', '{"quality":"1080"}');
			lS.setItem('player_quality', '{"quality":"1080"}');
		}
		$('#under-player-comments').remove();
		// $('#relatedVideosVPage').attr(
		// 	'style',
		// 	'display: grid;'
		// );
		//lS.setItem('player_adaptive', '{"hlsLevel":3}');
	}
	// Home Page
	if (path == '/') {
		console.log('[Magic PH] Detected Homepage');
		$('.sectionWrapper:nth-child(3)').prependTo('.frontListingWrapper');
		$('#mostRecentVideosSection').remove();
		$('.sectionWrapper:nth-child(5) > .sectionTitle').remove();
		if (pUser.length) {
			console.log('[Magic PH] User Premium');
			var t1 = $('.feed_title > a').first().text();
			var t2 = t1.replace(/\s+/g, '');
			var sub = 'subscriptions';
			$.trim(t2);
			$('a[href^="/users/"]').attr(
				'href',
				'/users/' + t2 + '/videos/favorites'
			);
			$('.sectionWrapperPremium.feed_wrapper').prependTo('.container');
			$('.sectionWrapperPremium:nth-of-type(5)').hide();
			$('.sectionWrapperPremium:nth-of-type(6)').hide();
			$('.sectionWrapperPremium:nth-of-type(7)').hide();
			$('.sectionWrapperPremium:nth-of-type(8)').hide();
			$('.sectionWrapperPremium:nth-of-type(10)').hide();
			$('.sectionWrapperPremium:nth-of-type(11)').hide();
			$('.sectionWrapperPremium:nth-of-type(12)').hide();
			$('.featuredNetwork > .sectionWrapperPremium').hide();
			$('.featuredChannel').hide();
			$('.sectionCarousel.sectionWrapper').remove();
		}
	}
	if ($('.hdFilterWrapper').length) {
		if (GP.length) {
			console.log('[Magic PH] Detected GayPorn');
			$('#categoriesGay').prependTo('.nf-categories-sidebar');
		} else {
			console.log('[Magic PH] Detected /video');
			$('#categoriesStraight').prependTo('.nf-categories-sidebar');
		}
		$('.buttonClass').remove();
		$('.active.sidebarIndent').remove();
		$('.section_bar_sidebar:nth-of-type(6)').remove();
		$('.section_bar_sidebar:nth-of-type(8)').remove();
		$('.section_bar_sidebar:nth-of-type(7)').prependTo(
			'.nf-categories-sidebar'
		);
		$('div.sidebar_wrapper:nth-of-type(7)').remove();
		//$('[href="/video?o=tr&t=t"]').attr('class','toggle')
		//$('[href="/video?o=tr&t=t&hd=1"]').attr('class','toggle active')
	}
	if ($('.nf-categories').length) {
		console.log('[Magic PH] Detected /categories');
		//$('.alpha > a[href="/categories"]').attr('href', categoryURL);
		$('.nf-categories > .alpha').remove();
		$('.activeOrientation > a[href="/gay/categories"]').attr(
			'href',
			GPcategoryURL
		);
		$('h1').remove();
		$('.buttonClass.light.greyButton').remove();
	}
	if (path == '/gif') {
		console.log('[Magic PH] Detected /gif');
		$('toggleGifWebmButton').click();
	}
	if (clearWatched == 1) {
		// localStorage.clear(); CLEARS LOCAL STORAGE
		lS.removeItem('watchedVideoIds');
		lS.removeItem('watchedVideoStorage');
	}
	function PHDownloader() {
		if (ad_player_id) {
			console.log('PORNHUB Downloader : Found video ID:' + ad_player_id);
			var v = window['flashvars_' + ad_player_id];
			console.log("PORNHUB Downloader : Try to find variable named 'flashvars_" + ad_player_id + "'");
			var a = Object.values(v);
			a.forEach(function (entry) {
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
								'<div class="tab-menu-wrapper-cell"><a class="tab-menu-item tooltipTrig" data-tab="download-tab" target="_blank" href="' +
								entry +
								'" data-title="Download at ' +
								f +
								'"><i class="main-sprite-dark-2"></i><span>In ' +
								f +
								'</span></a></div>';
					}
				}
			});
		}
	}
	window.scrollBy(rect.left, rect.top);
	console.log('[Magic PH] Loading Complete!');
});
