import{j as t,c as l}from"./locales-548059eb.js";import{c as U}from"./rc-cli_site-mobile-demo-eaa39090.js";import{r,R as V}from"./react-libs-840bfe49.js";import{a as p}from"./index-59db7e48.js";import{g as v}from"./get-rect-4dc7f7e4.js";import{u as X}from"./use-event-listener-721bbec6.js";import{d as N,r as z}from"./raf-f0838b14.js";import{C as A}from"./ConfigProviderContext-0f984393.js";import{P as F}from"./PopupContext-0557b73d.js";import{u as G}from"./use-set-state-898f20ed.js";import{u as J}from"./use-update-effect-09c1ca0c.js";import{n as k,i as K}from"./base-1da74170.js";import{S as x}from"./index-945c9dff.js";import"./mobile-e0307386.js";import"./unit-bb3e6514.js";import"./use-gesture-react.esm-484f41f1.js";import"./use-ref-state-6962d29d.js";import"./bound-41eb6e06.js";import"./use-mounted-ref-49b7ba77.js";const y=r.forwardRef((e,h)=>{const{text:R,color:E,background:S,wrapable:D,scrollable:a,speed:w,delay:b=1}=e,{prefixCls:P,createNamespace:T}=r.useContext(A),W=r.useContext(F),[c]=T("notice-bar",P),[f,i]=G({show:!0,offset:0,duration:0}),j=r.useRef(),I=r.useRef(),u=r.useRef(0),s=r.useRef(0),g=r.useRef(null),B=()=>typeof e.leftIcon!="string"&&V.isValidElement(e.leftIcon)?e.leftIcon:e.leftIcon?t.jsx(p,{className:l(c("left-icon")),name:e.leftIcon}):null,$=()=>e.mode==="closeable"?"cross":e.mode==="link"?"arrow":"",L=n=>{e.mode==="closeable"&&(i({show:!1}),e.onClose&&e.onClose(n))},q=()=>{if(e.rightIcon)return e.rightIcon;const n=$();return n?t.jsx(p,{name:n,className:l(c("right-icon")),onClick:L}):null},H=()=>{i({offset:u.current,duration:0}),z(()=>{N(()=>{i({offset:-s.current,duration:(s.current+u.current)/w}),e.onReplay&&e.onReplay()})})},M=()=>{const n=a===!1&&!e.wrapable,d={transform:f.offset?`translateX(${f.offset}px)`:"",transitionDuration:`${f.duration}s`};return t.jsx("div",{className:l(c("wrap")),ref:j,children:t.jsx("div",{className:l(c("content"),{"rc-ellipsis":n}),ref:I,style:d,onTransitionEnd:H,children:e.children||R})})},m=()=>{const n=K(b)?+b*1e3:0;u.current=0,s.current=0,i({offset:0,duration:0}),clearTimeout(g.current),g.current=setTimeout(()=>{if(!j.current||!I.current||a===!1)return;const d=v(j.current).width,C=v(I.current).width;(a||C>d)&&N(()=>{u.current=d,s.current=C,i({offset:-s.current,duration:s.current/w})})},n)};return X("pageshow",m),r.useEffect(()=>{m()},[R,a]),J(()=>{m()},[W.visible]),r.useImperativeHandle(h,()=>({reset:m})),f.show&&t.jsxs("div",{role:"alert",className:l(c({wrapable:D}),e.className),style:{color:E,background:S,...e.style},onClick:e.onClick,children:[B(),M(),q()]})});y.defaultProps={delay:1,speed:60,onClick:k,onClose:k};const o=y;const xe=()=>{const{DemoBlock:e,DemoSection:h}=U;return t.jsxs(h,{children:[t.jsx(e,{title:"基础用法",children:t.jsx(o,{leftIcon:"volume-o",text:"在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"})}),t.jsx(e,{title:"滚动播放",children:t.jsx(o,{scrollable:!0,text:"在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"})}),t.jsx(e,{title:"多行展示",children:t.jsx(o,{wrapable:!0,text:"在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"})}),t.jsxs(e,{title:"通知栏状态",children:[t.jsx(o,{mode:"closeable",children:"技术是开发它的人的共同灵魂。"}),t.jsx(o,{mode:"link",children:"技术是开发它的人的共同灵魂。"})]}),t.jsx(e,{title:"自定义样式",children:t.jsx(o,{leftIcon:"info-o",background:"rgb(236, 249, 255)",color:"rgb(25, 137, 250)",text:"技术是开发它的人的共同灵魂。"})}),t.jsx(e,{title:"垂直滚动",children:t.jsx(o,{leftIcon:"volume-o",children:t.jsxs(x,{autoplayInterval:1e3,indicator:!1,direction:"vertical",className:"notice-swipe",children:[t.jsx(x.Item,{children:"内容 1"}),t.jsx(x.Item,{children:"内容 2"}),t.jsx(x.Item,{children:"内容 3"})]})})})]})};export{xe as default};
