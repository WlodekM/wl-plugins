wl.events.addEventListener("addSettingsPages", function () {
    log("Adding default settings page")
    wl.util.addSettingsPage('wlodeksShenanigans', {
        displayName: "WL plugins",
        func: function load() {
            setTop();
            let pageContainer = document.querySelector(".settings");
            pageContainer.innerHTML = `
                <h1>WL plugins</h1>
                <div class="settings-section-outer">
                    ${Object.entries(wl.plugins.list).map(([p, d]) => `<div class="stg-section${wl.plugins.enabled_array().includes(p) ? " checked" : ""}${wl.plugins.list[p].alwayson ? " disabled" : ""}" id="${"wl-plugin-"+p}" ${!wl.plugins.list[p].alwayson ? `onclick='this.classList.toggle("checked");wl.plugins.toggle(${JSON.stringify(p)});modalPluginup()'` : ""}>
                        <label class="general-label">
                            <div class="general-desc">
                                ${d.name ?? `plugin.${p}.name`}
                                <p class="subsubheader">${d.description ?? `plugin.${p}.description`}</p>
                            </div>
                            <div class="settingstoggle">
                                <svg viewBox="0 0 24 24" height="20" width="20" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="check">
                                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                </svg>
                            </div>
                        </label>
                    </div>`).join("\n")}
                </div>
            `;
        }
    })
})

css(`.disabled .settingstoggle {
	background: var(--secondary) !important;
	border-color: var(--secondary) !important;
}

.disabled .check {
	color: var(--button-color) !important;
}`)

wl.events.addEventListener("page-start", ()=>{
    logCategory("misc", "gray", "Adding WL buttons")
    let wlButtonSection = document.createElement("div")
    wlButtonSection.classList.add("settings-section-outer")
    wlButtonSection.style.marginTop = "var(--button-margin)"
    let discordButton = document.createElement("button")
    discordButton.classList.add("button")
    discordButton.classList.add("stg-section")
    discordButton.innerText = "Join the WL plugins discord!";
    discordButton.addEventListener("click", ()=>window.open("https://discord.gg/vjD9sQ7uDG", '_blank').focus())
    wlButtonSection.appendChild(discordButton)
    document.querySelector('.explore').appendChild(wlButtonSection)
})