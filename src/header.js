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
      custom = $(`<li class="menu customize"><a title="Customize Header" type="button" class="customize-header js-topMenuLink"><span class="itemName">customize</span></a></li>`),
      custom_layout = $(`
      <ul id="sortlist">
      <li>First</li>
      <li>Second</li>
      <li>Third</li>
      <li>Forth</li>
      <li>Fifth</li>
      </ul>
      <script>
      let slist = (target) => {
        // (A) GET LIST + ATTACH CSS CLASS
        target = document.getElementById(target);
        target.classList.add("slist");
      
        // (B) MAKE ITEMS DRAGGABLE + SORTABLE
        var items = target.getElementsByTagName("li"), current = null;
        for (let i of items) {
          // (B1) ATTACH DRAGGABLE
          i.draggable = true;
          
          // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
          i.addEventListener("dragstart", function (ev) {
            current = this;
            // for (let it of items) {
            //   if (it != current) { it.classList.add("hint"); }
            // }
          });
          
          // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
          i.addEventListener("dragenter", function (ev) {
            if (this != current) { this.classList.add("active"); }
          });
      
          // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
          i.addEventListener("dragleave", function () {
            this.classList.remove("active");
          });
      
          // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
          i.addEventListener("dragend", function () {
            for (let it of items) {
              // it.classList.remove("hint");
              it.classList.remove("active");
            }
          });
          
          // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
          i.addEventListener("dragover", function (evt) {
            evt.preventDefault();
          });
          
          // (B7) ON DROP - DO SOMETHING
          i.addEventListener("drop", function (evt) {
            evt.preventDefault();
            if (this != current) {
              let currentpos = 0, droppedpos = 0;
              for (let it=0; it<items.length; it++) {
                if (current == items[it]) { currentpos = it; }
                if (this == items[it]) { droppedpos = it; }
              }
              if (currentpos < droppedpos) {
                this.parentNode.insertBefore(current, this.nextSibling);
              } else {
                this.parentNode.insertBefore(current, this);
              }
            }
          });
        }
      }
      slist("sortlist");
      </script>
      `);
    $("ul#headerMainMenu").append(recommended, custom)
    $("a.customize-header").on("click", function () {
      custom_layout.appendTo($(".magic-customize"))
      $(".magic-customize").attr("style", "top: 0")
    })
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
