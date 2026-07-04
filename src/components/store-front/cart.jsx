import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
const Cart = ({ store }) => {
    const { template } = store;
    const CartPage = dynamic(() => import(`../templates/${template}/cart`), {
        loading: () => <Loader />,
    });
    if (!CartPage) {
        return <div>Template not found</div>;
    }
    return <CartPage store={store}/>;
};
export default Cart;
