function magicLogo() {
    let i = document.createElement("input"),
        d = document.createElement("div"),
        a = document.createElement("a"),
        sidebar = document.querySelector(".logoWrapper > a:nth-child(1)"),
        lg = document.querySelector(
            ".logoWrapper > a:nth-child(1) > img:nth-child(1)"
        ),
        logo = () => {
            i.setAttribute("id", "btnMenuList");
            i.setAttribute("value", "Top");
            i.setAttribute("type", "button");
            document.querySelector(".headerSearchWrapper").appendChild(i);
            d.setAttribute("class", "sidenav");
            lg.setAttribute("title", "MagicPH");
            // eslint-disable-next-line no-undef
            lg.src = chrome.runtime.getURL("img/mph.png");
            sidebar.setAttribute("type", "button");
            document.body.appendChild(d);
            a.innerText = "Taste Profile";
            document.querySelector(".sidenav").appendChild(a);
        };
    return logo();
}
magicLogo();

// const iframe = document.createElement("iframe");
// iframe.setAttribute("class", "tasty");
// iframe.src = "/recommended/taste";

// document.querySelector('.sidenav').appendChild(iframe);
// const t = document.createElement("script");
// const tsrc = chrome.runtime.getURL("ph/mg_utils-1.0.0.js");
// btn = document.querySelector("#btnMenuList");
// t.setAttribute('type', 'script');
// t.src = tsrc;
// t.setAttribute('crossorigin', 'anonymous');
// document.body.appendChild(t);
