export function resolveStoreCallback(callbackUrl, storePath, fallback = "/account") {
    const fallbackUrl = storePath(fallback);
    if (!callbackUrl ||
        !callbackUrl.startsWith("/") ||
        callbackUrl.startsWith("//")) {
        return fallbackUrl;
    }
    return storePath(callbackUrl);
}
