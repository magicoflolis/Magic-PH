import { create, log, qs } from "./general";

const brws = (typeof browser == "undefined") ? chrome : browser,
  loadScript = async (src) => {
    const s = create("script", "module");
    s.async = true;
    s.src = brws.runtime.getURL(src);
    s.crossOrigin = "anonymous";
    s.onload = () => log(`Loaded ${src}`);
    s.onerror = () => log(`Script load error for ${src}`);
    document.head.prepend(s);
  },
  load = async (url, selElement, name, target) => {
    await new Promise((reject) => {
      try {
        fetch(`https://${url}`)
          .then((res) => res.text())
          .then((text) => {
            let parser = new DOMParser(),
              div = create("div", null, name),
              htmlDocument = parser.parseFromString(text, "text/html"),
              selected = htmlDocument.documentElement,
              section = selected.querySelector(selElement),
              thumb = "none";
            target ? target.prepend(div) : p.prepend(div);
            div.prepend(section);
            (name == "home") ? (thumb = $(".home").find("img")) :
            (name == "recommend") ? (thumb = $(".recommend").find("img")) :
            (name == "categories") ? (thumb = $(".categories").find("img")) : false;
            if(thumb !== "none") {
              for (let i = 0; i < thumb.length; i++) {
                thumb.eq(i).attr("src", thumb.eq(i).attr("data-thumb_url"));
              }
              qs(`.${name} > ${selElement}`).addEventListener('scroll', async () => {
                let pgnav = $(".pagination3 > ul").eq(0);
                if($(".home > div.frontListingWrapper").scrollTop() > 110) {
                  pgnav.addClass("top")
                } else {
                  pgnav.removeClass("top")
                }
              })
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  sidebar = `<a class="magic1">Home</a><a class="magic2">Catagories</a><a class="magic3">Recommended</a><a class="magic4">Taste Profile(WIP)</a><a class="magic5">Favorites(WIP)</a><a class="magic6">MagicPH Config</a><a class="magic7"></a><a class="magic999">Exit ⟵</a>`,
  pageination = `
  <div class="pagination3">
  <ul class="firstPage">
    <li class="page_current alpha"><span class="greyButton">1</span></li>
    <li class="page_number">
      <a class="greyButton" href="/video?page=2">2</a>
    </li>
    <li class="page_number">
      <a class="greyButton" href="/video?page=3">3</a>
    </li>
    <li class="page_number">
      <a class="greyButton" href="/video?page=4">4</a>
    </li>
    <li class="page_number">
      <a class="greyButton" href="/video?page=5">5</a>
    </li>
    <li class="page_next_set">
      <a class="greyButton" href="/video?page=10">10</a>
    </li>
    <li class="page_next omega">
      <a href="/video?page=2" class="orangeButton"
        >Next
        <img
          class="pagination_arrow_right lazy"
          src="https://ei.phncdn.com/www-static/images/rightArrow.png"
          alt="Right Arrow"
          data-src="https://ei.phncdn.com/www-static/images/rightArrow.png"
          data-title=""
          title=""
          data-img_type="image"
      /></a>
    </li>
  </ul>
</div>
  `,
  find = !$(".gayLayout").length ? '/' : '/gay/',
  lognav = create("div", null, "sidenav"),
  logo = create("a", "button", "magiclogo"),
  p = create("div", null, "magic-popup"),
  nav = create("div", null, "navbackground"),
  phLogo = () => {
    qs(".magiclogo") ?? (
    qs("#headerContainer > .logo").appendChild(logo),
    $('.logo > .logoWrapper > a > img').clone().appendTo(logo) );
    lognav.innerHTML = sidebar;
    p.innerHTML = pageination;
    document.body.prepend(p,lognav);
    document.body.append(nav);
    logo.addEventListener('click', async () => {
      nav.style.width = "100%";
      // lognav.style.width = "20% !important";
      $(".sidenav").attr("style", "width: 20% !important;");
      $(".wrapper").toggleClass("blur");
      p.style.top = "100%";
      // p.style.visibility = "visible";
      $("html").toggleClass("magicFreeze");
    });
    nav.addEventListener('click', async () => {
      $(".wrapper").toggleClass("blur");
      lognav.style.width = "0%";
      p.style.top = "100%";
      nav.style.width = "0%";
      $(".magic-popup > div.categories").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      // f ? (f.className = "favorites",f.style.display = "none") : false;
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      $("html").toggleClass("magicFreeze");
    });
    qs(".magic1").addEventListener('click', async () => {
      $(".magic-popup > div.categories").attr("style", "display: none;");
      //$(".magic-popup > div.favorites").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      p.style.top = "0px";
      nav.style.width = "100%";
      $(".magic-popup > div.home").length ? ($(".magic-popup > div.home").attr("style", "display: block;")) : load(`${document.location.host}`, ".frontListingWrapper", "home");
    });
    qs(".magic2").addEventListener("click", async () => {
      //$(".magic-popup > div.favorites").attr("style", "display: none;");
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      p.style.top = "0px";
      nav.style.width = "100%";
      $(".magic-popup > div.categories").length ? ($(".magic-popup > div.categories").attr("style", "display: block;")) : load(`${document.location.host}${find}categories`, "ul#categoriesListSection", "categories");
    });
    qs(".magic3").addEventListener('click', async () => {
      $(".magic-popup > div.categories").attr("style", "display: none;");
      //$(".magic-popup > div.favorites").attr("style", "display: none;");
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      p.style.top = "0px";
      nav.style.width = "100%";
      $(".magic-popup > div.recommend").length ? ($(".magic-popup > div.recommend").attr("style", "display: block;")) : load(`${document.location.host}${find}recommended`, "ul.recommendedContainerLoseOne", "recommend");
    });
    qs(".magic4").addEventListener('click', async () => {
      $(".magic-popup > div.categories").attr("style", "display: none;");
      //$(".magic-popup > div.favorites").attr("style", "display: none;");
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      p.style.top = "0px";
      nav.style.width = "100%";
      $(".magic-popup > div.taste").length ? ($(".magic-popup > div.taste").attr("style", "display: block;")) : (
        load(`${document.location.host}/recommended/taste`, ".sectionWrapper", "taste"),
        loadScript("js/recommended-taste.js"));
    });
    qs(".magic5").addEventListener('click', async () => {
      $(".magic-popup > div.categories").attr("style", "display: none;");
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      // $(".magic-popup > div.favorites").addClass("sb");
      // $(".magic-popup > div.favorites").attr("style", "display: grid;");
      // f.className += " sb";
      // f ? f.style.display = "grid" : false;
      p.style.top = "0px";
      nav.style.width = "100%";
    });
    qs(".magic999").addEventListener('click', async () => {
      $(".magic-popup > div.categories").attr("style", "display: none;");
      $(".magic-popup > div.home").attr("style", "display: none;");
      $(".magic-popup > div.taste").attr("style", "display: none;");
      //$(".magic-popup > div.favorites").attr("style", "display: none;");
      $(".magic-popup > div.recommend").attr("style", "display: none;");
      $(".wrapper").toggleClass("blur");
      lognav.style.width = "0%";
      p.style.top = "100vh";
      nav.style.width = "0%";
      $("html").toggleClass("magicFreeze");
    });
  // let favs = create("div", null, "favorites"),
  //   uName = $("div.usernameWrap > a");
  // $(".magic-popup").prepend(favs);
  // for (let i = 0; i < uName.attr("href").length; i++) {
  //   uName.eq(i).attr("href", `${uName.eq(i).attr("href")}/videos`);
  // }
  //(!$(".logged-out").length) ? (pReplace.attr('href', `${pReplace.attr("href")}/videos`)) : false;
  };

export { phLogo }