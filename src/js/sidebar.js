import { $, code, iframe, catlist, mNav } from "./core.js";
let sn = $('.sidenav'),
magicN = $('#magicNav');

iframe.setAttribute("id", "myframe");

// Opens Sidebar
$('.logoWrapper > a[itemprop="url"]').click((e) => {
    e.preventDefault();
    sn.show();
});

// Restores original
$(".container").click(() => {
    $("#myframe").remove();
    $(".sidenav > div").remove();
    sn.attr("style", "width: 250px");
    magicN.show();
    sn.hide();
});
$(".sidenav > a.cat").click(() => {
    magicN.hide();
    sn.attr("style", "width: 300px");
    catlist.innerHTML = code;
    mNav.appendChild(catlist);
    sn.show();
});
$(".sidenav > a.rec").click(() => {
    magicN.hide();
    sn.attr("style", "width: 75vw");
    iframe.src = "/recommended";
    iframe.setAttribute("style", "width: 75vw");
    mNav.appendChild(iframe);
    sn.show();
});
$(".sidenav > a.tas").click(() => {
    magicN.hide();
    sn.attr("style", "width: 50vw");
    iframe.src = "/recommended/taste";
    iframe.setAttribute("style", "width: 50vw");
    mNav.appendChild(iframe);
    sn.show();
});
iframe.onload = () => {
    let x = document.getElementById("myframe"),
        y = x.contentDocument ? x.contentDocument : x.contentWindow.document,
        iHeader = y.getElementById("header"),
        irST = y.querySelector(".sectionWrapper > .sectionTitle"),
        irRM = y.querySelector(".sectionWrapper > .recommendationsMessages"),
        itTI = y.querySelector(".taste-instruction"),
        itST = y.querySelector(".sectionTitle");
    iHeader.setAttribute("style", "display: none !important;");
    if (y.location.pathname == "/recommended") {
        irRM.setAttribute("style", "display: none !important;");
        irST.setAttribute("style", "display: none !important;");
    }
    if (y.location.pathname == "/recommended/taste") {
        itTI.setAttribute("style", "display: none !important;");
        itST.setAttribute("style", "display: none !important;");
    }
};

// if($('header.magicph').length) {
//     PH.Find();
// } else {
//     $('header').attr('class','iframe');
// }
