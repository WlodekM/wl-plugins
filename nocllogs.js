wl.events.addEventListener("connected", function () {
    log("doing onmessage mixin")
    meowerConnection.onmessage = wl.util.mixin(meowerConnection.onmessage, function (o, ...args) {
        const originalLog = console.log;
        
        // Temporarily disable console.log
        console.log = function (...args) {
            if(args[0] && typeof args[0] == "string" && args[0].startsWith("INC")) return;
            originalLog(...args)
        };
        
        try {
        o(...args);
        } finally {
            // Restore the original console.log
            console.log = originalLog;
        }
    })
})