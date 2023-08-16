import{r as E,a as F,j as u}from"./react-libs.44673a99.js";import{c as C}from"./rc-cli_site-mobile-demo.ce60b371.js";import"./index.480ed395.js";import{t as l,F as A}from"./Watermark.dcb2a79d.js";import"./index.13648a01.js";import"./index.489cba37.js";import{T as r,P as x}from"./index.e7687415.js";import"./index.8f8c982e.js";import"./constant.7b24af74.js";import"./Rate.fd4178e6.js";import"./TextEllipsis.e35b87ce.js";import"./index.e705ead8.js";import"./ConfigProviderContext.7a187239.js";import"./locales.fc745e15.js";import"./mobile.d3589cb2.js";import"./use-event-listener.ea22182e.js";import"./use-touch.58689077.js";const w=()=>{const{DemoBlock:t,DemoSection:a}=C,n=E.exports.useRef(null),[s,d]=E.exports.useState(""),[m,o]=E.exports.useState(!1),D=["\u676D\u5DDE","\u5B81\u6CE2","\u6E29\u5DDE","\u7ECD\u5174","\u6E56\u5DDE","\u5609\u5174","\u91D1\u534E","\u8862\u5DDE"],c={\u6D59\u6C5F:["\u676D\u5DDE","\u5B81\u6CE2","\u6E29\u5DDE","\u5609\u5174","\u6E56\u5DDE"],\u798F\u5EFA:["\u798F\u5DDE","\u53A6\u95E8","\u8386\u7530","\u4E09\u660E","\u6CC9\u5DDE"]};return F(a,{children:[u(t,{card:!0,title:"\u57FA\u7840\u7528\u6CD5",children:u(l,{title:"\u6807\u9898",columns:[{text:"\u676D\u5DDE"},{text:"\u5B81\u6CE2"},{text:"\u6E29\u5DDE",disabled:!0},{text:"\u5609\u5174",disabled:!0}],onChange:(e,i)=>r(`\u5F53\u524D\u503C\uFF1A${JSON.stringify(e)}, \u5F53\u524D\u7D22\u5F15\uFF1A${i}`),onCancel:()=>r.info("\u70B9\u51FB\u53D6\u6D88\u6309\u94AE"),onConfirm:()=>r.info("\u70B9\u51FB\u786E\u8BA4\u6309\u94AE")})}),u(t,{card:!0,title:"\u9ED8\u8BA4\u9009\u4E2D",children:u(l,{columns:D,defaultIndex:2,onChange:(e,i)=>r(`\u5F53\u524D\u503C\uFF1A${JSON.stringify(e)}, \u5F53\u524D\u7D22\u5F15\uFF1A${i}`)})}),u(t,{card:!0,title:"\u591A\u5217\u9009\u62E9",children:u(l,{onChange:(e,i)=>{console.log(e,i)},columns:[{values:["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94"],defaultIndex:2},{values:["\u4E0A\u5348","\u4E0B\u5348","\u665A\u4E0A"],defaultIndex:1}]})}),u(t,{card:!0,title:"\u7EA7\u8054\u9009\u62E9",children:u(l,{onChange:(e,i)=>{console.log(e,i)},onConfirm:(e,i)=>console.log(e,i),columns:[{text:"\u6C5F\u82CF",children:[{text:"\u82CF\u5DDE",children:[{text:"\u59D1\u82CF\u533A"},{text:"\u5434\u4E2D\u533A"}]},{text:"\u626C\u5DDE",children:[{text:"\u5E7F\u9675\u533A"},{text:"\u9097\u6C5F\u533A"}]}]},{text:"\u6D59\u6C5F",children:[{text:"\u676D\u5DDE",children:[{text:"\u897F\u6E56\u533A"},{text:"\u4F59\u676D\u533A"}]},{text:"\u6E29\u5DDE",children:[{text:"\u9E7F\u57CE\u533A"},{text:"\u74EF\u6D77\u533A"}]}]}]})}),u(t,{card:!0,title:"\u7981\u7528\u9009\u9879",children:u(l,{columns:[{text:"\u5357\u4EAC",disabled:!0},{text:"\u82CF\u5DDE"},{text:"\u626C\u5DDE"}]})}),u(t,{card:!0,title:"\u52A8\u6001\u9009\u9879\u8BBE\u7F6E",children:u(l,{ref:n,columns:[{values:Object.keys(c)},{values:c.\u6D59\u6C5F,defaultIndex:2}],onChange:e=>{n.current.setColumnValues(1,c[e[0]])}})}),u(t,{card:!0,title:"\u52A0\u8F7D\u72B6\u6001",children:u(l,{loading:!0,columns:[{values:["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94"],defaultIndex:2},{values:["\u4E0A\u5348","\u4E0B\u5348","\u665A\u4E0A"],defaultIndex:1}]})}),u(t,{card:!0,title:"\u642D\u914D\u5F39\u51FA\u5C42\u4F7F\u7528",children:u(A,{readonly:!0,clickable:!0,label:"\u57CE\u5E02",value:s,placeholder:"\u9009\u62E9\u57CE\u5E02",onClick:()=>o(!0)})}),u(x,{round:!0,visible:m,position:"bottom",onClose:()=>o(!1),children:u(l,{title:"\u6807\u9898",onConfirm:e=>{d(e),o(!1)},columns:D})}),u(t,{card:!0,title:"\u81EA\u5B9A\u4E49Columns\u7ED3\u6784",children:u(l,{title:"\u6807\u9898",columnsFieldNames:{text:"cityName",children:"cities"},columns:[{cityName:"\u6D59\u6C5F",cities:[{cityName:"\u676D\u5DDE",cities:[{cityName:"\u897F\u6E56\u533A"},{cityName:"\u4F59\u676D\u533A"}]},{cityName:"\u6E29\u5DDE",cities:[{cityName:"\u9E7F\u57CE\u533A"},{cityName:"\u74EF\u6D77\u533A"}]}]},{cityName:"\u798F\u5EFA",cities:[{cityName:"\u798F\u5DDE",cities:[{cityName:"\u9F13\u697C\u533A"},{cityName:"\u53F0\u6C5F\u533A"}]},{cityName:"\u53A6\u95E8",cities:[{cityName:"\u601D\u660E\u533A"},{cityName:"\u6D77\u6CA7\u533A"}]}]}]})})]})};export{w as default};
