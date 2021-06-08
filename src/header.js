import $ from "jquery";

const check = {},
  recommended = document.querySelector(".realsex > a"),
  r_span = document.querySelector(
    "#menuItem6 > a:nth-child(1) > span:nth-child(1)"
  );
check.gay = document.querySelectorAll(".gayLayout").length;
check.new = document.querySelectorAll("#headerSearchWrapperFree").length;
check.premium = document.querySelectorAll(".premiumUser").length;
check.video = document.querySelectorAll("#player").length;
let mod = {
    Logo: "/recommended",
    Home: "/",
    Video: "/video?o=tr&hd=1",
    Category: "/categories?o=al",
    Pornstar: "/pornstars?performerType=pornstar",
    Community: "/user/discover",
    Photo: "/gifs",
    Premium: "/premium",
    GPremium: "/gay/premium",
    Gift: "/premium",
    GLogo: "/gay/recommended",
    GHome: "/gay",
    GVideo: "/gay/video?o=tr&hd=1",
    GCategory: "/gay/categories?o=al",
    GPornstar: "/gay/pornstars?performerType=pornstar",
    GCommunity: "/user/discover/gay",
    GPhoto: "/gay/gifs?o=tr",
  },
  src = {
    Logo: $('.logoWrapper > a[itemprop="url"]'),
    Home: $('.home > a[href="/"]'),
    Video: $('.videos > a[href="/video"]'),
    Category: $('.categories > a[href="/categories"]'),
    Pornstar: $('.pornstar > a[href="/pornstars"]'),
    Community: $('.community > a[href^="/community"]'),
    Photo: $('.photos > a[href^="/albums"]'),
    Premium: $('.premium > a[href="/premium"]'),
    Gift: $('#giftingEntry[href="/gift?type=GiftCard-Purchase"]'),
    GLogo: $('.logoWrapper > a[href="/gayporn"]'),
    GHome: $('.home > a[href="/"]'),
    GVideo: $('.videos > a[href="/gayporn"]'),
    GCategory: $('.categories > a[href="/gay/categories"]'),
    GPornstar: $('.pornstar > a[href="/gay/pornstars"]'),
    GCommunity: $('.community > a[href^="/community?section=gay"]'),
    GPhoto: $('.photos > a[href^="/albums/gay"]'),
    GPremium: $('.premium > a[href="/gay/premium"]'),
  };
r_span.textContent = "recommended";
// recommended.setAttribute("href", "/recommended");
recommended.setAttribute("target", "_self");
let chgay = () => {
    recommended.setAttribute("href", "/gay/recommended");
    // src.GLogo.attr("href", mod.GLogo);
    // src.GHome.attr("href", mod.GHome);
    src.GVideo.attr("href", mod.GVideo);
    src.GCategory.attr("href", mod.GCategory);
    src.GPornstar.attr("href", mod.GPornstar);
    src.GCommunity.attr("href", mod.GCommunity);
    src.GPhoto.attr("href", mod.GPhoto);
    recommended.attr("href", "/gay/recommended");
    // src.Gift.attr("href", mod.Gift);
    // src.GPremium.attr("href", mod.GPremium);
  },
  // chvid = () => {
  //   src.Home.attr("href", mod.Home);
  // },
  chnp = () => {
    recommended.setAttribute("href", "/recommended");
    // src.Logo.attr("href", mod.Logo);
    // src.Home.attr("href", mod.Home);
    src.Video.attr("href", mod.Video);
    src.Category.attr("href", mod.Category);
    src.Pornstar.attr("href", mod.Pornstar);
    src.Community.attr("href", mod.Community);
    src.Photo.attr("href", mod.Photo);
    // src.Premium.attr("href", mod.Premium);
    // src.Gift.attr("href", mod.Gift);
  };
try {
  check.gay ? chgay() : false;
  check.new || check.Premium ? chnp() : false;
  // check.video ? chvid() : false;
} catch (err) {
  let label = '[MagicPH Debugger]';
  console.group(label)
  console.error(err)
  console.groupEnd(label)
}

// if (err instanceof ValidationError) {
//   // handle validation errors
// } else if (err instanceof SyntaxError) {
//   // handle syntax errors
// } else {
//   throw err; // unknown error, rethrow it
// }
