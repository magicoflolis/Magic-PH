// https://stackoverflow.com/questions/56360225/how-to-detect-microsoft-chromium-edge-chredge-edgium-in-javascript

var browser = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1: return "edge";
        case agent.indexOf("edg/") > -1: return "chromium based edge (dev or canary)"; // Match also / to avoid matching for the older Edge
        case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
        case agent.indexOf("trident") > -1: return "ie";
        case agent.indexOf("firefox") > -1: return "firefox";
        case agent.indexOf("safari") > -1: return "safari";
        default: return "other";
    }
})(window.navigator.userAgent.toLowerCase());
document.body.innerHTML = window.navigator.userAgent.toLowerCase() + "<br>" + browser;
