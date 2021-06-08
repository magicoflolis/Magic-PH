let enableDebugLogging = true;
function log(...args) {
  if (enableDebugLogging) {
    console.log("[Init]", ...args);
  }
}

function qs(elem) {
  return document.querySelector(elem);
}
function create(element) {
  return document.createElement(element);
}
const brws = typeof browser == "undefined" ? chrome : browser,
  cache = "2021020802",
  check = {},
  s = create("script"),
  logo = create("a"),
  p = create("div"),
  nav = create("div"),
  magictop = create("input"),
  sidenav = create("div"),
  lognav = '<a class="magic1">Home</a>\n<a class="magic2">Catagories</a>\n<a class="magic3">Recommended</a>\n<a class="magic4">Taste Profile(WIP)</a>\n<a class="magic5">Favorites(WIP)</a>\n<a class="magic6"></a>\n<a class="magic7"></a>\n<a class="magic999">Exit ⟵</a>';
function callback() {
  document.head.prepend(s);
  document.body.prepend(magictop, sidenav)
  const w = qs(".wrapper"),
  jptrigger = document.getElementsByClassName("js-triggerJumpCat");
  logo.onclick = () => {
    let sn = qs(".sidenav");
    nav.style.width = "100%";
    sn.style = "width: 20% !important;";
    w.className = "wrapper blur";
    p.style.top = "100%";
    qs("html").id = "magicFreeze";
  };
  const cfg = {
    logo: () => {
      // Prevents duplicate
      if (qs(".gayLayout")) {
        logo.innerHTML =
          '<img src="https://ci.phncdn.com/www-static/images/pornhub_logo_gay.png">';
        qs("#headerContainer > .logoGay").appendChild(logo);
      } else {
        logo.innerHTML =
          '<img src="https://di.phncdn.com/www-static/images/pornhub_logo_straight.png">';
        qs("#headerContainer > .logo").appendChild(logo);
      }
    },
    nav: () => {
      //let w = document.querySelector(".wrapper");
      let freeze = qs("html#magicFreeze"),
      sn = qs(".sidenav"),
      cat = qs(".magic-popup > div.categories"),
      f = qs(".magic-popup > div.favorites"),
      front = qs(".magic-popup > div.home"),
      rec = qs(".magic-popup > div.recommend"),
      t = qs(".magic-popup > div.taste"),
      j = qs(".magic-popup > div.modJump");
      freeze ? freeze.id = "": false;
      w.className = "wrapper";
      sn.style = "";
      p.style.top = "100%";
      p.style.width = "";
      p.style.height = "";
      f.className = "favorites";
      nav.style.width = "0%";
      cat ? cat.style.display = "none" : false;
      j ? j.style.display = "none" : false;
      t ? t.style.display = "none" : false;
      f ? f.style.display = "none" : false;
      front ? front.style.display = "none" : false;
      rec ? rec.style.display = "none" : false;
    },
    jump: () => {
      // Trigger & close
      for (let i = 0; i < jptrigger.length; i++) {
        jptrigger[i].addEventListener("click", () => {
          p.setAttribute("style", "");
          nav.setAttribute("style", "");
        });
      }
    },
  };
  qs(".magiclogo") ?? cfg.logo();
  nav.onclick = async () => {
    let freeze = qs("html#magicFreeze"),
      sn = qs(".sidenav"),
      cat = qs(".magic-popup > div.categories"),
      f = qs(".magic-popup > div.favorites"),
      front = qs(".magic-popup > div.home"),
      rec = qs(".magic-popup > div.recommend"),
      t = qs(".magic-popup > div.taste");
      freeze ? freeze.id = "": false;
      w.className = "wrapper";
      sn.style = "";
      p.style.top = "100%";
      p.style.width = "";
      p.style.height = "";
      f.className = "favorites";
      nav.style.width = "0%";
      cat ? cat.style.display = "none" : false;
      t ? t.style.display = "none" : false;
      f ? f.style.display = "none" : false;
      front ? front.style.display = "none" : false;
      rec ? rec.style.display = "none" : false;
  };
  w.before(p);
  w.after(nav);
}

s.type = "module";
s.src = brws.runtime.getURL("js/magicph.js");
s.crossOrigin = "anonymous";
logo.type = "button";
logo.className = "magiclogo";
p.className = "magic-popup";
nav.className = "navbackground";
sidenav.className = "sidenav";
sidenav.innerHTML = lognav;
magictop.className = "magicTop";
magictop.value = "Top";
magictop.type = "button";
magictop.onclick = () => {
  return window.scroll(0, 110);
};
window.onload = () => callback()
