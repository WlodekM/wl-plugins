// ==Plugin==
// @name party
// @description Brings back the birthday confetti
// ==/Plugin==

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js";
document.head.appendChild(script);

wl.events.addEventListener("ready", function () {
    birthday = 1;
})
