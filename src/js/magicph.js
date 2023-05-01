'use strict';

(async () => {
  const err = (...msg) => console.error('[%cMagicPH JS%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...msg),
  info = (...msg) => console.info('[%cMagicPH JS%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...msg);
  try {
    const win = window,
    doc = win.document,
    docElement = document.documentElement,
    location = win.location,
    /**
     * Object is Null
     * @param {Object} obj - Object
     * @returns {boolean} Returns if statement true or false
     */
    isNull = (obj) => {
      return Object.is(obj, null) || Object.is(obj, undefined);
    },
    /**
     * Prefix for document.querySelectorAll()
     * @param {Object} element - Elements for query selection
     * @param {Object} [root=document] - Root selector Element
     * @returns {Object} Returns root.querySelectorAll(element)
     */
    qsA = (element, root) => {
      try {
        root = root || doc || doc.body;
        return root.querySelectorAll(element);
      } catch (ex) {
        err(ex);
      }
    },
    /**
     * Prefix for document.querySelector()
     * @param {Object} element - Element for query selection
     * @param {Object} [root=document] - Root selector Element
     * @returns {Object} Returns root.querySelector(element)
     */
    qs = (element, root) => {
      try {
        root = root || doc || doc.body;
        return root.querySelector(element);
      } catch (ex) {
        err(ex);
      }
    },
    /**
     * Prefix for document.querySelector() w/ Promise
     * @param {Object} element - Element for query selection
     * @param {Object} [root=document] - Root selector Element
     * @returns {Object} Returns root.querySelector(element)
     */
    query = async (element, root) => {
      root = root || doc || doc.body;
      if(!isNull(root.querySelector(element))) {
        return Promise.resolve(root.querySelector(element));
      };
      while (isNull(root.querySelector(element))) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return root.querySelector(element);
    };


    if (docElement.classList.contains('ios')) {
      return false;
    }
    let userInfo = (url = 'default') => {
      if (Object.is(url, 'default')) return;
      query('.userInfo > div.usernameWrap > span.usernameBadgesWrapper > a').then((user) => (user.href = user.href + '/videos'));
    };
    if (qs('#channelsProfile')) {
      info('Channel page');
    }
    if (location.pathname == '/') {
      info('Homepage page');
      for (let u of qsA('ul')) {
        if (u.dataset.hpblockname === 'Recommended for You') {
          qs('.frontListingWrapper').prepend(u.parentElement);
        }
      }
    }
    if (mph.page.video) {
      info('Video page');
      docElement.style =
        'scrollbar-color: #4646463d #000 !important;';
      await query('.mgp_container');
      userInfo('video');
      if (qs('[data-entrycode="VidPg-premVid-videoPage"]')) {
        qs(
          '[data-entrycode="VidPg-premVid-videoPage"]'
        ).parentElement.parentElement.remove();
      }
      if(mph.isMobile) {
        return;
      };
      qs('.relatedVideos').classList.add(
        'mph1',
        'video-info-row',
        'showLess',
        'allRelatedVideos'
      );
      qs('.show-more-btn').classList.add('bottom');
      qs('.video-actions-tabs').append(qs('.mph1'));
      qs('.videos-list').classList.add('mph2', 'video-info-row', 'showLess');
      qs('.mph1').append(qs('.mph2'));
      qs('.videos-list').classList.add('mph3', 'video-info-row', 'showLess');
      qs('.js-relatedRecommended').append(qs('.mph3'));
      qs('.mph2 > .user-playlist').id = 'relatedVideosCenter';
    }
    if (location.pathname.includes('categories')) {
      info('Categories');
    }
    if (qs('#profileContent')) {
      info('User Profile');
    }
    if (qs('div.amateurModel')) {
      info('Model');
      userInfo('model');
    }
    if (location.pathname.includes('pornstar')) {
      info('Pornstar');
    }
    if (location.pathname.includes('gif')) {
      info('Gifs');
      if (qs('body.logged-out')) {
        qs('#imgNavWrap').append(qs('.gifColumnRight'));
      }
    }
    if (mph.page.recommended && qs('body.logged-out')) {
      info('Recommended');
      qs('a[href="/recommended/rate"]').classList.add('rm');
    }
    userInfo();
    if (qs('body.logged-out')) {
      info('Logged out');
      win.disablePlaylistPlusButon = false;
    }
  } catch (ex) {
    err(ex);
  }
})();
