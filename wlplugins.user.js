// ==UserScript==
// @name         WL plugins for meo
// @version      1.1c
// @description  Plugins but cool and custom
// @author       WlodekM
// @match        https://eris.pages.dev/meo/
// @match        https://eris.pages.dev/meo/?*
// @match        https://eris.pages.dev/meo/#*
// @icon         https://eris.pages.dev/meo/images/meo.png
// @grant        none
// @compatible   firefox,chrome
// @license      MIT
// @namespace    wl-plugins
// @run-at       document-start
// ==/UserScript==

function logGeneral(...stuff) {
    console.info("%cwl%c %s", "border-radius:5em;background:black;padding-inline:0.5em", "", ...stuff)
}

function logCategory(category, color, ...stuff) {
    console.info(`%cwl%c %c${category}%c %s`, "border-radius:5em;background:black;padding-inline:0.5em", "", `border-radius:5em;background:${color};color:white;padding-inline:0.5em`, "", ...stuff)
}

function logCategoryStyled(category, color, style, ...stuff) {
    console.info(`%cwl%c %c${category}%c %s`, "border-radius:5em;background:black;padding-inline:0.5em;" + style, style, `border-radius:5em;background:${color};color:white;padding-inline:0.5em;${style}`, style, ...stuff)
}

const realWebsockets = WebSocket
WebSocket = null

const version = GM_info.script.version || (String(GM.info.scriptMetaStr.split("\n").find(l => l.startsWith("// @version"))).replace(/^\/\/ @version *(.*)$/g, "$1"))

logCategoryStyled("main", "DarkGoldenRod", "font-size: 1.5em",
    `WL-plugins for meo version ${version}`)
logCategory("main", "DarkGoldenRod",
    `WebSocket overridden
Meo is going to error now, do not try to debug \"Uncaught TypeError: WebSocket is not a constructor
That error is intended so that meo doesn't load the first time and WL plugins can load it when all plugins are loaded`)

// logo for loading screen
const logo = `<svg class="launch-logo" width="128" height="128" fill="var(--color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g transform="translate(0.15835, 1.65835)">
        <path fill="currentColor" d="M31.65 2.66l-1.89 7.4-28.37-2.08-1.36-5.33c-.28-1.43 1.02-2.67 2.5-2.41l8.46 2.83c1.42-.44 3.03-.67 4.84-.64 1.81-.04 3.42.2 4.84.64l8.46-2.83c1.48-.27 2.77.98 2.5 2.41zM31.05 18.44c0 4.64-2.03 10.44-15.21 10.44S.62 23.08.62 18.44c0-1.81.42-4.8 1.66-7.76l-.3-1.16 15.73 1.15c-.05.22-.08.45-.08.68 0 1.99 1.96 3.6 4.37 3.6 2.41 0 4.37-1.61 4.37-3.6 0-.01 0-.03 0-.04l3.34.24c.98 2.67 1.32 5.26 1.32 6.89z"></path>
    </g>
</svg>`

// events :yuhhuh:
class MeoEvents extends EventTarget {
    logEvent(event) {
        logCategory("events", "darkred", `Firing "${event}" event`)
    }
    // ws connected :+1:
    connected() {
        this.logEvent("connected")
        this.dispatchEvent(new Event('connected'));
    }
    ready() {
        this.logEvent("ready")
        this.dispatchEvent(new Event('ready'));
    }
    fire(ev) {
        this.logEvent(ev)
        this.dispatchEvent(new Event(ev));
    }
}

// man i sure do love poluting the window
const wl = window.wl = {
    util: {
        logGeneral: logGeneral,
        log: logGeneral,
        mixin(original, mixin) {
            let _original = original;
            return function (...args) {
                mixin(_original, ...args)
            }
        },
        updateStatus(status) {
            logCategory("status", "green", "status not ready yet", status)
        }
    },
    events: new MeoEvents()
};

