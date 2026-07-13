import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
const defaultMainDomains = [
    "zynkart.store",
    "www.zynkart.store",
    "localhost:3000",
    "127.0.0.1:3000",
];
function normalizeHost(value) {
    if (!value) {
        return null;
    }
    const trimmedValue = value.trim().toLowerCase();
    if (!trimmedValue) {
        return null;
    }
    try {
        const url = trimmedValue.includes("://")
            ? new URL(trimmedValue)
            : new URL(`https://${trimmedValue}`);
        return url.host;
    }
    catch {
        return trimmedValue.replace(/^https?:\/\//, "").split("/")[0] || null;
    }
}
function getMainDomains() {
    const configuredDomains = [
        ...defaultMainDomains,
        process.env.NEXT_PUBLIC_APP_BASE_URL,
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.BETTER_AUTH_URL,
        process.env.VERCEL_URL,
    ];
    const domains = configuredDomains.map(normalizeHost).filter(Boolean);
    const domainsWithWwwAliases = domains.flatMap((domain) => {
        if (domain.startsWith("www.")) {
            return [domain, domain.slice(4)];
        }
        if (domain.startsWith("localhost") || domain.startsWith("127.0.0.1")) {
            return [domain];
        }
        return [domain, `www.${domain}`];
    });
    return new Set(domainsWithWwwAliases);
}
function getTenantFromHost(host, mainDomains) {
    if (!host || mainDomains.has(host) || host.endsWith(".vercel.app")) {
        return null;
    }
    const appDomains = [
        process.env.NEXT_PUBLIC_APP_BASE_URL,
        process.env.NEXT_PUBLIC_APP_URL,
    ]
        .map(normalizeHost)
        .filter(Boolean);
    for (const appDomain of appDomains) {
        if (host.endsWith(`.${appDomain}`)) {
            return host.slice(0, -(appDomain.length + 1)).split(".")[0] || null;
        }
    }
    const hostParts = host.split(".");
    if (hostParts.length > 2 && hostParts[0] !== "www") {
        return hostParts[0];
    }
    return null;
}
export function proxy(req) {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;
    const isApiRoute = pathname.startsWith("/api");
    if (isApiRoute) {
        return NextResponse.next();
    }
    const host = normalizeHost(req.headers.get("host") || "");
    const tenant = getTenantFromHost(host, getMainDomains());
    if (tenant && !pathname.startsWith("/api")) {
        nextUrl.pathname = `/store/${tenant}${pathname}`;
        return NextResponse.rewrite(nextUrl);
    }
    const isLoggedIn = !!getSessionCookie(req);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);
    const isStoreRoute = pathname.startsWith("/store");
    const isBlogRoute = pathname.startsWith("/blog");
    if (isStoreRoute || isBlogRoute) {
        return NextResponse.next();
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
