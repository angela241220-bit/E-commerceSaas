import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Category = ({ store, categoryInfo }) => {
    const { template } = store;
    const Category = dynamic(() => import(`../templates/${template}/category-page`), {
        loading: () => <Loader />,
    });
    if (!Category) {
        return <div>Template not found</div>;
    }
    return <Category store={store} categoryInfo={categoryInfo}/>;
};
export default Category;
