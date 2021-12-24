import toMatchRenderedSnapshot from './matchers/rendered-snapshot';

expect.extend({
  toMatchRenderedSnapshot,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};
