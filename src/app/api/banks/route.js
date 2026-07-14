import { NextResponse } from "next/server";
const perPage = 100;
export async function GET() {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
        console.error("PAYSTACK_SECRET_KEY is not configured");
        return NextResponse.json({ message: "Payment provider is not configured" }, { status: 500 });
    }
    try {
        const res = await fetch(`https://api.paystack.co/bank?country=nigeria&perPage=${perPage}&currency=NGN`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
            cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!data?.status || !data?.data) {
            const message = data?.message || "Failed to fetch banks";
            console.error("Paystack bank list fetch failed", {
                status: res.status,
                message,
            });
            return NextResponse.json({ message }, { status: res.ok ? 400 : res.status });
        }
        return NextResponse.json(data.data);
    }
    catch (error) {
        console.error("Failed to fetch banks", error);
        return NextResponse.json({ message: "Failed to fetch banks" }, { status: 500 });
    }
}
