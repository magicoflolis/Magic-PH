
const brws = (typeof browser=="undefined"?chrome:browser);
brws.storage.local.get(storedFavs => {
$form = document.querySelector('body') ?? console.log(`[MagicPH] can't find ${target}`);
let favoritesList = [...storedFavs];
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
