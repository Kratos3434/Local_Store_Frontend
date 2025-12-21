'use client'

import { getProducts } from "@/controller/product.controller";
import { Add } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {Fragment} from "react";
import ProductCard from "./ProductCard";

const Products = () => {
    const { status, data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    return (
        <div className="mt-5">
            <div className="flex items-center gap-5 flex-wrap">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/seller/dashboard/products/add-product" className="bg-indigo-500 px-4 py-2 rounded-md text-white font-bold hover:brightness-95 flex items-center gap-2">
                    <Add />
                    <p>
                        Add a Product
                    </p>
                </Link>
            </div>
            <hr className="my-3" />
            <div className="w-full">
                {
                    status === 'error' ?
                        (
                            <div className="w-full flex justify-center">
                                <p className="text-xl">
                                    Oops! Something went wrong while getting your products. Please try again later.
                                </p>
                            </div>
                        ) :
                        (
                            status === 'pending' ?
                                (
                                    <div className="w-full flex justify-center text-xl">
                                        <CircularProgress />
                                    </div>
                                ) :
                                (
                                    <div className="flex gap-3 flex-wrap">
                                        {
                                            data.length === 0 ?
                                                (
                                                    <p>
                                                        You have no products yet.
                                                    </p>
                                                ) :
                                                (
                                                    data.map((e, idx) => {
                                                        return (
                                                            <Fragment key={idx}>
                                                                <ProductCard product={e} />
                                                            </Fragment>
                                                        );
                                                    })
                                                )
                                        }
                                    </div>
                                )
                        )
                }
            </div>
        </div>
    );
}

export default Products;