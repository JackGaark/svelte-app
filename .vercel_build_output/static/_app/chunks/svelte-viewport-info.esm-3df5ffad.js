var v=window.matchMedia||window.webkitMatchmedia||window.mozMatchmedia||window.oMatchmedia;function h(r){return v!=null&&v(r).matches}function s(){return document.readyState==="interactive"||document.readyState==="complete"}var n=0,i=0;function u(){n=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),i=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)}u();var e=void 0,t=void 0;function a(){var r;switch("orientation"in window.Screen&&(r=window.screen.orientation.type),r){case"portrait-primary":case"portrait-secondary":e="portrait",t=r;break;case"landscape-primary":case"landscape-secondary":e="landscape",t=r;break;default:switch(!0){case h("(orientation:portrait)"):e="portrait";break;case h("(orientation:landscape)"):case n>i:e="landscape";break;default:e="portrait"}t=void 0}if(s()){switch(document.body.classList.remove("Portrait","Landscape","Portrait-primary","Portrait-secondary","Landscape-primary","Landscape-secondary"),e){case"portrait":document.body.classList.add("Portrait");break;case"landscape":document.body.classList.add("Landscape");break}if(t!=null){var L=function(f){return f[0].toUpperCase()+f.slice(1)};document.body.classList.add(L(t))}}}a();s()||window.addEventListener("DOMContentLoaded",a);var o=n,d=i,b=e,y=t;function l(){o=n,d=i,b=e,y=t}function p(){!s()||((o!==n||d!==i)&&document.body.dispatchEvent(new Event("viewportchanged",{bubbles:!0,cancelable:!0})),(b!==e||y!==t)&&document.body.dispatchEvent(new Event("orientationchangeend",{bubbles:!0,cancelable:!0})))}var c,m=0,S=10;function g(){clearInterval(c),c=void 0,m=0}function E(){c=setInterval(function(){u(),!(o===n&&d===i&&(m+=1,m<=S))&&(g(),a(),p(),l())},100)}function w(){u(),a(),c!=null&&(g(),p(),l()),o===n&&d===i?E():(p(),l())}window.addEventListener("orientationchange",function(){setTimeout(w,10)});window.addEventListener("resize",w);"orientation"in screen&&screen.orientation.addEventListener("change",function(){setTimeout(w,10)});var O={get Width(){return n},get Height(){return i},get Orientation(){return e},get detailledOrientation(){return t}};export{O as default};