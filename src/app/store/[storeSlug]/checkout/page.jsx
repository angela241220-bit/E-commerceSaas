import React from "react";
import { getShippingZonesForStore, getStoreForHomePage, } from "@/lib/store-utils";
import Checkout from "@/components/store-front/checkout";
import { serverCustomerAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getStoreUrl } from "@/lib/store-url";
const page = async ({ params }) => {
    const { storeSlug } = await params;
    const storeData = await getStoreForHomePage(storeSlug);
    if (!storeData) {
        return <div>Store not found</div>;
    }
    const customer = await serverCustomerAuth();
    if (!customer) {
        const checkoutUrl = getStoreUrl(storeSlug, "/checkout");
        return redirect(getStoreUrl(storeSlug, `/sign-in?callbackUrl=${encodeURIComponent(checkoutUrl)}`));
    }
    const shippingZones = await getShippingZonesForStore(storeData.id);
    return <Checkout store={storeData} shippingZones={shippingZones} customer={customer}/>;
};
export default page;
