(()=>{"use strict";const e="undefined"==typeof browser?chrome:browser,s=/view_video.php/,t=(s,t=!0)=>{let r,n=document;r=n.createElement("script"),r.async=!0,r.type="module",r.src=e.runtime.getURL(s),r.crossOrigin="anonymous",(n.head||n.documentElement||n).appendChild(r),r&&t&&r.remove()};window.onload=()=>{t("js/magicph.js"),t("web_accessible_resources/jquery.min.js"),s.test(window.location.href)&&(localStorage.getItem("altplayers")&&((s=>{let t,r=document;t=r.createElement("link"),t.rel="stylesheet",t.href=e.runtime.getURL(s),(r.head||r.documentElement||r).appendChild(t)})("css/plyr.css"),t("web_accessible_resources/plyr.min.js",!1)),t("js/player.js"))}})();
//# sourceMappingURL=injector.js.map