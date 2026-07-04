import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Confirmed = ({ store }) => {
    const { template } = store;
    const ConfirmedPage = dynamic(() => import(`../templates/${template}/confirmed`), {
        loading: () => <Loader />,
    });
    if (!ConfirmedPage) {
        return <div>Template not found</div>;
    }
    return <ConfirmedPage store={store}/>;
};
export default Confirmed;
