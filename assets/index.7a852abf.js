import{r as s,a as o,j as e}from"./react-libs.5b212337.js";import{c as f}from"./rc-cli_site-mobile-demo.e1e025a7.js";import{a as B}from"./index.9c5f8655.js";import"./index.2012bf47.js";import{i as t,j as d}from"./Progress.17e70151.js";import"./index.e9782f87.js";import"./index.b148844d.js";import{C as h}from"./index.0f55a6cf.js";import"./constant.bd9aa8c7.js";import"./Rate.15819d10.js";import"./index.2bb626ed.js";import"./ConfigProviderContext.b49bb3f3.js";import"./locales.fc745e15.js";import"./mobile.c7d19b29.js";import"./use-touch.ecb2ed24.js";const n=[{text:"\u5168\u90E8\u5546\u54C1",value:0},{text:"\u65B0\u6B3E\u5546\u54C1",value:1,icon:"location-o"},{text:"\u6D3B\u52A8\u5546\u54C1",value:2}],r=[{text:"\u9ED8\u8BA4\u6392\u5E8F",value:"a"},{text:"\u597D\u8BC4\u6392\u5E8F",value:"b"},{text:"\u9500\u91CF\u6392\u5E8F",value:"c"}],A=()=>new Array(30).fill(1).map((l,m)=>({text:`scroll${m}`,value:`${m}`})),L=()=>{const[a,l]=s.exports.useState({}),[m,x]=s.exports.useState({}),c=s.exports.useRef(null),{DemoBlock:i,DemoSection:C}=f,E=u=>{var p;t(u),(p=c.current)==null||p.close()};return o(C,{className:"demo-badge",children:[e(i,{title:"\u57FA\u7840\u7528\u6CD5",children:o(t,{onChange:u=>x(u),children:[e(t.Item,{name:"item1",defaultValue:{text:"\u5168\u90E8\u5546\u54C1",value:0},value:a,options:n,onChange:u=>l(u)}),e(t.Item,{name:"item2",defaultValue:{text:"\u9ED8\u8BA4\u6392\u5E8F",value:"a"},value:a,options:r,onChange:u=>l(u)})]})}),e(i,{title:"\u81EA\u5B9A\u4E49\u83DC\u5355\u5185\u5BB9",children:o(t,{ref:c,children:[e(t.Item,{name:"item1",options:n}),o(t.Item,{title:"\u7B5B\u9009",name:"item2",children:[e(h,{center:!0,title:"\u5305\u90AE",rightIcon:e(d,{size:24})}),e(h,{center:!0,title:"\u56E2\u8D2D",rightIcon:e(d,{size:24})}),e("div",{style:{height:"40px",paddingTop:"20px",paddingRight:"15px",paddingBottom:"20px",paddingLeft:"15px"},children:e(B,{type:"danger",block:!0,round:!0,onClick:E,children:"\u786E\u5B9A"})})]})]})}),e(i,{title:"\u81EA\u5B9A\u4E49\u9009\u4E2D\u989C\u8272",children:o(t,{activeColor:"#1900ff",zIndex:"3000",children:[e(t.Item,{name:"item1",options:n,teleport:document.body}),e(t.Item,{name:"item2",options:r})]})}),e(i,{title:"\u5411\u4E0A\u5C55\u5F00",children:o(t,{direction:"up",activeColor:"#1900ff",children:[e(t.Item,{name:"item1",options:n}),e(t.Item,{name:"item2",options:r})]})}),e(i,{title:"\u7981\u7528\u83DC\u5355",children:o(t,{children:[e(t.Item,{disabled:!0,name:"item1",options:n}),e(t.Item,{disabled:!0,name:"item2",options:r})]})}),e(i,{title:"\u6EDA\u52A8",children:e(t,{direction:"up",children:e(t.Item,{name:"item1",options:A()})})})]})};export{L as default};