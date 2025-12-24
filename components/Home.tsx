'use client'

import { getAllProducts, getProductsByCity } from "@/controller/product.controller";
import { userAtom } from "@/store";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { Fragment } from 'react';
import ProductCard from "./ProductCard";

const Home = () => {
    const user = useAtomValue(userAtom);

    if (user) {

        const { status, data } = useQuery({
            queryKey: ['city-products'],
            queryFn: () => getProductsByCity(user.city)
        });

        return (
            <div className="mt-3">
                <p>
                    Showing all products in <b>{user.city}</b>
                </p>
                {
                    status === 'error' ?
                        (
                            <div className="flex justify-center mt-10">
                                <p>Something went wrong... Please reload or try again later</p>
                            </div>
                        ) :
                        (
                            status === 'pending' ?
                                (
                                    <div className="flex justify-center mt-10">
                                        <CircularProgress />
                                    </div>
                                ) :
                                (
                                    <div className="my-5 flex gap-3 flex-wrap">
                                        {
                                            data.map((e, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <ProductCard product={e} />
                                                    </Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                )
                        )
                }
            </div>
        )
    } else {
        const { status, data } = useQuery({
            queryKey: ['all-products'],
            queryFn: getAllProducts
        });

        return (
            <div className="mt-3">
                <p>
                    Showing all products
                </p>
                {
                    status === 'error' ?
                        (
                            <div className="flex justify-center mt-10">
                                <p>Something went wrong... Please reload or try again later</p>
                            </div>
                        ) :
                        (
                            status === 'pending' ?
                                (
                                    <div className="flex justify-center mt-10">
                                        <CircularProgress />
                                    </div>
                                ) :
                                (
                                    <div className="my-5 flex gap-3 flex-wrap">
                                        {
                                            data.map((e, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <ProductCard product={e} />
                                                    </Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                )
                        )
                }
            </div>
        );
    }
}

export default Home;