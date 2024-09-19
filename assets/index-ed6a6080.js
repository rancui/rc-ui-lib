import{j as n,c as b}from"./locales-548059eb.js";import{c as I}from"./rc-cli_site-mobile-demo-3935d5c1.js";import{r as i}from"./react-libs-840bfe49.js";import{C as L}from"./ConfigProviderContext-0f984393.js";import{u as M}from"./use-event-listener-721bbec6.js";import"./mobile-094a819d.js";import"./base-1da74170.js";const S=t=>{const{prefixCls:m,createNamespace:l}=i.useContext(L),[T]=l("text-ellipsis",m),[g,A]=i.useState(!1),[k,C]=i.useState(!1),u=i.useRef(null),[v,E]=i.useState(""),f=c=>{if(!c)return 0;const s=c.match(/^\d*(\.\d*)?/);return s?Number(s[0]):0},j=()=>{const c=()=>{if(!u.current)return;const r=window.getComputedStyle(u.current),e=document.createElement("div");return Array.prototype.slice.apply(r).forEach(x=>{e.style.setProperty(x,r.getPropertyValue(x))}),e.style.position="fixed",e.style.zIndex="-9999",e.style.top="-9999px",e.style.height="auto",e.style.minHeight="auto",e.style.maxHeight="auto",e.innerText=t.content,document.body.appendChild(e),e},s=(r,e)=>{const{content:a,expandText:x}=t,w="...";let h=0,p=a.length,H=-1;for(;h<=p;){const d=Math.floor((h+p)/2);r.innerText=a.slice(0,d)+w+x,r.offsetHeight<=e?(h=d+1,H=d):p=d-1}return a.slice(0,H)+w},o=c();if(!o)return;const{paddingBottom:B,paddingTop:D,lineHeight:R}=o.style,N=(Number(t.rows)+.5)*f(R)+f(D)+f(B);N<o.offsetHeight?(C(!0),E(s(o,N))):(C(!1),E(t.content)),document.body.removeChild(o)},P=c=>{var s;A(o=>!o),(s=t.onClick)==null||s.call(t,c)},z=()=>n.jsx("span",{className:b(T("action")),onClick:P,children:g?t.collapseText:t.expandText});return i.useEffect(()=>{j()},[t.content,t.rows]),M("resize",j),n.jsxs("div",{ref:u,className:b(t.className,T()),children:[g?t.content:v,k?z():null]})};S.defaultProps={rows:1,expandText:"",collapseText:""};const y=S;const O=()=>{const{DemoBlock:t,DemoSection:m}=I,l="rc-ui-lib 是一个轻量、可定制的移动端组件库，于2021年开源。TextEllipsis组件对长文本进行省略，支持展开/收起。请升级到 >= 2.0.0 版本来使用该组件。";return n.jsxs(m,{children:[n.jsx(t,{title:"基础用法",children:n.jsx(y,{content:l})}),n.jsx(t,{title:"展开/收起",children:n.jsx(y,{content:l,expandText:"展开",collapseText:"收起"})}),n.jsx(t,{title:"自定义展示行数",children:n.jsx(y,{content:l,rows:"3",expandText:"展开",collapseText:"收起"})})]})};export{O as default};