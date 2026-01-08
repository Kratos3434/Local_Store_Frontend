'use client'

import { getSellerCompleteOrders } from "@/controller/order.controller";
import { formatDate } from "@/utils";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const SellerCompletedOrders = () => {
    const { status, data } = useQuery({
        queryKey: ['completed-orders'],
        queryFn: getSellerCompleteOrders
    });

    if (status === 'error') {
        return <p className="font-bold text-xl">Sorry, something went wrong while retrieveing the product</p>
    }

    if (status === 'pending') {
        return (
            <div className="flex justify-center text-xl mt-10">
                <CircularProgress />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex w-full justify-center mt-10 flex-col gap-5 items-center text-xl">
                <div className="text-8xl text-red-500">
                    <SentimentDissatisfied fontSize="inherit" />
                </div>
                <p className="">Orders does not exist</p>
            </div>
        );
    }

    return (
        <div>
            {
                data.length > 0 ?
                    (
                        <div className="overflow-x-auto">
                            <table border={1} className="w-[1200px] border">
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Quantity</th>
                                        <th>Ordered by (email)</th>
                                        <th>Date ordered</th>
                                        <th>Amount owed (CAD)</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e, idx) => {
                                            return (
                                                <tr key={idx} className="text-sm">
                                                    <td>{e.id}</td>
                                                    <td>{e.details.quantity}</td>
                                                    <td>{e.user.profile.firstName} {e.user.profile.lastName} ({e.user.email})</td>
                                                    <td>{formatDate(new Date(e.createdAt))}</td>
                                                    <td>${e.amount}</td>
                                                    <td>{e.status.status}</td>
                                                    <td>
                                                        <Link href={`/seller/dashboard/orders/${e.id}`} className="text-blue-500 hover:underline">
                                                            view
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) :
                    (
                        <p>No completed orders yet.</p>
                    )
            }
        </div>
    )
}

export default SellerCompletedOrders;