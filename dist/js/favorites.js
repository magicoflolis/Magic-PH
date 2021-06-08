
const brws = (typeof browser=="undefined"?chrome:browser);
brws.storage.local.get(favs => {
  let res = favs[0];
  res ?? log("First time init."),TETConfig = DefaultConfig;
  res ? () => {
    try {
      TETConfig = JSON.parse(res);
    } catch (e) {
      TETConfig = res;
    }
  } : false;
  const localData = localStorage.TETConfig;
  (localData && localData.length > 0) ? TETConfig = JSON.parse(localData) : false;
  for (let key in DefaultConfig) {
    (typeof (TETConfig[key])) ?? (TETConfig[key] = DefaultConfig[key]);
  }
let favoritesList = [];
  $form.addEventListener('change', (e) => {
    let $el = (/** @type {HTMLInputElement} */ (e.target))
    // brws.storage.local.set(favs)
  })
  brws.storage.local.set(favoritesList)
})





// config = {
//   altplayers: false,
//   autoscroll: true,
//   blurimg: false,
//   comments: true,
//   topbutton: false,
//   fasttravel: true,
//   header1: 'separate',
//   ...storedConfig
// }
