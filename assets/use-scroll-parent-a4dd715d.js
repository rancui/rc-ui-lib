import{r}from"./react-libs-840bfe49.js";import{a as s}from"./base-1da74170.js";const n=/scroll|auto/i,i=s?window:void 0;function c(e){return e.tagName!=="HTML"&&e.tagName!=="BODY"&&e.nodeType===1}function f(e,o=i){o===void 0&&(o=window);let t=e;for(;t&&t!==o&&c(t);){const{overflowY:l}=window.getComputedStyle(t);if(n.test(l)){if(t.tagName!=="BODY")return t;const a=window.getComputedStyle(t.parentNode).overflowY;if(n.test(a))return t}t=t.parentNode}return o}function E(e){const[o,t]=r.useState();return r.useEffect(()=>{e&&t(f(e.current))},[]),o}export{f as g,E as u};
