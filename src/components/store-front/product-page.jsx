import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const ProductPage = ({ store, product }) => {
    const { template } = store;
    const ProductDetails = dynamic(() => import(`../templates/${template}/product-page`), {
        loading: () => <Loader />,
    });
    if (!ProductDetails) {
        return <div>Template not found</div>;
    }
    return <ProductDetails store={store} product={product}/>;
};
export default ProductPage;
