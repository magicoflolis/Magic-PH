# MagicPH

> [!IMPORTANT]
> This userscript / webextension violates [websites](https://github.com/magicoflolis/Magic-PH/blob/master/pages.md) content policies on `Banning Downloads`.
>
> **PLEASE USE AT YOUR OWN RISK!**

![GitHub License](https://img.shields.io/github/license/magicoflolis/Magic-PH?style=flat-square)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/magicoflolis/Magic-PH?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/magicoflolis/Magic-PH?style=flat-square)

> Recommend using "ad blocker" or "content blocker" ([uBlock Origin](https://github.com/gorhill/uBlock#readme)) along side.

A video downloader for various adult websites. *webextension version has not been updated in a while, please use Userscript version!*

Supported Websites

| Websites | Version (Desktop) | Version (Mobile) |
|:---------:|:-----------:|:-----------:|
| [Beeg](https://beeg.com) | ✅ | ✅ |
| [Onlyfans](https://onlyfans.com) | ✅ | ✅ |
| [Pornhub](https://www.pornhub.com) | ✅ | ✅ |
| [Pornhub Premium](https://www.pornhubpremium.com) | ✅ | ✅ |
| [RedTube](https://www.redtube.com) | ✅ | ✅ |
| [Tube8](https://www.tube8.com) | ✅ | ✅ |
| [Thumbzilla](https://www.thumbzilla.com) | ✅ | ✅ |
| [xHamster](https://xhamster.com) | ✅ | ✅ |
| [XNXX](https://www.xnxx.com) | ✅ | ✅ |
| [xVideos](https://www.xvideos.com) | ✅ | ✅ |
| [YouPorn](https://www.youporn.com) | ✅ | ✅ |

[List of policy violations for supported websites](https://github.com/magicoflolis/Magic-PH/blob/master/pages.md)

---

## Download

[![Userscript](https://img.shields.io/badge/Userscript-Download-brightgreen.svg?style=flat-square&label=Userscript+(GitHub)&logo=javascript&logoColor=white)](https://github.com/magicoflolis/Magic-PH/blob/master/dist/UserJS/magicph.user.js?raw=1)

**Alternatives:**

* [Sleazy Fork](https://sleazyfork.org/scripts/492700)
* [OpenUserJS](https://openuserjs.org/scripts/Magic/MagicPH)

**(Not Recommended) Bookmarklet:**

> Save this URL as a bookmark, clicking it will cause the userscript version to inject itself into the current webpage.

``` js
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Magic-PH@master/dist/UserJS/magicph.user.js'].map(s=>document.body.appendChild(document.createElement('script')).src=s)})();
```

---

| Preview(s) |
|:----------:|
|![Onlyfans Preview](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs.PNG)|
|![Video Preview](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs1.PNG)|
|![Mobile Preview](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs2.PNG)|

---

## Userscript Features

> See [Accessing Downloader](#accessing-downloader)

* Designed for mobile and desktop devices.
* Multiple language support.
* Will match the websites theme.
* Built in tabs feature.
* Built in video downloader allows user to easily download and save any video in its highest quality or preferred choice.
* Video downloader can be combined with any 3rd party/external downloader.

## Accessing Downloader

**Default Method:**

* Click "**Show List**" located to the bottom right of the page.
* Onlyfans (**Mobile**) - Click on any video post.

**Website Specific:**

* Desktop / Mobile - Right click anywhere inside the video player then click "**Video Quality(s)**".
* Mobile - Press "**Video Quality(s)**" in the video player.
* Mobile (**Alternative**) - Press the gear icon in the video player.
* Youporn (**Mobile**) - Press the gear icon in the video player then press "**Video Quality(s)**".

## Tabs

> In a nutshell, the tab system work the same way your browser creates tabs, by default the tab is named after the host.

A new tab is automatically created when a video source is found, the tab is named after the videos title.

**Creating a New Tab:**

> Creating a new tab is as easy as clicking the "+" within the list.

This new tab is a search box, typing any supported method will automatically find the video source(s)!

Supported Methods:

* `<full url>` of any supported website or `<host>/<video path>`
* Beeg (**Not Supported**) - *Still a work in progress*
* Onlyfans (**Must be on the same website**) - *Still a work in progress*, `/<model>` or `/<model>/photos|videos|audios|likes|streams|upcoming-streams`.
* Pornhub - `/view_video.php?viewkey=<video id>` or just entering the `<video id>`.
* RedTube - `/<video id>`
* Tube8 - `/porn-video/<video id>/`
* Thumbzilla - `/video/<video id>/<video name>`
* xHamster (**Work in Progress**) - `/videos/<video name>`
* XNXX (**Work in Progress**) - `/video-<video id>/<video name>`
* xVideos - `/video.<video id>/<video name>`
* Youporn (**Work in Progress**) - `/watch/<video id>/<video name>/`

## Build

> Developed in [VSCodium](https://vscodium.com)

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).
The version of Node.js should match `"node"` key in `package.json`.

**Additional Help Links:**

* [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
* [key.pem for Chrome](https://stackoverflow.com/a/46739698/9872174)

**External Libraries:**

* [Plyr](https://github.com/sampotts/plyr)

``` sh
# Install dependencies
$ pnpm i
```

### Userscript Version

``` sh
# Watch and compile to local HTTP server "http://localhost:9090/"
$ pnpm run dev:UserJS

# Compile UserJS to "./dist/UserJS/magicph.user.js"
$ pnpm run pub:UserJS
```

### Roadmap

* Finish webextension version.
* Fix any bugs along the way.

### Source Code

* [https://github.com/magicoflolis/Magic-PH](https://github.com/magicoflolis/Magic-PH)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
