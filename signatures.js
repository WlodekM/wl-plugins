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

wl.events.addEventListener("addSettingsPages", function () {
    log("Adding signatures settings page")
    wl.util.addSettingsPage('signatures', {
        displayName: "Signatures",
        func: function load() {
            setTop();
            let pageContainer = document.querySelector(".settings");
            pageContainer.innerHTML = `
                <h1>Signatures</h1>
                <input value="${String(localStorage.getItem("signature") ?? "").replaceAll('"', "&quot;")}" placeholder="Type your signature here" onchange="localStorage.setItem('signature', this.value)">
            `;
        }
    })
})