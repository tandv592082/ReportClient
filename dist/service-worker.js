if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>l(s,r),c={module:{uri:r},exports:u,require:o};e[r]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"work"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/365.6b991f89.css",revision:null},{url:"/css/430.91b9cf0b.css",revision:null},{url:"/css/586.ab5241fa.css",revision:null},{url:"/css/app.ebfa091d.css",revision:null},{url:"/css/chunk-vendors.1a54c0ca.css",revision:null},{url:"/img/feedback.db69f360.jpg",revision:null},{url:"/img/login_bg.c318c5af.jpg",revision:null},{url:"/index.html",revision:"9e9879aead60ec3f2e50642ce84d8bff"},{url:"/js/365.417f0d17.js",revision:null},{url:"/js/419.57c74028.js",revision:null},{url:"/js/430.4734bf0a.js",revision:null},{url:"/js/586.5417324b.js",revision:null},{url:"/js/838.d4dfee34.js",revision:null},{url:"/js/848.5faf6051.js",revision:null},{url:"/js/935.a836182c.js",revision:null},{url:"/js/968.687ff19d.js",revision:null},{url:"/js/app.34771a4c.js",revision:null},{url:"/js/chunk-vendors.75720a16.js",revision:null},{url:"/manifest.json",revision:"15570f6ca4d2d87cc836071623ae1021"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
