// ==UserScript==
// @name         Remove YouTube Shorts
// @description  Remove YouTube Shorts
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @author       deron
// @match        https://www.youtube.com/feed/subscriptions
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://raw.githubusercontent.com/deron-dev/userscripts/refs/heads/master/hide-youtube-shorts.js
// @updateURL    https://raw.githubusercontent.com/deron-dev/userscripts/refs/heads/master/hide-youtube-shorts.js
// ==/UserScript==

/** @type number */
const INTERVAL_SECONDS = 2.5;

let shortsRemoved = false;

function removeShorts() {
    console.log("removeShorts");
    let candidates = document.querySelectorAll(
        "ytd-rich-section-renderer.ytd-rich-grid-renderer",
    );
    candidates.forEach((candidate) => {
        let title = candidate.querySelector(
            "span.ytd-rich-shelf-renderer#title",
        );
        if (!title) {
            return;
        }
        if (title.textContent == "Shorts") {
            shortsRemoved = true;
            candidate.remove();
        }
    });
}

(function() {
    "use strict";
    const intervalMilliseconds = INTERVAL_SECONDS * 1000;
    let intervals = [setInterval(removeShorts, intervalMilliseconds)];
    intervals.push(
        setInterval(() => {
            if (shortsRemoved) {
                console.log("clearIntervals");
                intervals.forEach((interval) => {
                    clearInterval(interval);
                });
            }
        }, intervalMilliseconds),
    );
})();
