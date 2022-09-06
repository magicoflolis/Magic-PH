'use strict';
import {mph} from './api.js';
import Config from './config.js';
import {qs,qsA} from "./querySelector.js";
mph.check(Config).then((c) => {
(() => {
  if(mph.find.href.includes("magicph-favorites")) {
  let config = c.config;

  mph.query("body").then(() => {
    let container;
    document.title = "[MagicPH] Favorites";
    document.body.classList.add("mph");
    if(mph.find.ph) {
      container = qs(".wrapper > .container");
      container.classList.add("favorites");
    };
    if(mph.find.yp) {
      container = qs("#mainContent > .container");
      container.classList.add("favorites");
    };
    if(mph.find.t8) {
      container = qs(".main-wrapper > .content-wrapper");
      container.classList.add("favorites");
    };
    if(mph.find.rt) {
      container = qs("#content_float > #content_wrapper");
      container.classList.add("favorites");
    };
    if(mph.find.tz) {
      container = qs("#contentWrapper > section");
      container.classList.add("favorites");
    };
    for (let videos of config["favoriteVideos"]) {
        let v = videos.video,
        wrap = mph.create("div","wrap");
        wrap.innerHTML = `<div class="mph-btns">
        <div class="download-btn">
        <button class="download-trigger" type="button">Download</button>
        </div>
        <div class="remove-btn">
        <button class="remove-trigger" type="button">Remove</button>
        </div>
        </div>
        <a href='${v.link}'>
        <img src='${v.thumb}'></img>
        </a>
        <span class="title">
        <a href='${v.link}'>${v.title}</a>
        </span>`;
        container.prepend(wrap);
    };
    let handleBtns = (t,btnText,btnFinal) => {
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
        };
    },
    downloadfn = async (e) => {
        mph.halt(e);
        self.open(e.target.parentElement.parentElement.nextElementSibling.href,"_blank");
    },
    removerfn = (e) => {
        mph.halt(e);
        handleBtns(e.target,"Remove","Undo");
    };
    if(qs("button.remove-trigger")) {
      mph.fe("button.remove-trigger",(item,i) => {
        item.removeEventListener("click", removerfn);
        mph.ael(item,"click", removerfn);
        mph.qa("button.download-trigger").then(
          (btn) => {
            btn[i].removeEventListener("click", downloadfn);
            mph.ael(btn[i],"click", downloadfn);
          });
      });
    };
    mph.ael(window,"beforeunload", () => {
    if(qs(".favorites > .wrap")) {
        for (let videos of config["favoriteVideos"]) {
          let v = videos.video;
          qsA(".marked").forEach((m) => {
            if(v.link === m.children[1].href) {
              config["favoriteVideos"].splice(config["favoriteVideos"].indexOf(videos),1);
              m.remove();
            };
          });
        };
    };
    c.local.handler.set("favoriteVideos",config["favoriteVideos"]);
    });
  });

};
})();
});