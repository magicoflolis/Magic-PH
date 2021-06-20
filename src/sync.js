import { config, err } from "./general";
export const brws = typeof browser == "undefined" ? chrome : browser,
  cfgLoader = () => {
    try {
      function blurWatcher() {
        let x = $("div.phimage.blur"),
          y = $("div.phimage");
        x.length != y.length
          ? (y.addClass("blur"),
            $("img.js-menuSwap").addClass("blur"),
            $("img.lazy").addClass("blur"),
            $("video.lazyVideo").addClass("blur"),
            /categories/.test(window.location.href)
              ? $('a[data-mxptype="Category"] > img').addClass("blur")
              : false,
            /view_video.php/.test(window.location.href)
              ? ($("#videoElementPoster").addClass("blur"),
                $(".mgp_videoPoster").addClass("blur"))
              : false,
            $("a.orangeButton > img").removeClass("blur"),
            $("img.catIcon").removeClass("blur"))
          : false;
      }

      brws.storage.local.get((storedConfig) => {
        //document.addEventListener('DOMContentLoaded', blurWatcher())
        Object.assign(config, storedConfig);
        config.blurimg
          ? new MutationObserver(() => {
              blurWatcher();
            }).observe(document.body, { subtree: true, childList: true })
          : false;
        window.scroll(0, 110);
        // config.autoscroll ? window.scroll(0, 110) : false;
        config.comments ? $("div.mph3").removeClass("rm") : false;
        config.sidebar ? $("div.sidenav").addClass("rm") : false;
        config.topbutton ? $(".magicTop").addClass("rm") : false;
      });
    } catch (error) {
      err(error);
    }
  };

// if (check.video && check.lo) {
//   let mfav = qs(".favorite-wrapper"),
//     favoritesList = [],
//     addFav = (...args) => {
//       return favoritesList.push(...args);
//     };
//   mfav.onclick = async (e) => {
//     let vidURL = document.location.href,
//       vidThumb = qs("#videoElementPoster").src,
//       vidTitle = qs("h1.title > span").textContent,
//       vFR = create("div", null, "wrap"),
//       vTH = create("img", null, "phimage"),
//       vTI = create("a", null, "title"),
//       nav = qs(".navbackground"),
//       p = qs(".magic-popup"),
//       cat = qs(
//         ".magic-popup > #categoriesListSection"
//       ),
//       f = qs(".magic-popup > .favorites"),
//       j = qs(".magic-popup > .sortBy");
//     cat ? (cat.style.display = "none") : false;
//     j ? (j.style.display = "none") : false;
//     qs("html").id = "magicFreeze";
//     addFav({ url: vidURL, thumb: vidThumb, title: vidTitle });
//     p.style.width = "86%";
//     p.style.height = "auto";
//     f.style.display = "grid";
//     p.style.top = "0px";
//     nav.style.width = "100%";
//     vTH.src = favoritesList[0].thumb;
//     vTH.href = favoritesList[0].url;
//     vTI.href = favoritesList[0].url;
//     vTI.title = favoritesList[0].title;
//     vTI.innerHTML = favoritesList[0].title;
//     vFR.appendChild(vTH);
//     vFR.appendChild(vTI);
//     f.appendChild(vFR);
//     // console.log(fCount);
//     console.log(favoritesList);
//     // brws.storage.local.set(favoritesList)
//     //console.log(`${vidThumb} ${vidTitle} ${vidURL}`);
//     e.preventDefault();
//   };
// }
