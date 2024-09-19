import{j as e,c as x}from"./locales-548059eb.js";import{r,R as g}from"./react-libs-840bfe49.js";import{c as P}from"./rc-cli_site-mobile-demo-3935d5c1.js";import{a as R}from"./constant-7552c2aa.js";import{u as S}from"./use-height-bc7f71cd.js";import{u as A}from"./use-merged-state-79e14435.js";import{C}from"./ConfigProviderContext-0f984393.js";import{b as O}from"./unit-bb3e6514.js";import{B as $,I as E}from"./index-59db7e48.js";import{T as k}from"./index-ec9d0b36.js";import"./mobile-094a819d.js";import"./get-rect-4dc7f7e4.js";import"./base-1da74170.js";import"./Popup-a2a0dcda.js";import"./Overlay-d703c016.js";import"./use-touch-76dedc34.js";import"./use-scroll-parent-a4dd715d.js";import"./CSSTransition-ea203202.js";import"./use-event-listener-721bbec6.js";import"./interceptor-35467a90.js";import"./PopupContext-0557b73d.js";import"./lock-click-c7a7fb0f.js";import"./Loading-c60598b2.js";import"./render-38a34f7f.js";const z=r.createContext({}),T=z,y=t=>{const{prefixCls:d,createNamespace:o}=r.useContext(C),[s]=o("tabbar",d),[i,h]=A({value:t.value,defaultValue:t.defaultValue}),a=r.useRef(),u=S(a),b=c=>e.jsx("div",{className:x(s("placeholder")),style:{height:u},children:c()}),l=()=>t.safeAreaInsetBottom??t.fixed,I=c=>{var m;c!==t.value&&((m=t.onChange)==null||m.call(t,c),h(c))},f=()=>{const{fixed:c,zIndex:m,border:j}=t;return e.jsx(T.Provider,{value:{parent:{...t,value:i}},children:e.jsx("div",{ref:a,style:{...t.style,...O(m)},className:x(t.className,s({fixed:c}),{[R]:j,"rc-safe-area-bottom":l()}),children:g.Children.toArray(t.children).filter(Boolean).map((N,B)=>g.cloneElement(N,{setActive:I,index:B}))})})};return t.fixed&&t.placeholder?b(f):f()};y.defaultProps={fixed:!0,border:!0,defaultValue:0};const D=y,M=t=>{const{setActive:d,index:o}=t,{prefixCls:s,createNamespace:i}=r.useContext(C),[h]=i("tabbar-item",s),{parent:a}=r.useContext(T),{activeColor:u,inactiveColor:b}=a,l=r.useMemo(()=>(t.name||o)===a.value,[t.name,o,a.value]),I=m=>{var j;d(t.name??o),(j=t.onClick)==null||j.call(t,m)},f=()=>typeof t.icon=="string"?e.jsx(E,{name:t.icon,classPrefix:t.iconPrefix}):typeof t.icon=="function"?t.icon(l):null,c=l?u:b;return e.jsxs("div",{className:x(t.className,h({active:l})),style:{...t.style,color:c},onClick:I,children:[e.jsx($,{...t.badge,className:x(h("icon")),children:f()}),e.jsx("div",{className:x(h("text")),children:typeof t.children=="function"?t.children(l):t.children})]})},V=M,_=Object.assign(D,{Item:V}),n=_;const v={active:"https://img.yzcdn.cn/vant/user-active.png",inactive:"https://img.yzcdn.cn/vant/user-inactive.png"},le=()=>{const{DemoBlock:t,DemoSection:d}=P,[o,s]=r.useState("setting");return e.jsxs(d,{className:"demo-badge",children:[e.jsx(t,{title:"基础用法",children:e.jsxs(n,{children:[e.jsx(n.Item,{icon:"home-o",children:"标签"}),e.jsx(n.Item,{icon:"search",children:"标签"}),e.jsx(n.Item,{icon:"friends-o",children:"标签"}),e.jsx(n.Item,{icon:"setting-o",children:"标签"})]})}),e.jsx(t,{title:"通过名称匹配",children:e.jsxs(n,{value:o,onChange:i=>{s(i)},children:[e.jsx(n.Item,{name:"home",icon:"home-o",children:"标签"}),e.jsx(n.Item,{name:"search",icon:"search",children:"标签"}),e.jsx(n.Item,{name:"firends",icon:"friends-o",children:"标签"}),e.jsx(n.Item,{name:"setting",icon:"setting-o",children:"标签"})]})}),e.jsx(t,{title:"徽标提示",children:e.jsxs(n,{children:[e.jsx(n.Item,{icon:"home-o",children:"标签"}),e.jsx(n.Item,{badge:{dot:!0},icon:"search",children:"标签"}),e.jsx(n.Item,{badge:{content:5},icon:"friends-o",children:"标签"}),e.jsx(n.Item,{badge:{content:20},icon:"setting-o",children:"标签"})]})}),e.jsx(t,{title:"自定义图标",children:e.jsxs(n,{children:[e.jsx(n.Item,{icon:i=>e.jsx("img",{alt:"",src:i?v.active:v.inactive}),children:"标签"}),e.jsx(n.Item,{icon:"friends-o",children:"标签"}),e.jsx(n.Item,{icon:"setting-o",children:"标签"})]})}),e.jsx(t,{title:"自定义颜色",children:e.jsxs(n,{activeColor:"#f44336",inactiveColor:"#000",children:[e.jsx(n.Item,{icon:"home-o",children:"标签"}),e.jsx(n.Item,{icon:"search",children:"标签"}),e.jsx(n.Item,{icon:"friends-o",children:"标签"}),e.jsx(n.Item,{icon:"setting-o",children:"标签"})]})}),e.jsx(t,{title:"监听切换事件",children:e.jsxs(n,{onChange:i=>k.info(`标签${+i+1}`),children:[e.jsx(n.Item,{icon:"home-o",children:"标签"}),e.jsx(n.Item,{icon:"search",children:"标签"}),e.jsx(n.Item,{icon:"friends-o",children:"标签"}),e.jsx(n.Item,{icon:"setting-o",children:"标签"})]})})]})};export{le as default};