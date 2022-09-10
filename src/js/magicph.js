'use strict';
import {mph} from './api.js';
import {qs,qsA} from './querySelector.js';

(async () => {
  try {
  if(document.documentElement.classList.contains('ios')) {return false};
let userInfo = (url = "default") => {
  if(url == "default") { return; }
  mph.query('.userInfo > div.usernameWrap > span.usernameBadgesWrapper > a').then(user => user.href = user.href + "/videos");
};

mph.find.channel ? mph.log('Channel page') : false;
if(mph.find.home) {
  mph.info('Homepage page');
  for(let u of qsA('ul')) {
    if(u.dataset.hpblockname === "Recommended for You" ) {
      qs(".frontListingWrapper").prepend(u.parentElement)
    };
  };
};
//window.PH_Storage.getItem("watchedVideoIds") // stored videos
//window.PH_Storage.saveItem("watchedVideoStorage")
if(mph.find.video) {
  await mph.query(".mgp_container");
  mph.info("Video page");
  document.documentElement.style = "scrollbar-color: #4646463d #000 !important;";
  userInfo("video");
  qs('[data-entrycode="VidPg-premVid-videoPage"]') ? qs('[data-entrycode="VidPg-premVid-videoPage"]').parentElement.parentElement.remove() : false;
  // qs(".mainPlayerDiv").classList.add("bigp");
  qs(".relatedVideos").classList.add("mph1","video-info-row","showLess","allRelatedVideos");
  qs(".show-more-btn").classList.add("bottom");
  qs(".video-actions-tabs").append(qs(".mph1"));
  qs(".videos-list").classList.add("mph2","video-info-row","showLess");
  qs(".mph1").append(qs(".mph2"));
  qs(".videos-list").classList.add("mph3","video-info-row","showLess");
  qs(".js-relatedRecommended").append(qs(".mph3"));
  qs(".mph2 > .user-playlist").id = "relatedVideosCenter";
  for(let a of qsA("ul.mgp_quality.mgp_optionsList > li")) {
    a.classList.remove("mgp_active");
  };
  qsA("ul.mgp_quality.mgp_optionsList > li")[0].classList.add("mgp_active");
  mph.ael(qs(".mgp_options"),'click', () => {
    if (!qs("div.mgp_optionsMenu.mgp_visible.mgp_level2")) {
      qs(".mgp_subPage > div:nth-child(1)").innerText = "Quality";
      qs("div.mgp_optionsMenu").classList.add("mgp_level2","mgp_visible");
      qs('.mgp_optionsMenu > div:nth-child(2)').classList.add("mgp_animated");
      qs('.mgp_optionsMenu > div:nth-child(2)').setAttribute("style","width: 110px; height: 194px;");
      qs("ul.mgp_quality.mgp_optionsList").setAttribute("style", "display:block;");
    } else {
      qs("div.mgp_optionsMenu").classList.remove("mgp_level2","mgp_visible");
      qs('.mgp_optionsMenu > div:nth-child(2)').classList.remove("mgp_animated");
      qs('.mgp_optionsMenu > div:nth-child(2)').setAttribute("style","width: 165px; height: 136px;");
      qs("ul.mgp_quality.mgp_optionsList").setAttribute("style", "display:none;");
    }
  });
  mph.ael(qs(".mgp_clickHandler"),'click', () => {
    qs("div.mgp_optionsMenu").classList.remove("mgp_level2","mgp_visible");
    qs('.mgp_optionsMenu > div:nth-child(2)').classList.remove("mgp_animated");
    qs('.mgp_optionsMenu > div:nth-child(2)').setAttribute("style","width: 165px; height: 136px;");
    qs("ul.mgp_quality.mgp_optionsList").setAttribute("style", "display:none;");
  });
  for(let h of qsA("div.mgp_header")) {
    mph.ael(h,'click', () => {
      if(qs("div.mgp_optionsMenu.mgp_visible.mgp_level2")) {
        qs("div.mgp_optionsMenu").classList.remove("mgp_level2");
        qs('.mgp_optionsMenu > div:nth-child(2)').setAttribute("style","width: 165px; height: 136px;");
      };
    })
  };
};
mph.find.category ? mph.info("Categories") : false;
mph.find.user ? mph.info("User Profile") : false;
if(mph.find.model) {
  mph.info(`Model`);
  userInfo("model");
}
mph.find.pstar ? mph.info(`Pornstar`) : false;
if (mph.find.gif) {
  mph.info(`Gifs`);
  if(mph.find.lo) {
    qs("#imgNavWrap").append(qs(".gifColumnRight"))
  }
};

if(mph.find.recommended && mph.find.lo) {
  mph.info("Recommended");
  qs('a[href="/recommended/rate"]').classList.add("rm");
};


userInfo();

if(mph.find.lo) {
  mph.info("Logged out");
  mph.inject(`disablePlaylistPlusButon = true`)
};

mph.ael(document,'scroll', () => {
  const search = qs(".headerSearchWrapper"),
  pgnav = qsA(".pagination3 > ul")[1],
  pgInput = qsA(".pagination3 > .pjump")[1],
  mc = qs(".magicCenter"),
  mph1 = qs(".mph1"),
  mph2 = qs(".mph2");
  // smol = qs(".mainPlayerDiv");
  // sma = qs("#vb"),
  // smb = qs("#vr"),
  if(mph.find.video) {
    if(mph.html.scrollTop > 300) {
      mc.classList.add("top");
    } else {
      mc.classList.remove("top");
    };
  };
  if(mph.html.scrollTop > mph.scrollnumber) {
    qs(".magicTop").classList.add("top");
    search.classList.add("sticky");
    pgnav ? pgnav.classList.add("top") : false;
    pgInput ? pgInput.classList.add("top") : false;
    mph1 ? mph1.setAttribute("style", "display: block;") : false;
    mph2 ? mph2.setAttribute("style", "display: block;") : false;
    mc ? mc.classList.remove("top") : false;
    //smol.classList.remove("bigp");
    //smol.classList.add("smolp");
  } else {
    qs(".magicTop").classList.remove("top");
    search.classList.remove("sticky");
    pgnav ? pgnav.classList.remove("top") : false;
    pgInput ? pgInput.classList.remove("top") : false;
    mph1 ? mph1.setAttribute("style", "display: none;") : false;
    mph2 ? mph2.setAttribute("style", "display: none;") : false;
    //smol.classList.add("bigp");
    //smol.classList.remove("smolp");
  };
});
} catch(e) {
  mph.err(e)
};
})();