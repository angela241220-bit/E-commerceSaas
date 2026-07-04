"use client";
import Navbar from "./_components/navbar";
import { Footer } from "./_components/footer";
import CheckoutPage from "@/components/store/checkout";
export default function Checkout({ store, shippingZones, customer }) {
    return (<section className="flex flex-col min-h-screen dark:bg-[#1e1b4b] dark:text-white bg-white">
        <Navbar storeSlug={store.slug} storeName={store.name}/>
      <CheckoutPage shippingZones={shippingZones} customer={customer} store={store}/>  
      <Footer storeSlug={store.slug}/>
    </section>);
}
