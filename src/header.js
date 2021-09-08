import { check, err } from "./general";

let mod = {
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community: "/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    Gift: "/premium",
    GPremium: "/gay/premium",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr",
  },
  src = {
    Home: $('.home > a[href="/"]'),
    Video: $('.videos > a[href="/video"]'),
    Category: $('.categories > a[href="/categories"]'),
    Pornstar: $('.pornstar > a[href="/pornstars"]'),
    Community: $('.community > a[href^="/community"]'),
    Photo: $('.photos > a[href^="/albums"]'),
    Premium: $('.premium > a[href="/premium"]'),
    Gift: $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]'),
    GHome: $('.home > a[href="/"]'),
    GVideo: $('.videos > a[href="/gayporn"]'),
    GCategory: $('.categories > a[href="/gay/categories"]'),
    GPornstar: $('.pornstar > a[href="/gay/pornstars"]'),
    GCommunity: $('.community > a[href^="/community?section=gay"]'),
    GPhoto: $('.photos > a[href^="/albums/gay"]'),
    GPremium: $('.premium > a[href="/gay/premium"]'),
  };
export default function hInit() {
  try {
    let find = !check.gay ? '/recommended' : '/gay/recommended',
    selA = `<a href="${find}" class="active js-topMenuLink"><span class="itemName"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
    selB = `<a href="${find}" class="js-topMenuLink"><span class="itemName">recommended</span></a>`,
    recommended = $(`<li class="menu recommended" data-hover="0">${(check.recommended) ? selA : selB}</li>`),
    custom = $(`<li class="menu customize"><a title="Customize Header" type="button" class="customize-header js-topMenuLink"><span class="itemName">customize</span></a></li>`);
    $("ul#headerMainMenu").append(recommended,custom)
    !check.gay ? (
      // src.Home.attr("href", mod.Home)
      src.Video.attr("href", mod.Video),
      src.Category.attr("href", mod.Category),
      src.Pornstar.attr("href", mod.Pornstar),
      src.Community.attr("href", mod.Community),
      src.Photo.attr("href", mod.Photo)
      // src.Premium.attr("href", mod.Premium)
      // src.Gift.attr("href", mod.Gift)
    ) : (
      // src.GHome.attr("href", mod.GHome)
      src.GVideo.attr("href", mod.GVideo),
      src.GCategory.attr("href", mod.GCategory),
      src.GPornstar.attr("href", mod.GPornstar),
      src.GCommunity.attr("href", mod.GCommunity),
      src.GPhoto.attr("href", mod.GPhoto)
      // src.Gift.attr("href", mod.Gift)
      // src.GPremium.attr("href", mod.GPremium)
    );
  } catch (error) {
    err(error);
  }
};
