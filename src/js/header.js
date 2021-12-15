import custom_layout from "../header.html";
import log from "./logger";
import {
  check,
  config,
  locate,
  qs,
} from "./general";

const brws = (typeof browser == "undefined") ? chrome : browser;

function loadHeader() {
  try {
  const gCheck = /gay/.test(locate) ? "/gay/" : "/",
  menu = $("ul#headerMainMenu"),
  dConfig = {
    headerOrder: [
      "home",
      "videos",
      "categories",
      "pornstars",
      "gifs",
      "recommended",
      "custom",
    ],
  };
  let selA = `<a href="${gCheck}recommended" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
  selB = `<a href="${gCheck}recommended" class="js-topMenuLink"><span class="itemName">Recommended</span></a>`,
  headerBtns = {
    home: $(`<li itemprop="name" class="menu item-1 home alpha" data-hover="0">
    <a href="${gCheck}" class="js-topMenuLink">
    <span class="itemName">Home</span></a>
    </li>`),
    videos: $(`<li itemprop="name" class="menu item-2 videos" data-hover="0">
    <a href="${gCheck}video?o=tr&hd=1" class="js-topMenuLink">
    <span class="itemName">Porn Videos</span></a>
    </li>`),
    categories: $(`<li itemprop="name" class="menu item-3 categories" data-hover="0">
    <a href="${gCheck}categories?o=al" class="js-topMenuLink">
    <span class="itemName">Categories</span></a>
    <div class="wideDropdown categories js-dropdown" data-submenu-type="categories" style="display: none;">
  <div class="innerDropdown clearfix js-submenu"><div class="leftPanel">
  <a href="/categories" class="title">Discover Categories</a>
  <ul class="discover" style="display: none;">
  <li class="alpha">
    <a class="js-mixpanel" data-mixpanel-listing="" href="/categories">
      <i class="discoverPopular"></i>Popular</a>
  </li>
  <li>
    <a class="js-mixpanel" data-mixpanel-listing="" href="/categories?o=al">
      <i class="discoverAlphabet"></i>
      Alphabetical</a>
  </li>
  <li>
    <a class="js-mixpanel" data-mixpanel-listing="" href="/categories?o=mv">
      <i class="discoverNumber"></i>
      Number of Videos</a>
  </li>
  <li class="omega">
    <a class="js-mixpanel" data-mixpanel-listing="" href="/gayporn">
      <i class="discoverGay"></i>
      Gay Categories</a>
  </li>
</ul>
</div>
<ul class="headerSubMenu">
          <li class="big video alpha">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=28" onclick="ga('send', 'event', 'Header', 'click', 'Category 28');" alt="Mature">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/28.jpg?cache=1538057919" alt="Mature" src="https://cs.phncdn.com/images/categories/118x88/28.jpg?cache=1538057919" width="118" height="88">
        <span>Mature</span>
      </a>
    </li>
        <li class=" ">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=3" onclick="ga('send', 'event', 'Header', 'click', 'Category 3');" alt="Amateur">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/3.jpg?cache=1538054514" alt="Amateur" src="https://cs.phncdn.com/images/categories/118x88/3.jpg?cache=1538054514" width="118" height="88">
        <span>Amateur</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=17" onclick="ga('send', 'event', 'Header', 'click', 'Category 17');" alt="Ebony">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/17.jpg?cache=1538057828" alt="Ebony" src="https://cs.phncdn.com/images/categories/118x88/17.jpg?cache=1538057828" width="118" height="88">
        <span>Ebony</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=111" onclick="ga('send', 'event', 'Header', 'click', 'Category 111');" alt="Japanese">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/111.jpg?cache=1538057813" alt="Japanese" src="https://cs.phncdn.com/images/categories/118x88/111.jpg?cache=1538057813" width="118" height="88">
        <span>Japanese</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/categories/teen" onclick="ga('send', 'event', 'Header', 'click', 'Category 37');" alt="Teen (18+)">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/37.jpg?cache=1538058943" alt="Teen (18+)" src="https://cs.phncdn.com/images/categories/118x88/37.jpg?cache=1538058943" width="118" height="88">
        <span>Teen (18+)</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/categories/hentai" onclick="ga('send', 'event', 'Header', 'click', 'Category 36');" alt="Hentai">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/36.jpg?cache=1538057721" alt="Hentai" src="https://cs.phncdn.com/images/categories/118x88/36.jpg?cache=1538057721" width="118" height="88">
        <span>Hentai</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=27" onclick="ga('send', 'event', 'Header', 'click', 'Category 27');" alt="Lesbian">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/27.jpg?cache=1538058936" alt="Lesbian" src="https://cs.phncdn.com/images/categories/118x88/27.jpg?cache=1538058936" width="118" height="88">
        <span>Lesbian</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=35" onclick="ga('send', 'event', 'Header', 'click', 'Category 35');" alt="Anal">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/35.jpg?cache=1538054554" alt="Anal" src="https://cs.phncdn.com/images/categories/118x88/35.jpg?cache=1538054554" width="118" height="88">
        <span>Anal</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=8" onclick="ga('send', 'event', 'Header', 'click', 'Category 8');" alt="Big Tits">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/8.jpg?cache=1538055457" alt="Big Tits" src="https://cs.phncdn.com/images/categories/118x88/8.jpg?cache=1538055457" width="118" height="88">
        <span>Big Tits</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=502" onclick="ga('send', 'event', 'Header', 'click', 'Category 502');" alt="Female Orgasm">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/502.jpg?cache=1538057942" alt="Female Orgasm" src="https://cs.phncdn.com/images/categories/118x88/502.jpg?cache=1538057942" width="118" height="88">
        <span>Female Orgasm</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=65" onclick="ga('send', 'event', 'Header', 'click', 'Category 65');" alt="Threesome">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/65.jpg?cache=1538058956" alt="Threesome" src="https://cs.phncdn.com/images/categories/118x88/65.jpg?cache=1538058956" width="118" height="88">
        <span>Threesome</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=86" onclick="ga('send', 'event', 'Header', 'click', 'Category 86');" alt="Cartoon">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/86.jpg?cache=1538056137" alt="Cartoon" src="https://cs.phncdn.com/images/categories/118x88/86.jpg?cache=1538056137" width="118" height="88">
        <span>Cartoon</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=29" onclick="ga('send', 'event', 'Header', 'click', 'Category 29');" alt="MILF">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/29.jpg?cache=1538057937" alt="MILF" src="https://cs.phncdn.com/images/categories/118x88/29.jpg?cache=1538057937" width="118" height="88">
        <span>MILF</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=24" onclick="ga('send', 'event', 'Header', 'click', 'Category 24');" alt="Public">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/24.jpg?cache=1538058397" alt="Public" src="https://cs.phncdn.com/images/categories/118x88/24.jpg?cache=1538058397" width="118" height="88">
        <span>Public</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/transgender" onclick="ga('send', 'event', 'Header', 'click', 'Category 83');" alt="Transgender">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/83.jpg?cache=1542818912" alt="Transgender" src="https://cs.phncdn.com/images/categories/118x88/83.jpg?cache=1542818912" width="118" height="88">
        <span>Transgender</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=181" onclick="ga('send', 'event', 'Header', 'click', 'Category 181');" alt="Old/Young">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/181.jpg?cache=1538057979" alt="Old/Young" src="https://cs.phncdn.com/images/categories/118x88/181.jpg?cache=1538057979" width="118" height="88">
        <span>Old/Young</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=7" onclick="ga('send', 'event', 'Header', 'click', 'Category 7');" alt="Big Dick">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/7.jpg?cache=1538055506" alt="Big Dick" src="https://cs.phncdn.com/images/categories/118x88/7.jpg?cache=1538055506" width="118" height="88">
        <span>Big Dick</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=15" onclick="ga('send', 'event', 'Header', 'click', 'Category 15');" alt="Creampie">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/15.jpg?cache=1538057688" alt="Creampie" src="https://cs.phncdn.com/images/categories/118x88/15.jpg?cache=1538057688" width="118" height="88">
        <span>Creampie</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=80" onclick="ga('send', 'event', 'Header', 'click', 'Category 80');" alt="Gangbang">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/80.jpg?cache=1538058165" alt="Gangbang" src="https://cs.phncdn.com/images/categories/118x88/80.jpg?cache=1538058165" width="118" height="88">
        <span>Gangbang</span>
      </a>
    </li>
        <li class="big video">
      <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=69" onclick="ga('send', 'event', 'Header', 'click', 'Category 69');" alt="Squirt">
                <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/69.jpg?cache=1538058708" alt="Squirt" src="https://cs.phncdn.com/images/categories/118x88/69.jpg?cache=1538058708" width="118" height="88">
        <span>Squirt</span>
      </a>
    </li>
      <li class="omega">
    <a class="categoryDefault js-mixpanel" data-mixpanel-listing="" href="/categories" onclick="ga('send', 'event', 'Header', 'click', 'Categories');">
      <img class="js-menuSwap" data-image="https://ei.phncdn.com/www-static/images/categories_seeall.gif" alt="See All" src="https://ei.phncdn.com/www-static/images/categories_seeall.gif" width="118" height="88">
      <span>See All</span>
    </a>
  </li>
</ul>
  </div>
</div>
    </li>`),
    pornstars: $(`<li itemprop="name" class="menu item-4 pornstar" data-hover="0">
    <a href="${gCheck}pornstars?performerType=pornstar" class="js-topMenuLink">
    <span class="itemName">Pornstars</span></a>
    </li>`),
    gifs: $(`<li itemprop="name" class="menu item-5 photos" data-hover="0">
    <a href="${gCheck}gifs?o=tr" class="js-topMenuLink">
    <span class="itemName">Photos & Gifs</span></a>
    </li>`),
    community: $(`<li itemprop="name" class="menu item-6 empty" data-hover="0">
    <a href="/user/discover${gCheck}" class="js-topMenuLink">
    <span class="itemName">Empty</span></a>
    </li>`),
    recommended: $(`<li id="menuItem9" class="menu recommended" data-hover="0">${(check.recommended) ? selA : selB}</li>`),
    custom: $(`<li id="menuItem99" class="menu customize"><a title="Customize Header" type="button" class="customize-header js-topMenuLink"><span class="itemName">customize (wip)</span></a></li>`),
  };
  if(document.readyState === "complete") {
    brws.storage.local.get((storedConfig) => {
      Object.assign(config, storedConfig);
      // menu.html("")
      menu.append(
        // headerBtns.home,
        // headerBtns.videos,
        // headerBtns.categories,
        // headerBtns.pornstars,
        // headerBtns.gifs,
        headerBtns.recommended,
        headerBtns.custom
        )
      $(".magic-customize").append($(custom_layout))
      let fd = qs("form.magicph_customize");
      for (let prop in config) {
        prop in fd.elements ? (fd.elements[prop].value = config[prop]) : false;
      }
      fd.addEventListener("change", (e) => {
        let $el = /** @type {HTMLInputElement} */ (e.target);
        config[$el.name] = $el.value;
        brws.storage.local.set(config);
        hChange($el, $el.value)
        // window.location.reload();
      });
      let hd = $('section.head-select > select'),
        hd1 = qs('select[name="head1"]'),
        hd2 = qs('select[name="head2"]'),
        hd3 = qs('select[name="head3"]'),
        hd4 = qs('select[name="head4"]'),
        hd5 = qs('select[name="head5"]'),
        hd6 = qs('select[name="head6"]');
      for (let i = 0; i < hd.length; i++) {
        hd[i].value = config.headerOrder[i]
        // hChange(hd[i], hd[i].value)
      }
      function hChange(elm, v) {
        let e = elm.className;
        $(`ul#headerMainMenu > li#${e}`).remove();
        headerBtns[v].appendTo($("ul#headerMainMenu"));
        // headerBtns.custom.appendTo($("ul#headerMainMenu"))
        // if(config.headerOrder[0] !== "home") {
        //   $("ul#headerMainMenu").html("")
        //   headerBtns.appendTo($("ul#headerMainMenu"))
        // }
        log(v)
        log(elm)
        //$("ul#headerMainMenu").html("");
      }
      qs("button.header_reset").addEventListener("click", () => {
        for (let i = 0; i < hd.length; i++) {
          config.headerOrder[i] = dConfig.headerOrder[i]
          hd[i].value = config.headerOrder[i]
        }
        brws.storage.local.set(config);
        // hChange($el.name)
        // window.location.reload();
      });
      $("a.customize-header").on("click", function () {
        $("form.magicph_customize").attr("style", "display: grid;");
        $(".wrapper").toggleClass("blur");
        $("html").toggleClass("magicFreeze");
        $(".navbackground").attr("style", "width: 100%");
      });
      // qs("li.categories").addEventListener("focus", (e) => {
      // });
      // qs("li.categories").addEventListener("mouseenter", (e) => {
      // });
      // qs("li.categories").addEventListener("mouseleave", (e) => {
      // });
    })
  }
} catch (err) {
  log(err)
}
}


        // let mod = config.headerLinks,
        //   src = {
        //     Home: $('.home > a[href="/"]'),
        //     Video: $('.videos > a[href="/video"]'),
        //     Category: $('.categories > a[href="/categories"]'),
        //     Pornstar: $('.pornstar > a[href="/pornstars"]'),
        //     Community: $('.community > a[href^="/community"]'),
        //     Photo: $('.photos > a[href^="/albums"]'),
        //     Premium: $('.premium > a[href="/premium"]'),
        //     Gift: $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]'),
        //     GHome: $('.home > a[href="/"]'),
        //     GVideo: $('.videos > a[href="/gayporn"]'),
        //     GCategory: $('.categories > a[href="/gay/categories"]'),
        //     GPornstar: $('.pornstar > a[href="/gay/pornstars"]'),
        //     GCommunity: $('.community > a[href^="/community?section=gay"]'),
        //     GPhoto: $('.photos > a[href^="/albums/gay"]'),
        //     GPremium: $('.premium > a[href="/gay/premium"]'),
        //   };
        // !check.gay ? (
        //   // src.Home.attr("href", mod.Home)
        //   src.Video.attr("href", mod.Video),
        //   src.Category.attr("href", mod.Category),
        //   src.Pornstar.attr("href", mod.Pornstar),
        //   src.Community.attr("href", mod.Community),
        //   src.Photo.attr("href", mod.Photo)
        // ) : (
        //   // src.GHome.attr("href", mod.GHome)
        //   src.GVideo.attr("href", mod.GVideo),
        //   src.GCategory.attr("href", mod.GCategory),
        //   src.GPornstar.attr("href", mod.GPornstar),
        //   src.GCommunity.attr("href", mod.GCommunity),
        //   src.GPhoto.attr("href", mod.GPhoto)
        // );

export { loadHeader }