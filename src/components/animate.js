/* eslint-disable max-statements */
// eslint-disable-next-line max-params
const animateCSS = (element, animation, callback = () => null, clear = () => null) =>
  // We create a Promise and return it
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, _reject) => {
    const prefix = 'animate__';
    const animationName = `${prefix}${animation}`;
    // eslint-disable-next-line init-declarations
    let node;
    typeof element === 'object' ? node = element : node = document.querySelector(element);

    if (node) {
      clear();
      node.classList.add(`${prefix}animated`, animationName);
      // When the animation ends, we clean the classes and resolve the Promise
      const handleAnimationEnd = () => {
        node.classList.remove(`${prefix}animated`, animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
        resolve('Animation ended');
        callback();
      };

      node.addEventListener('animationend', handleAnimationEnd);
    }
  });

export default animateCSS;
