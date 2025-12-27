import Product from "@/components/Product";
import { notFound } from "next/navigation";

const HomeProductPage = async ({params}: {params: any}) => {
    const productId = (await params).productId;

    if (isNaN(+productId)) {
        notFound();
    }

    return <Product productId={+productId} />;
}

export default HomeProductPage;