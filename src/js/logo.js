/* eslint-disable no-undef */
let inp = document.createElement("input"),
    d = document.createElement("div"),
    sidebar = document.querySelector('.logoWrapper > a[itemprop="url"]'),
    lg = document.querySelector('.logoWrapper > a:nth-child(1) > img:nth-child(1)'),
    magicNav =
        '<a id="magicNav" class="cat">Catagories</a>\n<a id="magicNav" class="rec">Recommended</a>\n<a id="magicNav" class="tas">Taste Profile</a>';
sidebar.setAttribute("type", "button");
inp.setAttribute("id", "magicTop");
inp.setAttribute("value", "Top");
inp.setAttribute("type", "button");
inp.onclick = () => {
    document.body.scrollTop = 100;
    document.documentElement.scrollTop = 100;
};
lg.setAttribute("title", "MagicPH");
lg.src = browser.runtime.getURL("img/mph.webp");
d.setAttribute("id", "mySidenav");
d.setAttribute("class", "sidenav");
d.innerHTML = magicNav;
document.querySelector(".headerSearchWrapper").appendChild(inp);
document.body.appendChild(d);
