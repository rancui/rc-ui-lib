import{_ as t,i as y,c as w,s as V,d as b,g as k}from"./locales.fc745e15.js";import{u as R,r as u,b as I,a as h,j as a,S,c as x,d as C,e as N,H as B}from"./react-libs.5b212337.js";(function(){if(typeof window>"u")return;var i,l="ontouchstart"in window;document.createTouch||(document.createTouch=function(n,e,c,m,_,d,A){return new o(e,c,{pageX:m,pageY:_,screenX:d,screenY:A,clientX:m-window.pageXOffset,clientY:_-window.pageYOffset},0,0)}),document.createTouchList||(document.createTouchList=function(){for(var n=r(),e=0;e<arguments.length;e++)n[e]=arguments[e];return n.length=arguments.length,n}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(n){var e=this;do{if(e.matches(n))return e;e=e.parentElement||e.parentNode}while(e!==null&&e.nodeType===1);return null});var o=function(e,c,m,_,d){_=_||0,d=d||0,this.identifier=c,this.target=e,this.clientX=m.clientX+_,this.clientY=m.clientY+d,this.screenX=m.screenX+_,this.screenY=m.screenY+d,this.pageX=m.pageX+_,this.pageY=m.pageY+d};function r(){var n=[];return n.item=function(e){return this[e]||null},n.identifiedTouch=function(e){return this[e+1]||null},n}var s=!1;function p(n){return function(e){e.type==="mousedown"&&(s=!0),e.type==="mouseup"&&(s=!1),!(e.type==="mousemove"&&!s)&&((e.type==="mousedown"||!i||i&&!i.dispatchEvent)&&(i=e.target),i.closest("[data-no-touch-simulate]")==null&&O(n,e),e.type==="mouseup"&&(i=null))}}function O(n,e){var c=document.createEvent("Event");c.initEvent(n,!0,!0),c.altKey=e.altKey,c.ctrlKey=e.ctrlKey,c.metaKey=e.metaKey,c.shiftKey=e.shiftKey,c.touches=L(e),c.targetTouches=L(e),c.changedTouches=T(e),i.dispatchEvent(c)}function T(n){var e=r();return e.push(new o(i,1,n,0,0)),e}function L(n){return n.type==="mouseup"?r():T(n)}function f(){window.addEventListener("mousedown",p("touchstart"),!0),window.addEventListener("mousemove",p("touchmove"),!0),window.addEventListener("mouseup",p("touchend"),!0)}f.multiTouchOffset=75,l||new f})();function M(){const{pathname:i}=R();return u.exports.useEffect(()=>{window.scrollTo(0,0)},[i]),null}const $=i=>{const l=I(),o="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z",r=()=>{l.length>1?l.goBack():l.replace("/")};return i.title?h("div",{className:"demo-nav",children:[a("div",{className:"demo-nav__title",children:i.title}),a("svg",{className:"demo-nav__back",viewBox:"0 0 1000 1000",onClick:r,children:a("path",{fill:"#969799",fillRule:"evenodd",d:o})})]}):null};const z=()=>t(()=>import("./index.bcb61d70.js"),["index.bcb61d70.js","index.169ddda7.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.2bb626ed.js","ConfigProviderContext.b49bb3f3.js","index.2012bf47.js","index.9c5f8655.js","constant.bd9aa8c7.js"],import.meta.url),K=()=>t(()=>import("./index.1d5a81d2.js"),["index.1d5a81d2.js","index.891a20a0.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),F=()=>t(()=>import("./index.51f0d002.js"),["index.51f0d002.js","index.7a9607ea.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),j=()=>t(()=>import("./index.cde39ef1.js"),["index.cde39ef1.js","index.2308b719.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js"],import.meta.url),H=()=>t(()=>import("./index.b7c61ea1.js"),["index.b7c61ea1.js","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),U=()=>t(()=>import("./index.ec0639fd.js"),["index.ec0639fd.js","index.ddd7bdad.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),X=()=>t(()=>import("./index.4352f682.js"),["index.4352f682.js","index.280c8605.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Y=()=>t(()=>import("./index.30da7446.js"),["index.30da7446.js","index.f99cf529.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),G=()=>t(()=>import("./index.147040ba.js"),["index.147040ba.js","index.842476da.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),q=()=>t(()=>import("./index.266556ed.js"),["index.266556ed.js","index.b2d38641.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),J=()=>t(()=>import("./index.07b9ffc0.js"),["index.07b9ffc0.js","index.fb0dd7c5.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Q=()=>t(()=>import("./index.4ada1ecf.js"),["index.4ada1ecf.js","index.45a033ec.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),W=()=>t(()=>import("./index.0027f320.js"),["index.0027f320.js","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Z=()=>t(()=>import("./index.8f5e5d98.js"),["index.8f5e5d98.js","index.dde5a36d.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),tt=()=>t(()=>import("./index.dde91590.js"),["index.dde91590.js","index.c835a7a7.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),et=()=>t(()=>import("./index.7a852abf.js"),["index.7a852abf.js","index.7a9607ea.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),ot=()=>t(()=>import("./index.2b4e8a77.js"),["index.2b4e8a77.js","index.8e03046a.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),it=()=>t(()=>import("./index.401ca40f.js"),["index.401ca40f.js","index.83a750cb.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),rt=()=>t(()=>import("./index.8c320134.js"),["index.8c320134.js","index.372d5d54.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.e9782f87.js","ConfigProviderContext.b49bb3f3.js"],import.meta.url),at=()=>t(()=>import("./index.c4a76757.js"),["index.c4a76757.js","index.64b64be6.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),nt=()=>t(()=>import("./index.cc31cee8.js"),["index.cc31cee8.js","index.7a9607ea.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),lt=()=>t(()=>import("./index.58c7cb01.js"),["index.58c7cb01.js","index.69349e43.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),st=()=>t(()=>import("./index.48c0e311.js"),["index.48c0e311.js","index.1b83cb7b.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),ct=()=>t(()=>import("./index.a1ba276c.js"),["index.a1ba276c.js","index.7a9607ea.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),pt=()=>t(()=>import("./index.29d2aae4.js"),["index.29d2aae4.js","index.857e0b5b.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),mt=()=>t(()=>import("./index.8af4f599.js"),["index.8af4f599.js","index.d24dfc72.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),_t=()=>t(()=>import("./index.9fc7a170.js"),["index.9fc7a170.js","index.2c561a81.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),ut=()=>t(()=>import("./index.62a1fb46.js"),["index.62a1fb46.js","index.c1febbf6.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","Progress.17e70151.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","index.2012bf47.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.9c5f8655.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),dt=()=>t(()=>import("./index.dc5cffc8.js"),["index.dc5cffc8.js","index.c1febbf6.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),ht=()=>t(()=>import("./index.32c98d22.js"),["index.32c98d22.js","index.018f2dca.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Et=()=>t(()=>import("./index.d2116594.js"),["index.d2116594.js","index.8b921f8b.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),vt=()=>t(()=>import("./index.c0a3db34.js"),["index.c0a3db34.js","index.60e717a3.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),gt=()=>t(()=>import("./index.3b473b2c.js"),["index.3b473b2c.js","index.baa9a546.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","Progress.17e70151.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","index.2012bf47.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.9c5f8655.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Tt=()=>t(()=>import("./index.93bf8966.js"),["index.93bf8966.js","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Lt=()=>t(()=>import("./index.c7a37d80.js"),["index.c7a37d80.js","index.bae7c465.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),ft=()=>t(()=>import("./index.54e52750.js"),["index.54e52750.js","index.7b8d007c.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Pt=()=>t(()=>import("./index.8b46cdf2.js"),["index.8b46cdf2.js","index.9a646181.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","Progress.17e70151.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","index.2012bf47.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.9c5f8655.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Dt=()=>t(()=>import("./index.b4dff641.js"),["index.b4dff641.js","index.c644d6d6.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Rt=()=>t(()=>import("./index.d95d6bbf.js"),["index.d95d6bbf.js","index.d0b36393.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),It=()=>t(()=>import("./index.b3b491bc.js"),["index.b3b491bc.js","index.c4eb9396.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","Rate.15819d10.js","ConfigProviderContext.b49bb3f3.js","index.2012bf47.js","use-touch.ecb2ed24.js"],import.meta.url),Ot=()=>t(()=>import("./index.22636543.js"),["index.22636543.js","index.5163fd67.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),At=()=>t(()=>import("./index.50ee5908.js"),["index.50ee5908.js","index.0cbf7693.css","react-libs.5b212337.js","Progress.17e70151.js","locales.fc745e15.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","index.2012bf47.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.9c5f8655.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),yt=()=>t(()=>import("./index.bd80922e.js"),["index.bd80922e.js","index.dee3fb5c.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),wt=()=>t(()=>import("./index.721bed6c.js"),["index.721bed6c.js","index.d0fb5576.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Vt=()=>t(()=>import("./index.e397c63c.js"),["index.e397c63c.js","index.cdf436d6.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),bt=()=>t(()=>import("./index.e31dd152.js"),["index.e31dd152.js","index.4ce4f0d1.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),kt=()=>t(()=>import("./index.7dab9fce.js"),["index.7dab9fce.js","index.591a1b95.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),St=()=>t(()=>import("./index.4ff0b33e.js"),["index.4ff0b33e.js","index.1f16137b.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","Progress.17e70151.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","index.2012bf47.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.9c5f8655.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),xt=()=>t(()=>import("./index.c353009b.js"),["index.c353009b.js","index.cd4e846c.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Ct=()=>t(()=>import("./index.d02287cf.js"),["index.d02287cf.js","index.e454bff5.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Nt=()=>t(()=>import("./index.72ce32a2.js"),["index.72ce32a2.js","index.3aa925f5.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Bt=()=>t(()=>import("./index.97b0149a.js"),["index.97b0149a.js","index.a49fc365.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),Mt=()=>t(()=>import("./index.4b31433d.js"),["index.4b31433d.js","index.0f45a1bd.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),$t=()=>t(()=>import("./index.adcf5ee9.js"),["index.adcf5ee9.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.0f55a6cf.js","constant.bd9aa8c7.js","ConfigProviderContext.b49bb3f3.js","index.2012bf47.js","use-touch.ecb2ed24.js"],import.meta.url),zt=()=>t(()=>import("./index.2d8fc87e.js"),["index.2d8fc87e.js","index.d122d9b5.css","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","react-libs.5b212337.js","locales.fc745e15.js","index.b148844d.js","ConfigProviderContext.b49bb3f3.js"],import.meta.url),Kt=()=>t(()=>import("./index.1d0323cd.js"),["index.1d0323cd.js","index.a01b55d6.css","react-libs.5b212337.js","rc-cli_site-mobile-demo.e1e025a7.js","rc-cli_site-mobile-demo.962fc912.css","locales.fc745e15.js","index.9c5f8655.js","index.2012bf47.js","ConfigProviderContext.b49bb3f3.js","constant.bd9aa8c7.js","Progress.17e70151.js","Rate.15819d10.js","use-touch.ecb2ed24.js","index.0f55a6cf.js","index.2bb626ed.js","index.e9782f87.js","index.b148844d.js"],import.meta.url),E={ActionBar:z,ActionSheet:K,Badge:F,Button:j,Calendar:H,Cascader:U,Cell:X,Checkbox:Y,Circle:G,Collapse:q,ConfigProvider:J,CountDown:Q,DatetimePicker:W,Dialog:Z,Divider:tt,DropdownMenu:et,Empty:ot,Field:it,Flex:rt,Form:at,Grid:nt,Icon:lt,Image:st,ImagePreview:ct,Lazyload:pt,List:mt,Loading:_t,NavBar:ut,NoticeBar:dt,Notify:ht,NumberKeyboard:Et,Overlay:vt,PasswordInput:gt,Picker:Tt,Popover:Lt,Popup:ft,Progress:Pt,PullRefresh:Dt,Radio:Rt,Rate:It,ShareSheet:Ot,Sidebar:At,Skeleton:yt,Slider:wt,Steps:Vt,Sticky:bt,Styles:kt,SwipeCell:St,Swiper:xt,Switch:Ct,Tabbar:Nt,Tabs:Bt,Tag:Mt,Toast:$t,Typography:zt,Uploader:Kt},v={name:"rc-ui-lib",build:{packageManager:"pnpm",css:{preprocessor:"less"},site:{publicPath:"./"}},site:{defaultLang:"zh-CN",locales:{"zh-CN":{title:"RC-UI-LIB",description:"\u8F7B\u91CF\u3001\u53EF\u9760\u7684\u79FB\u52A8\u7AEF\u7EC4\u4EF6\u5E93",logo:"https://img01.yzcdn.cn/vant/logo.png",langLabel:"\u4E2D\u6587",links:[{logo:"https://b.yzcdn.cn/vant/logo/github.svg",url:"https://github.com/rancui/rc-ui-lib"}],nav:[{title:"\u5E03\u5C40\u7EC4\u4EF6",items:[{path:"flex",title:"Flex \u5E03\u5C40"}]},{title:"\u57FA\u7840\u7EC4\u4EF6",items:[{path:"button",title:"Button \u6309\u94AE"},{path:"cell",title:"Cell \u5355\u5143\u683C"},{path:"config-provider",title:"ConfigProvider \u5168\u5C40\u914D\u7F6E"},{path:"typography",title:"Typography \u6587\u672C"},{path:"styles",title:"Style \u5185\u7F6E\u6837\u5F0F"},{path:"icon",title:"Icon \u56FE\u6807"},{path:"image",title:"Image \u56FE\u7247"},{path:"popup",title:"Popup \u5F39\u51FA\u5C42"},{path:"toast",title:"Toast \u8F7B\u63D0\u793A"}]},{title:"\u8868\u5355\u7EC4\u4EF6",items:[{path:"calendar",title:"Calendar \u65E5\u5386"},{path:"cascader",title:"Cascader \u7EA7\u8054\u9009\u62E9"},{path:"checkbox",title:"Checkbox \u590D\u9009\u6846"},{path:"datetime-picker",title:"DatetimePicker \u65F6\u95F4\u9009\u62E9"},{path:"field",title:"Field \u8F93\u5165\u6846"},{path:"form",title:"Form \u8868\u5355"},{path:"number-keyboard",title:"NumberKeyboard \u6570\u5B57\u952E\u76D8"},{path:"password-input",title:"PasswordInput \u5BC6\u7801\u8F93\u5165\u6846"},{path:"picker",title:"Picker \u9009\u62E9\u5668"},{path:"radio",title:"Radio \u5355\u9009\u6846"},{path:"rate",title:"Rate \u8BC4\u5206"},{path:"slider",title:"Slider \u6ED1\u5757"},{path:"switch",title:"Switch \u5F00\u5173"},{path:"uploader",title:"Uploader \u6587\u4EF6\u4E0A\u4F20"}]},{title:"\u53CD\u9988\u7EC4\u4EF6",items:[{path:"action-sheet",title:"ActionSheet \u52A8\u4F5C\u9762\u677F"},{path:"dialog",title:"Dialog \u5F39\u51FA\u6846"},{path:"dropdown-menu",title:"DropdownMenu \u4E0B\u62C9\u83DC\u5355"},{path:"loading",title:"Loading \u52A0\u8F7D"},{path:"notify",title:"Notify \u6D88\u606F\u901A\u77E5"},{path:"overlay",title:"Overlay \u906E\u7F69\u5C42"},{path:"pull-refresh",title:"PullRefresh \u4E0B\u62C9\u5237\u65B0"},{path:"share-sheet",title:"ShareSheet \u5206\u4EAB\u9762\u677F"},{path:"swipe-cell",title:"SwipeCell \u6ED1\u52A8\u5355\u5143\u683C"}]},{title:"\u5C55\u793A\u7EC4\u4EF6",items:[{path:"badge",title:"Badge \u5FBD\u6807"},{path:"circle",title:"Circle \u73AF\u5F62\u8FDB\u5EA6\u6761"},{path:"collapse",title:"Collapse \u6298\u53E0\u9762\u677F"},{path:"count-down",title:"CountDown \u5012\u8BA1\u65F6"},{path:"divider",title:"Divider \u5206\u5272\u7EBF"},{path:"empty",title:"Empty \u7A7A\u72B6\u6001"},{path:"image-preview",title:"ImagePreview \u56FE\u7247\u9884\u89C8"},{path:"lazyload",title:"Lazyload \u61D2\u52A0\u8F7D"},{path:"list",title:"List \u5217\u8868"},{path:"skeleton",title:"Skeleton \u9AA8\u67B6\u5C4F"},{path:"notice-bar",title:"NoticeBar \u901A\u77E5\u680F"},{path:"popover",title:"Popover \u6C14\u6CE1\u5F39\u51FA\u6846"},{path:"progress",title:"Progress \u8FDB\u5EA6\u6761"},{path:"sticky",title:"Sticky \u7C98\u6027\u5E03\u5C40"},{path:"swiper",title:"Swiper \u8F6E\u64AD"},{path:"tag",title:"Tag \u6807\u7B7E"}]},{title:"\u5BFC\u822A\u7EC4\u4EF6",items:[{path:"action-bar",title:"ActionBar \u52A8\u4F5C\u680F"},{path:"grid",title:"Grid \u5BAB\u683C"},{path:"nav-bar",title:"NavBar \u5BFC\u822A\u680F"},{path:"sidebar",title:"Sidebar \u4FA7\u8FB9\u5BFC\u822A"},{path:"tabs",title:"Tabs \u6807\u7B7E\u9875"},{path:"tabbar",title:"Tabbar \u6807\u7B7E\u680F"}]}]},"en-US":{title:"RC-UI-LIB",description:"Mobile UI Components built on React",logo:"https://img01.yzcdn.cn/vant/logo.png",langLabel:"En",links:[{logo:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",url:"https://github.com/rancui/rc-ui-lib"}],searchConfig:{apiKey:"90067aecdaa2c85220e2783cd305caac",indexName:"rc-ui-lib",placeholder:"Search..."},nav:[{title:"Basic Components",items:[{path:"button",title:"Button"}]}]}}}},Ft=i=>h("svg",{viewBox:"0 0 1024 1024",...i,children:[a("path",{fill:"#B6C3D2",d:"M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"}),a("path",{fill:"#B6C3D2",d:"M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"})]});const jt=i=>{const{lang:l,group:o}=i,r=I(),s=u.exports.useMemo(()=>l?`/${l}`:"",[l]);return h("div",{className:"demo-home-nav",children:[a("div",{className:"demo-home-nav__title",children:o.title}),a("div",{className:"demo-home-nav__group",children:o.items.map(p=>h("div",{className:"demo-home-nav__block",onClick:()=>{r.push(`${s}/${p.path}`),!y&&window!==window.top&&window.top.postMessage({pathname:`${s}/${p.path}`},window.top)},children:[p.title,a(Ft,{className:"demo-home-nav__icon"})]},p.path))})]})};const P=i=>{const{lang:l}=i.meta,o=u.exports.useMemo(()=>{const{locales:s}=v.site;return s?s[l]:v.site},[v]),r=u.exports.useMemo(()=>o.title.length>=8,[o]);return h("div",{className:"demo-home",children:[h("h1",{className:w("demo-home__title",{"demo-home__title--small":r}),children:[a("img",{src:o.logo,alt:""}),a("span",{children:o.title})]}),o.description&&a("h2",{className:"demo-home__desc",children:o.description}),o.nav.map(s=>a(jt,{lang:l,group:s},s.title))]})},{locales:g,defaultLang:Ht}=v.site;V(Ht);function Ut(i){const l=i.split("/")[1];return Object.keys(g).indexOf(l)!==-1?l:k()}function Xt(){console.log(E);const i=[],l=Object.keys(E),o=g?Object.keys(g):[];return o.length?o.forEach(r=>{i.push({path:`/${r}`,exact:!0,component:P,meta:{lang:r}})}):i.push({path:"/",exact:!0,component:P,meta:{}}),l.forEach(r=>{const s=b(r);o.length?o.forEach(p=>{i.push({name:`${p}/${s}`,path:`/${p}/${s}`,component:u.exports.lazy(E[r]),meta:{name:r,lang:p}})}):i.push({name:r,path:`/${s}`,component:u.exports.lazy(E[r]),meta:{name:r}})}),g?i.push({path:"*",redirect:r=>`/${Ut(r)}/`,meta:{}}):i.push({path:"*",redirect:()=>"/",meta:{}}),console.log(i),i}const D=Xt();const Yt=()=>{const{pathname:i}=R(),l=u.exports.useMemo(()=>{const o=D.find(r=>r.path===i);return o&&o.meta&&o.meta.name||""},[i]);return h("div",{children:[a($,{title:l}),a(M,{}),a(u.exports.Suspense,{fallback:a("div",{}),children:a(S,{children:D.map(o=>o.redirect?a(x,{to:o.redirect(i)},o.path):a(C,{exact:o.exact,path:o.path,render:r=>a(o.component,{...r,meta:o.meta,routes:o.routes})},o.path))})})]})};N.render(a(B,{children:a(Yt,{})}),document.getElementById("app"));export{D as r};