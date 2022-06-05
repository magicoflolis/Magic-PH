'use strict';
import {mph} from './api.js';
import webext from './api-webext.js';
import {qs,qsA} from "./querySelector.js";
(() => {
  if(document.location.href.includes("magicph-favorites")) {
  let l = {
    ph: document.location.origin.includes("pornhub"),
    rt: document.location.origin.includes("redtube"),
    t8: document.location.origin.includes("tube8"),
    tz: document.location.origin.includes("thumbzilla"),
    yp: document.location.origin.includes("youporn"),
  };

webext.getItem((config) => {
  mph.query("body").then(() => {
    document.title = "[MagicPH] Favorites";
    document.body.classList.add("mph");
    if(l.ph) {
      qs(".wrapper > .container").classList.add("favorites");
      qs(".wrapper > .container").innerHTML = config.favorites;
    };
    if(l.yp) {
      qs("#mainContent > .container").classList.add("favorites");
      qs("#mainContent > .container").innerHTML = config.favorites;
    };
    if(l.t8) {
      qs(".main-wrapper > .content-wrapper").classList.add("favorites");
      qs(".main-wrapper > .content-wrapper").innerHTML = config.favorites;
    };
    if(l.rt) {
      qs("#content_float > #content_wrapper").classList.add("favorites");
      qs("#content_float > #content_wrapper").innerHTML = config.favorites;
    };
    if(l.tz) {
      qs("#contentWrapper > section").classList.add("favorites");
      qs("#contentWrapper > section").innerHTML = config.favorites;
    };
    let downloader = qsA("button.download-trigger"),
    remover = qsA("button.remove-trigger"),
    handleBtns = (t,btnText,btnFinal) => {
      if(t.innerText === btnText) {
        t.parentElement.previousElementSibling.classList.add("rm");
        t.parentElement.parentElement.parentElement.classList.add("marked");
        t.parentElement.parentElement.nextElementSibling.classList.add("rm");
        t.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("rm");
        t.innerText = btnFinal;
      } else {
        t.parentElement.previousElementSibling.classList.remove("rm");
        t.parentElement.parentElement.parentElement.classList.remove("marked");
        t.parentElement.parentElement.nextElementSibling.classList.remove("rm");
        t.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.remove("rm");
        t.innerText = btnText;
      }
    },
    downloadfn = async (e) => {
      mph.halt(e);
      self.open(e.target.parentElement.parentElement.nextElementSibling.href,"_blank");
    },
    removerfn = (e) => {
      mph.halt(e);
      handleBtns(e.target,"Remove","Undo");
    };
    remover.forEach((item,i) => {
      item.removeEventListener("click", removerfn)
      mph.ael(item,"click", removerfn);
      downloader[i].removeEventListener("click", downloadfn)
      mph.ael(downloader[i],"click", downloadfn);
    });
    if(l.rt) {
      config.favorites = qs("#content_float > .favorites").innerHTML;
    };
    if(l.t8) {
      config.favorites = qs(".main-wrapper > .favorites").innerHTML;
    };
    if(l.ph) {
      config.favorites = qs(".wrapper > .favorites").innerHTML;
    };
    if(l.yp) {
      config.favorites = qs("#mainContent > .favorites").innerHTML;
    };
    if(l.tz) {
      config.favorites = qs("#contentWrapper > .favorites").innerHTML;
    };

    webext.setItem(config);
  });
});

};
})();