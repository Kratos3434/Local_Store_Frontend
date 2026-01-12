'use client'

import { acceptOrderAsSeller, completeOrderAsSeller, declineOrderAsSeller, getSellerOrderById } from "@/controller/order.controller";
import { EOrder_Status } from "@/data";
import { formatDate } from "@/utils";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SellerOrder = ({ orderId }: { orderId: number }) => {
    const { status, data } = useQuery({
        queryKey: [`seller-order-${orderId}`],
        queryFn: () => getSellerOrderById(orderId)
    });

    const [loading, isLoading] = useState(false);
    const [declineLoading, isDeclineLoading] = useState(false);
    const [completeLoading, isCompleteLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleAcceptOrder = async () => {
        isLoading(true);
        setErrorMessage("");
        try {
            await acceptOrderAsSeller(orderId);
            await queryClient.invalidateQueries({
                queryKey: [`seller-order-${orderId}`],
            });
        } catch (err: any) {
            setErrorMessage(err.message);
        }
        isLoading(false);
    }

    const handleDeclineOrder = async () => {
        isDeclineLoading(true);
        setErrorMessage("");
        try {
            await declineOrderAsSeller(orderId);
            await queryClient.invalidateQueries({
                queryKey: [`seller-order-${orderId}`],
            });
            router.replace("/seller/dashboard/orders");
        } catch (err: any) {
            setErrorMessage(err.message);
        }
        isDeclineLoading(false);
    }

    const handleCompleteOrder = async () => {
        isCompleteLoading(true);
        setErrorMessage("");
        try {
            await completeOrderAsSeller(orderId);
            await queryClient.invalidateQueries({
                queryKey: [`seller-order-${orderId}`],
            });
        } catch (err: any) {
            setErrorMessage(err.message);
        }
        isCompleteLoading(false);
    }

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
                <p className="">This order does not exist</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center mt-3 pb-20">
            <div className="w-full max-w-[700px]">
                <img src={data.product.featuredPhotoURL} width={400} height={300} alt={data.product.name} className="w-full h-[600px]" />
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
                <p className="font-bold mt-3 text-xl">
                    Buyer Info
                </p>
                <div className="mt-5">
                    <p>
                        Name:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        {data.user.profile.firstName} {data.user.profile.lastName}
                    </p>
                </div>
                <div className="mt-5">
                    <p>
                        Email:
                    </p>
                    <p className="border py-1 px-2 rounded-md w-full mt-1 font-bold">
                        {data.user.email}
                    </p>
                </div>
                <hr className="my-5" />
                {
                    data.status.status === EOrder_Status.PENDING &&
                    (
                        <div>
                            <b>Please read before accepting or declining the order:</b>
                            <p className="mt-2">
                                By accepting this order, you confirm that you agree to meet the buyer at the specified <b>time and location</b> shown in the order details.

                                You are responsible for attending the meetup on time and at the agreed place. Failure to show up, repeated delays, or requesting last-minute changes without buyer agreement may result in order cancellation and negatively affect your seller reputation.

                                All meetups and exchanges are conducted <b>in person and at your own discretion</b>. Please ensure the location is safe and suitable before accepting the order.
                            </p>
                            <div className="mt-10">
                                {errorMessage && <small className="text-red-500">*{errorMessage}</small>}
                                <div className="flex gap-5 flex-wrap text-xl mt-2">
                                    <button className="p-2 px-4 bg-green-500 text-white rounded-md cursor-pointer flex justify-center items-center gap-3" disabled={loading} onClick={handleAcceptOrder}>
                                        {loading && <CircularProgress size={20} />}
                                        <p>
                                            Accept
                                        </p>
                                    </button>
                                    <button className="p-2 px-4 bg-red-500 text-white rounded-md cursor-pointer flex justify-center items-center gap-3" disabled={declineLoading} onClick={handleDeclineOrder}>
                                        {declineLoading && <CircularProgress size={20} />}
                                        <p>
                                            Decline
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    data.status.status === EOrder_Status.ACCEPTED &&
                    (
                        <div>
                            <div className="mb-2">
                                <small>Order accepted on <b>{formatDate(new Date(data.updatedAt as Date))}</b></small>
                            </div>
                            <b>Note:</b>
                            <p className="mt-1">
                                Please mark as Complete after meetup to avoid penalties, Thanks.
                            </p>
                            <div className="mt-10">
                                <button className="p-2 px-4 bg-green-500 text-white rounded-md cursor-pointer flex justify-center items-center gap-3 text-xl font-bold" disabled={completeLoading} onClick={handleCompleteOrder}>
                                    {completeLoading && <CircularProgress size={20} />}
                                    <p>
                                        Mark as Complete
                                    </p>
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                    data.status.status === EOrder_Status.DECLINED &&
                    (
                        <div>
                            <div className="mb-2">
                                <small>Order declined on <b>{formatDate(new Date(data.updatedAt as Date))}</b></small>
                            </div>
                            <b>Note: </b>
                            <b>
                                This order was declined by you.
                            </b>
                        </div>
                    )
                }
                {
                    data.status.status === EOrder_Status.COMPLETE &&
                    (
                        <div>
                            <p className="text-lg">Order completed on <b>{formatDate(new Date(data.updatedAt as Date))}</b></p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SellerOrder;