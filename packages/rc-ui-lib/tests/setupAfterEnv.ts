import toMatchRenderedSnapshot from './matchers/rendered-snapshot';

expect.extend({
  toMatchRenderedSnapshot,
});

// @ts-ignore
window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};
