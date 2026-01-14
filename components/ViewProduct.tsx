'use client'

import { getProductById, restockProduct } from "@/controller/product.controller";
import { Add, Delete, Edit, SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ViewProduct = ({ productId }: { productId: number }) => {
    const { status, data: product } = useQuery({
        queryKey: [`product-${productId}`],
        queryFn: () => getProductById(productId)
    });

    const [isRestockProduct, setRestockProduct] = useState(false);
    const [currentStock, setCurrentStock] = useState(-1);
    const [loading, isLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleRestockProduct = async (productId: number, additionalStock: number) => {
        isLoading(true);
        try {
            await restockProduct(productId, additionalStock);
            await queryClient.invalidateQueries({
                queryKey: [`product-${productId}`],
            });
            setRestockProduct(false);
        } catch (err) {
            console.log(err);
        }
        isLoading(false);
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

    if (!product) {
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
        <div className="flex justify-center mt-10 gap-10 flex-wrap pb-10">
            <div className="flex flex-col justify-center">
                <Image width={500} height={600} className="w-full max-w-[500px] h-[600px] rounded-xl" src={product.featuredPhotoURL} alt={product.name} />
            </div>
            <div className="w-full max-w-[300px]">
                <h1 className="font-bold text-3xl">
                    {product.name}
                </h1>
                <hr className="my-5" />
                <p className="text-xl">
                    ${product.priceInCad}
                </p>
                <hr className="my-5" />
                <p className="font-bold">Description</p>
                <p className="mt-3">
                    {product.description}
                </p>
                <hr className="my-5" />
                {
                    !isRestockProduct ?
                        (
                            <div className="flex gap-3 items-center">
                                <p className="font-bold">
                                    In Stock: <span>{product.quantity}</span>
                                </p>
                                <button className="bg-indigo-500 p-1 px-2 text-white rounded-md cursor-pointer" onClick={() => {
                                    setCurrentStock(0);
                                    setRestockProduct(true);
                                }}>
                                    restock
                                </button>
                            </div>
                        ) :
                        (
                            <form className="" onSubmit={async (e) => {
                                e.preventDefault();
                                await handleRestockProduct(product.id, currentStock);
                            }}>
                                <div className="flex gap-3">
                                    <p className="font-bold">
                                        In Stock: <span>{product.quantity}</span>
                                    </p>
                                    <div className="border px-2 rounded-md">
                                        + {currentStock}
                                    </div>
                                    <div className="bg-indigo-500 text-white rounded-md px-1 cursor-pointer" onClick={() => setCurrentStock(currentStock + 1)}>
                                        <Add />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-sm mt-5">
                                    <button className="bg-green-500 text-white p-1 px-2 rounded-md cursor-pointer" disabled={loading}>
                                        restock
                                    </button>
                                    <div className="bg-red-500 text-white p-1 px-2 rounded-md cursor-pointer" onClick={() => setRestockProduct(false)}>
                                        cancel
                                    </div>
                                </div>
                            </form>
                        )
                }
                <hr className="my-5" />
                <p className="font-bold">
                    Condition: <span>{product.isNew ? "New" : "Used"}</span>
                </p>
                <hr className="my-5" />
                <div className="flex gap-3 text-white">
                    <Link href={`/seller/dashboard/products/${product.id}/edit`} className="w-full flex justify-center items-center gap-2 p-2 rounded-md bg-green-500 hover:brightness-95 cursor-pointer">
                        <Edit />
                        <p>
                            Edit
                        </p>
                    </Link>
                    <button className="w-full flex justify-center items-center gap-2 p-2 rounded-md bg-red-500 hover:brightness-95 cursor-pointer">
                        <Delete />
                        <p>
                            Delete
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;