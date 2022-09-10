'use strict';
let config,
brws = (typeof browser=="undefined"?chrome:browser),
msg = brws.runtime.connect({name:"messenger"});

function main() {
  let ff = self.document.querySelector("form.magicph_cfg") ?? console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', "Can't find form");
  for (let prop in config) {
    prop in ff.elements
      ? ff.elements[prop].type == "checkbox"
        ? (ff.elements[prop].checked = config[prop])
        : (ff.elements[prop].value = config[prop])
      : false;
  }
  ff.addEventListener("change", (e) => {
    let $el = /** @type {HTMLInputElement} */ (e.target);
    $el.type == "checkbox" ? (config[$el.name] = $el.checked) : (config[$el.name] = $el.value);
    let s = brws.runtime.sendMessage({
      name: $el.name,
      value: config[$el.name]
    });
    s.then(console.log,console.error);
  });
}

msg.onMessage.addListener((m) => {
  config = m.cfg;
  main();
});