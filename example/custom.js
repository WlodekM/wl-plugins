// ==Plugin==
// @name Example
// @description Example custom plugin
// @author WlodekM
// ==/Plugin==

log("Example plugin loaded")

wl.events.addEventListener("addSettingsPages", function () {
    wl.util.addSettingsPage('example', {
        displayName: "Example settings page",
        func: function load() {
            // Scrolls to top
            setTop();
            // Get settings page element
            let pageContainer = document.querySelector(".settings");
            // Set page content
            pageContainer.innerHTML = `<h1>Example plugin settings page</h1>
            <p id="example:counter">Count: 0</p>
            <button class="button" id="example:button">Click me!</button>`;

            let count = 0
            let counter = document.getElementById("example:counter");
            let button = document.getElementById("example:button");

            button.addEventListener("click", function () {
                count++;
                counter.innerText = `Count: ${count}`
            })
        }
    })
})