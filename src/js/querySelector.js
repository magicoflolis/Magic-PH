'use strict';

const locErr = (...msg) => console.error(
  '[%cMagicPH-QUERY%c] %cERROR',
  'color: rgb(255,153,0);',
  '',
  'color: rgb(249, 24, 128);',
  ...msg
);
/**
* Object is Null
* @param {Object} obj - Object
* @returns {boolean} Returns if statement true or false
*/
const locIsNull = (obj) => {
 return (Object.is(obj,null) || Object.is(obj,undefined));
};
const locDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Prefix for document.querySelectorAll()
 * @param {Object} element - Elements for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelectorAll(element)
 */
const qsA = (element, root) => {
  try {
    root = (root || document || document.body);
    if(locIsNull(root.querySelectorAll(element))) {
      throw new Error('Unable to locate element', {
        cause: `${root}.querySelectorAll(${element})`
      });
    };
    return root.querySelectorAll(element);
  } catch (ex) {
    return locErr(ex)
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
    root = (root || document || document.body);
    if(locIsNull(root.querySelectorAll(element))) {
      throw new Error('Unable to locate element', {
        cause: `${root}.querySelector(${element})`
      });
    };
    return root.querySelector(element);
  } catch (ex) {
    return locErr(ex)
  }
},
/**
 * Prefix for document.querySelector() w/ Promise
 * @param {Object} element - Element for query selection
 * @param {Object} [root=document] - Root selector Element
 * @returns {Object} Returns root.querySelector(element)
 */
query = (element, root) => {
  root = (root || document || document.body);
  if(!locIsNull(root.querySelector(element))) {
    return Promise.resolve(root.querySelector(element));
  };
  const loop = async () => {
    while(locIsNull(root.querySelector(element))) {
      await new Promise(resolve=>requestAnimationFrame(resolve))
    };
    return root.querySelector(element);
  };
  return Promise.any([
    loop(),
    locDelay(5000).then(() => Promise.reject('Unable to locate element')),
  ]);
};

export { qs, qsA, query };
