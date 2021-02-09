"use strict";

const cfg = {},
  check = {},
  jsname = "[Init]",
  debug = "[Init Debug]",
  cache = "2021020802",
  browser = chrome,
  inj = {
    magicph: browser.runtime.getURL("js/magicph.js"),
  },
  s = document.createElement("script"),
  logo = document.createElement("a"),
  pop = document.createElement("div"),
  navbackground = document.createElement("div");
let callback = () => {
    document.head.prepend(s);
    const sel = document.querySelector(".jump-to-tab > .seconds"),
      wrapper = document.querySelector(".wrapper"),
      jump = document.querySelector('[data-tab="jump-to-tab"]'),
      jptrigger = document.getElementsByClassName("js-triggerJumpCat"),
      favs = document.createElement("script");
    logo.onclick = async () => {
      let w = document.querySelector(".wrapper"),
        s = document.querySelector(".sidenav");
      navbackground.style.width = "100%";
      s.style = "width: 20% !important;";
      w.className = "wrapper blur";
      pop.style.top = "100%";
    };
    check.gay = document.querySelector(".gayLayout") ? true : false;
    // Prevents duplicate
    cfg.logo = () => {
      if (check.gay) {
        logo.innerHTML =
          '<img src="https://ci.phncdn.com/www-static/images/pornhub_logo_gay.png?cache=2020120703">';
        document.querySelector(".pornhub_logo_gay").appendChild(logo);
      } else {
        logo.innerHTML =
          '<img src="https://di.phncdn.com/www-static/images/pornhub_logo_straight.png?cache=2020120703">';
        document.querySelector(".pornhub_logo").appendChild(logo);
      }
    }
    document.querySelector(".magiclogo") ?? cfg.logo();
    // favs.innerHTML = 'document.querySelector(\'.magic5.favorite\').onclick=()=>{let vidURL=document.location.href,vidThumb=document.querySelector("#videoElementPoster").src,vidTitle=document.querySelector("h1.title span").textContent;console.log(`${vidThumb} ${vidTitle} ${vidURL}`);}';
    navbackground.onclick = async () => {
      cfg.jump ? cfg.nav() : false;
    };
    cfg.nav = () => {
      let w = document.querySelector(".wrapper"),
        s = document.querySelector(".sidenav");
      w.className = "wrapper";
      s.style = "";
      pop.style.top = "100%";
      navbackground.style.width = "0%";
    };
    cfg.jump = () => {
      // Opens Jump to
      jump.onclick = async (e) => {
        let nav = document.querySelector(".navbackground");
        pop.style.top = "25%";
        pop.appendChild(sel);
        nav.setAttribute("style", "width:100%");
        e.preventDefault();
      };
      // Trigger & close
      let i;
      for (i = 0; i < jptrigger.length; i++) {
        jptrigger[i].addEventListener("click", () => {
          pop.setAttribute("style", "");
          navbackground.setAttribute("style", "");
        });
      }
      return true;
    };
    wrapper.before(pop);
    wrapper.after(navbackground);
    // Check if "Jump to" exists
    check.video =
      document.location.pathname == "/view_video.php" ? true : false;
    check.jump = jump ? cfg.jump() : false;
    check.video ? check.jump() : false;
  };

s.type = "module";
s.src = inj.magicph;
s.crossOrigin = "anonymous";
logo.type = "button";
logo.className = "magiclogo";
pop.className = "magic-popup";
navbackground.className = "navbackground";
// window.addEventListener("load", () => {
//   document.head.prepend(s);
//   callback();
// });
document.readyState === "complete" ||
(document.readyState !== "loading" && !document.documentElement.doScroll)
  ? callback()
  : document.addEventListener("DOMContentLoaded", callback);
