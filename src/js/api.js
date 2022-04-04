const t = performance.now();

const mph = {
  ael(elm = document, event, callback){
    return elm.addEventListener(event, callback);
  },
  /** Waits until args return true */
  async check(args) {
    while (args) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return args;
  },
  /** Can create various elements */
  create(name,element,type) {
    let el = document.createElement(element);
    type ? (el.type = type) : false;
    (name || name !== "") ? (el.className = name) : false;
    return el;
  },
  err(...message) {
    return console.group(`[MagicPH] Time: ${t}ms ERROR`),
    console.error(...message),
    console.trace(...message),
    console.groupEnd();
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  async getURL(url) {
    let res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }),
    r = await res.json();
    return Promise.resolve(r);
  },
  log(...message){
    return console.groupCollapsed(`[MagicPH] Time: ${t}ms`),
    console.trace(...message),
    console.groupEnd();
  },
/**
 * @param {Node} element
 * @param {MutationCallback} callback
 * @param {MutationObserverInit} options
 */
  observe(element, callback, options = {subtree:true,childList:true}) {
    let observer = new MutationObserver(callback);
    callback([], observer);
    observer.observe(element, options);
    return observer;
  },
  /** Waits until querySelectedElement exists */
  async query(selector) {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
  },
  queryAll(selectors) {
    return document.querySelectorAll(selectors);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
  scrollnumber: /view_video.php/.test(document.location.href) ? 400 : 101,
};

export default mph;