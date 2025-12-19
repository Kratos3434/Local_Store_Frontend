'use client'

import { getProducts } from "@/controller/product.controller";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
    const {status, data} = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    return (
        <div className="mt-5">
            <h1 className="text-3xl font-bold">Products</h1>
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
                    ):
                    (
                        status === 'pending' ?
                        (
                            <div className="w-full flex justify-center text-xl">
                                <CircularProgress />
                            </div>
                        ):
                        (
                            <div>
                                {
                                    data.length === 0 ?
                                    (
                                        <p>
                                            You have no products yet.
                                        </p>
                                    ):
                                    (
                                        <div>
                                            
                                        </div>
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