import SellerOrder from "@/components/SellerOrder";
import { notFound } from "next/navigation";

const SellerOrderPage = async ({params}: {params: any}) => {
    const orderId = (await params).orderId;

    if (isNaN(+orderId)) {
        notFound();
    }

    return <SellerOrder orderId={+orderId} />
}

export default SellerOrderPage;