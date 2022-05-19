// import jQuery from "../web_accessible_resources/jquery.js";
import jQuery from "../web_accessible_resources/jquery.min.js";

window.$ = window.jQuery = jQuery;

const getVideoUrl = (link) => {
  return new Promise((resolve,reject) => {
    $.ajax({
      type: "GET",
      url: link,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      }
    })
  });
},
locate = document.location.href,
  check = {
    community: document.location.pathname == "/user/discover",
    channel: $("#channelsProfile").length,
    category: /categories/.test(locate),
    favorites: /magicph-favorites/.test(locate),
    home: document.location.pathname == "/",
    gay: /gay/.test(locate),
    gif: /gifs/.test(locate),
    lo: $("body.logged-out").length,
    model: $("div.amateurModel").length,
    new: $("#headerSearchWrapperFree").length,
    premium: $(".premiumUser").length,
    pstar: /pornstars/.test(locate),
    user: $("#profileContent").length,
    video: /view_video.php/.test(locate),
    //recommended: $("div#recommendations").length
    recommended: /recommended/.test(locate),
  };

let userInfo = (url = "default") => {
  if(url == "default") { return; }
  let uName = $("div.usernameWrap > a"),
    mod = $("a.usernameLink"),
    vid = $("span.usernameBadgesWrapper > a"),
    val = $("div.usernameWrap > a");
  url === "model" ? (val = mod) : url === "video" ? (val = vid) : (val = uName);
  for (let i = 0; i < val.attr("href").length; i++) {
    val.eq(i).attr("href", `${val.eq(i).attr("href")}/videos`);
  }
};

export {
  check,
  getVideoUrl,
  userInfo
};