async function loadPlugins() {
    'use strict';

    wl.util.updateStatus("Fetching plugin list...")
    logCategory("plugins", "blue", "Loading plugin list")
    let presp = await fetch(localStorage.hasOwnProperty("test") ? "http://localhost:5056/plugins.json" : "https://wlodekm.github.io/wl-plugins/plugins.json", { cache: "no-store" })
    let plist = await presp.json()
    logCategory("plugins", "blue", "Pluginst list fetched", plist)
    let wlPluginsEnabled = JSON.parse(localStorage.getItem("wl") ?? "false") || Object.fromEntries(Object.keys(plist).map(n => [n, false]))
    wlPluginsEnabled.default = true
    let wlCustomPlugins = JSON.parse(localStorage.getItem("wlc") ?? "[]");

    // Sort enabled plugins so that they load in the right order
    wlPluginsEnabled = Object.fromEntries(
        Object.entries(wlPluginsEnabled).sort(([keyA], [keyB]) => {
            const refKeys = Object.keys(plist);
            return refKeys.indexOf(keyA) - refKeys.indexOf(keyB);
        })
    );

    function updatePluginsEnabled() {
        localStorage.setItem('wl', JSON.stringify(wlPluginsEnabled))
    }

    wl.plugins = {
        list: plist,
        custom: wlCustomPlugins,
        enabled: wlPluginsEnabled,
        enabled_array: () => Object.entries(wl.plugins.enabled).filter(([name, enabled]) => enabled).map(([name]) => name),
        enable(name) {
            wlPluginsEnabled[name] = true;
            updatePluginsEnabled()
            return wlPluginsEnabled[name];
        },
        disable(name) {
            wlPluginsEnabled[name] = false;
            updatePluginsEnabled()
            return wlPluginsEnabled[name]
        },
        toggle(name) {
            wlPluginsEnabled[name] = !wlPluginsEnabled[name];
            updatePluginsEnabled()
            return wlPluginsEnabled[name]
        },
        async load(name) {
            const logFunction = `function log(...stuff) {
                console.info(\`%cwl%c %cplugins%c %c${name}%c %s\`, "border-radius:5em;background:black;color:white;padding-inline:0.5em", "", "border-radius:5em;background:blue;color:white;padding-inline:0.5em", "", "border-radius:5em;background:orange;color:black;padding-inline:0.5em", "", ...stuff)
            };const WL_plugin_info = ${JSON.stringify(plist[name])};WL_plugin_info.id=\`${name.replaceAll("`", "\\`")}\`\n` + (function css(css) {
                    wl.events.addEventListener("register-css", function () {
                        wl.util.registerCss(WL_plugin_info.id, css)
                    })
                });
            let plugin = logFunction + ";\n" + (await (await fetch(plist[name].script, { cache: "no-store" })).text());
            await eval(plugin)
        },
        async loadCustom(plugin) {
            const logFunction = `function log(...stuff) {
                console.info(\`%cwl%c %cplugins%c %c${plugin.name}%c %s\`, "border-radius:5em;background:black;color:white;padding-inline:0.5em", "", "border-radius:5em;background:blue;color:white;padding-inline:0.5em", "", "border-radius:5em;background:orange;color:black;padding-inline:0.5em", "", ...stuff)
            };const WL_plugin_info = ${JSON.stringify(plugin)};WL_plugin_info.id=\`${plugin.name.replaceAll("`", "\\`")}\`\n` + (function css(css) {
                    wl.events.addEventListener("register-css", function () {
                        wl.util.registerCss(WL_plugin_info.id, css)
                    })
                });
            let pluginScript = logFunction + ";\n" + plugin.script;
            await eval(pluginScript)
        }
    }

    logCategory("plugins", "blue", "Loading WL plugins")
    wl.util.updateStatus("Plugin list fetched, loading plugins")
    logCategory("plugins", "blue", "Plugins:", wlPluginsEnabled)
    // do some weird voodo shit to turn an object into an array
    for (let i = 0; i < wl.plugins.enabled_array().length; i++) {
        let pluginName = wl.plugins.enabled_array()[i]
        function log(...stuff) {
            console.info(`%cwl%c %c${pluginName}%c %s`, "border-radius:5em;background:black;color:white;padding-inline:0.5em", "", "border-radius:5em;background:orange;color:black;padding-inline:0.5em", "", ...stuff)
        }
        logCategory("plugins", "blue", "Loading", pluginName)
        wl.util.log = log
        wl.util.updateStatus(`Loading plugin "${pluginName}"`)
        await wl.plugins.load(pluginName)
        logCategory("plugins", "blue", pluginName, "loaded")
        wl.util.updateStatus(`Plugin "${pluginName}" loaded`)
    }
    wl.util.updateStatus(`Built-in plugins loaded, loading custom plugins`)
    for (let i = 0; i < wl.plugins.custom.length; i++) {
        let plugin = wl.plugins.custom[i]
        function log(...stuff) {
            console.info(`%cwl%c %c${plugin.name}%c %s`, "border-radius:5em;background:black;color:white;padding-inline:0.5em", "", "border-radius:5em;background:orange;color:black;padding-inline:0.5em", "", ...stuff)
        }
        logCategory("plugins", "blue", "Loading", plugin.name)
        wl.util.log = log
        wl.util.updateStatus(`Loading custom plugin "${plugin.name}"`)
        await wl.plugins.loadCustom(plugin)
        logCategory("plugins", "blue", plugin.name, "loaded")
        wl.util.updateStatus(`Plugin "${plugin.name}" loaded`)
    }
    wl.util.updateStatus(`All plugins loaded!`)
}

