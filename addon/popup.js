!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=18)}([function(e,t,n){"use strict";function r(e){console.error(e)}function o(e){console.info(e)}function u(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}function i(e){return browser.i18n.getMessage(e)}function s(e){a.debugMode&&console.log(e)}function c(e){var t=[];for(var n in e)if(e.hasOwnProperty(n)){if("days"===n&&0===e[n])continue;var r=e[n]>=10?"":"0";t.push(r+e[n])}return t.join(":")}var a=n(3);e.exports={handleResponse:o,handleError:r,toTitleCase:u,getLocalString:i,log:s,formatTime:c}},function(e,t,n){"use strict";var r=n(0),o=r.getLocalString,u=o("extensionName"),i="["+u+"] ",s="[event] ";e.exports={TAG:i,eventTAG:s}},,function(e,t,n){"use strict";e.exports={debugMode:!1}},,,,,,,,,,function(e,t,n){"use strict";var r=n(0),o=r.handleError,u=r.formatTime,i={dom:null,reversed:!1,request:function(){browser.runtime.sendMessage({type:"requestTime"}).then(i.ui.update,o)},reset:function(){browser.runtime.sendMessage({type:"resetCounter"}).then(i.ui.update,o)},ui:{locate:function(){i.dom||(i.dom=document.querySelector(".item.time"))},update:function(e){return i.ui.locate(),i.dom.innerHTML=u(e.time),i.reversed!==e.reversed&&i.dom.classList.toggle("warning",i.reversed=e.reversed),!0}}};e.exports=i},,function(e,t){},,,function(e,t,n){"use strict";n(15);var r=n(1),o=(r.TAG,r.eventTAG,n(13));window.onload=function(){browser.runtime.onMessage.addListener(o.ui.update),o.request(),document.querySelector("#refresh_button").addEventListener("click",o.reset),document.querySelector("#options_button").addEventListener("click",function(e){e.preventDefault(),browser.runtime.openOptionsPage()})},window.onunload=function(){browser.runtime.onMessage.removeListener(o.ui.update)}}]);