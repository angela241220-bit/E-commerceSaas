import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const ProductsListPage = ({ store }) => {
    const { template } = store;
    const ProductsList = dynamic(() => import(`../templates/${template}/product-list`), {
        loading: () => <Loader />,
    });
    if (!ProductsList) {
        return <div>Template not found</div>;
    }
    return <ProductsList store={store}/>;
};
export default ProductsListPage;
