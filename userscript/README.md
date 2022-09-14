# MagicPH

> Best downloader for any PH Network site.

***

| Version | Link | Alternative |
|:----------:|:----------:|:----------:|
Stable | [(GitHub) Install](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/userscript/dist/magicph.user.js) | [Sleazy Fork](https://sleazyfork.org/scripts/445740)

**(Optional) Mobile Bookmarklet:**

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Magic-PH@master/userscript/dist/magicph.user.js'].map( s => document.body.appendChild(document.createElement('script')).src=s)})();
```

***

## About

This UserJS is a slim down version of 'networkPlayer.js' from my webextension I am currently developing. [https://github.com/magicoflolis/Magic-PH](https://github.com/magicoflolis/Magic-PH)

**Features:**

* Easily download and save any video in its highest quality or preferred choice.
* Comes with a built in automatically downloader.
* Copy + Download buttons.
* Can be combined with any external downloader.
* Works on mobile.

NOTE:

This uses the 'unsafeWindow' object.

```JS
// @grant        unsafeWindow
```

> PornMD not supported as it doesn't host videos.

Website (Supported) | Verison (Default) | Verison (Mobile) | Verison (Premium) |
:---------:|:-----------:|:-----------:|:---------:|
Modelhub | Unsupported | Unsupported | - |
OnlyFans | ✅ | ✅ | - |
Pornhub | ✅ | ✅ | Untested |
RedTube | ✅ | ✅ | Untested |
Thumbzilla | ✅ | ✅ | - |
Tube8 | ✅ | ✅ | - |
YouPorn | ✅ | ✅ | Untested |

**OnlyFans Usage:**

* Play any video on the page to bring up the bottom left menu or navigate to a Users video page.
* IMPORTANT: This UserJS will store available videos and push them into an "Array".
* IMPORTANT: Once "Download All" is pressed ALL videos still within the "Array" will be downloaded, video(s) will be removed from "Array" AFTER download(s) are complete.
* IMPORTANT: Downloads will be handled simultaneously IF there are less than 16 videos in the "Array" OR on a mobile device. If "Array" > 16, then downloads will be handled one at a time.
* Simultaneous downloads can be turned off by editing this variable.

```JS
let Limit_Downloads = false; // true to disable simultaneous downloads
```

**Accessing the Menu:**

> Not for OnlyFans

* [Desktop/Tablet/Mobile] Right click anywhere inside the video player.
* [Tablet/Mobile] Press "Video Quality(s)" in the video player.
* [Mobile] Press the cog in the video player.
* [Mobile] On Youporn press the cog then press "Video Quality(s)" in the video player.

**Firefox Nightly Setup (Android):**

> Mobile version tested on Firefox Nightly + Tampermonkey and Bromite. Toggle "Desktop site" if any problems occur.

* Install [Firefox Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix)
* Settings > About Firefox Nightly > Tap the "Firefox Browser Nightly" logo till debug menu is enable.
* Settings > Custom Add-on collection
* Collection owner (User ID) = 13159175
* Collection name = MagicPH
* Add any prefer userscript manager.
* (Optional) Install uBlock Origin as well.

## Bugs / Issues

* Results may vary

## Source Code

[https://github.com/magicoflolis/Magic-PH/tree/master/userscript/src](https://github.com/magicoflolis/Magic-PH/tree/master/userscript/src)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
