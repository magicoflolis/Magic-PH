'use strict';

const qsA = (element,selector) => {
  if(!selector) {
    selector = document;
  };
  return selector.querySelectorAll(element);
},
qs = (element,selector) => {
  if(!selector) {
    selector = document;
  };
  return selector.querySelector(element);
};

export { qsA,qs };