import{j as o,c as b}from"./locales-548059eb.js";import{r as i}from"./react-libs-840bfe49.js";import{c as Re}from"./rc-cli_site-mobile-demo-eaa39090.js";import{P as ve}from"./Popup-a2a0dcda.js";import{a as Se}from"./index-9cdb6f61.js";import{T as de}from"./index-ec9d0b36.js";import{C as p}from"./ConfigProviderContext-0f984393.js";import{g as X}from"./get-rect-4dc7f7e4.js";import{s as Me,g as Te}from"./scroll-e4e20d56.js";import{a as je}from"./unit-bb3e6514.js";import{u as Ne}from"./use-refs-92151253.js";import{r as se}from"./raf-f0838b14.js";import{u as he}from"./use-update-effect-09c1ca0c.js";import{p as Oe}from"./base-1da74170.js";import{C as L}from"./index-9549eced.js";import"./mobile-e0307386.js";import"./index-59db7e48.js";import"./Overlay-d703c016.js";import"./use-touch-76dedc34.js";import"./use-scroll-parent-a4dd715d.js";import"./CSSTransition-ea203202.js";import"./use-event-listener-721bbec6.js";import"./interceptor-35467a90.js";import"./PopupContext-0557b73d.js";import"./Loading-c60598b2.js";import"./constant-7552c2aa.js";import"./lock-click-c7a7fb0f.js";import"./render-38a34f7f.js";const Ie=e=>{const{prefixCls:c,createNamespace:y}=i.useContext(p),[d]=y("calendar",c),{onClickSubtitle:a,showTitle:C,showSubtitle:m,firstDayOfWeek:I}=e,w=()=>{const{title:x}=e;return C?o.jsx("div",{className:b(d("header-title")),children:x}):null},N=()=>{const x=e.subtitle;return m?o.jsx("div",{className:b(d("header-subtitle")),onClick:a,children:x}):null},f=()=>{const x=["日","一","二","三","四","五","六"],T=[...x.slice(I,7),...x.slice(0,I)];return o.jsx("div",{className:b(d("weekdays")),children:T.map((H,v)=>o.jsx("span",{className:b(d("weekday")),children:H},String(v)))})};return o.jsxs("div",{className:b(d("header")),children:[w(),N(),f()]})},Pe=Ie,xe=e=>{const{prefixCls:c,createNamespace:y}=i.useContext(p),[d]=y("calendar",c),{item:a,index:C,color:m,offset:I,rowHeight:w}=e,N=i.useMemo(()=>{const g={height:w};if(a.type==="placeholder")return g.width="100%",g;if(C===0&&(g.marginLeft=`${100*I/7}%`),m)switch(a.type){case"end":case"start":case"start-end":case"multiple-middle":case"multiple-selected":g.background=m;break;case"middle":g.color=m;break}return g},[a,C,m,I,w]),f=()=>{var g;e.item.type!=="disabled"&&((g=e.onClick)==null||g.call(e,a))},x=()=>{const{topInfo:g}=e.item;return g||e.topInfoRender?o.jsx("div",{className:b(d("top-info")),children:e.topInfoRender?e.topInfoRender(e.item):g},String(C)):null},T=()=>{const{bottomInfo:g}=e.item;return g||e.bottomInfoRender?o.jsx("div",{className:b(d("bottom-info")),children:e.bottomInfoRender?e.bottomInfoRender(e.item):g},String(C)):null},H=()=>{const{type:g,text:r}=a,R=[x(),r,T()];return g==="selected"?o.jsx("div",{className:b(d("selected-day")),style:{width:w,height:w,background:m},children:R}):R},{type:v,className:W}=e.item;return v==="placeholder"?o.jsx("div",{className:b(d("day")),style:N},String(C)):o.jsx("div",{role:"gridcell",style:N,className:b(d("day",v),W),tabIndex:v==="disabled"?void 0:-1,onClick:f,children:H()})};xe.defaultProps={offset:0};const Le=xe;function ie(e,c){const y=e.getFullYear(),d=c.getFullYear();if(y===d){const a=e.getMonth(),C=c.getMonth();return a===C?0:a>C?1:-1}return y>d?1:-1}function F(e,c){const y=ie(e,c);if(y===0){const d=e.getDate(),a=c.getDate();return d===a?0:d>a?1:-1}return y}const Z=e=>new Date(e),ge=e=>Array.isArray(e)?e.map(Z):Z(e);function ce(e,c){const y=Z(e);return y.setDate(y.getDate()+c),y}const ke=e=>ce(e,-1),be=e=>ce(e,1),le=()=>{const e=new Date;return e.setHours(0,0,0,0),e};function Ae(e){const c=e[0].getTime();return(e[1].getTime()-c)/(1e3*60*60*24)+1}const $e=(e,c)=>32-new Date(e,c-1,32).getDate(),De={end:"结束",start:"开始",title:"日期选择",confirm:"确定",startEnd:"开始/结束",weekdays:["日","一","二","三","四","五","六"],monthTitle:(e,c)=>`${e}年${c}月`,rangePrompt:e=>`最多选择 ${e} 天`},J=(e,...c)=>c.length?De[e](...c):De[e],Fe=e=>J("monthTitle",e.getFullYear(),e.getMonth()+1),Ce=i.forwardRef((e,c)=>{const{prefixCls:y,createNamespace:d}=i.useContext(p),[a]=d("calendar",y),[C,m]=i.useState(!1),{showMonthTitle:I,date:w,showMark:N,firstDayOfWeek:f}=e,x=i.useRef(null),[T,H]=i.useState(),v=i.useRef(0);i.useEffect(()=>{T&&(v.current=X(T).height)},[T]);const W=i.useMemo(()=>(e.formatMonthTitle||Fe)(w),[w]),g=i.useMemo(()=>je(e.rowHeight),[e.rowHeight]),r=i.useMemo(()=>{const s=w.getDay();return f?(s+7-f)%7:s},[w,f]),R=i.useMemo(()=>$e(w.getFullYear(),w.getMonth()+1),[w]),l=i.useMemo(()=>C||!e.lazyRender,[C,e.lazyRender]),K=()=>W,ee=s=>{var D;(D=e.onClick)==null||D.call(e,s)},te=s=>{const D=S=>e.currentDate.some(u=>F(u,S)===0);if(D(s)){const S=ke(s),u=be(s),M=D(S),E=D(u);return M&&E?"multiple-middle":M?"end":E?"start":"multiple-selected"}return""},j=s=>{const[D,S]=e.currentDate;if(!D)return"";const u=F(s,D);if(!S)return u===0?"start":"";const M=F(s,S);return e.allowSameDay&&u===0&&M===0?"start-end":u===0?"start":M===0?"end":u>0&&M<0?"middle":""},z=s=>{const{type:D,minDate:S,maxDate:u,currentDate:M}=e;if(F(s,S)<0||F(s,u)>0)return"disabled";if(Array.isArray(M)){if(D==="multiple")return te(s);if(D==="range")return j(s)}else if(D==="single")return F(s,M)===0?"selected":"";return""},B=s=>{if(e.type==="range"){if(s==="start"||s==="end")return J(s);if(s==="start-end")return J("startEnd")}return""},ne=()=>I?o.jsx("div",{className:b(a("month-title")),children:W}):null,re=()=>N&&l?o.jsx("div",{className:b(a("month-mark")),children:e.date.getMonth()+1}):null,Y=i.useMemo(()=>{const s=Math.ceil((R+r)/7);return Array(s).fill({type:"placeholder"})},[R,r]),U=i.useMemo(()=>{const s=[],D=e.date.getFullYear(),S=e.date.getMonth();for(let u=1;u<=R;u++){const M=new Date(D,S,u),E=z(M);let G={date:M,type:E,text:u,bottomInfo:B(E)};e.formatter&&(G=e.formatter(G)),s.push(G)}return s},[e.currentDate,e.date,e.formatter]),_=i.useMemo(()=>U.filter(s=>s.type==="disabled"),[U]),Q=(s,D)=>{if(x.current){const S=X(x.current),u=Y.length,E=(Math.ceil((D.getDate()+r)/7)-1)*S.height/u;Me(s,S.top+E+s.scrollTop-X(s).top)}},V=(s,D)=>o.jsx(Le,{item:s,index:D,color:e.color,offset:r,rowHeight:g,onClick:ee},String(D)),oe=()=>o.jsxs("div",{ref:x,role:"grid",className:b(a("days")),children:[re(),(l?U:Y).map(V)]});return i.useImperativeHandle(c,()=>({getTitle:K,getHeight:()=>v.current,setVisible:m,scrollToDate:Q,disabledDays:_})),o.jsxs("div",{className:b(a("month")),ref:H,children:[ne(),oe()]})});Ce.defaultProps={};const He=Ce,we=i.forwardRef((e,c)=>{const{prefixCls:y,createNamespace:d}=i.useContext(p),[a]=d("calendar",y),{type:C,title:m,showTitle:I,showSubtitle:w,firstDayOfWeek:N,minDate:f,maxDate:x,safeAreaInsetBottom:T,footer:H,showConfirm:v,className:W,style:g}=e,r=(n,t=e.minDate,h=e.maxDate)=>F(n,t)===-1?t:F(n,h)===1?h:n,R=(n=e.defaultDate)=>{if(n===null)return n;const t=le();if(C==="range"){Array.isArray(n)||(n=[]);const h=r(n[0]||t,f,ke(x)),P=r(n[1]||t,be(f));return[h,P]}return C==="multiple"?Array.isArray(n)?n.map(h=>r(h)):[r(t)]:((!n||Array.isArray(n))&&(n=t),r(n))},l=i.useRef(null),K=i.useRef(0),[ee,te]=i.useState(""),[j,z]=i.useState(R()),[B,ne]=Ne(),re=i.useMemo(()=>N?+N%7:0,[N]),Y=i.useMemo(()=>{const n=[],t=new Date(f);t.setDate(1);do n.push(new Date(t)),t.setMonth(t.getMonth()+1);while(ie(t,x)!==1);return n},[f,x]),U=i.useMemo(()=>{if(j){if(e.type==="range")return!j[0]||!j[1];if(e.type==="multiple")return!j.length}return!j},[e.type,j]),_=()=>{var me;if(!l.current)return;const n=Te(l.current),t=n+K.current,h=Y.map((O,$)=>B[$].getHeight()),P=h.reduce((O,$)=>O+$,0);if(t>P&&n>0)return;let k=0,q;const A=[-1,-1];for(let O=0;O<Y.length;O++){const $=B[O];k<=t&&k+h[O]>=n&&(A[1]=O,q||(q=$,A[0]=O),B[O].showed||(B[O].showed=!0,(me=e.onMonthShow)==null||me.call(e,{date:$.date,title:$.getTitle()}))),k+=h[O]}Y.forEach((O,$)=>{const fe=$>=A[0]-1&&$<=A[1]+1;B[$].setVisible(fe)}),q&&te(q.getTitle())},Q=n=>{se(()=>{Y.some((t,h)=>ie(t,n)===0?(l.current&&B[h].scrollToDate(l.current,n),!0):!1),_()})},V=n=>{if(e.poppable&&!e.show)return;const t=n||R();if(t){const h=e.type==="single"?t:t[0];Q(h)}else se(_)},oe=()=>{e.poppable&&!e.show||se(()=>{K.current=Math.floor(X(l.current).height),V()})},s=(n=R())=>{z(n),V(n)},D=n=>{var t;(t=e.onConfirm)==null||t.call(e,ge(n||j))},S=n=>{var k;const{maxRange:t,rangePrompt:h,showRangePrompt:P}=e;return t&&Ae(n)>+t?(P&&de(h||J("rangePrompt",t)),(k=e.onOverRange)==null||k.call(e),!1):!0},u=(n,t)=>{const h=P=>{var k;z(P),(k=e.onSelect)==null||k.call(e,ge(P))};if(t&&e.type==="range"&&!S(n)){h([n[0],ce(n[0],+e.maxRange-1)]);return}h(n),t&&!e.showConfirm&&D(n)},M=n=>{var P;if(e.readonly||!n.date)return;const{date:t}=n,{type:h}=e;if(h==="range"){if(!j){u([t]);return}const[k,q]=j;if(k&&!q){const A=F(t,k);A===1?u([k,t],!0):A===-1?u([t]):e.allowSameDay&&u([t,t],!0)}else u([t])}else if(h==="multiple"){if(!j){u([t]);return}const k=j,q=k.findIndex(A=>F(A,t)===0);if(q!==-1){const[A]=k.splice(q,1);(P=e.onUnselect)==null||P.call(e,Z(A)),z([...k])}else e.maxRange&&k.length>=+e.maxRange?de(e.rangePrompt||J("rangePrompt",e.maxRange)):u([...k,t])}else u(t,!0)},E=(n,t)=>{const h=t!==0||!e.showSubtitle;return o.jsx(He,{ref:ne(t),date:n,currentDate:j,showMonthTitle:h,firstDayOfWeek:re,...Oe(e,["type","color","minDate","maxDate","showMark","formatter","rowHeight","lazyRender","showSubtitle","allowSameDay"]),onClick:M},t)},G=()=>{const t=U?e.confirmDisabledText:e.confirmText;return o.jsx("div",{className:b(a("footer"),{"rc-safe-area-bottom":T}),children:H||(v?o.jsx(Se,{round:!0,block:!0,type:"danger",color:e.color,className:b(a("confirm")),disabled:U,nativeType:"button",onClick:()=>D(),children:t||"确认"}):null)})},ue=()=>o.jsxs("div",{className:b(a(),W),style:g,children:[o.jsx(Pe,{title:m,subtitle:e.subtitle||ee,showTitle:I,showSubtitle:w,firstDayOfWeek:N,onClickSubtitle:n=>{var t;(t=e.onClickSubtitle)==null||t.call(e,n)}}),o.jsx("div",{ref:l,className:b(a("body")),onScroll:_,children:Y.map(E)}),G()]});return i.useEffect(()=>{oe()},[e.show]),he(()=>{s(R())},[e.type,e.minDate,e.maxDate]),he(()=>{z(e.defaultDate),V()},[e.defaultDate]),i.useImperativeHandle(c,()=>({reset:s,scrollToDate:Q})),e.poppable?o.jsx(ve,{visible:e.show,className:b(a("popup")),round:e.round,position:e.position,closeable:e.showTitle||e.showSubtitle,teleport:e.teleport,closeOnClickOverlay:e.closeOnClickOverlay,closeOnPopstate:e.closeOnPopstate,onClose:()=>{var n;return(n=e.onClose)==null?void 0:n.call(e)},children:ue()}):o.jsx(o.Fragment,{children:ue()})});we.defaultProps={type:"single",title:"日期选择",color:"#ee0a24",rowHeight:64,poppable:!0,lazyRender:!0,showMark:!0,showTitle:!0,showSubtitle:!0,showConfirm:!0,showRangePrompt:!0,readonly:!1,firstDayOfWeek:0,footer:null,minDate:le(),maxDate:(()=>{const e=le();return new Date(e.getFullYear(),e.getMonth()+6,e.getDate())})(),show:!1,position:"bottom",round:!0,closeOnPopstate:!0,closeOnClickOverlay:!0,safeAreaInsetBottom:!0,maxRange:null,allowSameDay:!1};const ye=we,ae={id:"",type:"single",round:!0,color:void 0,minDate:void 0,maxDate:void 0,maxRange:void 0,position:void 0,formatter:void 0,showConfirm:!0,confirmText:void 0,confirmDisabledText:void 0,firstDayOfWeek:0,currentDate:null},ft=()=>{const{DemoBlock:e,DemoSection:c}=Re,[y,d]=i.useState(!1),[a,C]=i.useState({maxRange:[],selectSingle:null,selectRange:[],selectMultiple:[],quickSelect1:null,quickSelect2:[],customColor:[],customConfirm:[],customRange:null,customDayText:[],customPosition:null}),[m,I]=i.useState({...ae}),w=()=>{I({...ae})},N=r=>{if(!r.date)return r;const R=r.date.getMonth()+1,l=r.date.getDate();return R===5&&(l===1?r.topInfo="劳动节":l===4?r.topInfo="青年节":l===11&&(r.text="今天")),r.type==="start"?r.bottomInfo="入店":r.type==="end"&&(r.bottomInfo="离店"),r},f=(r,R)=>{w();const l={...ae};switch(l.id=R,l.type=r,R){case"quickSelect1":case"quickSelect2":l.showConfirm=!1;break;case"customColor":l.color="#1989fa";break;case"customConfirm":l.confirmText="完成",l.confirmDisabledText="请选择结束时间";break;case"customRange":l.minDate=new Date(2010,0,1),l.maxDate=new Date(2010,0,31);break;case"customDayText":l.minDate=new Date(2010,4,1),l.maxDate=new Date(2010,4,31),l.formatter=N;break;case"customPosition":l.round=!1,l.position="right";break;case"maxRange":case"selectMultiple":l.maxRange=3;break;case"firstDayOfWeek":l.firstDayOfWeek=1;break}I(l),d(!0)},x=r=>r?`${r.getMonth()+1}/${r.getDate()}`:"",T=r=>r?`${r.getFullYear()}/${x(r)}`:"",H=r=>r.length?`选择了 ${r.length} 个日期`:"",v=r=>{if(r.length){const[R,l]=r;return`${x(R)} - ${x(l)}`}return""},W=()=>{d(!1)},g=r=>{W(),C({...a,[m.id]:r})};return o.jsxs(c,{className:"demo-cascader",children:[o.jsxs(e,{card:!0,title:"基础用法",children:[o.jsx(L,{isLink:!0,title:"选择单个日期",value:T(a.selectSingle),onClick:()=>f("single","selectSingle")}),o.jsx(L,{isLink:!0,title:"选择多个日期",value:H(a.selectMultiple),onClick:()=>f("multiple","selectMultiple")}),o.jsx(L,{isLink:!0,title:"选择日期区间",value:v(a.selectRange),onClick:()=>f("range","selectRange")})]}),o.jsxs(e,{card:!0,title:"快捷选择",children:[o.jsx(L,{isLink:!0,title:"选择单个日期",value:T(a.quickSelect1),onClick:()=>f("single","quickSelect1")}),o.jsx(L,{isLink:!0,title:"选择日期区间",value:v(a.quickSelect2),onClick:()=>f("range","quickSelect2")})]}),o.jsxs(e,{card:!0,title:"自定义日历",children:[o.jsx(L,{isLink:!0,title:"自定义颜色",value:v(a.customColor),onClick:()=>f("range","customColor")}),o.jsx(L,{isLink:!0,title:"自定义日期范围",value:T(a.customRange),onClick:()=>f("single","customRange")}),o.jsx(L,{isLink:!0,title:"自定义按钮文字",value:v(a.customConfirm),onClick:()=>f("range","customConfirm")}),o.jsx(L,{isLink:!0,title:"自定义日期文案",value:v(a.customDayText),onClick:()=>f("range","customDayText")}),o.jsx(L,{isLink:!0,title:"自定义弹出位置",value:T(a.customPosition),onClick:()=>f("single","customPosition")}),o.jsx(L,{isLink:!0,title:"日期区间最大范围",value:v(a.maxRange),onClick:()=>f("range","maxRange")}),o.jsx(L,{isLink:!0,title:"自定义周起始日",onClick:()=>f("single","firstDayOfWeek")})]}),o.jsx(e,{card:!0,title:"平铺模式",children:o.jsx(ye,{type:"single",poppable:!1,round:!0,showConfirm:!1,style:{height:"500px"}})}),o.jsx(ye,{show:y,type:m.type,color:m.color,round:m.round,position:m.position,minDate:m.minDate,maxDate:m.maxDate,maxRange:m.maxRange,formatter:m.formatter,showConfirm:m.showConfirm,confirmText:m.confirmText,confirmDisabledText:m.confirmDisabledText,firstDayOfWeek:m.firstDayOfWeek,onConfirm:g,onClose:W})]})};export{ft as default};
