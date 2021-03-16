"use strict";
import { $ } from "./core.js";
import { sidescr, scr } from "./load.js";
import "./header.js";
// page_params.jqueryVersion = 'https://code.jquery.com/jquery-git.js'
// console.clear();
const check = {
  community: (document.location.pathname == "/user/discover") ? true : false,
  channel: $("#channelsProfile").length,
  home: $(".frontListingWrapper").length,
  video: $("#player").length,
  cv: $(".gridWrapper").length,
  new: $("#headerSearchWrapperFree").length,
  gay: $(".gayLayout").length,
  lo: $(".logged-out").length,
  premium: $(".premiumUser").length,
  gif: $("#gifWrap").length,
  user: $("#profileContent").length,
  model: $(".amateurModel").length,
  pstar: $(".claimed").length,
};
let scrollnumber = 110,
  jsname = "[MagicPH]",
  debug = "[MagicPH Debug]",
  magictop = document.createElement("input"),
  sidenav = document.createElement("div"),
  navscript = document.createElement("script"),
  pop = document.querySelector(".magic-popup"),
  lognav = '<a class="magic1" href="/">Home</a>\n<a class="magic2">Catagories</a>\n<a class="magic3" href="/recommended">Recommended</a>\n<a class="magic4" href="/recommended/taste">Taste Profile</a>\n<a class="magic5">Favorites (WIP)</a>\n<a class="magic6"> (WIP)</a>\n<a class="magic7"> (WIP)</a>\n<a class="magic999">Exit</a>';
  try {
    console.log(`${jsname} Loading inline script...`);
    sidenav.className = "sidenav";
    sidenav.innerHTML = lognav;
    navscript.innerHTML = sidescr;
    magictop.className = "magicTop";
    magictop.value = "Top";
    magictop.type = "button";
    magictop.onclick = () => {
      $("html, body").animate({ scrollTop: 100 }, 800);
    };
    $(".wrapper").before(magictop, sidenav, navscript);
    // $(favs).prependTo($(".magic-popup"))
    document.querySelector(".magic999").onclick = async () => {
      let pop = document.querySelector(".magic-popup"),
        cat = document.querySelector(".magic-popup > #categoriesListSection");
        document.querySelector(".wrapper").className = "wrapper";
        document.querySelector(".sidenav").style = "";
        cat.style.display = "none";
        pop.style.top = "100%";
        document.querySelector(".navbackground").style.width = "0%";
    };
    if (check.channel) {
      console.log(`${jsname} Channel`);
    }
    if (check.home) {
      console.log(`${jsname} Homepage`);
      $("#recommended-category-videos").prependTo(".frontListingWrapper");
      $("#recommended-videos").prependTo(".frontListingWrapper");
    }
    if (check.video) {
      console.log(`${jsname} Video Page`);
      let q = $("mhp1138_quality.mhp1138_optionsList > li:nth-child(1)");
      scrollnumber = 400;
      $(".show-more-btn").addClass("bottom");
      $(".mainPlayerDiv").addClass("bigp");
      $(".relatedVideos").addClass("mph1 video-info-row showLess allRelatedVideos");
      $(".mph1").appendTo(".video-actions-tabs");
      $(".videos-list").addClass("mph2 video-info-row showLess");
      $(".mph2").appendTo(".mph1");
      $(".mph2 > .user-playlist").attr("id", "relatedVideosCenter");
      q.attr("class", "mhp1138_active");
      localStorage.setItem("player_quality", '{"quality":"1440"}');
      if (check.lo) {
        $(".votes-fav-wrap").hide();
        $(".userActions").hide();
      }
    }
    if (check.cv) {
      console.log(`${jsname} Categories`);
    }
    if (check.user) {
      console.log(`${jsname} User Profile`);
    }
    if (check.model) {
      console.log(`${jsname} Model`);
    }
    // if (dl.pathname == "/user/discover") {
    if (check.community) {
      console.log(`${jsname} Community`);
      if (check.lo) {
        $(".userWidgetbuttons").remove();
        $("#communityMenuWrap").remove();
      }
    }
    if (check.pstar) {
      console.log(`${jsname} Pornstar`);
    }
    if (check.gif) {
      console.log(`${jsname} Gifs`);
      if (check.lo) {
        $(".float-right").remove();
      }
    }
    pop.innerHTML = scr;
    let favs = document.createElement('div')
    favs.className = "favorites";
    $(".magic-popup").prepend(favs);
    document.querySelector(".categories").onmouseenter = async (e) => {
      e.preventDefault();
      let cat = document.querySelector(".magic-popup > #categoriesListSection"),
      p = document.querySelector(".magic-popup"),
      f = document.querySelector(".magic-popup > .favorites"),
      j = document.querySelector(".magic-popup > .sortBy");
      f ? f.style.display = "none" : false;
      j ? j.style.display = "none" : false;
      cat.style.display = "";
      cat.style.height = "80%";
      cat.style.width = "50%";
      p.style.top = "10%";
      document.querySelector(".navbackground").style.width = "100%";
    };
    let playlist = $('.open-playlist-link')
    playlist.onclick = async (e) => {
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

  } catch (err) {
    console.error(`${debug} ${err}`);
  }
window.onscroll = async () => {
  let scroll = $(window).scrollTop(),
    search = $(".headerSearchWrapper"),
    pgnav = $(".pagination3 > ul"),
    sma = $(".mph1"),
    smb = $(".mph2"),
    smol = $(".mainPlayerDiv"),
    // sma = $("#vb"),
    // smb = $("#vr"),
    a = () => {
      $(".magicTop").attr("style", "top: 90%");
      search.addClass("sticky");
      pgnav.attr("style", "top: 90%");
      sma.attr("style", "display: block;");
      smb.attr("style", "display: block;");
      //smol.removeClass("bigp");
      // $(".navbackground").addClass("smolnav");
      // smol.prependTo(".navbackground")
      //smol.addClass("smolp");
    },
    b = () => {
      $(".magicTop").attr("style", "");
      search.removeClass("sticky");
      pgnav.attr("style", "");
      sma.attr("style", "display: none;");
      smb.attr("style", "display: none;");
      //smol.addClass("bigp");
      // $(".navbackground").removeClass("smolnav");
      // smol.prependTo(".video-wrapper")
      //smol.removeClass("smolp");
    };
    return (scroll > scrollnumber) ? a() : b();
};
// $("html, body").animate({scrollTop:100},800)
