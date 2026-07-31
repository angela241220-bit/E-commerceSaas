"use client";

import Link from "next/link";
import { useStorePath } from "@/providers/store-path-provider";

export default function StoreLink({ href, ...props }) {
    const storePath = useStorePath();
    const resolvedHref = typeof href === "string" ? storePath(href) : href;
    return <Link href={resolvedHref} {...props}/>;
}
