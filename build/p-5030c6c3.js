let t,e,n=!1,s=!1;const l="undefined"!=typeof window?window:{},o=l.CSS,r=l.document||{head:{}},i={t:0,s:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s)},c=(()=>(r.head.attachShadow+"").indexOf("[native")>-1)(),a=t=>Promise.resolve(t),u=(()=>{try{return new CSSStyleSheet,!0}catch(t){}return!1})(),f=new WeakMap,p=t=>"sc-"+t,m={},d=t=>"object"==(t=typeof t)||"function"===t,w=(t,e,...n)=>{let s=null,l=!1,o=!1,r=[];const i=e=>{for(let n=0;n<e.length;n++)s=e[n],Array.isArray(s)?i(s):null!=s&&"boolean"!=typeof s&&((l="function"!=typeof t&&!d(s))&&(s+=""),l&&o?r[r.length-1].l+=s:r.push(l?$(null,s):s),o=l)};if(i(n),e){const t=e.className||e.class;t&&(e.class="object"!=typeof t?t:Object.keys(t).filter(e=>t[e]).join(" "))}const c=$(t,null);return c.o=e,r.length>0&&(c.u=r),c},$=(t,e)=>({t:0,p:t,l:e,$:null,u:null,o:null}),h={},b=(t,e,n,s,o,r)=>{if(n!==s){let a=G(t,e),u=e.toLowerCase();if("class"===e){const e=t.classList,l=v(n),o=v(s);e.remove(...l.filter(t=>t&&!o.includes(t))),e.add(...o.filter(t=>t&&!l.includes(t)))}else if("ref"===e)s&&s(t);else if(a||"o"!==e[0]||"n"!==e[1]){const l=d(s);if((a||l&&null!==s)&&!o)try{if(t.tagName.includes("-"))t[e]=s;else{let l=null==s?"":s;"list"===e?a=!1:null!=n&&t[e]==l||(t[e]=l)}}catch(c){}null==s||!1===s?t.removeAttribute(e):(!a||4&r||o)&&!l&&t.setAttribute(e,s=!0===s?"":s)}else e="-"===e[2]?e.slice(3):G(l,u)?u.slice(2):u[2]+e.slice(3),n&&i.rel(t,e,n,!1),s&&i.ael(t,e,s,!1)}},y=/\s/,v=t=>t?t.split(y):[],_=(t,e,n,s)=>{const l=11===e.$.nodeType&&e.$.host?e.$.host:e.$,o=t&&t.o||m,r=e.o||m;for(s in o)s in r||b(l,s,o[s],void 0,n,e.t);for(s in r)b(l,s,o[s],r[s],n,e.t)},g=(e,s,l)=>{let o,i,c=s.u[l],a=0;if(null!==c.l)o=c.$=r.createTextNode(c.l);else{if(n||(n="svg"===c.p),o=c.$=r.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",c.p),n&&"foreignObject"===c.p&&(n=!1),_(null,c,n),null!=t&&o["s-si"]!==t&&o.classList.add(o["s-si"]=t),c.u)for(a=0;a<c.u.length;++a)i=g(e,c,a),i&&o.appendChild(i);"svg"===c.p?n=!1:"foreignObject"===o.tagName&&(n=!0)}return o},j=(t,n,s,l,o,r)=>{let i,c=t;for(c.shadowRoot&&c.tagName===e&&(c=c.shadowRoot);o<=r;++o)l[o]&&(i=g(null,s,o),i&&(l[o].$=i,c.insertBefore(i,n)))},M=(t,e,n,s,l)=>{for(;e<=n;++e)(s=t[e])&&(l=s.$,R(s),l.remove())},O=(t,e)=>t.p===e.p,S=(t,e)=>{const s=e.$=t.$,l=t.u,o=e.u,r=e.p,i=e.l;null===i?(n="svg"===r||"foreignObject"!==r&&n,_(t,e,n),null!==l&&null!==o?((t,e,n,s)=>{let l,o=0,r=0,i=e.length-1,c=e[0],a=e[i],u=s.length-1,f=s[0],p=s[u];for(;o<=i&&r<=u;)null==c?c=e[++o]:null==a?a=e[--i]:null==f?f=s[++r]:null==p?p=s[--u]:O(c,f)?(S(c,f),c=e[++o],f=s[++r]):O(a,p)?(S(a,p),a=e[--i],p=s[--u]):O(c,p)?(S(c,p),t.insertBefore(c.$,a.$.nextSibling),c=e[++o],p=s[--u]):O(a,f)?(S(a,f),t.insertBefore(a.$,c.$),a=e[--i],f=s[++r]):(l=g(e&&e[r],n,r),f=s[++r],l&&c.$.parentNode.insertBefore(l,c.$));o>i?j(t,null==s[u+1]?null:s[u+1].$,n,s,r,u):r>u&&M(e,o,i)})(s,l,e,o):null!==o?(null!==t.l&&(s.textContent=""),j(s,null,e,o,0,o.length-1)):null!==l&&M(l,0,l.length-1),n&&"svg"===r&&(n=!1)):t.l!==i&&(s.data=i)},R=t=>{t.o&&t.o.ref&&t.o.ref(null),t.u&&t.u.map(R)},U=t=>V(t).h,k=(t,e,n)=>{const s=U(t);return{emit:t=>L(s,e,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:t})}},L=(t,e,n)=>{const s=new CustomEvent(e,n);return t.dispatchEvent(s),s},C=(t,e)=>{e&&!t.v&&e["s-p"].push(new Promise(e=>t.v=e))},P=(t,e)=>{if(t.t|=16,4&t.t)return void(t.t|=512);const n=t._,s=()=>x(t,n,e);return C(t,t.g),T(void 0,()=>st(s))},x=(n,s,l)=>{const o=n.h,i=o["s-rc"];l&&(t=>{const e=t.j,n=t.h,s=e.t,l=((t,e)=>{let n=p(e.M),s=Q.get(n);if(t=11===t.nodeType?t:r,s)if("string"==typeof s){let e,l=f.get(t=t.head||t);l||f.set(t,l=new Set),l.has(n)||(e=r.createElement("style"),e.innerHTML=s,t.insertBefore(e,t.querySelector("link")),l&&l.add(n))}else t.adoptedStyleSheets.includes(s)||(t.adoptedStyleSheets=[...t.adoptedStyleSheets,s]);return n})(c&&n.shadowRoot?n.shadowRoot:n.getRootNode(),e);10&s&&(n["s-sc"]=l,n.classList.add(l+"-h"))})(n),((n,s)=>{const l=n.h,o=n.O||$(null,null),r=(t=>t&&t.p===h)(s)?s:w(null,null,s);e=l.tagName,r.p=null,r.t|=4,n.O=r,r.$=o.$=l.shadowRoot||l,t=l["s-sc"],S(o,r)})(n,A(s)),n.t&=-17,n.t|=2,i&&(i.map(t=>t()),o["s-rc"]=void 0);{const t=o["s-p"],e=()=>E(n);0===t.length?e():(Promise.all(t).then(e),n.t|=4,t.length=0)}},A=t=>{try{t=t.render()}catch(e){I(e)}return t},E=t=>{const e=t.h,n=t.g;64&t.t||(t.t|=64,H(e),t.S(e),n||F()),t.v&&(t.v(),t.v=void 0),512&t.t&&nt(()=>P(t,!1)),t.t&=-517},F=()=>{H(r.documentElement),nt(()=>L(l,"appload",{detail:{namespace:"s-vis"}}))},T=(t,e)=>t&&t.then?t.then(e):e(),H=t=>t.classList.add("hydrated"),W=(t,e,n)=>{if(e.R){const s=Object.entries(e.R),l=t.prototype;if(s.map(([t,[s]])=>{(31&s||2&n&&32&s)&&Object.defineProperty(l,t,{get(){return((t,e)=>V(this).U.get(e))(0,t)},set(n){((t,e,n,s)=>{const l=V(this),o=l.U.get(e),r=l.t,i=l._;n=((t,e)=>null==t||d(t)?t:2&e?parseFloat(t):1&e?t+"":t)(n,s.R[e][0]),8&r&&void 0!==o||n===o||(l.U.set(e,n),i&&2==(18&r)&&P(l,!1))})(0,t,n,e)},configurable:!0,enumerable:!0})}),1&n){const e=new Map;l.attributeChangedCallback=function(t,n,s){i.jmp(()=>{const n=e.get(t);this[n]=(null!==s||"boolean"!=typeof this[n])&&s})},t.observedAttributes=s.filter(([t,e])=>15&e[0]).map(([t,n])=>{const s=n[1]||t;return e.set(s,t),s})}}return t},q=t=>{(t=>{if(t&&t.connectedCallback)try{t.connectedCallback(void 0)}catch(e){I(e)}})(t)},B=(t,e={})=>{const n=[],s=e.exclude||[],o=l.customElements,a=r.head,f=a.querySelector("meta[charset]"),m=r.createElement("style"),d=[];let w,$=!0;Object.assign(i,e),i.s=new URL(e.resourcesUrl||"./",r.baseURI).href,t.map(t=>t[1].map(e=>{const l={t:e[0],M:e[1],R:e[2],k:e[3]};l.R=e[2],!c&&1&l.t&&(l.t|=8);const r=l.M,a=class extends HTMLElement{constructor(t){super(t),D(t=this,l),1&l.t&&(c?t.attachShadow({mode:"open"}):"shadowRoot"in t||(t.shadowRoot=t))}connectedCallback(){w&&(clearTimeout(w),w=null),$?d.push(this):i.jmp(()=>(t=>{if(0==(1&i.t)){const e=V(t),n=e.j,s=()=>{};if(1&e.t)q(e._);else{e.t|=1;{let n=t;for(;n=n.parentNode||n.host;)if(n["s-p"]){C(e,e.g=n);break}}n.R&&Object.entries(n.R).map(([e,[n]])=>{if(31&n&&t.hasOwnProperty(e)){const n=t[e];delete t[e],t[e]=n}}),(async(t,e,n,s,l)=>{if(0==(32&e.t)){e.t|=32;{if((l=K(n)).then){const t=()=>{};l=await l,t()}l.isProxied||(W(l,n,2),l.isProxied=!0);const t=()=>{};e.t|=8;try{new l(e)}catch(i){I(i)}e.t&=-9,t(),q(e._)}const t=p(n.M);if(!Q.has(t)&&l.style){const e=()=>{};let s=l.style;8&n.t&&(s=await __sc_import_s_vis("./p-f5bab17b.js").then(e=>e.scopeCss(s,t,!1))),((t,e,n)=>{let s=Q.get(t);u&&n?(s=s||new CSSStyleSheet,s.replace(e)):s=e,Q.set(t,s)})(t,s,!!(1&n.t)),e()}}const o=e.g,r=()=>P(e,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(0,e,n)}s()}})(this))}disconnectedCallback(){i.jmp(()=>{})}forceUpdate(){(()=>{{const t=V(this);t.h.isConnected&&2==(18&t.t)&&P(t,!1)}})()}componentOnReady(){return V(this).L}};l.C=t[0],s.includes(r)||o.get(r)||(n.push(r),o.define(r,W(a,l,1)))})),m.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",m.setAttribute("data-styles",""),a.insertBefore(m,f?f.nextSibling:a.firstChild),$=!1,d.length?d.map(t=>t.connectedCallback()):i.jmp(()=>w=setTimeout(F,30))},N=new WeakMap,V=t=>N.get(t),z=(t,e)=>N.set(e._=t,e),D=(t,e)=>{const n={t:0,h:t,j:e,U:new Map};return n.L=new Promise(t=>n.S=t),t["s-p"]=[],t["s-rc"]=[],N.set(t,n)},G=(t,e)=>e in t,I=t=>console.error(t),J=new Map,K=t=>{const e=t.M.replace(/-/g,"_"),n=t.C,s=J.get(n);return s?s[e]:__sc_import_s_vis(`./${n}.entry.js`).then(t=>(J.set(n,t),t[e]),I)},Q=new Map,X=[],Y=[],Z=(t,e)=>n=>{t.push(n),s||(s=!0,e&&4&i.t?nt(et):i.raf(et))},tt=t=>{for(let n=0;n<t.length;n++)try{t[n](performance.now())}catch(e){I(e)}t.length=0},et=()=>{tt(X),tt(Y),(s=X.length>0)&&i.raf(et)},nt=t=>a().then(t),st=Z(Y,!0),lt=()=>o&&o.supports&&o.supports("color","var(--c)")?a():__sc_import_s_vis("./p-69b85284.js").then(()=>(i.P=l.__cssshim)?(!1).i():0),ot=()=>{i.P=l.__cssshim;const t=Array.from(r.querySelectorAll("script")).find(t=>/\/s-vis(\.esm)?\.js($|\?|#)/.test(t.src)||"s-vis"===t.getAttribute("data-stencil-namespace")),e=t["data-opts"]||{};return"onbeforeload"in t&&!history.scrollRestoration?{then(){}}:(e.resourcesUrl=new URL(".",new URL(t.getAttribute("data-resources-url")||t.src,l.location.href)).href,rt(e.resourcesUrl,t),l.customElements?a(e):__sc_import_s_vis("./p-2347dcb6.js").then(()=>e))},rt=(t,e)=>{try{l.__sc_import_s_vis=Function("w",`return import(w);//${Math.random()}`)}catch(n){const s=new Map;l.__sc_import_s_vis=n=>{const o=new URL(n,t).href;let i=s.get(o);if(!i){const t=r.createElement("script");t.type="module",t.crossOrigin=e.crossOrigin,t.src=URL.createObjectURL(new Blob([`import * as m from '${o}'; window.__sc_import_s_vis.m = m;`],{type:"application/javascript"})),i=new Promise(e=>{t.onload=()=>{e(l.__sc_import_s_vis.m),t.remove()}}),s.set(o,i),r.head.appendChild(t)}return i}}};export{h as H,lt as a,B as b,k as c,U as g,w as h,ot as p,z as r}