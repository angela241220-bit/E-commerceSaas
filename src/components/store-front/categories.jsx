import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Categories = ({ store, categories }) => {
    const { template } = store;
    const Categories = dynamic(() => import(`../templates/${template}/categories`), {
        loading: () => <Loader />,
    });
    if (!Categories) {
        return <div>Template not found</div>;
    }
    return <Categories store={store} categories={categories}/>;
};
export default Categories;
