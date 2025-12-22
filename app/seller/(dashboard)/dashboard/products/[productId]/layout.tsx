import { notFound } from "next/navigation";

const ProductLayout = async ({ params, children }: { params: any, children: React.ReactNode }) => {
    const productId = (await params).productId;

    if (isNaN(+productId)) {
        notFound();
    }

    return (
        <>
            {children}
        </>
    );
}

export default ProductLayout;