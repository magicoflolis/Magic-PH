"use strict";
const check = {},
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
function callback() {
    document.head.prepend(s);
    const sel = document.querySelector(".jump-to-tab > .seconds"),
      wrapper = document.querySelector(".wrapper"),
      jump = document.querySelector('[data-tab="jump-to-tab"]'),
      jptrigger = document.getElementsByClassName("js-triggerJumpCat");
    logo.onclick = () => {
      let w = document.querySelector(".wrapper"),
        s = document.querySelector(".sidenav");
      navbackground.style.width = "100%";
      s.style = "width: 20% !important;";
      w.className = "wrapper blur";
      pop.style.top = "100%";
    };
    check.gay = document.querySelector(".gayLayout") ? true : false;
    const cfg = {
      logo: () => {
        // Prevents duplicate
        if (check.gay) {
          logo.innerHTML =
            '<img src="https://ci.phncdn.com/www-static/images/pornhub_logo_gay.png?cache=2020120703">';
          document.querySelector("#headerContainer > .logoGay").appendChild(logo);
        } else {
          logo.innerHTML =
            '<img src="https://di.phncdn.com/www-static/images/pornhub_logo_straight.png?cache=2020120703">';
            document.querySelector("#headerContainer > .logo").appendChild(logo);
        }
      },
      nav: () => {
        let w = document.querySelector(".wrapper"),
          s = document.querySelector(".sidenav");
        w.className = "wrapper";
        s.style = "";
        pop.style.top = "100%";
        navbackground.style.width = "0%";
      },
      jump: () => {
        // Opens Jump to
        jump.onclick = async (e) => {
          let nav = document.querySelector(".navbackground"),
          cat = document.querySelector(".magic-popup > #categoriesListSection"),
          f = document.querySelector(".magic-popup > .favorites"),
          j = document.querySelector(".magic-popup > .sortBy");
          cat ? cat.style.display = "none" : false;
          f ? f.style.display = "none" : false;
          pop.appendChild(sel);
          pop.style.top = "25%";
          nav.setAttribute("style", "width:100%");
          j.style.display = '';
          e.preventDefault();
        };
        // Trigger & close
        for (let i = 0; i < jptrigger.length; i++) {
          jptrigger[i].addEventListener("click", () => {
            pop.setAttribute("style", "");
            navbackground.setAttribute("style", "");
          });
        }
      },
    }
    document.querySelector(".magiclogo") ?? cfg.logo();
    // favs.innerHTML = '';
    navbackground.onclick = async () => {
      return cfg.jump ? cfg.nav() : false;
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
document.readyState === "complete" ||
(document.readyState !== "loading" && !document.documentElement.doScroll) ? callback()
  : document.addEventListener("DOMContentLoaded", callback);

  // const init = { subtree: true, characterData: true, childList: true },
  //   target = document.getElementById('react-root') ?? console.log(`[MoL] can't find ${target}`),
  //   callback = (_mutations, observer) => {
  //       observer.disconnect()
  //       injectTranslationButton()
  //       //injectMenu()
  //       observer.observe(target, init)
  //   };
  //   new MutationObserver(callback).observe(target, init)
