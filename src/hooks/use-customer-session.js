import { create } from "zustand";
export const useCustomerSession = create((set) => ({
    customer: null,
    setCustomer: (customer) => set({ customer }),
}));
