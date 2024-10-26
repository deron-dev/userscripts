// ==UserScript==
// @name         Remove Watched YouTube Videos
// @description  Remove Watched YouTube Videos
// @namespace    http://tampermonkey.net/
// @version      2024-10-26
// @author       deron
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://raw.githubusercontent.com/deron-dev/userscripts/refs/heads/master/hide-watched-youtube-videos.js
// ==/UserScript==

/** @type number */
const MIN_WIDTH_PERCENT = 90;
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
            if (width.unit == "percent" && width.value >= MIN_WIDTH_PERCENT) {
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
