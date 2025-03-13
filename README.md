![GitHub License](https://img.shields.io/github/license/magicoflolis/Magic-PH?style=flat-square)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/magicoflolis/Magic-PH?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/magicoflolis/Magic-PH?style=flat-square)

---

<h1 align="center">
<sub>
<img src="https://raw.githubusercontent.com/magicoflolis/Magic-PH/refs/heads/master/assets/magicph_logo.png" height="38" width="38">
</sub>
MagicPH
</h1>

> [!IMPORTANT]
> This userscript / webextension violates [websites](https://github.com/magicoflolis/Magic-PH/blob/master/pages.md) content policies on `Banning Downloads`.
>
> **PLEASE USE AT YOUR OWN RISK!**

_Recommend using "ad blocker" or "content blocker" ([uBlock Origin](https://github.com/gorhill/uBlock#readme)) along side._

A video downloader for various adult websites. _WebExtension version has not been updated in a while, please use UserScript version!_

[UserScript Changelog](https://github.com/magicoflolis/Magic-PH/blob/master/CHANGELOG.user.md)

**Supported Websites:** - [List of policy violations](https://github.com/magicoflolis/Magic-PH/blob/master/pages.md)

|                     Websites                      | Version (Desktop) | Version (Mobile) |
| :-----------------------------------------------: | :---------------: | :--------------: |
|             [Beeg](https://beeg.com)              |        ✅         |        ✅        |
|         [Onlyfans](https://onlyfans.com)          |        ✅         |        ✅        |
|        [Pornhub](https://www.pornhub.com)         |        ✅         |        ✅        |
| [Pornhub Premium](https://www.pornhubpremium.com) |        ✅         |        ✅        |
|        [RedTube](https://www.redtube.com)         |        ✅         |        ✅        |
|          [Tube8](https://www.tube8.com)           |        ✅         |        ✅        |
|     [Thumbzilla](https://www.thumbzilla.com)      |        ✅         |        ✅        |
|         [xHamster](https://xhamster.com)          |        ✅         |        ✅        |
|           [XNXX](https://www.xnxx.com)            |        ✅         |        ✅        |
|        [xVideos](https://www.xvideos.com)         |        ✅         |        ✅        |
|        [YouPorn](https://www.youporn.com)         |        ✅         |        ✅        |

---

## **Download**

**UserScript:**

- [Sleazy Fork](https://sleazyfork.org/scripts/492700)
- [GitHub Repo](https://github.com/magicoflolis/Magic-PH/raw/master/dist/magicph.user.js)
- [Open UserJS](https://openuserjs.org/scripts/Magic/MagicPH) - outdated

**Web Extension (under construction):**

_Firefox:_

- ~~[GitHub Repo](https://github.com/magicoflolis/Magic-PH/releases)~~

_Chromium:_

- ~~[GitHub Repo](https://github.com/magicoflolis/Magic-PH/releases)~~

**Bookmarklet (not recommended):**

Save this URL as a bookmark, clicking it will cause the **UserScript version** to inject itself into the current webpage.

```js
javascript: (function () {
  ['https://cdn.jsdelivr.net/gh/magicoflolis/Magic-PH@master/dist/magicph.user.js'].map(
    (s) => (document.body.appendChild(document.createElement('script')).src = s)
  );
})();
```

## Features

> See [Accessing Downloader](#accessing-downloader)

- General:
  - UI designed for mobile and desktop devices
  - Will match the websites theme.
  - Built in tabs feature.
  - Built in video downloader allows user to easily download and save any video in its highest quality or preferred choice.
  - Video downloader can be combined with any 3rd party/external downloader.

## Previews

<p>
  <img src="https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs.PNG">
  <img src="https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs1.PNG">
  <img src="https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/userjs2.PNG">
</p>

## Accessing Downloader

**Default Method:**

- Click "**Show List**" located to the bottom right of the page.
- Onlyfans (**Mobile**) - Click on any video post.

**Website Specific:**

- Desktop / Mobile - Right click anywhere inside the video player then click "**Video Quality(s)**".
- Mobile - Press "**Video Quality(s)**" in the video player.
- Mobile (**Alternative**) - Press the gear icon in the video player.
- Youporn (**Mobile**) - Press the gear icon in the video player then press "**Video Quality(s)**".

## Tabs

> In a nutshell, the tab system work the same way your browser creates tabs, by default the tab is named after the host.

A new tab is automatically created when a video source is found, the tab is named after the videos title.

**Creating a New Tab:**

> Creating a new tab is as easy as clicking the "+" within the list.

This new tab is a search box, typing any supported method will automatically find the video source(s)!

Supported Methods:

- `<full url>` of any supported website or `<host>/<video path>`
- Beeg (**Not Supported**) - _Still a work in progress_
- Onlyfans (**Must be on the same website**) - _Still a work in progress_, `/<model>` or `/<model>/photos|videos|audios|likes|streams|upcoming-streams`.
- Pornhub - `/view_video.php?viewkey=<video id>` or just entering the `<video id>`.
- RedTube - `/<video id>`
- Tube8 - `/porn-video/<video id>/`
- Thumbzilla - `/video/<video id>/<video name>`
- xHamster (**Work in Progress**) - `/videos/<video name>`
- XNXX (**Work in Progress**) - `/video-<video id>/<video name>`
- xVideos - `/video.<video id>/<video name>`
- Youporn (**Work in Progress**) - `/watch/<video id>/<video name>/`

## Build

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/). _The version of Node.js should match or be greater than the `"node"` key in `package.json`._

```sh
# Install dependencies
$ pnpm i
```

**Additional Help Links:**

- [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
- [key.pem for Chrome](https://stackoverflow.com/a/46739698/9872174)

**External Libraries:**

- [Plyr](https://github.com/sampotts/plyr)

---

**UserScript:**

Before you begin, rename `.env.example` to `.env`

**Recommened Testing Environments:**

- **Desktop:** any browser with [ViolentMonkey](https://violentmonkey.github.io/), see [How to edit scripts with your favorite editor?](https://violentmonkey.github.io/posts/how-to-edit-scripts-with-your-favorite-editor/)
- **Mobile:**
  - Desktop: use "Responsive Design Mode (Ctrl+Shift+M)" on [FireFox Developer Edition](https://www.mozilla.org/firefox/developer/) or [FireFox](https://www.mozilla.org/firefox/)
  - Android: any browser with UserScript support or support for installing a UserScript manager, I use [Cromite](https://github.com/uazo/cromite)
  - IOS: any browser with UserScript support or support for installing a UserScript manager

```sh
# Watch and build to local HTTP server
$ pnpm run dev:UserJS

# Build UserScript to "./dist"
$ pnpm run pub:UserJS
```

### Roadmap

- Finish WebExtension version.
- Fix any bugs along the way.

### Source Code

- [https://github.com/magicoflolis/Magic-PH](https://github.com/magicoflolis/Magic-PH)
