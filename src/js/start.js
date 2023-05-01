'use strict';
import { qs, qsA, query } from './querySelector.js';

if (typeof mph === 'object' && !mph.contentScriptStart) {
  mph.contentScriptStart = true;
  {
    let context = self;
    try {
      while (
        context !== self.top &&
        context.location.href.startsWith('about:blank') &&
        context.parent.location.href
      ) {
        context = context.parent;
      }
    } catch (ex) {
      mph.err(ex);
    }
    mph.effectiveSelf = context;
  }

  const hermes = mph.hermes;

  const progressUpdate = async (msg, time) => {
    const timeout = new mph.Timeout();
    qs('.mph_progressContainer').setAttribute('style', 'display: block;');
    qs('.mph_progress').innerHTML = msg;
    if (typeof time === 'number' && !isNaN(time)) {
      await timeout.set(time);
      qs('.mph_progressContainer').setAttribute('style', '');
      qs('.mph_progress').innerHTML = '';
    }
    return timeout.clear(...timeout.ids);
  };

  let config = {},
    win = self ?? window,
    doc = win.document,
    location = win.location,
    progressBar = mph.make('h1', 'mph_progress'),
    progressContainer = mph.make('div', 'mph_progressContainer'),
    exDom = [];

  const fromDom = async (obj) => {
      if (!mph.isEmpty(exDom)) {
        let doms = exDom.filter((d) => Object.is(d.dom, obj));
        if (doms) {
          return doms[0].root;
        }
      }
      let win = mph.isNull(window.wrappedJSObject) ? window : window.wrappedJSObject;
      const handler = {
        get(obj, prop) {
          return prop in obj ? obj[prop] : win[prop];
        }
      };
      if (typeof win[obj] === 'undefined') {
        while (typeof win[obj] === 'undefined') {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }
      let root = new Proxy(win[obj], handler);
      exDom.push({
        dom: obj,
        root: root
      });
      return root;
    },
    pgparam = mph.page.getPage(),
    pagination = qsA('.pagination3')[0],
    centerPage = (x = 0, y = 101) => {
      return win.scrollTo(x, y);
    },
    loadHTML = async (src) => {
      let response = await mph.fetchURL(webext.runtime.getURL(src), 'GET', 'text');
      return response;
    },
    loadPage = (url, type) => {
      const pageInput = qs('.pagination3 > .pjump > input'),
        page = qsA('.pagination3 > ul')[0];
      mph.ael(pageInput, 'change', (e) => {
        mph.halt(e);
        let link = `${url}/video?page=${e.target.value}`;
        if (type === 'home') {
          qs('.magic-popup > div.home').innerHTML = '';
          link = `${url}/video?page=${e.target.value}`;
          return load(`${link}`, '.sectionWrapper', 'home');
        } else {
          qs('.magic-popup > div.recommend').innerHTML = '';
          link = `${url}?page=${e.target.value}`;
          return load(`${link}`, 'ul#recommendedListings', 'recommend');
        }
      });
      for (const i of page.children) {
        mph.ael(i, 'click', async (e) => {
          mph.halt(e);
          await load(`${e.target.href}`, '.sectionWrapper', 'home');
        });
      }
    },
    load = async (url, selElement, name) => {
      try {
        if (mph.isEmpty(selElement)) {
          return;
        }
        let purl = url.includes('https://') ? url : `https://${url}`;
        let page = await mph.fetchURL(purl, 'GET', 'text'),
          parser = new DOMParser(),
          htmlDocument = parser.parseFromString(page, 'text/html'),
          selected = htmlDocument.documentElement,
          section = qs(selElement, selected);
        if (!qs(`.magic-popup > .${name} > ${selElement}`) && section.outerHTML) {
          qs(`.magic-popup > .${name}`).innerHTML = section.outerHTML;
        }
        if (name !== 'categories') {
          let scroller = qs(`.${name} > ${selElement}`),
            scrollfn = () => {
              if (scroller.scrollTop > mph.page.scrollnumber) {
                qsA('.pagination3')[0].children[0].classList.add('mph-top');
                qsA('.pagination3')[0].children[1].classList.add('mph-top');
              } else {
                qsA('.pagination3')[0].children[0].classList.remove('mph-top');
                qsA('.pagination3')[0].children[1].classList.remove('mph-top');
              }
            };
          if (scroller) {
            scroller.removeEventListener('scroll', scrollfn);
            mph.ael(scroller, 'scroll', scrollfn);
            loadPage(url, name);
          }
        }
      } catch (ex) {
        mph.err(ex);
      }
    },
    loadSetup = async () => {
      try {
        if (window.location === null) {
          return;
        }
        if (self.mph instanceof Object === false) {
          return;
        };
        if (mph.isEmpty(document.body)) {
          return;
        }
        mph.log('isMobile', mph.isMobile);
        progressContainer.append(progressBar);
        doc.body.prepend(progressContainer);
        let saveFav = () => {
            if(mph.isEmpty(config.favoriteVideos)) {
              return;
            };
            if (qs('.favorites > .wrap')) {
              for (const videos of config.favoriteVideos) {
                for (const m of qsA('.marked')) {
                  const hasHref = [...m.children].filter((cn) => !mph.isEmpty(cn.href));
                  for (const cn of hasHref) {
                    if (Object.is(videos.video.link, cn.href)) {
                      config.favoriteVideos.splice(config.favoriteVideos.indexOf(videos), 1);
                      m.remove();
                    }
                  }
                }
              };
              hermes.send('saveConfig', {
                what: 'Save',
                cfg: {
                  name: 'favoriteVideos',
                  value: config.favoriteVideos
                },
                url: mph.effectiveSelf.location.href
              });
              mph.log('[Config] Updated Favorites List:', config.favoriteVideos);
            }
          },
          nav = mph.make('div', 'navbackground', {
            onclick: () => {
              if (qs('header')) {
                qs('header').style = '';
              }
              if (qs('.site-wrapper')) {
                qs('.site-wrapper').style = '';
              }
              if (!mph.isEmpty(pgparam.body)) {
                if (qs(pgparam.body)) {
                  qs(pgparam.body).classList.remove('mph-blur');
                }
              }
              sidenav.style = 'left: -200vw;';
              magicpopup.classList.remove('open');
              nav.style.width = '0%';
              for (let item of qsA('.magic-popup > [id="popupContainer"]')) {
                item.setAttribute('style', 'display: none;');
              }
              for (let item of qsA('.top')) {
                item.classList.remove('mph-top');
              }
              qs('.pjump > input').value = '';
              mph.html.classList.remove('magicFreeze');
              saveFav();
            }
          }),
          sidenav = mph.make('div', 'sidenav'),
          exitNav = mph.make('a', 'magic999', {
            innerHTML: 'Exit ⟵',
            onclick: () => {
              if (qs('header')) {
                qs('header').style = '';
              }
              if (qs('.site-wrapper')) {
                qs('.site-wrapper').style = '';
              }
              if (!mph.isEmpty(pgparam.body)) {
                if (qs(pgparam.body)) {
                  qs(pgparam.body).classList.remove('mph-blur');
                }
              }
              sidenav.style = 'left: -200vw;';
              magicpopup.classList.remove('open');
              nav.style.width = '0%';
              for (const item of qsA('.magic-popup > [id="popupContainer"]')) {
                item.setAttribute('style', 'display: none;');
              }
              qs('.pjump > input').value = '';
              for (const item of qsA('.top')) {
                item.classList.remove('mph-top');
              }
              mph.html.classList.remove('magicFreeze');
              saveFav();
            }
          }),
          openmenu = (elem, sty = 'display: block;', extras) => {
            for (const item of qsA('.magic-popup > [id="popupContainer"]')) {
              item.setAttribute('style', 'display: none;');
            }
            magicpopup.classList.add('open');
            nav.style.width = '100%';
            qs(elem).setAttribute('style', sty);
            qs('.sidenav > .magic6').setAttribute('style', 'display: none;');
            qs('.sidenav > .magic7').setAttribute('style', 'display: none;');
            qs('.sidenav > .magic8').setAttribute('style', 'display: none;');
            qs('.sidenav > .magic9').setAttribute('style', 'display: none;');
            if(Array.isArray(extras)) {
              for(const e of extras) {
                qs(e).setAttribute('style', 'display: block;');
              };
            };
            return true;
          },
          makeSideNav = (arr = []) => {
            for (const e of arr) {
              const sn = mph.make('a', e.class, {
                innerHTML: e.txt
              });
              if (e.style) {
                sn.style = e.style;
              }
              if (e.onclick) {
                mph.ael(sn, 'click', e.onclick);
              }
              sidenav.append(sn);
            }
          },
          magicpopup = mph.make('div', 'magic-popup', {
            innerHTML: await loadHTML('magicpopup.html')
          }),
          logo = mph.make('a', 'magiclogo', {
            type: 'button',
            onclick: (e) => {
              mph.halt(e);
              if (qs('header')) {
                qs('header').style = 'z-index: -1 !important;';
              }
              if (qs('.site-wrapper')) {
                qs('.site-wrapper').style = 'z-index: -1 !important;';
              }
              if (!mph.isEmpty(pgparam.body)) {
                if (qs(pgparam.body)) {
                  qs(pgparam.body).classList.add('mph-blur');
                }
              }
              nav.style.width = '100%';
              sidenav.style = 'left: 0;';
              magicpopup.classList.remove('open');
              mph.html.classList.add('magicFreeze');
            }
          }),
          logoimg = mph.make('img', 'js_logo_img'),
          centerContainer = mph.make('div', 'mph-center'),
          mTop = mph.make('button', 'magicTop', {
            innerHTML: 'Top',
            onclick: (e) => {
              mph.halt(e);
              centerPage(0, mph.page.scrollnumber);
            }
          }),
          mCenter = mph.make('button', 'magicCenter', {
            innerHTML: 'Recenter',
            onclick: (e) => {
              mph.halt(e);
              centerPage(0, mph.page.scrollnumber);
            }
          }),
          //#region Build Favorite List
          buildList = () => {
            if (mph.isEmpty(pgparam.container)) {
              return;
            }
            let pgContainer = qs(pgparam.container);
            if (mph.page.favorites) {
              doc.title = '[MagicPH] Favorites';
              doc.body.classList.add('mph');
              pgContainer.classList.add('favorites');
              pgContainer.style = 'overflow-x: scroll !important;';
              pgContainer.innerHTML = '';
              mph.ael(win, 'beforeunload', saveFav);
            }
            if (config.favoriteVideos.length > 0) {
              for (const videos of config.favoriteVideos) {
                mph.makeFav(videos, qs('.magic-popup > .favorites'));
              }
              if (mph.page.favorites) {
                for (const videos of config.favoriteVideos) {
                  mph.makeFav(videos, pgContainer);
                }
              }
              mph.log('Constructed favorites list to sidebar:', config.favoriteVideos);
            }
          },
          //#endregion
          importJSON = mph.make('input', 'mph_import', {
            type: 'file',
            accept: '.json',
            style: 'display: none;',
            onchange: (input) => {
              try {
                [...input.target.files].forEach((file) => {
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    const result = JSON.parse(reader.result);
                    mph.log(`Imported file: { ${file.name} }`, result);
                    if(Array.isArray(result)) {
                      config.favoriteVideos = result;
                      hermes.send('saveConfig', {
                        what: 'Save',
                        cfg: {
                          name: 'favoriteVideos',
                          value: config.favoriteVideos
                        },
                        url: mph.effectiveSelf.location.href
                      });
                      mph.log('Saved Favorites List:', config.favoriteVideos);
                    } else {
                      config = result;
                      hermes.send('saveConfig', {
                        what: 'Save',
                        cfg: {
                          name: 'Config',
                          value: config
                        },
                        url: mph.effectiveSelf.location.href
                      });
                      mph.log('Saved Config:', config);
                    };
                    progressUpdate(`Success, imported from { ${file.name} }`, 3500);
                    buildList();
                  };
                  reader.onerror = () => {
                    mph.err(reader.error);
                  };
                });
              } catch (ex) {
                mph.err(ex);
              }
            }
          }),
          //#region Load Header
          loadHeader = async () => {
            try {
              if (mph.isEmpty(pgparam.menu)) {
                return;
              }
              let hl = {
                  recA: `<a href="${
                    mph.page.gay ? '/gay/' : '/'
                  }recommended" class="mph-header-btn active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
                  recB: `<a href="${
                    mph.page.gay ? '/gay/' : '/'
                  }recommended" class="mph-header-btn js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Recommended</span></a>`,
                  favA: '<a href=\'/magicph-favorites\' class=\'mph-header-btn active js-topMenuLink menu_elem_cont\'><span class=\'itemName menu_elem_text\'><span class=\'arrowMenu\'>Favorites</span><span class=\'activeLine\'></span></span></a>',
                  favB: '<a href=\'/magicph-favorites\' class=\'mph-header-btn js-topMenuLink menu_elem_cont\'><span class=\'itemName menu_elem_text\'>Favorites</span></a>'
                },
                hRecommended = mph.make('li', 'recommended'),
                hFavorites = mph.make('li', 'fav'),
                pgmenu = qs(pgparam.menu);
              if (!pgmenu) {
                pgmenu = await query(pgparam.menu);
              }
              hRecommended.innerHTML = mph.page.recommended ? hl.recA : hl.recB;
              hFavorites.innerHTML = mph.page.favorites ? hl.favA : hl.favB;
              if (mph.isMobile) {
                if (mph.page.recommended) {
                  hRecommended.classList.add('active');
                }
                if (mph.page.favorites) {
                  hFavorites.classList.add('active');
                }
                hRecommended.classList.add('mph-header-btn', 'noImage');
                hRecommended.href = `${mph.page.gay ? '/gay/' : '/'}recommended`;
                hFavorites.classList.add('mph-header-btn', 'noImage');
                hFavorites.href = '/magicph-favorites';
              } else {
                hRecommended.classList.add('menu_elem', 'menu-item', 'menu', 'js-menu');
                hFavorites.classList.add('menu_elem', 'menu-item', 'menu', 'js-menu');
              }
              pgmenu.append(hRecommended, hFavorites);
            } catch (ex) {
              mph.err(ex);
            }
          },
          //#endregion
          //#region Logo
          phLogo = async () => {
            if (!config.sidebar) {
              return;
            }
            if (!config.topbutton) {
              mTop.classList.add('rm');
            }
            centerContainer.append(mTop);
            doc.body.prepend(sidenav, centerContainer, magicpopup);
            doc.body.append(nav, importJSON);
            try {
              if (!mph.isEmpty(pgparam.logoContainer) && !mph.isEmpty(pgparam.logoImg)) {
                let pgLogo = qs(pgparam.logoContainer),
                  pgLogoImg = qs(pgparam.logoImg);
                if (!pgLogo) {
                  pgLogo = await query(pgparam.logoContainer);
                }
                if (!pgLogoImg) {
                  pgLogoImg = await query(pgparam.logoImg);
                }
                if (pgparam.origin.match(/onlyfans/g)) {
                  let c = mph.make(
                    'a',
                    'l-header__menu__item m-size-lg-hover m-with-round-hover m-width-fluid-hover',
                    {
                      style: 'cursor: pointer;',
                      innerHTML:
                        '<span data-v-7f5ddb54="" class="l-header__menu__item__icon"><svg data-v-4125b130="" extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true"><use xlink:href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings" href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings"></use></svg></span><span data-v-7f5ddb54="" class="l-header__menu__item__text"> MagicPH </span>',
                      onclick: () => logo.click()
                    }
                  );
                  c.setAttribute('data-v-7f5ddb54', '');
                  logo.setAttribute('style', 'display: none;');
                  pgLogo.prepend(c);
                  c.prepend(logo);
                } else {
                  logoimg.src = pgLogoImg.src ?? pgLogoImg.style.background;
                  if (pgparam.origin.match(/youporn/g) && !mph.isMobile) {
                    pgLogo.prepend(logo);
                  } else if (pgparam.origin.match(/redtube/g)) {
                    qs('a#redtube_logo').setAttribute('style', 'visibility: hidden;');
                    pgLogo.prepend(logo);
                  } else if (pgparam.origin.match(/tube8/g)) {
                    qs('#logo').classList.add('rm');
                    logoimg.setAttribute(
                      'style',
                      'border: none;display: flex;align-items: center;margin: auto;height: 45px;'
                    );
                    pgLogo.prepend(logo);
                  } else if (pgparam.origin.match(/xham/g)) {
                    qs('.logo-container > span').classList.add('rm');
                    pgLogo.prepend(logo);
                  } else {
                    pgLogo.append(logo);
                  }
                  logo.append(logoimg);
                  if (pgparam.origin.match(/thumbzilla/g)) {
                    if (qs('#logo')) {
                      qs('#logo').classList.add('rm');
                      logo.id = 'logo';
                    }
                  }
                }
              }
            } catch (ex) {
              mph.err(ex);
            }
            let popups = qsA('.magic-popup > [id="popupContainer"]'),
              sidebars = qsA('.sidenav > a#sidebar');
            makeSideNav([
              {
                class: 'magic1',
                txt: 'Home',
                onclick: () => {
                  openmenu('.magic-popup > div.home');
                  load(
                    `${mph.page.gay ? `${location.host}/gay` : location.host}`,
                    pgparam.home,
                    'home'
                  );
                }
              },
              {
                class: 'magic2',
                txt: 'Blacklist',
                onclick: () => {
                  openmenu('.magic-popup > div.blacklist');
                }
              },
              {
                class: 'magic3',
                txt: 'Recommended',
                onclick: () => {
                  openmenu('.magic-popup > div.recommend');
                  load(
                    `${location.host}${!qs('.gayLayout') ? '/' : '/gay/'}recommended`,
                    'ul.recommendedContainerLoseOne',
                    'recommend'
                  );
                }
              },
              {
                class: 'magic4',
                txt: 'Favorites',
                onclick: () => {
                  openmenu('.magic-popup > div.favorites', 'display: grid;', [
                    '.sidenav > .magic6',
                    '.sidenav > .magic7'
                  ]);
                }
              },
              {
                class: 'magic5',
                txt: 'Config',
                onclick: () => {
                  openmenu('.magic-popup > div.brws_cfg', 'display: block;', [
                    '.sidenav > .magic8',
                    '.sidenav > .magic9'
                  ]);
                }
              },
              {
                class: 'magic6',
                txt: 'Export Favorites',
                style: 'display: none;',
                onclick: () => {
                  const str = JSON.stringify(config.favoriteVideos, null, ' ');
                  const bytes = new TextEncoder().encode(str);
                  const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
                  const dlBtn = mph.make('a', 'mph_Downloader', {
                    href: win.URL.createObjectURL(blob),
                    download: 'mph_videos.json'
                  });
                  dlBtn.click();
                  win.URL.revokeObjectURL(dlBtn.href);
                  progressUpdate('Exported favorites as "mph_videos.json"', 3500);
                }
              },
              {
                class: 'magic7',
                txt: 'Import Favorites',
                style: 'display: none;',
                onclick: () => {
                  importJSON.click();
                }
              },
              {
                class: 'magic8',
                txt: 'Export Config',
                style: 'display: none;',
                onclick: () => {
                  const str = JSON.stringify(config, null, ' ');
                  const bytes = new TextEncoder().encode(str);
                  const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
                  const dlBtn = mph.make('a', 'mph_Downloader', {
                    href: win.URL.createObjectURL(blob),
                    download: 'mph_config.json'
                  });
                  dlBtn.click();
                  win.URL.revokeObjectURL(dlBtn.href);
                  progressUpdate('Exported favorites as "mph_config.json"', 3500);
                }
              },
              {
                class: 'magic9',
                txt: 'Import Config',
                style: 'display: none;',
                onclick: () => {
                  importJSON.click();
                }
              }
            ]);
            let bl = qs('form.magicph_bl');
            for (let prop of config.blacklist) {
              let elem = bl.elements[prop];
              if (elem.type == 'checkbox') {
                elem.checked = true;
              }
            }
            mph.ael(bl, 'change', (e) => {
              try {
                if (e.target.checked) {
                  config.blacklist.push(e.target.name);
                } else {
                  for (let b of config.blacklist) {
                    config.blacklist.splice(config.blacklist.indexOf(b), 1);
                  }
                }
                hermes.send('saveConfig', {
                  what: 'Save',
                  cfg: {
                    name: 'blacklist',
                    value: config.blacklist
                  },
                  url: mph.effectiveSelf.location.href
                });
              } catch (ex) {
                mph.err(ex);
              }
            });
            let ff = qs('form.magicph_cfg');
            ff.innerHTML = await loadHTML('magicph_cfg.html');
            for (let prop in config) {
              prop in ff.elements
                ? ff.elements[prop].type == 'checkbox'
                  ? (ff.elements[prop].checked = config[prop])
                  : (ff.elements[prop].value = config[prop])
                : false;
            }
            mph.ael(ff, 'change', (e) => {
              try {
                let $el = /** @type {HTMLInputElement} */ (e.target);
                $el.type == 'checkbox'
                  ? (config[$el.name] = $el.checked)
                  : (config[$el.name] = $el.value);
                hermes.send('saveConfig', {
                  what: 'Save',
                  cfg: {
                    name: $el.name,
                    value: config[$el.name]
                  },
                  url: mph.effectiveSelf.location.href
                });
                config.blurimg && !mph.page.favorites
                  ? mph.html.classList.add('magicBlur')
                  : mph.html.classList.remove('magicBlur');
              } catch (ex) {
                mph.err(ex);
              }
            });
            for (let sb of sidebars) {
              mph.ael(sb, 'click', () => {
                for (let item of popups) {
                  item.setAttribute('style', 'display: none;');
                }
                pagination.children[0].classList.remove('mph-top');
                pagination.children[1].classList.remove('mph-top');
              });
            }
            sidenav.append(exitNav);
          },
          //#endregion
          //#region Page Cleanup
          pageCleanup = () => {
            if (document.documentElement.classList.contains('xh-thumb-disabled')) {
              document.documentElement.classList.remove('xh-thumb-disabled');
            }
            if (!mph.isEmpty(pgparam.body)) {
              if (qs(pgparam.body)) {
                qs(pgparam.body).classList.add('mph-body-wrapper');
              }
            }
            for (let e of qsA('ul > li')) {
              if (!pgparam.origin.match(/thumbzilla/g) && mph.isBlank(e.classList)) {
                e.remove();
              }
              if (e.classList.value.match(/sex|paid|premium|upgrade|live/gi)) {
                e.remove();
              }
            }
            let netbar = qs('#js-networkBar') ?? qs('.networkBar');
            if (netbar) {
              // qs().nodeType === 1
              if (!netbar.parentElement.localName.match(/body/)) {
                netbar.parentElement.remove();
              } else {
                netbar.remove();
              }
            }
            // if(mph.page.video) {
            //   if(pgparam.origin.match(/pornhub/g) && !mph.isMobile) {
            //     while (!qs('.mgp_container').nextElementSibling.classList.contains('title-container')) {
            //       qs('.mgp_container').nextElementSibling.remove();
            //     };
            //   };
            // };
          };
        //#endregion
        if (config.favorites) {
          mph.err('LEGACY FAVORITES LIST');
          config.favoriteVideos = [];
          qs('.magic-popup > .favorites').innerHTML = config.favorites;
          for (let w of qsA('.magic-popup > .favorites > .wrap')) {
            let legacyTitle = w.children[2].children[0].innerHTML,
              legacyThumb = w.children[1].children[0].src,
              legacyLink = w.children[1].href;
            config.favoriteVideos.push({
              video: {
                title: legacyTitle,
                thumb: legacyThumb,
                link: legacyLink
              }
            });
            saveFav();
            mph.hermes.send('Config', { delete: 'favorites' });
          }
        }
        if(mph.isMobile) {
          mTop.classList.add('mph-mobile');
          mCenter.classList.add('mph-mobile');
          if(qs('.pagination3 > .pjump > input')) {
            qs('.pagination3 > .pjump > input').classList.add('mph-mobile');
          };
        };
        mph.ael(doc, 'scroll', () => {
          const pgnav = qsA('.pagination3 > ul')[1];
          const pgInput = qsA('.pagination3 > .pjump')[1];
          const mph1Elem = qs('.mph1');
          const mph2Elem = qs('.mph2');
          // const smol = qs('.mainPlayerDiv');
          // const sma = qs('#vb');
          // const smb = qs('#vr');
          if (mph.page.video) {
            mph.html.scrollTop > 200
              ? mCenter.classList.add('mph-top')
              : mCenter.classList.remove('mph-top');
          }
          if (mph.html.scrollTop > mph.page.scrollnumber) {
            mCenter.classList.remove('mph-top');
            mTop.classList.add('mph-top');
            if (!mph.isEmpty(pgparam.sticky) && qs(pgparam.sticky)) {
              qs(pgparam.sticky).classList.add('sticky');
            }
            !mph.isMobile && pgnav ? pgnav.classList.add('mph-top') : false;
            !mph.isMobile && pgInput ? pgInput.classList.add('mph-top') : false;
            mph1Elem ? mph1Elem.setAttribute('style', 'display: block;') : false;
            mph2Elem ? mph2Elem.setAttribute('style', 'display: block;') : false;
            // smol.classList.remove('bigp');
            // smol.classList.add('smolp');
          } else {
            mTop.classList.remove('mph-top');
            if (!mph.isEmpty(pgparam.sticky) && qs(pgparam.sticky)) {
              qs(pgparam.sticky).classList.remove('sticky');
            }
            pgnav ? pgnav.classList.remove('mph-top') : false;
            pgInput ? pgInput.classList.remove('mph-top') : false;
            mph1Elem ? mph1Elem.setAttribute('style', 'display: none;') : false;
            mph2Elem ? mph2Elem.setAttribute('style', 'display: none;') : false;
            // smol.classList.add('bigp');
            // smol.classList.remove('smolp');
          }
        });

        phLogo();
        if (config.autoscroll) {
          centerPage();
        }
        if (mph.page.video) {
          try {
            centerContainer.append(mCenter);
            if (!mph.isEmpty(pgparam.comments) && qs(`${pgparam.comments}`)) {
              config.comments
                ? qs(`${pgparam.comments}`).classList.remove('rm')
                : qs(`${pgparam.comments}`).classList.add('rm');
            }
            let corePlayer = {},
              pTitle = `MagicPH_${pgparam.origin}`,
              pThumb,
              favAddSVG,
              addFavIcon;
            if (pgparam.origin.match(/xhamster/g)) {
              corePlayer = await fromDom('xplayer');
              pThumb = corePlayer.poster.options.url;
            } else {
              corePlayer = await fromDom('MGP');
              if (mph.isEmpty(Object.keys(corePlayer.players))) {
                while (mph.isEmpty(Object.keys(corePlayer.players))) {
                  await new Promise((resolve) => requestAnimationFrame(resolve));
                }
              }
              for (const p of Object.keys(corePlayer.players)) {
                pTitle = corePlayer.players[p].settings().mainRoll.title;
                pThumb = corePlayer.players[p].settings().mainRoll.poster;
              }
            }
            addFavIcon = mph.make('div', 'magicph-fav icon-wrapper tooltipTrig', {
              title: '[MagicPH] Add to Favorites',
              onclick: async () => {
                try {
                  let favmsg = addFavIcon.title.includes('[MagicPH] Remove from Favorites')
                    ? '[MagicPH] Add to Favorites'
                    : '[MagicPH] Remove from Favorites';
                  if (addFavIcon.title.includes('[MagicPH] Remove from Favorites')) {
                    if (config.favoriteVideos.length > 0) {
                      for (let v of config.favoriteVideos) {
                        let reg = new RegExp(pTitle, 'gi');
                        if (v.video.title.match(reg)) {
                          let wraps = [...qsA('.favorites .wrap')],
                            fWrap = wraps.filter((w) => w.dataset.title.match(reg));
                          qs('.remove-trigger', fWrap[0]).click();
                          favAddSVG.style = 'display: none;';
                          favSVG.style = '';
                          break;
                        }
                      }
                    }
                    progressUpdate('Removed from Favorites', 3500);
                  } else {
                    mph.makeFav(
                      {
                        video: {
                          title: pTitle,
                          thumb: pThumb,
                          link: location.href
                        }
                      },
                      qs('.magic-popup > .favorites')
                    );
                    favAddSVG.style = '';
                    favSVG.style = 'display: none;';
                    config.favoriteVideos.push({
                      video: {
                        title: pTitle,
                        thumb: pThumb,
                        link: location.href
                      }
                    });
                    progressUpdate('Saved to Favorites', 3500);
                  }
                  addFavIcon.dataset.title = favmsg;
                  addFavIcon.title = favmsg;
                  saveFav();
                } catch (ex) {
                  mph.err(ex);
                }
              }
            });
            favAddSVG = mph.makeImage(
              webext.runtime.getURL('img/magicph-icon-added.svg'),
              {
                style: 'display: none;',
                container: addFavIcon,
                // onerror: () => {
                //   let imgErr = new Image();
                //   imgErr.src = webext.runtime.getURL('img/image-error.svg');
                //   mph.ael(imgErr, 'load', () => addFavIcon.append(imgErr));
                //   mph.ael(
                //     imgErr,
                //     'error',
                //     () => (addFavIcon.innerHTML = '<div>Failed to load</div>')
                //   );
                // },
                // onload: () => addFavIcon.append(favAddSVG)
              },
              'magicph-icon-added'
            );
            let favSVG = mph.makeImage(
              webext.runtime.getURL('img/magicph-icon.svg'),
              {
                container: addFavIcon,
                // onerror: () => {
                //   let imgErr = new Image();
                //   imgErr.src = webext.runtime.getURL('img/image-error.svg');
                //   mph.ael(imgErr, 'load', () => addFavIcon.append(imgErr));
                //   mph.ael(
                //     imgErr,
                //     'error',
                //     () => (addFavIcon.innerHTML = '<div>Failed to load</div>')
                //   );
                // },
                // onload: () => addFavIcon.append(favSVG)
              },
              'magicph-icon'
            );
            if (pgparam.origin.match(/xham/g)) {
              addFavIcon.style = 'margin: auto 0px auto 0px;';
            }
            addFavIcon.dataset.title = '[MagicPH] Add to Favorites';
            if (config.favoriteVideos.length > 0) {
              for (let v of config.favoriteVideos) {
                let reg = new RegExp(pTitle, 'gi');
                if (v.video.title.match(reg)) {
                  addFavIcon.title = '[MagicPH] Remove from Favorites';
                  addFavIcon.dataset.title = '[MagicPH] Remove from Favorites';
                  favAddSVG.style = '';
                  favSVG.style = 'display: none;';
                  break;
                }
              }
            }
            if (!mph.isEmpty(pgparam.favLocation)) {
              qs(pgparam.favLocation).prepend(addFavIcon);
            }
          } catch (ex) {
            mph.err(ex);
          }
        }
        buildList();
        loadHeader();
        pageCleanup();
      } catch (ex) {
        mph.err(ex);
      }
    };
  //#region Messenger
  const portMessage = (root = {}) => {
    mph.bootstrap = undefined;
    config = root.cfg || config;
    config.blurimg && !mph.page.favorites
      ? mph.html.classList.add('magicBlur')
      : mph.html.classList.remove('magicBlur');
    const readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      return loadSetup();
    }
    mph.ael(document, 'DOMContentLoaded', loadSetup, { once: true });
    // if (m.dlProgress) {
    //   doc.title = `${m.dlProgress}% - ${m.dlTitle}`;
    //   progressUpdate(`(Web Ext) Downloading... ${m.dlProgress}%`);
    // }
    // if (m.dlDone) {
    //   doc.title = m.dlTitle;
    //   m.dlDone.match(/complete/gi) ? mph.log(m) : mph.err(m);
    //   progressUpdate(`(Web Ext) ${m.dlDone}`, 3500);
    // }
  };
  mph.bootstrap = () => {
    if(mph.isNull(pgparam)) {
      return;
    };
    hermes
      .send('retrieveConfig', {
        what: 'setup',
        url: mph.effectiveSelf.location.href
      })
      .then((response) => {
        mph.log('Reponse A', response);
        portMessage(response);
      });
  };
  mph.bootstrap();
  //#endregion
}
