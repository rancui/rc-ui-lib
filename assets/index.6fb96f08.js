import{r as a,a as c,j as u}from"./react-libs.762d0c40.js";import{c as m}from"./rc-cli_site-mobile-demo.b934214f.js";import"./index.3e9967ef.js";import{A as o}from"./Uploader.df5308b8.js";import"./index.35c0d1a6.js";import"./index.f6c39f3a.js";import{C as n}from"./index.e14d24af.js";import"./index.a0b5b08f.js";import"./constant.c62ba07d.js";import"./Rate.e251f6df.js";import"./TextEllipsis.ba53e733.js";import"./index.c15d434d.js";import"./ConfigProviderContext.29f96478.js";import"./locales.fc745e15.js";import"./mobile.a8076302.js";import"./use-event-listener.d41b1855.js";import"./use-touch.dcaf39ec.js";const s=[{name:"\u9009\u9879\u4E00"},{name:"\u9009\u9879\u4E8C"},{name:"\u9009\u9879\u4E09"}],p=[{name:"\u9009\u9879\u4E00"},{name:"\u9009\u9879\u4E8C"},{name:"\u9009\u9879\u4E09",subname:"\u63CF\u8FF0\u4FE1\u606F"}],F=[{name:"\u9009\u9879\u4E00",color:"#ee0a24"},{name:"\u9009\u9879\u4E8C",disabled:!0},{loading:!0}],y=()=>{const{DemoBlock:r,DemoSection:l}=m,[e,t]=a.exports.useState(-1),i=()=>t(-1);return c(l,{children:[c(r,{card:!0,title:"\u57FA\u7840\u7528\u6CD5",children:[u(n,{title:"\u57FA\u7840\u7528\u6CD5",isLink:!0,onClick:()=>t(1)}),u(n,{title:"\u5C55\u793A\u53D6\u6D88\u6309\u94AE",isLink:!0,onClick:()=>t(2)}),u(n,{title:"\u5C55\u793A\u63CF\u8FF0\u4FE1\u606F",isLink:!0,onClick:()=>t(3)})]}),u(r,{card:!0,title:"\u9009\u9879\u72B6\u6001",children:u(n,{title:"\u9009\u9879\u72B6\u6001",isLink:!0,onClick:()=>t(4)})}),u(r,{card:!0,title:"\u81EA\u5B9A\u4E49\u9762\u677F",children:u(n,{title:"\u81EA\u5B9A\u4E49\u9762\u677F",isLink:!0,onClick:()=>t(5)})}),u(o,{visible:e===1,onCancel:i,actions:s}),u(o,{visible:e===2,onCancel:i,actions:s,cancelText:"\u53D6\u6D88"}),u(o,{visible:e===3,onCancel:i,description:"\u8FD9\u662F\u4E00\u6BB5\u63CF\u8FF0\u4FE1\u606F",actions:p,cancelText:"\u53D6\u6D88"}),u(o,{visible:e===4,onCancel:i,actions:F,cancelText:"\u53D6\u6D88"}),u(o,{title:"\u81EA\u5B9A\u4E49\u5185\u5BB9",visible:e===5,onCancel:i,cancelText:!1,children:u("div",{className:"demo-action-sheet-content",children:"\u5185\u5BB9"})})]})};export{y as default};
