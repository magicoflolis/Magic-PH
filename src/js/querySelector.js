const qs = (element, selector = document) => {
  return selector.querySelector(element);
};

export default qs;