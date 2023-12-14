import{j as e,c as L}from"./locales-548059eb.js";import{r as a}from"./react-libs-840bfe49.js";import{c as S}from"./rc-cli_site-mobile-demo-eaa39090.js";import{P,r as T}from"./Popup-a2a0dcda.js";import{C as D}from"./ConfigProviderContext-0f984393.js";import{r as E,u as R}from"./render-38a34f7f.js";import{l as A}from"./lock-click-c7a7fb0f.js";import{e as F,n as k,c as V,o as $}from"./base-1da74170.js";import{C as i}from"./index-9549eced.js";import{F as B}from"./index-1a16af2f.js";import{a as j}from"./index-59db7e48.js";import"./mobile-e0307386.js";import"./Overlay-d703c016.js";import"./use-touch-76dedc34.js";import"./use-scroll-parent-a4dd715d.js";import"./CSSTransition-ea203202.js";import"./use-event-listener-721bbec6.js";import"./interceptor-35467a90.js";import"./PopupContext-0557b73d.js";import"./constant-7552c2aa.js";import"./unit-bb3e6514.js";const y=({children:t,...o})=>{const{prefixCls:l,createNamespace:s}=a.useContext(D),[c]=s("notify",l),u={color:o.color,background:o.background};return e.jsx(P,{visible:o.visible,className:L(c([o.type]),o.className),style:u,overlay:!1,position:"top",lockScroll:o.lockScroll,onClick:o.onClick,onClose:o.onClose,onClosed:o.onClosed,teleport:o.teleport,children:t||o.message})};y.defaultProps={type:"danger",duration:3e3,color:"white",lockScroll:!1};const h=y,m={};function I(t){return V(t)?t:{message:t}}const f=[];function g(){let t=f.pop();for(;t;)t(),A(!1),t=f.pop()}function q(){setTimeout(g)}const z=t=>{const o=I(t),l={...m.currentOptions,...o},{onClose:s=k,duration:c,...u}=l;let d=0;const b=T(o.teleport),n=document.createElement("div");b.appendChild(n);let p=k;const v=()=>{const[N,C]=a.useState(!1);p=()=>{C(!1),s&&s()};const x=()=>{R(n)&&n.parentNode&&n.parentNode.removeChild(n)},O=a.useCallback($(()=>{x()}),[s,n]);return a.useEffect(()=>(C(!0),g(),f.push(O),c&&+c>0&&(d=window.setTimeout(p,c)),()=>{d!==0&&window.clearTimeout(d)}),[]),e.jsx(h,{...u,visible:N,teleport:()=>n,onClose:s,onClosed:x})};return E(e.jsx(v,{}),n),p};function w(){return{type:"danger",color:void 0,message:"",onClose:void 0,onClick:void 0,duration:3e3,className:"",lockScroll:!1,background:void 0}}m.currentOptions=w();const G=t=>{F(m.currentOptions,t)},H=()=>{m.currentOptions=w()},J=q,K=Object.assign(h,{show:z,setDefaultOptions:G,resetDefaultOptions:H,clear:J}),r=K;const fe=()=>{const{DemoBlock:t,DemoSection:o}=S,[l,s]=a.useState(!1);return e.jsxs(o,{className:"demo-notify",children:[e.jsx(t,{card:!0,title:"基础用法",children:e.jsx(i,{title:"基础用法",isLink:!0,onClick:()=>r.show("通知内容")})}),e.jsxs(t,{card:!0,title:"通知类型",children:[e.jsx(i,{title:"主要通知",isLink:!0,onClick:()=>r.show({type:"primary",message:"通知内容"})}),e.jsx(i,{title:"成功通知",isLink:!0,onClick:()=>r.show({type:"success",message:"通知内容"})}),e.jsx(i,{title:"危险通知",isLink:!0,onClick:()=>r.show({type:"danger",message:"通知内容"})}),e.jsx(i,{title:"警告通知",isLink:!0,onClick:()=>r.show({type:"warning",message:"通知内容"})})]}),e.jsxs(t,{card:!0,title:"自定义配置",children:[e.jsx(i,{title:"自定义颜色",isLink:!0,onClick:()=>r.show({message:"自定义颜色",color:"#ad0000",background:"#ffe1e1"})}),e.jsx(i,{title:"自定义时长",isLink:!0,onClick:()=>r.show({message:"自定义时长",duration:1e3})})]}),e.jsxs(t,{card:!0,title:"组件调用",children:[e.jsx(i,{title:"组件调用",isLink:!0,onClick:()=>s(!0)}),e.jsx(r,{visible:l,type:"success",children:e.jsxs(B,{style:{width:"100%"},align:"center",justify:"between",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(j,{name:"bell",style:{marginRight:4}}),e.jsx("span",{children:"通知内容"})]}),e.jsx(j,{name:"close",onClick:()=>s(!1)})]})})]})]})};export{fe as default};
