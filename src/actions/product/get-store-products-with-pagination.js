"use server";
import db from "@/db";
import { product } from "@/db/schema";
import { serverAuth } from "@/lib/server-auth";
import { and, count, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
export const getStoreProductsWithPagination = async ({ storeId, limit = 20, offset = 0, active, }) => {
    if (!storeId)
        return { products: [], totalProducts: 0 };
    const session = await serverAuth();
    const merchant = session?.user;
    if (!merchant?.id)
        return redirect("/sign-in");
    const conditions = [eq(product.storeId, storeId)];
    if (active) {
        conditions.push(eq(product.status, "ACTIVE"));
    }
    console.log("active");
    const totalResult = await db
        .select({ total: count(product.id) })
        .from(product)
        .where(and(...conditions));
    console.log("totalResult", totalResult);
    const totalProducts = totalResult[0]?.total ?? 0;
    const products = await db.query.product.findMany({
        where: and(...conditions),
        limit,
        offset,
        orderBy: desc(product.updatedAt),
        with: {
            images: {
                orderBy: (images, { asc }) => [asc(images.position)],
            },
        },
    });
    return {
        products,
        totalProducts,
    };
};
