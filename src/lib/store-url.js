function normalizeHost(value) {
    if (!value) {
        return "";
    }
    const trimmedValue = value.trim();
    try {
        const url = trimmedValue.includes("://")
            ? new URL(trimmedValue)
            : new URL(`https://${trimmedValue}`);
        return url.host.replace(/\/$/, "");
    }
    catch {
        return trimmedValue.replace(/^https?:\/\//, "").split("/")[0].replace(/\/$/, "");
    }
}
function normalizePath(path = "") {
    if (!path) {
        return "";
    }
    return path.startsWith("/") ? path : `/${path}`;
}
export function getAppBaseHost() {
    return (normalizeHost(process.env.NEXT_PUBLIC_APP_BASE_URL) ||
        normalizeHost(process.env.NEXT_PUBLIC_APP_URL) ||
        normalizeHost(process.env.VERCEL_URL) ||
        "zynkart.store");
}
export function getAppProtocol() {
    return process.env.NODE_ENV === "development" ? "http" : "https";
}
export function usesPathBasedStoreUrls(host = getAppBaseHost()) {
    return (host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.endsWith(".vercel.app"));
}
export function getAppOrigin() {
    return `${getAppProtocol()}://${getAppBaseHost()}`;
}
export function getStoreUrl(storeSlug, path = "") {
    const appBaseHost = getAppBaseHost();
    const normalizedPath = normalizePath(path);
    if (usesPathBasedStoreUrls(appBaseHost)) {
        return `${getAppOrigin()}/store/${storeSlug}${normalizedPath}`;
    }
    return `${getAppProtocol()}://${storeSlug}.${appBaseHost}${normalizedPath}`;
}
export function getStoreDisplayUrl(storeSlug) {
    return getStoreUrl(storeSlug).replace(/^https?:\/\//, "");
}
