"use client";
import React from "react";
import { CustomerOrders } from "@/components/store/orders";
const Orders = ({ store }) => {
    return (<div>
      <CustomerOrders store={store}/>
    </div>);
};
export default Orders;
