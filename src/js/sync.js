let config = {
  altplayers: false,
  autoscroll: true,
  blurimg: false,
  comments: false,
  topbutton: true,
  sidebar: true,
  header1: 'separate',
},
coms = document.querySelector("#cmtWrapper"),
magicCheck = () => {
  let phblur = () => {
    let x = document.querySelectorAll("div.phimage"),
    y = document.querySelectorAll("div.thumbnail-info-wrapper");
    for (let i = 0; i < x.length; i++) {
      x[i].className += " blur";
      // y[i].className += " blur";
    }
  };
  // config.autoscroll ? window.scroll(0, 110) : false;
  config.blurimg ? phblur() : false;
  (config.sidebar) ? document.querySelectorAll("div.sidenav").className += " rm" : false;
  (config.topbutton) ? document.querySelector(".magicTop").className += " rm" : false;
  (config.comments) ? coms.className += " video-info-row showLess" : coms.className += " rm";

  let fav = document.querySelector('[data-tab="add-to-tab"]');
  fav.onclick = async (e) => {
    let vFR = document.createElement('div'),
    vTH = document.createElement('img'),
    vTI = document.createElement('a'),
    vidURL = document.location.href,
    vidThumb = document.querySelector("#videoElementPoster").src,
    vidTitle = document.querySelector("h1.title span").textContent,
    nav = document.querySelector(".navbackground"),
    p = document.querySelector(".magic-popup"),
    cat = document.querySelector(".magic-popup > #categoriesListSection"),
    f = document.querySelector(".magic-popup > .favorites"),
    j = document.querySelector(".magic-popup > .sortBy");
    cat ? cat.style.display = "none" : false;
    j ? j.style.display = "none" : false;
    f.style.display = "";
    f.style.height = "100%";
    f.style.width = "100%";
    vFR.className = "wrap";
    vTH.className = "phimage";
    vTH.src = vidThumb;
    vTH.href = vidURL;
    vTI.className = "title";
    vTI.href = vidURL;
    vTI.title = vidTitle
    vTI.innerHTML = vidTitle
    vFR.appendChild(vTH);
    vFR.appendChild(vTI);
    f.appendChild(vFR);
    p.style.top = "25%";
    nav.setAttribute("style", "width:100%");
    console.log(`${vidThumb} ${vidTitle} ${vidURL}`);
    e.preventDefault();
  }
};
function magicObserver() {
  const init = { subtree: true, characterData: true, childList: true, attributes: true },
  target = document.querySelector("body") ?? console.log(`[MoL] can't find ${target}`),
  callback = (_mutations, observer) => {
      observer.disconnect()
      magicCheck()
      observer.observe(target, init)
  };
  new MutationObserver(callback).observe(target, init)
}

if (typeof chrome != 'undefined' && typeof chrome.storage != 'undefined' || typeof browser != 'undefined' && typeof browser.storage != 'undefined') {
  chrome.storage.local.get((storedConfig) => {
    Object.assign(config, storedConfig)
    config.autoscroll ? window.scroll(0, 110) : false;
    magicObserver()
  })
}
else {
  config.autoscroll ? window.scroll(0, 110) : false;
  magicObserver()
}
