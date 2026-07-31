import { serverCustomerAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import Account from "@/components/store-front/account";
import { getStoreForHomePage } from "@/lib/store-utils";
import { getStoreUrl } from "@/lib/store-url";
const page = async ({ params }) => {
    const { storeSlug } = await params;
    const storeData = await getStoreForHomePage(storeSlug);
    if (!storeData) {
        return <div>Store not found</div>;
    }
    const customer = await serverCustomerAuth();
    if (!customer) {
        return redirect(getStoreUrl(storeSlug, `/sign-in?callbackUrl=${encodeURIComponent("/account")}`));
    }
    return <Account store={storeData} user={customer}/>;
};
export default page;
