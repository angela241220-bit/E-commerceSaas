"use client";
import Navbar from "./_components/navbar";
import { Footer } from "./_components/footer";
import CheckoutPage from "@/components/store/checkout";
export default function Checkout({ store, shippingZones, customer }) {
    return (<section className="min-h-screen bg-[#fff] md:pt-16 pt-24 flex flex-col dark:bg-[#252525]">
      <Navbar storeSlug={store.slug} storeName={store.name} storeId={store.id}/>
      <CheckoutPage shippingZones={shippingZones} customer={customer} store={store}/>  
      <Footer storeSlug={store.slug}/>
    </section>);
}
