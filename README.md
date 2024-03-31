# MagicPH

> [!IMPORTANT]
> This webextension / userscript violates `PornHub` [Non-Consensual Content Policy](https://help.pornhub.com/hc/en-us/categories/4419836212499) (`2. Banning Downloads`)
>
> PLEASE USE AT YOUR OWN RISK!

![GitHub License](https://img.shields.io/github/license/magicoflolis/Magic-PH)
[![GitHub Release](https://img.shields.io/github/release/magicoflolis/Magic-PH)](https://github.com/magicoflolis/Magic-PH/releases/latest)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/magicoflolis/Magic-PH)
[![GitHub Stars](https://img.shields.io/github/stars/magicoflolis/Magic-PH)](https://github.com/magicoflolis/Magic-PH/stargazers)

> Enhances adult viewing experience clean, quick, & easy

MagicPH, [open source](https://github.com/magicoflolis/Magic-PH/blob/master/LICENSE) web extension with the goal of improving webpage navigation and *reducing distractions.* Recommended to use an "ad blocker" or "content blocker" ([uBlock Origin](https://github.com/gorhill/uBlock#readme)) along side.

---

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
| Chrome / Edge | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | [Development](#development) | Work in progress |
| Firefox | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | [Development](#development) | Main development platform |
| Userscript | [Install (GitHub)](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/dist/UserJS/magicph.user.js) | [Install (OpenUserJS)](https://openuserjs.org/scripts/Magic/MagicPH) | Downloader only! |

**(Optional) Mobile Bookmarklet:**

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

**Userscript Features:**

See [Accessing "Video Quality(s)" / Video Downloader](#accessing-video-qualitys--video-downloader)

* Built in video downloader allows user to easily download and save any video in its highest quality or preferred choice.
* Video downloader can be combined with any 3rd party/external downloader.

| Websites (Supported) | Version (Desktop) | Version (Mobile) |
|:---------:|:-----------:|:-----------:|
| Beeg (WIP) | ✅ | ✅ |
| Pornhub | ✅ | ✅ |
| Pornhub Premium | Not Tested | Not Tested |
| RedTube | ✅ | ✅ |
| RedTube Premium | Not Tested | Not Tested |
| Tube8 | ✅ | ✅ |
| Thumbzilla | ✅ | ✅ |
| YouPorn | ✅ | ✅ |
| YouPorn Premium | Not Tested | Not Tested |
| Onlyfans | ✅ | ✅ |
| xHamster | ✅ | ✅ |
| XNXX | ✅ | ✅ |
| xVideos | ✅ | ✅ |

---

**Webextension Features:**

See [Accessing "Video Quality(s)" / Video Downloader](#accessing-video-qualitys--video-downloader) & [Accessing "Sidebar"](#accessing-sidebar)

* Built in video downloader allows user to easily download and save any video in its highest quality or preferred choice.
* Video downloader can be combined with any 3rd party/external downloader.
* Fully customizable settings menu.
* Improves webpage layout + webpage tweaks.
* Alternative video player support. ( [Plyr](https://github.com/sampotts/plyr) )
* Cross-site favorite videos page.
* Automatically expands video player.
* Automatically scroll on webpage load.
* Automatically blur video thumbnails on webpage load.
* Automatically collapse comment + related videos section.
* Automatically skips video player ahead by 4 seconds.
* Automatically "Jump To" the first section of video.
* "Jump To" can now be filtered.
* "Scroll To Top" button.
* "Recenter" video player button.

| Websites (Supported) | Version (Desktop) | Version (Mobile) |
|:---------:|:-----------:|:-----------:|
| Pornhub | ✅ | ✅ |
| Pornhub Premium | Not Tested | Not Tested |
| RedTube | ✅ | ✅ |
| RedTube Premium | Not Tested | Not Tested |
| Tube8 | ✅ | ✅ |
| Thumbzilla | ✅ | ✅ |
| YouPorn | ✅ | ✅ |
| YouPorn Premium | Not Tested | Not Tested |
| Onlyfans | ✅ | ✅ |
| xHamster | ✅ | ✅ |

---

## Accessing "Video Quality(s)" / Video Downloader

> Accessing "Video Quality(s)" may vary from website to website.

* Desktop / Mobile / Tablet - Right click anywhere inside the video player.
* Tablet / Mobile - Press "Video Quality(s)" in the video player.
* Mobile - Press the gear icon in the video player.
* Mobile - On Youporn press the gear icon then press "Video Quality(s)" in the video player.

## Accessing "Sidebar"

* Click websites logo in the header.

## Webextension Installation

**Chromium:**

> [Read this first](https://github.com/NeverDecaf/chromium-web-store#read-this-first=)

* Can be downloaded + installed with provided *.crx in [releases](https://github.com/magicoflolis/Magic-PH/releases) page or through zip.
* Can be automatically updated with [chromium-web-store](https://github.com/NeverDecaf/chromium-web-store).

**Google Chrome:**

* Must be manually downloaded + installed from [releases](https://github.com/magicoflolis/Magic-PH/releases) page through zip file.
* Enable "Developer mode" in [chrome://extensions/](chrome://extensions/)
* Unzip web extension to desired folder.
* "Load unpacked" > /path to web extension/

**Microsoft Edge:**

* Must be manually downloaded + installed from [releases](https://github.com/magicoflolis/Magic-PH/releases) page through zip file.
* Enable "Developer mode" in [edge://extensions/](edge://extensions/)
* Unzip web extension to desired folder.
* "Load unpacked" > /path to web extension/

**Mozilla Firefox:**

* Can be downloaded + installed with provided *.xpi in [releases](https://github.com/magicoflolis/Magic-PH/releases).

## Development

> Developed with [VSCodium](https://vscodium.com)

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

### Webextension Version

``` sh
# Compile webextension for "Chromium" to "./build/WebExtension/chrome"
$ pnpm run dev:Cr
# Compile webextension for "Firefox" to "./build/WebExtension/firefox"
$ pnpm run dev:FF

# [ Build ] "Chromium" + "Firefox"
$ pnpm run build:Browsers
# [ Build ] Individual
$ pnpm run build:Chrome
$ pnpm run build:Firefox

# [ Testing ]
# Browsers can be launched via "Run and Debug" in VSCode.
# Edit runtimeExecutable in ".vscode/launch.json" to your Chrome executable.
# Recommended to create an additional profile "about:profiles" for Firefox.
```

### Roadmap

* Fix any bugs along the way.

### Source Code

* [https://github.com/magicoflolis/Magic-PH](https://github.com/magicoflolis/Magic-PH)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
