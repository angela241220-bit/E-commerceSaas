"use client";

import { createContext, useCallback, useContext } from "react";

const StoreBasePathContext = createContext("");

function normalizeBasePath(basePath) {
    if (!basePath || basePath === "/") {
        return "";
    }
    const path = basePath.startsWith("/") ? basePath : `/${basePath}`;
    return path.replace(/\/+$/, "");
}

export function StorePathProvider({ basePath, children }) {
    return (<StoreBasePathContext.Provider value={normalizeBasePath(basePath)}>
      {children}
    </StoreBasePathContext.Provider>);
}

export function useStorePath() {
    const basePath = useContext(StoreBasePathContext);
    return useCallback((href = "/") => {
        if (typeof href !== "string" ||
            !href.startsWith("/") ||
            href.startsWith("//") ||
            !basePath) {
            return href;
        }
        if (href === basePath || href.startsWith(`${basePath}/`)) {
            return href;
        }
        return href === "/" ? basePath : `${basePath}${href}`;
    }, [basePath]);
}
