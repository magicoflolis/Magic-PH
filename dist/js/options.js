brws.storage.local.get({debug:!0,altplayers:"none",seektime:4,autojump:!1,autoscroll:!0,blurimg:!1,comments:!1,topbutton:!0,sidebar:!0,favorites:"",blacklist:"none",headerOrder:["home","videos","categories","pornstars","gifs","recommended","favorites"],headerLinks:{url:{h1_link:"/",h2_link:"/",h3_link:"/",h4_link:"/",h5_link:"/",h6_link:"/",h7_link:"/",h8_link:"/"},name:{h1_link:"/",h2_link:"/",h3_link:"/",h4_link:"/",h5_link:"/",h6_link:"/",h7_link:"/",h8_link:"/"}}},(e=>{let l=self.document.querySelector("form.magicph_cfg")??console.error("[%cMagicPH%c] %cERROR","color: rgb(255,153,0);","","color: rgb(249, 24, 128);","Can't find form");for(let n in e)n in l.elements&&("checkbox"==l.elements[n].type?l.elements[n].checked=e[n]:l.elements[n].value=e[n]);l.addEventListener("change",(l=>{let n=l.target;"checkbox"==n.type?e[n.name]=n.checked:e[n.name]=n.value,brws.storage.local.set(e)}))}));