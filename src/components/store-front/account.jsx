import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Account = ({ store, user }) => {
    const { template } = store;
    const Account = dynamic(() => import(`../templates/${template}/account`), {
        loading: () => <Loader />,
    });
    if (!Account) {
        return <div>Template not found</div>;
    }
    return <Account store={store} user={user}/>;
};
export default Account;
