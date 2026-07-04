"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GenericProductList from "@/components/GenericProductList";
const ProductList = ({ products, storeData }) => {
    return (<div className="mt-10 w-full px-5 max-w-7xl mx-auto">
      <GenericProductList storeId={storeData.id} storeSlug={storeData.slug} products={products} header={<div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold mb-4">Manage Products</h1>
            <Link href={`/merchant/stores/${storeData.slug}/products/new`}>
              <Button variant="outline" className="gap-2">
                <Plus size={20}/>
                <span className="hidden md:inline-block">Add Product</span>
              </Button>
            </Link>
          </div>} productDetailsPath={(product) => {
            return `/merchant/stores/${storeData.slug}/products/${product.slug}`;
        }}/>
    </div>);
};
export default ProductList;
