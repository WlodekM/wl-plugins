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
                <h2>Custom pluginse</h2>
                <div class="settings-section-outer">
                    ${wl.plugins.custom.map(p => `<div class="stg-section" onclick="if(confirm('really delete plugin?')) {wl.plugins.custom.splice(0, 1);localStorage.setItem('wlc', JSON.stringify(wl.plugins.custom));modalPluginup()}">
                        <div class="general-desc">
                            ${p.name ?? `plugin.name`}
                            <p class="subsubheader">${p.description ?? `plugin.description`}</p>
                        </div>
                    </div>`)}
                </div>
                <h3>Add custom plugin</h3>
                <br>
                <input type='file' accept='application/javascript' id='pluginInput'><br>
            `;
            document.getElementById("pluginInput").addEventListener('change', (event)=>{
                var input = event.target;

                var reader = new FileReader();
                reader.onload = function() {
                    var text = reader.result;
                    let name = prompt("Plugin name")
                    let description = prompt("Plugin description")
                    wl.plugins.custom.push({
                        name,
                        description,
                        script: text
                    });
                    localStorage.setItem('wlc', JSON.stringify(wl.plugins.custom));
                    modalPluginup();
                };
                reader.readAsText(input.files[0]);
            })
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