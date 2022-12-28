import React from "react";
import toMatchRenderedSnapshot from './matchers/rendered-snapshot';

global.React = React;
expect.extend({
  toMatchRenderedSnapshot,
});

// @ts-ignore
window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};
