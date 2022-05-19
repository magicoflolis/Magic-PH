# MagicPH

> Enhances your porn viewing experience. Quick, clean, and easy.

*For the best experience, please use an "adblocker" ([uBlock Origin](https://github.com/gorhill/uBlock#readme))*

***

| Version | Link | Build | Note |
|:----------:|:----------:|:----------:|:----------:|
Chrome | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | ~~[Extension](#build-setup)~~ | Work in porgress
Edge | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | ~~[Extension](#build-setup)~~ | Work in porgress
Firefox | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | [Add-on](#build-setup) | -

***

## About

MagicPH is a browser extension with the goal of *reducing distractions* & improving upon *site navigation.*

**Features:**

* Alternative video player support.
* Various UI tweaks.
* Enlarges video player automatically.
* Config menu.
* Autoscroll on page load.
* Blur thumbnails.
* Automatically collapses comments and related videos.
* Scroll To Top button.
* Page numbers appear on scroll.

| Previews |
|:----------:|
![MagicPH Preview](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/assets/preview_addon.png)|

## Roadmap

* Fix any bugs along the way.
* Add Favorites List for un-signin users.
* Customize headers.
* Support PH Network sites.

### Build Setup

> Developed using [VSCodium](https://vscodium.com).

| Help Links |
|:----------:|
[web-ext Documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) |
[key.pem for Chrome](https://stackoverflow.com/a/46739698/9872174)|

```bash
# Install dependencies
npm i

# [ Build ] All
npm run build:Browsers
# [ Build ] Individual
npm run build:Firefox
npm run build:Chrome

# [ Testing ] Browsers can be launched via "Run and Debug" in VSCode.
# Edit runtimeExecutable in ".vscode/launch.json" to your Chrome executable.
# Recommended to create an additional profile "about:profiles" for Firefox.
```

### External Libraries

* [jQuery](https://jquery.com/)
* [Plyr](https://github.com/sampotts/plyr#readme)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
