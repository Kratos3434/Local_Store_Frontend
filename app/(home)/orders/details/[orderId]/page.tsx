import OrderDetails from "@/components/OrderDetails";
import { notFound } from "next/navigation";

const OrderDetailsPage = async ({params}: {params: any}) => {
    const orderId = (await params).orderId;

    if (isNaN(+orderId)) {
        notFound();
    }

    return <OrderDetails orderId={+orderId} />;
}

export default OrderDetailsPage;