"use client";
import { SiteHeader } from "./_components/navbar";
import { Footer } from "./_components/footer";
import CheckoutPage from "@/components/store/checkout";
export default function Checkout({ store, shippingZones, customer }) {
    return (<section className="flex flex-col min-h-screen">
      <SiteHeader storeSlug={store.slug} storeName={store.name} storeId={store.id}/>
      <CheckoutPage shippingZones={shippingZones} customer={customer} store={store}/>  
      <Footer storeSlug={store.slug}/>
    </section>);
}
