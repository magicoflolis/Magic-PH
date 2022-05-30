'use strict';
import {mph} from './api.js';
import webext from './api-webext.js';
import {qs,qsA} from "./querySelector.js";
(() => {
webext.getItem((config) => {
  mph.query("body").then(() => {
    document.title = "[MagicPH] Favorites";
    document.body.classList.add("mph");
    qs(".wrapper > .container").classList.add("favorites");
    qs(".wrapper > .container").innerHTML = config.favorites;
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
      window.open(e.target.parentElement.parentElement.nextElementSibling.href,"_blank");
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
    config.favorites = qs(".wrapper > .favorites").innerHTML;
    webext.setItem(config);
  });
});

})();