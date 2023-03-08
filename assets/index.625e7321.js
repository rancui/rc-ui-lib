import{r as h,a as l,j as e}from"./react-libs.762d0c40.js";import{c as r}from"./rc-cli_site-mobile-demo.b934214f.js";import"./index.3e9967ef.js";import"./Uploader.df5308b8.js";import"./index.35c0d1a6.js";import"./index.f6c39f3a.js";import{C as t,P as u}from"./index.e14d24af.js";import"./index.a0b5b08f.js";import"./constant.c62ba07d.js";import"./Rate.e251f6df.js";import"./TextEllipsis.ba53e733.js";import"./index.c15d434d.js";import"./ConfigProviderContext.29f96478.js";import"./locales.fc745e15.js";import"./mobile.a8076302.js";import"./use-event-listener.d41b1855.js";import"./use-touch.dcaf39ec.js";const c={showBasic:!1,showTop:!1,showBottom:!1,showLeft:!1,showRight:!1,showCloseIcon:!1,showCustomCloseIcon:!1,showTitle:!1};function w(o,s){switch(s.type){case"showBasic":return{...o,showBasic:!o.showBasic};case"showTop":return{...o,showTop:!o.showTop};case"showBottom":return{...o,showBottom:!o.showBottom};case"showLeft":return{...o,showLeft:!o.showLeft};case"showRight":return{...o,showRight:!o.showRight};case"showCloseIcon":return{...o,showCloseIcon:!o.showCloseIcon};case"showCustomCloseIcon":return{...o,showCustomCloseIcon:!o.showCustomCloseIcon};case"showCustomIconPosition":return{...o,showCustomIconPosition:!o.showCustomIconPosition};case"showRoundCorner":return{...o,showRoundCorner:!o.showRoundCorner};case"showTitle":return{...o,showTitle:!o.showTitle};default:throw new Error}}const R=()=>{const[o,s]=h.exports.useReducer(w,c),{DemoBlock:i,DemoSection:n}=r;return l(n,{children:[e(i,{card:!0,title:"\u57FA\u7840\u7528\u6CD5",children:e(t,{title:"\u5C55\u793A\u5F39\u51FA\u5C42",isLink:!0,onClick:()=>s({type:"showBasic"})})}),l(i,{card:!0,title:"\u5F39\u51FA\u4F4D\u7F6E",children:[e(t,{title:"\u9876\u90E8\u5F39\u51FA",isLink:!0,onClick:()=>s({type:"showTop"})}),e(t,{title:"\u5E95\u90E8\u5F39\u51FA",isLink:!0,onClick:()=>s({type:"showBottom"})}),e(t,{title:"\u5DE6\u4FA7\u5F39\u51FA",isLink:!0,onClick:()=>s({type:"showLeft"})}),e(t,{title:"\u53F3\u4FA7\u5F39\u51FA",isLink:!0,onClick:()=>s({type:"showRight"})})]}),l(i,{card:!0,title:"\u5173\u95ED\u56FE\u6807",children:[e(t,{title:"\u5173\u95ED\u56FE\u6807",isLink:!0,onClick:()=>s({type:"showCloseIcon"})}),e(t,{title:"\u81EA\u5B9A\u4E49\u5173\u95ED\u56FE\u6807",isLink:!0,onClick:()=>s({type:"showCustomCloseIcon"})}),e(t,{title:"\u56FE\u6807\u4F4D\u7F6E",isLink:!0,onClick:()=>s({type:"showCustomIconPosition"})})]}),e(i,{card:!0,title:"\u5706\u89D2\u5F39\u7A97",children:e(t,{title:"\u5706\u89D2\u5F39\u7A97",isLink:!0,onClick:()=>s({type:"showRoundCorner"})})}),e(i,{card:!0,title:"\u6807\u9898\u5F39\u6846",children:e(t,{title:"\u6807\u9898\u5F39\u6846",isLink:!0,onClick:()=>s({type:"showTitle"})})}),e(u,{visible:o.showBasic,onClose:()=>{s({type:"showBasic"}),console.log("close")},onClickOverlay:()=>console.log("click overlay"),onClick:()=>console.log("click"),onClosed:()=>console.log("closed"),onOpen:()=>console.log("open"),onOpened:()=>console.log("opened"),children:e("div",{style:{padding:"30px 50px"},children:"\u5185\u5BB9"})}),e(u,{visible:o.showTop,style:{height:"30%"},position:"top",onClose:()=>s({type:"showTop"})}),e(u,{visible:o.showBottom,style:{height:"30%"},position:"bottom",duration:300,onClose:()=>s({type:"showBottom"})}),e(u,{visible:o.showLeft,style:{width:"30%",height:"100%"},position:"left",onClose:()=>s({type:"showLeft"})}),e(u,{visible:o.showRight,style:{width:"30%",height:"100%"},position:"right",onClose:()=>s({type:"showRight"})}),e(u,{visible:o.showCloseIcon,closeable:!0,style:{height:"30%"},position:"bottom",onClose:()=>s({type:"showCloseIcon"})}),e(u,{visible:o.showCustomCloseIcon,closeable:!0,style:{height:"30%"},position:"bottom",closeIcon:"close",onClose:()=>s({type:"showCustomCloseIcon"})}),e(u,{visible:o.showCustomIconPosition,closeable:!0,style:{height:"30%"},position:"bottom",closeIcon:"close",closeIconPosition:"top-left",onClose:()=>s({type:"showCustomIconPosition"})}),e(u,{visible:o.showRoundCorner,closeable:!0,style:{height:"30%"},position:"bottom",closeIcon:"close",round:!0,onClose:()=>s({type:"showRoundCorner"})}),e(u,{visible:o.showTitle,closeable:!0,title:"\u6807\u9898",description:"\u8FD9\u662F\u4E00\u6BB5\u5F88\u957F\u5F88\u957F\u7684\u63CF\u8FF0\u8FD9\u662F\u4E00\u6BB5\u5F88\u957F\u5F88\u957F\u7684\u63CF\u8FF0\u8FD9\u662F\u4E00\u6BB5\u5F88\u957F\u5F88\u957F\u7684\u63CF\u8FF0\u8FD9\u662F\u4E00\u6BB5\u5F88\u957F\u5F88\u957F\u7684\u63CF\u8FF0",style:{height:"30%"},position:"bottom",round:!0,onClose:()=>s({type:"showTitle"})})]})};export{R as default};
