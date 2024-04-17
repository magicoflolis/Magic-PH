'use strict';
import { dom, qs, qsA, query } from './querySelector.js';

if (typeof mph === 'object' && !mph.contentStart) {
  mph.contentStart = true;
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
      err(ex);
    }
    mph.effectiveSelf = context;
  }
  let cfg = {};

  const exDom = [];
  const { err, hermes, info, log, page, make, ael, loadDOM, isMobile, isEmpty, isBlank, isNull } =
    mph;
  const { loc } = page;
  const pgparam = page.getPage();
  const progressElem = make('mph-elem', 'mph_progress');
  const progressFrame = make('mph-elem', 'mph_progressContainer');
  const sidenav = make('div', 'sidenav');
  const progressUpdate = async (text, time) => {
    const notice = progressFrame ?? qs('.mph_progressContainer');
    if (!notice) {
      return;
    }
    const noticeElem = progressElem ?? qs('.mph_progress');
    if (!noticeElem) {
      return;
    }
    const timeout = new mph.Timeout();

    if (!isNull(text) && !isNull(time)) {
      noticeElem.innerHTML = text;
      notice.setAttribute('style', 'display: block;');
      await timeout.set(time);
      notice.setAttribute('style', '');
      return timeout.clear(...timeout.ids);
    }

    if (typeof text === 'number' && !Number.isNaN(text)) {
      await timeout.set(text);
      notice.setAttribute('style', '');
    } else if (!isNull(text)) {
      noticeElem.innerHTML = text;
      notice.setAttribute('style', 'display: block;');
    }
    if (!isNull(time)) {
      if (isBlank(notice.style.display)) {
        notice.setAttribute('style', 'display: block;');
      }
      await timeout.set(time);
      notice.setAttribute('style', '');
    }
    return timeout.clear(...timeout.ids);
  };
  const fromDom = async (obj) => {
    if (!isEmpty(exDom)) {
      const doms = exDom.filter((d) => Object.is(d.dom, obj));
      if (doms) {
        return doms[0].root;
      }
    }
    const unwin = isNull(window.wrappedJSObject) ? window : window.wrappedJSObject;
    const handler = {
      get(obj, prop) {
        return prop in obj ? obj[prop] : unwin[prop];
      }
    };
    if (typeof unwin[obj] === 'undefined') {
      while (typeof unwin[obj] === 'undefined') {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
    const root = new Proxy(unwin[obj], handler);
    exDom.push({
      dom: obj,
      root: root
    });
    return root;
  };
  const centerPage = (x = 0, y = 101) => {
    return window.scrollTo(x, y);
  };
  const loadHTML = async (src) => {
    const response = await mph.fetchURL(webext.runtime.getURL(src), 'GET', 'text');
    return response;
  };
  const loadPage = (url, type) => {
    const pageInput = qs('.pagination3 > .pjump > input');
    const page = qsA('.pagination3 > ul')[0];
    ael(pageInput, 'change', (e) => {
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
      ael(i, 'click', async (e) => {
        mph.halt(e);
        await load(`${e.target.href}`, '.sectionWrapper', 'home');
      });
    }
  };
  const load = async (url, selElement, name) => {
    try {
      if (isEmpty(selElement)) {
        return;
      }
      const purl = url.includes('https://') ? url : `https://${url}`;
      await mph.fetchURL(purl, 'GET', 'document', {
        callback: (htmlDocument) => {
          const selected = htmlDocument.documentElement;
          const section = qs(selElement, selected);
          if (!qs(`.magic-popup > .${name} > ${selElement}`) && section.outerHTML) {
            qs(`.magic-popup > .${name}`).innerHTML = section.outerHTML;
          }
          if (name !== 'categories') {
            const scroller = qs(`.${name} > ${selElement}`);
            const scrollfn = () => {
              if (scroller.scrollTop > mph.page.scrollnumber) {
                dom.cl.add(qsA('.pagination3')[0].children[0], 'mph-top');
                dom.cl.add(qsA('.pagination3')[0].children[1], 'mph-top');
              } else {
                dom.cl.remove(qsA('.pagination3')[0].children[0], 'mph-top');
                dom.cl.remove(qsA('.pagination3')[0].children[1], 'mph-top');
              }
            };
            if (scroller) {
              scroller.removeEventListener('scroll', scrollfn);
              ael(scroller, 'scroll', scrollfn);
              loadPage(url, name);
            }
          }
        }
      });
    } catch (ex) {
      err(ex);
    }
  };
  const phPage = () => {
    if (loc.pathname == '/') {
      info('Homepage page');
      for (const u of qsA('ul')) {
        if (u.dataset.hpblockname === 'Recommended for You') {
          qs('.frontListingWrapper').prepend(u.parentElement);
        }
      }
    }
    query('.usernameWrap > a').then(() => {
      for (const u of qsA('.usernameWrap > a')) {
        dom.attr(u, 'href', u.href + '/videos');
      }
    });
  };
  const loadSetup = async () => {
    try {
      if (window.location === null) {
        return;
      }
      if (self.mph instanceof Object === false) {
        return;
      }
      info(`Site: ${location.origin} isMobile: ${isMobile}`);
      const domElem = document.documentElement;
      const saveFav = () => {
        if (isEmpty(cfg.favoriteVideos)) {
          return;
        }
        if (qs('.favorites > .wrap')) {
          for (const videos of cfg.favoriteVideos) {
            for (const m of qsA('.marked')) {
              const hasHref = [...m.children].filter((cn) => !isEmpty(cn.href));
              for (const cn of hasHref) {
                if (Object.is(videos.video.link, cn.href)) {
                  cfg.favoriteVideos.splice(cfg.favoriteVideos.indexOf(videos), 1);
                  m.remove();
                }
              }
            }
          }
          hermes.send('saveConfig', {
            what: 'Save',
            cfg: {
              name: 'favoriteVideos',
              value: cfg.favoriteVideos
            },
            url: mph.effectiveSelf.location.href
          });
          log('[Config] Updated Favorites List:', cfg.favoriteVideos);
        }
      };
      const exitFN = () => {
        if (qs('header')) {
          qs('header').style = '';
        }
        if (qs('.site-wrapper')) {
          qs('.site-wrapper').style = '';
        }
        if (!isEmpty(pgparam.body)) {
          if (qs(pgparam.body)) {
            dom.cl.remove(pgparam.body, 'mph-blur');
          }
        }
        dom.attr('.sidenav', 'style', 'left: -200vw;');
        dom.cl.remove('.magic-popup', 'open');
        dom.attr('.navbackground', 'style', 'width: 0%;');
        qs('.pjump > input').value = '';
        dom.attr('.magic-popup > [id="popupContainer"]', 'style', 'display: none;');
        dom.attr('.sidenav > a[style="display: block;"]', 'style', 'display: none;');
        dom.cl.remove('.top', 'mph-top');
        dom.cl.remove(domElem, 'magicFreeze');
        dom.cl.remove(qsA('.pagination3')[0].children[0], 'mph-top');
        dom.cl.remove(qsA('.pagination3')[0].children[1], 'mph-top');
        saveFav();
      };
      const nav = make('div', 'navbackground', { onclick: exitFN });
      const exitNav = make('a', 'magic999', {
        innerHTML: 'Exit ⟵',
        onclick: exitFN
      });

      const openmenu = (elem, sty = 'display: block;', extras) => {
        dom.attr('.magic-popup > [id="popupContainer"]', 'style', 'display: none;');
        dom.cl.add(magicpopup, 'open');
        nav.style.width = '100%';
        dom.attr(qs(elem), 'style', sty);
        dom.attr('.sidenav > .magic6', 'style', 'display: none;');
        dom.attr('.sidenav > .magic7', 'style', 'display: none;');
        dom.attr('.sidenav > .magic8', 'style', 'display: none;');
        dom.attr('.sidenav > .magic9', 'style', 'display: none;');
        if (extras) {
          dom.attr(extras, 'style', 'display: block;');
        }
        return true;
      };
      const makeSideNav = (arr = []) => {
        for (const e of arr) {
          const sn = make('a', e.class, {
            innerHTML: e.txt
          });
          if (e.style) {
            sn.style = e.style;
          }
          if (e.onclick) {
            ael(sn, 'click', e.onclick);
          }
          sidenav.append(sn);
        }
      };
      const magicpopup = make('div', 'magic-popup', {
        innerHTML: await loadHTML('magicpopup.html')
      });
      const logo = make('a', 'magiclogo', {
        type: 'button',
        onclick: (e) => {
          mph.halt(e);
          dom.attr(qs('header'), 'style', 'z-index: -1 !important;');
          dom.attr(qs('.site-wrapper'), 'style', 'z-index: -1 !important;');
          if (!isEmpty(pgparam.body)) {
            dom.cl.add(qs(pgparam.body), 'mph-blur');
          }
          nav.style.width = '100%';
          sidenav.style = 'left: 0;';
          dom.cl.remove(magicpopup, 'open');
          dom.cl.add(domElem, 'magicFreeze');
        }
      });
      const logoimg = make('img', 'js_logo_img');
      const centerContainer = make('div', 'mph-center hidden'); // DISABLED
      const mTop = make('button', 'magicTop', {
        innerHTML: 'Top',
        onclick: (e) => {
          mph.halt(e);
          centerPage(0, mph.page.scrollnumber);
        }
      });
      const mCenter = make('button', 'magicCenter', {
        innerHTML: 'Recenter',
        onclick: (e) => {
          mph.halt(e);
          centerPage(0, mph.page.scrollnumber);
        }
      });
      //#region Build Favorite List
      const buildList = () => {
        if (isEmpty(pgparam.container)) {
          return;
        }
        const pgContainer = qs(pgparam.container);
        if (mph.page.favorites) {
          document.title = '[MagicPH] Favorites';
          dom.cl.add(document.body, 'mph');
          dom.cl.add(pgContainer, 'favorites');
          pgContainer.style = 'overflow-x: scroll !important;';
          pgContainer.innerHTML = '';
          ael(window, 'beforeunload', saveFav);
        }
        if (cfg.favoriteVideos.length > 0) {
          for (const videos of cfg.favoriteVideos) {
            mph.makeFav(videos, qs('.magic-popup > .favorites'));
          }
          if (mph.page.favorites) {
            for (const videos of cfg.favoriteVideos) {
              mph.makeFav(videos, pgContainer);
            }
          }
          ael(domElem, 'click', async (evt) => {
            /** @type { Element } */
            const target = evt.target;
            if (!target.dataset) {
              return;
            }
            if (!target.dataset.command) {
              return;
            }
            const dataset = target.dataset;
            const cmd = dataset.command;
            try {
              if (cmd === 'fav-remove') {
                const rmSVG = await mph.toImage(webext.runtime.getURL('img/magicph-remove.svg'));
                if (!mph.isStr(rmSVG)) {
                  target.append(rmSVG);
                }
                const tar = target.classList.length > 0 ? target : target.parentElement;
                if (tar.textContent.includes('Remove')) {
                  tar.previousElementSibling.classList.add('rm');
                  tar.parentElement.parentElement.classList.add('marked');
                  tar.parentElement.nextElementSibling.classList.add('rm');
                  tar.parentElement.nextElementSibling.nextElementSibling.classList.add('rm');
                  tar.innerText = 'Undo';
                } else {
                  tar.previousElementSibling.classList.remove('rm');
                  tar.parentElement.parentElement.classList.remove('marked');
                  tar.parentElement.nextElementSibling.classList.remove('rm');
                  tar.parentElement.nextElementSibling.nextElementSibling.classList.remove('rm');
                  tar.innerText = 'Remove';
                  target.append(rmSVG);
                }
              } else if (cmd === 'fav-download') {
                if (isEmpty(mph.hermes)) {
                  return mph.err('Error mph.hermes not found!');
                }
                const tar = target.classList.length > 0 ? target : target.parentElement;
                const btnURL = tar.parentElement.nextElementSibling.href;
                // let params = {};
                // if(pgparam.origin.match(/thumbzilla/g) || pgparam.origin.match(/tube8/g)) {
                //   params = {
                //     credentials: 'omit'
                //   };
                // } else if(pgparam.origin.match(/onlyfans/g)) {
                //   params = {
                //     credentials: 'include'
                //   };
                // };
                mph.hermes
                  .send('General', {
                    what: 'Download',
                    mediaFiles: [btnURL],
                    title: tar.parentElement.nextElementSibling.nextElementSibling.innerText
                  })
                  .then((response) => {
                    log('Response', response);
                  });
              }
            } catch (ex) {
              err(ex);
            }
          });
          log('Constructed favorites list to sidebar:', cfg.favoriteVideos);
        }
      };
      //#endregion
      const importJSON = make('input', 'mph_import', {
        type: 'file',
        accept: '.json',
        style: 'display: none;',
        onchange: (evt) => {
          try {
            [...evt.target.files].forEach((file) => {
              const reader = new FileReader();
              reader.readAsText(file);
              reader.onload = () => {
                const result = JSON.parse(reader.result);
                log(`Imported file: { ${file.name} }`, result);
                if (Array.isArray(result)) {
                  cfg.favoriteVideos = result;
                  hermes.send('saveConfig', {
                    what: 'Save',
                    cfg: {
                      name: 'favoriteVideos',
                      value: cfg.favoriteVideos
                    },
                    url: mph.effectiveSelf.location.href
                  });
                  log('Saved Favorites List:', cfg.favoriteVideos);
                } else {
                  cfg = result;
                  hermes.send('saveConfig', {
                    what: 'Save',
                    cfg: {
                      name: 'Config',
                      value: cfg
                    },
                    url: mph.effectiveSelf.location.href
                  });
                  log('Saved Config:', cfg);
                }
                progressUpdate(`Success, imported from { ${file.name} }`, 3500);
                buildList();
              };
              reader.onerror = () => {
                err(reader.error);
              };
            });
          } catch (ex) {
            err(ex);
          }
        }
      });
      //#region Load Header
      const loadHeader = async () => {
        try {
          if (isEmpty(pgparam.menu)) {
            return;
          }
          const hl = {
            recA: `<a href="${
              mph.page.gay ? '/gay/' : '/'
            }recommended" class="mph-header-btn active js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text"><span class="arrowMenu">Recommended</span><span class="activeLine"></span></span></a>`,
            recB: `<a href="${
              mph.page.gay ? '/gay/' : '/'
            }recommended" class="mph-header-btn js-topMenuLink menu_elem_cont"><span class="itemName menu_elem_text">Recommended</span></a>`,
            favA: "<a href='/magicph-favorites' class='mph-header-btn active js-topMenuLink menu_elem_cont'><span class='itemName menu_elem_text'><span class='arrowMenu'>Favorites</span><span class='activeLine'></span></span></a>",
            favB: "<a href='/magicph-favorites' class='mph-header-btn js-topMenuLink menu_elem_cont'><span class='itemName menu_elem_text'>Favorites</span></a>"
          };
          const hRecommended = make('li', 'recommended');
          const hFavorites = make('li', 'fav');

          let pgmenu = qs(pgparam.menu);
          if (!pgmenu) {
            pgmenu = await query(pgparam.menu);
          }
          hRecommended.innerHTML = mph.page.recommended ? hl.recA : hl.recB;
          hFavorites.innerHTML = mph.page.favorites ? hl.favA : hl.favB;
          if (isMobile) {
            if (mph.page.recommended) {
              dom.cl.add(hRecommended, 'active');
            }
            if (mph.page.favorites) {
              dom.cl.add(hFavorites, 'active');
            }
            dom.cl.add(hRecommended, ['mph-header-btn', 'noImage']);
            hRecommended.href = `${mph.page.gay ? '/gay/' : '/'}recommended`;
            dom.cl.add(hFavorites, ['mph-header-btn', 'noImage']);
            hFavorites.href = '/magicph-favorites';
          } else {
            dom.cl.add(hRecommended, ['menu_elem', 'menu-item', 'menu', 'js-menu']);
            dom.cl.add(hFavorites, ['menu_elem', 'menu-item', 'menu', 'js-menu']);
          }
          pgmenu.append(hRecommended, hFavorites);
        } catch (ex) {
          err(ex);
        }
      };
      //#endregion
      //#region Logo
      const phLogo = async () => {
        if (!cfg.sidebar) {
          return;
        }
        if (!cfg.topbutton) {
          dom.cl.add(centerContainer, 'rm');
        }
        document.body.prepend(sidenav, magicpopup);
        document.body.append(nav, importJSON);
        try {
          if (!isEmpty(pgparam.logoContainer) && !isEmpty(pgparam.logoImg)) {
            let pgLogo = qs(pgparam.logoContainer),
              pgLogoImg = qs(pgparam.logoImg);
            if (!pgLogo) {
              pgLogo = await query(pgparam.logoContainer);
            }
            if (!pgLogoImg) {
              pgLogoImg = await query(pgparam.logoImg);
            }
            if (pgparam.origin.match(/onlyfans/g)) {
              const c = make(
                'a',
                'l-header__menu__item m-size-lg-hover m-with-round-hover m-width-fluid-hover',
                {
                  style: 'cursor: pointer;',
                  innerHTML:
                    '<span data-v-7f5ddb54="" class="l-header__menu__item__icon"><svg data-v-4125b130="" extra-class="l-sidebar__menu__icon" class="g-icon l-sidebar__menu__icon" aria-hidden="true"><use xlink:href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings" href="/theme/onlyfans/spa/icons/sprite.svg?rev=202209051733-828f5baca3#icon-settings"></use></svg></span><span data-v-7f5ddb54="" class="l-header__menu__item__text"> MagicPH </span>',
                  onclick: () => logo.click()
                }
              );
              dom.attr(c, 'data-v-7f5ddb54', '');
              dom.attr(logo, 'style', 'display: none;');
              pgLogo.prepend(c);
              c.prepend(logo);
            } else {
              logoimg.src = pgLogoImg.src ?? pgLogoImg.style.background;
              if (pgparam.origin.match(/youporn/g) && !isMobile) {
                pgLogo.prepend(logo);
              } else if (pgparam.origin.match(/redtube/g)) {
                dom.attr(qs('a[id="redtube_logo"]'), 'style', 'visibility: hidden;');
                pgLogo.prepend(logo);
              } else if (pgparam.origin.match(/tube8/g)) {
                dom.cl.add(qs('[id="logo"]'), 'rm');
                dom.attr(
                  logoimg,
                  'style',
                  'border: none;display: flex;align-items: center;margin: auto;height: 45px;'
                );
                pgLogo.prepend(logo);
              } else if (pgparam.origin.match(/xham/g)) {
                dom.cl.add(qs('.logo-container > span'), 'rm');
                pgLogo.prepend(logo);
              } else {
                pgLogo.append(logo);
              }
              logo.append(logoimg);
              if (pgparam.origin.match(/thumbzilla/g)) {
                if (qs('[id="logo"]')) {
                  dom.cl.add(qs('[id="logo"]'), 'rm');
                  logo.id = 'logo';
                }
              }
            }
          }
        } catch (ex) {
          err(ex);
        }
        makeSideNav([
          {
            class: 'magic1',
            txt: 'Home',
            onclick: () => {
              openmenu('.magic-popup > div.home');
              load(`${mph.page.gay ? `${loc.host}/gay` : loc.host}`, pgparam.home, 'home');
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
                `${loc.host}${!qs('.gayLayout') ? '/' : '/gay/'}recommended`,
                'ul.recommendedContainerLoseOne',
                'recommend'
              );
            }
          },
          {
            class: 'magic4',
            txt: 'Favorites',
            onclick: () => {
              openmenu('.magic-popup > div.favorites', 'display: flex;', [
                qs('.sidenav > .magic6'),
                qs('.sidenav > .magic7')
              ]);
            }
          },
          {
            class: 'magic5',
            txt: 'Config',
            onclick: () => {
              openmenu('.magic-popup > div.brws_cfg', 'display: block;', [
                qs('.sidenav > .magic8'),
                qs('.sidenav > .magic9')
              ]);
            }
          },
          {
            class: 'magic6',
            txt: 'Export Favorites',
            style: 'display: none;',
            onclick: () => {
              const str = JSON.stringify(cfg.favoriteVideos, null, ' ');
              const bytes = new TextEncoder().encode(str);
              const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
              const dlBtn = make('a', 'mph_Downloader', {
                href: self.URL.createObjectURL(blob),
                download: 'mph_videos.json'
              });
              dlBtn.click();
              self.URL.revokeObjectURL(dlBtn.href);
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
              const str = JSON.stringify(cfg, null, ' ');
              const bytes = new TextEncoder().encode(str);
              const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
              const dlBtn = make('a', 'mph_Downloader', {
                href: self.URL.createObjectURL(blob),
                download: 'mph_cfg.json'
              });
              dlBtn.click();
              self.URL.revokeObjectURL(dlBtn.href);
              progressUpdate('Exported favorites as "mph_cfg.json"', 3500);
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
        const bl = qs('form.magicph_bl');
        for (const prop of cfg.blacklist) {
          const elem = bl.elements[prop];
          if (!elem) continue;
          if (elem.type == 'checkbox') {
            elem.checked = true;
          }
        }
        ael(bl, 'change', (e) => {
          try {
            if (e.target.checked) {
              cfg.blacklist.push(e.target.name);
            } else {
              for (const b of cfg.blacklist) {
                cfg.blacklist.splice(cfg.blacklist.indexOf(b), 1);
              }
            }
            hermes.send('saveConfig', {
              what: 'Save',
              cfg: {
                name: 'blacklist',
                value: cfg.blacklist
              },
              url: mph.effectiveSelf.location.href
            });
          } catch (ex) {
            err(ex);
          }
        });
        const ff = qs('form.magicph_cfg');
        ff.innerHTML = await loadHTML('magicph_cfg.html');
        for (const prop in cfg) {
          prop in ff.elements
            ? ff.elements[prop].type == 'checkbox'
              ? (ff.elements[prop].checked = cfg[prop])
              : (ff.elements[prop].value = cfg[prop])
            : false;
        }
        ael(ff, 'change', (e) => {
          try {
            const $el = /** @type {HTMLInputElement} */ (e.target);
            $el.type == 'checkbox' ? (cfg[$el.name] = $el.checked) : (cfg[$el.name] = $el.value);
            hermes.send('saveConfig', {
              what: 'Save',
              cfg: {
                name: $el.name,
                value: cfg[$el.name]
              },
              url: mph.effectiveSelf.location.href
            });
            cfg.blurimg && !mph.page.favorites
              ? dom.cl.add(domElem, 'magicBlur')
              : dom.cl.remove(domElem, 'magicBlur');
          } catch (ex) {
            err(ex);
          }
        });
        for (const sb of qsA('.sidenav > a[id="sidebar"]')) {
          ael(sb, 'click', () => {
            dom.attr('.magic-popup > [id="popupContainer"]', 'style', 'display: none;');
            dom.cl.remove(qsA('.pagination3')[0].children[0], 'mph-top');
            dom.cl.remove(qsA('.pagination3')[0].children[1], 'mph-top');
          });
        }
        sidenav.append(exitNav);
      };
      //#endregion
      //#region Page Cleanup
      const pageCleanup = () => {
        dom.cl.remove(domElem, 'xh-thumb-disabled');
        if (!isEmpty(pgparam.body)) {
          if (qs(pgparam.body)) {
            dom.cl.add(pgparam.body, 'mph-body-wrapper');
          }
        }
        for (const e of qsA('ul > li')) {
          if (!pgparam.origin.match(/thumbzilla/g) && isBlank(e.classList)) {
            e.remove();
          }
          if (e.classList.value.match(/sex|paid|premium|upgrade|live/gi)) {
            e.remove();
          }
        }
        const netbar = qs('#js-networkBar') ?? qs('.networkBar');
        if (netbar) {
          if (!netbar.parentElement.localName.match(/body/)) {
            netbar.parentElement.remove();
          } else {
            netbar.remove();
          }
        }
        // if(mph.page.video) {
        //   if(pgparam.origin.match(/pornhub/g) && !isMobile) {
        //     while (!dom.cl.has(qs('.mgp_container').nextElementSibling, 'title-container')) {
        //       qs('.mgp_container').nextElementSibling.remove();
        //     };
        //   };
        // };
      };
      //#endregion

      centerContainer.append(mTop);
      domElem.append(centerContainer);

      if (qs('.magic-popup > .favorites') && cfg.favorites) {
        err('LEGACY FAVORITES LIST');
        if (!Array.isArray(cfg.favoriteVideos)) {
          cfg.favoriteVideos = [];
        }
        cfg.favoriteVideos.length = 0;
        qs('.magic-popup > .favorites').innerHTML = cfg.favorites;
        for (const w of qsA('.magic-popup > .favorites > .wrap')) {
          const legacyTitle = w.children[2].children[0].innerHTML;
          const legacyThumb = w.children[1].children[0].src;
          const legacyLink = w.children[1].href;
          cfg.favoriteVideos.push({
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
      if (isMobile) {
        dom.cl.add(centerContainer, 'mph-mobile');
        if (qs('.pagination3 > .pjump > input')) {
          dom.cl.add(qs('.pagination3 > .pjump > input'), 'mph-mobile');
        }
      }
      phLogo();
      if (cfg.autoscroll) {
        centerPage();
      }
      if (mph.isVideo(location.href)) {
        centerContainer.append(mCenter);
        if (!isEmpty(pgparam.comments) && qs(`${pgparam.comments}`)) {
          if (cfg.comments) {
            dom.cl.remove(qs(`${pgparam.comments}`), 'rm');
          } else {
            dom.cl.add(qs(`${pgparam.comments}`), 'rm');
          }
        }
        let corePlayer = {};
        let pTitle = `MagicPH_${pgparam.origin}`;
        let pThumb;

        const favAddSVG = await mph.toImage(webext.runtime.getURL('img/magicph-icon-added.svg'), { style: 'display: none;' }, 'magicph-icon-added');
        const favSVG = await mph.toImage(webext.runtime.getURL('img/magicph-icon.svg'), {}, 'magicph-icon');
        const addFavIcon = make('div', 'magicph-fav icon-wrapper tooltipTrig', {
          title: '[MagicPH] Add to Favorites',
          dataset: {
            title: '[MagicPH] Add to Favorites',
            command: 'fav-add'
          },
          onclick: (evt) => {
            const favmsg = /remove/.test(evt.target.title)
              ? '[MagicPH] Add to Favorites'
              : '[MagicPH] Remove from Favorites';
            if (/remove/.test(evt.target.title)) {
              if (cfg.favoriteVideos.length > 0) {
                for (const v of cfg.favoriteVideos) {
                  const reg = new RegExp(pTitle, 'gi');
                  if (v.video.title.match(reg)) {
                    const wraps = [...qsA('.favorites .wrap')].filter((w) =>
                      w.dataset.title.match(reg)
                    );
                    qs('.remove-trigger', wraps[0]).click();
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
                    link: loc.href
                  }
                },
                qs('.magic-popup > .favorites')
              );
              favAddSVG.style = '';
              favSVG.style = 'display: none;';
              cfg.favoriteVideos.push({
                video: {
                  title: pTitle,
                  thumb: pThumb,
                  link: loc.href
                }
              });
              progressUpdate('Saved to Favorites', 3500);
            }
            evt.target.dataset.title = favmsg;
            evt.target.title = favmsg;
            saveFav();
          }
        });
        addFavIcon.append(favAddSVG, favSVG);
        if (pgparam.origin.match(/pornhub/g)) {
          qs(':root').style = 'scrollbar-color: #4646463d #000 !important;';
          if (!isMobile) {
            dom.cl.add('.relatedVideos', [
              'mph1',
              'video-info-row',
              'showLess',
              'allRelatedVideos'
            ]);
            dom.cl.add('.show-more-btn', 'bottom');
            qs('.video-actions-tabs').append(qs('.mph1'));
            dom.cl.add(qs('.videos-list'), ['mph2', 'video-info-row', 'showLess']);
            qs('.mph1').append(qs('.mph2'));
            dom.cl.add(qs('.videos-list'), ['mph3', 'video-info-row', 'showLess']);
            qs('.js-relatedRecommended').append(qs('.mph3'));
            qs('.mph2 > .user-playlist').id = 'relatedVideosCenter';
          }
        }
        if (pgparam.origin.match(/xhamster/g)) {
          corePlayer = await fromDom('xplayer');
          pThumb = corePlayer.poster.options.url;
        } else {
          corePlayer = await fromDom('MGP');
          if (isEmpty(Object.keys(corePlayer.players))) {
            while (isEmpty(Object.keys(corePlayer.players))) {
              await new Promise((resolve) => requestAnimationFrame(resolve));
            }
          }
          for (const p of Object.keys(corePlayer.players)) {
            pTitle = corePlayer.players[p].settings().mainRoll.title;
            pThumb = corePlayer.players[p].settings().mainRoll.poster;
          }
        }
        if (pgparam.origin.match(/xham/g)) {
          addFavIcon.style = 'margin: auto 0px auto 0px;';
        }
        if (cfg.favoriteVideos.length > 0) {
          for (const v of cfg.favoriteVideos) {
            const reg = new RegExp(pTitle, 'gi');
            if (v.video.title.match(reg)) {
              addFavIcon.title = '[MagicPH] Remove from Favorites';
              addFavIcon.dataset.title = '[MagicPH] Remove from Favorites';
              favAddSVG.style = '';
              favSVG.style = 'display: none;';
              break;
            }
          }
        }
        if (typeof pgparam.favLocation === 'string' && qs(pgparam.favLocation)) {
          qs(pgparam.favLocation).prepend(addFavIcon);
        }
      }
      buildList();
      loadHeader();
      if (pgparam.origin.match(/pornhub/g)) {
        phPage();
      }
      pageCleanup();
    } catch (ex) {
      err(ex);
    }
  };
  //#region Messenger
  const portMessage = (root = {}) => {
    if (root instanceof Object === false) {
      return;
    }
    mph.bootstrap = undefined;
    if (location.pathname === '/interstitial') {
      const url = new URL(location);
      if (url.searchParams.has('viewkey')) {
        window.location.href = `${url.origin}/view_video.php?viewkey=${url.searchParams.get('viewkey')}`;
        return;
      }
    }
    cfg = root.cfg || cfg;

    progressFrame.append(progressElem);
    document.documentElement.append(progressFrame);

    cfg.blurimg && !mph.page.favorites
      ? dom.cl.add(document.documentElement, 'magicBlur')
      : dom.cl.remove(document.documentElement, 'magicBlur');

    loadDOM(document, loadSetup);

    // if (m.dlProgress) {
    //   doc.title = `${m.dlProgress}% - ${m.dlTitle}`;
    //   progressUpdate(`(Web Ext) Downloading... ${m.dlProgress}%`);
    // }
    // if (m.dlDone) {
    //   doc.title = m.dlTitle;
    //   m.dlDone.match(/complete/gi) ? log(m) : err(m);
    //   progressUpdate(`(Web Ext) ${m.dlDone}`, 3500);
    // }
  };
  mph.bootstrap = () => {
    if (isNull(pgparam)) {
      return;
    }
    hermes
      .send('retrieveConfig', {
        what: 'setup',
        url: mph.effectiveSelf.location.href
      })
      .then((response) => {
        portMessage(response);
      });
  };
  mph.bootstrap();
  //#endregion
}

// .col-4 [a-z]{5}
