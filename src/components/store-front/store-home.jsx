import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const StoreHome = ({ store }) => {
    const { template } = store;
    const Home = dynamic(() => import(`../templates/${template}/home`), {
        loading: () => <Loader />,
    });
    if (!Home) {
        return <div>Template not found</div>;
    }
    return <Home store={store}/>;
};
export default StoreHome;
