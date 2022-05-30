const qs = (element, selector = document) => {
  return selector.querySelector(element);
},
locate = document.location.href,
check = {
  community: document.location.pathname == "/user/discover",
  channel: qs("#channelsProfile"),
  category: /categories/.test(locate),
  favorites: /magicph-favorites/.test(locate),
  home: document.location.pathname == "/",
  gay: /gay/.test(locate),
  gif: /gifs/.test(locate) || /gif/.test(locate),
  lo: qs("body.logged-out"),
  model: qs("div.amateurModel"),
  new: qs("#headerSearchWrapperFree"),
  premium: qs(".premiumUser"),
  pstar: /pornstars/.test(locate),
  user: qs("#profileContent"),
  video: /view_video.php/.test(locate),
  //recommended: qs("div#recommendations")
  recommended: document.location.pathname === "/recommended",
};

export {
  check
};