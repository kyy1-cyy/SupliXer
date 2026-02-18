"use client";

import { useEffect } from "react";

export default function AntiDevTools() {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // 2. Disable Common DevTools Shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
                return;
            }

            // Ctrl/Cmd + Shift + I/J/C or Ctrl/Cmd + U
            if (e.ctrlKey || e.metaKey) {
                if (e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
                    e.preventDefault();
                    return;
                }
                if (e.key.toUpperCase() === "U") {
                    e.preventDefault();
                    return;
                }
            }
        };

        // 3. Simple Debugger Loop (Optional, can be annoying if enabled)
        // const interval = setInterval(() => {
        //     debugger;
        // }, 2000);

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            // clearInterval(interval);
        };
    }, []);

    return null;
}
