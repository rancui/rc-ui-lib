import{j as e,c as x}from"./locales-548059eb.js";import{c as I}from"./rc-cli_site-mobile-demo-eaa39090.js";import{r as s}from"./react-libs-840bfe49.js";import{u as A,a as L,b as M}from"./use-gesture-react.esm-484f41f1.js";import{u as T}from"./use-click-away-fbf72a4b.js";import{u as X}from"./use-mounted-ref-49b7ba77.js";import{C as $}from"./ConfigProviderContext-0f984393.js";import{c as z}from"./interceptor-35467a90.js";import{i as N}from"./base-1da74170.js";import{a}from"./index-9cdb6f61.js";import{C as k}from"./index-9549eced.js";import{D as G}from"./index-7a676a8e.js";import"./mobile-e0307386.js";import"./index-59db7e48.js";import"./unit-bb3e6514.js";import"./Loading-c60598b2.js";import"./constant-7552c2aa.js";import"./Popup-a2a0dcda.js";import"./Overlay-d703c016.js";import"./use-touch-76dedc34.js";import"./use-scroll-parent-a4dd715d.js";import"./CSSTransition-ea203202.js";import"./use-event-listener-721bbec6.js";import"./PopupContext-0557b73d.js";import"./index-cffeb12c.js";import"./use-height-bc7f71cd.js";import"./get-rect-4dc7f7e4.js";import"./render-38a34f7f.js";function J(r,o){return r.reduce((l,u)=>Math.abs(l-o)<Math.abs(u-o)?l:u)}const O=s.forwardRef((r,o)=>{const{prefixCls:l,createNamespace:u}=s.useContext($),[c]=u("swipe-cell",l),R=s.useRef(null),b=s.useRef(),W=s.useRef(),f=s.useRef(!1),g=s.useRef(!1),j=s.useRef(!1),E=X(),w=t=>t.current?t.current.offsetWidth:0;function C(){return N(r.leftWidth)?+r.leftWidth:w(b)}function p(){return N(r.rightWidth)?+r.rightWidth:w(W)}const[{x:m},d]=A(()=>({x:0,config:{tension:200,friction:30}}),[]),B=L(t=>{if(!r.disabled){g.current=!0,j.current=!0;const[i]=t.offset;if(t.last){const n=C(),H=p();let h=i+t.velocity[0]*t.direction[0]*50;i>0?h=Math.max(0,h):h=Math.min(0,h);const P=J([-H,0,n],h);d.start({x:P}),f.current=P!==0,window.setTimeout(()=>{E.current&&(j.current=!1,g.current=!1)})}else d.start({x:i,immediate:!0})}},{from:()=>[m.get(),0],bounds:()=>{const t=C();return{left:-p(),right:t}},axis:"x",preventScroll:!0,pointer:{touch:!0}}),F=t=>{var n;f.current=!0;const i=t==="left"?C():-p();d.start({x:i}),(n=r.onOpen)==null||n.call(r,{position:t,name:r.name})},y=t=>{var i;d.start({x:0}),f.current&&(f.current=!1,(i=r.onClose)==null||i.call(r,{position:t,name:r.name}))},D=(t="outside")=>{var i;(i=r.onClick)==null||i.call(r,t),f.current&&!g.current&&z({interceptor:r.beforeClose,args:[{name:r.name,position:t,instance:{close:()=>y(t)}}],done:()=>y(t)})},q=(t,i)=>n=>{i&&(n.preventDefault(),n.stopPropagation()),D(t)},S=(t,i)=>{const n=r[t];return n?e.jsx("div",{ref:i,className:x(c(t)),onClick:q(t,!0),children:n}):null};return s.useImperativeHandle(o,()=>({open:t=>F(t),close:y})),T(R,()=>D("outside"),"touchstart",r.hideOnClickOutside),e.jsx("div",{ref:R,...B(),className:x(c()),onClickCapture:t=>{j.current&&(t.stopPropagation(),t.preventDefault())},onClick:q("cell"),children:e.jsxs(M.div,{className:x(c("wrapper")),style:{x:m},children:[S("left",b),e.jsx("div",{className:x(c("content")),onClickCapture:t=>{m.goal!==0&&(t.preventDefault(),t.stopPropagation(),d.start({x:0}))},children:e.jsx(M.div,{style:{pointerEvents:m.to(t=>t!==0&&m.goal!==0?"none":"unset")},children:r.children})}),S("right",W)]})})});O.defaultProps={disabled:!1,hideOnClickOutside:!0};const v=O;const kt=()=>{const{DemoSection:r,DemoBlock:o}=I,l=({position:u,instance:c})=>{switch(u){case"right":G.confirm({title:"confirm"}).then(()=>{c.close()});break;case"left":case"cell":case"outside":c.close();break}};return e.jsxs(r,{children:[e.jsx(o,{title:"基础用法",children:e.jsx(v,{left:e.jsx(a,{square:!0,type:"primary",text:"选择"}),right:e.jsxs(e.Fragment,{children:[e.jsx(a,{square:!0,type:"danger",text:"删除"}),e.jsx(a,{square:!0,type:"primary",text:"收藏"})]}),children:e.jsx(k,{title:"单元格",value:"内容"})})}),e.jsx(o,{title:"禁止滑动",children:e.jsx(v,{disabled:!0,left:e.jsx(a,{square:!0,type:"primary",text:"选择"}),right:e.jsxs(e.Fragment,{children:[e.jsx(a,{square:!0,type:"danger",text:"删除"}),e.jsx(a,{square:!0,type:"primary",text:"收藏"})]}),children:e.jsx(k,{title:"单元格",value:"内容"})})}),e.jsx(o,{title:"异步关闭",children:e.jsx(v,{beforeClose:l,left:e.jsx(a,{square:!0,type:"primary",text:"选择"}),right:e.jsx(a,{square:!0,type:"danger",text:"删除"}),children:e.jsx(k,{title:"单元格",value:"内容"})})})]})};export{kt as default};
