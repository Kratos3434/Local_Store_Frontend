"use client"

import { getOrderDetails } from "@/controller/order.controller";
import { formatDate } from "@/utils";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';

const OrderDetails = ({ orderId }: { orderId: number }) => {
    const { status, data } = useQuery({
        queryKey: [`order-details-${orderId}`],
        queryFn: () => getOrderDetails(orderId)
    });

    if (status === 'error') {
        return <p className="font-bold text-xl">Sorry, something went wrong while retrieveing the order details</p>
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
                <p className="">This product does not exist</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full mt-5">
            <div className="w-full max-w-[700px]">
                <Image src={data.product.featuredPhotoURL} width={400} height={300} alt={data.product.name} className="w-full h-[600px] rounded-md" />
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="font-bold mt-3 text-xl">
                        {data.product.name}
                    </h1>
                    <p>Status: <b>{data.status.status}</b></p>
                </div>
                <hr className="my-3" />
                <p className="font-bold mt-3 text-xl">
                    Details
                </p>
                <div className="mt-3">
                    <p>
                        Preferred meeting place:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">{data.details.preferredMeetingPlace}</p>
                </div>
                <div className="mt-5">
                    <p>
                        Preferred meetup date:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        {formatDate(new Date(data.details.preferredMeetupDate))}
                    </p>
                </div>
                <div className="mt-5">
                    <p>
                        Quantity:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        {data.details.quantity}
                    </p>
                </div>
                <div className="mt-5">
                    <p>
                        Contact number:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        {data.details.contactNumber}
                    </p>
                </div>
                <div className="mt-5">
                    <p>
                        Notes:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 h-[200px] overflow-y-auto">
                        {data.details.notes}
                    </p>
                </div>
                <div className="mt-5">
                    <p>
                        Amount owed (CAD):
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        ${data.amount}
                    </p>
                </div>
                <hr className="my-5" />
            </div>
        </div>
    );
}

export default OrderDetails;