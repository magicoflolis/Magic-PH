"use strict";
let $ = window.$,
    chrome = browser;
$("input").click(() => {
    let setting = {
        blurimg: false,
        thumbnails: true,
        comments: false,
        autoscroll: true,
        topbutton: true,
        altplayers: false,
    };
    setting[$(this).attr("id")] = $(this).get(0).checked;
    chrome.storage.local.set(setting);
});

function restoreOptions() {
    // For each checkbox, see if stored value of setting has changed
    $("input").each(() => {
        let id = $(this).attr("id");
        chrome.storage.local.get(id, (setting) => {
            if (Object.keys(setting).length) {
                $("#" + id).get(0).checked = setting[id]
                    ? "checked"
                    : undefined;
            } else {
                // This block runs only the first time the settings page is opened.
                let cfg = {};
                cfg[id] = true;
                chrome.storage.local.set(cfg);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
