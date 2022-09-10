# MagicPH

[![GitHub license](https://img.shields.io/github/license/magicoflolis/Magic-PH)](https://github.com/magicoflolis/Magic-PH/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/magicoflolis/Magic-PH)](https://github.com/magicoflolis/Magic-PH/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/magicoflolis/Magic-PH)](https://github.com/magicoflolis/Magic-PH/stargazers)

> Recommended to install any "adblocker" ([uBlock Origin](https://github.com/gorhill/uBlock#readme))

*Enhances adult viewing experience. Clean, easy, simple, and quick.*

| Preview(s) |
|:----------:|
![MagicPH Preview](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/preview_addon.png)|

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
Chrome / Edge | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | [Build](#build) | Work in progress
Firefox | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | [Build](#build) | Main development platform
Userscript | [Install (GitHub)](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/userscript/dist/magicph.user.js) | [Sleazy Fork](https://sleazyfork.org/scripts/445740) | Mobile/Tablet Support

***

## About

> Repo still under construction

MagicPH, [open source](https://github.com/magicoflolis/Magic-PH/blob/master/LICENSE) web extension with the goal of improving webpage navigation and *reducing distractions.*

**Features:**

* Config menu.
* Improves webpage layout + webpage tweaks.
* Built in video downloader allows user to easily download and save any video in its highest quality or preferred choice.
* Video downloader can be combined with any 3rd party/external downloader.
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

Website (Supported) | Verison (Default) | Verison (Mobile) | Verison (Premium) |
:---------:|:-----------:|:-----------:|:---------:|
Pornhub | ✅ | [Userscript](#magicph) | Not Tested |
RedTube | ✅ | [Userscript](#magicph) | Not Tested |
Tube8 | ✅ | [Userscript](#magicph) | - |
Thumbzilla | ✅ | [Userscript](#magicph) | - |
YouPorn | ✅ | [Userscript](#magicph) | Not Tested |
Modelhub | Not supported | Not supported | - |
Onlyfans (WIP) | ✅ | Not Tested | - |

## Support

**Accessing "Sidebar":**

* Click websites logo in the header. (usual located top left of the page)

**Accessing "Video Quality(s)" / Video Downloader:**

* [Desktop/Mobile/Tablet] Right click anywhere inside the video player.
* [Tablet/Mobile] Press "Video Quality(s)" in the video player.
* [Mobile] Press the gear icon in the video player.
* [Mobile] On Youporn press the gear icon then press "Video Quality(s)" in the video player.

## Installation

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

### Build

> Developed with [VSCodium](https://vscodium.com)

**Additional Help Links:**

* [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
* [key.pem for Chrome](https://stackoverflow.com/a/46739698/9872174)

**External Libraries:**

* [Plyr](https://github.com/sampotts/plyr)

```bash
# Install dependencies
npm i

# [ Development ] Chrome + sass
npm run Dev:Cr
# [ Development ] Firefox + sass
npm run Dev:FF
# [ Development ] Userscript + sass + http-server (http://localhost:8080)
npm run Dev:Userscript

# [ Build ] Chrome + Firefox
npm run build:Browsers
# [ Build ] Individual
npm run build:Chrome
npm run build:Firefox
npm run build:Userscript

# [ Testing ]
# Browsers can be launched via "Run and Debug" in VSCode.
# Edit runtimeExecutable in ".vscode/launch.json" to your Chrome executable.
# Recommended to create an additional profile "about:profiles" for Firefox.
```

### Roadmap

* Header customization.
* Fix any bugs along the way.

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
