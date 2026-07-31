import { getCurrentCustomer } from "@/actions/customer";
import { CustomerSessionProvider } from "@/providers/customer-session-provider";
import { trackStoreVisit } from "@/actions/store/analytics";
import { headers } from "next/headers";
import { after } from "next/server";
import { StorePathProvider } from "@/providers/store-path-provider";
import { usesPathBasedStoreUrls } from "@/lib/store-url";
const StoreLayout = async ({ params, children, }) => {
    const customer = await getCurrentCustomer();
    const { storeSlug } = await params;
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const basePath = usesPathBasedStoreUrls(host) ? `/store/${storeSlug}` : "";
    after(async () => {
        const userAgent = headersList.get("user-agent");
        const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
        const referrer = headersList.get("referer");
        await trackStoreVisit({
            storeSlug,
            userAgent: userAgent || undefined,
            ipAddress: ipAddress || undefined,
            referrer: referrer || undefined,
        });
    });
    return (<StorePathProvider basePath={basePath}>
      <CustomerSessionProvider customer={customer}>
        {children}
      </CustomerSessionProvider>
    </StorePathProvider>);
};
export default StoreLayout;
