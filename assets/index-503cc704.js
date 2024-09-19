import{j as t,c as j}from"./locales-548059eb.js";import{r as s,R as H}from"./react-libs-840bfe49.js";import{c as _}from"./rc-cli_site-mobile-demo-3935d5c1.js";import{C as L}from"./ConfigProviderContext-0f984393.js";import{H as q}from"./constant-7552c2aa.js";import{u as G}from"./use-scroll-parent-a4dd715d.js";import{u as J}from"./use-click-away-fbf72a4b.js";import{u as Q}from"./use-event-listener-721bbec6.js";import{u as U}from"./use-refs-92151253.js";import{a as X}from"./get-rect-4dc7f7e4.js";import{i as Y}from"./base-1da74170.js";import{a as ee,P as te}from"./Popup-a2a0dcda.js";import{u as ne}from"./use-merged-state-79e14435.js";import{I as oe}from"./index-59db7e48.js";import{a as se,C as W}from"./index-9549eced.js";import{u as le}from"./use-set-state-898f20ed.js";import{b as re}from"./unit-bb3e6514.js";import{S as F}from"./Switch-de57884e.js";import{a as ae}from"./index-9cdb6f61.js";import"./mobile-094a819d.js";import"./Overlay-d703c016.js";import"./use-touch-76dedc34.js";import"./CSSTransition-ea203202.js";import"./interceptor-35467a90.js";import"./PopupContext-0557b73d.js";import"./Loading-c60598b2.js";const K=s.createContext({}),$=s.forwardRef((e,v)=>{const{prefixCls:x,createNamespace:m}=s.useContext(L),[u]=m("dropdown-menu",x),[d,i]=s.useState(e.shouldRenderTitle),[h,y]=s.useState(null),f=s.useRef(null),g=s.useRef({bottom:0,top:0}),N=s.useRef(),w=s.useRef(),R=s.useRef(0),[P,z]=U(),M=G(N),k=s.useMemo(()=>h!==null,[h]),A=()=>k&&Y(e.zIndex)?{zIndex:+e.zIndex+1}:{},p=o=>{f.current=o,y(o)},n=()=>{w.current&&(g.current=X(w.current),e.direction==="down"?R.current=g.current.bottom:R.current=window.innerHeight-g.current.top)},c=()=>{P.forEach(o=>{o.toggle(!1)}),p(null)};s.useImperativeHandle(v,()=>({close:c}));const a=()=>{e.closeOnClickOutside&&c()};s.useEffect(()=>{w.current&&n()},[w.current]);const O=()=>{k&&n()},I=o=>{const l=P[o];n(),p(o),l.toggle(!0)},S=o=>{P.forEach((l,D)=>{if(D===o){if(o===f.current){p(null),l.toggle();return}I(o)}else l.toggle(!1,{immediate:!1})})},C=(o,l)=>{const D=h===l,{disabled:E,titleClass:Z}=o;return t.jsx("div",{role:"button",tabIndex:E?-1:0,className:j(u("item",{disabled:E}),{[q]:!E}),onClick:()=>{E||S(l)},children:t.jsx("span",{className:j(u("title",{down:D===(e.direction==="down"),active:D}),Z),style:{color:D?e.activeColor:""},children:t.jsx("div",{className:"rc-ellipsis",children:o.renderTitle()})})},l)};J(N,a),Q("scroll",O,{target:M});const b=o=>{var l;i(!d),p(null),(l=e.onChange)==null||l.call(e,o)};return t.jsx(K.Provider,{value:{props:e,offset:R.current,onChange:b,close:c},children:t.jsxs("div",{ref:N,className:j(u(),e.className),style:{...e.style},children:[t.jsx("div",{ref:w,style:A(),className:j(u("bar",{opened:k})),children:P.map(C)}),H.Children.toArray(e.children).filter(Boolean).map((o,l)=>H.cloneElement(o,{ref:z(l)}))]})})});$.defaultProps={duration:200,overlay:!0,direction:"down",zIndex:2e3,closeOnClickOutside:!0,closeOnClickOverlay:!0,shouldRenderTitle:!1};$.displayName="DropdownMenu";const ie=$,B=s.forwardRef((e,v)=>{const{prefixCls:x,createNamespace:m}=s.useContext(L),[u]=m("dropdown-item",x),d=s.useContext(K),[i,h]=ne({defaultValue:e.defaultValue,value:e.value}),y=s.useRef(i),[f,g]=le({showPopup:!1,transition:!0,showWrapper:!1}),N=()=>{var n;(n=e.onOpen)==null||n.call(e)},w=()=>{var n;(n=e.onOpened)==null||n.call(e)},R=()=>{var n;g({showPopup:!1}),d.close(),(n=e.onClose)==null||n.call(e)},P=()=>{var n;g({showWrapper:!1}),(n=e.onClosed)==null||n.call(e)},z=n=>{e.teleport&&n.stopPropagation()},M=(n=!f.showPopup,c={})=>{if(n===f.showPopup)return;const a={};a.showPopup=n,a.transition=!c.immediate,n&&(f.showWrapper=!0),g(a)},k=()=>{if(e.title)return e.title;const n=e.options.find(c=>{var a;return c.value===((a=y.current)==null?void 0:a.value)});return n?n.text:e.placeholder};s.useImperativeHandle(v,()=>({toggle:M,renderTitle:k,state:f,name:e.name,titleClass:e.titleClass,disabled:e.disabled}));const A=n=>{var S;const{activeColor:c}=d.props,a=n.value===((S=y.current)==null?void 0:S.value),O=()=>{var C,b,o;if(n.value!==((C=y.current)==null?void 0:C.value)){const l={...i,text:n.text,value:n.value};h(l),y.current=l,(b=e.onChange)==null||b.call(e,l),(o=d.onChange)==null||o.call(d,l),R()}},I=()=>a?t.jsx(oe,{className:j(u("icon")),color:c,name:"success"}):null;return t.jsx(se,{icon:n.icon,title:n.text,className:j(u("option",{active:a})),style:{color:a?c:""},clickable:!0,onClick:O,children:I()},n.value)},p=()=>{var b;const{offset:n}=d,{zIndex:c,overlay:a,duration:O,direction:I,closeOnClickOverlay:S}=d.props,C=re(c);return I==="down"?C.top=`${n}px`:C.bottom=`${n}px`,t.jsx("div",{style:{...C,display:f.showWrapper?"block":"none"},className:j(u([I])),onClick:z,children:t.jsxs(te,{visible:f.showPopup,className:j(u("content")),overlay:a,position:I==="down"?"top":"bottom",duration:f.transition?+O:0,overlayStyle:{position:"absolute"},closeOnClickOverlay:S,teleport:null,onOpen:N,onClose:R,onOpened:w,onClosed:P,children:[(b=e.options)==null?void 0:b.map(A),e.children]})})};return e.teleport?ee(e.teleport,p()):p()});B.defaultProps={options:[],disabled:!1,placeholder:"请选择"};B.displayName="DropdownItem";const ce=B,r=Object.assign(ie,{Item:ce});const T=[{text:"全部商品",value:0},{text:"新款商品",value:1,icon:"location-o"},{text:"活动商品",value:2}],V=[{text:"默认排序",value:"a"},{text:"好评排序",value:"b"},{text:"销量排序",value:"c"}],ue=()=>new Array(30).fill(1).map((v,x)=>({text:`scroll${x}`,value:`${x}`})),Ae=()=>{const[e,v]=s.useState({}),x=s.useRef(null),{DemoBlock:m,DemoSection:u}=_,d=i=>{var h;r(i),(h=x.current)==null||h.close()};return t.jsxs(u,{className:"demo-badge",children:[t.jsx(m,{title:"基础用法",children:t.jsxs(r,{onChange:i=>{console.log(i)},children:[t.jsx(r.Item,{name:"item1",defaultValue:{text:"全部商品",value:0},value:e,options:T,onChange:i=>v(i)}),t.jsx(r.Item,{name:"item2",defaultValue:{text:"默认排序",value:"a"},value:e,options:V,onChange:i=>v(i)})]})}),t.jsx(m,{title:"自定义菜单内容",children:t.jsxs(r,{ref:x,children:[t.jsx(r.Item,{name:"item1",options:T}),t.jsxs(r.Item,{title:"筛选",name:"item2",children:[t.jsx(W,{center:!0,title:"包邮",rightIcon:t.jsx(F,{size:24})}),t.jsx(W,{center:!0,title:"团购",rightIcon:t.jsx(F,{size:24})}),t.jsx("div",{style:{height:"40px",paddingTop:"20px",paddingRight:"15px",paddingBottom:"20px",paddingLeft:"15px"},children:t.jsx(ae,{type:"danger",block:!0,round:!0,onClick:d,children:"确定"})})]})]})}),t.jsx(m,{title:"自定义选中颜色",children:t.jsxs(r,{activeColor:"#1900ff",zIndex:"3000",children:[t.jsx(r.Item,{name:"item1",options:T,teleport:document.body}),t.jsx(r.Item,{name:"item2",options:V})]})}),t.jsx(m,{title:"向上展开",children:t.jsxs(r,{direction:"up",activeColor:"#1900ff",children:[t.jsx(r.Item,{name:"item1",options:T}),t.jsx(r.Item,{name:"item2",options:V})]})}),t.jsx(m,{title:"禁用菜单",children:t.jsxs(r,{children:[t.jsx(r.Item,{disabled:!0,name:"item1",options:T}),t.jsx(r.Item,{disabled:!0,name:"item2",options:V})]})}),t.jsx(m,{title:"滚动",children:t.jsx(r,{direction:"up",children:t.jsx(r.Item,{name:"item1",options:ue()})})})]})};export{Ae as default};