import{j as s,c as h}from"./locales-548059eb.js";import{r as u}from"./react-libs-840bfe49.js";import{C}from"./ConfigProviderContext-0f984393.js";const N=({type:e,size:n="md",level:o,center:c,ellipsis:a,className:i,children:l,strong:m,underline:x,disabled:y,renderType:p,delete:T,...d})=>{const{prefixCls:g,createNamespace:j}=u.useContext(C),[f]=j("typography",g),t=a===!0?1:a;return s.jsx("div",{className:h(i,f([e,n,p,{center:c,strong:m,underline:x,disabled:y,delete:T,[`l${o}`]:p==="title"&&o}]),{"rc-ellipsis":t===1,[`rc-multi-ellipsis--l${t}`]:t&&t>1}),...d,children:l})},r=N,$=e=>s.jsx(r,{renderType:"text",...e}),b=e=>s.jsx(r,{renderType:"title",...e}),k=e=>s.jsx(r,{renderType:"link",...e}),E=Object.assign(r,{Text:$,Title:b,Link:k}),O=E;export{O as T};