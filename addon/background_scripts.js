!function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="/",r(r.s=15)}([function(e,r,t){"use strict";function n(e){console.error(e)}function o(e){console.info(e)}function a(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}function s(e){return browser.i18n.getMessage(e)}function i(e){var r=[];for(var t in e)if(e.hasOwnProperty(t)){if("days"===t&&0===e[t])continue;var n=e[t]>=10?"":"0";r.push(n+e[t])}return r.join(":")}e.exports={handleResponse:o,handleError:n,toTitleCase:a,getLocalString:s,formatTime:i}},function(e,r,t){"use strict";var n=t(0),o=n.getLocalString,a=o("extensionName"),s="["+a+"] ",i="[event] ";e.exports={TAG:s,eventTAG:i}},function(e,r,t){"use strict";var n={id:"alarmWork",interval:50},o={id:"alarmBreak",interval:10},a={id:"alarmCounter",interval:1},s=[n.id,o.id];e.exports={alarmWork:n,alarmBreak:o,alarmCounter:a,alarmKeys:s}},function(e,r,t){"use strict";var n=t(2),o=(n.alarmWork,n.alarmBreak,n.alarmKeys,t(0)),a=(o.handleError,t(1)),s=a.TAG,i=t(7),c={TAG:"[Alarms] ",start:function(e){var r=i.get(e);browser.alarms.create(e,{delayInMinutes:r})},stop:function(){console.log(s+c.TAG+"stop..."),browser.alarms.clearAll()},reload:function(){i.load({callback:c.restart})},restart:function(){console.log(s+c.TAG+"restart..."),browser.alarms.getAll().then(function(e){return e.map(function(e){return e.name})}).then(function(e){browser.alarms.clearAll(),e.forEach(function(e){c.start(e)})})}};e.exports=c},function(e,r,t){"use strict";var n=t(8),o=(n.clockLimit,n.time),a=t(2),s=a.alarmCounter,i=t(0),c=(i.handleResponse,i.handleError),l=t(1),u=l.TAG,d={TAG:"[Counter] ",units:["mins","hours","days"],reversed:!1,id:s.id,interval:s.interval,skipLog:!1,start:function(){browser.alarms.create(d.id,{periodInMinutes:d.interval})},stop:function(){console.log(u+d.TAG+"stop..."),browser.alarms.clear(d.id),d.time.reset()},reverse:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];d.reversed=e},time:{set:function(e){o.mins=e},reset:function(){for(var e in o)o[e]=0},count:function(e){o.mins+=e}},ui:{sync:function(){browser.extension.getViews({type:"popup"}).length&&browser.runtime.sendMessage({time:o,reversed:d.reversed}).catch(c)}}};e.exports=d},function(e,r,t){"use strict";function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var o,a=t(2),s=a.alarmWork,i=a.alarmBreak,c={TAG:"[Icon] ",paths:(o={},n(o,s.id,"icons/set-timer-button.png"),n(o,i.id,"icons/set-timer-button-red.png"),o),set:function(e){try{browser.browserAction.setIcon({path:c.paths[e]})}catch(e){console.error(e)}}};e.exports=c},function(e,r,t){"use strict";var n=t(2),o=n.alarmBreak,a=t(1),s=(a.TAG,{type:"basic",iconUrl:browser.extension.getURL("icons/notification.png"),title:browser.i18n.getMessage("notificationTitle"),message:browser.i18n.getMessage("notificationContent")}),i={TAG:"[notice] ",create:function(){browser.notifications.create(o.id,s)},clear:function(){browser.notifications.clear(o.id)}};e.exports=i},function(e,r,t){"use strict";function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var o,a=t(2),s=a.alarmWork,i=a.alarmBreak,c=(a.alarmKeys,t(0)),l=c.handleError,u={store:(o={},n(o,s.id,s.interval),n(o,i.id,i.interval),n(o,"idleDetectionInterval",60*i.interval),o),get:function(e){return u.store[e]},load:function(e){var r=e.callback,t=e.params;browser.storage.local.get(Object.keys(u.store)).then(function(e){for(var n in e)u.store[n]=e[n];r&&r(t)},l)}};e.exports=u},function(e,r,t){"use strict";var n={days:365,hours:24,mins:60},o={days:0,hours:0,mins:0};e.exports={clockLimit:n,time:o}},,function(e,r,t){"use strict";var n=t(1),o=n.TAG,a=t(2),s=a.alarmWork,i=t(3),c=t(4),l=t(6),u=t(5),d=!1,f={TAG:"[idle] ",setInterval:function(e){browser.idle.setDetectionInterval(e)},dispatch:function(e){switch(e){case"active":d&&(console.log(o+f.TAG+"re-activate..."),i.start(s.id),c.start(),d=!1);break;case"locked":console.log(o+f.TAG+"system locked, stop and reset..."),c.stop(),i.stop(),u.set(s.id),l.clear(),c.reverse(!1),c.ui.sync(),d=!0}},detect:{start:function(){browser.idle.onStateChanged.addListener(f.dispatch)},stop:function(){browser.idle.onStateChanged.removeListener(f.dispatch)}}};e.exports=f},,,,,function(e,r,t){"use strict";function n(e,r){g.reverse(e),g.time.reset(),g.ui.sync(),v.set(r)}function o(){h.start(l.id),n(!1,l.id)}function a(){h.start(u.id),y.create(),n(!0,u.id)}var s=t(1),i=s.TAG,c=t(2),l=c.alarmWork,u=c.alarmBreak,d=c.alarmCounter,f=t(0),m=(f.handleResponse,f.handleError),p=t(8),b=(p.clockLimit,p.time),v=t(5),g=t(4),h=t(3),w=t(10),k=t(7),y=t(6);k.load({callback:function(){o(),g.start(),w.detect.start()}}),browser.alarms.onAlarm.addListener(function(e){switch(e.name){case l.id:a();break;case u.id:o();break;case d.id:g.time.count(d.interval),g.ui.sync()}}),browser.runtime.onMessage.addListener(function(e,r,t){switch(e.type){case"requestTime":break;case"resetCounter":h.stop(),g.stop(),o()}return browser.extension.getViews({type:"popup"}).length&&browser.runtime.sendMessage({time:b,reversed:g.reversed}).catch(m),!0}),browser.storage.onChanged.addListener(function(e,r){"local"===r&&(console.log(i+"[storage] changed"),h.reload())}),browser.browserAction.onClicked.addListener(function(){browser.notifications.clear(u.id)})}]);