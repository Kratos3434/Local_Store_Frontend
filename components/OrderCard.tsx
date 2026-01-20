'use client'

import { EOrder_Status, Order } from "@/data";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const OrderCard = ({ order }: { order: Order }) => {
    return (
        <div className="w-full p-2 border rounded-md my-3 flex gap-5">
            <Image width={90} height={90} className="h-[90px] w-[90px]" src={order.product.featuredPhotoURL} alt={order.product.name} />
            <div className="w-full">
                <div className="flex justify-between gap-3 flex-wrap bg-indigo-400 text-white p-2 rounded-md text-[12px]">
                    <p>Ordered on <b>{formatDate(new Date(order.createdAt))}</b></p>
                    <p>Amount: <b>${order.amount}</b></p>
                    <p>Order type: <b>{order.type}</b></p>
                    <p>Status: <b>{order.status.status}</b></p>
                </div>
                <div className="mt-3">
                    <Link href={`/orders/details/${order.id}`} className="text-blue-500 text-lg hover:underline">{order.product.name}</Link>
                    {
                        order.status.status !== EOrder_Status.PENDING &&
                        (
                            <>
                                <p>
                                    Order {order.status.status} on <b>{formatDate(new Date(order!.updatedAt as Date))}</b>
                                </p>
                            </>
                        )
                    }
                    {
                        order.status.status === EOrder_Status.COMPLETE &&
                        (
                            <div className="mt-3">
                                <Link href={`/product/${order.product.id}`} className="rounded-full px-4 py-1 bg-green-500 text-white hover:brightness-95">
                                    Order again
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderCard;