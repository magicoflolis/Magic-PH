const brws = (typeof browser=="undefined"?chrome:browser)
brws.storage.local.get(storedConfig => {
$form = document.querySelector('form') ?? console.log(`[MagicPH] can't find ${target}`),
config = {
    altplayers: false,
    autoscroll: true,
    blurimg: false,
    comments: false,
    topbutton: false,
    sidebar: true,
    headerLinks: {
      Home: "/",
      Video: "/video?o=tr&hd=1",
      Category: "/categories?o=al",
      Pornstar: "/pornstars?performerType=pornstar",
      Community: "/user/discover",
      Photo: "/gifs",
      Premium: "/premium",
      Gift: "/premium",
      GPremium: "/gay/premium",
      GHome: "/gay",
      GVideo: "/gay/video?o=tr&hd=1",
      GCategory: "/gay/categories?o=al",
      GPornstar: "/gay/pornstars?performerType=pornstar",
      GCommunity: "/user/discover/gay",
      GPhoto: "/gay/gifs?o=tr",
    },
    headerOrder: [
      'home',
      'videos',
      'categories',
      'pornstar',
      'realsex',
      'photos',
      'customize'
    ],
    ...storedConfig
  }

  for (let prop in config) {
    if (prop in $form.elements) {
      if ($form.elements[prop].type == 'checkbox') {
        $form.elements[prop].checked = config[prop]
      }
      else {
        $form.elements[prop].value = config[prop]
      }
    }
  }

  $form.addEventListener('change', (e) => {
    let $el = (/** @type {HTMLInputElement} */ (e.target));
    ($el.type == 'checkbox') ? (config[$el.name] = $el.checked) : config[$el.name] = $el.value;
    brws.storage.local.set(config);
    // if ($el.type == 'checkbox') {
    //   config[$el.name] = $el.checked
    // }
    // else {
    //   config[$el.name] = $el.value
    // }
  })
})
