# MagicPH

> Enhances your porn viewing experience. Quick, clean, and easy.

*For best experience, please use an adblock([uBlock Origin](https://github.com/gorhill/uBlock#readme)) along with my [Filter List](https://raw.githubusercontent.com/magicoflolis/Magic-PH/master/FilterList/MagicPH.txt). Additional help [Filter Guide](https://github.com/gorhill/uBlock/wiki/Filter-lists-from-around-the-web)*

***

| Version | Link | Build | Note |
|:----------:|:----------:|:----------:|:----------:|
Chrome | [Releases](https://github.com/magicoflolis/Magic-PH/releases) | ~~[Extension](#build-setup)~~ | Work in porgress
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
[web-ext documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) |

```bash
# Install developer dependencies
npm i -D
# Run
web-ext run -s ./dist/
# Recommended to create additional profile about:profiles
web-ext run -p <profile> -s ./dist/
```

### External Libraries

* [jQuery](https://jquery.com/)
* [Plyr](https://github.com/sampotts/plyr#readme)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
