import{j as e,c as h}from"./locales-548059eb.js";import{r as c}from"./react-libs-840bfe49.js";import{c as E}from"./rc-cli_site-mobile-demo-eaa39090.js";import{a as P}from"./index-59db7e48.js";import{C as R}from"./ConfigProviderContext-0f984393.js";import{C as w}from"./CSSTransition-ea203202.js";import{C as r}from"./index-9549eced.js";import"./mobile-e0307386.js";import"./unit-bb3e6514.js";import"./base-1da74170.js";import"./constant-7552c2aa.js";const u=s=>{const{prefixCls:o,createNamespace:a}=c.useContext(R),[l]=a("tag",o),j=c.useRef(null),{visible:y,plain:d,textColor:m,color:n,type:f,mark:C,round:g,size:x,closeable:b,onClick:k,onClose:p,children:N}=s,S=i=>{i.stopPropagation(),p==null||p(i)},z=c.useMemo(()=>d?{color:m||n,borderColor:n}:{color:m,background:n},[m,n,d]),T=()=>{const i={mark:C,plain:d,round:g};x&&(i[x]=x);const v=b&&e.jsx(P,{name:"cross",className:h(l("close")),onClick:S});return e.jsxs("span",{ref:j,style:{...z,...s.style},className:h(s.className,l([i,f])),onClick:k,children:[N,v]})};return e.jsx(w,{nodeRef:j,classNames:"rc-fade",in:y,timeout:300,unmountOnExit:!0,children:T()})};u.defaultProps={visible:!0,type:"default"};const t=u;const H=()=>{const{DemoBlock:s,DemoSection:o}=E,[a,l]=c.useState(!0);return e.jsxs(o,{children:[e.jsxs(s,{card:!0,title:"基础用法",children:[e.jsx(r,{title:"primary 类型",children:e.jsx(t,{type:"primary",children:"标签"})}),e.jsx(r,{title:"success 类型",children:e.jsx(t,{type:"success",children:"标签"})}),e.jsx(r,{title:"danger  类型",children:e.jsx(t,{type:"danger",children:"标签"})}),e.jsx(r,{title:"warning  类型",children:e.jsx(t,{type:"warning",children:"标签"})})]}),e.jsxs(s,{card:!0,title:"样式风格",children:[e.jsx(r,{title:"空心样式",children:e.jsx(t,{plain:!0,type:"primary",children:"标签"})}),e.jsx(r,{title:"圆角样式",children:e.jsx(t,{round:!0,type:"primary",children:"标签"})}),e.jsx(r,{title:"标记样式",children:e.jsx(t,{mark:!0,type:"primary",children:"标签"})}),e.jsx(r,{title:"可关闭标签",children:e.jsx(t,{visible:a,plain:!0,closeable:!0,size:"medium",type:"primary",onClose:()=>l(!1),children:"标签"})})]}),e.jsxs(s,{card:!0,title:"标签大小",children:[e.jsx(r,{title:"小号标签",children:e.jsx(t,{type:"primary",children:"标签"})}),e.jsx(r,{title:"中号标签",children:e.jsx(t,{size:"medium",type:"primary",children:"标签"})}),e.jsx(r,{title:"大号标签",children:e.jsx(t,{size:"large",type:"primary",children:"标签"})})]}),e.jsxs(s,{card:!0,title:"自定义颜色",children:[e.jsx(r,{title:"背景颜色",children:e.jsx(t,{color:"#7232dd",children:"标签"})}),e.jsx(r,{title:"文字颜色",children:e.jsx(t,{color:"#ffe1e1",textColor:"#ad0000",children:"标签"})}),e.jsx(r,{title:"空心颜色",children:e.jsx(t,{color:"#7232dd",plain:!0,children:"标签"})})]})]})};export{H as default};