// ok meo loaded, do the settings shenanigans now
wl.events.addEventListener("ready", function () {
    meowerConnection.onopen = wl.util.mixin(meowerConnection.onopen, function (o) {
        wl.events.connected()
        o()
    })
    if (!settingsstuff().consolewarnings) {
        logCategory("util", "DarkTurquoise", "Console warnings detected, disabling (for debugging)")
        settings.enable("consolewarnings")
        logCategory("util", "DarkTurquoise", "ok should be disabled now :+1:")
    }

    const settingsPages = {}

    wl.util.addSettingsPage = function (name, page) {
        settingsPages[name] = page
    }

    wl.events.fire("addSettingsPages")

    window.settingsPages = settingsPages

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
    logCategory("API", "#9400D3", "Mixin for settings applied successfully")
    logCategory("API", "#9400D3", "Doing mixin for page change events");
    (["loadstart", "loadchat", "launchscreen", "loadexplore", "blockUser"]).forEach(funcName => {
        eval(`${funcName} = wl.util.mixin(${funcName}, function (o, ...args) {
    o.call(this, ...args)
    wl.events.fire("pageChange")
    wl.events.fire("page-"+page)
})`)
    });
    logCategory("API", "#9400D3", "Mixin for page change events applied successfully")
    wl.events.fire("pageChange")
    wl.events.fire("page-" + page)

    logCategory("API", "#9400D3", "Adding plugin css...")
    let pluginCss = {}
    wl.util.registerCss = function registerCss(plugin, css) {
        if (!pluginCss[plugin]) pluginCss[plugin] = [];
        pluginCss[plugin].push(css)
    }
    wl.events.fire("register-css");
    for (const ns in pluginCss) {
        logCategory("API", "#9400D3", "Adding css for " + ns)
        pluginCss[ns].forEach(css => {
            if (typeof GM_addStyle != "undefined") return GM_addStyle(css);
            let cssElem = document.createElement("style");
            cssElem.innerHTML = css;
            document.head.append(cssElem)
        })
    }
    logCategory("API", "#9400D3", "Plugin css added!")
    wl.events.fire("post-ready")
})
// make it so that meo doesn't load (hopefully)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".launch-logo").outerHTML = logo;
    let status = document.createElement("span")
    status.classList.add("status")
    document.querySelector(".launch").insertBefore(status, document.querySelector(".launch").lastChild)
    wl.util.updateStatus = function (newStatus) {
        status.innerText = newStatus;
        logCategory("status", "green", newStatus)
    }
    loadPlugins().then(() => {
        wl.util.updateStatus(`All plugins loaded! Waiting a bit before launching meo`)
        setTimeout(() => {
            wl.util.updateStatus("Launching meo...")
            logCategory("main", "DarkGoldenRod", "Plugins loaded, setting back WebSocket...")
            WebSocket = realWebsockets
            logCategory("main", "DarkGoldenRod", "WebSocket restored, calling main")
            main()
            wl.events.ready();
        }, 1000)
    });
})