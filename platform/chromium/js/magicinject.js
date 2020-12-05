function start() {
    // eslint-disable-next-line no-undef
    let debug = "[Magic PH] ",
        s = document.createElement("script"),
        g = document.location.origin,
        xhr = new XMLHttpRequest(),
        magicinject = () => {
            xhr.open("GET", g);
            s.src = chrome.runtime.getURL("js/magicph.js");
            s.setAttribute("type", "module");
            s.setAttribute("crossorigin", "anonymous");
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 2 && xhr.status == 200) {
                    try {
                        document.head.appendChild(s);
                        // document.head.appendChild(t);
                    } catch (err) {
                        s.remove();
                        console.log(debug + "Failed to inject ${s.src}");
                    }
                }
            };
        };
    return magicinject();
}
start();

// eslint-disable-next-line no-undef
// const chrome = browser;
// const debug = "[Magic PH] ";
// const xhr = new XMLHttpRequest();
// const s = document.createElement("script");
// s.src = chrome.runtime.getURL("js/magicph.js");
// s.setAttribute("type", "module");
// s.setAttribute("crossorigin", "anonymous");
// xhr.open("GET", "https://pornhub.com");
// xhr.onreadystatechange = () => {
//     if (xhr.readyState == 2 && xhr.status == 200) {
//         try {
//             document.head.appendChild(s);
//             // document.head.appendChild(t);
//         } catch (err) {
//             s.remove();
//             console.log(debug + "Failed to inject magicph.");
//         }
//     }
// };
// xhr.send();
