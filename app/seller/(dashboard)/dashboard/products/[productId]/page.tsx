import ViewProduct from "@/components/ViewProduct";

const ProductPage = async ({params}: {params: any}) => {
    const productId = (await params).productId;

    return <ViewProduct productId={+productId} />;
}

export default ProductPage;