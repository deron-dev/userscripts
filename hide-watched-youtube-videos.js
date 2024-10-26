// ==UserScript==
// @name         Remove Watched YouTube Videos
// @description  Remove Watched YouTube Videos
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @author       deron
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/feed/subscriptions
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://raw.githubusercontent.com/deron-dev/userscripts/refs/heads/master/hide-watched-youtube-videos.js
// @updateURL    https://raw.githubusercontent.com/deron-dev/userscripts/refs/heads/master/hide-watched-youtube-videos.js
// ==/UserScript==

/** @type number */
const MIN_PROGRESS_PERCENT = 90;
/** @type number */
const INTERVAL_SECONDS = 2.5;
// const DEBUG_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Farmer_meme_with_apostrophe.jpg/1920px-Farmer_meme_with_apostrophe.jpg" // DEBUG

function removeWatchedVideos() {
    /** @type HTMLElement[] */
    let videos = document.querySelectorAll(
        "ytd-rich-item-renderer.ytd-rich-grid-renderer",
    );

    videos.forEach((video) => {
        let progressBar = video.querySelector("#progress");
        if (progressBar) {
            let width = progressBar.computedStyleMap().get("width");
            if (width == undefined) {
                throw new Error("no progress bar width in computed style map");
            }
            if (width.unit == "percent" && width.value >= MIN_PROGRESS_PERCENT) {
                // video.querySelector('img').setAttribute('src', DEBUG_IMG) // DEBUG
                video.remove();
            }
        }
    });
}

(function () {
    "use strict";

    const intervalMilliseconds = INTERVAL_SECONDS * 1000;
    setInterval(removeWatchedVideos, intervalMilliseconds);
})();
