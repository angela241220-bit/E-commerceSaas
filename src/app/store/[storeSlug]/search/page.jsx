import React from "react";
import Search from "@/components/store-front/search";
import { getStoreForHomePage } from "@/lib/store-utils";
const page = async ({ params }) => {
    const { storeSlug } = await params;
    const storeData = await getStoreForHomePage(storeSlug);
    if (!storeData) {
        return <div>Store not found</div>;
    }
    return <Search store={storeData}/>;
};
export default page;
