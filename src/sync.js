'use strict';
try {
const brws = (typeof browser=="undefined"?chrome:browser),
qs = (elem) => {
  return document.querySelector(elem);
};
let config = {
  altplayers: false,
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
  header1: 'separate'
};

async function blurWatcher() {
  let b = document.querySelectorAll("div.phimage.blur"),
  x = document.querySelectorAll("div.phimage"),
    y = document.querySelectorAll("div.mhp1138_videoPoster picture img");
  if(b.length != x.length) {
  for (let i = 0; i < x.length; i++) {
    x[i].className += " blur";
  }
  if(document.location.pathname == "/view_video.php") {
    for (let i = 0; i < y.length; i++) {
      y[i].className += " blur";
    }
  }
}
}

brws.storage.local.get((storedConfig) => {
  Object.assign(config, storedConfig)
  config.autoscroll ? window.scroll(0, 110) : false;
  // magicCheck()
  (config.blurimg) ? new MutationObserver(() => {blurWatcher()}).observe(document.body, {subtree:true,childList:true}) : false;
  (config.sidebar) ? document.querySelectorAll("div.sidenav").className += " rm" : false;
  (config.topbutton) ? qs(".magicTop").className += " rm" : false;
  //(config.autoscroll) ? window.scroll(0, 110) : false;
  (config.comments) ? qs(".mph3").className = "mph3 video-info-row showLess" : false;
  if(document.location.pathname == "/view_video.php" && qs(".logged-out")) {
    let mfav = qs('.favorite-wrapper'),
    favoritesList = [ ],
    addFav = (...args) => {
      return favoritesList.push(...args)
    };
    mfav.onclick = async (e) => {
      let vidURL = document.location.href,
      vidThumb = document.querySelector("#videoElementPoster").src,
      vidTitle = document.querySelector("h1.title > span").textContent,
      vFR = document.createElement('div'),
      vTH = document.createElement('img'),
      vTI = document.createElement('a'),
      nav = document.querySelector(".navbackground"),
      p = document.querySelector(".magic-popup"),
      cat = document.querySelector(".magic-popup > #categoriesListSection"),
      f = document.querySelector(".magic-popup > .favorites"),
      j = document.querySelector(".magic-popup > .sortBy");
      cat ? cat.style.display = "none" : false;
      j ? j.style.display = "none" : false;
      qs("html").id = "magicFreeze";
      addFav({ url: vidURL, thumb: vidThumb, title: vidTitle })
      p.style.width = "86%";
      p.style.height = "auto";
      f.style.display = "grid";
      vFR.className = "wrap";
      vTH.className = "phimage";
      vTI.className = "title";
      p.style.top = "0px";
      nav.style.width = "100%";
      vTH.src = favoritesList[0].thumb;
      vTH.href = favoritesList[0].url;
      vTI.href = favoritesList[0].url;
      vTI.title = favoritesList[0].title;
      vTI.innerHTML = favoritesList[0].title;
      vFR.appendChild(vTH);
      vFR.appendChild(vTI);
      f.appendChild(vFR);
      // console.log(fCount);
      console.log(favoritesList);
      // brws.storage.local.set(favoritesList)
      //console.log(`${vidThumb} ${vidTitle} ${vidURL}`);
      e.preventDefault();
    }
  }
})

} catch (err) {
  console.error(err)
}
// brws.storage.local.get((storedConfig) => {
//   Object.assign(config, storedConfig)
//   // magicCheck()
//   config.autoscroll ? window.scroll(0, 110) : false;
//   magicObserver()
// })

// brws.storage.local.get((storedFavs) => {
//   Object.assign(favorites, storedFavs)
// })
