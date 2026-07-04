import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Checkout = ({ store, shippingZones, customer, }) => {
    const { template } = store;
    const CheckoutPage = dynamic(() => import(`../templates/${template}/checkout`), {
        loading: () => <Loader />,
    });
    if (!CheckoutPage) {
        return <div>Template not found</div>;
    }
    return (<CheckoutPage store={store} shippingZones={shippingZones} customer={customer}/>);
};
export default Checkout;
