'use strict';
import { qs, qsA } from './querySelector.js';

// let popupData = {};

const hermes = mph.hermes;
const portMessage = async (root = {}) => {
  if (mph.isEmpty(root)) {
    return
  };
  const config = root.cfg || config;

  const grab = await mph.fetchURL('magicph_cfg.html', 'GET', 'text'),
    ff = qs('form.magicph_cfg'),
    favs = qs('.favorites');
  ff.innerHTML = grab;

  for (const t of qsA('.tabButton')) {
    mph.ael(t, 'click', (e) => {
      mph.halt(e);
      const dp = e.target.dataset.pane;
      if (dp.includes('favorites')) {
        ff.setAttribute('style', 'display: none;');
        favs.setAttribute('style', '');
      }
      if (dp.includes('options')) {
        ff.setAttribute('style', '');
        favs.setAttribute('style', 'display: none;');
      }
    });
  }
  for (const videos of config['favoriteVideos']) {
    mph.makeFav(videos, qs('.favorites'));
  }
  for (const prop in config) {
    prop in ff.elements
      ? ff.elements[prop].type == 'checkbox'
        ? (ff.elements[prop].checked = config[prop])
        : (ff.elements[prop].value = config[prop])
      : false;
  }
  mph.ael(ff, 'change', (e) => {
    const $el = /** @type {HTMLInputElement} */ (e.target);
    $el.type == 'checkbox' ? (config[$el.name] = $el.checked) : (config[$el.name] = $el.value);
    hermes.send('saveConfig', {
      what: 'Save',
      cfg: {
        name: $el.name,
        value: config[$el.name]
      }
    });
  });
};
hermes.send('init', {
  what: 'setup'
}).then((response) => {
  portMessage(response);
});
