/**
 * Live local date/time for website consumers.
 * Updates continuously while the page is open.
 * Independent of knowledge chronology / last-updated fields.
 *
 * Prefer /scripts/site-chrome.js for the combined clock + theme chrome.
 *
 * Usage:
 *   <div id="live-clock" class="live-clock" aria-live="off"></div>
 *   <script src="/scripts/live-clock.js" defer></script>
 */
(function () {
  "use strict";

  var SELECTOR = "[data-live-clock], #live-clock";
  var INTERVAL_MS = 1000;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function format(date) {
    var y = date.getFullYear();
    var m = pad(date.getMonth() + 1);
    var d = pad(date.getDate());
    var h = pad(date.getHours());
    var min = pad(date.getMinutes());
    var s = pad(date.getSeconds());
    var tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {
      tz = "";
    }
    return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s + (tz ? " " + tz : "");
  }

  function tick(nodes) {
    var text = format(new Date());
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = text;
    }
  }

  function start() {
    var nodes = document.querySelectorAll(SELECTOR);
    if (!nodes.length) return;
    tick(nodes);
    setInterval(function () {
      tick(nodes);
    }, INTERVAL_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
