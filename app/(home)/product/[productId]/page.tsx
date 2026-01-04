import Product from "@/components/Product";
import { getProductMetadataById } from "@/controller/product.controller";
import { USER_SESSION_TOKEN } from "@/data";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({params}: {params: any}): Promise<Metadata> {
    const productId = (await params).productId;
    const token = (await cookies()).get(USER_SESSION_TOKEN)?.value;

    if (isNaN(+productId)) {
        notFound();
    }

    const product = await getProductMetadataById(+productId, `${USER_SESSION_TOKEN}=${token}`);

    if (!product) {
        notFound();
    }

    return {
        title: `${product.name} | Local Store`,
        description: product.description
    }
}

const HomeProductPage = async ({params}: {params: any}) => {
    const productId = (await params).productId;

    if (isNaN(+productId)) {
        notFound();
    }

    return <Product productId={+productId} />;
}

export default HomeProductPage;