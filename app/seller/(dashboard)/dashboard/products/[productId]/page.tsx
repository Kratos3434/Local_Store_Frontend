import ViewProduct from "@/components/ViewProduct";
import { getProductById } from "@/controller/product.controller";
import { Product, SELLER_SESSION_TOKEN } from "@/data";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const ProductPage = async ({params}: {params: any}) => {
    const productId = (await params).productId;

    return <ViewProduct productId={+productId} />;
}

export default ProductPage;