"use client"

import { getPublicProductById } from "@/controller/product.controller";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "./Modal";
import RequestOrder from "./ReqeustOrder";

const Product = ({ productId }: { productId: number }) => {
    const { status, data: product } = useQuery({
        queryKey: [`public-product-${productId}`],
        queryFn: () => getPublicProductById(productId)
    });

    const [openOrderRequest, setOpenOrderRequest] = useState(false);

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
        <div className="flex justify-center md:mt-10 mt-5 gap-10 flex-wrap pb-10">
            <div className="flex flex-col justify-center">
                <img width={500} height={600} className="w-full max-w-[500px] h-[600px] rounded-xl" src={product.featuredPhotoURL} />
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
                <p className="font-bold">
                    In Stock: <span>{product.quantity}</span>
                </p>
                <hr className="my-5" />
                <p className="font-bold">
                    Condition: <span>{product.isNew ? "New" : "Used"}</span>
                </p>
                <hr className="my-5" />
                <p>
                    <b>Sold by:</b> {product.store.name}
                </p>
                <hr className="my-5" />
                <button className={`w-full p-2 py-4 rounded-full bg-indigo-500 text-white font-bold hover:brightness-95 ${product.quantity === 0 && "brightness-75"} ${product.quantity === 0 ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => setOpenOrderRequest(true)}
                    disabled={product.quantity === 0 ? true : false}>
                    {product.quantity === 0 ? "Out of stock" : "Order now"}
                </button>
            </div>
            {
                openOrderRequest &&
                (
                    <Modal>
                        <RequestOrder product={product} closer={setOpenOrderRequest} />
                    </Modal>
                )
            }
        </div>
    )
}

export default Product;