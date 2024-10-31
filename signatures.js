if(!localStorage.hasOwnProperty("signature")) localStorage.setItem("signature", "-# <:disceye:1256330753151733883> Only you can see this • [Dismiss message](https://wlodekm.github.io/is-you/)")

wl.events.addEventListener("ready", function () {
    function doMixin(func, origFunc) {
    	return function() {func();origFunc();}
    }
    
    log("Doing signature mixin")
    sendpost = doMixin(function () {
        const msgbox = document.getElementById('msg');
        const messageToAddAfterMessage = "\n"+(localStorage.getItem('signature') ?? "");
    	if(!msgbox.value.includes(messageToAddAfterMessage) && msgbox.value != '') {
            msgbox.value += messageToAddAfterMessage;
        }
    }, sendpost)
})

const settingsPages = {}

log("Adding signatures settings page")
settingsPages['signatures'] = {
    displayName: "Signatures",
    func: function load() {
        setTop();
        let pageContainer = document.querySelector(".settings");
        pageContainer.innerHTML = `
            <h1>Signatures</h1>
            <textarea value="${String(localStorage.getItem("signature") ?? "").replaceAll('"', "&quot;")}" placeholder="Type your signature here" onchange="localStorage.setItem('signature', this.value)"></textarea>
        `;
    }
}

logCategory("API", "#9400D3", "Doing mixin for settings pages")
let realLoadstgs = loadstgs;
loadstgs = function () {
    realLoadstgs()
    wl.events.fire("pageChange")
    wl.events.fire("page-" + page)
    navc = document.querySelector(".nav-top");
    for (pageid in settingsPages) {
        const pageData = settingsPages[pageid];
        navc.innerHTML += `
    <input type='button' class='settings-button button' id='submit' value='${pageData.displayName.replaceAll("'", "&apos;")}' onclick='window.settingsPages.${pageid}.func()' aria-label="${pageid}">`
    }
};
