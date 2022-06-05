'use strict';
import custom_layout from "../html/header.html";
import {mph} from './api.js';
import {qs,qsA} from "./querySelector.js";
import webext from './api-webext.js';

function loadHeader() {
  try {
  const gCheck = mph.find.gay ? "/gay/" : "/",
  dConfig = {
    headerOrder: [
      "home",
      "videos",
      "categories",
      "pornstars",
      "gifs",
      "recommended",
      "favorites",
    ],
  };
  let custombtn = mph.create("li","menu-item menu customize"),
  customin = mph.create("a","customize-header js-topMenuLink menu_elem_cont","button"),
  hl = {
    homA: `<a href="${gCheck}" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Home</span><span class="activeLine"></span></span></a>`,
    homB: `<a href="${gCheck}" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Home</span></a>`,
    vidA: `<a href="${gCheck}video?o=tr&hd=1" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Porn Videos</span><span class="activeLine"></span></span></a>`,
    vidB: `<a href="${gCheck}video?o=tr&hd=1" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Porn Videos</span></a>`,
    catA: `<a href="${gCheck}categories?o=al" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Categories</span><span class="activeLine"></span></span></a>`,
    catB: `<a href="${gCheck}categories?o=al" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Categories</span></a>`,
    porA: `<a href="${gCheck}pornstars?performerType=pornstar" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Pornstars</span><span class="activeLine"></span></span></a>`,
    porB: `<a href="${gCheck}pornstars?performerType=pornstar" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Pornstars</span></a>`,
    gifA: `<a href="${gCheck}gifs?o=tr" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Photos & Gifs</span><span class="activeLine"></span></span></a>`,
    gifB: `<a href="${gCheck}gifs?o=tr" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Photos & Gifs</span></a>`,
    comA: `<a href="/user/discover${gCheck}" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Community</span><span class="activeLine"></span></span></a>`,
    comB: `<a href="/user/discover${gCheck}" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Community</span></a>`,
    recA: `<a href="${gCheck}recommended" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
    recB: `<a href="${gCheck}recommended" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Recommended</span></a>`,
    favA: `<a href="/magicph-favorites" class="active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Favorites</span><span class="activeLine"></span></span></a>`,
    favB: `<a href="/magicph-favorites" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Favorites</span></a>`,
  },
  headin = {
    home: (mph.find.home) ? hl.homA : hl.homB,
    videos: (/video/.test(document.location.href)) ? hl.vidA : hl.vidB,
    categories: (mph.find.category) ? hl.catA : hl.catB,
    pornstars: (mph.find.pstar) ? hl.porA : hl.porB,
    gifs: (mph.find.gif) ? hl.gifA : hl.gifB,
    community: (mph.find.community) ? hl.comA : hl.comB,
    recommended: (mph.find.recommended) ? hl.recA : hl.recB,
    favorites: (mph.find.favorites) ? hl.favA : hl.favB,
    custom: `<a href="" class="js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">custom url</span></a>`,
  },
  headerBtns = {
//     home: $(`<li itemprop="name" id="menuItem1" class="menu js-menu item-1 home" data-hover="0">
//     ${headin.home}
//     </li>`),
//     videos: $(`<li itemprop="name" id="menuItem2" class="menu js-menu item-2 videos" data-hover="0">
//     ${headin.videos}
//     </li>`),
//     categories: $(`<li itemprop="name" id="menuItem3" class="menu js-menu item-3 categories" data-hover="0">
//     <a class="js-topMenuLink menu_elem_cont">
//     <span class="itemName menu_elem_text">Categories</span></a>
//     <div class="wideDropdown categories js-dropdown" data-submenu-type="categories" style="display: none;">
//   <div class="innerDropdown clearfix js-submenu"><div class="leftPanel">
//   <a href="/categories" class="title">Discover Categories</a>
//   <ul class="discover" style="display: none;">
//   <li class="alpha">
//     <a class="js-mixpanel" data-mixpanel-listing="" href="/categories">
//       <i class="discoverPopular"></i>Popular</a>
//   </li>
//   <li>
//     <a class="js-mixpanel" data-mixpanel-listing="" href="/categories?o=al">
//       <i class="discoverAlphabet"></i>
//       Alphabetical</a>
//   </li>
//   <li>
//     <a class="js-mixpanel" data-mixpanel-listing="" href="/categories?o=mv">
//       <i class="discoverNumber"></i>
//       Number of Videos</a>
//   </li>
//   <li class="omega">
//     <a class="js-mixpanel" data-mixpanel-listing="" href="/gayporn">
//       <i class="discoverGay"></i>
//       Gay Categories</a>
//   </li>
// </ul>
// </div>
// <ul class="headerSubMenu">
//           <li class="big video alpha">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=28" onclick="ga('send', 'event', 'Header', 'click', 'Category 28');" alt="Mature">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/28.jpg?cache=1538057919" alt="Mature" src="https://cs.phncdn.com/images/categories/118x88/28.jpg?cache=1538057919" width="118" height="88">
//         <span>Mature</span>
//       </a>
//     </li>
//         <li class=" ">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=3" onclick="ga('send', 'event', 'Header', 'click', 'Category 3');" alt="Amateur">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/3.jpg?cache=1538054514" alt="Amateur" src="https://cs.phncdn.com/images/categories/118x88/3.jpg?cache=1538054514" width="118" height="88">
//         <span>Amateur</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=17" onclick="ga('send', 'event', 'Header', 'click', 'Category 17');" alt="Ebony">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/17.jpg?cache=1538057828" alt="Ebony" src="https://cs.phncdn.com/images/categories/118x88/17.jpg?cache=1538057828" width="118" height="88">
//         <span>Ebony</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=111" onclick="ga('send', 'event', 'Header', 'click', 'Category 111');" alt="Japanese">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/111.jpg?cache=1538057813" alt="Japanese" src="https://cs.phncdn.com/images/categories/118x88/111.jpg?cache=1538057813" width="118" height="88">
//         <span>Japanese</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/categories/teen" onclick="ga('send', 'event', 'Header', 'click', 'Category 37');" alt="Teen (18+)">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/37.jpg?cache=1538058943" alt="Teen (18+)" src="https://cs.phncdn.com/images/categories/118x88/37.jpg?cache=1538058943" width="118" height="88">
//         <span>Teen (18+)</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/categories/hentai" onclick="ga('send', 'event', 'Header', 'click', 'Category 36');" alt="Hentai">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/36.jpg?cache=1538057721" alt="Hentai" src="https://cs.phncdn.com/images/categories/118x88/36.jpg?cache=1538057721" width="118" height="88">
//         <span>Hentai</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=27" onclick="ga('send', 'event', 'Header', 'click', 'Category 27');" alt="Lesbian">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/27.jpg?cache=1538058936" alt="Lesbian" src="https://cs.phncdn.com/images/categories/118x88/27.jpg?cache=1538058936" width="118" height="88">
//         <span>Lesbian</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=35" onclick="ga('send', 'event', 'Header', 'click', 'Category 35');" alt="Anal">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/35.jpg?cache=1538054554" alt="Anal" src="https://cs.phncdn.com/images/categories/118x88/35.jpg?cache=1538054554" width="118" height="88">
//         <span>Anal</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=8" onclick="ga('send', 'event', 'Header', 'click', 'Category 8');" alt="Big Tits">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/8.jpg?cache=1538055457" alt="Big Tits" src="https://cs.phncdn.com/images/categories/118x88/8.jpg?cache=1538055457" width="118" height="88">
//         <span>Big Tits</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=502" onclick="ga('send', 'event', 'Header', 'click', 'Category 502');" alt="Female Orgasm">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/502.jpg?cache=1538057942" alt="Female Orgasm" src="https://cs.phncdn.com/images/categories/118x88/502.jpg?cache=1538057942" width="118" height="88">
//         <span>Female Orgasm</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=65" onclick="ga('send', 'event', 'Header', 'click', 'Category 65');" alt="Threesome">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/65.jpg?cache=1538058956" alt="Threesome" src="https://cs.phncdn.com/images/categories/118x88/65.jpg?cache=1538058956" width="118" height="88">
//         <span>Threesome</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=86" onclick="ga('send', 'event', 'Header', 'click', 'Category 86');" alt="Cartoon">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/86.jpg?cache=1538056137" alt="Cartoon" src="https://cs.phncdn.com/images/categories/118x88/86.jpg?cache=1538056137" width="118" height="88">
//         <span>Cartoon</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=29" onclick="ga('send', 'event', 'Header', 'click', 'Category 29');" alt="MILF">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/29.jpg?cache=1538057937" alt="MILF" src="https://cs.phncdn.com/images/categories/118x88/29.jpg?cache=1538057937" width="118" height="88">
//         <span>MILF</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=24" onclick="ga('send', 'event', 'Header', 'click', 'Category 24');" alt="Public">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/24.jpg?cache=1538058397" alt="Public" src="https://cs.phncdn.com/images/categories/118x88/24.jpg?cache=1538058397" width="118" height="88">
//         <span>Public</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/transgender" onclick="ga('send', 'event', 'Header', 'click', 'Category 83');" alt="Transgender">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/83.jpg?cache=1542818912" alt="Transgender" src="https://cs.phncdn.com/images/categories/118x88/83.jpg?cache=1542818912" width="118" height="88">
//         <span>Transgender</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=181" onclick="ga('send', 'event', 'Header', 'click', 'Category 181');" alt="Old/Young">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/181.jpg?cache=1538057979" alt="Old/Young" src="https://cs.phncdn.com/images/categories/118x88/181.jpg?cache=1538057979" width="118" height="88">
//         <span>Old/Young</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=7" onclick="ga('send', 'event', 'Header', 'click', 'Category 7');" alt="Big Dick">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/7.jpg?cache=1538055506" alt="Big Dick" src="https://cs.phncdn.com/images/categories/118x88/7.jpg?cache=1538055506" width="118" height="88">
//         <span>Big Dick</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=15" onclick="ga('send', 'event', 'Header', 'click', 'Category 15');" alt="Creampie">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/15.jpg?cache=1538057688" alt="Creampie" src="https://cs.phncdn.com/images/categories/118x88/15.jpg?cache=1538057688" width="118" height="88">
//         <span>Creampie</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=80" onclick="ga('send', 'event', 'Header', 'click', 'Category 80');" alt="Gangbang">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/80.jpg?cache=1538058165" alt="Gangbang" src="https://cs.phncdn.com/images/categories/118x88/80.jpg?cache=1538058165" width="118" height="88">
//         <span>Gangbang</span>
//       </a>
//     </li>
//         <li class="big video">
//       <a class="js-mixpanel" data-mixpanel-listing="" href="/video?c=69" onclick="ga('send', 'event', 'Header', 'click', 'Category 69');" alt="Squirt">
//                 <img class="js-menuSwap" data-image="https://cs.phncdn.com/images/categories/118x88/69.jpg?cache=1538058708" alt="Squirt" src="https://cs.phncdn.com/images/categories/118x88/69.jpg?cache=1538058708" width="118" height="88">
//         <span>Squirt</span>
//       </a>
//     </li>
//       <li class="omega">
//     <a class="categoryDefault js-mixpanel" data-mixpanel-listing="" href="/categories" onclick="ga('send', 'event', 'Header', 'click', 'Categories');">
//       <img class="js-menuSwap" data-image="https://ei.phncdn.com/www-static/images/categories_seeall.gif" alt="See All" src="https://ei.phncdn.com/www-static/images/categories_seeall.gif" width="118" height="88">
//       <span>See All</span>
//     </a>
//   </li>
// </ul>
//   </div>
// </div>
//     </li>`),
//     pornstars: $(`<li itemprop="name" id="menuItem4" class="menu js-menu item-4 pornstar" data-hover="0">
//     ${headin.pornstars}
//     </li>`),
//     gifs: $(`<li itemprop="name" id="menuItem5" class="menu js-menu item-5 photos" data-hover="0">
//     ${headin.gifs}
//     </li>`),
//     community: $(`<li itemprop="name" id="menuItem6" class="menu js-menu item-6 community" data-hover="0">
//     ${headin.community}
//     </li>`),
    recommended: mph.create("li","menu_elem menu-item menu js-menu item-7 recommended"),
    favorites: mph.create("li","menu_elem menu-item menu js-menu item-8 fav"),
    custom: mph.create("li","menu_elem menu-item menu js-menu item-9"),
    // recommended: qs(`<li id="menuItem7" class="menu js-menu item-7 recommended" data-hover="0">${headin.recommended}</li>`),
    // favorites: qs(`<li id="menuItem8" class="menu js-menu item-8 fav">${headin.favorites}</li>`),
    // custom: qs(`<li id="menuItem9" class="menu js-menu item-9">${headin.custom}</li>`),
  };
  webext.getItem((config)=>{
    mph.query("body").then(() => {
      let menu;
      if(mph.find.ph || mph.find.yp) {
        menu = qs("ul#headerMainMenu");
      };
      if(mph.find.t8) {
        menu = qs("ul#main-nav");
      };
      if(mph.find.rt) {
        menu = qs("ul.menu_list");
      };
      if(mph.find.tz) {
        menu = qs("ul.categoryList");
      };
      // menu.html("");
      let magicForm = mph.create("form","magicph_customize");
      magicForm.innerHTML = custom_layout;
      qs(".magic-customize").append(magicForm);
      let formBTN = () => {
        custombtn.id = "menuItem99";
        customin.title = "Customize Header";
        customin.innerHTML = '<span class="itemName menu_elem_text">customize (wip)</span>';
        if(mph.find.t8) {
          mph.query("ul#main-nav").then((e) => {
            e.appendChild(custombtn);
            custombtn.appendChild(customin);
            mph.ael(customin,"click", () => {
              qs(".wrapper").classList.remove("blur");
              qs("html").classList.remove("magicFreeze");
              qs(".navbackground").setAttribute("style","width: 100%");
              qs(".magic-customize").setAttribute("style","display: grid;");
            });
          });
        };
        if(mph.find.tz) {
          mph.query("ul.categoryList").then((e) => {
            e.appendChild(custombtn);
            custombtn.appendChild(customin);
            mph.ael(customin,"click", () => {
              qs(".wrapper").classList.remove("blur");
              qs("html").classList.remove("magicFreeze");
              qs(".navbackground").setAttribute("style","width: 100%");
              qs(".magic-customize").setAttribute("style","display: grid;");
            });
          });
        };
        //
        if(mph.find.ph || mph.find.yp) {
          mph.query("ul#headerMainMenu").then((e) => {
            e.appendChild(custombtn);
            custombtn.appendChild(customin);
            mph.ael(customin,"click", () => {
              qs(".wrapper").classList.remove("blur");
              qs("html").classList.remove("magicFreeze");
              qs(".navbackground").setAttribute("style","width: 100%");
              qs(".magic-customize").setAttribute("style","display: grid;");
            });
          });
        };
      },
      customize = qsA('section.head-select > select');
      headerBtns.recommended.id = "menuItem7";
      headerBtns.recommended.innerHTML = headin.recommended;
      headerBtns.favorites.id = "menuItem8";
      headerBtns.favorites.innerHTML = headin.favorites;
      customize.forEach((c, i) => {
        c.value = config.headerOrder[i];
        if(c.value === "custom") {
          qsA(".magicph-name")[i].classList.remove("rm");
          qsA(".magicph-url")[i].classList.remove("rm");
        };
        // for (let key in config.headerOrder) {
        //   menu.append(headerBtns[config.headerOrder[key, i]]);
        // };
        mph.ael(c,"change", (e) => {
          try {
            let target = e.target,
            cname = target.className;
            if(target.value !== "custom") {
              qs(".magicph-name").classList.add("rm");
              qs(".magicph-url").classList.add("rm");
            };
            if(mph.find.t8) {
              qs(`#main-nav > .${cname}`).innerHTML = `${headin[target.value]}`;
            };
            if(mph.find.ph || mph.find.yp) {
              qs(`#headerMainMenu > .${cname}`).innerHTML = `${headin[target.value]}`;
            };
            if(mph.find.rt) {
              qs(`ul.menu_list > .${cname}`).innerHTML = `${headin[target.value]}`;
            };
            // $(`#headerMainMenu > .${cname}`).html($(headin[target.value]));
            config.headerOrder.splice(i, i, target.value);
            mph.log(config.headerOrder);
            webext.setItem(config);
          } catch(err) {
            mph.err(err);
          }
        });
      });
      formBTN();
      mph.query("button.header_reset").then((e) => {
        mph.ael(e,"click", () => {
          config.headerOrder = dConfig.headerOrder;
          webext.setItem(config);
          config.headerOrder.forEach((item, index) => {
            qs(`#headerMainMenu > .${customize[index].className}`).innerHTML = `${headin[item]}`;
            // $(`#headerMainMenu > .${customize[index].className}`).html($(headin[item]));
            customize[index].value = dConfig.headerOrder[index];
          });
          formBTN();
        });
      });
      menu.append(headerBtns.recommended,headerBtns.favorites);
    });
  });
} catch (err) {
  mph.err(err);
};
};

export default loadHeader

// const map1 = [...customize].map(item => item.className);
// const map1 = Array.from(dConfig.headerOrder).map(item => item);


// headerLinks: {
//   Home: "/",
//   Video: "/video?o=tr&hd=1",
//   Category: "/categories?o=al",
//   Pornstar: "/pornstars?performerType=pornstar",
//   Community: "/user/discover",
//   Photo: "/gifs",
//   Premium: "/premium",
//   Gift: "/premium",
//   GPremium: "/gay/premium",
//   GHome: "/gay",
//   GVideo: "/gay/video?o=tr&hd=1",
//   GCategory: "/gay/categories?o=al",
//   GPornstar: "/gay/pornstars?performerType=pornstar",
//   GCommunity: "/user/discover/gay",
//   GPhoto: "/gay/gifs?o=tr",
// },
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
//     GPremium: '.premium > a[href="/gay/premium"]'),
//   };
// !mph.find.gay ? (
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