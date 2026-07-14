import { NextResponse } from "next/server";
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const account_number = searchParams.get("account_number");
    const bank_code = searchParams.get("bank_code");
    if (!account_number || !bank_code)
        return NextResponse.json({ message: "Account number and bank code are required" }, { status: 400 });
    if (!/^\d{10}$/.test(account_number)) {
        return NextResponse.json({ message: "Account number must be 10 digits" }, { status: 400 });
    }
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
        console.error("PAYSTACK_SECRET_KEY is not configured");
        return NextResponse.json({ message: "Payment provider is not configured" }, { status: 500 });
    }
    try {
        const params = new URLSearchParams({
            account_number,
            bank_code,
        });
        const res = await fetch(`https://api.paystack.co/bank/resolve?${params.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
            cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!data?.status || !data?.data) {
            const message = data?.message || "Failed to verify account";
            console.error("Paystack account verification failed", {
                status: res.status,
                message,
            });
            return NextResponse.json({ message }, { status: res.ok ? 400 : res.status });
        }
        return NextResponse.json(data.data);
    }
    catch (error) {
        console.error("Failed to verify account", error);
        return NextResponse.json({ message: "Failed to verify account" }, { status: 500 });
    }
}
