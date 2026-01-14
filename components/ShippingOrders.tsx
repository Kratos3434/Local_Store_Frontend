"use client"

import { getUserShippingOrders } from "@/controller/order.controller";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {Fragment} from 'react';
import OrderCard from "./OrderCard";

const ShippingOrders = () => {
    const { status, data } = useQuery({
        queryKey: ['user-shipping-orders'],
        queryFn: getUserShippingOrders
    });

    if (status === 'error') {
        return <p className="font-bold text-xl">Sorry, something went wrong while retrieveing the orders</p>
    }

    if (status === 'pending') {
        return (
            <div className="flex justify-center text-xl mt-10">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <p>Ordered by <b>latest</b></p>
            {
                data.length > 0 ?
                    (
                        data.map((e, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <OrderCard order={e} />
                                </Fragment>
                            );
                        })
                    ) :
                    (
                        <p>
                            No shipping orders yet
                        </p>
                    )
            }
        </div>
    );
}

export default ShippingOrders;