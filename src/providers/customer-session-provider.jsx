"use client";
import { useCustomerSession } from "@/hooks/use-customer-session";
import { useEffect } from "react";
export const CustomerSessionProvider = ({ children, customer, }) => {
    const { setCustomer } = useCustomerSession();
    useEffect(() => {
        setCustomer(customer);
    }, [customer, setCustomer]);
    return <>{children}</>;
};
